import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TenantConfigurationStatus } from '@prisma/client';

export class TenantSettingEntity {
  constructor(partial: Partial<TenantSettingEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  tenantId!: string;

  @ApiProperty()
  key!: string;

  @ApiProperty()
  isSecret!: boolean;

  @ApiPropertyOptional({ nullable: true })
  secretRef!: string | null;

  @ApiProperty({ enum: TenantConfigurationStatus })
  status!: TenantConfigurationStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class TenantFeatureFlagEntity {
  constructor(partial: Partial<TenantFeatureFlagEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  tenantId!: string;

  @ApiProperty()
  key!: string;

  @ApiProperty()
  enabled!: boolean;

  @ApiProperty({ enum: TenantConfigurationStatus })
  status!: TenantConfigurationStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class TenantLocalizationEntity {
  constructor(partial: Partial<TenantLocalizationEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  tenantId!: string;

  @ApiProperty()
  locale!: string;

  @ApiPropertyOptional({ nullable: true })
  timezone!: string | null;

  @ApiPropertyOptional({ nullable: true })
  dateFormat!: string | null;

  @ApiPropertyOptional({ nullable: true })
  currency!: string | null;

  @ApiProperty({ enum: TenantConfigurationStatus })
  status!: TenantConfigurationStatus;

  @ApiProperty()
  createdAt!: Date;
}

export class TenantBrandingEntity {
  constructor(partial: Partial<TenantBrandingEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  tenantId!: string;

  @ApiPropertyOptional({ nullable: true })
  brandName!: string | null;

  @ApiPropertyOptional({ nullable: true })
  logoUrl!: string | null;

  @ApiPropertyOptional({ nullable: true })
  primaryColor!: string | null;

  @ApiPropertyOptional({ nullable: true })
  secondaryColor!: string | null;

  @ApiProperty({ enum: TenantConfigurationStatus })
  status!: TenantConfigurationStatus;

  @ApiProperty()
  createdAt!: Date;
}
