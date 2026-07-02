import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PluginLifecycleAction,
  PluginLifecycleState,
  PluginPermissionGrant,
  PluginStatus,
  Prisma,
} from '@prisma/client';

import { BusinessRulesService } from '../business-rules/business-rules.service';
import { Permission } from '../common/constants/permissions';
import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { StatusTransitionService } from '../platform/status-transitions';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreatePluginManifestDto,
  LoadPluginDto,
  PluginQueryDto,
  UpdatePluginManifestDto,
} from './dto/plugin-core.dto';
import {
  CreatePluginConfigurationDto,
  CreatePluginEventSubscriptionDto,
  CreatePluginHookDto,
  CreatePluginPermissionGrantDto,
  CreatePluginServiceBindingDto,
  EmitPluginEventDto,
  PluginSdkQueryDto,
  UpdatePluginConfigurationDto,
  UpdatePluginEventSubscriptionDto,
  UpdatePluginHookDto,
  UpdatePluginServiceBindingDto,
} from './dto/plugin-sdk.dto';
import {
  PluginLifecycleEventEntity,
  PluginManifestEntity,
  PluginRegistryEntryEntity,
} from './entities/plugin-core.entity';
import {
  PluginConfigurationEntity,
  PluginEventEntity,
  PluginEventSubscriptionEntity,
  PluginHookEntity,
  PluginPermissionGrantEntity,
  PluginServiceBindingEntity,
} from './entities/plugin-sdk.entity';

@Injectable()
export class PluginsService {
  private readonly statusRules = [
    { from: 'DRAFT' as PluginStatus, to: ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as PluginStatus[] },
    { from: 'ACTIVE' as PluginStatus, to: ['INACTIVE', 'ARCHIVED'] as PluginStatus[] },
    { from: 'INACTIVE' as PluginStatus, to: ['ACTIVE', 'ARCHIVED'] as PluginStatus[] },
  ];

