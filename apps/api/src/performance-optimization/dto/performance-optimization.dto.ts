import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class QueryOptimizationQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  moduleName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  operation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  includeRecommendations?: boolean;
}

export class CacheQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  prefix?: string;
}

export class CacheSetDto {
  @ApiProperty()
  @IsString()
  @MaxLength(240)
  key!: string;

  @ApiProperty()
  @IsObject()
  value!: Record<string, unknown>;

  @ApiPropertyOptional({ minimum: 1, maximum: 86400 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(86400)
  ttlSeconds?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

export class CacheInvalidateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  key?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  prefix?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tag?: string;
}

export class BatchPlanDto {
  @ApiProperty()
  @IsString()
  operationName!: string;

  @ApiProperty({ minimum: 1 })
  @IsInt()
  @Min(1)
  itemCount!: number;

  @ApiPropertyOptional({ minimum: 1, maximum: 5000 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5000)
  batchSize?: number;

  @ApiPropertyOptional({ minimum: 1, maximum: 50 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  concurrency?: number;
}

export class LazyLoadingPlanDto {
  @ApiProperty()
  @IsString()
  rootEntity!: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requestedFields?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requestedRelations?: string[];
}

export class RecordPerformanceMetricDto {
  @ApiProperty()
  @IsString()
  metricName!: string;

  @ApiProperty()
  @IsNumber()
  value!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  endpoint?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  durationMs?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  labels?: Record<string, unknown>;
}
