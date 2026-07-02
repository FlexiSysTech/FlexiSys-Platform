import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BusinessRuleExecutionStatus, BusinessRuleTrigger } from '@prisma/client';

export class BusinessRuleExecutionEntity {
  constructor(partial: Partial<BusinessRuleExecutionEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  ruleId!: string | null;

  @ApiProperty()
  module!: string;

  @ApiProperty()
  entity!: string;

  @ApiProperty({ enum: BusinessRuleTrigger })
  trigger!: BusinessRuleTrigger;

  @ApiProperty({ enum: BusinessRuleExecutionStatus })
  status!: BusinessRuleExecutionStatus;

  @ApiPropertyOptional({ nullable: true })
  input!: unknown;

  @ApiPropertyOptional({ nullable: true })
  result!: unknown;

  @ApiPropertyOptional({ nullable: true })
  error!: string | null;

  @ApiPropertyOptional({ nullable: true })
  executedById!: string | null;

  @ApiProperty()
  executedAt!: Date;

  @ApiProperty()
  createdAt!: Date;
}
