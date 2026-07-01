import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportParameterType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateReportParameterDto {
  @ApiProperty({ example: 'fromDate' })
  @IsString()
  @MaxLength(80)
  code!: string;

  @ApiProperty({ example: 'From Date' })
  @IsString()
  @MaxLength(200)
  label!: string;

  @ApiProperty({ enum: ReportParameterType })
  @IsEnum(ReportParameterType)
  type!: ReportParameterType;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  defaultValue?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  options?: Record<string, unknown>;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;
}
