import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MobileDevicePlatform, MobilePushProvider } from '@prisma/client';
import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class MobileLoginDto {
  @ApiProperty()
  @IsString()
  username!: string;

  @ApiProperty()
  @IsString()
  password!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(180)
  deviceIdentifier!: string;

  @ApiProperty({ enum: MobileDevicePlatform })
  @IsEnum(MobileDevicePlatform)
  platform!: MobileDevicePlatform;

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

export class MobileRefreshDto {
  @ApiProperty()
  @IsString()
  refreshToken!: string;
}

export class MobileLogoutDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sessionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  refreshToken?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;
}
