import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PluginInstallationStatus, PluginStatus } from '@prisma/client';

export class PluginMarketplacePackageEntity {
  constructor(partial: Partial<PluginMarketplacePackageEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiProperty()
  packageKey!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  publisher!: string | null;

  @ApiProperty({ enum: PluginStatus })
  status!: PluginStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;
}

export class PluginMarketplaceVersionEntity {
  constructor(partial: Partial<PluginMarketplaceVersionEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  packageId!: string;

  @ApiPropertyOptional({ nullable: true })
  manifestId!: string | null;

  @ApiProperty()
  version!: string;

  @ApiProperty({ enum: PluginStatus })
  status!: PluginStatus;
}

export class PluginInstallationEntity {
  constructor(partial: Partial<PluginInstallationEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiProperty()
  packageVersionId!: string;

  @ApiPropertyOptional({ nullable: true })
  registryEntryId!: string | null;

  @ApiProperty({ enum: PluginInstallationStatus })
  status!: PluginInstallationStatus;

  @ApiProperty()
  installedAt!: Date;

  @ApiPropertyOptional({ type: Date, nullable: true })
  enabledAt!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  disabledAt!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  uninstalledAt!: Date | null;
}
