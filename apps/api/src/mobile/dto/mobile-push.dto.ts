import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { MobilePushProvider, MobilePushStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class MobilePushQueryDto extends PaginationQueryDto {
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
  deviceId?: string;

  @ApiPropertyOptional({ enum: MobilePushStatus })
  @IsOptional()
  @IsEnum(MobilePushStatus)
  status?: MobilePushStatus;
}

export class CreateMobilePushNotificationDto {
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
  deviceId?: string;

  @ApiPropertyOptional({ enum: MobilePushProvider })
  @IsOptional()
  @IsEnum(MobilePushProvider)
  provider?: MobilePushProvider;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  title!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(2000)
  message!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  scheduledAt?: string;
}

export class UpdateMobilePushNotificationDto extends PartialType(
  CreateMobilePushNotificationDto,
) {
  @ApiPropertyOptional({ enum: MobilePushStatus })
  @IsOptional()
  @IsEnum(MobilePushStatus)
  status?: MobilePushStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  error?: string;
}
