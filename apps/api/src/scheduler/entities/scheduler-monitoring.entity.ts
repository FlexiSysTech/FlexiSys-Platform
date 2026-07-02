import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SchedulerDashboardEntity {
  constructor(partial: Partial<SchedulerDashboardEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  activeCrons!: number;

  @ApiProperty()
  pausedCrons!: number;

  @ApiProperty()
  pendingJobs!: number;

  @ApiProperty()
  runningJobs!: number;

  @ApiProperty()
  retryScheduledJobs!: number;

  @ApiProperty()
  deadLetterJobs!: number;

  @ApiProperty()
  dueJobs!: number;

  @ApiProperty()
  completedToday!: number;

  @ApiProperty()
  failedToday!: number;

  @ApiProperty()
  openRecoveries!: number;
}

export class SchedulerQueueStatusEntity {
  constructor(partial: Partial<SchedulerQueueStatusEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  queueName!: string;

  @ApiProperty()
  pending!: number;

  @ApiProperty()
  running!: number;

  @ApiProperty()
  retryScheduled!: number;

  @ApiProperty()
  deadLetter!: number;

  @ApiProperty()
  due!: number;
}

export class SchedulerFailureReportEntity {
  constructor(partial: Partial<SchedulerFailureReportEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  failedJobs!: number;

  @ApiProperty()
  deadLetterJobs!: number;

  @ApiProperty()
  openRecoveries!: number;

  @ApiPropertyOptional({ type: Object })
  recentFailures!: Record<string, unknown>[];
}

export class SchedulerSystemStatusEntity {
  constructor(partial: Partial<SchedulerSystemStatusEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  healthy!: boolean;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  monitoredAt!: Date;

  @ApiProperty()
  dueJobs!: number;

  @ApiProperty()
  runningJobs!: number;

  @ApiProperty()
  deadLetterJobs!: number;
}
