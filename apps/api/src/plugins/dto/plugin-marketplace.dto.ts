import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { PluginInstallationStatus, PluginStatus } from '@prisma/client';
import { IsEnum, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

import { PluginQueryDto } from './plugin-core.dto';

export class PluginMarketplaceQueryDto extends PluginQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  packageId?: string;

  @ApiPropertyOptional({ enum: PluginInstallationStatus })
  @IsOptional()
  @IsEnum(PluginInstallationStatus)
  installationStatus?: PluginInstallationStatus;
}

export class CreatePluginMarketplacePackageDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  packageKey!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(180)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  publisher?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  websiteUrl?: string;

  @ApiPropertyOptional({ enum: PluginStatus })
  @IsOptional()
  @IsEnum(PluginStatus)
  status?: PluginStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdatePluginMarketplacePackageDto extends PartialType(
  CreatePluginMarketplacePackageDto,
) {}

export class CreatePluginMarketplaceVersionDto {
  @ApiProperty()
  @IsString()
  packageId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  manifestId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(60)
  version!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  releaseNotes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  compatibility?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  checksum?: string;

  @ApiPropertyOptional({ enum: PluginStatus })
  @IsOptional()
  @IsEnum(PluginStatus)
  status?: PluginStatus;
}

export class UpdatePluginMarketplaceVersionDto extends PartialType(
  CreatePluginMarketplaceVersionDto,
) {}

export class InstallPluginMarketplaceVersionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  config?: Record<string, unknown>;
}

export class UpgradePluginInstallationDto {
  @ApiProperty()
  @IsString()
  targetVersionId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  config?: Record<string, unknown>;
}
