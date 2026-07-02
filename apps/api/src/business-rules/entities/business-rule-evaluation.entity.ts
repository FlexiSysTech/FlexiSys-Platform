import { ApiProperty } from '@nestjs/swagger';

export class BusinessRuleEvaluationActionEntity {
  constructor(partial: Partial<BusinessRuleEvaluationActionEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  ruleId!: string;

  @ApiProperty()
  ruleCode!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  target!: string | null;

  @ApiProperty()
  value!: unknown;

  @ApiProperty()
  message!: string | null;
}

export class BusinessRuleEvaluationEntity {
  constructor(partial: Partial<BusinessRuleEvaluationEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  matched!: boolean;

  @ApiProperty()
  blocked!: boolean;

  @ApiProperty()
  evaluatedRuleCount!: number;

  @ApiProperty()
  matchedRuleCount!: number;

  @ApiProperty({ type: [String] })
  matchedRuleIds!: string[];

  @ApiProperty({ type: [BusinessRuleEvaluationActionEntity] })
  actions!: BusinessRuleEvaluationActionEntity[];
}
