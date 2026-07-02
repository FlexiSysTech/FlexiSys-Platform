import { BadRequestException, Injectable } from '@nestjs/common';
import { ObservabilityMetricUnit, Prisma } from '@prisma/client';

import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { PrismaService } from '../prisma/prisma.service';
import {
  BatchPlanDto,
  CacheInvalidateDto,
  CacheQueryDto,
  CacheSetDto,
  LazyLoadingPlanDto,
  QueryOptimizationQueryDto,
  RecordPerformanceMetricDto,
} from './dto/performance-optimization.dto';
import {
  BatchPlanEntity,
  CacheEntryEntity,
  CacheStatsEntity,
  LazyLoadingPlanEntity,
  MemoryStatsEntity,
  PerformanceMetricEntity,
  QueryOptimizationEntity,
} from './entities/performance-optimization.entity';

type CacheEntry = {
  value: Record<string, unknown>;
  expiresAt: Date;
  ttlSeconds: number;
  tags: string[];
  sizeBytes: number;
};

@Injectable()
export class PerformanceOptimizationService {
  private readonly cache = new Map<string, CacheEntry>();
  private cacheHits = 0;
  private cacheMisses = 0;

  constructor(
    private readonly prisma: PrismaService,
    private readonly pagination: PaginationService,
    private readonly context: RequestContextService,
    private readonly audit: AuditService,
  ) {}

  getQueryRecommendations(query: QueryOptimizationQueryDto) {
    const recommendations = [
      new QueryOptimizationEntity({
        moduleName: 'payroll',
        operation: 'payroll-run-list',
        queryPattern: 'companyId + year + month + status',
        recommendation:
          'Filter by companyId and indexed period fields first, select scalar totals, and load items through a separate paginated endpoint.',
        impact: 'Reduces large includes and protects locked payroll read paths.',
      }),
      new QueryOptimizationEntity({
        moduleName: 'documents',
        operation: 'document-search',
        queryPattern: 'companyId + status + expiryDate',
        recommendation:
          'Use indexed lifecycle fields and return file metadata only; defer version history until explicitly requested.',
        impact: 'Avoids heavy document version reads during dashboard and search workflows.',
      }),
      new QueryOptimizationEntity({
        moduleName: 'workflow',
        operation: 'pending-approvals',
        queryPattern: 'status + requesterId + workflowId',
        recommendation:
          'Load request summaries first and batch-fetch step details by request ids when the user opens a request.',
        impact: 'Prevents N+1 workflow step lookups.',
      }),
      new QueryOptimizationEntity({
        moduleName: 'analytics',
        operation: 'time-series',
        queryPattern: 'metricId + period + observedAt',
        recommendation:
          'Read metric observations by indexed time ranges and aggregate at write time for executive dashboards.',
        impact: 'Keeps BI dashboards responsive as historical data grows.',
      }),
    ].filter((item) => {
      return (
        (!query.moduleName || item.moduleName === query.moduleName) &&
        (!query.operation || item.operation === query.operation)
      );
    });

    return this.pagination.buildResponse(
      recommendations,
      recommendations.length,
      query,
    );
  }

  setCacheEntry(dto: CacheSetDto) {
    const ttlSeconds = dto.ttlSeconds ?? 300;
    const sizeBytes = Buffer.byteLength(JSON.stringify(dto.value), 'utf8');
    const entry: CacheEntry = {
      value: dto.value,
      ttlSeconds,
      tags: dto.tags ?? [],
      sizeBytes,
      expiresAt: new Date(Date.now() + ttlSeconds * 1000),
    };
    this.cache.set(dto.key, entry);
    void this.audit.record({
      action: 'PERFORMANCE_CACHE_SET',
      entity: 'PerformanceCache',
      entityId: dto.key,
      payload: { ttlSeconds, tags: entry.tags, sizeBytes },
    });
    return new CacheEntryEntity({
      key: dto.key,
      ttlSeconds,
      expiresAt: entry.expiresAt,
      tags: entry.tags,
      sizeBytes,
    });
  }

  getCacheEntries(query: CacheQueryDto) {
    this.evictExpired();
    const entries = Array.from(this.cache.entries())
      .filter(([key]) => !query.prefix || key.startsWith(query.prefix))
      .map(
        ([key, entry]) =>
          new CacheEntryEntity({
            key,
            ttlSeconds: Math.max(
              0,
              Math.ceil((entry.expiresAt.getTime() - Date.now()) / 1000),
            ),
            expiresAt: entry.expiresAt,
            tags: entry.tags,
            sizeBytes: entry.sizeBytes,
          }),
      );
    return this.pagination.buildResponse(entries, entries.length, query);
  }

  readCacheEntry(key: string) {
    this.evictExpired();
    const entry = this.cache.get(key);
    if (!entry) {
      this.cacheMisses += 1;
      throw new BadRequestException('Cache entry not found or expired');
    }
    this.cacheHits += 1;
    return {
      key,
      value: entry.value,
      expiresAt: entry.expiresAt,
      tags: entry.tags,
    };
  }

