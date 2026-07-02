import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IntegrationConnectionStatus,
  IntegrationCredentialType,
  IntegrationProviderType,
  IntegrationStatus,
} from '@prisma/client';

export class IntegrationProviderEntity {
  constructor(partial: Partial<IntegrationProviderEntity>) {
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

  @ApiProperty({ enum: IntegrationProviderType })
  type!: IntegrationProviderType;

  @ApiProperty({ enum: IntegrationStatus })
  status!: IntegrationStatus;

  @ApiPropertyOptional({ nullable: true })
  baseUrl!: string | null;

  @ApiProperty()
  isSystem!: boolean;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class IntegrationCredentialEntity {
  constructor(partial: Partial<IntegrationCredentialEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiProperty()
  providerId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ enum: IntegrationCredentialType })
  type!: IntegrationCredentialType;

  @ApiPropertyOptional({ nullable: true })
  maskedSecret!: string | null;

  @ApiPropertyOptional({ nullable: true })
  secretRef!: string | null;

  @ApiProperty({ enum: IntegrationStatus })
  status!: IntegrationStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class IntegrationConnectionEntity {
  constructor(partial: Partial<IntegrationConnectionEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiProperty()
  providerId!: string;

  @ApiPropertyOptional({ nullable: true })
  credentialId!: string | null;

  @ApiProperty()
  name!: string;

  @ApiProperty({ enum: IntegrationConnectionStatus })
  status!: IntegrationConnectionStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  lastTestedAt!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  lastConnectedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  lastError!: string | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class IntegrationLifecycleResultEntity {
  constructor(partial: Partial<IntegrationLifecycleResultEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  success!: boolean;

  @ApiProperty({ enum: IntegrationConnectionStatus })
  status!: IntegrationConnectionStatus;

  @ApiPropertyOptional({ nullable: true })
  message?: string | null;
}
