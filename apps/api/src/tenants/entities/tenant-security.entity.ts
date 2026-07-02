import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TenantConfigurationStatus } from '@prisma/client';

export class TenantPermissionPolicyEntity {
  constructor(partial: Partial<TenantPermissionPolicyEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  tenantId!: string;

  @ApiProperty()
  permissionCode!: string;

  @ApiProperty()
  allowed!: boolean;

  @ApiProperty({ enum: TenantConfigurationStatus })
  status!: TenantConfigurationStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;
}

export class TenantAuditEventEntity {
  constructor(partial: Partial<TenantAuditEventEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  tenantId!: string;

  @ApiProperty()
  action!: string;

  @ApiProperty()
  entity!: string;

  @ApiPropertyOptional({ nullable: true })
  entityId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  actorId!: string | null;

  @ApiProperty()
  createdAt!: Date;
}

export class TenantSecurityValidationEntity {
  constructor(partial: Partial<TenantSecurityValidationEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  allowed!: boolean;

  @ApiProperty()
  tenantId!: string;

  @ApiPropertyOptional({ nullable: true })
  permissionCode!: string | null;

  @ApiPropertyOptional({ nullable: true })
  reason!: string | null;
}
