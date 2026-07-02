import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BusinessRuleTrigger } from '@prisma/client';
import { IsEnum, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class EvaluateBusinessRulesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  module!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  entity!: string;

  @ApiPropertyOptional({ enum: BusinessRuleTrigger, default: BusinessRuleTrigger.API })
  @IsOptional()
  @IsEnum(BusinessRuleTrigger)
  trigger?: BusinessRuleTrigger;

  @ApiProperty()
  @IsObject()
  payload!: Record<string, unknown>;
}