  invalidateCache(dto: CacheInvalidateDto) {
    if (!dto.key && !dto.prefix && !dto.tag) {
      throw new BadRequestException('key, prefix, or tag is required');
    }
    let removed = 0;
    for (const [key, entry] of this.cache.entries()) {
      const matches =
        key === dto.key ||
        Boolean(dto.prefix && key.startsWith(dto.prefix)) ||
        Boolean(dto.tag && entry.tags.includes(dto.tag));
      if (matches) {
        this.cache.delete(key);
        removed += 1;
      }
    }
    void this.audit.record({
      action: 'PERFORMANCE_CACHE_INVALIDATE',
      entity: 'PerformanceCache',
      entityId: dto.key ?? dto.prefix ?? dto.tag,
      payload: { removed },
    });
    return { removed };
  }

  getCacheStats() {
    this.evictExpired();
    const estimatedBytes = Array.from(this.cache.values()).reduce(
      (sum, entry) => sum + entry.sizeBytes,
      0,
    );
    const total = this.cacheHits + this.cacheMisses;
    return new CacheStatsEntity({
      entries: this.cache.size,
      hits: this.cacheHits,
      misses: this.cacheMisses,
      hitRate: total === 0 ? 0 : this.cacheHits / total,
      estimatedBytes,
    });
  }

  planBatch(dto: BatchPlanDto) {
    const batchSize = dto.batchSize ?? this.defaultBatchSize(dto.itemCount);
    const concurrency = dto.concurrency ?? Math.min(10, Math.max(1, Math.ceil(dto.itemCount / batchSize / 4)));
    const batchCount = Math.ceil(dto.itemCount / batchSize);
    const estimatedWaves = Math.ceil(batchCount / concurrency);
    return new BatchPlanEntity({
      operationName: dto.operationName,
      itemCount: dto.itemCount,
      batchSize,
      batchCount,
      concurrency,
      estimatedWaves,
    });
  }

  buildLazyLoadingPlan(dto: LazyLoadingPlanDto) {
    const requestedFields = dto.requestedFields?.length
      ? dto.requestedFields
      : ['id', 'createdAt', 'updatedAt'];
    const heavyRelations = new Set(['items', 'histories', 'versions', 'attachments', 'payload']);
    const deferredRelations = (dto.requestedRelations ?? []).filter((relation) =>
      heavyRelations.has(relation),
    );
    const eagerRelations = (dto.requestedRelations ?? []).filter(
      (relation) => !heavyRelations.has(relation),
    );
    return new LazyLoadingPlanEntity({
      rootEntity: dto.rootEntity,
      select: [...requestedFields, ...eagerRelations.map((relation) => `${relation}.summary`)],
      deferredRelations,
      warnings:
        deferredRelations.length > 0
          ? ['Heavy relations should be loaded through dedicated paginated endpoints.']
          : [],
    });
  }

  getMemoryStats() {
    const usage = process.memoryUsage();
    const heapUsedPercent =
      usage.heapTotal === 0 ? 0 : (usage.heapUsed / usage.heapTotal) * 100;
    return new MemoryStatsEntity({
      rssBytes: usage.rss,
      heapTotalBytes: usage.heapTotal,
      heapUsedBytes: usage.heapUsed,
      externalBytes: usage.external,
      heapUsedPercent,
      recommendation:
        heapUsedPercent > 80
          ? 'Heap usage is high; review large result sets and cache TTLs.'
          : 'Memory usage is within expected range.',
    });
  }

  async recordMetric(dto: RecordPerformanceMetricDto) {
    const item = await this.prisma.observabilityMetricSample.create({
      data: {
        tenantId: this.context.getTenantId(),
        metricType: 'CUSTOM',
        moduleName: 'performance-optimization',
        metricName: dto.metricName,
        value: dto.value,
        unit: this.toMetricUnit(dto.unit),
        endpoint: dto.endpoint,
        durationMs: dto.durationMs,
        labels: dto.labels === undefined ? Prisma.JsonNull : this.toJson(dto.labels),
      },
    });
    await this.audit.record({
      action: 'PERFORMANCE_METRIC_RECORD',
      entity: 'ObservabilityMetricSample',
      entityId: item.id,
      payload: { metricName: item.metricName, value: item.value },
    });
    return new PerformanceMetricEntity(item);
  }

  async getMetrics(query: QueryOptimizationQueryDto) {
    const where: Prisma.ObservabilityMetricSampleWhereInput = {
      ...(this.context.getTenantId() ? { tenantId: this.context.getTenantId() } : {}),
      moduleName: 'performance-optimization',
      ...(query.moduleName ? { labels: { path: ['moduleName'], equals: query.moduleName } } : {}),
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
      items.map((item) => new PerformanceMetricEntity(item)),
      total,
      query,
    );
  }

  private evictExpired() {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiresAt.getTime() <= now) {
        this.cache.delete(key);
      }
    }
  }

  private defaultBatchSize(itemCount: number) {
    if (itemCount <= 100) return 25;
    if (itemCount <= 1000) return 100;
    return 500;
  }

  private toMetricUnit(unit?: string): ObservabilityMetricUnit {
    const normalized = unit?.toUpperCase();
    if (normalized === 'COUNT') return 'COUNT';
    if (normalized === 'MILLISECONDS') return 'MILLISECONDS';
    if (normalized === 'PERCENT') return 'PERCENT';
    if (normalized === 'BYTES') return 'BYTES';
    return 'VALUE';
  }

  private toJson(
    value: unknown,
  ): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput {
    if (value === null) return Prisma.JsonNull;
    return value as Prisma.InputJsonValue;
  }
}
