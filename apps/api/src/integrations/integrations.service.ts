import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IntegrationConnectionStatus,
  IntegrationStatus,
  Prisma,
} from '@prisma/client';

import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { StatusTransitionService } from '../platform/status-transitions';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateIntegrationConnectionDto,
  CreateIntegrationCredentialDto,
  CreateIntegrationProviderDto,
  IntegrationQueryDto,
  UpdateIntegrationConnectionDto,
  UpdateIntegrationCredentialDto,
  UpdateIntegrationProviderDto,
} from './dto/integration-core.dto';
import {
  IntegrationConnectionEntity,
  IntegrationCredentialEntity,
  IntegrationLifecycleResultEntity,
  IntegrationProviderEntity,
} from './entities/integration-core.entity';
import { IntegrationProviderAdapter } from './providers/integration-provider.interface';
import { RestIntegrationProvider } from './providers/rest-integration.provider';

@Injectable()
export class IntegrationsService {
  private readonly statusRules = [
    { from: 'DRAFT' as IntegrationStatus, to: ['ACTIVE', 'ARCHIVED'] as IntegrationStatus[] },
    { from: 'ACTIVE' as IntegrationStatus, to: ['INACTIVE', 'ARCHIVED'] as IntegrationStatus[] },
    { from: 'INACTIVE' as IntegrationStatus, to: ['ACTIVE', 'ARCHIVED'] as IntegrationStatus[] },
  ];

