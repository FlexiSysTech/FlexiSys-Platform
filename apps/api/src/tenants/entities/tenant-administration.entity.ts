import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  TenantConfigurationStatus,
  TenantProvisioningAction,
  TenantProvisioningStatus,
  TenantUsagePeriod,
} from '@prisma/client';

export class TenantUsageLimitEntity {
  constructor(partial: Partial<TenantUsageLimitEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  tenantId!: string;

  @ApiProperty()
  key!: string;

  @ApiProperty()
  limitValue!: number;

  @ApiProperty()
  currentValue!: number;

  @ApiProperty({ enum: TenantUsagePeriod })
  period!: TenantUsagePeriod;

  @ApiProperty({ enum: TenantConfigurationStatus })
  status!: TenantConfigurationStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;
}

export class TenantProvisioningEventEntity {
  constructor(partial: Partial<TenantProvisioningEventEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  tenantId!: string;

  @ApiProperty({ enum: TenantProvisioningAction })
  action!: TenantProvisioningAction;

  @ApiProperty({ enum: TenantProvisioningStatus })
  status!: TenantProvisioningStatus;

  @ApiPropertyOptional({ nullable: true })
  reason!: string | null;

  @ApiPropertyOptional({ nullable: true })
  actorId!: string | null;

  @ApiProperty()
  createdAt!: Date;
}
