import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { PrismaService } from '../prisma/prisma.service';
import {
  BiKpiQueryDto,
  BiKpiSnapshotQueryDto,
  CreateBiKpiDto,
  RecordBiKpiSnapshotDto,
  UpdateBiKpiDto,
} from './dto/bi-kpi.dto';
import {
  BiDatasetQueryDto,
  BiMetricQueryDto,
  CreateBiDatasetDto,
  CreateBiMetricDto,
  RecordBiMetricObservationDto,
  UpdateBiDatasetDto,
  UpdateBiMetricDto,
} from './dto/bi-analytics.dto';
import {
  BiAnalyticsExecutionEntity,
  BiDatasetEntity,
  BiMetricEntity,
  BiMetricObservationEntity,
} from './entities/bi-analytics.entity';
import { BiKpiEntity, BiKpiSnapshotEntity } from './entities/bi-kpi.entity';

@Injectable()
export class BiService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagination: PaginationService,
    private readonly context: RequestContextService,
    private readonly audit: AuditService,
    private readonly softDelete: SoftDeleteService,
  ) {}

  async findKpis(query: BiKpiQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.BiKpiDefinitionWhereInput = this.softDelete.activeWhere({
      ...(tenantId ? { tenantId } : {}),
      ...(query.companyId ? { companyId: query.companyId } : {}),
      ...(query.branchId ? { branchId: query.branchId } : {}),
      ...(query.category ? { category: query.category } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(normalized.search
        ? {
            OR: [
              { code: { contains: normalized.search, mode: 'insensitive' } },
              { name: { contains: normalized.search, mode: 'insensitive' } },
              { category: { contains: normalized.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.biKpiDefinition.findMany({
        where,
        orderBy: [{ category: 'asc' }, { name: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.biKpiDefinition.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new BiKpiEntity(item)),
      total,
      query,
    );
  }

  async createKpi(dto: CreateBiKpiDto) {
    const tenantId = dto.tenantId ?? this.context.getTenantId();
    const companyId = dto.companyId ?? this.context.getCompanyId();
    await this.ensureKpiUnique(tenantId, companyId, dto.code);
    const item = await this.prisma.biKpiDefinition.create({
      data: {
        tenantId,
        companyId,
        branchId: dto.branchId ?? this.context.getBranchId(),
        code: dto.code,
        name: dto.name,
        description: dto.description,
        category: dto.category,
        valueType: dto.valueType ?? 'NUMBER',
        formula: dto.formula,
        targetValue: dto.targetValue,
        warningValue: dto.warningValue,
        criticalValue: dto.criticalValue,
        unit: dto.unit,
        status: dto.status ?? 'ACTIVE',
        metadata: dto.metadata === undefined ? Prisma.JsonNull : this.toJson(dto.metadata),
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'BI_KPI_CREATE',
      entity: 'BiKpiDefinition',
      entityId: item.id,
      payload: { code: item.code, category: item.category },
    });
    return new BiKpiEntity(item);
  }

  async updateKpi(id: string, dto: UpdateBiKpiDto) {
    const current = await this.ensureKpiExists(id);
    const tenantId = dto.tenantId === undefined ? current.tenantId : dto.tenantId;
    const companyId = dto.companyId === undefined ? current.companyId : dto.companyId;
    if (dto.code || dto.tenantId !== undefined || dto.companyId !== undefined) {
      await this.ensureKpiUnique(tenantId, companyId, dto.code ?? current.code, id);
    }
    const item = await this.prisma.biKpiDefinition.update({
      where: { id },
      data: {
        tenantId,
        companyId,
        branchId: dto.branchId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        category: dto.category,
        valueType: dto.valueType,
        formula: dto.formula,
        targetValue: dto.targetValue,
        warningValue: dto.warningValue,
        criticalValue: dto.criticalValue,
        unit: dto.unit,
        status: dto.status,
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'BI_KPI_UPDATE',
      entity: 'BiKpiDefinition',
      entityId: item.id,
      payload: { code: item.code, status: item.status },
    });
    return new BiKpiEntity(item);
  }

  async archiveKpi(id: string) {
    await this.ensureKpiExists(id);
    const item = await this.prisma.biKpiDefinition.update({
      where: { id },
      data: {
        status: 'ARCHIVED',
        deletedAt: new Date(),
        deletedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'BI_KPI_ARCHIVE',
      entity: 'BiKpiDefinition',
      entityId: id,
      payload: { archived: true },
    });
    return new BiKpiEntity(item);
  }

  async recordSnapshot(id: string, dto: RecordBiKpiSnapshotDto) {
    const kpi = await this.ensureKpiExists(id);
    const companyId = dto.companyId ?? kpi.companyId;
    const branchId = dto.branchId ?? kpi.branchId;
    const periodStart = new Date(dto.periodStart);
    const targetValue = dto.targetValue ?? this.decimalToNumber(kpi.targetValue);
    const variance = targetValue === undefined ? undefined : dto.value - targetValue;
    const existing = await this.prisma.biKpiSnapshot.findFirst({
      where: {
        kpiId: id,
        period: dto.period,
        periodStart,
        companyId,
        branchId,
      },
      select: { id: true },
    });
    const item = existing
      ? await this.prisma.biKpiSnapshot.update({
          where: { id: existing.id },
          data: {
            periodEnd: new Date(dto.periodEnd),
            value: dto.value,
            targetValue,
            variance,
            source: dto.source,
            calculatedAt: new Date(),
            metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
          },
        })
      : await this.prisma.biKpiSnapshot.create({
          data: {
            tenantId: dto.tenantId ?? kpi.tenantId,
            companyId,
            branchId,
            kpiId: id,
            period: dto.period,
            periodStart,
            periodEnd: new Date(dto.periodEnd),
            value: dto.value,
            targetValue,
            variance,
            source: dto.source,
            metadata: dto.metadata === undefined ? Prisma.JsonNull : this.toJson(dto.metadata),
            createdById: this.context.getUserId(),
          },
        });
    await this.audit.record({
      action: 'BI_KPI_SNAPSHOT_RECORD',
      entity: 'BiKpiSnapshot',
      entityId: item.id,
      payload: { kpiId: id, period: item.period, value: dto.value },
    });
    return new BiKpiSnapshotEntity(item);
  }

  async findSnapshots(id: string, query: BiKpiSnapshotQueryDto) {
    await this.ensureKpiExists(id);
    const where: Prisma.BiKpiSnapshotWhereInput = {
      kpiId: id,
      ...(query.period ? { period: query.period } : {}),
      ...(query.from || query.to
        ? {
            periodStart: {
              ...(query.from ? { gte: new Date(query.from) } : {}),
              ...(query.to ? { lte: new Date(query.to) } : {}),
            },
          }
        : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.biKpiSnapshot.findMany({
        where,
        orderBy: { periodStart: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.biKpiSnapshot.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new BiKpiSnapshotEntity(item)),
      total,
      query,
    );
  }

  async findDatasets(query: BiDatasetQueryDto) {
    const where: Prisma.BiDatasetWhereInput = this.softDelete.activeWhere({
      ...(this.context.getTenantId() ? { tenantId: this.context.getTenantId() } : {}),
      ...(query.companyId ? { companyId: query.companyId } : {}),
      ...(query.status ? { status: query.status } : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.biDataset.findMany({
        where,
        orderBy: { name: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.biDataset.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new BiDatasetEntity(item)),
      total,
      query,
    );
  }

  async createDataset(dto: CreateBiDatasetDto) {
    const tenantId = this.context.getTenantId();
    const companyId = dto.companyId ?? this.context.getCompanyId();
    const item = await this.prisma.biDataset.create({
      data: {
        tenantId,
        companyId,
        branchId: dto.branchId ?? this.context.getBranchId(),
        code: dto.code,
        name: dto.name,
        description: dto.description,
        source: dto.source,
        entityType: dto.entityType,
        refreshCron: dto.refreshCron,
        status: dto.status ?? 'ACTIVE',
        metadata: dto.metadata === undefined ? Prisma.JsonNull : this.toJson(dto.metadata),
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'BI_DATASET_CREATE',
      entity: 'BiDataset',
      entityId: item.id,
      payload: { code: item.code, source: item.source },
    });
    return new BiDatasetEntity(item);
  }

  async updateDataset(id: string, dto: UpdateBiDatasetDto) {
    await this.ensureDatasetExists(id);
    const item = await this.prisma.biDataset.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        branchId: dto.branchId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        source: dto.source,
        entityType: dto.entityType,
        refreshCron: dto.refreshCron,
        status: dto.status,
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'BI_DATASET_UPDATE',
      entity: 'BiDataset',
      entityId: item.id,
      payload: { status: item.status },
    });
    return new BiDatasetEntity(item);
  }

  async findMetrics(query: BiMetricQueryDto) {
    const where: Prisma.BiMetricDefinitionWhereInput = this.softDelete.activeWhere({
      ...(this.context.getTenantId() ? { tenantId: this.context.getTenantId() } : {}),
      ...(query.datasetId ? { datasetId: query.datasetId } : {}),
      ...(query.status ? { status: query.status } : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.biMetricDefinition.findMany({
        where,
        orderBy: { name: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.biMetricDefinition.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new BiMetricEntity(item)),
      total,
      query,
    );
  }

  async createMetric(dto: CreateBiMetricDto) {
    if (dto.datasetId) await this.ensureDatasetExists(dto.datasetId);
    const item = await this.prisma.biMetricDefinition.create({
      data: {
        tenantId: this.context.getTenantId(),
        companyId: dto.companyId ?? this.context.getCompanyId(),
        branchId: this.context.getBranchId(),
        datasetId: dto.datasetId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        metricType: dto.metricType ?? 'COUNT',
        expression: dto.expression,
        valueType: dto.valueType ?? 'NUMBER',
        status: dto.status ?? 'ACTIVE',
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'BI_METRIC_CREATE',
      entity: 'BiMetricDefinition',
      entityId: item.id,
      payload: { code: item.code, metricType: item.metricType },
    });
    return new BiMetricEntity(item);
  }

  async updateMetric(id: string, dto: UpdateBiMetricDto) {
    await this.ensureMetricExists(id);
    const item = await this.prisma.biMetricDefinition.update({
      where: { id },
      data: {
        datasetId: dto.datasetId,
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        metricType: dto.metricType,
        expression: dto.expression,
        valueType: dto.valueType,
        status: dto.status,
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'BI_METRIC_UPDATE',
      entity: 'BiMetricDefinition',
      entityId: item.id,
      payload: { status: item.status },
    });
    return new BiMetricEntity(item);
  }

  async recordMetricObservation(id: string, dto: RecordBiMetricObservationDto) {
    const metric = await this.ensureMetricExists(id);
    const item = await this.prisma.biMetricObservation.create({
      data: {
        tenantId: metric.tenantId,
        companyId: metric.companyId,
        branchId: metric.branchId,
        metricId: id,
        period: dto.period,
        observedAt: dto.observedAt ? new Date(dto.observedAt) : new Date(),
        value: dto.value,
        dimensions:
          dto.dimensions === undefined ? Prisma.JsonNull : this.toJson(dto.dimensions),
        metadata: dto.metadata === undefined ? Prisma.JsonNull : this.toJson(dto.metadata),
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'BI_METRIC_OBSERVATION_RECORD',
      entity: 'BiMetricObservation',
      entityId: item.id,
      payload: { metricId: id, value: dto.value },
    });
    return new BiMetricObservationEntity(item);
  }

  async runDatasetExecution(id: string) {
    const dataset = await this.ensureDatasetExists(id);
    const startedAt = new Date();
    const result = await this.prisma.biMetricDefinition.count({
      where: { datasetId: id, status: 'ACTIVE' },
    });
    const finishedAt = new Date();
    const item = await this.prisma.biAnalyticsExecution.create({
      data: {
        tenantId: dataset.tenantId,
        companyId: dataset.companyId,
        branchId: dataset.branchId,
        datasetId: id,
        executionType: 'DATASET_REFRESH',
        status: 'SUCCEEDED',
        startedAt,
        finishedAt,
        durationMs: finishedAt.getTime() - startedAt.getTime(),
        result: this.toJson({ activeMetrics: result }),
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'BI_ANALYTICS_EXECUTE',
      entity: 'BiAnalyticsExecution',
      entityId: item.id,
      payload: { datasetId: id, status: item.status },
    });
    return new BiAnalyticsExecutionEntity(item);
  }

  private async ensureKpiExists(id: string) {
    const item = await this.prisma.biKpiDefinition.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('KPI definition not found');
    return item;
  }

  private async ensureDatasetExists(id: string) {
    const item = await this.prisma.biDataset.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('BI dataset not found');
    return item;
  }

  private async ensureMetricExists(id: string) {
    const item = await this.prisma.biMetricDefinition.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('BI metric not found');
    return item;
  }

  private async ensureKpiUnique(
    tenantId: string | null | undefined,
    companyId: string | null | undefined,
    code: string,
    excludeId?: string,
  ) {
    const existing = await this.prisma.biKpiDefinition.findFirst({
      where: {
        tenantId,
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
      select: { id: true },
    });
    if (existing) throw new ConflictException('KPI code already exists');
  }

  private decimalToNumber(value: Prisma.Decimal | null) {
    return value === null ? undefined : Number(value.toString());
  }

  private toJson(
    value: unknown,
  ): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput {
    if (value === null) return Prisma.JsonNull;
    return value as Prisma.InputJsonValue;
  }
}
