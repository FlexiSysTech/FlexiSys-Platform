import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { TenantPlan, TenantStatus } from '@prisma/client';
import { IsEnum, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class TenantQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: TenantStatus })
  @IsOptional()
  @IsEnum(TenantStatus)
  status?: TenantStatus;

  @ApiPropertyOptional({ enum: TenantPlan })
  @IsOptional()
  @IsEnum(TenantPlan)
  plan?: TenantPlan;
}

export class CreateTenantDto {
  @ApiProperty()
  @IsString()
  @MaxLength(80)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(180)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  legalName?: string;

  @ApiPropertyOptional({ enum: TenantPlan })
  @IsOptional()
  @IsEnum(TenantPlan)
  plan?: TenantPlan;

  @ApiPropertyOptional({ enum: TenantStatus })
  @IsOptional()
  @IsEnum(TenantStatus)
  status?: TenantStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  primaryDomain?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdateTenantDto extends PartialType(CreateTenantDto) {}

export class CreateTenantDomainDto {
  @ApiProperty()
  @IsString()
  tenantId!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  domain!: string;
}

export class ResolveTenantDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  domain?: string;
}
