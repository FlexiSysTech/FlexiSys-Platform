import { ApiPropertyOptional } from '@nestjs/swagger';
import { BiAggregationPeriod } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';

export class BiTrendQueryDto {
  @ApiPropertyOptional({ enum: BiAggregationPeriod })
  @IsOptional()
  @IsEnum(BiAggregationPeriod)
  period?: BiAggregationPeriod;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  to?: string;
}
