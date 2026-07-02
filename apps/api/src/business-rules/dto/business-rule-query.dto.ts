import { ApiPropertyOptional } from '@nestjs/swagger';
import { BusinessRuleStatus, BusinessRuleTrigger } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class BusinessRuleQueryDto extends PaginationQueryDto {
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
  module?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entity?: string;

  @ApiPropertyOptional({ enum: BusinessRuleTrigger })
  @IsOptional()
  @IsEnum(BusinessRuleTrigger)
  trigger?: BusinessRuleTrigger;

  @ApiPropertyOptional({ enum: BusinessRuleStatus })
  @IsOptional()
  @IsEnum(BusinessRuleStatus)
  status?: BusinessRuleStatus;
}
