import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IntegrationInboundStatus } from '@prisma/client';
import { IsEnum, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

import { IntegrationOutboundQueryDto } from './integration-outbound.dto';

export class IntegrationInboundQueryDto extends IntegrationOutboundQueryDto {
  @ApiPropertyOptional({ enum: IntegrationInboundStatus })
  @IsOptional()
  @IsEnum(IntegrationInboundStatus)
  inboundStatus?: IntegrationInboundStatus;
}

export class ReceiveIntegrationWebhookDto {
  @ApiProperty()
  @IsString()
  @MaxLength(160)
  eventType!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  signature?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  headers?: Record<string, unknown>;

  @ApiProperty()
  @IsObject()
  payload!: Record<string, unknown>;
}
