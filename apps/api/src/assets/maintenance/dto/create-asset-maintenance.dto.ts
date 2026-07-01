import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssetMaintenanceStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateAssetMaintenanceDto {
  @ApiProperty()
  @IsString()
  assetId!: string;

  @ApiProperty({ example: 'Battery replacement' })
  @IsString()
  @MaxLength(200)
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  vendorName?: string;

  @ApiPropertyOptional({ example: 300 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  cost?: number;

  @ApiPropertyOptional({ example: '2026-01-01' })
  @IsOptional()
  @IsDateString()
  scheduledDate?: string;

  @ApiPropertyOptional({ enum: AssetMaintenanceStatus })
  @IsOptional()
  @IsEnum(AssetMaintenanceStatus)
  status?: AssetMaintenanceStatus;
}
