import { ApiPropertyOptional } from '@nestjs/swagger';
import { BusinessRuleExecutionStatus, BusinessRuleTrigger } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class BusinessRuleExecutionQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ruleId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  module?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entity?: string;

  @ApiPropertyOptional({ enum: BusinessRuleTrigger })
  @IsOptional()
  @IsEnum(BusinessRuleTrigger)
  trigger?: BusinessRuleTrigger;

  @ApiPropertyOptional({ enum: BusinessRuleExecutionStatus })
  @IsOptional()
  @IsEnum(BusinessRuleExecutionStatus)
  status?: BusinessRuleExecutionStatus;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  from?: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  to?: Date;
}
