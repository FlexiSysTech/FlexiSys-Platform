import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, TenantConfigurationStatus } from '@prisma/client';

import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { StatusTransitionService } from '../platform/status-transitions';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTenantFeatureFlagDto,
  CreateTenantLocalizationDto,
  CreateTenantSettingDto,
  TenantConfigurationQueryDto,
  UpdateTenantFeatureFlagDto,
  UpdateTenantLocalizationDto,
  UpdateTenantSettingDto,
  UpsertTenantBrandingDto,
} from './dto/tenant-configuration.dto';
import {
  TenantBrandingEntity,
  TenantFeatureFlagEntity,
  TenantLocalizationEntity,
  TenantSettingEntity,
} from './entities/tenant-configuration.entity';

@Injectable()
export class TenantConfigurationService {
  private readonly statusRules = [
    {
      from: 'ACTIVE' as TenantConfigurationStatus,
      to: ['INACTIVE', 'ARCHIVED'] as TenantConfigurationStatus[],
    },
    {
      from: 'INACTIVE' as TenantConfigurationStatus,
      to: ['ACTIVE', 'ARCHIVED'] as TenantConfigurationStatus[],
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

  async findSettings(query: TenantConfigurationQueryDto) {
    const where: Prisma.TenantSettingWhereInput = this.softDelete.activeWhere({
      ...(await this.tenantFilter(query.tenantId)),
      ...(query.key ? { key: query.key } : {}),
      ...(query.status ? { status: query.status } : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.tenantSetting.findMany({
        where,
        orderBy: { key: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.tenantSetting.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new TenantSettingEntity(item)),
      total,
      query,
    );
  }

  async createSetting(dto: CreateTenantSettingDto) {
    await this.ensureTenantExists(dto.tenantId);
    await this.ensureUnique('setting', dto.tenantId, dto.key);
    const status = dto.status ?? 'ACTIVE';
    this.assertStatus('ACTIVE', status);
    const item = await this.prisma.tenantSetting.create({
      data: {
        tenantId: dto.tenantId,
        key: dto.key,
        value: this.toJson(dto.value),
        isSecret: dto.isSecret ?? false,
        secretRef: dto.secretRef,
        status,
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'TENANT_SETTING_CREATE',
      entity: 'TenantSetting',
      entityId: item.id,
      payload: { tenantId: item.tenantId, key: item.key },
    });
    return new TenantSettingEntity(item);
  }

  async updateSetting(id: string, dto: UpdateTenantSettingDto) {
    const current = await this.ensureSettingExists(id);
    if (dto.tenantId) await this.ensureTenantExists(dto.tenantId);
    if (dto.key && (dto.key !== current.key || dto.tenantId)) {
      await this.ensureUnique('setting', dto.tenantId ?? current.tenantId, dto.key, id);
    }
    if (dto.status && dto.status !== current.status) {
      this.assertStatus(current.status, dto.status);
    }
    const item = await this.prisma.tenantSetting.update({
      where: { id },
      data: {
        tenantId: dto.tenantId,
        key: dto.key,
        value: dto.value === undefined ? undefined : this.toJson(dto.value),
        isSecret: dto.isSecret,
        secretRef: dto.secretRef,
        status: dto.status,
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'TENANT_SETTING_UPDATE',
      entity: 'TenantSetting',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });
    return new TenantSettingEntity(item);
  }

  async removeSetting(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.tenantSetting as never,
      id,
    );
    await this.audit.record({
      action: 'TENANT_SETTING_DELETE',
      entity: 'TenantSetting',
      entityId: id,
      payload: { deleted: true },
    });
    return { success: true, deletedSetting: new TenantSettingEntity(result.record) };
  }

  async findFeatureFlags(query: TenantConfigurationQueryDto) {
    const where: Prisma.TenantFeatureFlagWhereInput = this.softDelete.activeWhere({
      ...(await this.tenantFilter(query.tenantId)),
      ...(query.key ? { key: query.key } : {}),
      ...(query.status ? { status: query.status } : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.tenantFeatureFlag.findMany({
        where,
        orderBy: { key: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.tenantFeatureFlag.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new TenantFeatureFlagEntity(item)),
      total,
      query,
    );
  }

  async createFeatureFlag(dto: CreateTenantFeatureFlagDto) {
    await this.ensureTenantExists(dto.tenantId);
    await this.ensureUnique('flag', dto.tenantId, dto.key);
    const status = dto.status ?? 'ACTIVE';
    this.assertStatus('ACTIVE', status);
    const item = await this.prisma.tenantFeatureFlag.create({
      data: {
        tenantId: dto.tenantId,
        key: dto.key,
        enabled: dto.enabled ?? false,
        config: this.toJson(dto.config),
        status,
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'TENANT_FEATURE_FLAG_CREATE',
      entity: 'TenantFeatureFlag',
      entityId: item.id,
      payload: { tenantId: item.tenantId, key: item.key, enabled: item.enabled },
    });
    return new TenantFeatureFlagEntity(item);
  }

  async updateFeatureFlag(id: string, dto: UpdateTenantFeatureFlagDto) {
    const current = await this.ensureFeatureFlagExists(id);
    if (dto.tenantId) await this.ensureTenantExists(dto.tenantId);
    if (dto.key && (dto.key !== current.key || dto.tenantId)) {
      await this.ensureUnique('flag', dto.tenantId ?? current.tenantId, dto.key, id);
    }
    if (dto.status && dto.status !== current.status) {
      this.assertStatus(current.status, dto.status);
    }
    const item = await this.prisma.tenantFeatureFlag.update({
      where: { id },
      data: {
        tenantId: dto.tenantId,
        key: dto.key,
        enabled: dto.enabled,
        config: dto.config === undefined ? undefined : this.toJson(dto.config),
        status: dto.status,
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'TENANT_FEATURE_FLAG_UPDATE',
      entity: 'TenantFeatureFlag',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });
    return new TenantFeatureFlagEntity(item);
  }

  async removeFeatureFlag(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.tenantFeatureFlag as never,
      id,
    );
    await this.audit.record({
      action: 'TENANT_FEATURE_FLAG_DELETE',
      entity: 'TenantFeatureFlag',
      entityId: id,
      payload: { deleted: true },
    });
    return { success: true, deletedFlag: new TenantFeatureFlagEntity(result.record) };
  }

  async findLocalizations(query: TenantConfigurationQueryDto) {
    const where: Prisma.TenantLocalizationWhereInput = this.softDelete.activeWhere({
      ...(await this.tenantFilter(query.tenantId)),
      ...(query.locale ? { locale: query.locale } : {}),
      ...(query.status ? { status: query.status } : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.tenantLocalization.findMany({
        where,
        orderBy: { locale: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.tenantLocalization.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new TenantLocalizationEntity(item)),
      total,
      query,
    );
  }

  async createLocalization(dto: CreateTenantLocalizationDto) {
    await this.ensureTenantExists(dto.tenantId);
    await this.ensureUnique('locale', dto.tenantId, dto.locale);
    const item = await this.prisma.tenantLocalization.create({
      data: {
        tenantId: dto.tenantId,
        locale: dto.locale,
        timezone: dto.timezone,
        dateFormat: dto.dateFormat,
        timeFormat: dto.timeFormat,
        currency: dto.currency,
        status: dto.status ?? 'ACTIVE',
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'TENANT_LOCALIZATION_CREATE',
      entity: 'TenantLocalization',
      entityId: item.id,
      payload: { tenantId: item.tenantId, locale: item.locale },
    });
    return new TenantLocalizationEntity(item);
  }

  async updateLocalization(id: string, dto: UpdateTenantLocalizationDto) {
    const current = await this.ensureLocalizationExists(id);
    if (dto.status && dto.status !== current.status) {
      this.assertStatus(current.status, dto.status);
    }
    const item = await this.prisma.tenantLocalization.update({
      where: { id },
      data: {
        timezone: dto.timezone,
        dateFormat: dto.dateFormat,
        timeFormat: dto.timeFormat,
        currency: dto.currency,
        status: dto.status,
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'TENANT_LOCALIZATION_UPDATE',
      entity: 'TenantLocalization',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });
    return new TenantLocalizationEntity(item);
  }

  async upsertBranding(dto: UpsertTenantBrandingDto) {
    await this.ensureTenantExists(dto.tenantId);
    const item = await this.prisma.tenantBranding.upsert({
      where: { tenantId: dto.tenantId },
      create: {
        tenantId: dto.tenantId,
        brandName: dto.brandName,
        logoUrl: dto.logoUrl,
        faviconUrl: dto.faviconUrl,
        primaryColor: dto.primaryColor,
        secondaryColor: dto.secondaryColor,
        accentColor: dto.accentColor,
        metadata: this.toJson(dto.metadata),
        status: dto.status ?? 'ACTIVE',
        createdById: this.context.getUserId(),
      },
      update: {
        brandName: dto.brandName,
        logoUrl: dto.logoUrl,
        faviconUrl: dto.faviconUrl,
        primaryColor: dto.primaryColor,
        secondaryColor: dto.secondaryColor,
        accentColor: dto.accentColor,
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        status: dto.status,
        deletedAt: null,
        deletedById: null,
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'TENANT_BRANDING_UPSERT',
      entity: 'TenantBranding',
      entityId: item.id,
      payload: { tenantId: item.tenantId },
    });
    return new TenantBrandingEntity(item);
  }

  private async tenantFilter(tenantId?: string) {
    const resolvedTenantId = tenantId ?? this.context.getTenantId();
    return resolvedTenantId ? { tenantId: resolvedTenantId } : {};
  }

  private assertStatus(
    currentStatus: TenantConfigurationStatus,
    nextStatus: TenantConfigurationStatus,
  ) {
    if (currentStatus === nextStatus) return;
    this.transitions.assertTransition({
      entity: 'TenantConfiguration',
      currentStatus,
      nextStatus,
      rules: this.statusRules,
    });
  }

  private async ensureTenantExists(id: string) {
    const tenant = await this.prisma.tenant.findFirst({
      where: this.softDelete.activeWhere({ id }),
      select: { id: true },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');
  }

  private async ensureUnique(
    type: 'setting' | 'flag' | 'locale',
    tenantId: string,
    key: string,
    excludeId?: string,
  ) {
    const where = {
      tenantId,
      ...(type === 'locale' ? { locale: key } : { key }),
      ...(excludeId ? { id: { not: excludeId } } : {}),
    };
    const existing =
      type === 'setting'
        ? await this.prisma.tenantSetting.findFirst({ where })
        : type === 'flag'
          ? await this.prisma.tenantFeatureFlag.findFirst({ where })
          : await this.prisma.tenantLocalization.findFirst({ where });
    if (existing) throw new ConflictException('Tenant configuration already exists');
  }

  private async ensureSettingExists(id: string) {
    const item = await this.prisma.tenantSetting.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Tenant setting not found');
    return item;
  }

  private async ensureFeatureFlagExists(id: string) {
    const item = await this.prisma.tenantFeatureFlag.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Tenant feature flag not found');
    return item;
  }

  private async ensureLocalizationExists(id: string) {
    const item = await this.prisma.tenantLocalization.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Tenant localization not found');
    return item;
  }

  private toJson(value: unknown): Prisma.InputJsonValue | undefined {
    return value === undefined ? undefined : (value as Prisma.InputJsonValue);
  }
}
