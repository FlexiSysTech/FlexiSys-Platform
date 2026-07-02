import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';
import {
  IntegrationConnectionStatus,
  IntegrationHealthStatus,
  IntegrationHttpMethod,
  IntegrationOutboundStatus,
  IntegrationStatus,
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
  CreateIntegrationConnectionDto,
  CreateIntegrationCredentialDto,
  CreateIntegrationProviderDto,
  IntegrationQueryDto,
  UpdateIntegrationConnectionDto,
  UpdateIntegrationCredentialDto,
  UpdateIntegrationProviderDto,
} from './dto/integration-core.dto';
import {
  IntegrationInboundQueryDto,
  ReceiveIntegrationWebhookDto,
} from './dto/integration-inbound.dto';
import { IntegrationMonitoringQueryDto } from './dto/integration-monitoring.dto';
import {
  CreateIntegrationRestConnectorDto,
  CreateIntegrationRetryPolicyDto,
  CreateIntegrationWebhookDto,
  EnqueueIntegrationOutboundJobDto,
  IntegrationOutboundQueryDto,
  UpdateIntegrationRestConnectorDto,
  UpdateIntegrationRetryPolicyDto,
  UpdateIntegrationWebhookDto,
} from './dto/integration-outbound.dto';
import {
  IntegrationConnectionEntity,
  IntegrationCredentialEntity,
  IntegrationLifecycleResultEntity,
  IntegrationProviderEntity,
} from './entities/integration-core.entity';
import { IntegrationInboundEventEntity } from './entities/integration-inbound.entity';
import {
  IntegrationExecutionHistoryEntity,
  IntegrationHealthSnapshotEntity,
  IntegrationRetryHistoryEntity,
} from './entities/integration-monitoring.entity';
import {
  IntegrationOutboundJobEntity,
  IntegrationRestConnectorEntity,
  IntegrationRetryPolicyEntity,
  IntegrationWebhookEntity,
} from './entities/integration-outbound.entity';
import { IntegrationProviderAdapter } from './providers/integration-provider.interface';
import { RestIntegrationProvider } from './providers/rest-integration.provider';

