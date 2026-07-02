import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  PluginCapabilityType,
  PluginDependencyStatus,
  PluginSandboxLevel,
  PluginStatus,
} from '@prisma/client';
import { IsBoolean, IsEnum, IsObject, IsOptional, IsString } from 'class-validator';

import { PluginSdkQueryDto } from './plugin-sdk.dto';

export class PluginIsolationQueryDto extends PluginSdkQueryDto {
  @ApiPropertyOptional({ enum: PluginCapabilityType })
  @IsOptional()
  @IsEnum(PluginCapabilityType)
  capability?: PluginCapabilityType;

  @ApiPropertyOptional({ enum: PluginDependencyStatus })
  @IsOptional()
  @IsEnum(PluginDependencyStatus)
  dependencyStatus?: PluginDependencyStatus;
}

export class UpsertPluginSandboxPolicyDto {
  @ApiProperty()
  @IsString()
  registryEntryId!: string;

  @ApiPropertyOptional({ enum: PluginSandboxLevel })
  @IsOptional()
  @IsEnum(PluginSandboxLevel)
  level?: PluginSandboxLevel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  allowedCapabilities?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  networkPolicy?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  resourceLimits?: Record<string, unknown>;
}

export class CreatePluginDependencyDto {
  @ApiProperty()
  @IsString()
  registryEntryId!: string;

  @ApiProperty()
  @IsString()
  dependencyKey!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  requiredVersion?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  optional?: boolean;
}

export class UpdatePluginDependencyDto extends PartialType(
  CreatePluginDependencyDto,
) {
  @ApiPropertyOptional({ enum: PluginDependencyStatus })
  @IsOptional()
  @IsEnum(PluginDependencyStatus)
  status?: PluginDependencyStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  resolvedVersion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  message?: string;
}

export class CreatePluginCapabilityGrantDto {
  @ApiProperty()
  @IsString()
  registryEntryId!: string;

  @ApiProperty({ enum: PluginCapabilityType })
  @IsEnum(PluginCapabilityType)
  capability!: PluginCapabilityType;

  @ApiPropertyOptional({ enum: PluginStatus })
  @IsOptional()
  @IsEnum(PluginStatus)
  status?: PluginStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  constraints?: Record<string, unknown>;
}
