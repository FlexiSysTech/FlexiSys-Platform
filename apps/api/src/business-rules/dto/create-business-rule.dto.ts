import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BusinessRuleScope,
  BusinessRuleStatus,
  BusinessRuleTrigger,
} from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateBusinessRuleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(180)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  module!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  entity!: string;

  @ApiPropertyOptional({ enum: BusinessRuleTrigger })
  @IsOptional()
  @IsEnum(BusinessRuleTrigger)
  trigger?: BusinessRuleTrigger;

  @ApiPropertyOptional({ enum: BusinessRuleScope })
  @IsOptional()
  @IsEnum(BusinessRuleScope)
  scope?: BusinessRuleScope;

  @ApiPropertyOptional({ enum: BusinessRuleStatus })
  @IsOptional()
  @IsEnum(BusinessRuleStatus)
  status?: BusinessRuleStatus;

  @ApiPropertyOptional({ minimum: 1, maximum: 1000, default: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  priority?: number;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  effectiveFrom?: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  effectiveTo?: Date;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  stopProcessing?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
