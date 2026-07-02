import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import {
  Prisma,
  PublicApiLifecycle,
  PublicApiRateLimitWindow,
  PublicApiStatus,
} from '@prisma/client';

import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { StatusTransitionService } from '../platform/status-transitions';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreatePublicApiDto,
  CreatePublicApiGroupDto,
  CreatePublicApiVersionDto,
  PublicApiRegistryQueryDto,
  UpdatePublicApiDto,
  UpdatePublicApiGroupDto,
  UpdatePublicApiVersionDto,
} from './dto/public-api-registry.dto';
import {
  CreatePublicApiKeyDto,
  PublicApiKeyQueryDto,
  RotatePublicApiKeyDto,
} from './dto/public-api-keys.dto';
import {
  CreatePublicApiRateLimitPolicyDto,
  EvaluatePublicApiRateLimitDto,
  PublicApiRateLimitQueryDto,
  UpdatePublicApiRateLimitPolicyDto,
} from './dto/public-api-rate-limits.dto';
import {
  PublicApiKeyCreatedEntity,
  PublicApiKeyEntity,
} from './entities/public-api-key.entity';
import {
  PublicApiRateLimitEvaluationEntity,
  PublicApiRateLimitPolicyEntity,
  PublicApiUsageCounterEntity,
} from './entities/public-api-rate-limit.entity';
import {
  PublicApiEntity,
  PublicApiGroupEntity,
  PublicApiVersionEntity,
} from './entities/public-api-registry.entity';

