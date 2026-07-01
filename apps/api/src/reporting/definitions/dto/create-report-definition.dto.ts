import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportDefinitionStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { CreateReportParameterDto } from './create-report-parameter.dto';

export class CreateReportDefinitionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ example: 'EMPLOYEE_SUMMARY' })
  @IsString()
  @MaxLength(80)
  code!: string;

  @ApiProperty({ example: 'Employee Summary' })
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ example: 'hr' })
  @IsString()
  @MaxLength(80)
  module!: string;

  @ApiProperty({ example: 'hr.employee-summary' })
  @IsString()
  @MaxLength(120)
  handler!: string;

  @ApiPropertyOptional({ enum: ReportDefinitionStatus })
  @IsOptional()
  @IsEnum(ReportDefinitionStatus)
  status?: ReportDefinitionStatus;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isSystem?: boolean;

  @ApiPropertyOptional({ type: [CreateReportParameterDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateReportParameterDto)
  parameters?: CreateReportParameterDto[];
}
