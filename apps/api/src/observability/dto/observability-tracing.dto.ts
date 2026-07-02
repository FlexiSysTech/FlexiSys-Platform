import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ObservabilitySpanType,
  ObservabilityTraceStatus,
} from '@prisma/client';
import { IsEnum, IsInt, IsObject, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class ObservabilityTraceQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  traceId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  moduleName?: string;

  @ApiPropertyOptional({ enum: ObservabilityTraceStatus })
  @IsOptional()
  @IsEnum(ObservabilityTraceStatus)
  status?: ObservabilityTraceStatus;
}

export class StartTraceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  traceId?: string;

  @ApiProperty()
  @IsString()
  rootSpanName!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class RecordSpanDto {
  @ApiProperty()
  @IsString()
  traceRecordId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  parentSpanId?: string;

  @ApiProperty()
  @IsString()
  spanName!: string;

  @ApiProperty()
  @IsString()
  moduleName!: string;

  @ApiProperty({ enum: ObservabilitySpanType })
  @IsEnum(ObservabilitySpanType)
  spanType!: ObservabilitySpanType;

  @ApiPropertyOptional({ enum: ObservabilityTraceStatus })
  @IsOptional()
  @IsEnum(ObservabilityTraceStatus)
  status?: ObservabilityTraceStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  durationMs?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
