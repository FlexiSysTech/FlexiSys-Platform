import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { TenantConfigurationStatus } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class TenantSecurityQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  permissionCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  action?: string;
}

export class CreateTenantPermissionPolicyDto {
  @ApiProperty()
  @IsString()
  tenantId!: string;

  @ApiProperty()
  @IsString()
  permissionCode!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  allowed?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  constraints?: Record<string, unknown>;

  @ApiPropertyOptional({ enum: TenantConfigurationStatus })
  @IsOptional()
  @IsEnum(TenantConfigurationStatus)
  status?: TenantConfigurationStatus;
}

export class UpdateTenantPermissionPolicyDto extends PartialType(
  CreateTenantPermissionPolicyDto,
) {}

export class ValidateTenantSecurityDto {
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
  permissionCode?: string;
}

export class RecordTenantAuditEventDto {
  @ApiProperty()
  @IsString()
  tenantId!: string;

  @ApiProperty()
  @IsString()
  action!: string;

  @ApiProperty()
  @IsString()
  entity!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entityId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;
}
