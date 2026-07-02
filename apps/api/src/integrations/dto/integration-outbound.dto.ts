import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IntegrationHttpMethod,
  IntegrationOutboundStatus,
  IntegrationStatus,
} from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { IntegrationQueryDto } from './integration-core.dto';

export class IntegrationOutboundQueryDto extends IntegrationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  eventType?: string;

  @ApiPropertyOptional({ enum: IntegrationOutboundStatus })
  @IsOptional()
  @IsEnum(IntegrationOutboundStatus)
  outboundStatus?: IntegrationOutboundStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  connectionId?: string;
}

export class CreateIntegrationRetryPolicyDto {
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

  @ApiPropertyOptional({ default: 3, minimum: 1, maximum: 20 })
  @IsOptional()
  @Transform(({ value }) => Number(value ?? 3))
  @IsInt()
  @Min(1)
  @Max(20)
  maxAttempts?: number;

  @ApiPropertyOptional({ default: 60, minimum: 1 })
  @IsOptional()
  @Transform(({ value }) => Number(value ?? 60))
  @IsInt()
  @Min(1)
  backoffSeconds?: number;

  @ApiPropertyOptional({ default: 2, minimum: 1, maximum: 10 })
  @IsOptional()
  @Transform(({ value }) => Number(value ?? 2))
  @IsInt()
  @Min(1)
  @Max(10)
  backoffMultiplier?: number;

  @ApiPropertyOptional({ enum: IntegrationStatus })
  @IsOptional()
  @IsEnum(IntegrationStatus)
  status?: IntegrationStatus;
}

export class UpdateIntegrationRetryPolicyDto extends PartialType(
  CreateIntegrationRetryPolicyDto,
) {}

export class CreateIntegrationWebhookDto {
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
  retryPolicyId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(160)
  name!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  eventType!: string;

  @ApiProperty()
  @IsUrl({ require_tld: false })
  targetUrl!: string;

  @ApiPropertyOptional({ enum: IntegrationHttpMethod })
  @IsOptional()
  @IsEnum(IntegrationHttpMethod)
  httpMethod?: IntegrationHttpMethod;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  headers?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payloadTemplate?: Record<string, unknown>;

  @ApiPropertyOptional({ enum: IntegrationStatus })
  @IsOptional()
  @IsEnum(IntegrationStatus)
  status?: IntegrationStatus;
}

export class UpdateIntegrationWebhookDto extends PartialType(
  CreateIntegrationWebhookDto,
) {}

export class CreateIntegrationRestConnectorDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiProperty()
  @IsString()
  connectionId!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(160)
  name!: string;

  @ApiProperty()
  @IsString()
  endpointPath!: string;

  @ApiPropertyOptional({ enum: IntegrationHttpMethod })
  @IsOptional()
  @IsEnum(IntegrationHttpMethod)
  httpMethod?: IntegrationHttpMethod;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  requestTemplate?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  responseMapping?: Record<string, unknown>;

  @ApiPropertyOptional({ enum: IntegrationStatus })
  @IsOptional()
  @IsEnum(IntegrationStatus)
  status?: IntegrationStatus;
}

export class UpdateIntegrationRestConnectorDto extends PartialType(
  CreateIntegrationRestConnectorDto,
) {}

export class EnqueueIntegrationOutboundJobDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiProperty()
  @IsString()
  eventType!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  webhookId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  restConnectorId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  connectionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  retryPolicyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({ require_tld: false })
  targetUrl?: string;

  @ApiPropertyOptional({ enum: IntegrationHttpMethod })
  @IsOptional()
  @IsEnum(IntegrationHttpMethod)
  httpMethod?: IntegrationHttpMethod;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  headers?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;
}
