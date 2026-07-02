import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  ObservabilityCheckType,
  ObservabilityHealthStatus,
  ObservabilityProviderStatus,
} from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class ObservabilityHealthProviderQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  moduleName?: string;

  @ApiPropertyOptional({ enum: ObservabilityCheckType })
  @IsOptional()
  @IsEnum(ObservabilityCheckType)
  checkType?: ObservabilityCheckType;

  @ApiPropertyOptional({ enum: ObservabilityProviderStatus })
  @IsOptional()
  @IsEnum(ObservabilityProviderStatus)
  status?: ObservabilityProviderStatus;
}

export class HealthCheckResultQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  providerId?: string;

  @ApiPropertyOptional({ enum: ObservabilityHealthStatus })
  @IsOptional()
  @IsEnum(ObservabilityHealthStatus)
  status?: ObservabilityHealthStatus;
}

export class CreateObservabilityHealthProviderDto {
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

  @ApiProperty({ enum: ObservabilityCheckType })
  @IsEnum(ObservabilityCheckType)
  checkType!: ObservabilityCheckType;

  @ApiPropertyOptional({ enum: ObservabilityProviderStatus })
  @IsOptional()
  @IsEnum(ObservabilityProviderStatus)
  status?: ObservabilityProviderStatus;

  @ApiPropertyOptional({ minimum: 100 })
  @IsOptional()
  @IsInt()
  @Min(100)
  timeoutMs?: number;

  @ApiPropertyOptional({ minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  intervalSeconds?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdateObservabilityHealthProviderDto extends PartialType(
  CreateObservabilityHealthProviderDto,
) {}

export class RunHealthCheckDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;
}
