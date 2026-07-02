import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TenantPlan, TenantStatus } from '@prisma/client';

export class TenantEntity {
  constructor(partial: Partial<TenantEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  legalName!: string | null;

  @ApiProperty({ enum: TenantStatus })
  status!: TenantStatus;

  @ApiProperty({ enum: TenantPlan })
  plan!: TenantPlan;

  @ApiPropertyOptional({ nullable: true })
  primaryDomain!: string | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class TenantDomainEntity {
  constructor(partial: Partial<TenantDomainEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  tenantId!: string;

  @ApiProperty()
  domain!: string;

  @ApiProperty()
  isPrimary!: boolean;

  @ApiPropertyOptional({ type: Date, nullable: true })
  verifiedAt!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class TenantResolutionEntity {
  constructor(partial: Partial<TenantResolutionEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  tenant!: TenantEntity;

  @ApiProperty()
  resolvedBy!: string;
}
