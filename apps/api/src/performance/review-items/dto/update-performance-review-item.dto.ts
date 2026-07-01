import { ApiPropertyOptional } from '@nestjs/swagger';
import { PerformanceRating } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdatePerformanceReviewItemDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reviewId?: string;

  @ApiPropertyOptional({ example: 'Quality of work' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({ example: 25 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @ApiPropertyOptional({ example: 90 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  score?: number;

  @ApiPropertyOptional({ enum: PerformanceRating })
  @IsOptional()
  @IsEnum(PerformanceRating)
  rating?: PerformanceRating;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  comments?: string;
}