  private readonly lifecycleRules = [
    { from: 'REGISTERED' as PluginLifecycleState, to: ['LOADED', 'UNINSTALLED'] as PluginLifecycleState[] },
    { from: 'LOADED' as PluginLifecycleState, to: ['ENABLED', 'DISABLED', 'ERROR', 'UNINSTALLED'] as PluginLifecycleState[] },
    { from: 'ENABLED' as PluginLifecycleState, to: ['DISABLED', 'ERROR', 'UNINSTALLED'] as PluginLifecycleState[] },
    { from: 'DISABLED' as PluginLifecycleState, to: ['LOADED', 'ENABLED', 'UNINSTALLED'] as PluginLifecycleState[] },
    { from: 'ERROR' as PluginLifecycleState, to: ['LOADED', 'DISABLED', 'UNINSTALLED'] as PluginLifecycleState[] },
    { from: 'UNINSTALLED' as PluginLifecycleState, to: ['REGISTERED'] as PluginLifecycleState[] },
  ];

  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
    private readonly pagination: PaginationService,
    private readonly audit: AuditService,
    private readonly softDelete: SoftDeleteService,
    private readonly transitions: StatusTransitionService,
    private readonly businessRules: BusinessRulesService,
  ) {}

  async findManifests(query: PluginQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.PluginManifestWhereInput = this.softDelete.activeWhere({
      ...(companyId ? { companyId } : {}),
      ...(query.pluginKey ? { pluginKey: query.pluginKey } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(query.source ? { source: query.source } : {}),
      ...(normalized.search
        ? {
            OR: [
              { pluginKey: { contains: normalized.search, mode: 'insensitive' } },
              { name: { contains: normalized.search, mode: 'insensitive' } },
              { publisher: { contains: normalized.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    });

    const [items, total] = await this.prisma.$transaction([
      this.prisma.pluginManifest.findMany({
        where,
        orderBy: [{ pluginKey: 'asc' }, { version: 'desc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.pluginManifest.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new PluginManifestEntity(item)),
      total,
      query,
    );
  }

  async createManifest(dto: CreatePluginManifestDto) {
    const companyId = await this.resolveCompanyId(dto.companyId);
    this.validateManifestPayload(dto.manifest);
    await this.evaluateManifestRules(companyId, dto);
    await this.ensureManifestUnique(companyId, dto.pluginKey, dto.version);
    const status = dto.status ?? 'DRAFT';
    this.assertStatusChange('PluginManifest', 'DRAFT', status);

    const item = await this.prisma.pluginManifest.create({
      data: {
        companyId,
        pluginKey: dto.pluginKey,
        name: dto.name,
        version: dto.version,
        description: dto.description,
        publisher: dto.publisher,
        source: dto.source ?? 'LOCAL',
        status,
        entryPoint: dto.entryPoint,
        checksum: dto.checksum,
        manifest: this.toJson(dto.manifest) as Prisma.InputJsonValue,
        metadata: this.toJson(dto.metadata),
        createdById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'PLUGIN_MANIFEST_CREATE',
      entity: 'PluginManifest',
      entityId: item.id,
      payload: { pluginKey: item.pluginKey, version: item.version, companyId },
    });

    return new PluginManifestEntity(item);
  }

  async updateManifest(id: string, dto: UpdatePluginManifestDto) {
    const current = await this.ensureManifestExists(id);
    const companyId = dto.companyId
      ? await this.resolveCompanyId(dto.companyId)
      : current.companyId;
    const pluginKey = dto.pluginKey ?? current.pluginKey;
    const version = dto.version ?? current.version;

    if (dto.manifest) this.validateManifestPayload(dto.manifest);
    if (dto.companyId || dto.pluginKey || dto.version) {
      await this.ensureManifestUnique(companyId, pluginKey, version, id);
    }
    if (dto.status && dto.status !== current.status) {
      this.assertStatusChange('PluginManifest', current.status, dto.status);
    }

    const item = await this.prisma.pluginManifest.update({
      where: { id },
      data: {
        companyId,
        pluginKey: dto.pluginKey,
        name: dto.name,
        version: dto.version,
        description: dto.description,
        publisher: dto.publisher,
        source: dto.source,
        status: dto.status,
        entryPoint: dto.entryPoint,
        checksum: dto.checksum,
        manifest: dto.manifest === undefined ? undefined : this.toJson(dto.manifest),
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        updatedById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'PLUGIN_MANIFEST_UPDATE',
      entity: 'PluginManifest',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });

    return new PluginManifestEntity(item);
  }

  async removeManifest(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.pluginManifest as never,
      id,
    );

    await this.audit.record({
      action: 'PLUGIN_MANIFEST_DELETE',
      entity: 'PluginManifest',
      entityId: id,
      payload: { deleted: true },
    });

    return { success: true, deletedManifest: new PluginManifestEntity(result.record) };
  }

  async restoreManifest(id: string) {
    const result = await this.softDelete.restore(
      this.prisma.pluginManifest as never,
      id,
    );

    await this.audit.record({
      action: 'PLUGIN_MANIFEST_RESTORE',
      entity: 'PluginManifest',
      entityId: id,
      payload: { restored: true },
    });

    return { success: true, restoredManifest: new PluginManifestEntity(result.record) };
  }

  async findRegistry(query: PluginQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const where: Prisma.PluginRegistryEntryWhereInput =
      this.softDelete.activeWhere({
        ...(companyId ? { companyId } : {}),
        ...(query.status ? { status: query.status } : {}),
        ...(query.lifecycle ? { lifecycle: query.lifecycle } : {}),
        ...(query.pluginKey
          ? { manifest: { pluginKey: query.pluginKey } }
          : {}),
      });

    const [items, total] = await this.prisma.$transaction([
      this.prisma.pluginRegistryEntry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.pluginRegistryEntry.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new PluginRegistryEntryEntity(item)),
      total,
      query,
    );
  }

  async loadManifest(manifestId: string, dto: LoadPluginDto) {
    const manifest = await this.ensureManifestExists(manifestId);
    if (manifest.status === 'ARCHIVED') {
      throw new BadRequestException('Archived plugin manifests cannot be loaded');
    }
    const companyId = await this.resolveCompanyId(dto.companyId ?? manifest.companyId);
    await this.ensureRegistryUnique(companyId, manifestId);

    const entry = await this.prisma.$transaction(async (tx) => {
      const created = await tx.pluginRegistryEntry.create({
        data: {
          companyId,
          manifestId,
          status: 'ACTIVE',
          lifecycle: 'LOADED',
          config: this.toJson(dto.config),
          loadedAt: new Date(),
          createdById: this.context.getUserId(),
        },
      });

      await tx.pluginLifecycleEvent.create({
        data: {
          registryEntryId: created.id,
          action: 'LOAD',
          fromState: 'REGISTERED',
          toState: 'LOADED',
          actorId: this.context.getUserId(),
        },
      });

      return created;
    });

    await this.audit.record({
      action: 'PLUGIN_LOAD',
      entity: 'PluginRegistryEntry',
      entityId: entry.id,
      payload: { manifestId, lifecycle: entry.lifecycle },
    });

    return new PluginRegistryEntryEntity(entry);
  }

  enableRegistryEntry(id: string) {
    return this.transitionRegistryEntry(id, 'ENABLE', 'ENABLED');
  }

  disableRegistryEntry(id: string) {
    return this.transitionRegistryEntry(id, 'DISABLE', 'DISABLED');
  }

  unloadRegistryEntry(id: string) {
    return this.transitionRegistryEntry(id, 'UNLOAD', 'UNINSTALLED');
  }

  async findLifecycleEvents(registryEntryId: string, query: PluginQueryDto) {
    await this.ensureRegistryEntryExists(registryEntryId);
    const where: Prisma.PluginLifecycleEventWhereInput = { registryEntryId };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.pluginLifecycleEvent.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.pluginLifecycleEvent.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new PluginLifecycleEventEntity(item)),
      total,
      query,
    );
  }

  async findEventSubscriptions(query: PluginSdkQueryDto) {
    const where: Prisma.PluginEventSubscriptionWhereInput =
      this.softDelete.activeWhere({
        ...(query.registryEntryId ? { registryEntryId: query.registryEntryId } : {}),
        ...(query.eventName ? { eventName: query.eventName } : {}),
        ...(query.status ? { status: query.status } : {}),
      });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.pluginEventSubscription.findMany({
        where,
        orderBy: { eventName: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.pluginEventSubscription.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new PluginEventSubscriptionEntity(item)),
      total,
      query,
    );
  }

  async createEventSubscription(dto: CreatePluginEventSubscriptionDto) {
    await this.ensureRegistryEntryExists(dto.registryEntryId);
    const item = await this.prisma.pluginEventSubscription.create({
      data: {
        registryEntryId: dto.registryEntryId,
        eventName: dto.eventName,
        filter: this.toJson(dto.filter),
        status: dto.status ?? 'ACTIVE',
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PLUGIN_EVENT_SUBSCRIPTION_CREATE',
      entity: 'PluginEventSubscription',
      entityId: item.id,
      payload: { registryEntryId: item.registryEntryId, eventName: item.eventName },
    });
    return new PluginEventSubscriptionEntity(item);
  }

  async updateEventSubscription(
    id: string,
    dto: UpdatePluginEventSubscriptionDto,
  ) {
    const current = await this.ensureEventSubscriptionExists(id);
    if (dto.registryEntryId) await this.ensureRegistryEntryExists(dto.registryEntryId);
    const item = await this.prisma.pluginEventSubscription.update({
      where: { id },
      data: {
        registryEntryId: dto.registryEntryId,
        eventName: dto.eventName,
        filter: dto.filter === undefined ? undefined : this.toJson(dto.filter),
        status: dto.status,
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PLUGIN_EVENT_SUBSCRIPTION_UPDATE',
      entity: 'PluginEventSubscription',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });
    return new PluginEventSubscriptionEntity(item);
  }

  async removeEventSubscription(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.pluginEventSubscription as never,
      id,
    );
    await this.audit.record({
      action: 'PLUGIN_EVENT_SUBSCRIPTION_DELETE',
      entity: 'PluginEventSubscription',
      entityId: id,
      payload: { deleted: true },
    });
    return {
      success: true,
      deletedSubscription: new PluginEventSubscriptionEntity(result.record),
    };
  }

  async findHooks(query: PluginSdkQueryDto) {
    const where: Prisma.PluginHookWhereInput = this.softDelete.activeWhere({
      ...(query.registryEntryId ? { registryEntryId: query.registryEntryId } : {}),
      ...(query.hookPoint ? { hookPoint: query.hookPoint } : {}),
      ...(query.status ? { status: query.status } : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.pluginHook.findMany({
        where,
        orderBy: [{ priority: 'asc' }, { code: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.pluginHook.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new PluginHookEntity(item)),
      total,
      query,
    );
  }

  async createHook(dto: CreatePluginHookDto) {
    await this.ensureRegistryEntryExists(dto.registryEntryId);
    const item = await this.prisma.pluginHook.create({
      data: {
        registryEntryId: dto.registryEntryId,
        code: dto.code,
        hookPoint: dto.hookPoint,
        type: dto.type ?? 'AFTER',
        priority: dto.priority ?? 100,
        config: this.toJson(dto.config),
        status: dto.status ?? 'ACTIVE',
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PLUGIN_HOOK_CREATE',
      entity: 'PluginHook',
      entityId: item.id,
      payload: { registryEntryId: item.registryEntryId, hookPoint: item.hookPoint },
    });
    return new PluginHookEntity(item);
  }

  async updateHook(id: string, dto: UpdatePluginHookDto) {
    const current = await this.ensureHookExists(id);
    if (dto.registryEntryId) await this.ensureRegistryEntryExists(dto.registryEntryId);
    const item = await this.prisma.pluginHook.update({
      where: { id },
      data: {
        registryEntryId: dto.registryEntryId,
        code: dto.code,
        hookPoint: dto.hookPoint,
        type: dto.type,
        priority: dto.priority,
        config: dto.config === undefined ? undefined : this.toJson(dto.config),
        status: dto.status,
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PLUGIN_HOOK_UPDATE',
      entity: 'PluginHook',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });
    return new PluginHookEntity(item);
  }

  async removeHook(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.pluginHook as never,
      id,
    );
    await this.audit.record({
      action: 'PLUGIN_HOOK_DELETE',
      entity: 'PluginHook',
      entityId: id,
      payload: { deleted: true },
    });
    return { success: true, deletedHook: new PluginHookEntity(result.record) };
  }

  async findServiceBindings(query: PluginSdkQueryDto) {
    const where: Prisma.PluginServiceBindingWhereInput =
      this.softDelete.activeWhere({
        ...(query.registryEntryId ? { registryEntryId: query.registryEntryId } : {}),
        ...(query.status ? { status: query.status } : {}),
      });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.pluginServiceBinding.findMany({
        where,
        orderBy: { code: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.pluginServiceBinding.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new PluginServiceBindingEntity(item)),
      total,
      query,
    );
  }

  async createServiceBinding(dto: CreatePluginServiceBindingDto) {
    await this.ensureRegistryEntryExists(dto.registryEntryId);
    const item = await this.prisma.pluginServiceBinding.create({
      data: {
        registryEntryId: dto.registryEntryId,
        code: dto.code,
        serviceType: dto.serviceType ?? 'INTERNAL_API',
        endpoint: dto.endpoint,
        contract: this.toJson(dto.contract),
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PLUGIN_SERVICE_BINDING_CREATE',
      entity: 'PluginServiceBinding',
      entityId: item.id,
      payload: { registryEntryId: item.registryEntryId, code: item.code },
    });
    return new PluginServiceBindingEntity(item);
  }

  async updateServiceBinding(id: string, dto: UpdatePluginServiceBindingDto) {
    const current = await this.ensureServiceBindingExists(id);
    if (dto.registryEntryId) await this.ensureRegistryEntryExists(dto.registryEntryId);
    const item = await this.prisma.pluginServiceBinding.update({
      where: { id },
      data: {
        registryEntryId: dto.registryEntryId,
        code: dto.code,
        serviceType: dto.serviceType,
        endpoint: dto.endpoint,
        contract: dto.contract === undefined ? undefined : this.toJson(dto.contract),
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PLUGIN_SERVICE_BINDING_UPDATE',
      entity: 'PluginServiceBinding',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });
    return new PluginServiceBindingEntity(item);
  }

  async removeServiceBinding(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.pluginServiceBinding as never,
      id,
    );
    await this.audit.record({
      action: 'PLUGIN_SERVICE_BINDING_DELETE',
      entity: 'PluginServiceBinding',
      entityId: id,
      payload: { deleted: true },
    });
    return {
      success: true,
      deletedServiceBinding: new PluginServiceBindingEntity(result.record),
    };
  }

  async findPermissionGrants(query: PluginSdkQueryDto) {
    const where: Prisma.PluginPermissionGrantWhereInput =
      this.softDelete.activeWhere({
        ...(query.registryEntryId ? { registryEntryId: query.registryEntryId } : {}),
        ...(query.status ? { status: query.status } : {}),
      });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.pluginPermissionGrant.findMany({
        where,
        orderBy: { permissionCode: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.pluginPermissionGrant.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new PluginPermissionGrantEntity(item)),
      total,
      query,
    );
  }

  async createPermissionGrant(dto: CreatePluginPermissionGrantDto) {
    await this.ensureRegistryEntryExists(dto.registryEntryId);
    this.assertKnownPermission(dto.permissionCode);
    const item = await this.prisma.pluginPermissionGrant.create({
      data: {
        registryEntryId: dto.registryEntryId,
        permissionCode: dto.permissionCode,
        constraints: this.toJson(dto.constraints),
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PLUGIN_PERMISSION_GRANT_CREATE',
      entity: 'PluginPermissionGrant',
      entityId: item.id,
      payload: { registryEntryId: item.registryEntryId, permissionCode: item.permissionCode },
    });
    return new PluginPermissionGrantEntity(item);
  }

  async revokePermissionGrant(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.pluginPermissionGrant as never,
      id,
    );
    await this.audit.record({
      action: 'PLUGIN_PERMISSION_GRANT_REVOKE',
      entity: 'PluginPermissionGrant',
      entityId: id,
      payload: { revoked: true },
    });
    return {
      success: true,
      revokedGrant: new PluginPermissionGrantEntity(result.record),
    };
  }

  async findConfigurations(query: PluginSdkQueryDto) {
    const where: Prisma.PluginConfigurationWhereInput =
      this.softDelete.activeWhere({
        ...(query.registryEntryId ? { registryEntryId: query.registryEntryId } : {}),
        ...(query.status ? { status: query.status } : {}),
      });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.pluginConfiguration.findMany({
        where,
        orderBy: { key: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.pluginConfiguration.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new PluginConfigurationEntity(item)),
      total,
      query,
    );
  }

  async createConfiguration(dto: CreatePluginConfigurationDto) {
    await this.ensureRegistryEntryExists(dto.registryEntryId);
    if (dto.isSecret && !dto.secretRef) {
      throw new BadRequestException('Secret configuration requires secretRef');
    }
    const item = await this.prisma.pluginConfiguration.create({
      data: {
        registryEntryId: dto.registryEntryId,
        key: dto.key,
        value: dto.isSecret ? undefined : this.toJson(dto.value),
        isSecret: dto.isSecret ?? false,
        secretRef: dto.secretRef,
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PLUGIN_CONFIGURATION_CREATE',
      entity: 'PluginConfiguration',
      entityId: item.id,
      payload: { registryEntryId: item.registryEntryId, key: item.key, isSecret: item.isSecret },
    });
    return new PluginConfigurationEntity(item);
  }

  async updateConfiguration(id: string, dto: UpdatePluginConfigurationDto) {
    const current = await this.ensureConfigurationExists(id);
    if (dto.registryEntryId) await this.ensureRegistryEntryExists(dto.registryEntryId);
    const isSecret = dto.isSecret ?? current.isSecret;
    const secretRef = dto.secretRef ?? current.secretRef;
    if (isSecret && !secretRef) {
      throw new BadRequestException('Secret configuration requires secretRef');
    }
    const item = await this.prisma.pluginConfiguration.update({
      where: { id },
      data: {
        registryEntryId: dto.registryEntryId,
        key: dto.key,
        value: isSecret
          ? undefined
          : dto.value === undefined
            ? undefined
            : this.toJson(dto.value),
        isSecret: dto.isSecret,
        secretRef: dto.secretRef,
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PLUGIN_CONFIGURATION_UPDATE',
      entity: 'PluginConfiguration',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });
    return new PluginConfigurationEntity(item);
  }

  async removeConfiguration(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.pluginConfiguration as never,
      id,
    );
    await this.audit.record({
      action: 'PLUGIN_CONFIGURATION_DELETE',
      entity: 'PluginConfiguration',
      entityId: id,
      payload: { deleted: true },
    });
    return {
      success: true,
      deletedConfiguration: new PluginConfigurationEntity(result.record),
    };
  }

  async emitEvent(dto: EmitPluginEventDto) {
    if (dto.registryEntryId) await this.ensureRegistryEntryExists(dto.registryEntryId);
    const item = await this.prisma.pluginEvent.create({
      data: {
        registryEntryId: dto.registryEntryId,
        eventName: dto.eventName,
        payload: this.toJson(dto.payload),
        status: 'DISPATCHED',
        dispatchedAt: new Date(),
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'PLUGIN_EVENT_EMIT',
      entity: 'PluginEvent',
      entityId: item.id,
      payload: { eventName: item.eventName, registryEntryId: item.registryEntryId },
    });
    return new PluginEventEntity(item);
  }

  async findEvents(query: PluginSdkQueryDto) {
    const where: Prisma.PluginEventWhereInput = {
      ...(query.registryEntryId ? { registryEntryId: query.registryEntryId } : {}),
      ...(query.eventName ? { eventName: query.eventName } : {}),
      ...(query.eventStatus ? { status: query.eventStatus } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.pluginEvent.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.pluginEvent.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new PluginEventEntity(item)),
      total,
      query,
    );
  }

  private async transitionRegistryEntry(
    id: string,
    action: PluginLifecycleAction,
    nextState: PluginLifecycleState,
  ) {
    const current = await this.ensureRegistryEntryExists(id);
    this.transitions.assertTransition({
      entity: 'PluginRegistryEntry',
      currentStatus: current.lifecycle,
      nextStatus: nextState,
      rules: this.lifecycleRules,
    });

    const item = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.pluginRegistryEntry.update({
        where: { id },
        data: {
          lifecycle: nextState,
          status:
            nextState === 'ENABLED'
              ? 'ACTIVE'
              : nextState === 'UNINSTALLED'
                ? 'ARCHIVED'
                : 'INACTIVE',
          enabledAt: nextState === 'ENABLED' ? new Date() : current.enabledAt,
          disabledAt:
            nextState === 'DISABLED' || nextState === 'UNINSTALLED'
              ? new Date()
              : current.disabledAt,
          lastError: null,
          updatedById: this.context.getUserId(),
        },
      });

      await tx.pluginLifecycleEvent.create({
        data: {
          registryEntryId: id,
          action,
          fromState: current.lifecycle,
          toState: nextState,
          actorId: this.context.getUserId(),
        },
      });

      return updated;
    });

    await this.audit.record({
      action: `PLUGIN_${action}`,
      entity: 'PluginRegistryEntry',
      entityId: id,
      payload: { fromState: current.lifecycle, toState: nextState },
    });

    return new PluginRegistryEntryEntity(item);
  }

  private validateManifestPayload(manifest: Record<string, unknown>) {
    const required = ['name', 'version'];
    for (const field of required) {
      if (!manifest[field]) {
        throw new BadRequestException(`Plugin manifest must include ${field}`);
      }
    }
  }

  private async evaluateManifestRules(
    companyId: string | null,
    dto: CreatePluginManifestDto,
  ) {
    const result = await this.businessRules.evaluate({
      companyId: companyId ?? undefined,
      module: 'plugins',
      entity: 'manifest',
      trigger: 'API',
      payload: {
        pluginKey: dto.pluginKey,
        version: dto.version,
        source: dto.source ?? 'LOCAL',
        manifest: dto.manifest,
      },
    });
    if (result.blocked) {
      throw new BadRequestException('Plugin manifest blocked by business rules');
    }
  }

  private assertStatusChange(
    entity: string,
    currentStatus: PluginStatus,
    nextStatus: PluginStatus,
  ) {
    if (currentStatus === nextStatus) return;
    this.transitions.assertTransition({
      entity,
      currentStatus,
      nextStatus,
      rules: this.statusRules,
    });
  }

  private async resolveCompanyId(companyId?: string | null): Promise<string | null> {
    const resolved = companyId ?? this.context.getCompanyId();
    if (!resolved) return null;
    const company = await this.prisma.company.findUnique({
      where: { id: resolved },
      select: { id: true },
    });
    if (!company) throw new NotFoundException('Company not found');
    return resolved;
  }

  private async ensureManifestExists(id: string) {
    const item = await this.prisma.pluginManifest.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Plugin manifest not found');
    return item;
  }

  private async ensureRegistryEntryExists(id: string) {
    const item = await this.prisma.pluginRegistryEntry.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Plugin registry entry not found');
    return item;
  }

  private async ensureEventSubscriptionExists(id: string) {
    const item = await this.prisma.pluginEventSubscription.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Plugin event subscription not found');
    return item;
  }

  private async ensureHookExists(id: string) {
    const item = await this.prisma.pluginHook.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Plugin hook not found');
    return item;
  }

  private async ensureServiceBindingExists(id: string) {
    const item = await this.prisma.pluginServiceBinding.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Plugin service binding not found');
    return item;
  }

  private async ensureConfigurationExists(id: string) {
    const item = await this.prisma.pluginConfiguration.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Plugin configuration not found');
    return item;
  }

  private assertKnownPermission(permissionCode: string) {
    if (!Object.values(Permission).includes(permissionCode as never)) {
      throw new BadRequestException('Unknown plugin permission code');
    }
  }

  private async ensureManifestUnique(
    companyId: string | null,
    pluginKey: string,
    version: string,
    excludeId?: string,
  ) {
    const item = await this.prisma.pluginManifest.findFirst({
      where: {
        companyId,
        pluginKey,
        version,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    if (item) throw new ConflictException('Plugin manifest version already exists');
  }

  private async ensureRegistryUnique(companyId: string | null, manifestId: string) {
    const item = await this.prisma.pluginRegistryEntry.findFirst({
      where: { companyId, manifestId },
    });
    if (item) throw new ConflictException('Plugin manifest is already loaded');
  }

  private toJson(value: unknown): Prisma.InputJsonValue | undefined {
    return value === undefined ? undefined : (value as Prisma.InputJsonValue);
  }
}
