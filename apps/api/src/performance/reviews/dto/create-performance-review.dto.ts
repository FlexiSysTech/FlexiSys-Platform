import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  PerformanceRating,
  PerformanceReviewStatus,
} from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePerformanceReviewDto {
  @ApiProperty()
  @IsString()
  cycleId!: string;

  @ApiProperty()
  @IsString()
  employeeId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  managerId?: string;

  @ApiPropertyOptional({ enum: PerformanceReviewStatus })
  @IsOptional()
  @IsEnum(PerformanceReviewStatus)
  status?: PerformanceReviewStatus;

  @ApiPropertyOptional({ example: 85 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  selfScore?: number;

  @ApiPropertyOptional({ example: 90 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  managerScore?: number;

  @ApiPropertyOptional({ example: 88 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  finalScore?: number;

  @ApiPropertyOptional({ enum: PerformanceRating })
  @IsOptional()
  @IsEnum(PerformanceRating)
  finalRating?: PerformanceRating;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  selfComments?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  managerComments?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  hrComments?: string;
}
