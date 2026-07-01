import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PerformanceGoalStatus } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePerformanceGoalDto {
  @ApiProperty()
  @IsString()
  cycleId!: string;

  @ApiProperty()
  @IsString()
  employeeId!: string;

  @ApiProperty({ example: 'Increase sales by 15%' })
  @IsString()
  @MaxLength(200)
  title!: string;

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

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  targetValue?: number;

  @ApiPropertyOptional({ example: 90 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  actualValue?: number;

  @ApiPropertyOptional({ enum: PerformanceGoalStatus })
  @IsOptional()
  @IsEnum(PerformanceGoalStatus)
  status?: PerformanceGoalStatus;
}
