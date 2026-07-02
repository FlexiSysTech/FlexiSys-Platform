import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ObservabilityLogLevel } from '@prisma/client';
import { IsEnum, IsInt, IsObject, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class ObservabilityLogQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  correlationId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  requestId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  moduleName?: string;

  @ApiPropertyOptional({ enum: ObservabilityLogLevel })
  @IsOptional()
  @IsEnum(ObservabilityLogLevel)
  level?: ObservabilityLogLevel;
}

export class RecordLogEntryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  correlationId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  requestId?: string;

  @ApiProperty()
  @IsString()
  moduleName!: string;

  @ApiProperty({ enum: ObservabilityLogLevel })
  @IsEnum(ObservabilityLogLevel)
  level!: ObservabilityLogLevel;

  @ApiProperty()
  @IsString()
  message!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  method?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  path?: string;

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
  context?: Record<string, unknown>;
}
