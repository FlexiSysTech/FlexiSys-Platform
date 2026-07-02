import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IntegrationConnectionStatus,
  IntegrationCredentialType,
  IntegrationProviderType,
  IntegrationStatus,
} from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class IntegrationQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ enum: IntegrationProviderType })
  @IsOptional()
  @IsEnum(IntegrationProviderType)
  type?: IntegrationProviderType;

  @ApiPropertyOptional({ enum: IntegrationStatus })
  @IsOptional()
  @IsEnum(IntegrationStatus)
  status?: IntegrationStatus;

  @ApiPropertyOptional({ enum: IntegrationConnectionStatus })
  @IsOptional()
  @IsEnum(IntegrationConnectionStatus)
  connectionStatus?: IntegrationConnectionStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  providerId?: string;
}

export class CreateIntegrationProviderDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(160)
  name!: string;

  @ApiPropertyOptional({ enum: IntegrationProviderType })
  @IsOptional()
  @IsEnum(IntegrationProviderType)
  type?: IntegrationProviderType;

  @ApiPropertyOptional({ enum: IntegrationStatus })
  @IsOptional()
  @IsEnum(IntegrationStatus)
  status?: IntegrationStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({ require_tld: false })
  baseUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  config?: Record<string, unknown>;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isSystem?: boolean;
}

export class UpdateIntegrationProviderDto extends PartialType(
  CreateIntegrationProviderDto,
) {}

export class CreateIntegrationCredentialDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiProperty()
  @IsString()
  providerId!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(160)
  name!: string;

  @ApiPropertyOptional({ enum: IntegrationCredentialType })
  @IsOptional()
  @IsEnum(IntegrationCredentialType)
  type?: IntegrationCredentialType;

  @ApiPropertyOptional({
    description: 'Secret reference from an external vault or environment store.',
  })
  @IsOptional()
  @IsString()
  secretRef?: string;

  @ApiPropertyOptional({
    description: 'Masked value for display only. Raw secrets are never persisted.',
  })
  @IsOptional()
  @IsString()
  maskedSecret?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;

  @ApiPropertyOptional({ enum: IntegrationStatus })
  @IsOptional()
  @IsEnum(IntegrationStatus)
  status?: IntegrationStatus;
}

export class UpdateIntegrationCredentialDto extends PartialType(
  CreateIntegrationCredentialDto,
) {}

export class CreateIntegrationConnectionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiProperty()
  @IsString()
  providerId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  credentialId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(160)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  config?: Record<string, unknown>;
}

export class UpdateIntegrationConnectionDto extends PartialType(
  CreateIntegrationConnectionDto,
) {
  @ApiPropertyOptional({ enum: IntegrationConnectionStatus })
  @IsOptional()
  @IsEnum(IntegrationConnectionStatus)
  status?: IntegrationConnectionStatus;
}
