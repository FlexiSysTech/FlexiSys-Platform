import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PerformanceCycleStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePerformanceCycleDto {
  @ApiProperty()
  @IsString()
  companyId!: string;

  @ApiProperty({ example: 'PERF-2026-Q1' })
  @IsString()
  @MaxLength(50)
  code!: string;

  @ApiProperty({ example: 'Performance Review Q1 2026' })
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ example: '2026-01-01' })
  @IsDateString()
  startDate!: string;

  @ApiProperty({ example: '2026-03-31' })
  @IsDateString()
  endDate!: string;

  @ApiPropertyOptional({ enum: PerformanceCycleStatus })
  @IsOptional()
  @IsEnum(PerformanceCycleStatus)
  status?: PerformanceCycleStatus;
}
