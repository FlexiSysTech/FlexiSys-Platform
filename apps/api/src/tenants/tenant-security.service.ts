import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Permission } from '../common/constants/permissions';
import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTenantPermissionPolicyDto,
  RecordTenantAuditEventDto,
  TenantSecurityQueryDto,
  UpdateTenantPermissionPolicyDto,
  ValidateTenantSecurityDto,
} from './dto/tenant-security.dto';
import {
  TenantAuditEventEntity,
  TenantPermissionPolicyEntity,
  TenantSecurityValidationEntity,
} from './entities/tenant-security.entity';
import { TenantIsolationService } from './tenant-isolation.service';

@Injectable()
export class TenantSecurityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
    private readonly pagination: PaginationService,
    private readonly audit: AuditService,
    private readonly softDelete: SoftDeleteService,
    private readonly isolation: TenantIsolationService,
  ) {}

  async findPermissionPolicies(query: TenantSecurityQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.TenantPermissionPolicyWhereInput =
      this.softDelete.activeWhere({
        ...(tenantId ? { tenantId } : {}),
        ...(query.permissionCode ? { permissionCode: query.permissionCode } : {}),
      });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.tenantPermissionPolicy.findMany({
        where,
        orderBy: [{ tenantId: 'asc' }, { permissionCode: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.tenantPermissionPolicy.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new TenantPermissionPolicyEntity(item)),
      total,
      query,
    );
  }

  async createPermissionPolicy(dto: CreateTenantPermissionPolicyDto) {
    await this.ensureTenantExists(dto.tenantId);
    this.assertKnownPermission(dto.permissionCode);
    await this.ensurePolicyUnique(dto.tenantId, dto.permissionCode);
    const item = await this.prisma.tenantPermissionPolicy.create({
      data: {
        tenantId: dto.tenantId,
        permissionCode: dto.permissionCode,
        allowed: dto.allowed ?? true,
        constraints: this.toJson(dto.constraints),
        status: dto.status ?? 'ACTIVE',
        createdById: this.context.getUserId(),
      },
    });
    await this.recordTenantAudit({
      tenantId: item.tenantId,
      action: 'TENANT_PERMISSION_POLICY_CREATE',
      entity: 'TenantPermissionPolicy',
      entityId: item.id,
      payload: { permissionCode: item.permissionCode, allowed: item.allowed },
    });
    return new TenantPermissionPolicyEntity(item);
  }

  async updatePermissionPolicy(id: string, dto: UpdateTenantPermissionPolicyDto) {
    const current = await this.ensurePolicyExists(id);
    if (dto.tenantId) await this.ensureTenantExists(dto.tenantId);
    if (dto.permissionCode) this.assertKnownPermission(dto.permissionCode);
    if (dto.tenantId || dto.permissionCode) {
      await this.ensurePolicyUnique(
        dto.tenantId ?? current.tenantId,
        dto.permissionCode ?? current.permissionCode,
        id,
      );
    }
    const item = await this.prisma.tenantPermissionPolicy.update({
      where: { id },
      data: {
        tenantId: dto.tenantId,
        permissionCode: dto.permissionCode,
        allowed: dto.allowed,
        constraints:
          dto.constraints === undefined ? undefined : this.toJson(dto.constraints),
        status: dto.status,
        updatedById: this.context.getUserId(),
      },
    });
    await this.recordTenantAudit({
      tenantId: item.tenantId,
      action: 'TENANT_PERMISSION_POLICY_UPDATE',
      entity: 'TenantPermissionPolicy',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });
    return new TenantPermissionPolicyEntity(item);
  }

  async removePermissionPolicy(id: string) {
    const current = await this.ensurePolicyExists(id);
    const result = await this.softDelete.softDelete(
      this.prisma.tenantPermissionPolicy as never,
      id,
    );
    await this.recordTenantAudit({
      tenantId: current.tenantId,
      action: 'TENANT_PERMISSION_POLICY_DELETE',
      entity: 'TenantPermissionPolicy',
      entityId: id,
      payload: { deleted: true },
    });
    return {
      success: true,
      deletedPolicy: new TenantPermissionPolicyEntity(result.record),
    };
  }

  async validateTenantSecurity(dto: ValidateTenantSecurityDto) {
    const tenantId = dto.tenantId ?? this.context.getTenantId();
    if (!tenantId) throw new BadRequestException('Tenant context is required');
    await this.isolation.validateScope({
      tenantId,
      companyId: dto.companyId,
      branchId: dto.branchId,
    });

    if (dto.permissionCode) {
      this.assertKnownPermission(dto.permissionCode);
      const policy = await this.prisma.tenantPermissionPolicy.findFirst({
        where: this.softDelete.activeWhere({
          tenantId,
          permissionCode: dto.permissionCode,
          status: 'ACTIVE',
        }),
      });
      if (policy && !policy.allowed) {
        return new TenantSecurityValidationEntity({
          allowed: false,
          tenantId,
          permissionCode: dto.permissionCode,
          reason: 'Tenant policy denies this permission',
        });
      }
    }

    return new TenantSecurityValidationEntity({
      allowed: true,
      tenantId,
      permissionCode: dto.permissionCode ?? null,
      reason: null,
    });
  }

  async findAuditEvents(query: TenantSecurityQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.TenantAuditEventWhereInput = {
      ...(tenantId ? { tenantId } : {}),
      ...(query.action ? { action: query.action } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.tenantAuditEvent.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.tenantAuditEvent.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new TenantAuditEventEntity(item)),
      total,
      query,
    );
  }

  async recordAuditEvent(dto: RecordTenantAuditEventDto) {
    await this.ensureTenantExists(dto.tenantId);
    const item = await this.recordTenantAudit(dto);
    return new TenantAuditEventEntity(item);
  }

  private async recordTenantAudit(dto: RecordTenantAuditEventDto) {
    const context = this.context.getContext();
    const item = await this.prisma.tenantAuditEvent.create({
      data: {
        tenantId: dto.tenantId,
        action: dto.action,
        entity: dto.entity,
        entityId: dto.entityId,
        payload: this.toJson(dto.payload),
        actorId: this.context.getUserId(),
        ipAddress: context?.metadata.ipAddress,
        userAgent: context?.metadata.userAgent,
      },
    });
    await this.audit.record({
      action: dto.action,
      entity: dto.entity,
      entityId: dto.entityId,
      payload: { tenantId: dto.tenantId, tenantAuditEventId: item.id },
    });
    return item;
  }

  private async ensureTenantExists(id: string) {
    const tenant = await this.prisma.tenant.findFirst({
      where: this.softDelete.activeWhere({ id }),
      select: { id: true },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');
  }

  private async ensurePolicyExists(id: string) {
    const item = await this.prisma.tenantPermissionPolicy.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Tenant permission policy not found');
    return item;
  }

  private async ensurePolicyUnique(
    tenantId: string,
    permissionCode: string,
    excludeId?: string,
  ) {
    const item = await this.prisma.tenantPermissionPolicy.findFirst({
      where: {
        tenantId,
        permissionCode,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    if (item) throw new ConflictException('Tenant permission policy already exists');
  }

  private assertKnownPermission(permissionCode: string) {
    if (!Object.values(Permission).includes(permissionCode as never)) {
      throw new BadRequestException('Unknown permission code');
    }
  }

  private toJson(value: unknown): Prisma.InputJsonValue | undefined {
    return value === undefined ? undefined : (value as Prisma.InputJsonValue);
  }
}
