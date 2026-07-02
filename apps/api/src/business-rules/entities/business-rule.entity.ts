import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BusinessRuleScope,
  BusinessRuleStatus,
  BusinessRuleTrigger,
} from '@prisma/client';

export class BusinessRuleCategoryEntity {
  constructor(partial: Partial<BusinessRuleCategoryEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty()
  isSystem!: boolean;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class BusinessRuleEntity {
  constructor(partial: Partial<BusinessRuleEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  branchId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  categoryId!: string | null;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty()
  module!: string;

  @ApiProperty()
  entity!: string;

  @ApiProperty({ enum: BusinessRuleTrigger })
  trigger!: BusinessRuleTrigger;

  @ApiProperty({ enum: BusinessRuleScope })
  scope!: BusinessRuleScope;

  @ApiProperty({ enum: BusinessRuleStatus })
  status!: BusinessRuleStatus;

  @ApiProperty()
  priority!: number;

  @ApiPropertyOptional({ type: Date, nullable: true })
  effectiveFrom!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  effectiveTo!: Date | null;

  @ApiProperty()
  stopProcessing!: boolean;

  @ApiPropertyOptional({ nullable: true })
  metadata!: unknown;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
