import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  TenantConfigurationStatus,
  TenantProvisioningAction,
  TenantUsagePeriod,
} from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';
import { CreateTenantDto } from './tenant-core.dto';

export class ProvisionTenantDto extends CreateTenantDto {}

export class TenantLifecycleReasonDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;
}

export class TenantAdministrationQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  key?: string;

  @ApiPropertyOptional({ enum: TenantProvisioningAction })
  @IsOptional()
  @IsEnum(TenantProvisioningAction)
  action?: TenantProvisioningAction;
}

export class CreateTenantUsageLimitDto {
  @ApiProperty()
  @IsString()
  tenantId!: string;

  @ApiProperty()
  @IsString()
  key!: string;

  @ApiProperty({ minimum: 0 })
  @IsInt()
  @Min(0)
  limitValue!: number;

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  currentValue?: number;

  @ApiPropertyOptional({ enum: TenantUsagePeriod })
  @IsOptional()
  @IsEnum(TenantUsagePeriod)
  period?: TenantUsagePeriod;

  @ApiPropertyOptional({ enum: TenantConfigurationStatus })
  @IsOptional()
  @IsEnum(TenantConfigurationStatus)
  status?: TenantConfigurationStatus;
}

export class UpdateTenantUsageLimitDto extends PartialType(
  CreateTenantUsageLimitDto,
) {}

export class RecordTenantProvisioningEventDto {
  @ApiProperty()
  @IsString()
  tenantId!: string;

  @ApiProperty({ enum: TenantProvisioningAction })
  @IsEnum(TenantProvisioningAction)
  action!: TenantProvisioningAction;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;
}
