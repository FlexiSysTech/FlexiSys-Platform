import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  BiAggregationPeriod,
  BiDatasetStatus,
  BiKpiValueType,
  BiMetricType,
} from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class BiDatasetQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ enum: BiDatasetStatus })
  @IsOptional()
  @IsEnum(BiDatasetStatus)
  status?: BiDatasetStatus;
}

export class CreateBiDatasetDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  source!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entityType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  refreshCron?: string;

  @ApiPropertyOptional({ enum: BiDatasetStatus })
  @IsOptional()
  @IsEnum(BiDatasetStatus)
  status?: BiDatasetStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdateBiDatasetDto extends PartialType(CreateBiDatasetDto) {}

export class BiMetricQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  datasetId?: string;

  @ApiPropertyOptional({ enum: BiDatasetStatus })
  @IsOptional()
  @IsEnum(BiDatasetStatus)
  status?: BiDatasetStatus;
}

export class CreateBiMetricDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  datasetId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: BiMetricType })
  @IsOptional()
  @IsEnum(BiMetricType)
  metricType?: BiMetricType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  expression?: string;

  @ApiPropertyOptional({ enum: BiKpiValueType })
  @IsOptional()
  @IsEnum(BiKpiValueType)
  valueType?: BiKpiValueType;

  @ApiPropertyOptional({ enum: BiDatasetStatus })
  @IsOptional()
  @IsEnum(BiDatasetStatus)
  status?: BiDatasetStatus;
}

export class UpdateBiMetricDto extends PartialType(CreateBiMetricDto) {}

export class RecordBiMetricObservationDto {
  @ApiProperty({ enum: BiAggregationPeriod })
  @IsEnum(BiAggregationPeriod)
  period!: BiAggregationPeriod;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  observedAt?: string;

  @ApiProperty()
  @IsNumber()
  value!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  dimensions?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
