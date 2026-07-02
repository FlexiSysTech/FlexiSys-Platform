import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BusinessRuleActionType } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateBusinessRuleActionDto {
  @ApiProperty({ enum: BusinessRuleActionType })
  @IsEnum(BusinessRuleActionType)
  type!: BusinessRuleActionType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(160)
  target?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  value?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({ minimum: 0, maximum: 1000, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1000)
  displayOrder?: number;
}
