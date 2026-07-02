import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ObservabilityCheckType,
  ObservabilityHealthStatus,
  ObservabilityLogLevel,
  ObservabilityMetricType,
  ObservabilityProviderStatus,
  Prisma,
} from '@prisma/client';

import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateObservabilityHealthProviderDto,
  HealthCheckResultQueryDto,
  ObservabilityHealthProviderQueryDto,
  RunHealthCheckDto,
  UpdateObservabilityHealthProviderDto,
} from './dto/observability-core.dto';
import {
  CreateMetricDefinitionDto,
  ObservabilityMetricQueryDto,
  RecordMetricSampleDto,
  UpdateMetricDefinitionDto,
} from './dto/observability-metrics.dto';
import {
  ObservabilityLogQueryDto,
  RecordLogEntryDto,
} from './dto/observability-logging.dto';
import {
  ObservabilityHealthCheckResultEntity,
  ObservabilityHealthProviderEntity,
  ObservabilitySystemHealthEntity,
} from './entities/observability-core.entity';
import {
  ObservabilityMetricDefinitionEntity,
  ObservabilityMetricSampleEntity,
  ObservabilityMetricSummaryEntity,
} from './entities/observability-metrics.entity';
import { ObservabilityLogEntryEntity } from './entities/observability-logging.entity';

