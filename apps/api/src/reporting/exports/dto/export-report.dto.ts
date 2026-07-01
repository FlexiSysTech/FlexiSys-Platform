import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportExportFormat } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ExportReportDto {
  @ApiProperty({ enum: ReportExportFormat })
  @IsEnum(ReportExportFormat)
  format!: ReportExportFormat;

  @ApiProperty({ example: 'Employee Summary' })
  @IsString()
  @MaxLength(200)
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiProperty({ type: [Object] })
  @IsArray()
  rows!: Record<string, unknown>[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
