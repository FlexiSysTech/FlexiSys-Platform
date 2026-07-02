import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  SchedulerRecoveryAction,
  SchedulerRecoveryStatus,
} from '@prisma/client';

import { SchedulerScheduledJobEntity } from './scheduler-core.entity';

export class SchedulerQueueClaimEntity {
  constructor(partial: Partial<SchedulerQueueClaimEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  claimed!: number;

  @ApiProperty({ type: [SchedulerScheduledJobEntity] })
  jobs!: SchedulerScheduledJobEntity[];
}

export class SchedulerFailureRecoveryEntity {
  constructor(partial: Partial<SchedulerFailureRecoveryEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  tenantId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  jobId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  historyId!: string | null;

  @ApiProperty({ enum: SchedulerRecoveryAction })
  action!: SchedulerRecoveryAction;

  @ApiProperty({ enum: SchedulerRecoveryStatus })
  status!: SchedulerRecoveryStatus;

  @ApiPropertyOptional({ nullable: true })
  reason!: string | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  appliedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  error!: string | null;

  @ApiProperty()
  createdAt!: Date;
}
