import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IntegrationDirection,
  IntegrationExecutionStatus,
  IntegrationHealthStatus,
  IntegrationOutboundStatus,
} from '@prisma/client';

export class IntegrationExecutionHistoryEntity {
  constructor(partial: Partial<IntegrationExecutionHistoryEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  connectionId!: string | null;

  @ApiProperty({ enum: IntegrationDirection })
  direction!: IntegrationDirection;

  @ApiProperty()
  operation!: string;

  @ApiProperty({ enum: IntegrationExecutionStatus })
  status!: IntegrationExecutionStatus;

  @ApiPropertyOptional({ nullable: true })
  error!: string | null;

  @ApiProperty()
  startedAt!: Date;

  @ApiPropertyOptional({ type: Date, nullable: true })
  completedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  durationMs!: number | null;
}

export class IntegrationRetryHistoryEntity {
  constructor(partial: Partial<IntegrationRetryHistoryEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  outboundJobId!: string;

  @ApiProperty()
  attemptNumber!: number;

  @ApiProperty({ enum: IntegrationOutboundStatus })
  status!: IntegrationOutboundStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  scheduledAt!: Date | null;

  @ApiProperty()
  attemptedAt!: Date;

  @ApiPropertyOptional({ nullable: true })
  error!: string | null;
}

export class IntegrationHealthSnapshotEntity {
  constructor(partial: Partial<IntegrationHealthSnapshotEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  connectionId!: string | null;

  @ApiProperty({ enum: IntegrationHealthStatus })
  status!: IntegrationHealthStatus;

  @ApiPropertyOptional({ nullable: true })
  latencyMs!: number | null;

  @ApiPropertyOptional({ nullable: true })
  error!: string | null;

  @ApiProperty()
  checkedAt!: Date;
}
