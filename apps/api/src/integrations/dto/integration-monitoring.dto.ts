import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IntegrationDirection,
  IntegrationExecutionStatus,
  IntegrationHealthStatus,
} from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { IntegrationOutboundQueryDto } from './integration-outbound.dto';

export class IntegrationMonitoringQueryDto extends IntegrationOutboundQueryDto {
  @ApiPropertyOptional({ enum: IntegrationDirection })
  @IsOptional()
  @IsEnum(IntegrationDirection)
  direction?: IntegrationDirection;

  @ApiPropertyOptional({ enum: IntegrationExecutionStatus })
  @IsOptional()
  @IsEnum(IntegrationExecutionStatus)
  executionStatus?: IntegrationExecutionStatus;

  @ApiPropertyOptional({ enum: IntegrationHealthStatus })
  @IsOptional()
  @IsEnum(IntegrationHealthStatus)
  healthStatus?: IntegrationHealthStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  outboundJobId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  inboundEventId?: string;
}
