import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  BiAggregationPeriod,
  BiKpiStatus,
  BiKpiValueType,
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

export class BiKpiQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ enum: BiKpiStatus })
  @IsOptional()
  @IsEnum(BiKpiStatus)
  status?: BiKpiStatus;
}

export class CreateBiKpiDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

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
  category!: string;

  @ApiPropertyOptional({ enum: BiKpiValueType })
  @IsOptional()
  @IsEnum(BiKpiValueType)
  valueType?: BiKpiValueType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  formula?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  targetValue?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  warningValue?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  criticalValue?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({ enum: BiKpiStatus })
  @IsOptional()
  @IsEnum(BiKpiStatus)
  status?: BiKpiStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdateBiKpiDto extends PartialType(CreateBiKpiDto) {}

export class RecordBiKpiSnapshotDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiProperty({ enum: BiAggregationPeriod })
  @IsEnum(BiAggregationPeriod)
  period!: BiAggregationPeriod;

  @ApiProperty()
  @IsDateString()
  periodStart!: string;

  @ApiProperty()
  @IsDateString()
  periodEnd!: string;

  @ApiProperty()
  @IsNumber()
  value!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  targetValue?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class BiKpiSnapshotQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: BiAggregationPeriod })
  @IsOptional()
  @IsEnum(BiAggregationPeriod)
  period?: BiAggregationPeriod;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  to?: string;
}
