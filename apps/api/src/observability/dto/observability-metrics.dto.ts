import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  ObservabilityMetricType,
  ObservabilityMetricUnit,
  ObservabilityProviderStatus,
} from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class ObservabilityMetricQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  moduleName?: string;

  @ApiPropertyOptional({ enum: ObservabilityMetricType })
  @IsOptional()
  @IsEnum(ObservabilityMetricType)
  metricType?: ObservabilityMetricType;
}

export class CreateMetricDefinitionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(180)
  name!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  moduleName!: string;

  @ApiProperty({ enum: ObservabilityMetricType })
  @IsEnum(ObservabilityMetricType)
  metricType!: ObservabilityMetricType;

  @ApiPropertyOptional({ enum: ObservabilityMetricUnit })
  @IsOptional()
  @IsEnum(ObservabilityMetricUnit)
  unit?: ObservabilityMetricUnit;

  @ApiPropertyOptional({ enum: ObservabilityProviderStatus })
  @IsOptional()
  @IsEnum(ObservabilityProviderStatus)
  status?: ObservabilityProviderStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdateMetricDefinitionDto extends PartialType(
  CreateMetricDefinitionDto,
) {}

export class RecordMetricSampleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  definitionId?: string;

  @ApiProperty({ enum: ObservabilityMetricType })
  @IsEnum(ObservabilityMetricType)
  metricType!: ObservabilityMetricType;

  @ApiProperty()
  @IsString()
  moduleName!: string;

  @ApiProperty()
  @IsString()
  metricName!: string;

  @ApiProperty()
  @IsNumber()
  value!: number;

  @ApiPropertyOptional({ enum: ObservabilityMetricUnit })
  @IsOptional()
  @IsEnum(ObservabilityMetricUnit)
  unit?: ObservabilityMetricUnit;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  endpoint?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  statusCode?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  durationMs?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  labels?: Record<string, unknown>;
}
