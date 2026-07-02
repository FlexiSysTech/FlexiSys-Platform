import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PublicApiRateLimitWindow, PublicApiStatus } from '@prisma/client';

export class PublicApiRateLimitPolicyEntity {
  constructor(partial: Partial<PublicApiRateLimitPolicyEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  tenantId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  applicationId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  apiId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  endpoint!: string | null;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  limitValue!: number;

  @ApiProperty({ enum: PublicApiRateLimitWindow })
  window!: PublicApiRateLimitWindow;

  @ApiProperty({ enum: PublicApiStatus })
  status!: PublicApiStatus;
}

export class PublicApiUsageCounterEntity {
  constructor(partial: Partial<PublicApiUsageCounterEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  counterKey!: string;

  @ApiProperty({ enum: PublicApiRateLimitWindow })
  window!: PublicApiRateLimitWindow;

  @ApiProperty()
  requestCount!: number;

  @ApiProperty()
  windowStart!: Date;

  @ApiProperty()
  windowEnd!: Date;
}

export class PublicApiRateLimitEvaluationEntity {
  constructor(partial: Partial<PublicApiRateLimitEvaluationEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  allowed!: boolean;

  @ApiProperty()
  remaining!: number;

  @ApiPropertyOptional({ nullable: true })
  policyId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  reason!: string | null;
}
