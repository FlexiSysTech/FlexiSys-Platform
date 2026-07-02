import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AiFeatureArea, AiGovernanceStatus } from '@prisma/client';

export class AiUsageLimitEntity {
  constructor(partial: Partial<AiUsageLimitEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiPropertyOptional({ enum: AiFeatureArea, nullable: true })
  feature!: AiFeatureArea | null;

  @ApiProperty({ enum: AiGovernanceStatus })
  status!: AiGovernanceStatus;

  @ApiPropertyOptional({ nullable: true })
  monthlyTokenLimit!: number | null;

  @ApiPropertyOptional({ nullable: true })
  monthlyCostLimit!: unknown;

  @ApiProperty()
  currency!: string;
}

export class AiSafetyPolicyEntity {
  constructor(partial: Partial<AiSafetyPolicyEntity>) {
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

  @ApiProperty({ enum: AiGovernanceStatus })
  status!: AiGovernanceStatus;

  @ApiPropertyOptional({ nullable: true })
  blockedTerms!: unknown;
}

export interface AiGovernanceAssessment {
  allowed: boolean;
  reason?: string;
}
