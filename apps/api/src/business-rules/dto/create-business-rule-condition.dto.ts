import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BusinessRuleConditionOperator,
  BusinessRuleLogicalOperator,
} from '@prisma/client';
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

export class CreateBusinessRuleConditionDto {
  @ApiProperty()
  @IsString()
  @MaxLength(160)
  field!: string;

  @ApiProperty({ enum: BusinessRuleConditionOperator })
  @IsEnum(BusinessRuleConditionOperator)
  operator!: BusinessRuleConditionOperator;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  value?: Record<string, unknown>;

  @ApiPropertyOptional({ enum: BusinessRuleLogicalOperator })
  @IsOptional()
  @IsEnum(BusinessRuleLogicalOperator)
  logicalOperator?: BusinessRuleLogicalOperator;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(80)
  groupKey?: string;

  @ApiPropertyOptional({ minimum: 0, maximum: 1000, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1000)
  displayOrder?: number;
}
