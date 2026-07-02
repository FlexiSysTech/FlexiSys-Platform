import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  MobileDeviceStatus,
  MobilePushStatus,
  MobileSessionStatus,
  Prisma,
} from '@prisma/client';
import { createHash, randomUUID } from 'crypto';

import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dto/login.dto';
import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { PrismaService } from '../prisma/prisma.service';
import {
  MobileLoginDto,
  MobileLogoutDto,
  MobileRefreshDto,
} from './dto/mobile-auth.dto';
import {
  MobileDeviceQueryDto,
  RegisterMobileDeviceDto,
  RevokeMobileDeviceDto,
  UpdateMobileDeviceDto,
} from './dto/mobile-device.dto';
import {
  CreateMobilePushNotificationDto,
  MobilePushQueryDto,
  UpdateMobilePushNotificationDto,
} from './dto/mobile-push.dto';
import { MobileSessionQueryDto } from './dto/mobile-session.dto';
import {
  CreateMobileSyncChangeDto,
  MobileSyncChangeQueryDto,
  MobileSyncPullDto,
} from './dto/mobile-sync.dto';
import {
  MobileAuthResponseEntity,
  MobileBootstrapEntity,
  MobileDeviceEntity,
  MobilePushNotificationEntity,
  MobileSessionEntity,
  MobileSyncChangeEntity,
  MobileSyncPullResponseEntity,
} from './entities/mobile.entity';

type AuthResult = {
  accessToken: string;
  user: {
    id: string;
    username: string;
    fullName: string;
    email: string;
    status: string;
    roles: string[];
    permissions: string[];
  };
};

