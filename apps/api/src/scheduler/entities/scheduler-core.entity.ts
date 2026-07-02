import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  SchedulerJobStatus,
  SchedulerPriority,
  SchedulerRetryStrategy,
  SchedulerRunStatus,
  SchedulerTaskType,
} from '@prisma/client';

export class SchedulerCronRegistryEntity {
  constructor(partial: Partial<SchedulerCronRegistryEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  tenantId!: string | null;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  taskName!: string;

  @ApiProperty()
  cronExpression!: string;

  @ApiProperty()
  timezone!: string;

  @ApiProperty({ enum: SchedulerJobStatus })
  status!: SchedulerJobStatus;

  @ApiProperty({ enum: SchedulerPriority })
  priority!: SchedulerPriority;

  @ApiPropertyOptional({ type: Date, nullable: true })
  nextRunAt!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  lastRunAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;
}

export class SchedulerScheduledJobEntity {
  constructor(partial: Partial<SchedulerScheduledJobEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  tenantId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  cronId!: string | null;

  @ApiProperty()
  jobKey!: string;

  @ApiProperty()
  taskName!: string;

  @ApiProperty({ enum: SchedulerTaskType })
  taskType!: SchedulerTaskType;

  @ApiProperty()
  queueName!: string;

  @ApiProperty({ enum: SchedulerRunStatus })
  status!: SchedulerRunStatus;

  @ApiProperty({ enum: SchedulerRetryStrategy })
  retryStrategy!: SchedulerRetryStrategy;

  @ApiProperty()
  attempts!: number;

  @ApiProperty()
  maxAttempts!: number;

  @ApiProperty()
  runAt!: Date;

  @ApiPropertyOptional({ type: Date, nullable: true })
  nextAttemptAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;
}

export class SchedulerJobHistoryEntity {
  constructor(partial: Partial<SchedulerJobHistoryEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  runId!: string;

  @ApiPropertyOptional({ nullable: true })
  tenantId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  jobId!: string | null;

  @ApiProperty()
  taskName!: string;

  @ApiProperty({ enum: SchedulerRunStatus })
  status!: SchedulerRunStatus;

  @ApiProperty()
  attempt!: number;

  @ApiPropertyOptional({ type: Date, nullable: true })
  startedAt!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  finishedAt!: Date | null;
}
