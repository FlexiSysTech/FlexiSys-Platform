import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  MobileSyncOperation,
  MobileSyncStatus,
} from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class MobileSyncPullDto {
  @ApiProperty()
  @IsString()
  @MaxLength(120)
  scope!: string;

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
  deviceId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cursor?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  since?: string;

  @ApiPropertyOptional({ minimum: 1, maximum: 500 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(500)
  limit?: number;
}

export class MobileSyncChangeQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entityType?: string;

  @ApiPropertyOptional({ enum: MobileSyncStatus })
  @IsOptional()
  @IsEnum(MobileSyncStatus)
  syncStatus?: MobileSyncStatus;
}

export class CreateMobileSyncChangeDto {
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

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  entityType!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(180)
  entityId!: string;

  @ApiProperty({ enum: MobileSyncOperation })
  @IsEnum(MobileSyncOperation)
  operation!: MobileSyncOperation;

  @ApiPropertyOptional({ minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  version?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
