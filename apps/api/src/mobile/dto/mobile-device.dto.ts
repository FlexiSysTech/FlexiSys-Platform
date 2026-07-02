import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  MobileDevicePlatform,
  MobileDeviceStatus,
  MobilePushProvider,
} from '@prisma/client';
import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class MobileDeviceQueryDto extends PaginationQueryDto {
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
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiPropertyOptional({ enum: MobileDevicePlatform })
  @IsOptional()
  @IsEnum(MobileDevicePlatform)
  platform?: MobileDevicePlatform;

  @ApiPropertyOptional({ enum: MobileDeviceStatus })
  @IsOptional()
  @IsEnum(MobileDeviceStatus)
  status?: MobileDeviceStatus;
}

export class RegisterMobileDeviceDto {
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
  @IsString()
  @MaxLength(180)
  deviceIdentifier!: string;

  @ApiPropertyOptional({ enum: MobileDevicePlatform })
  @IsEnum(MobileDevicePlatform)
  platform!: MobileDevicePlatform;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  appVersion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  osVersion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  manufacturer?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pushToken?: string;

  @ApiPropertyOptional({ enum: MobilePushProvider })
  @IsOptional()
  @IsEnum(MobilePushProvider)
  pushProvider?: MobilePushProvider;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdateMobileDeviceDto extends PartialType(RegisterMobileDeviceDto) {
  @ApiPropertyOptional({ enum: MobileDeviceStatus })
  @IsOptional()
  @IsEnum(MobileDeviceStatus)
  status?: MobileDeviceStatus;
}

export class RevokeMobileDeviceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;
}
