import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  PluginEventStatus,
  PluginHookType,
  PluginServiceType,
  PluginStatus,
} from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { PluginQueryDto } from './plugin-core.dto';

export class PluginSdkQueryDto extends PluginQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  registryEntryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  eventName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  hookPoint?: string;

  @ApiPropertyOptional({ enum: PluginEventStatus })
  @IsOptional()
  @IsEnum(PluginEventStatus)
  eventStatus?: PluginEventStatus;
}

export class CreatePluginEventSubscriptionDto {
  @ApiProperty()
  @IsString()
  registryEntryId!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(160)
  eventName!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  filter?: Record<string, unknown>;

  @ApiPropertyOptional({ enum: PluginStatus })
  @IsOptional()
  @IsEnum(PluginStatus)
  status?: PluginStatus;
}

export class UpdatePluginEventSubscriptionDto extends PartialType(
  CreatePluginEventSubscriptionDto,
) {}

export class CreatePluginHookDto {
  @ApiProperty()
  @IsString()
  registryEntryId!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(160)
  hookPoint!: string;

  @ApiPropertyOptional({ enum: PluginHookType })
  @IsOptional()
  @IsEnum(PluginHookType)
  type?: PluginHookType;

  @ApiPropertyOptional({ default: 100, minimum: 1, maximum: 10000 })
  @IsOptional()
  @Transform(({ value }) => Number(value ?? 100))
  @IsInt()
  @Min(1)
  @Max(10000)
  priority?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  config?: Record<string, unknown>;

  @ApiPropertyOptional({ enum: PluginStatus })
  @IsOptional()
  @IsEnum(PluginStatus)
  status?: PluginStatus;
}

export class UpdatePluginHookDto extends PartialType(CreatePluginHookDto) {}

export class CreatePluginServiceBindingDto {
  @ApiProperty()
  @IsString()
  registryEntryId!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  code!: string;

  @ApiPropertyOptional({ enum: PluginServiceType })
  @IsOptional()
  @IsEnum(PluginServiceType)
  serviceType?: PluginServiceType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  endpoint?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  contract?: Record<string, unknown>;
}

export class UpdatePluginServiceBindingDto extends PartialType(
  CreatePluginServiceBindingDto,
) {}

export class CreatePluginPermissionGrantDto {
  @ApiProperty()
  @IsString()
  registryEntryId!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(180)
  permissionCode!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  constraints?: Record<string, unknown>;
}

export class CreatePluginConfigurationDto {
  @ApiProperty()
  @IsString()
  registryEntryId!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  key!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  value?: Record<string, unknown>;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isSecret?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  secretRef?: string;
}

export class UpdatePluginConfigurationDto extends PartialType(
  CreatePluginConfigurationDto,
) {}

export class EmitPluginEventDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  registryEntryId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(160)
  eventName!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;
}
