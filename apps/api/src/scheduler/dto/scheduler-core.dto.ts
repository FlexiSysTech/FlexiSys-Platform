import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  SchedulerJobStatus,
  SchedulerPriority,
  SchedulerRetryStrategy,
  SchedulerRunStatus,
  SchedulerTaskType,
} from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class SchedulerQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  queueName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  taskName?: string;

  @ApiPropertyOptional({ enum: SchedulerRunStatus })
  @IsOptional()
  @IsEnum(SchedulerRunStatus)
  runStatus?: SchedulerRunStatus;

  @ApiPropertyOptional({ enum: SchedulerJobStatus })
  @IsOptional()
  @IsEnum(SchedulerJobStatus)
  jobStatus?: SchedulerJobStatus;
}

export class CreateCronRegistryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(180)
  name!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(180)
  taskName!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  cronExpression!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  queueName?: string;

  @ApiPropertyOptional({ enum: SchedulerPriority })
  @IsOptional()
  @IsEnum(SchedulerPriority)
  priority?: SchedulerPriority;

  @ApiPropertyOptional({ enum: SchedulerJobStatus })
  @IsOptional()
  @IsEnum(SchedulerJobStatus)
  status?: SchedulerJobStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  nextRunAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  maxRetries?: number;

  @ApiPropertyOptional({ enum: SchedulerRetryStrategy })
  @IsOptional()
  @IsEnum(SchedulerRetryStrategy)
  retryStrategy?: SchedulerRetryStrategy;

  @ApiPropertyOptional({ minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  retryDelaySeconds?: number;

  @ApiPropertyOptional({ minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  timeoutSeconds?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdateCronRegistryDto extends PartialType(CreateCronRegistryDto) {}

export class ScheduleJobDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cronId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  jobKey?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(180)
  taskName!: string;

  @ApiPropertyOptional({ enum: SchedulerTaskType })
  @IsOptional()
  @IsEnum(SchedulerTaskType)
  taskType?: SchedulerTaskType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  queueName?: string;

  @ApiPropertyOptional({ enum: SchedulerPriority })
  @IsOptional()
  @IsEnum(SchedulerPriority)
  priority?: SchedulerPriority;

  @ApiProperty()
  @IsDateString()
  runAt!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;

  @ApiPropertyOptional({ minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxAttempts?: number;

  @ApiPropertyOptional({ enum: SchedulerRetryStrategy })
  @IsOptional()
  @IsEnum(SchedulerRetryStrategy)
  retryStrategy?: SchedulerRetryStrategy;

  @ApiPropertyOptional({ minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  retryDelaySeconds?: number;

  @ApiPropertyOptional({ minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  timeoutSeconds?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdateScheduledJobDto extends PartialType(ScheduleJobDto) {
  @ApiPropertyOptional({ enum: SchedulerRunStatus })
  @IsOptional()
  @IsEnum(SchedulerRunStatus)
  status?: SchedulerRunStatus;
}
