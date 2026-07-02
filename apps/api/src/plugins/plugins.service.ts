import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PluginLifecycleAction,
  PluginLifecycleState,
  PluginStatus,
  Prisma,
} from '@prisma/client';

import { BusinessRulesService } from '../business-rules/business-rules.service';
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
  PluginLifecycleEventEntity,
  PluginManifestEntity,
  PluginRegistryEntryEntity,
} from './entities/plugin-core.entity';

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