  private readonly connectionRules = [
    {
      from: 'DISCONNECTED' as IntegrationConnectionStatus,
      to: ['CONNECTING', 'CONNECTED', 'DISABLED'] as IntegrationConnectionStatus[],
    },
    {
      from: 'CONNECTING' as IntegrationConnectionStatus,
      to: ['CONNECTED', 'FAILED', 'DISCONNECTED'] as IntegrationConnectionStatus[],
    },
    {
      from: 'CONNECTED' as IntegrationConnectionStatus,
      to: ['DISCONNECTED', 'FAILED', 'DISABLED'] as IntegrationConnectionStatus[],
    },
    {
      from: 'FAILED' as IntegrationConnectionStatus,
      to: ['CONNECTING', 'CONNECTED', 'DISCONNECTED', 'DISABLED'] as IntegrationConnectionStatus[],
    },
    {
      from: 'DISABLED' as IntegrationConnectionStatus,
      to: ['DISCONNECTED'] as IntegrationConnectionStatus[],
    },
  ];

  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
    private readonly pagination: PaginationService,
    private readonly audit: AuditService,
    private readonly softDelete: SoftDeleteService,
    private readonly transitions: StatusTransitionService,
    private readonly restProvider: RestIntegrationProvider,
  ) {}

  async findProviders(query: IntegrationQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.IntegrationProviderWhereInput =
      this.softDelete.activeWhere({
        ...(companyId ? { companyId } : {}),
        ...(query.type ? { type: query.type } : {}),
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
      this.prisma.integrationProvider.findMany({
        where,
        orderBy: [{ isSystem: 'desc' }, { code: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.integrationProvider.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new IntegrationProviderEntity(item)),
      total,
      query,
    );
  }

  async createProvider(dto: CreateIntegrationProviderDto) {
    const companyId = await this.resolveCompanyId(dto.companyId);
    await this.ensureProviderCodeUnique(companyId, dto.code);
    const status = dto.status ?? 'DRAFT';
    this.assertStatusChange('IntegrationProvider', 'DRAFT', status);

    const item = await this.prisma.integrationProvider.create({
      data: {
        companyId,
        code: dto.code,
        name: dto.name,
        type: dto.type ?? 'REST',
        status,
        baseUrl: dto.baseUrl,
        config: this.toJson(dto.config),
        isSystem: dto.isSystem ?? false,
        createdById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_PROVIDER_CREATE',
      entity: 'IntegrationProvider',
      entityId: item.id,
      payload: { code: item.code, type: item.type, companyId: item.companyId },
    });

    return new IntegrationProviderEntity(item);
  }

  async updateProvider(id: string, dto: UpdateIntegrationProviderDto) {
    const current = await this.ensureProviderExists(id);
    const companyId = dto.companyId
      ? await this.resolveCompanyId(dto.companyId)
      : current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId || dto.code) {
      await this.ensureProviderCodeUnique(companyId, code, id);
    }
    if (dto.status && dto.status !== current.status) {
      this.assertStatusChange('IntegrationProvider', current.status, dto.status);
    }

    const item = await this.prisma.integrationProvider.update({
      where: { id },
      data: {
        companyId,
        code: dto.code,
        name: dto.name,
        type: dto.type,
        status: dto.status,
        baseUrl: dto.baseUrl,
        config: dto.config === undefined ? undefined : this.toJson(dto.config),
        isSystem: dto.isSystem,
        updatedById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_PROVIDER_UPDATE',
      entity: 'IntegrationProvider',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });

    return new IntegrationProviderEntity(item);
  }

  async removeProvider(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.integrationProvider as never,
      id,
    );

    await this.audit.record({
      action: 'INTEGRATION_PROVIDER_DELETE',
      entity: 'IntegrationProvider',
      entityId: id,
      payload: { deleted: true },
    });

    return {
      success: true,
      deletedProvider: new IntegrationProviderEntity(result.record),
    };
  }

  async restoreProvider(id: string) {
    const result = await this.softDelete.restore(
      this.prisma.integrationProvider as never,
      id,
    );

    await this.audit.record({
      action: 'INTEGRATION_PROVIDER_RESTORE',
      entity: 'IntegrationProvider',
      entityId: id,
      payload: { restored: true },
    });

    return {
      success: true,
      restoredProvider: new IntegrationProviderEntity(result.record),
    };
  }

  async findCredentials(query: IntegrationQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.IntegrationCredentialWhereInput =
      this.softDelete.activeWhere({
        ...(companyId ? { companyId } : {}),
        ...(query.providerId ? { providerId: query.providerId } : {}),
        ...(query.status ? { status: query.status } : {}),
        ...(normalized.search
          ? { name: { contains: normalized.search, mode: 'insensitive' } }
          : {}),
      });

    const [items, total] = await this.prisma.$transaction([
      this.prisma.integrationCredential.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.integrationCredential.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new IntegrationCredentialEntity(item)),
      total,
      query,
    );
  }

  async createCredential(dto: CreateIntegrationCredentialDto) {
    const provider = await this.ensureProviderExists(dto.providerId);
    const companyId = await this.resolveCompanyId(dto.companyId ?? provider.companyId ?? undefined);
    this.assertSameCompany(provider.companyId, companyId, 'Provider belongs to another company');
    const status = dto.status ?? 'DRAFT';
    this.assertStatusChange('IntegrationCredential', 'DRAFT', status);

    const item = await this.prisma.integrationCredential.create({
      data: {
        companyId,
        providerId: dto.providerId,
        name: dto.name,
        type: dto.type ?? 'API_KEY',
        maskedSecret: dto.maskedSecret,
        secretRef: dto.secretRef,
        metadata: this.toJson(dto.metadata),
        status,
        createdById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_CREDENTIAL_CREATE',
      entity: 'IntegrationCredential',
      entityId: item.id,
      payload: { providerId: item.providerId, type: item.type },
    });

    return new IntegrationCredentialEntity(item);
  }

  async updateCredential(id: string, dto: UpdateIntegrationCredentialDto) {
    const current = await this.ensureCredentialExists(id);
    const provider = dto.providerId
      ? await this.ensureProviderExists(dto.providerId)
      : await this.ensureProviderExists(current.providerId);
    const companyId = dto.companyId
      ? await this.resolveCompanyId(dto.companyId)
      : current.companyId;

    this.assertSameCompany(provider.companyId, companyId, 'Provider belongs to another company');
    if (dto.status && dto.status !== current.status) {
      this.assertStatusChange('IntegrationCredential', current.status, dto.status);
    }

    const item = await this.prisma.integrationCredential.update({
      where: { id },
      data: {
        companyId,
        providerId: dto.providerId,
        name: dto.name,
        type: dto.type,
        maskedSecret: dto.maskedSecret,
        secretRef: dto.secretRef,
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        status: dto.status,
        updatedById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_CREDENTIAL_UPDATE',
      entity: 'IntegrationCredential',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });

    return new IntegrationCredentialEntity(item);
  }

  async removeCredential(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.integrationCredential as never,
      id,
    );

    await this.audit.record({
      action: 'INTEGRATION_CREDENTIAL_DELETE',
      entity: 'IntegrationCredential',
      entityId: id,
      payload: { deleted: true },
    });

    return {
      success: true,
      deletedCredential: new IntegrationCredentialEntity(result.record),
    };
  }

  async findConnections(query: IntegrationQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.IntegrationConnectionWhereInput =
      this.softDelete.activeWhere({
        ...(companyId ? { companyId } : {}),
        ...(query.providerId ? { providerId: query.providerId } : {}),
        ...(query.connectionStatus ? { status: query.connectionStatus } : {}),
        ...(normalized.search
          ? { name: { contains: normalized.search, mode: 'insensitive' } }
          : {}),
      });

    const [items, total] = await this.prisma.$transaction([
      this.prisma.integrationConnection.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.integrationConnection.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new IntegrationConnectionEntity(item)),
      total,
      query,
    );
  }

  async createConnection(dto: CreateIntegrationConnectionDto) {
    const provider = await this.ensureProviderExists(dto.providerId);
    const credential = dto.credentialId
      ? await this.ensureCredentialExists(dto.credentialId)
      : null;
    const companyId = await this.resolveCompanyId(dto.companyId ?? provider.companyId ?? undefined);
    this.assertSameCompany(provider.companyId, companyId, 'Provider belongs to another company');
    if (credential) {
      if (credential.providerId !== provider.id) {
        throw new BadRequestException('Credential belongs to another provider');
      }
      this.assertSameCompany(
        credential.companyId,
        companyId,
        'Credential belongs to another company',
      );
    }

    const item = await this.prisma.integrationConnection.create({
      data: {
        companyId,
        providerId: dto.providerId,
        credentialId: dto.credentialId,
        name: dto.name,
        config: this.toJson(dto.config),
        createdById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_CONNECTION_CREATE',
      entity: 'IntegrationConnection',
      entityId: item.id,
      payload: { providerId: item.providerId, credentialId: item.credentialId },
    });

    return new IntegrationConnectionEntity(item);
  }

  async updateConnection(id: string, dto: UpdateIntegrationConnectionDto) {
    const current = await this.ensureConnectionExists(id);
    const provider = dto.providerId
      ? await this.ensureProviderExists(dto.providerId)
      : await this.ensureProviderExists(current.providerId);
    const credential = dto.credentialId
      ? await this.ensureCredentialExists(dto.credentialId)
      : null;
    const companyId = dto.companyId
      ? await this.resolveCompanyId(dto.companyId)
      : current.companyId;

    this.assertSameCompany(provider.companyId, companyId, 'Provider belongs to another company');
    if (credential) {
      if (credential.providerId !== provider.id) {
        throw new BadRequestException('Credential belongs to another provider');
      }
      this.assertSameCompany(
        credential.companyId,
        companyId,
        'Credential belongs to another company',
      );
    }
    if (dto.status && dto.status !== current.status) {
      this.transitions.assertTransition({
        entity: 'IntegrationConnection',
        currentStatus: current.status,
        nextStatus: dto.status,
        rules: this.connectionRules,
      });
    }

    const item = await this.prisma.integrationConnection.update({
      where: { id },
      data: {
        companyId,
        providerId: dto.providerId,
        credentialId: dto.credentialId,
        name: dto.name,
        status: dto.status,
        config: dto.config === undefined ? undefined : this.toJson(dto.config),
        updatedById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_CONNECTION_UPDATE',
      entity: 'IntegrationConnection',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });

    return new IntegrationConnectionEntity(item);
  }

  async removeConnection(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.integrationConnection as never,
      id,
    );

    await this.audit.record({
      action: 'INTEGRATION_CONNECTION_DELETE',
      entity: 'IntegrationConnection',
      entityId: id,
      payload: { deleted: true },
    });

    return {
      success: true,
      deletedConnection: new IntegrationConnectionEntity(result.record),
    };
  }

  async testConnection(id: string) {
    const connection = await this.ensureConnectionExists(id);
    const provider = await this.ensureProviderExists(connection.providerId);
    const credential = connection.credentialId
      ? await this.ensureCredentialExists(connection.credentialId)
      : null;
    const adapter = this.getProviderAdapter(provider.type);
    const result = await adapter.testConnection({
      providerCode: provider.code,
      providerType: provider.type,
      baseUrl: provider.baseUrl,
      config: this.asRecord(connection.config ?? provider.config),
      credentialRef: credential?.secretRef,
    });

    const status = result.success ? 'CONNECTED' : 'FAILED';
    await this.prisma.integrationConnection.update({
      where: { id },
      data: {
        status,
        lastTestedAt: new Date(),
        lastConnectedAt: result.success ? new Date() : connection.lastConnectedAt,
        lastError: result.success ? null : result.message ?? 'Connection test failed',
        updatedById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_CONNECTION_TEST',
      entity: 'IntegrationConnection',
      entityId: id,
      payload: { success: result.success, status },
    });

    return new IntegrationLifecycleResultEntity({
      success: result.success,
      status,
      message: result.message,
    });
  }

  async connect(id: string) {
    const connection = await this.ensureConnectionExists(id);
    this.transitions.assertTransition({
      entity: 'IntegrationConnection',
      currentStatus: connection.status,
      nextStatus: 'CONNECTING',
      rules: this.connectionRules,
    });

    await this.prisma.integrationConnection.update({
      where: { id },
      data: { status: 'CONNECTING', updatedById: this.context.getUserId() },
    });

    return this.testConnection(id);
  }

  async disconnect(id: string) {
    const connection = await this.ensureConnectionExists(id);
    this.transitions.assertTransition({
      entity: 'IntegrationConnection',
      currentStatus: connection.status,
      nextStatus: 'DISCONNECTED',
      rules: this.connectionRules,
    });

    const item = await this.prisma.integrationConnection.update({
      where: { id },
      data: {
        status: 'DISCONNECTED',
        lastError: null,
        updatedById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_CONNECTION_DISCONNECT',
      entity: 'IntegrationConnection',
      entityId: id,
      payload: { status: item.status },
    });

    return new IntegrationConnectionEntity(item);
  }

  private assertStatusChange(
    entity: string,
    currentStatus: IntegrationStatus,
    nextStatus: IntegrationStatus,
  ): void {
    if (currentStatus === nextStatus) return;
    this.transitions.assertTransition({
      entity,
      currentStatus,
      nextStatus,
      rules: this.statusRules,
    });
  }

  private getProviderAdapter(type: string): IntegrationProviderAdapter {
    if (type === this.restProvider.type) return this.restProvider;
    throw new BadRequestException('Integration provider adapter is not configured');
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

  private async ensureProviderExists(id: string) {
    const item = await this.prisma.integrationProvider.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Integration provider not found');
    return item;
  }

  private async ensureCredentialExists(id: string) {
    const item = await this.prisma.integrationCredential.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Integration credential not found');
    return item;
  }

  private async ensureConnectionExists(id: string) {
    const item = await this.prisma.integrationConnection.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Integration connection not found');
    return item;
  }

  private async ensureProviderCodeUnique(
    companyId: string | null,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.integrationProvider.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    if (item) throw new ConflictException('Integration provider code already exists');
  }

  private assertSameCompany(
    sourceCompanyId: string | null,
    expectedCompanyId: string | null,
    message: string,
  ): void {
    if (sourceCompanyId && expectedCompanyId && sourceCompanyId !== expectedCompanyId) {
      throw new BadRequestException(message);
    }
  }

  private toJson(value: unknown): Prisma.InputJsonValue | undefined {
    return value === undefined ? undefined : (value as Prisma.InputJsonValue);
  }

  private asRecord(value: Prisma.JsonValue | null | undefined) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return value as Record<string, unknown>;
    }
    return null;
  }
}
