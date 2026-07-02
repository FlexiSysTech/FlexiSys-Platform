import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { TenantConfigurationStatus } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class TenantConfigurationQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  key?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  locale?: string;

  @ApiPropertyOptional({ enum: TenantConfigurationStatus })
  @IsOptional()
  @IsEnum(TenantConfigurationStatus)
  status?: TenantConfigurationStatus;
}

export class CreateTenantSettingDto {
  @ApiProperty()
  @IsString()
  tenantId!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  key!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  value?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isSecret?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  secretRef?: string;

  @ApiPropertyOptional({ enum: TenantConfigurationStatus })
  @IsOptional()
  @IsEnum(TenantConfigurationStatus)
  status?: TenantConfigurationStatus;
}

export class UpdateTenantSettingDto extends PartialType(CreateTenantSettingDto) {}

export class CreateTenantFeatureFlagDto {
  @ApiProperty()
  @IsString()
  tenantId!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  key!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  config?: Record<string, unknown>;

  @ApiPropertyOptional({ enum: TenantConfigurationStatus })
  @IsOptional()
  @IsEnum(TenantConfigurationStatus)
  status?: TenantConfigurationStatus;
}

export class UpdateTenantFeatureFlagDto extends PartialType(
  CreateTenantFeatureFlagDto,
) {}

export class CreateTenantLocalizationDto {
  @ApiProperty()
  @IsString()
  tenantId!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(24)
  locale!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dateFormat?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  timeFormat?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ enum: TenantConfigurationStatus })
  @IsOptional()
  @IsEnum(TenantConfigurationStatus)
  status?: TenantConfigurationStatus;
}

export class UpdateTenantLocalizationDto extends PartialType(
  CreateTenantLocalizationDto,
) {}

export class UpsertTenantBrandingDto {
  @ApiProperty()
  @IsString()
  tenantId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brandName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  faviconUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  primaryColor?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  secondaryColor?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  accentColor?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;

  @ApiPropertyOptional({ enum: TenantConfigurationStatus })
  @IsOptional()
  @IsEnum(TenantConfigurationStatus)
  status?: TenantConfigurationStatus;
}
