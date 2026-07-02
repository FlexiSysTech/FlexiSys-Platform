import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  SchedulerRecoveryAction,
  SchedulerRecoveryStatus,
} from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { SchedulerQueryDto } from './scheduler-core.dto';

export class ClaimSchedulerJobsDto {
  @ApiProperty()
  @IsString()
  workerId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  queueName?: string;

  @ApiPropertyOptional({ minimum: 1, maximum: 50 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number;
}

export class CompleteSchedulerJobDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  result?: Record<string, unknown>;
}

export class FailSchedulerJobDto {
  @ApiProperty()
  @IsString()
  error!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  retry?: boolean;
}

export class RecoverSchedulerJobDto {
  @ApiProperty({ enum: SchedulerRecoveryAction })
  @IsEnum(SchedulerRecoveryAction)
  action!: SchedulerRecoveryAction;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;
}

export class SchedulerRecoveryQueryDto extends SchedulerQueryDto {
  @ApiPropertyOptional({ enum: SchedulerRecoveryAction })
  @IsOptional()
  @IsEnum(SchedulerRecoveryAction)
  action?: SchedulerRecoveryAction;

  @ApiPropertyOptional({ enum: SchedulerRecoveryStatus })
  @IsOptional()
  @IsEnum(SchedulerRecoveryStatus)
  status?: SchedulerRecoveryStatus;
}