@Injectable()
export class IntegrationsService {
  private readonly statusRules = [
    { from: 'DRAFT' as IntegrationStatus, to: ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as IntegrationStatus[] },
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
    private readonly businessRules: BusinessRulesService,
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

  enableProvider(id: string) {
    return this.updateProvider(id, { status: IntegrationStatus.ACTIVE });
  }

  disableProvider(id: string) {
    return this.updateProvider(id, { status: IntegrationStatus.INACTIVE });
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

  enableCredential(id: string) {
    return this.updateCredential(id, { status: IntegrationStatus.ACTIVE });
  }

  disableCredential(id: string) {
    return this.updateCredential(id, { status: IntegrationStatus.INACTIVE });
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

  enableConnection(id: string) {
    return this.updateConnection(id, {
      status: IntegrationConnectionStatus.DISCONNECTED,
    });
  }

  disableConnection(id: string) {
    return this.updateConnection(id, { status: IntegrationConnectionStatus.DISABLED });
  }

  async findRetryPolicies(query: IntegrationQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.IntegrationRetryPolicyWhereInput =
      this.softDelete.activeWhere({
        ...(companyId ? { companyId } : {}),
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
      this.prisma.integrationRetryPolicy.findMany({
        where,
        orderBy: { code: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.integrationRetryPolicy.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new IntegrationRetryPolicyEntity(item)),
      total,
      query,
    );
  }

  async createRetryPolicy(dto: CreateIntegrationRetryPolicyDto) {
    const companyId = await this.resolveCompanyId(dto.companyId);
    await this.ensureRetryPolicyCodeUnique(companyId, dto.code);
    const status = dto.status ?? 'ACTIVE';
    this.assertStatusChange('IntegrationRetryPolicy', 'DRAFT', status);

    const item = await this.prisma.integrationRetryPolicy.create({
      data: {
        companyId,
        code: dto.code,
        name: dto.name,
        maxAttempts: dto.maxAttempts ?? 3,
        backoffSeconds: dto.backoffSeconds ?? 60,
        backoffMultiplier: dto.backoffMultiplier ?? 2,
        status,
        createdById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_RETRY_POLICY_CREATE',
      entity: 'IntegrationRetryPolicy',
      entityId: item.id,
      payload: { code: item.code, companyId: item.companyId },
    });

    return new IntegrationRetryPolicyEntity(item);
  }

  async updateRetryPolicy(id: string, dto: UpdateIntegrationRetryPolicyDto) {
    const current = await this.ensureRetryPolicyExists(id);
    const companyId = dto.companyId
      ? await this.resolveCompanyId(dto.companyId)
      : current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId || dto.code) {
      await this.ensureRetryPolicyCodeUnique(companyId, code, id);
    }
    if (dto.status && dto.status !== current.status) {
      this.assertStatusChange('IntegrationRetryPolicy', current.status, dto.status);
    }

    const item = await this.prisma.integrationRetryPolicy.update({
      where: { id },
      data: {
        companyId,
        code: dto.code,
        name: dto.name,
        maxAttempts: dto.maxAttempts,
        backoffSeconds: dto.backoffSeconds,
        backoffMultiplier: dto.backoffMultiplier,
        status: dto.status,
        updatedById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_RETRY_POLICY_UPDATE',
      entity: 'IntegrationRetryPolicy',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });

    return new IntegrationRetryPolicyEntity(item);
  }

  async removeRetryPolicy(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.integrationRetryPolicy as never,
      id,
    );

    await this.audit.record({
      action: 'INTEGRATION_RETRY_POLICY_DELETE',
      entity: 'IntegrationRetryPolicy',
      entityId: id,
      payload: { deleted: true },
    });

    return {
      success: true,
      deletedRetryPolicy: new IntegrationRetryPolicyEntity(result.record),
    };
  }

  enableRetryPolicy(id: string) {
    return this.updateRetryPolicy(id, { status: IntegrationStatus.ACTIVE });
  }

  disableRetryPolicy(id: string) {
    return this.updateRetryPolicy(id, { status: IntegrationStatus.INACTIVE });
  }

  async findWebhooks(query: IntegrationOutboundQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.IntegrationWebhookWhereInput =
      this.softDelete.activeWhere({
        ...(companyId ? { companyId } : {}),
        ...(query.providerId ? { providerId: query.providerId } : {}),
        ...(query.eventType ? { eventType: query.eventType } : {}),
        ...(query.status ? { status: query.status } : {}),
        ...(normalized.search
          ? {
              OR: [
                { code: { contains: normalized.search, mode: 'insensitive' } },
                { name: { contains: normalized.search, mode: 'insensitive' } },
                { eventType: { contains: normalized.search, mode: 'insensitive' } },
              ],
            }
          : {}),
      });

    const [items, total] = await this.prisma.$transaction([
      this.prisma.integrationWebhook.findMany({
        where,
        orderBy: [{ eventType: 'asc' }, { code: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.integrationWebhook.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new IntegrationWebhookEntity(item)),
      total,
      query,
    );
  }

  async createWebhook(dto: CreateIntegrationWebhookDto) {
    const provider = await this.ensureProviderExists(dto.providerId);
    const retryPolicy = dto.retryPolicyId
      ? await this.ensureRetryPolicyExists(dto.retryPolicyId)
      : null;
    const companyId = await this.resolveCompanyId(dto.companyId ?? provider.companyId ?? undefined);
    this.assertSameCompany(provider.companyId, companyId, 'Provider belongs to another company');
    if (retryPolicy) {
      this.assertSameCompany(
        retryPolicy.companyId,
        companyId,
        'Retry policy belongs to another company',
      );
    }
    await this.ensureWebhookCodeUnique(companyId, dto.code);
    const status = dto.status ?? 'DRAFT';
    this.assertStatusChange('IntegrationWebhook', 'DRAFT', status);

    const item = await this.prisma.integrationWebhook.create({
      data: {
        companyId,
        providerId: dto.providerId,
        retryPolicyId: dto.retryPolicyId,
        code: dto.code,
        name: dto.name,
        eventType: dto.eventType,
        targetUrl: dto.targetUrl,
        httpMethod: dto.httpMethod ?? 'POST',
        headers: this.toJson(dto.headers),
        payloadTemplate: this.toJson(dto.payloadTemplate),
        status,
        createdById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_WEBHOOK_CREATE',
      entity: 'IntegrationWebhook',
      entityId: item.id,
      payload: { code: item.code, eventType: item.eventType },
    });

    return new IntegrationWebhookEntity(item);
  }

  async updateWebhook(id: string, dto: UpdateIntegrationWebhookDto) {
    const current = await this.ensureWebhookExists(id);
    const provider = dto.providerId
      ? await this.ensureProviderExists(dto.providerId)
      : await this.ensureProviderExists(current.providerId);
    const retryPolicy = dto.retryPolicyId
      ? await this.ensureRetryPolicyExists(dto.retryPolicyId)
      : null;
    const companyId = dto.companyId
      ? await this.resolveCompanyId(dto.companyId)
      : current.companyId;
    this.assertSameCompany(provider.companyId, companyId, 'Provider belongs to another company');
    if (retryPolicy) {
      this.assertSameCompany(
        retryPolicy.companyId,
        companyId,
        'Retry policy belongs to another company',
      );
    }
    if (dto.companyId || dto.code) {
      await this.ensureWebhookCodeUnique(companyId, dto.code ?? current.code, id);
    }
    if (dto.status && dto.status !== current.status) {
      this.assertStatusChange('IntegrationWebhook', current.status, dto.status);
    }

    const item = await this.prisma.integrationWebhook.update({
      where: { id },
      data: {
        companyId,
        providerId: dto.providerId,
        retryPolicyId: dto.retryPolicyId,
        code: dto.code,
        name: dto.name,
        eventType: dto.eventType,
        targetUrl: dto.targetUrl,
        httpMethod: dto.httpMethod,
        headers: dto.headers === undefined ? undefined : this.toJson(dto.headers),
        payloadTemplate:
          dto.payloadTemplate === undefined
            ? undefined
            : this.toJson(dto.payloadTemplate),
        status: dto.status,
        updatedById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_WEBHOOK_UPDATE',
      entity: 'IntegrationWebhook',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });

    return new IntegrationWebhookEntity(item);
  }

  async removeWebhook(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.integrationWebhook as never,
      id,
    );

    await this.audit.record({
      action: 'INTEGRATION_WEBHOOK_DELETE',
      entity: 'IntegrationWebhook',
      entityId: id,
      payload: { deleted: true },
    });

    return {
      success: true,
      deletedWebhook: new IntegrationWebhookEntity(result.record),
    };
  }

  enableWebhook(id: string) {
    return this.updateWebhook(id, { status: IntegrationStatus.ACTIVE });
  }

  disableWebhook(id: string) {
    return this.updateWebhook(id, { status: IntegrationStatus.INACTIVE });
  }

  async findRestConnectors(query: IntegrationOutboundQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.IntegrationRestConnectorWhereInput =
      this.softDelete.activeWhere({
        ...(companyId ? { companyId } : {}),
        ...(query.connectionId ? { connectionId: query.connectionId } : {}),
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
      this.prisma.integrationRestConnector.findMany({
        where,
        orderBy: { code: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.integrationRestConnector.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new IntegrationRestConnectorEntity(item)),
      total,
      query,
    );
  }

  async createRestConnector(dto: CreateIntegrationRestConnectorDto) {
    const connection = await this.ensureConnectionExists(dto.connectionId);
    const companyId = await this.resolveCompanyId(dto.companyId ?? connection.companyId ?? undefined);
    this.assertSameCompany(
      connection.companyId,
      companyId,
      'Connection belongs to another company',
    );
    await this.ensureRestConnectorCodeUnique(companyId, dto.code);
    const status = dto.status ?? 'DRAFT';
    this.assertStatusChange('IntegrationRestConnector', 'DRAFT', status);

    const item = await this.prisma.integrationRestConnector.create({
      data: {
        companyId,
        connectionId: dto.connectionId,
        code: dto.code,
        name: dto.name,
        endpointPath: dto.endpointPath,
        httpMethod: dto.httpMethod ?? 'POST',
        requestTemplate: this.toJson(dto.requestTemplate),
        responseMapping: this.toJson(dto.responseMapping),
        status,
        createdById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_REST_CONNECTOR_CREATE',
      entity: 'IntegrationRestConnector',
      entityId: item.id,
      payload: { code: item.code, connectionId: item.connectionId },
    });

    return new IntegrationRestConnectorEntity(item);
  }

  async updateRestConnector(id: string, dto: UpdateIntegrationRestConnectorDto) {
    const current = await this.ensureRestConnectorExists(id);
    const connection = dto.connectionId
      ? await this.ensureConnectionExists(dto.connectionId)
      : await this.ensureConnectionExists(current.connectionId);
    const companyId = dto.companyId
      ? await this.resolveCompanyId(dto.companyId)
      : current.companyId;
    this.assertSameCompany(
      connection.companyId,
      companyId,
      'Connection belongs to another company',
    );
    if (dto.companyId || dto.code) {
      await this.ensureRestConnectorCodeUnique(companyId, dto.code ?? current.code, id);
    }
    if (dto.status && dto.status !== current.status) {
      this.assertStatusChange('IntegrationRestConnector', current.status, dto.status);
    }

    const item = await this.prisma.integrationRestConnector.update({
      where: { id },
      data: {
        companyId,
        connectionId: dto.connectionId,
        code: dto.code,
        name: dto.name,
        endpointPath: dto.endpointPath,
        httpMethod: dto.httpMethod,
        requestTemplate:
          dto.requestTemplate === undefined
            ? undefined
            : this.toJson(dto.requestTemplate),
        responseMapping:
          dto.responseMapping === undefined
            ? undefined
            : this.toJson(dto.responseMapping),
        status: dto.status,
        updatedById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_REST_CONNECTOR_UPDATE',
      entity: 'IntegrationRestConnector',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });

    return new IntegrationRestConnectorEntity(item);
  }

  async removeRestConnector(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.integrationRestConnector as never,
      id,
    );

    await this.audit.record({
      action: 'INTEGRATION_REST_CONNECTOR_DELETE',
      entity: 'IntegrationRestConnector',
      entityId: id,
      payload: { deleted: true },
    });

    return {
      success: true,
      deletedRestConnector: new IntegrationRestConnectorEntity(result.record),
    };
  }

  enableRestConnector(id: string) {
    return this.updateRestConnector(id, { status: IntegrationStatus.ACTIVE });
  }

  disableRestConnector(id: string) {
    return this.updateRestConnector(id, { status: IntegrationStatus.INACTIVE });
  }

  async enqueueOutboundJob(dto: EnqueueIntegrationOutboundJobDto) {
    const resolved = await this.resolveOutboundTarget(dto);
    const companyId = await this.resolveCompanyId(
      dto.companyId ?? resolved.companyId ?? undefined,
    );
    await this.evaluateOutboundRules(companyId, dto.eventType, dto.payload ?? {});

    const retryPolicy = resolved.retryPolicyId
      ? await this.ensureRetryPolicyExists(resolved.retryPolicyId)
      : null;
    const maxAttempts = retryPolicy?.maxAttempts ?? 3;

    const item = await this.prisma.integrationOutboundJob.create({
      data: {
        companyId,
        connectionId: resolved.connectionId,
        webhookId: resolved.webhookId,
        restConnectorId: resolved.restConnectorId,
        retryPolicyId: retryPolicy?.id,
        eventType: dto.eventType,
        targetUrl: resolved.targetUrl,
        httpMethod: resolved.httpMethod,
        headers: this.toJson(resolved.headers),
        payload: this.toJson(dto.payload),
        status: 'QUEUED',
        maxAttempts,
        nextAttemptAt: new Date(),
        createdById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_OUTBOUND_JOB_ENQUEUE',
      entity: 'IntegrationOutboundJob',
      entityId: item.id,
      payload: { eventType: item.eventType, status: item.status },
    });

    return new IntegrationOutboundJobEntity(item);
  }

  async findOutboundJobs(query: IntegrationOutboundQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const where: Prisma.IntegrationOutboundJobWhereInput = {
      ...(companyId ? { companyId } : {}),
      ...(query.connectionId ? { connectionId: query.connectionId } : {}),
      ...(query.eventType ? { eventType: query.eventType } : {}),
      ...(query.outboundStatus ? { status: query.outboundStatus } : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.integrationOutboundJob.findMany({
        where,
        orderBy: { queuedAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.integrationOutboundJob.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new IntegrationOutboundJobEntity(item)),
      total,
      query,
    );
  }

  async executeOutboundJob(id: string) {
    const job = await this.ensureOutboundJobExists(id);
    if (job.status === IntegrationOutboundStatus.DELIVERED) {
      throw new BadRequestException('Outbound job has already been delivered');
    }
    if (job.status === IntegrationOutboundStatus.CANCELLED) {
      throw new BadRequestException('Cancelled outbound jobs cannot be executed');
    }
    if (job.status === IntegrationOutboundStatus.PROCESSING) {
      throw new BadRequestException('Outbound job is already processing');
    }
    if (job.attempts >= job.maxAttempts) {
      throw new BadRequestException('Outbound job has no retry attempts remaining');
    }

    const attemptNumber = job.attempts + 1;
    const startedAt = new Date();
    const retryPolicy = job.retryPolicyId
      ? await this.ensureRetryPolicyExists(job.retryPolicyId)
      : null;
    await this.prisma.integrationOutboundJob.update({
      where: { id },
      data: {
        status: IntegrationOutboundStatus.PROCESSING,
        attempts: attemptNumber,
        processedAt: startedAt,
        updatedById: this.context.getUserId(),
      },
    });

    const dispatch = await this.dispatchOutboundJob(job);
    const completedAt = new Date();
    const durationMs = completedAt.getTime() - startedAt.getTime();
    const finalStatus = dispatch.success
      ? IntegrationOutboundStatus.DELIVERED
      : attemptNumber >= job.maxAttempts
        ? IntegrationOutboundStatus.FAILED
        : IntegrationOutboundStatus.QUEUED;
    const nextAttemptAt = dispatch.success
      ? null
      : finalStatus === IntegrationOutboundStatus.QUEUED
        ? this.calculateNextAttemptAt(retryPolicy, attemptNumber)
        : null;

    const updated = await this.prisma.$transaction(async (tx) => {
      const savedJob = await tx.integrationOutboundJob.update({
        where: { id },
        data: {
          status: finalStatus,
          deliveredAt: dispatch.success ? completedAt : job.deliveredAt,
          failedAt:
            !dispatch.success && finalStatus === IntegrationOutboundStatus.FAILED
              ? completedAt
              : job.failedAt,
          nextAttemptAt,
          error: dispatch.success ? null : dispatch.error,
          updatedById: this.context.getUserId(),
        },
      });

      await tx.integrationRetryHistory.create({
        data: {
          outboundJobId: id,
          attemptNumber,
          status: finalStatus,
          scheduledAt: nextAttemptAt,
          error: dispatch.success ? null : dispatch.error,
        },
      });

      await tx.integrationExecutionHistory.create({
        data: {
          companyId: job.companyId,
          connectionId: job.connectionId,
          outboundJobId: id,
          direction: 'OUTBOUND',
          operation: 'OUTBOUND_DISPATCH',
          status: dispatch.success ? 'SUCCESS' : 'FAILED',
          requestSummary: this.toJson({
            eventType: job.eventType,
            targetUrl: job.targetUrl,
            httpMethod: job.httpMethod,
          }),
          responseSummary: this.toJson(dispatch.response),
          error: dispatch.error,
          startedAt,
          completedAt,
          durationMs,
        },
      });

      return savedJob;
    });

    await this.audit.record({
      action: 'INTEGRATION_OUTBOUND_JOB_EXECUTE',
      entity: 'IntegrationOutboundJob',
      entityId: id,
      payload: {
        attemptNumber,
        status: updated.status,
        nextAttemptAt: updated.nextAttemptAt,
      },
    });

    return new IntegrationOutboundJobEntity(updated);
  }

  async retryOutboundJob(id: string) {
    const job = await this.ensureOutboundJobExists(id);
    if (job.status !== IntegrationOutboundStatus.FAILED) {
      throw new BadRequestException('Only failed outbound jobs can be retried');
    }
    if (job.attempts >= job.maxAttempts) {
      throw new BadRequestException('Outbound job has no retry attempts remaining');
    }

    const updated = await this.prisma.integrationOutboundJob.update({
      where: { id },
      data: {
        status: IntegrationOutboundStatus.QUEUED,
        nextAttemptAt: new Date(),
        error: null,
        failedAt: null,
        updatedById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_OUTBOUND_JOB_RETRY',
      entity: 'IntegrationOutboundJob',
      entityId: id,
      payload: { status: updated.status, nextAttemptAt: updated.nextAttemptAt },
    });

    return new IntegrationOutboundJobEntity(updated);
  }

  async cancelOutboundJob(id: string) {
    const job = await this.ensureOutboundJobExists(id);
    if (job.status === IntegrationOutboundStatus.DELIVERED) {
      throw new BadRequestException('Delivered outbound jobs cannot be cancelled');
    }

    const updated = await this.prisma.integrationOutboundJob.update({
      where: { id },
      data: {
        status: IntegrationOutboundStatus.CANCELLED,
        nextAttemptAt: null,
        updatedById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'INTEGRATION_OUTBOUND_JOB_CANCEL',
      entity: 'IntegrationOutboundJob',
      entityId: id,
      payload: { status: updated.status },
    });

    return new IntegrationOutboundJobEntity(updated);
  }

  async processDueOutboundJobs(limit = 10) {
    const now = new Date();
    const jobs = await this.prisma.integrationOutboundJob.findMany({
      where: {
        status: { in: [IntegrationOutboundStatus.PENDING, IntegrationOutboundStatus.QUEUED] },
        OR: [{ nextAttemptAt: null }, { nextAttemptAt: { lte: now } }],
      },
      orderBy: [{ nextAttemptAt: 'asc' }, { queuedAt: 'asc' }],
      take: Math.min(50, Math.max(1, limit)),
    });

    const results: IntegrationOutboundJobEntity[] = [];
    for (const job of jobs) {
      results.push(await this.executeOutboundJob(job.id));
    }

    return {
      processed: results.length,
      jobs: results,
    };
  }

  async receiveInboundWebhook(
    connectionId: string,
    dto: ReceiveIntegrationWebhookDto,
  ) {
    const connection = await this.ensureConnectionExists(connectionId);
    const credential = connection.credentialId
      ? await this.ensureCredentialExists(connection.credentialId)
      : null;
    const config = this.asRecord(connection.config);
    const validation = this.validateInboundSignature(
      dto.payload,
      dto.signature,
      config,
      credential?.secretRef,
    );
    const normalizedPayload = {
      eventType: dto.eventType,
      source: dto.source ?? 'webhook',
      receivedAt: new Date().toISOString(),
      data: dto.payload,
    };

    const item = await this.prisma.integrationInboundEvent.create({
      data: {
        companyId: connection.companyId,
        connectionId,
        eventType: dto.eventType,
        source: dto.source,
        headers: this.toJson(dto.headers),
        signature: dto.signature,
        signatureValid: validation.valid,
        rawPayload: this.toJson(dto.payload),
        normalizedPayload: this.toJson(normalizedPayload),
        status: validation.valid ? 'NORMALIZED' : 'REJECTED',
        error: validation.valid ? null : validation.reason,
        processedAt: validation.valid ? new Date() : null,
      },
    });

    await this.audit.record({
      action: validation.valid
        ? 'INTEGRATION_INBOUND_EVENT_RECEIVED'
        : 'INTEGRATION_INBOUND_EVENT_REJECTED',
      entity: 'IntegrationInboundEvent',
      entityId: item.id,
      payload: {
        eventType: item.eventType,
        connectionId,
        signatureValid: item.signatureValid,
      },
    });

    return new IntegrationInboundEventEntity(item);
  }

  async findInboundEvents(query: IntegrationInboundQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const where: Prisma.IntegrationInboundEventWhereInput = {
      ...(companyId ? { companyId } : {}),
      ...(query.connectionId ? { connectionId: query.connectionId } : {}),
      ...(query.eventType ? { eventType: query.eventType } : {}),
      ...(query.inboundStatus ? { status: query.inboundStatus } : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.integrationInboundEvent.findMany({
        where,
        orderBy: { receivedAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.integrationInboundEvent.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new IntegrationInboundEventEntity(item)),
      total,
      query,
    );
  }

  async findExecutionHistory(query: IntegrationMonitoringQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const where: Prisma.IntegrationExecutionHistoryWhereInput = {
      ...(companyId ? { companyId } : {}),
      ...(query.connectionId ? { connectionId: query.connectionId } : {}),
      ...(query.outboundJobId ? { outboundJobId: query.outboundJobId } : {}),
      ...(query.inboundEventId ? { inboundEventId: query.inboundEventId } : {}),
      ...(query.direction ? { direction: query.direction } : {}),
      ...(query.executionStatus ? { status: query.executionStatus } : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.integrationExecutionHistory.findMany({
        where,
        orderBy: { startedAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.integrationExecutionHistory.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new IntegrationExecutionHistoryEntity(item)),
      total,
      query,
    );
  }

  async findRetryHistory(query: IntegrationMonitoringQueryDto) {
    const where: Prisma.IntegrationRetryHistoryWhereInput = {
      ...(query.outboundJobId ? { outboundJobId: query.outboundJobId } : {}),
      ...(query.outboundStatus ? { status: query.outboundStatus } : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.integrationRetryHistory.findMany({
        where,
        orderBy: { attemptedAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.integrationRetryHistory.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new IntegrationRetryHistoryEntity(item)),
      total,
      query,
    );
  }

  async findHealthSnapshots(query: IntegrationMonitoringQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const where: Prisma.IntegrationHealthSnapshotWhereInput = {
      ...(companyId ? { companyId } : {}),
      ...(query.connectionId ? { connectionId: query.connectionId } : {}),
      ...(query.healthStatus ? { status: query.healthStatus } : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.integrationHealthSnapshot.findMany({
        where,
        orderBy: { checkedAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.integrationHealthSnapshot.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new IntegrationHealthSnapshotEntity(item)),
      total,
      query,
    );
  }

  async checkConnectionHealth(id: string) {
    const connection = await this.ensureConnectionExists(id);
    const startedAt = Date.now();
    const result = await this.testConnection(id);
    const status = result.success
      ? IntegrationHealthStatus.HEALTHY
      : IntegrationHealthStatus.DOWN;
    const item = await this.prisma.integrationHealthSnapshot.create({
      data: {
        companyId: connection.companyId,
        connectionId: id,
        status,
        latencyMs: Date.now() - startedAt,
        error: result.success ? null : result.message ?? 'Connection health check failed',
      },
    });

    await this.prisma.integrationExecutionHistory.create({
      data: {
        companyId: connection.companyId,
        connectionId: id,
        direction: 'OUTBOUND',
        operation: 'HEALTH_CHECK',
        status: result.success ? 'SUCCESS' : 'FAILED',
        responseSummary: this.toJson({
          status: item.status,
          latencyMs: item.latencyMs,
        }),
        error: item.error,
        completedAt: new Date(),
        durationMs: item.latencyMs,
      },
    });

    return new IntegrationHealthSnapshotEntity(item);
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

  private async ensureRetryPolicyExists(id: string) {
    const item = await this.prisma.integrationRetryPolicy.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Integration retry policy not found');
    return item;
  }

  private async ensureWebhookExists(id: string) {
    const item = await this.prisma.integrationWebhook.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Integration webhook not found');
    return item;
  }

  private async ensureRestConnectorExists(id: string) {
    const item = await this.prisma.integrationRestConnector.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('Integration REST connector not found');
    return item;
  }

  private async ensureOutboundJobExists(id: string) {
    const item = await this.prisma.integrationOutboundJob.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundException('Integration outbound job not found');
    return item;
  }

  private async ensureRetryPolicyCodeUnique(
    companyId: string | null,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.integrationRetryPolicy.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    if (item) throw new ConflictException('Integration retry policy code already exists');
  }

  private async ensureWebhookCodeUnique(
    companyId: string | null,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.integrationWebhook.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    if (item) throw new ConflictException('Integration webhook code already exists');
  }

  private async ensureRestConnectorCodeUnique(
    companyId: string | null,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.integrationRestConnector.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    if (item) {
      throw new ConflictException('Integration REST connector code already exists');
    }
  }

  private async resolveOutboundTarget(dto: EnqueueIntegrationOutboundJobDto) {
    if (dto.webhookId) {
      const webhook = await this.ensureWebhookExists(dto.webhookId);
      if (webhook.status !== 'ACTIVE') {
        throw new BadRequestException('Webhook must be active before enqueueing');
      }
      return {
        companyId: webhook.companyId,
        webhookId: webhook.id,
        restConnectorId: null,
        connectionId: dto.connectionId ?? null,
        retryPolicyId: dto.retryPolicyId ?? webhook.retryPolicyId,
        targetUrl: dto.targetUrl ?? webhook.targetUrl,
        httpMethod: dto.httpMethod ?? webhook.httpMethod,
        headers: dto.headers ?? this.asRecord(webhook.headers),
      };
    }

    if (dto.restConnectorId) {
      const connector = await this.ensureRestConnectorExists(dto.restConnectorId);
      if (connector.status !== 'ACTIVE') {
        throw new BadRequestException('REST connector must be active before enqueueing');
      }
      const connection = await this.ensureConnectionExists(connector.connectionId);
      const provider = await this.ensureProviderExists(connection.providerId);
      const baseUrl = provider.baseUrl ?? '';
      return {
        companyId: connector.companyId,
        webhookId: null,
        restConnectorId: connector.id,
        connectionId: connector.connectionId,
        retryPolicyId: dto.retryPolicyId ?? null,
        targetUrl: dto.targetUrl ?? this.joinUrl(baseUrl, connector.endpointPath),
        httpMethod: dto.httpMethod ?? connector.httpMethod,
        headers: dto.headers,
      };
    }

    if (!dto.targetUrl) {
      throw new BadRequestException('Target URL is required for ad-hoc outbound jobs');
    }

    return {
      companyId: dto.companyId ?? null,
      webhookId: null,
      restConnectorId: null,
      connectionId: dto.connectionId ?? null,
      retryPolicyId: dto.retryPolicyId ?? null,
      targetUrl: dto.targetUrl,
      httpMethod: dto.httpMethod ?? IntegrationHttpMethod.POST,
      headers: dto.headers,
    };
  }

  private async dispatchOutboundJob(job: {
    targetUrl: string;
    httpMethod: IntegrationHttpMethod;
    headers: Prisma.JsonValue | null;
    payload: Prisma.JsonValue | null;
  }): Promise<{
    success: boolean;
    response?: Record<string, unknown>;
    error?: string;
  }> {
    try {
      const response = await fetch(job.targetUrl, {
        method: job.httpMethod,
        headers: this.normalizeHeaders(job.headers),
        body:
          job.httpMethod === IntegrationHttpMethod.GET
            ? undefined
            : JSON.stringify(job.payload ?? {}),
        signal: AbortSignal.timeout(15000),
      });

      return {
        success: response.ok,
        response: {
          status: response.status,
          statusText: response.statusText,
        },
        error: response.ok
          ? undefined
          : `Outbound endpoint returned ${response.status}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Outbound dispatch failed',
      };
    }
  }

  private calculateNextAttemptAt(
    retryPolicy: { backoffSeconds: number; backoffMultiplier: number } | null,
    attemptNumber: number,
  ): Date {
    const baseSeconds = retryPolicy?.backoffSeconds ?? 60;
    const multiplier = retryPolicy?.backoffMultiplier ?? 1;
    const delaySeconds =
      baseSeconds * Math.max(1, Math.pow(multiplier, attemptNumber - 1));
    return new Date(Date.now() + delaySeconds * 1000);
  }

  private normalizeHeaders(value: Prisma.JsonValue | null) {
    const headers = this.asRecord(value) ?? {};
    return Object.entries(headers).reduce<Record<string, string>>(
      (normalized, [key, headerValue]) => {
        normalized[key] = String(headerValue);
        return normalized;
      },
      { 'Content-Type': 'application/json' },
    );
  }

  private async evaluateOutboundRules(
    companyId: string | null,
    eventType: string,
    payload: Record<string, unknown>,
  ): Promise<void> {
    const result = await this.businessRules.evaluate({
      companyId: companyId ?? undefined,
      module: 'integrations',
      entity: 'outbound-job',
      trigger: 'API',
      payload: { eventType, payload },
    });

    if (result.blocked) {
      throw new BadRequestException('Outbound integration blocked by business rules');
    }
  }

  private joinUrl(baseUrl: string, path: string): string {
    if (!baseUrl) return path;
    return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
  }

  private validateInboundSignature(
    payload: Record<string, unknown>,
    signature: string | undefined,
    config: Record<string, unknown> | null,
    credentialSecretRef?: string | null,
  ): { valid: boolean; reason?: string } {
    if (config?.allowUnsignedInbound === true) {
      return { valid: true };
    }

    const secret = this.resolveInboundSecret(config, credentialSecretRef);
    if (!secret) {
      return { valid: false, reason: 'Inbound signature secret is not configured' };
    }
    if (!signature) {
      return { valid: false, reason: 'Inbound signature is required' };
    }

    const expected = createHmac('sha256', secret)
      .update(this.stableStringify(payload))
      .digest('hex');
    const normalizedSignature = signature.startsWith('sha256=')
      ? signature.slice('sha256='.length)
      : signature;

    const expectedBuffer = Buffer.from(expected, 'hex');
    const actualBuffer = Buffer.from(normalizedSignature, 'hex');
    if (expectedBuffer.length !== actualBuffer.length) {
      return { valid: false, reason: 'Inbound signature is invalid' };
    }

    const valid = timingSafeEqual(expectedBuffer, actualBuffer);
    return {
      valid,
      reason: valid ? undefined : 'Inbound signature is invalid',
    };
  }

  private resolveInboundSecret(
    config: Record<string, unknown> | null,
    credentialSecretRef?: string | null,
  ): string | undefined {
    const secretEnv =
      typeof config?.signatureSecretEnv === 'string'
        ? config.signatureSecretEnv
        : credentialSecretRef;
    return secretEnv ? process.env[secretEnv] : undefined;
  }

  private stableStringify(value: unknown): string {
    if (Array.isArray(value)) {
      return `[${value.map((item) => this.stableStringify(item)).join(',')}]`;
    }
    if (value && typeof value === 'object') {
      const record = value as Record<string, unknown>;
      return `{${Object.keys(record)
        .sort()
        .map((key) => `${JSON.stringify(key)}:${this.stableStringify(record[key])}`)
        .join(',')}}`;
    }
    return JSON.stringify(value);
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
