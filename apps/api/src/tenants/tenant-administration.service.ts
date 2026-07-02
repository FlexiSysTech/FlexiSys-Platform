import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {
  Prisma,
  TenantProvisioningAction,
  TenantProvisioningStatus,
  TenantUsagePeriod,
} from '@prisma/client';

import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTenantUsageLimitDto,
  ProvisionTenantDto,
  RecordTenantProvisioningEventDto,
  TenantAdministrationQueryDto,
  TenantLifecycleReasonDto,
  UpdateTenantUsageLimitDto,
} from './dto/tenant-administration.dto';
import {
  TenantProvisioningEventEntity,
  TenantUsageLimitEntity,
} from './entities/tenant-administration.entity';
import { TenantEntity } from './entities/tenant-core.entity';
import { TenantsService } from './tenants.service';

@Injectable()
export class TenantAdministrationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenants: TenantsService,
    private readonly context: RequestContextService,
    private readonly pagination: PaginationService,
    private readonly audit: AuditService,
    private readonly softDelete: SoftDeleteService,
  ) {}

  async provisionTenant(dto: ProvisionTenantDto) {
    const tenant = await this.tenants.createTenant({
      ...dto,
      status: dto.status ?? 'PROVISIONING',
    });
    await this.recordEventInternal(tenant.id, 'PROVISION', 'SUCCESS', undefined, {
      code: tenant.code,
      plan: tenant.plan,
    });
    return tenant;
  }

  async activateTenant(id: string, dto: TenantLifecycleReasonDto) {
    const tenant = await this.tenants.updateTenant(id, { status: 'ACTIVE' });
    await this.recordLifecycle(id, 'ACTIVATE', dto.reason, tenant);
    return tenant;
  }

  async suspendTenant(id: string, dto: TenantLifecycleReasonDto) {
    const tenant = await this.tenants.updateTenant(id, { status: 'SUSPENDED' });
    await this.recordLifecycle(id, 'SUSPEND', dto.reason, tenant);
    return tenant;
  }

  async resumeTenant(id: string, dto: TenantLifecycleReasonDto) {
    const tenant = await this.tenants.updateTenant(id, { status: 'ACTIVE' });
    await this.recordLifecycle(id, 'RESUME', dto.reason, tenant);
    return tenant;
  }

  async archiveTenant(id: string, dto: TenantLifecycleReasonDto) {
    const tenant = await this.tenants.updateTenant(id, { status: 'ARCHIVED' });
    await this.recordLifecycle(id, 'ARCHIVE', dto.reason, tenant);
    return tenant;
  }

  async findUsageLimits(query: TenantAdministrationQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.TenantUsageLimitWhereInput = this.softDelete.activeWhere({
      ...(tenantId ? { tenantId } : {}),
      ...(query.key ? { key: query.key } : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.tenantUsageLimit.findMany({
        where,
        orderBy: [{ tenantId: 'asc' }, { key: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.tenantUsageLimit.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new TenantUsageLimitEntity(item)),
      total,
      query,
    );
  }

  async createUsageLimit(dto: CreateTenantUsageLimitDto) {
    await this.ensureTenantExists(dto.tenantId);
    await this.ensureUsageLimitUnique(dto.tenantId, dto.key, dto.period ?? 'MONTHLY');
    const item = await this.prisma.tenantUsageLimit.create({
      data: {
        tenantId: dto.tenantId,
        key: dto.key,
        limitValue: dto.limitValue,
        currentValue: dto.currentValue ?? 0,
        period: dto.period ?? 'MONTHLY',
        status: dto.status ?? 'ACTIVE',
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'TENANT_USAGE_LIMIT_CREATE',
      entity: 'TenantUsageLimit',
      entityId: item.id,
      payload: { tenantId: item.tenantId, key: item.key, period: item.period },
    });
    return new TenantUsageLimitEntity(item);
  }

  async updateUsageLimit(id: string, dto: UpdateTenantUsageLimitDto) {
    const current = await this.ensureUsageLimitExists(id);
    const tenantId = dto.tenantId ?? current.tenantId;
    const key = dto.key ?? current.key;
    const period = dto.period ?? current.period;
    if (dto.tenantId) await this.ensureTenantExists(dto.tenantId);
    if (dto.tenantId || dto.key || dto.period) {
      await this.ensureUsageLimitUnique(tenantId, key, period, id);
    }
    const item = await this.prisma.tenantUsageLimit.update({
      where: { id },
      data: {
        tenantId: dto.tenantId,
        key: dto.key,
        limitValue: dto.limitValue,
        currentValue: dto.currentValue,
        period: dto.period,
        status: dto.status,
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'TENANT_USAGE_LIMIT_UPDATE',
      entity: 'TenantUsageLimit',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });
    return new TenantUsageLimitEntity(item);
  }

  async removeUsageLimit(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.tenantUsageLimit as never,
      id,
    );
    await this.audit.record({
      action: 'TENANT_USAGE_LIMIT_DELETE',
      entity: 'TenantUsageLimit',
      entityId: id,
      payload: { deleted: true },
    });
    return {
      success: true,
      deletedUsageLimit: new TenantUsageLimitEntity(result.record),
    };
  }

  async findProvisioningEvents(query: TenantAdministrationQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.TenantProvisioningEventWhereInput = {
      ...(tenantId ? { tenantId } : {}),
      ...(query.action ? { action: query.action } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.tenantProvisioningEvent.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.tenantProvisioningEvent.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new TenantProvisioningEventEntity(item)),
      total,
      query,
    );
  }

  async recordProvisioningEvent(dto: RecordTenantProvisioningEventDto) {
    await this.ensureTenantExists(dto.tenantId);
    const item = await this.recordEventInternal(
      dto.tenantId,
      dto.action,
      'SUCCESS',
      dto.reason,
      dto.payload,
    );
    return new TenantProvisioningEventEntity(item);
  }

  private async recordLifecycle(
    tenantId: string,
    action: TenantProvisioningAction,
    reason: string | undefined,
    tenant: TenantEntity,
  ) {
    await this.recordEventInternal(tenantId, action, 'SUCCESS', reason, {
      status: tenant.status,
    });
  }

  private async recordEventInternal(
    tenantId: string,
    action: TenantProvisioningAction,
    status: TenantProvisioningStatus,
    reason?: string,
    payload?: Record<string, unknown>,
  ) {
    const item = await this.prisma.tenantProvisioningEvent.create({
      data: {
        tenantId,
        action,
        status,
        reason,
        payload: this.toJson(payload),
        actorId: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: `TENANT_${action}`,
      entity: 'TenantProvisioningEvent',
      entityId: item.id,
      payload: { tenantId, status, reason },
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

  private async ensureUsageLimitExists(id: string) {
    const item = await this.prisma.tenantUsageLimit.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Tenant usage limit not found');
    return item;
  }

  private async ensureUsageLimitUnique(
    tenantId: string,
    key: string,
    period: TenantUsagePeriod,
    excludeId?: string,
  ) {
    const item = await this.prisma.tenantUsageLimit.findFirst({
      where: {
        tenantId,
        key,
        period,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    if (item) throw new ConflictException('Tenant usage limit already exists');
  }

  private toJson(value: unknown): Prisma.InputJsonValue | undefined {
    return value === undefined ? undefined : (value as Prisma.InputJsonValue);
  }
}
