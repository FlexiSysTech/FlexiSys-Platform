import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportExportFormat } from '@prisma/client';
import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateReportExecutionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reportId?: string;

  @ApiProperty({ example: 'hr.employee-summary' })
  @IsString()
  handler!: string;

  @ApiPropertyOptional({ enum: ReportExportFormat })
  @IsOptional()
  @IsEnum(ReportExportFormat)
  format?: ReportExportFormat;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  parameters?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  executedById?: string;
}