@Injectable()
export class ObservabilityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
    private readonly pagination: PaginationService,
    private readonly audit: AuditService,
    private readonly softDelete: SoftDeleteService,
  ) {}

  async findHealthProviders(query: ObservabilityHealthProviderQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.ObservabilityHealthProviderWhereInput =
      this.softDelete.activeWhere({
        ...(tenantId ? { tenantId } : {}),
        ...(query.moduleName ? { moduleName: query.moduleName } : {}),
        ...(query.checkType ? { checkType: query.checkType } : {}),
        ...(query.status ? { status: query.status } : {}),
        ...(normalized.search
          ? {
              OR: [
                { code: { contains: normalized.search, mode: 'insensitive' } },
                { name: { contains: normalized.search, mode: 'insensitive' } },
                {
                  moduleName: {
                    contains: normalized.search,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
      });

    const [items, total] = await this.prisma.$transaction([
      this.prisma.observabilityHealthProvider.findMany({
        where,
        orderBy: [{ moduleName: 'asc' }, { code: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.observabilityHealthProvider.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new ObservabilityHealthProviderEntity(item)),
      total,
      query,
    );
  }

  async createHealthProvider(dto: CreateObservabilityHealthProviderDto) {
    const tenantId = await this.resolveTenantId(dto.tenantId);
    await this.ensureHealthProviderUnique(tenantId, dto.code);
    const provider = await this.prisma.observabilityHealthProvider.create({
      data: {
        tenantId,
        code: dto.code,
        name: dto.name,
        moduleName: dto.moduleName,
        checkType: dto.checkType,
        status: dto.status ?? 'ACTIVE',
        timeoutMs: dto.timeoutMs ?? 5000,
        intervalSeconds: dto.intervalSeconds ?? 60,
        metadata: this.toJson(dto.metadata),
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'OBSERVABILITY_HEALTH_PROVIDER_CREATE',
      entity: 'ObservabilityHealthProvider',
      entityId: provider.id,
      payload: { tenantId, code: provider.code, moduleName: provider.moduleName },
    });
    return new ObservabilityHealthProviderEntity(provider);
  }

  async updateHealthProvider(
    id: string,
    dto: UpdateObservabilityHealthProviderDto,
  ) {
    const current = await this.ensureHealthProviderExists(id);
    const tenantId =
      dto.tenantId === undefined
        ? current.tenantId
        : await this.resolveTenantId(dto.tenantId);
    const code = dto.code ?? current.code;
    if (dto.tenantId !== undefined || dto.code) {
      await this.ensureHealthProviderUnique(tenantId, code, id);
    }
    const provider = await this.prisma.observabilityHealthProvider.update({
      where: { id },
      data: {
        tenantId,
        code: dto.code,
        name: dto.name,
        moduleName: dto.moduleName,
        checkType: dto.checkType,
        status: dto.status,
        timeoutMs: dto.timeoutMs,
        intervalSeconds: dto.intervalSeconds,
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'OBSERVABILITY_HEALTH_PROVIDER_UPDATE',
      entity: 'ObservabilityHealthProvider',
      entityId: provider.id,
      payload: { before: current, after: provider } as Prisma.InputJsonObject,
    });
    return new ObservabilityHealthProviderEntity(provider);
  }

  async removeHealthProvider(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.observabilityHealthProvider as never,
      id,
    );
    await this.audit.record({
      action: 'OBSERVABILITY_HEALTH_PROVIDER_DELETE',
      entity: 'ObservabilityHealthProvider',
      entityId: id,
      payload: { deleted: true },
    });
    return {
      success: true,
      deletedProvider: new ObservabilityHealthProviderEntity(
        result.record as Partial<ObservabilityHealthProviderEntity>,
      ),
    };
  }

  async runProviderCheck(id: string) {
    const provider = await this.ensureHealthProviderExists(id);
    const result = await this.evaluateProvider(provider);
    await this.audit.record({
      action: 'OBSERVABILITY_HEALTH_CHECK_RUN',
      entity: 'ObservabilityHealthCheckResult',
      entityId: result.id,
      payload: { providerId: id, status: result.status },
    });
    return new ObservabilityHealthCheckResultEntity(result);
  }

  async getLiveness(dto: RunHealthCheckDto) {
    const result = await this.recordHealthCheck({
      tenantId: dto.tenantId ?? this.context.getTenantId(),
      providerId: null,
      checkType: 'LIVENESS',
      moduleName: 'api',
      status: 'HEALTHY',
      message: 'Application process is alive',
      latencyMs: 0,
      metadata: { checkedBy: 'observability-core' },
    });
    return new ObservabilitySystemHealthEntity({
      status: result.status,
      checkedAt: result.checkedAt,
      checks: [new ObservabilityHealthCheckResultEntity(result)],
    });
  }

  async getReadiness(dto: RunHealthCheckDto) {
    const tenantId = dto.tenantId ?? this.context.getTenantId();
    const providers = await this.prisma.observabilityHealthProvider.findMany({
      where: this.softDelete.activeWhere({
        ...(tenantId ? { tenantId } : {}),
        status: 'ACTIVE',
        checkType: { in: ['READINESS', 'DATABASE', 'MODULE', 'EXTERNAL_PROVIDER'] },
      }),
      orderBy: [{ moduleName: 'asc' }, { code: 'asc' }],
    });
    const checks =
      providers.length > 0
        ? await Promise.all(providers.map((provider) => this.evaluateProvider(provider)))
        : [
            await this.evaluateSyntheticDatabaseCheck(tenantId),
            await this.recordHealthCheck({
              tenantId,
              providerId: null,
              checkType: 'READINESS',
              moduleName: 'api',
              status: 'HEALTHY',
              message: 'Application is ready to serve requests',
              latencyMs: 0,
              metadata: { checkedBy: 'observability-core' },
            }),
          ];
    return new ObservabilitySystemHealthEntity({
      status: this.aggregateStatus(checks.map((check) => check.status)),
      checkedAt: new Date(),
      checks: checks.map((check) => new ObservabilityHealthCheckResultEntity(check)),
    });
  }

  async findHealthCheckResults(query: HealthCheckResultQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.ObservabilityHealthCheckResultWhereInput = {
      ...(tenantId ? { tenantId } : {}),
      ...(query.providerId ? { providerId: query.providerId } : {}),
      ...(query.status ? { status: query.status } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.observabilityHealthCheckResult.findMany({
        where,
        orderBy: { checkedAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.observabilityHealthCheckResult.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new ObservabilityHealthCheckResultEntity(item)),
      total,
      query,
    );
  }

  async findMetricDefinitions(query: ObservabilityMetricQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.ObservabilityMetricDefinitionWhereInput =
      this.softDelete.activeWhere({
        ...(tenantId ? { tenantId } : {}),
        ...(query.moduleName ? { moduleName: query.moduleName } : {}),
        ...(query.metricType ? { metricType: query.metricType } : {}),
      });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.observabilityMetricDefinition.findMany({
        where,
        orderBy: [{ moduleName: 'asc' }, { code: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.observabilityMetricDefinition.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new ObservabilityMetricDefinitionEntity(item)),
      total,
      query,
    );
  }

  async createMetricDefinition(dto: CreateMetricDefinitionDto) {
    const tenantId = await this.resolveTenantId(dto.tenantId);
    await this.ensureMetricDefinitionUnique(tenantId, dto.code);
    const definition = await this.prisma.observabilityMetricDefinition.create({
      data: {
        tenantId,
        code: dto.code,
        name: dto.name,
        moduleName: dto.moduleName,
        metricType: dto.metricType,
        unit: dto.unit ?? 'VALUE',
        status: dto.status ?? 'ACTIVE',
        metadata: this.toJson(dto.metadata),
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'OBSERVABILITY_METRIC_DEFINITION_CREATE',
      entity: 'ObservabilityMetricDefinition',
      entityId: definition.id,
      payload: { tenantId, code: definition.code, metricType: definition.metricType },
    });
    return new ObservabilityMetricDefinitionEntity(definition);
  }

  async updateMetricDefinition(id: string, dto: UpdateMetricDefinitionDto) {
    const current = await this.ensureMetricDefinitionExists(id);
    const tenantId =
      dto.tenantId === undefined
        ? current.tenantId
        : await this.resolveTenantId(dto.tenantId);
    if (dto.tenantId !== undefined || dto.code) {
      await this.ensureMetricDefinitionUnique(tenantId, dto.code ?? current.code, id);
    }
    const definition = await this.prisma.observabilityMetricDefinition.update({
      where: { id },
      data: {
        tenantId,
        code: dto.code,
        name: dto.name,
        moduleName: dto.moduleName,
        metricType: dto.metricType,
        unit: dto.unit,
        status: dto.status,
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'OBSERVABILITY_METRIC_DEFINITION_UPDATE',
      entity: 'ObservabilityMetricDefinition',
      entityId: definition.id,
      payload: { before: current, after: definition } as Prisma.InputJsonObject,
    });
    return new ObservabilityMetricDefinitionEntity(definition);
  }

  async removeMetricDefinition(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.observabilityMetricDefinition as never,
      id,
    );
    await this.audit.record({
      action: 'OBSERVABILITY_METRIC_DEFINITION_DELETE',
      entity: 'ObservabilityMetricDefinition',
      entityId: id,
      payload: { deleted: true },
    });
    return {
      success: true,
      deletedDefinition: new ObservabilityMetricDefinitionEntity(
        result.record as Partial<ObservabilityMetricDefinitionEntity>,
      ),
    };
  }

  async recordMetricSample(dto: RecordMetricSampleDto) {
    const tenantId = await this.resolveTenantId(dto.tenantId);
    if (dto.definitionId) await this.ensureMetricDefinitionExists(dto.definitionId);
    const sample = await this.prisma.observabilityMetricSample.create({
      data: {
        tenantId,
        definitionId: dto.definitionId,
        metricType: dto.metricType,
        moduleName: dto.moduleName,
        metricName: dto.metricName,
        value: dto.value,
        unit: dto.unit ?? 'VALUE',
        endpoint: dto.endpoint,
        statusCode: dto.statusCode,
        durationMs: dto.durationMs,
        labels: this.toJson(dto.labels),
      },
    });
    return new ObservabilityMetricSampleEntity(sample);
  }

  async findMetricSamples(query: ObservabilityMetricQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.ObservabilityMetricSampleWhereInput = {
      ...(tenantId ? { tenantId } : {}),
      ...(query.moduleName ? { moduleName: query.moduleName } : {}),
      ...(query.metricType ? { metricType: query.metricType } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.observabilityMetricSample.findMany({
        where,
        orderBy: { recordedAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.observabilityMetricSample.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new ObservabilityMetricSampleEntity(item)),
      total,
      query,
    );
  }

  getHttpMetrics(query: ObservabilityMetricQueryDto) {
    return this.getMetricSummary('HTTP', query);
  }

  getDatabaseMetrics(query: ObservabilityMetricQueryDto) {
    return this.getMetricSummary('DATABASE', query);
  }

  getWorkflowMetrics(query: ObservabilityMetricQueryDto) {
    return this.getMetricSummary('WORKFLOW', query);
  }

  getPayrollMetrics(query: ObservabilityMetricQueryDto) {
    return this.getMetricSummary('PAYROLL', query);
  }

  getBusinessRulesMetrics(query: ObservabilityMetricQueryDto) {
    return this.getMetricSummary('BUSINESS_RULES', query);
  }

  async findLogEntries(query: ObservabilityLogQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.ObservabilityLogEntryWhereInput = {
      ...(tenantId ? { tenantId } : {}),
      ...(query.userId ? { userId: query.userId } : {}),
      ...(query.correlationId ? { correlationId: query.correlationId } : {}),
      ...(query.requestId ? { requestId: query.requestId } : {}),
      ...(query.moduleName ? { moduleName: query.moduleName } : {}),
      ...(query.level ? { level: query.level } : {}),
      ...(normalized.search
        ? { message: { contains: normalized.search, mode: 'insensitive' } }
        : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.observabilityLogEntry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.observabilityLogEntry.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new ObservabilityLogEntryEntity(item)),
      total,
      query,
    );
  }

  async recordLogEntry(dto: RecordLogEntryDto) {
    const tenantId = await this.resolveTenantId(dto.tenantId);
    const metadata = this.context.getMetadata();
    const entry = await this.prisma.observabilityLogEntry.create({
      data: {
        tenantId,
        userId: dto.userId ?? this.context.getUserId(),
        correlationId: dto.correlationId ?? metadata?.correlationId,
        requestId: dto.requestId ?? metadata?.requestId,
        moduleName: dto.moduleName,
        level: dto.level,
        message: dto.message,
        method: dto.method,
        path: dto.path,
        statusCode: dto.statusCode,
        durationMs: dto.durationMs,
        context: this.toJson(dto.context),
      },
    });
    if (dto.level === 'ERROR' || dto.level === 'FATAL') {
      await this.audit.record({
        action: 'OBSERVABILITY_LOG_CRITICAL',
        entity: 'ObservabilityLogEntry',
        entityId: entry.id,
        payload: { level: entry.level, moduleName: entry.moduleName },
      });
    }
    return new ObservabilityLogEntryEntity(entry);
  }

  async getLogLevelSummary(query: ObservabilityLogQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const levels: ObservabilityLogLevel[] = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
    const counts = await this.prisma.$transaction(
      levels.map((level) =>
        this.prisma.observabilityLogEntry.count({
          where: {
            ...(tenantId ? { tenantId } : {}),
            level,
            ...(query.moduleName ? { moduleName: query.moduleName } : {}),
          },
        }),
      ),
    );
    return levels.map((level, index) => ({ level, count: counts[index] }));
  }

  private async getMetricSummary(
    metricType: ObservabilityMetricType,
    query: ObservabilityMetricQueryDto,
  ) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.ObservabilityMetricSampleWhereInput = {
      ...(tenantId ? { tenantId } : {}),
      metricType,
      ...(query.moduleName ? { moduleName: query.moduleName } : {}),
    };
    const aggregate = await this.prisma.observabilityMetricSample.aggregate({
      where,
      _count: { _all: true },
      _sum: { value: true },
      _avg: { value: true, durationMs: true },
    });
    return new ObservabilityMetricSummaryEntity({
      metricType,
      totalSamples: aggregate._count._all,
      totalValue: aggregate._sum.value ?? 0,
      averageValue: aggregate._avg.value ?? 0,
      averageDurationMs: aggregate._avg.durationMs ?? null,
    });
  }

  private async evaluateProvider(provider: {
    id: string;
    tenantId: string | null;
    checkType: ObservabilityCheckType;
    moduleName: string;
    metadata: Prisma.JsonValue | null;
  }) {
    const started = Date.now();
    try {
      if (provider.checkType === 'DATABASE') {
        await this.prisma.$queryRaw`SELECT 1`;
      }
      return this.recordHealthCheck({
        tenantId: provider.tenantId,
        providerId: provider.id,
        checkType: provider.checkType,
        moduleName: provider.moduleName,
        status: 'HEALTHY',
        message: `${provider.moduleName} health check passed`,
        latencyMs: Date.now() - started,
        metadata: { providerMetadata: provider.metadata },
      });
    } catch (error) {
      return this.recordHealthCheck({
        tenantId: provider.tenantId,
        providerId: provider.id,
        checkType: provider.checkType,
        moduleName: provider.moduleName,
        status: 'DOWN',
        message: error instanceof Error ? error.message : 'Health check failed',
        latencyMs: Date.now() - started,
        metadata: { providerMetadata: provider.metadata },
      });
    }
  }

  private async evaluateSyntheticDatabaseCheck(tenantId?: string) {
    const started = Date.now();
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return this.recordHealthCheck({
        tenantId,
        providerId: null,
        checkType: 'DATABASE',
        moduleName: 'database',
        status: 'HEALTHY',
        message: 'Database connection is ready',
        latencyMs: Date.now() - started,
        metadata: { checkedBy: 'observability-core' },
      });
    } catch (error) {
      return this.recordHealthCheck({
        tenantId,
        providerId: null,
        checkType: 'DATABASE',
        moduleName: 'database',
        status: 'DOWN',
        message: error instanceof Error ? error.message : 'Database check failed',
        latencyMs: Date.now() - started,
        metadata: { checkedBy: 'observability-core' },
      });
    }
  }

  private recordHealthCheck(data: {
    tenantId?: string | null;
    providerId?: string | null;
    checkType: ObservabilityCheckType;
    moduleName: string;
    status: ObservabilityHealthStatus;
    message?: string;
    latencyMs?: number;
    metadata?: Record<string, unknown>;
  }) {
    return this.prisma.observabilityHealthCheckResult.create({
      data: {
        tenantId: data.tenantId,
        providerId: data.providerId,
        checkType: data.checkType,
        moduleName: data.moduleName,
        status: data.status,
        message: data.message,
        latencyMs: data.latencyMs,
        metadata: this.toJson(data.metadata),
      },
    });
  }

  private aggregateStatus(
    statuses: ObservabilityHealthStatus[],
  ): ObservabilityHealthStatus {
    if (statuses.includes('DOWN')) return 'DOWN';
    if (statuses.includes('DEGRADED')) return 'DEGRADED';
    if (statuses.every((status) => status === 'HEALTHY')) return 'HEALTHY';
    return 'UNKNOWN';
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

  private async ensureHealthProviderExists(id: string) {
    const provider = await this.prisma.observabilityHealthProvider.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!provider) throw new NotFoundException('Health provider not found');
    return provider;
  }

  private async ensureHealthProviderUnique(
    tenantId: string | null,
    code: string,
    excludeId?: string,
  ) {
    const provider = await this.prisma.observabilityHealthProvider.findFirst({
      where: {
        tenantId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    if (provider) throw new ConflictException('Health provider already exists');
  }

  private async ensureMetricDefinitionExists(id: string) {
    const definition = await this.prisma.observabilityMetricDefinition.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!definition) throw new NotFoundException('Metric definition not found');
    return definition;
  }

  private async ensureMetricDefinitionUnique(
    tenantId: string | null,
    code: string,
    excludeId?: string,
  ) {
    const definition = await this.prisma.observabilityMetricDefinition.findFirst({
      where: {
        tenantId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    if (definition) throw new ConflictException('Metric definition already exists');
  }

  private toJson(value: unknown): Prisma.InputJsonValue | undefined {
    return value === undefined ? undefined : (value as Prisma.InputJsonValue);
  }
}
