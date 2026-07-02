import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BusinessRuleActionType,
  BusinessRuleConditionOperator,
  BusinessRuleLogicalOperator,
} from '@prisma/client';

export class BusinessRuleConditionEntity {
  constructor(partial: Partial<BusinessRuleConditionEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  ruleId!: string;

  @ApiProperty()
  field!: string;

  @ApiProperty({ enum: BusinessRuleConditionOperator })
  operator!: BusinessRuleConditionOperator;

  @ApiPropertyOptional({ nullable: true })
  value!: unknown;

  @ApiProperty({ enum: BusinessRuleLogicalOperator })
  logicalOperator!: BusinessRuleLogicalOperator;

  @ApiPropertyOptional({ nullable: true })
  groupKey!: string | null;

  @ApiProperty()
  displayOrder!: number;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class BusinessRuleActionEntity {
  constructor(partial: Partial<BusinessRuleActionEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  ruleId!: string;

  @ApiProperty({ enum: BusinessRuleActionType })
  type!: BusinessRuleActionType;

  @ApiPropertyOptional({ nullable: true })
  target!: string | null;

  @ApiPropertyOptional({ nullable: true })
  value!: unknown;

  @ApiPropertyOptional({ nullable: true })
  message!: string | null;

  @ApiProperty()
  displayOrder!: number;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
