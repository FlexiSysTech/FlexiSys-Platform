import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  AiFeatureArea,
  AiProviderStatus,
  AiProviderType,
  AiRequestStatus,
} from '@prisma/client';

export class AiProviderConfigEntity {
  constructor(partial: Partial<AiProviderConfigEntity>) {
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

  @ApiProperty({ enum: AiProviderType })
  type!: AiProviderType;

  @ApiProperty({ enum: AiProviderStatus })
  status!: AiProviderStatus;

  @ApiPropertyOptional({ nullable: true })
  model!: string | null;

  @ApiPropertyOptional({ nullable: true })
  endpoint!: string | null;

  @ApiProperty()
  isDefault!: boolean;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class AiRequestLogEntity {
  constructor(partial: Partial<AiRequestLogEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  providerId!: string | null;

  @ApiProperty({ enum: AiFeatureArea })
  feature!: AiFeatureArea;

  @ApiProperty()
  operation!: string;

  @ApiProperty({ enum: AiRequestStatus })
  status!: AiRequestStatus;

  @ApiPropertyOptional({ nullable: true })
  responseText!: string | null;

  @ApiProperty()
  promptTokens!: number;

  @ApiProperty()
  completionTokens!: number;

  @ApiProperty()
  totalTokens!: number;

  @ApiProperty()
  costAmount!: unknown;

  @ApiProperty()
  currency!: string;

  @ApiPropertyOptional({ nullable: true })
  requestedById!: string | null;

  @ApiProperty()
  startedAt!: Date;

  @ApiPropertyOptional({ type: Date, nullable: true })
  completedAt!: Date | null;
}

export class AiUsageRecordEntity {
  constructor(partial: Partial<AiUsageRecordEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  requestLogId!: string | null;

  @ApiProperty({ enum: AiFeatureArea })
  feature!: AiFeatureArea;

  @ApiProperty()
  operation!: string;

  @ApiProperty()
  totalTokens!: number;

  @ApiProperty()
  costAmount!: unknown;

  @ApiProperty()
  currency!: string;

  @ApiPropertyOptional({ nullable: true })
  usedById!: string | null;

  @ApiProperty()
  usedAt!: Date;
}