@Injectable()
export class MobileService {
  private readonly accessTokenTtlMs = 12 * 60 * 60 * 1000;
  private readonly refreshTokenTtlMs = 30 * 24 * 60 * 60 * 1000;

  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
    private readonly jwt: JwtService,
    private readonly audit: AuditService,
    private readonly pagination: PaginationService,
    private readonly context: RequestContextService,
    private readonly softDelete: SoftDeleteService,
  ) {}

  async login(dto: MobileLoginDto) {
    const authResult = (await this.auth.login({
      username: dto.username,
      password: dto.password,
    } as LoginDto)) as AuthResult;
    const device = await this.upsertDevice(authResult.user.id, dto);
    const session = await this.createSession(authResult, device.id, {
      tenantId: device.tenantId,
      companyId: device.companyId,
      branchId: device.branchId,
      metadata: dto.metadata,
    });

    await this.prisma.mobileDevice.update({
      where: { id: device.id },
      data: { lastSeenAt: new Date() },
    });
    await this.audit.record({
      action: 'MOBILE_LOGIN',
      entity: 'MobileSession',
      entityId: session.session.id,
      payload: {
        userId: authResult.user.id,
        deviceId: device.id,
        tenantId: device.tenantId,
      },
    });

    return new MobileAuthResponseEntity({
      success: true,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      session: new MobileSessionEntity(session.session),
      device: new MobileDeviceEntity(device),
      user: authResult.user,
    });
  }

  async refresh(dto: MobileRefreshDto) {
    const refreshTokenHash = this.hash(dto.refreshToken);
    const current = await this.prisma.mobileSession.findUnique({
      where: { refreshTokenHash },
      include: {
        user: {
          include: {
            roles: {
              include: {
                role: {
                  include: {
                    permissions: {
                      include: { permission: true },
                    },
                  },
                },
              },
            },
          },
        },
        device: true,
      },
    });

    if (!current || current.status !== 'ACTIVE') {
      throw new UnauthorizedException('Invalid mobile refresh token');
    }
    if (current.refreshExpiresAt <= new Date()) {
      await this.prisma.mobileSession.update({
        where: { id: current.id },
        data: { status: 'EXPIRED' },
      });
      throw new UnauthorizedException('Mobile refresh token expired');
    }

    const user = this.authUserFromRecord(current.user);
    const accessToken = this.signMobileToken(user, {
      sessionId: current.id,
      deviceId: current.deviceId,
      tenantId: current.tenantId,
      companyId: current.companyId,
      branchId: current.branchId,
    });
    const refreshToken = randomUUID();
    const updated = await this.prisma.mobileSession.update({
      where: { id: current.id },
      data: {
        sessionTokenHash: this.hash(accessToken),
        refreshTokenHash: this.hash(refreshToken),
        expiresAt: new Date(Date.now() + this.accessTokenTtlMs),
        refreshExpiresAt: new Date(Date.now() + this.refreshTokenTtlMs),
        lastSeenAt: new Date(),
      },
    });

    await this.audit.record({
      action: 'MOBILE_SESSION_REFRESH',
      entity: 'MobileSession',
      entityId: updated.id,
      payload: { userId: updated.userId, deviceId: updated.deviceId },
    });

    return new MobileAuthResponseEntity({
      success: true,
      accessToken,
      refreshToken,
      session: new MobileSessionEntity(updated),
      device: current.device ? new MobileDeviceEntity(current.device) : undefined,
      user,
    });
  }

  async logout(dto: MobileLogoutDto) {
    const session = await this.resolveSessionForLogout(dto);
    const updated = await this.prisma.mobileSession.update({
      where: { id: session.id },
      data: {
        status: 'REVOKED',
        revokedAt: new Date(),
        revokeReason: dto.reason ?? 'User logout',
      },
    });
    await this.audit.record({
      action: 'MOBILE_LOGOUT',
      entity: 'MobileSession',
      entityId: updated.id,
      payload: { userId: updated.userId, reason: updated.revokeReason },
    });
    return new MobileSessionEntity(updated);
  }

  async getBootstrap() {
    const userId = this.requireUserId();
    const tenantId = this.context.getTenantId();
    const [activeDevices, activeSessions, pendingPushNotifications] =
      await this.prisma.$transaction([
        this.prisma.mobileDevice.count({
          where: this.softDelete.activeWhere({
            userId,
            ...(tenantId ? { tenantId } : {}),
            status: 'ACTIVE',
          }),
        }),
        this.prisma.mobileSession.count({
          where: {
            userId,
            ...(tenantId ? { tenantId } : {}),
            status: 'ACTIVE',
            expiresAt: { gt: new Date() },
          },
        }),
        this.prisma.mobilePushNotification.count({
          where: {
            userId,
            ...(tenantId ? { tenantId } : {}),
            status: 'PENDING',
          },
        }),
      ]);

    return new MobileBootstrapEntity({
      serverTime: new Date(),
      user: (this.context.getUser() ?? {}) as unknown as Record<string, unknown>,
      activeDevices,
      activeSessions,
      pendingPushNotifications,
    });
  }

  async registerDevice(dto: RegisterMobileDeviceDto) {
    const device = await this.upsertDevice(this.requireUserId(), dto);
    await this.audit.record({
      action: 'MOBILE_DEVICE_REGISTER',
      entity: 'MobileDevice',
      entityId: device.id,
      payload: { userId: device.userId, platform: device.platform },
    });
    return new MobileDeviceEntity(device);
  }

  async findDevices(query: MobileDeviceQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.MobileDeviceWhereInput = this.softDelete.activeWhere({
      ...(tenantId ? { tenantId } : {}),
      ...(query.userId ? { userId: query.userId } : {}),
      ...(query.companyId ? { companyId: query.companyId } : {}),
      ...(query.branchId ? { branchId: query.branchId } : {}),
      ...(query.platform ? { platform: query.platform } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(normalized.search
        ? {
            OR: [
              { deviceIdentifier: { contains: normalized.search, mode: 'insensitive' } },
              { model: { contains: normalized.search, mode: 'insensitive' } },
              { manufacturer: { contains: normalized.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.mobileDevice.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.mobileDevice.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new MobileDeviceEntity(item)),
      total,
      query,
    );
  }

  async updateDevice(id: string, dto: UpdateMobileDeviceDto) {
    await this.ensureDeviceExists(id);
    const updated = await this.prisma.mobileDevice.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        branchId: dto.branchId,
        platform: dto.platform,
        appVersion: dto.appVersion,
        osVersion: dto.osVersion,
        model: dto.model,
        manufacturer: dto.manufacturer,
        pushToken: dto.pushToken,
        pushProvider: dto.pushProvider,
        status: dto.status,
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        lastSeenAt: new Date(),
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'MOBILE_DEVICE_UPDATE',
      entity: 'MobileDevice',
      entityId: updated.id,
      payload: { status: updated.status },
    });
    return new MobileDeviceEntity(updated);
  }

  async revokeDevice(id: string, dto: RevokeMobileDeviceDto) {
    const device = await this.ensureDeviceExists(id);
    const updated = await this.prisma.$transaction(async (tx) => {
      const revoked = await tx.mobileDevice.update({
        where: { id },
        data: {
          status: 'REVOKED',
          revokedAt: new Date(),
          updatedById: this.context.getUserId(),
        },
      });
      await tx.mobileSession.updateMany({
        where: { deviceId: device.id, status: 'ACTIVE' },
        data: {
          status: 'REVOKED',
          revokedAt: new Date(),
          revokeReason: dto.reason ?? 'Device revoked',
        },
      });
      return revoked;
    });
    await this.audit.record({
      action: 'MOBILE_DEVICE_REVOKE',
      entity: 'MobileDevice',
      entityId: id,
      payload: { userId: device.userId, reason: dto.reason },
    });
    return new MobileDeviceEntity(updated);
  }

  async findSessions(query: MobileSessionQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.MobileSessionWhereInput = {
      ...(tenantId ? { tenantId } : {}),
      ...(query.userId ? { userId: query.userId } : {}),
      ...(query.deviceId ? { deviceId: query.deviceId } : {}),
      ...(query.status ? { status: query.status } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.mobileSession.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.mobileSession.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new MobileSessionEntity(item)),
      total,
      query,
    );
  }

  async revokeSession(id: string, dto: MobileLogoutDto) {
    const session = await this.prisma.mobileSession.findUnique({ where: { id } });
    if (!session) throw new NotFoundException('Mobile session not found');
    const updated = await this.prisma.mobileSession.update({
      where: { id },
      data: {
        status: 'REVOKED',
        revokedAt: new Date(),
        revokeReason: dto.reason ?? 'Session revoked',
      },
    });
    await this.audit.record({
      action: 'MOBILE_SESSION_REVOKE',
      entity: 'MobileSession',
      entityId: updated.id,
      payload: { userId: updated.userId, reason: updated.revokeReason },
    });
    return new MobileSessionEntity(updated);
  }

  async createPushNotification(dto: CreateMobilePushNotificationDto) {
    if (dto.deviceId) await this.ensureDeviceExists(dto.deviceId);
    if (dto.userId) await this.ensureUserExists(dto.userId);
    const item = await this.prisma.mobilePushNotification.create({
      data: {
        tenantId: dto.tenantId ?? this.context.getTenantId(),
        userId: dto.userId,
        deviceId: dto.deviceId,
        provider: dto.provider ?? 'NONE',
        title: dto.title,
        message: dto.message,
        payload: dto.payload === undefined ? Prisma.JsonNull : this.toJson(dto.payload),
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'MOBILE_PUSH_CREATE',
      entity: 'MobilePushNotification',
      entityId: item.id,
      payload: { userId: item.userId, deviceId: item.deviceId },
    });
    return new MobilePushNotificationEntity(item);
  }

  async findPushNotifications(query: MobilePushQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.MobilePushNotificationWhereInput = {
      ...(tenantId ? { tenantId } : {}),
      ...(query.userId ? { userId: query.userId } : {}),
      ...(query.deviceId ? { deviceId: query.deviceId } : {}),
      ...(query.status ? { status: query.status } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.mobilePushNotification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.mobilePushNotification.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new MobilePushNotificationEntity(item)),
      total,
      query,
    );
  }

  async updatePushNotification(id: string, dto: UpdateMobilePushNotificationDto) {
    await this.ensurePushExists(id);
    const updated = await this.prisma.mobilePushNotification.update({
      where: { id },
      data: {
        provider: dto.provider,
        status: dto.status,
        title: dto.title,
        message: dto.message,
        payload: dto.payload === undefined ? undefined : this.toJson(dto.payload),
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
        sentAt: dto.status === 'SENT' ? new Date() : undefined,
        readAt: dto.status === 'READ' ? new Date() : undefined,
        failedAt: dto.status === 'FAILED' ? new Date() : undefined,
        error: dto.error,
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'MOBILE_PUSH_UPDATE',
      entity: 'MobilePushNotification',
      entityId: id,
      payload: { status: updated.status },
    });
    return new MobilePushNotificationEntity(updated);
  }

  async pullSyncChanges(dto: MobileSyncPullDto) {
    const userId = this.requireUserId();
    const tenantId = dto.tenantId ?? this.context.getTenantId();
    const since = dto.since
      ? new Date(dto.since)
      : dto.cursor
        ? new Date(dto.cursor)
        : undefined;
    const serverTime = new Date();
    const changes = await this.prisma.mobileSyncChange.findMany({
      where: {
        ...(tenantId ? { tenantId } : {}),
        ...(dto.companyId ? { companyId: dto.companyId } : {}),
        ...(dto.branchId ? { branchId: dto.branchId } : {}),
        ...(since ? { occurredAt: { gt: since } } : {}),
      },
      orderBy: { occurredAt: 'asc' },
      take: dto.limit ?? 100,
    });

    await this.upsertSyncCursor(userId, dto, serverTime.toISOString());
    await this.audit.record({
      action: 'MOBILE_SYNC_PULL',
      entity: 'MobileSyncCursor',
      entityId: dto.scope,
      payload: { scope: dto.scope, changes: changes.length, tenantId },
    });

    return new MobileSyncPullResponseEntity({
      scope: dto.scope,
      cursor: serverTime.toISOString(),
      serverTime,
      changes: changes.map((item) => new MobileSyncChangeEntity(item)),
    });
  }

  async createSyncChange(dto: CreateMobileSyncChangeDto) {
    const item = await this.prisma.mobileSyncChange.create({
      data: {
        tenantId: dto.tenantId ?? this.context.getTenantId(),
        companyId: dto.companyId,
        branchId: dto.branchId,
        entityType: dto.entityType,
        entityId: dto.entityId,
        operation: dto.operation,
        version: dto.version ?? 1,
        payload: dto.payload === undefined ? Prisma.JsonNull : this.toJson(dto.payload),
        metadata: dto.metadata === undefined ? Prisma.JsonNull : this.toJson(dto.metadata),
      },
    });
    await this.audit.record({
      action: 'MOBILE_SYNC_CHANGE_CREATE',
      entity: 'MobileSyncChange',
      entityId: item.id,
      payload: {
        entityType: item.entityType,
        entityId: item.entityId,
        operation: item.operation,
      },
    });
    return new MobileSyncChangeEntity(item);
  }

  async findSyncChanges(query: MobileSyncChangeQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.MobileSyncChangeWhereInput = {
      ...(tenantId ? { tenantId } : {}),
      ...(query.entityType ? { entityType: query.entityType } : {}),
      ...(query.syncStatus ? { syncStatus: query.syncStatus } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.mobileSyncChange.findMany({
        where,
        orderBy: { occurredAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.mobileSyncChange.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new MobileSyncChangeEntity(item)),
      total,
      query,
    );
  }

  private async createSession(
    authResult: AuthResult,
    deviceId: string,
    context: {
      tenantId?: string | null;
      companyId?: string | null;
      branchId?: string | null;
      metadata?: Record<string, unknown>;
    },
  ) {
    const sessionId = randomUUID();
    const accessToken = this.signMobileToken(authResult.user, {
      sessionId,
      deviceId,
      tenantId: context.tenantId,
      companyId: context.companyId,
      branchId: context.branchId,
    });
    const refreshToken = randomUUID();
    const now = Date.now();
    const session = await this.prisma.mobileSession.create({
      data: {
        id: sessionId,
        tenantId: context.tenantId,
        userId: authResult.user.id,
        deviceId,
        companyId: context.companyId,
        branchId: context.branchId,
        sessionTokenHash: this.hash(accessToken),
        refreshTokenHash: this.hash(refreshToken),
        expiresAt: new Date(now + this.accessTokenTtlMs),
        refreshExpiresAt: new Date(now + this.refreshTokenTtlMs),
        lastSeenAt: new Date(),
        ipAddress: this.context.getMetadata()?.ipAddress,
        userAgent: this.context.getMetadata()?.userAgent,
        metadata:
          context.metadata === undefined
            ? Prisma.JsonNull
            : this.toJson(context.metadata),
      },
    });
    return { accessToken, refreshToken, session };
  }

  private async upsertDevice(
    userId: string,
    dto: RegisterMobileDeviceDto | MobileLoginDto,
  ) {
    await this.ensureUserExists(userId);
    if (dto.tenantId) await this.ensureTenantExists(dto.tenantId);
    if (dto.companyId) await this.ensureCompanyExists(dto.companyId);
    if (dto.branchId) await this.ensureBranchExists(dto.branchId);

    return this.prisma.mobileDevice.upsert({
      where: {
        userId_deviceIdentifier: {
          userId,
          deviceIdentifier: dto.deviceIdentifier,
        },
      },
      create: {
        tenantId: dto.tenantId ?? this.context.getTenantId(),
        userId,
        companyId: dto.companyId ?? this.context.getCompanyId(),
        branchId: dto.branchId ?? this.context.getBranchId(),
        deviceIdentifier: dto.deviceIdentifier,
        platform: dto.platform,
        appVersion: dto.appVersion,
        osVersion: dto.osVersion,
        model: dto.model,
        manufacturer: dto.manufacturer,
        pushToken: dto.pushToken,
        pushProvider: dto.pushProvider ?? 'NONE',
        status: 'ACTIVE',
        lastSeenAt: new Date(),
        metadata: dto.metadata === undefined ? Prisma.JsonNull : this.toJson(dto.metadata),
        createdById: this.context.getUserId() ?? userId,
      },
      update: {
        tenantId: dto.tenantId ?? this.context.getTenantId(),
        companyId: dto.companyId ?? this.context.getCompanyId(),
        branchId: dto.branchId ?? this.context.getBranchId(),
        platform: dto.platform,
        appVersion: dto.appVersion,
        osVersion: dto.osVersion,
        model: dto.model,
        manufacturer: dto.manufacturer,
        pushToken: dto.pushToken,
        pushProvider: dto.pushProvider ?? 'NONE',
        status: 'ACTIVE',
        revokedAt: null,
        lastSeenAt: new Date(),
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        updatedById: this.context.getUserId() ?? userId,
      },
    });
  }

  private async upsertSyncCursor(
    userId: string,
    dto: MobileSyncPullDto,
    cursor: string,
  ) {
    const deviceId = dto.deviceId ?? null;
    const existing = await this.prisma.mobileSyncCursor.findFirst({
      where: {
        userId,
        deviceId,
        scope: dto.scope,
      },
      select: { id: true },
    });
    const data = {
      tenantId: dto.tenantId ?? this.context.getTenantId(),
      userId,
      deviceId,
      companyId: dto.companyId ?? this.context.getCompanyId(),
      branchId: dto.branchId ?? this.context.getBranchId(),
      scope: dto.scope,
      cursor,
      lastSyncedAt: new Date(),
      updatedById: this.context.getUserId(),
    };
    if (existing) {
      await this.prisma.mobileSyncCursor.update({ where: { id: existing.id }, data });
      return;
    }
    await this.prisma.mobileSyncCursor.create({
      data: {
        ...data,
        createdById: this.context.getUserId(),
      },
    });
  }

  private async resolveSessionForLogout(dto: MobileLogoutDto) {
    if (dto.sessionId) {
      const session = await this.prisma.mobileSession.findUnique({
        where: { id: dto.sessionId },
      });
      if (!session) throw new NotFoundException('Mobile session not found');
      return session;
    }
    if (dto.refreshToken) {
      const session = await this.prisma.mobileSession.findUnique({
        where: { refreshTokenHash: this.hash(dto.refreshToken) },
      });
      if (!session) throw new NotFoundException('Mobile session not found');
      return session;
    }
    throw new BadRequestException('sessionId or refreshToken is required');
  }

  private signMobileToken(
    user: AuthResult['user'],
    context: {
      sessionId: string;
      deviceId?: string | null;
      tenantId?: string | null;
      companyId?: string | null;
      branchId?: string | null;
    },
  ) {
    return this.jwt.sign(
      {
        sub: user.id,
        username: user.username,
        roles: user.roles,
        permissions: user.permissions,
        mobileSessionId: context.sessionId,
        mobileDeviceId: context.deviceId,
        tenantId: context.tenantId,
        companyId: context.companyId,
        branchId: context.branchId,
      },
      { expiresIn: '12h' },
    );
  }

  private authUserFromRecord(user: {
    id: string;
    username: string;
    email: string;
    fullName: string;
    status: string;
    roles: {
      role: {
        code: string;
        permissions: { permission: { code: string } }[];
      };
    }[];
  }): AuthResult['user'] {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      status: user.status,
      roles: [...new Set(user.roles.map((item) => item.role.code))],
      permissions: [
        ...new Set(
          user.roles.flatMap((item) =>
            item.role.permissions.map((p) => p.permission.code),
          ),
        ),
      ],
    };
  }

  private requireUserId() {
    const userId = this.context.getUserId();
    if (!userId) throw new UnauthorizedException('Authenticated user required');
    return userId;
  }

  private async ensureDeviceExists(id: string) {
    const device = await this.prisma.mobileDevice.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!device) throw new NotFoundException('Mobile device not found');
    return device;
  }

  private async ensurePushExists(id: string) {
    const item = await this.prisma.mobilePushNotification.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!item) throw new NotFoundException('Mobile push notification not found');
  }

  private async ensureUserExists(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!user) throw new NotFoundException('User not found');
  }

  private async ensureTenantExists(id: string) {
    const tenant = await this.prisma.tenant.findFirst({
      where: this.softDelete.activeWhere({ id }),
      select: { id: true },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');
  }

  private async ensureCompanyExists(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!company) throw new NotFoundException('Company not found');
  }

  private async ensureBranchExists(id: string) {
    const branch = await this.prisma.branch.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!branch) throw new NotFoundException('Branch not found');
  }

  private hash(value: string) {
    return createHash('sha256').update(value).digest('hex');
  }

  private toJson(
    value: unknown,
  ): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput {
    if (value === null) return Prisma.JsonNull;
    return value as Prisma.InputJsonValue;
  }

  private isTerminalPushStatus(status?: MobilePushStatus) {
    return status === 'SENT' || status === 'READ' || status === 'CANCELLED';
  }

  private isTerminalDeviceStatus(status?: MobileDeviceStatus) {
    return status === 'REVOKED' || status === 'LOST';
  }

  private isTerminalSessionStatus(status?: MobileSessionStatus) {
    return status === 'REVOKED' || status === 'EXPIRED';
  }
}
