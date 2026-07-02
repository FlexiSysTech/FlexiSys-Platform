import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QueryOptimizationEntity {
  constructor(partial: Partial<QueryOptimizationEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  moduleName!: string;

  @ApiProperty()
  operation!: string;

  @ApiProperty()
  queryPattern!: string;

  @ApiProperty()
  recommendation!: string;

  @ApiProperty()
  impact!: string;
}

export class CacheEntryEntity {
  constructor(partial: Partial<CacheEntryEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  key!: string;

  @ApiProperty()
  ttlSeconds!: number;

  @ApiProperty()
  expiresAt!: Date;

  @ApiProperty({ type: [String] })
  tags!: string[];

  @ApiProperty()
  sizeBytes!: number;
}

export class CacheStatsEntity {
  constructor(partial: Partial<CacheStatsEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  entries!: number;

  @ApiProperty()
  hits!: number;

  @ApiProperty()
  misses!: number;

  @ApiProperty()
  hitRate!: number;

  @ApiProperty()
  estimatedBytes!: number;
}

export class BatchPlanEntity {
  constructor(partial: Partial<BatchPlanEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  operationName!: string;

  @ApiProperty()
  itemCount!: number;

  @ApiProperty()
  batchSize!: number;

  @ApiProperty()
  batchCount!: number;

  @ApiProperty()
  concurrency!: number;

  @ApiProperty()
  estimatedWaves!: number;
}

export class LazyLoadingPlanEntity {
  constructor(partial: Partial<LazyLoadingPlanEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  rootEntity!: string;

  @ApiProperty({ type: [String] })
  select!: string[];

  @ApiProperty({ type: [String] })
  deferredRelations!: string[];

  @ApiProperty({ type: [String] })
  warnings!: string[];
}

export class MemoryStatsEntity {
  constructor(partial: Partial<MemoryStatsEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  rssBytes!: number;

  @ApiProperty()
  heapTotalBytes!: number;

  @ApiProperty()
  heapUsedBytes!: number;

  @ApiProperty()
  externalBytes!: number;

  @ApiProperty()
  heapUsedPercent!: number;

  @ApiPropertyOptional()
  recommendation?: string;
}

export class PerformanceMetricEntity {
  constructor(partial: Partial<PerformanceMetricEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  metricName!: string;

  @ApiProperty()
  value!: number;

  @ApiProperty()
  recordedAt!: Date;
}