@Injectable()
export class PublicApiService {
  private readonly statusRules = [
    {
      from: 'DRAFT' as PublicApiStatus,
      to: ['ACTIVE', 'ARCHIVED'] as PublicApiStatus[],
    },
    {
      from: 'ACTIVE' as PublicApiStatus,
      to: ['DEPRECATED', 'RETIRED', 'ARCHIVED'] as PublicApiStatus[],
    },
    {
      from: 'DEPRECATED' as PublicApiStatus,
      to: ['ACTIVE', 'RETIRED', 'ARCHIVED'] as PublicApiStatus[],
    },
    {
      from: 'RETIRED' as PublicApiStatus,
      to: ['ARCHIVED'] as PublicApiStatus[],
    },
  ];

  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
    private readonly pagination: PaginationService,
    private readonly audit: AuditService,
    private readonly softDelete: SoftDeleteService,
    private readonly transitions: StatusTransitionService,
  ) {}

  async findGroups(query: PublicApiRegistryQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.PublicApiGroupWhereInput = this.softDelete.activeWhere({
      ...(tenantId ? { tenantId } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(normalized.search
        ? {
            OR: [
              { code: { contains: normalized.search, mode: 'insensitive' } },
              { name: { contains: normalized.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.publicApiGroup.findMany({
        where,
        orderBy: { code: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.publicApiGroup.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new PublicApiGroupEntity(item)),
      total,
      query,
    );
  }

  async createGroup(dto: CreatePublicApiGroupDto) {
    const tenantId = await this.resolveTenantId(dto.tenantId);
    await this.ensureGroupUnique(tenantId, dto.code);
    const status = dto.status ?? 'DRAFT';
    this.assertStatus('DRAFT', status);
    const item = await this.prisma.publicApiGroup.create({
      data: {
        tenantId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        status,
        metadata: this.toJson(dto.metadata),
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PUBLIC_API_GROUP_CREATE',
      entity: 'PublicApiGroup',
      entityId: item.id,
      payload: { tenantId, code: item.code },
    });
    return new PublicApiGroupEntity(item);
  }

  async updateGroup(id: string, dto: UpdatePublicApiGroupDto) {
    const current = await this.ensureGroupExists(id);
    const tenantId =
      dto.tenantId === undefined ? current.tenantId : await this.resolveTenantId(dto.tenantId);
    const code = dto.code ?? current.code;
    if (dto.tenantId !== undefined || dto.code) {
      await this.ensureGroupUnique(tenantId, code, id);
    }
    if (dto.status && dto.status !== current.status) {
      this.assertStatus(current.status, dto.status);
    }
    const item = await this.prisma.publicApiGroup.update({
      where: { id },
      data: {
        tenantId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        status: dto.status,
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PUBLIC_API_GROUP_UPDATE',
      entity: 'PublicApiGroup',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });
    return new PublicApiGroupEntity(item);
  }

  async removeGroup(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.publicApiGroup as never,
      id,
    );
    await this.audit.record({
      action: 'PUBLIC_API_GROUP_DELETE',
      entity: 'PublicApiGroup',
      entityId: id,
      payload: { deleted: true },
    });
    return { success: true, deletedGroup: new PublicApiGroupEntity(result.record) };
  }

  async findApis(query: PublicApiRegistryQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.PublicApiRegistryWhereInput = this.softDelete.activeWhere({
      ...(tenantId ? { tenantId } : {}),
      ...(query.groupId ? { groupId: query.groupId } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(query.lifecycle ? { lifecycle: query.lifecycle } : {}),
      ...(normalized.search
        ? {
            OR: [
              { code: { contains: normalized.search, mode: 'insensitive' } },
              { name: { contains: normalized.search, mode: 'insensitive' } },
              { basePath: { contains: normalized.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.publicApiRegistry.findMany({
        where,
        orderBy: [{ code: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.publicApiRegistry.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new PublicApiEntity(item)),
      total,
      query,
    );
  }

  async createApi(dto: CreatePublicApiDto) {
    const tenantId = await this.resolveTenantId(dto.tenantId);
    if (dto.groupId) await this.ensureGroupExists(dto.groupId, tenantId);
    await this.ensureApiUnique(tenantId, dto.code);
    const status = dto.status ?? 'DRAFT';
    this.assertStatus('DRAFT', status);
    const item = await this.prisma.publicApiRegistry.create({
      data: {
        tenantId,
        groupId: dto.groupId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        basePath: dto.basePath,
        status,
        lifecycle: dto.lifecycle ?? this.lifecycleForStatus(status),
        metadata: this.toJson(dto.metadata),
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PUBLIC_API_CREATE',
      entity: 'PublicApiRegistry',
      entityId: item.id,
      payload: { tenantId, code: item.code, basePath: item.basePath },
    });
    return new PublicApiEntity(item);
  }

  async updateApi(id: string, dto: UpdatePublicApiDto) {
    const current = await this.ensureApiExists(id);
    const tenantId =
      dto.tenantId === undefined ? current.tenantId : await this.resolveTenantId(dto.tenantId);
    const code = dto.code ?? current.code;
    if (dto.groupId) await this.ensureGroupExists(dto.groupId, tenantId);
    if (dto.tenantId !== undefined || dto.code) {
      await this.ensureApiUnique(tenantId, code, id);
    }
    if (dto.status && dto.status !== current.status) {
      this.assertStatus(current.status, dto.status);
    }
    const item = await this.prisma.publicApiRegistry.update({
      where: { id },
      data: {
        tenantId,
        groupId: dto.groupId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        basePath: dto.basePath,
        status: dto.status,
        lifecycle: dto.lifecycle ?? (dto.status ? this.lifecycleForStatus(dto.status) : undefined),
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PUBLIC_API_UPDATE',
      entity: 'PublicApiRegistry',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });
    return new PublicApiEntity(item);
  }

  async removeApi(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.publicApiRegistry as never,
      id,
    );
    await this.audit.record({
      action: 'PUBLIC_API_DELETE',
      entity: 'PublicApiRegistry',
      entityId: id,
      payload: { deleted: true },
    });
    return { success: true, deletedApi: new PublicApiEntity(result.record) };
  }

  async findVersions(query: PublicApiRegistryQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.PublicApiVersionWhereInput = this.softDelete.activeWhere({
      ...(query.status ? { status: query.status } : {}),
      ...(query.lifecycle ? { lifecycle: query.lifecycle } : {}),
      ...(query.groupId || tenantId
        ? {
            api: {
              ...(query.groupId ? { groupId: query.groupId } : {}),
              ...(tenantId ? { tenantId } : {}),
            },
          }
        : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.publicApiVersion.findMany({
        where,
        orderBy: [{ apiId: 'asc' }, { version: 'desc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.publicApiVersion.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new PublicApiVersionEntity(item)),
      total,
      query,
    );
  }

  async createVersion(dto: CreatePublicApiVersionDto) {
    await this.ensureApiExists(dto.apiId);
    await this.ensureVersionUnique(dto.apiId, dto.version);
    const status = dto.status ?? 'DRAFT';
    this.assertStatus('DRAFT', status);
    const item = await this.prisma.publicApiVersion.create({
      data: {
        apiId: dto.apiId,
        version: dto.version,
        pathPrefix: dto.pathPrefix,
        status,
        lifecycle: dto.lifecycle ?? this.lifecycleForStatus(status),
        releasedAt: dto.releasedAt ? new Date(dto.releasedAt) : undefined,
        deprecatedAt: dto.deprecatedAt ? new Date(dto.deprecatedAt) : undefined,
        metadata: this.toJson(dto.metadata),
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PUBLIC_API_VERSION_CREATE',
      entity: 'PublicApiVersion',
      entityId: item.id,
      payload: { apiId: item.apiId, version: item.version },
    });
    return new PublicApiVersionEntity(item);
  }

  async updateVersion(id: string, dto: UpdatePublicApiVersionDto) {
    const current = await this.ensureVersionExists(id);
    if (dto.apiId) await this.ensureApiExists(dto.apiId);
    if (dto.apiId || dto.version) {
      await this.ensureVersionUnique(
        dto.apiId ?? current.apiId,
        dto.version ?? current.version,
        id,
      );
    }
    if (dto.status && dto.status !== current.status) {
      this.assertStatus(current.status, dto.status);
    }
    const item = await this.prisma.publicApiVersion.update({
      where: { id },
      data: {
        apiId: dto.apiId,
        version: dto.version,
        pathPrefix: dto.pathPrefix,
        status: dto.status,
        lifecycle: dto.lifecycle ?? (dto.status ? this.lifecycleForStatus(dto.status) : undefined),
        releasedAt: dto.releasedAt ? new Date(dto.releasedAt) : undefined,
        deprecatedAt: dto.deprecatedAt ? new Date(dto.deprecatedAt) : undefined,
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PUBLIC_API_VERSION_UPDATE',
      entity: 'PublicApiVersion',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });
    return new PublicApiVersionEntity(item);
  }

  async findKeys(query: PublicApiKeyQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.PublicApiKeyWhereInput = this.softDelete.activeWhere({
      ...(tenantId ? { tenantId } : {}),
      ...(query.applicationId ? { applicationId: query.applicationId } : {}),
      ...(query.status ? { status: query.status } : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.publicApiKey.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.publicApiKey.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new PublicApiKeyEntity(item)),
      total,
      query,
    );
  }

  async createKey(dto: CreatePublicApiKeyDto) {
    const tenantId = await this.resolveTenantId(dto.tenantId);
    if (dto.applicationId) {
      await this.ensureApplicationExists(dto.applicationId, tenantId);
    }
    const credentials = this.generateCredentials();
    const item = await this.prisma.publicApiKey.create({
      data: {
        tenantId,
        applicationId: dto.applicationId,
        name: dto.name,
        keyId: credentials.keyId,
        secretHash: this.hashSecret(credentials.secret),
        scopes: this.toJson(dto.scopes ?? []),
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PUBLIC_API_KEY_CREATE',
      entity: 'PublicApiKey',
      entityId: item.id,
      payload: { tenantId, applicationId: item.applicationId, keyId: item.keyId },
    });
    return new PublicApiKeyCreatedEntity({ ...item, secret: credentials.secret });
  }

  async rotateKey(id: string, dto: RotatePublicApiKeyDto) {
    const current = await this.ensureKeyExists(id);
    const credentials = this.generateCredentials();
    const item = await this.prisma.$transaction(async (tx) => {
      await tx.publicApiKey.update({
        where: { id },
        data: {
          status: 'ROTATED',
          rotatedAt: new Date(),
          updatedById: this.context.getUserId(),
        },
      });
      return tx.publicApiKey.create({
        data: {
          tenantId: current.tenantId,
          applicationId: current.applicationId,
          name: current.name,
          keyId: credentials.keyId,
          secretHash: this.hashSecret(credentials.secret),
          scopes: current.scopes ?? Prisma.JsonNull,
          expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : current.expiresAt,
          createdById: this.context.getUserId(),
        },
      });
    });
    await this.audit.record({
      action: 'PUBLIC_API_KEY_ROTATE',
      entity: 'PublicApiKey',
      entityId: item.id,
      payload: { previousKeyId: current.keyId, keyId: item.keyId },
    });
    return new PublicApiKeyCreatedEntity({ ...item, secret: credentials.secret });
  }

  async revokeKey(id: string) {
    const current = await this.ensureKeyExists(id);
    const item = await this.prisma.publicApiKey.update({
      where: { id },
      data: {
        status: 'REVOKED',
        revokedAt: new Date(),
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PUBLIC_API_KEY_REVOKE',
      entity: 'PublicApiKey',
      entityId: id,
      payload: { keyId: current.keyId },
    });
    return new PublicApiKeyEntity(item);
  }

  async findRateLimitPolicies(query: PublicApiRateLimitQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.PublicApiRateLimitPolicyWhereInput =
      this.softDelete.activeWhere({
        ...(tenantId ? { tenantId } : {}),
        ...(query.applicationId ? { applicationId: query.applicationId } : {}),
        ...(query.apiId ? { apiId: query.apiId } : {}),
        ...(query.endpoint ? { endpoint: query.endpoint } : {}),
      });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.publicApiRateLimitPolicy.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.publicApiRateLimitPolicy.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new PublicApiRateLimitPolicyEntity(item)),
      total,
      query,
    );
  }

  async createRateLimitPolicy(dto: CreatePublicApiRateLimitPolicyDto) {
    const tenantId = await this.resolveTenantId(dto.tenantId);
    if (dto.applicationId) await this.ensureApplicationExists(dto.applicationId, tenantId);
    if (dto.apiId) await this.ensureApiExists(dto.apiId);
    const item = await this.prisma.publicApiRateLimitPolicy.create({
      data: {
        tenantId,
        applicationId: dto.applicationId,
        apiId: dto.apiId,
        endpoint: dto.endpoint,
        name: dto.name,
        limitValue: dto.limitValue,
        window: dto.window ?? 'MINUTE',
        status: dto.status ?? 'ACTIVE',
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PUBLIC_API_RATE_LIMIT_CREATE',
      entity: 'PublicApiRateLimitPolicy',
      entityId: item.id,
      payload: { tenantId, limitValue: item.limitValue, window: item.window },
    });
    return new PublicApiRateLimitPolicyEntity(item);
  }

  async updateRateLimitPolicy(
    id: string,
    dto: UpdatePublicApiRateLimitPolicyDto,
  ) {
    const current = await this.ensureRateLimitPolicyExists(id);
    const tenantId =
      dto.tenantId === undefined ? current.tenantId : await this.resolveTenantId(dto.tenantId);
    if (dto.applicationId) await this.ensureApplicationExists(dto.applicationId, tenantId);
    if (dto.apiId) await this.ensureApiExists(dto.apiId);
    const item = await this.prisma.publicApiRateLimitPolicy.update({
      where: { id },
      data: {
        tenantId,
        applicationId: dto.applicationId,
        apiId: dto.apiId,
        endpoint: dto.endpoint,
        name: dto.name,
        limitValue: dto.limitValue,
        window: dto.window,
        status: dto.status,
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PUBLIC_API_RATE_LIMIT_UPDATE',
      entity: 'PublicApiRateLimitPolicy',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });
    return new PublicApiRateLimitPolicyEntity(item);
  }

  async removeRateLimitPolicy(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.publicApiRateLimitPolicy as never,
      id,
    );
    await this.audit.record({
      action: 'PUBLIC_API_RATE_LIMIT_DELETE',
      entity: 'PublicApiRateLimitPolicy',
      entityId: id,
      payload: { deleted: true },
    });
    return {
      success: true,
      deletedPolicy: new PublicApiRateLimitPolicyEntity(
        result.record as Partial<PublicApiRateLimitPolicyEntity>,
      ),
    };
  }

  async evaluateRateLimit(dto: EvaluatePublicApiRateLimitDto) {
    const tenantId = await this.resolveTenantId(dto.tenantId);
    const policy = await this.findBestRateLimitPolicy({
      tenantId,
      applicationId: dto.applicationId ?? null,
      apiId: dto.apiId ?? null,
      endpoint: dto.endpoint ?? null,
    });
    if (!policy) {
      return new PublicApiRateLimitEvaluationEntity({
        allowed: true,
        remaining: Number.MAX_SAFE_INTEGER,
        policyId: null,
        reason: null,
      });
    }

    const window = this.getWindow(policy.window);
    const counterKey = this.buildCounterKey(
      tenantId,
      dto.applicationId,
      dto.apiId,
      dto.endpoint,
      policy.window,
      window.start,
    );
    const requestCount = dto.requestCount ?? 1;
    const counter = await this.prisma.publicApiUsageCounter.upsert({
      where: { counterKey },
      create: {
        counterKey,
        tenantId,
        applicationId: dto.applicationId,
        apiId: dto.apiId,
        endpoint: dto.endpoint,
        window: policy.window,
        windowStart: window.start,
        windowEnd: window.end,
        requestCount,
      },
      update: {
        requestCount: { increment: requestCount },
      },
    });
    const remaining = Math.max(0, policy.limitValue - counter.requestCount);
    return new PublicApiRateLimitEvaluationEntity({
      allowed: counter.requestCount <= policy.limitValue,
      remaining,
      policyId: policy.id,
      reason:
        counter.requestCount <= policy.limitValue ? null : 'Public API quota exceeded',
    });
  }

  async findUsageCounters(query: PublicApiRateLimitQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.PublicApiUsageCounterWhereInput = {
      ...(tenantId ? { tenantId } : {}),
      ...(query.applicationId ? { applicationId: query.applicationId } : {}),
      ...(query.apiId ? { apiId: query.apiId } : {}),
      ...(query.endpoint ? { endpoint: query.endpoint } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.publicApiUsageCounter.findMany({
        where,
        orderBy: { windowStart: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.publicApiUsageCounter.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new PublicApiUsageCounterEntity(item)),
      total,
      query,
    );
  }

  private async resolveTenantId(tenantId?: string | null): Promise<string | null> {
    const resolved = tenantId ?? this.context.getTenantId();
    if (!resolved) return null;
    const tenant = await this.prisma.tenant.findFirst({
      where: this.softDelete.activeWhere({ id: resolved }),
      select: { id: true },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return resolved;
  }

  private assertStatus(currentStatus: PublicApiStatus, nextStatus: PublicApiStatus) {
    if (currentStatus === nextStatus) return;
    this.transitions.assertTransition({
      entity: 'PublicApi',
      currentStatus,
      nextStatus,
      rules: this.statusRules,
    });
  }

  private lifecycleForStatus(status: PublicApiStatus): PublicApiLifecycle {
    if (status === 'ACTIVE') return 'PUBLISHED';
    if (status === 'DEPRECATED') return 'DEPRECATED';
    if (status === 'RETIRED' || status === 'ARCHIVED') return 'RETIRED';
    return 'DESIGN';
  }

  private async ensureGroupExists(id: string, tenantId?: string | null) {
    const item = await this.prisma.publicApiGroup.findFirst({
      where: this.softDelete.activeWhere({
        id,
        ...(tenantId !== undefined ? { tenantId } : {}),
      }),
    });
    if (!item) throw new NotFoundException('Public API group not found');
    return item;
  }

  private async ensureApiExists(id: string) {
    const item = await this.prisma.publicApiRegistry.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Public API not found');
    return item;
  }

  private async ensureVersionExists(id: string) {
    const item = await this.prisma.publicApiVersion.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Public API version not found');
    return item;
  }

  private async ensureApplicationExists(id: string, tenantId?: string | null) {
    const item = await this.prisma.publicApiApplication.findFirst({
      where: this.softDelete.activeWhere({
        id,
        ...(tenantId !== undefined ? { tenantId } : {}),
      }),
    });
    if (!item) throw new NotFoundException('Public API application not found');
    return item;
  }

  private async ensureKeyExists(id: string) {
    const item = await this.prisma.publicApiKey.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Public API key not found');
    return item;
  }

  private async ensureRateLimitPolicyExists(id: string) {
    const item = await this.prisma.publicApiRateLimitPolicy.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Public API rate limit policy not found');
    return item;
  }

  private async findBestRateLimitPolicy(criteria: {
    tenantId: string | null;
    applicationId: string | null;
    apiId: string | null;
    endpoint: string | null;
  }) {
    const policies = await this.prisma.publicApiRateLimitPolicy.findMany({
      where: this.softDelete.activeWhere({
        status: 'ACTIVE',
        OR: [
          {
            tenantId: criteria.tenantId,
            applicationId: criteria.applicationId,
            apiId: criteria.apiId,
            endpoint: criteria.endpoint,
          },
          {
            tenantId: criteria.tenantId,
            applicationId: criteria.applicationId,
            apiId: criteria.apiId,
            endpoint: null,
          },
          {
            tenantId: criteria.tenantId,
            applicationId: criteria.applicationId,
            apiId: null,
            endpoint: null,
          },
          {
            tenantId: criteria.tenantId,
            applicationId: null,
            apiId: null,
            endpoint: null,
          },
        ],
      }),
      orderBy: { limitValue: 'asc' },
    });
    return policies[0] ?? null;
  }

  private getWindow(window: PublicApiRateLimitWindow) {
    const start = new Date();
    start.setSeconds(0, 0);
    const end = new Date(start);
    if (window === 'MINUTE') end.setMinutes(end.getMinutes() + 1);
    if (window === 'HOUR') end.setHours(end.getHours() + 1);
    if (window === 'DAY') end.setDate(end.getDate() + 1);
    if (window === 'MONTH') end.setMonth(end.getMonth() + 1);
    return { start, end };
  }

  private buildCounterKey(
    tenantId: string | null,
    applicationId: string | undefined,
    apiId: string | undefined,
    endpoint: string | undefined,
    window: PublicApiRateLimitWindow,
    windowStart: Date,
  ) {
    return [
      tenantId ?? 'global',
      applicationId ?? 'any-app',
      apiId ?? 'any-api',
      endpoint ?? 'any-endpoint',
      window,
      windowStart.toISOString(),
    ].join(':');
  }

  private async ensureGroupUnique(
    tenantId: string | null,
    code: string,
    excludeId?: string,
  ) {
    const item = await this.prisma.publicApiGroup.findFirst({
      where: { tenantId, code, ...(excludeId ? { id: { not: excludeId } } : {}) },
    });
    if (item) throw new ConflictException('Public API group already exists');
  }

  private async ensureApiUnique(
    tenantId: string | null,
    code: string,
    excludeId?: string,
  ) {
    const item = await this.prisma.publicApiRegistry.findFirst({
      where: { tenantId, code, ...(excludeId ? { id: { not: excludeId } } : {}) },
    });
    if (item) throw new ConflictException('Public API already exists');
  }

  private async ensureVersionUnique(
    apiId: string,
    version: string,
    excludeId?: string,
  ) {
    const item = await this.prisma.publicApiVersion.findFirst({
      where: { apiId, version, ...(excludeId ? { id: { not: excludeId } } : {}) },
    });
    if (item) throw new ConflictException('Public API version already exists');
  }

  private toJson(value: unknown): Prisma.InputJsonValue | undefined {
    return value === undefined ? undefined : (value as Prisma.InputJsonValue);
  }

  private generateCredentials() {
    return {
      keyId: `pak_${randomBytes(12).toString('hex')}`,
      secret: `pas_${randomBytes(32).toString('hex')}`,
    };
  }

  private hashSecret(secret: string) {
    return createHash('sha256').update(secret).digest('hex');
  }
}
