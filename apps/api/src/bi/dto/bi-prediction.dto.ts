import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BiPredictionModelType,
  BiPredictionStatus,
} from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class BiPredictionModelQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: BiPredictionStatus })
  @IsOptional()
  @IsEnum(BiPredictionStatus)
  status?: BiPredictionStatus;
}

export class CreateBiPredictionModelDto {
  @ApiProperty()
  @IsString()
  @MaxLength(120)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: BiPredictionModelType })
  @IsOptional()
  @IsEnum(BiPredictionModelType)
  modelType?: BiPredictionModelType;

  @ApiProperty()
  @IsString()
  targetType!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  targetId?: string;

  @ApiPropertyOptional({ minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  horizonDays?: number;

  @ApiPropertyOptional({ enum: BiPredictionStatus })
  @IsOptional()
  @IsEnum(BiPredictionStatus)
  status?: BiPredictionStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  config?: Record<string, unknown>;
}
