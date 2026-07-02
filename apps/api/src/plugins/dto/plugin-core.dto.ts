import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  PluginLifecycleState,
  PluginSource,
  PluginStatus,
} from '@prisma/client';
import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class PluginQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ enum: PluginStatus })
  @IsOptional()
  @IsEnum(PluginStatus)
  status?: PluginStatus;

  @ApiPropertyOptional({ enum: PluginSource })
  @IsOptional()
  @IsEnum(PluginSource)
  source?: PluginSource;

  @ApiPropertyOptional({ enum: PluginLifecycleState })
  @IsOptional()
  @IsEnum(PluginLifecycleState)
  lifecycle?: PluginLifecycleState;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pluginKey?: string;
}

export class CreatePluginManifestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  pluginKey!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(180)
  name!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(60)
  version!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  publisher?: string;

  @ApiPropertyOptional({ enum: PluginSource })
  @IsOptional()
  @IsEnum(PluginSource)
  source?: PluginSource;

  @ApiPropertyOptional({ enum: PluginStatus })
  @IsOptional()
  @IsEnum(PluginStatus)
  status?: PluginStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entryPoint?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  checksum?: string;

  @ApiProperty()
  @IsObject()
  manifest!: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdatePluginManifestDto extends PartialType(
  CreatePluginManifestDto,
) {}

export class LoadPluginDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  config?: Record<string, unknown>;
}
