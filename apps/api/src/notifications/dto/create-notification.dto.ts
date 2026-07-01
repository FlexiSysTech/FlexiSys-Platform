import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationChannel, NotificationStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateNotificationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  employeeId?: string;

  @ApiPropertyOptional({ enum: NotificationChannel })
  @IsOptional()
  @IsEnum(NotificationChannel)
  channel?: NotificationChannel;

  @ApiPropertyOptional({ enum: NotificationStatus })
  @IsOptional()
  @IsEnum(NotificationStatus)
  status?: NotificationStatus;

  @ApiProperty({ example: 'Approval required' })
  @IsString()
  @MaxLength(200)
  title!: string;

  @ApiProperty({ example: 'A leave request is waiting for your review.' })
  @IsString()
  @MaxLength(2000)
  message!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;

  @ApiPropertyOptional({ example: '2026-07-01T09:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  scheduledAt?: string;
}
