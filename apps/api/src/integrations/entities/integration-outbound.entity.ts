import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IntegrationHttpMethod,
  IntegrationOutboundStatus,
  IntegrationStatus,
} from '@prisma/client';

export class IntegrationRetryPolicyEntity {
  constructor(partial: Partial<IntegrationRetryPolicyEntity>) {
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

  @ApiProperty()
  maxAttempts!: number;

  @ApiProperty()
  backoffSeconds!: number;

  @ApiProperty()
  backoffMultiplier!: number;

  @ApiProperty({ enum: IntegrationStatus })
  status!: IntegrationStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class IntegrationWebhookEntity {
  constructor(partial: Partial<IntegrationWebhookEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiProperty()
  providerId!: string;

  @ApiPropertyOptional({ nullable: true })
  retryPolicyId!: string | null;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  eventType!: string;

  @ApiProperty()
  targetUrl!: string;

  @ApiProperty({ enum: IntegrationHttpMethod })
  httpMethod!: IntegrationHttpMethod;

  @ApiProperty({ enum: IntegrationStatus })
  status!: IntegrationStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class IntegrationRestConnectorEntity {
  constructor(partial: Partial<IntegrationRestConnectorEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiProperty()
  connectionId!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  endpointPath!: string;

  @ApiProperty({ enum: IntegrationHttpMethod })
  httpMethod!: IntegrationHttpMethod;

  @ApiProperty({ enum: IntegrationStatus })
  status!: IntegrationStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class IntegrationOutboundJobEntity {
  constructor(partial: Partial<IntegrationOutboundJobEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  connectionId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  webhookId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  restConnectorId!: string | null;

  @ApiProperty()
  eventType!: string;

  @ApiProperty()
  targetUrl!: string;

  @ApiProperty({ enum: IntegrationHttpMethod })
  httpMethod!: IntegrationHttpMethod;

  @ApiProperty({ enum: IntegrationOutboundStatus })
  status!: IntegrationOutboundStatus;

  @ApiProperty()
  attempts!: number;

  @ApiProperty()
  maxAttempts!: number;

  @ApiPropertyOptional({ type: Date, nullable: true })
  nextAttemptAt!: Date | null;

  @ApiProperty()
  queuedAt!: Date;

  @ApiPropertyOptional({ type: Date, nullable: true })
  processedAt!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deliveredAt!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  failedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  error!: string | null;
}
