import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  SchedulerJobStatus,
  SchedulerRecoveryAction,
  SchedulerRunStatus,
  SchedulerTaskType,
} from '@prisma/client';
import { randomUUID } from 'crypto';

import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { StatusTransitionService } from '../platform/status-transitions';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCronRegistryDto,
  ScheduleJobDto,
  SchedulerQueryDto,
  UpdateCronRegistryDto,
  UpdateScheduledJobDto,
} from './dto/scheduler-core.dto';
import { SchedulerMonitoringQueryDto } from './dto/scheduler-monitoring.dto';
import {
  ClaimSchedulerJobsDto,
  CompleteSchedulerJobDto,
  FailSchedulerJobDto,
  RecoverSchedulerJobDto,
  SchedulerRecoveryQueryDto,
} from './dto/scheduler-retry.dto';
import {
  SchedulerCronRegistryEntity,
  SchedulerJobHistoryEntity,
  SchedulerScheduledJobEntity,
} from './entities/scheduler-core.entity';
import {
  SchedulerDashboardEntity,
  SchedulerFailureReportEntity,
  SchedulerQueueStatusEntity,
  SchedulerSystemStatusEntity,
} from './entities/scheduler-monitoring.entity';
import {
  SchedulerFailureRecoveryEntity,
  SchedulerQueueClaimEntity,
} from './entities/scheduler-retry.entity';

@Injectable()
export class SchedulerService {
  private readonly cronStatusRules = [
    { from: 'ACTIVE' as SchedulerJobStatus, to: ['PAUSED', 'ARCHIVED'] as SchedulerJobStatus[] },
    { from: 'PAUSED' as SchedulerJobStatus, to: ['ACTIVE', 'ARCHIVED'] as SchedulerJobStatus[] },
  ];

  private readonly jobStatusRules = [
    { from: 'PENDING' as SchedulerRunStatus, to: ['QUEUED', 'RUNNING', 'CANCELLED'] as SchedulerRunStatus[] },
    { from: 'QUEUED' as SchedulerRunStatus, to: ['RUNNING', 'CANCELLED'] as SchedulerRunStatus[] },
    { from: 'RUNNING' as SchedulerRunStatus, to: ['SUCCEEDED', 'FAILED', 'RETRY_SCHEDULED', 'CANCELLED', 'DEAD_LETTER'] as SchedulerRunStatus[] },
    { from: 'FAILED' as SchedulerRunStatus, to: ['RETRY_SCHEDULED', 'DEAD_LETTER'] as SchedulerRunStatus[] },
    { from: 'DEAD_LETTER' as SchedulerRunStatus, to: ['RETRY_SCHEDULED'] as SchedulerRunStatus[] },
    { from: 'RETRY_SCHEDULED' as SchedulerRunStatus, to: ['QUEUED', 'RUNNING', 'CANCELLED'] as SchedulerRunStatus[] },
  ];

  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
    private readonly pagination: PaginationService,
    private readonly audit: AuditService,
    private readonly softDelete: SoftDeleteService,
    private readonly transitions: StatusTransitionService,
  ) {}

  async findCrons(query: SchedulerQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.SchedulerCronRegistryWhereInput =
      this.softDelete.activeWhere({
        ...(tenantId ? { tenantId } : {}),
        ...(query.queueName ? { queueName: query.queueName } : {}),
        ...(query.taskName ? { taskName: query.taskName } : {}),
        ...(query.jobStatus ? { status: query.jobStatus } : {}),
        ...(normalized.search
          ? {
              OR: [
                { code: { contains: normalized.search, mode: 'insensitive' } },
                { name: { contains: normalized.search, mode: 'insensitive' } },
                { taskName: { contains: normalized.search, mode: 'insensitive' } },
              ],
            }
          : {}),
      });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.schedulerCronRegistry.findMany({
        where,
        orderBy: [{ queueName: 'asc' }, { code: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.schedulerCronRegistry.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new SchedulerCronRegistryEntity(item)),
      total,
      query,
    );
  }

  async createCron(dto: CreateCronRegistryDto) {
    const tenantId = await this.resolveTenantId(dto.tenantId);
    this.validateCronExpression(dto.cronExpression);
    await this.ensureCronUnique(tenantId, dto.code);
    const cron = await this.prisma.schedulerCronRegistry.create({
      data: {
        tenantId,
        code: dto.code,
        name: dto.name,
        taskName: dto.taskName,
        cronExpression: dto.cronExpression,
        timezone: dto.timezone ?? 'UTC',
        queueName: dto.queueName ?? 'default',
        priority: dto.priority ?? 'NORMAL',
        status: dto.status ?? 'ACTIVE',
        payload: this.toJson(dto.payload),
        nextRunAt: dto.nextRunAt ? new Date(dto.nextRunAt) : undefined,
        maxRetries: dto.maxRetries ?? 3,
        retryStrategy: dto.retryStrategy ?? 'FIXED',
        retryDelaySeconds: dto.retryDelaySeconds ?? 60,
        timeoutSeconds: dto.timeoutSeconds ?? 300,
        metadata: this.toJson(dto.metadata),
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'SCHEDULER_CRON_CREATE',
      entity: 'SchedulerCronRegistry',
      entityId: cron.id,
      payload: { tenantId, code: cron.code, taskName: cron.taskName },
    });
    return new SchedulerCronRegistryEntity(cron);
  }

  async updateCron(id: string, dto: UpdateCronRegistryDto) {
    const current = await this.ensureCronExists(id);
    const tenantId =
      dto.tenantId === undefined
        ? current.tenantId
        : await this.resolveTenantId(dto.tenantId);
    if (dto.code || dto.tenantId !== undefined) {
      await this.ensureCronUnique(tenantId, dto.code ?? current.code, id);
    }
    if (dto.cronExpression) this.validateCronExpression(dto.cronExpression);
    if (dto.status && dto.status !== current.status) {
      this.transitions.assertTransition({
        entity: 'SchedulerCronRegistry',
        currentStatus: current.status,
        nextStatus: dto.status,
        rules: this.cronStatusRules,
      });
    }
    const cron = await this.prisma.schedulerCronRegistry.update({
      where: { id },
      data: {
        tenantId,
        code: dto.code,
        name: dto.name,
        taskName: dto.taskName,
        cronExpression: dto.cronExpression,
        timezone: dto.timezone,
        queueName: dto.queueName,
        priority: dto.priority,
        status: dto.status,
        payload: dto.payload === undefined ? undefined : this.toJson(dto.payload),
        nextRunAt: dto.nextRunAt ? new Date(dto.nextRunAt) : undefined,
        maxRetries: dto.maxRetries,
        retryStrategy: dto.retryStrategy,
        retryDelaySeconds: dto.retryDelaySeconds,
        timeoutSeconds: dto.timeoutSeconds,
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'SCHEDULER_CRON_UPDATE',
      entity: 'SchedulerCronRegistry',
      entityId: cron.id,
      payload: { before: current, after: cron } as Prisma.InputJsonObject,
    });
    return new SchedulerCronRegistryEntity(cron);
  }

  async removeCron(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.schedulerCronRegistry as never,
      id,
    );
    await this.audit.record({
      action: 'SCHEDULER_CRON_DELETE',
      entity: 'SchedulerCronRegistry',
      entityId: id,
      payload: { deleted: true },
    });
    return {
      success: true,
      deletedCron: new SchedulerCronRegistryEntity(
        result.record as Partial<SchedulerCronRegistryEntity>,
      ),
    };
  }

  async findJobs(query: SchedulerQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.SchedulerScheduledJobWhereInput =
      this.softDelete.activeWhere({
        ...(tenantId ? { tenantId } : {}),
        ...(query.queueName ? { queueName: query.queueName } : {}),
        ...(query.taskName ? { taskName: query.taskName } : {}),
        ...(query.runStatus ? { status: query.runStatus } : {}),
      });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.schedulerScheduledJob.findMany({
        where,
        orderBy: [{ runAt: 'asc' }, { priority: 'desc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.schedulerScheduledJob.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new SchedulerScheduledJobEntity(item)),
      total,
      query,
    );
  }

  async scheduleJob(dto: ScheduleJobDto) {
    const tenantId = await this.resolveTenantId(dto.tenantId);
    const cron = dto.cronId ? await this.ensureCronExists(dto.cronId) : null;
    const jobKey = dto.jobKey ?? `job_${randomUUID()}`;
    await this.ensureJobKeyUnique(jobKey);
    const job = await this.prisma.schedulerScheduledJob.create({
      data: {
        tenantId: tenantId ?? cron?.tenantId,
        cronId: dto.cronId,
        jobKey,
        taskName: dto.taskName,
        taskType: dto.taskType ?? (dto.cronId ? 'CRON' : 'BACKGROUND'),
        queueName: dto.queueName ?? cron?.queueName ?? 'default',
        priority: dto.priority ?? cron?.priority ?? 'NORMAL',
        runAt: new Date(dto.runAt),
        payload: this.toJson(dto.payload),
        maxAttempts: dto.maxAttempts ?? (cron?.maxRetries ? cron.maxRetries + 1 : 3),
        retryStrategy: dto.retryStrategy ?? cron?.retryStrategy ?? 'FIXED',
        retryDelaySeconds: dto.retryDelaySeconds ?? cron?.retryDelaySeconds ?? 60,
        timeoutSeconds: dto.timeoutSeconds ?? cron?.timeoutSeconds ?? 300,
        metadata: this.toJson(dto.metadata),
        createdById: this.context.getUserId(),
      },
    });
    await this.recordHistory(job, 'PENDING');
    await this.audit.record({
      action: 'SCHEDULER_JOB_SCHEDULE',
      entity: 'SchedulerScheduledJob',
      entityId: job.id,
      payload: { tenantId: job.tenantId, taskName: job.taskName, runAt: job.runAt },
    });
    return new SchedulerScheduledJobEntity(job);
  }

  async updateJob(id: string, dto: UpdateScheduledJobDto) {
    const current = await this.ensureJobExists(id);
    if (dto.status && dto.status !== current.status) {
      this.transitions.assertTransition({
        entity: 'SchedulerScheduledJob',
        currentStatus: current.status,
        nextStatus: dto.status,
        rules: this.jobStatusRules,
      });
    }
    const job = await this.prisma.schedulerScheduledJob.update({
      where: { id },
      data: {
        taskName: dto.taskName,
        taskType: dto.taskType,
        queueName: dto.queueName,
        priority: dto.priority,
        runAt: dto.runAt ? new Date(dto.runAt) : undefined,
        payload: dto.payload === undefined ? undefined : this.toJson(dto.payload),
        maxAttempts: dto.maxAttempts,
        retryStrategy: dto.retryStrategy,
        retryDelaySeconds: dto.retryDelaySeconds,
        timeoutSeconds: dto.timeoutSeconds,
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        status: dto.status,
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'SCHEDULER_JOB_UPDATE',
      entity: 'SchedulerScheduledJob',
      entityId: job.id,
      payload: { before: current, after: job } as Prisma.InputJsonObject,
    });
    return new SchedulerScheduledJobEntity(job);
  }

  async cancelJob(id: string) {
    const current = await this.ensureJobExists(id);
    if (['SUCCEEDED', 'CANCELLED', 'DEAD_LETTER'].includes(current.status)) {
      throw new BadRequestException('Completed scheduler jobs cannot be cancelled');
    }
    const job = await this.prisma.schedulerScheduledJob.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        updatedById: this.context.getUserId(),
      },
    });
    await this.recordHistory(job, 'CANCELLED');
    await this.audit.record({
      action: 'SCHEDULER_JOB_CANCEL',
      entity: 'SchedulerScheduledJob',
      entityId: id,
      payload: { jobKey: job.jobKey },
    });
    return new SchedulerScheduledJobEntity(job);
  }

  async findHistory(query: SchedulerQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.SchedulerJobHistoryWhereInput = {
      ...(tenantId ? { tenantId } : {}),
      ...(query.queueName ? { queueName: query.queueName } : {}),
      ...(query.taskName ? { taskName: query.taskName } : {}),
      ...(query.runStatus ? { status: query.runStatus } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.schedulerJobHistory.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.schedulerJobHistory.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new SchedulerJobHistoryEntity(item)),
      total,
      query,
    );
  }

  async claimDueJobs(dto: ClaimSchedulerJobsDto) {
    const tenantId = await this.resolveTenantId(dto.tenantId);
    const now = new Date();
    const limit = dto.limit ?? 10;
    const jobs = await this.prisma.$transaction(async (tx) => {
      const dueJobs = await tx.schedulerScheduledJob.findMany({
        where: this.softDelete.activeWhere({
          ...(tenantId ? { tenantId } : {}),
          ...(dto.queueName ? { queueName: dto.queueName } : {}),
          status: { in: ['PENDING', 'QUEUED', 'RETRY_SCHEDULED'] },
          runAt: { lte: now },
          OR: [{ nextAttemptAt: null }, { nextAttemptAt: { lte: now } }],
        }),
        orderBy: [{ priority: 'desc' }, { runAt: 'asc' }],
        take: limit,
      });

      const claimed: SchedulerScheduledJobEntity[] = [];
      for (const job of dueJobs) {
        const updated = await tx.schedulerScheduledJob.update({
          where: { id: job.id },
          data: {
            status: 'RUNNING',
            lockedAt: now,
            lockedBy: dto.workerId,
            attempts: { increment: 1 },
            updatedById: this.context.getUserId(),
          },
        });
        await tx.schedulerJobHistory.create({
          data: this.buildHistoryData(updated, 'RUNNING'),
        });
        claimed.push(new SchedulerScheduledJobEntity(updated));
      }

      return claimed;
    });

    await this.audit.record({
      action: 'SCHEDULER_QUEUE_CLAIM',
      entity: 'SchedulerScheduledJob',
      entityId: dto.workerId,
      payload: {
        tenantId,
        queueName: dto.queueName ?? 'all',
        claimed: jobs.length,
      },
    });

    return new SchedulerQueueClaimEntity({ claimed: jobs.length, jobs });
  }

  async completeJob(id: string, dto: CompleteSchedulerJobDto) {
    const current = await this.ensureJobExists(id);
    this.transitions.assertTransition({
      entity: 'SchedulerScheduledJob',
      currentStatus: current.status,
      nextStatus: 'SUCCEEDED',
      rules: this.jobStatusRules,
    });

    const job = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.schedulerScheduledJob.update({
        where: { id },
        data: {
          status: 'SUCCEEDED',
          completedAt: new Date(),
          lockedAt: null,
          lockedBy: null,
          error: null,
          metadata: dto.result === undefined ? undefined : this.toJson(dto.result),
          updatedById: this.context.getUserId(),
        },
      });
      await tx.schedulerJobHistory.create({
        data: this.buildHistoryData(updated, 'SUCCEEDED'),
      });
      return updated;
    });

    await this.audit.record({
      action: 'SCHEDULER_JOB_COMPLETE',
      entity: 'SchedulerScheduledJob',
      entityId: id,
      payload: { jobKey: job.jobKey, taskName: job.taskName },
    });

    return new SchedulerScheduledJobEntity(job);
  }

  async failJob(id: string, dto: FailSchedulerJobDto) {
    const current = await this.ensureJobExists(id);
    const canRetry =
      dto.retry !== false &&
      current.retryStrategy !== 'NONE' &&
      current.attempts < current.maxAttempts;
    const nextStatus: SchedulerRunStatus = canRetry ? 'RETRY_SCHEDULED' : 'DEAD_LETTER';
    this.transitions.assertTransition({
      entity: 'SchedulerScheduledJob',
      currentStatus: current.status,
      nextStatus,
      rules: this.jobStatusRules,
    });
    const nextAttemptAt = canRetry ? this.calculateNextAttempt(current) : null;

    const job = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.schedulerScheduledJob.update({
        where: { id },
        data: {
          status: nextStatus,
          nextAttemptAt,
          failedAt: new Date(),
          lockedAt: null,
          lockedBy: null,
          error: dto.error,
          updatedById: this.context.getUserId(),
        },
      });
      await tx.schedulerJobHistory.create({
        data: this.buildHistoryData(updated, nextStatus, dto.error),
      });
      return updated;
    });

    await this.audit.record({
      action: 'SCHEDULER_JOB_FAIL',
      entity: 'SchedulerScheduledJob',
      entityId: id,
      payload: {
        jobKey: job.jobKey,
        status: job.status,
        retryScheduled: canRetry,
        nextAttemptAt,
      },
    });

    return new SchedulerScheduledJobEntity(job);
  }

  async retryJob(id: string) {
    const current = await this.ensureJobExists(id);
    this.transitions.assertTransition({
      entity: 'SchedulerScheduledJob',
      currentStatus: current.status,
      nextStatus: 'RETRY_SCHEDULED',
      rules: this.jobStatusRules,
    });

    const job = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.schedulerScheduledJob.update({
        where: { id },
        data: {
          status: 'RETRY_SCHEDULED',
          nextAttemptAt: new Date(),
          failedAt: null,
          lockedAt: null,
          lockedBy: null,
          error: null,
          updatedById: this.context.getUserId(),
        },
      });
      await tx.schedulerJobHistory.create({
        data: this.buildHistoryData(updated, 'RETRY_SCHEDULED'),
      });
      return updated;
    });

    await this.audit.record({
      action: 'SCHEDULER_JOB_RETRY',
      entity: 'SchedulerScheduledJob',
      entityId: id,
      payload: { jobKey: job.jobKey, nextAttemptAt: job.nextAttemptAt },
    });

    return new SchedulerScheduledJobEntity(job);
  }

  async recoverJob(id: string, dto: RecoverSchedulerJobDto) {
    const current = await this.ensureJobExists(id);
    const latestFailure = await this.prisma.schedulerJobHistory.findFirst({
      where: {
        jobId: id,
        status: { in: ['FAILED', 'DEAD_LETTER', 'RETRY_SCHEDULED'] },
      },
      orderBy: { createdAt: 'desc' },
      select: { id: true },
    });

    const recovery = await this.prisma.schedulerFailureRecovery.create({
      data: {
        tenantId: current.tenantId,
        jobId: current.id,
        historyId: latestFailure?.id,
        action: dto.action,
        reason: dto.reason,
        payload: this.toJson(dto.payload),
        createdById: this.context.getUserId(),
      },
    });

    try {
      await this.applyRecoveryAction(current.id, dto.action);
      const applied = await this.prisma.schedulerFailureRecovery.update({
        where: { id: recovery.id },
        data: {
          status: 'APPLIED',
          appliedAt: new Date(),
          updatedById: this.context.getUserId(),
        },
      });
      await this.audit.record({
        action: 'SCHEDULER_FAILURE_RECOVERY',
        entity: 'SchedulerFailureRecovery',
        entityId: recovery.id,
        payload: {
          jobId: current.id,
          action: dto.action,
          status: applied.status,
        },
      });
      return new SchedulerFailureRecoveryEntity(applied);
    } catch (error) {
      const failed = await this.prisma.schedulerFailureRecovery.update({
        where: { id: recovery.id },
        data: {
          status: 'FAILED',
          error: error instanceof Error ? error.message : 'Recovery failed',
          updatedById: this.context.getUserId(),
        },
      });
      throw new BadRequestException(failed.error ?? 'Recovery failed');
    }
  }

  async findRecoveries(query: SchedulerRecoveryQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.SchedulerFailureRecoveryWhereInput = {
      ...(tenantId ? { tenantId } : {}),
      ...(query.action ? { action: query.action } : {}),
      ...(query.status ? { status: query.status } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.schedulerFailureRecovery.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.schedulerFailureRecovery.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new SchedulerFailureRecoveryEntity(item)),
      total,
      query,
    );
  }

  async getDashboard(query: SchedulerMonitoringQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const jobWhere = this.schedulerJobWhere(query, tenantId);
    const now = new Date();
    const [
      activeCrons,
      pausedCrons,
      pendingJobs,
      runningJobs,
      retryScheduledJobs,
      deadLetterJobs,
      dueJobs,
      completedToday,
      failedToday,
      openRecoveries,
    ] = await this.prisma.$transaction([
      this.prisma.schedulerCronRegistry.count({
        where: this.softDelete.activeWhere({
          ...(tenantId ? { tenantId } : {}),
          status: 'ACTIVE',
        }),
      }),
      this.prisma.schedulerCronRegistry.count({
        where: this.softDelete.activeWhere({
          ...(tenantId ? { tenantId } : {}),
          status: 'PAUSED',
        }),
      }),
      this.prisma.schedulerScheduledJob.count({
        where: { ...jobWhere, status: 'PENDING' },
      }),
      this.prisma.schedulerScheduledJob.count({
        where: { ...jobWhere, status: 'RUNNING' },
      }),
      this.prisma.schedulerScheduledJob.count({
        where: { ...jobWhere, status: 'RETRY_SCHEDULED' },
      }),
      this.prisma.schedulerScheduledJob.count({
        where: { ...jobWhere, status: 'DEAD_LETTER' },
      }),
      this.prisma.schedulerScheduledJob.count({
        where: {
          ...jobWhere,
          status: { in: ['PENDING', 'QUEUED', 'RETRY_SCHEDULED'] },
          runAt: { lte: now },
          OR: [{ nextAttemptAt: null }, { nextAttemptAt: { lte: now } }],
        },
      }),
      this.prisma.schedulerJobHistory.count({
        where: {
          ...(tenantId ? { tenantId } : {}),
          status: 'SUCCEEDED',
          createdAt: { gte: today },
        },
      }),
      this.prisma.schedulerJobHistory.count({
        where: {
          ...(tenantId ? { tenantId } : {}),
          status: { in: ['FAILED', 'DEAD_LETTER'] },
          createdAt: { gte: today },
        },
      }),
      this.prisma.schedulerFailureRecovery.count({
        where: {
          ...(tenantId ? { tenantId } : {}),
          status: 'PENDING',
        },
      }),
    ]);

    return new SchedulerDashboardEntity({
      activeCrons,
      pausedCrons,
      pendingJobs,
      runningJobs,
      retryScheduledJobs,
      deadLetterJobs,
      dueJobs,
      completedToday,
      failedToday,
      openRecoveries,
    });
  }

  async getQueueStatus(query: SchedulerMonitoringQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const now = new Date();
    const jobWhere = this.schedulerJobWhere(query, tenantId);
    const [statusGroups, dueGroups] = await this.prisma.$transaction([
      this.prisma.schedulerScheduledJob.groupBy({
        by: ['queueName', 'status'],
        where: jobWhere,
        _count: { _all: true },
        orderBy: { queueName: 'asc' },
      }),
      this.prisma.schedulerScheduledJob.groupBy({
        by: ['queueName'],
        where: {
          ...jobWhere,
          status: { in: ['PENDING', 'QUEUED', 'RETRY_SCHEDULED'] },
          runAt: { lte: now },
          OR: [{ nextAttemptAt: null }, { nextAttemptAt: { lte: now } }],
        },
        _count: { _all: true },
        orderBy: { queueName: 'asc' },
      }),
    ]);

    const queues = new Map<string, SchedulerQueueStatusEntity>();
    for (const group of statusGroups) {
      const count = this.groupCount(group);
      const current =
        queues.get(group.queueName) ??
        new SchedulerQueueStatusEntity({
          queueName: group.queueName,
          pending: 0,
          running: 0,
          retryScheduled: 0,
          deadLetter: 0,
          due: 0,
        });
      if (group.status === 'PENDING' || group.status === 'QUEUED') {
        current.pending += count;
      }
      if (group.status === 'RUNNING') current.running += count;
      if (group.status === 'RETRY_SCHEDULED') {
        current.retryScheduled += count;
      }
      if (group.status === 'DEAD_LETTER') current.deadLetter += count;
      queues.set(group.queueName, current);
    }

    for (const group of dueGroups) {
      const count = this.groupCount(group);
      const current =
        queues.get(group.queueName) ??
        new SchedulerQueueStatusEntity({
          queueName: group.queueName,
          pending: 0,
          running: 0,
          retryScheduled: 0,
          deadLetter: 0,
          due: 0,
        });
      current.due = count;
      queues.set(group.queueName, current);
    }

    return Array.from(queues.values());
  }

  async getFailureReport(query: SchedulerMonitoringQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const dateRange = this.createdAtRange(query);
    const [failedJobs, deadLetterJobs, openRecoveries, recentFailures] =
      await this.prisma.$transaction([
        this.prisma.schedulerScheduledJob.count({
          where: {
            ...this.schedulerJobWhere(query, tenantId),
            status: 'FAILED',
          },
        }),
        this.prisma.schedulerScheduledJob.count({
          where: {
            ...this.schedulerJobWhere(query, tenantId),
            status: 'DEAD_LETTER',
          },
        }),
        this.prisma.schedulerFailureRecovery.count({
          where: {
            ...(tenantId ? { tenantId } : {}),
            status: 'PENDING',
            ...(dateRange ? { createdAt: dateRange } : {}),
          },
        }),
        this.prisma.schedulerJobHistory.findMany({
          where: {
            ...(tenantId ? { tenantId } : {}),
            ...(query.queueName ? { queueName: query.queueName } : {}),
            status: { in: ['FAILED', 'DEAD_LETTER'] },
            ...(dateRange ? { createdAt: dateRange } : {}),
          },
          orderBy: { createdAt: 'desc' },
          take: 20,
          select: {
            id: true,
            jobId: true,
            runId: true,
            taskName: true,
            queueName: true,
            status: true,
            attempt: true,
            error: true,
            createdAt: true,
          },
        }),
      ]);

    return new SchedulerFailureReportEntity({
      failedJobs,
      deadLetterJobs,
      openRecoveries,
      recentFailures,
    });
  }

  async getSystemStatus(query: SchedulerMonitoringQueryDto) {
    const dashboard = await this.getDashboard(query);
    const healthy = dashboard.deadLetterJobs === 0 && dashboard.failedToday < 10;
    return new SchedulerSystemStatusEntity({
      healthy,
      status: healthy ? 'HEALTHY' : 'DEGRADED',
      monitoredAt: new Date(),
      dueJobs: dashboard.dueJobs,
      runningJobs: dashboard.runningJobs,
      deadLetterJobs: dashboard.deadLetterJobs,
    });
  }

  private async applyRecoveryAction(id: string, action: SchedulerRecoveryAction) {
    if (action === 'RETRY') {
      await this.retryJob(id);
      return;
    }

    const statusByAction: Partial<Record<SchedulerRecoveryAction, SchedulerRunStatus>> = {
      REQUEUE: 'QUEUED',
      CANCEL: 'CANCELLED',
      MARK_RESOLVED: 'SUCCEEDED',
      DEAD_LETTER: 'DEAD_LETTER',
    };
    const nextStatus = statusByAction[action];
    if (!nextStatus) {
      throw new BadRequestException('Unsupported scheduler recovery action');
    }

    await this.prisma.$transaction(async (tx) => {
      const updated = await tx.schedulerScheduledJob.update({
        where: { id },
        data: {
          status: nextStatus,
          nextAttemptAt: action === 'REQUEUE' ? new Date() : null,
          completedAt: action === 'MARK_RESOLVED' ? new Date() : undefined,
          failedAt: action === 'DEAD_LETTER' ? new Date() : undefined,
          lockedAt: null,
          lockedBy: null,
          updatedById: this.context.getUserId(),
        },
      });
      await tx.schedulerJobHistory.create({
        data: this.buildHistoryData(updated, nextStatus),
      });
    });
  }

  private async recordHistory(
    job: {
      id: string;
      tenantId: string | null;
      cronId: string | null;
      taskName: string;
      taskType: SchedulerTaskType;
      queueName: string;
      status: SchedulerRunStatus;
      attempts: number;
      payload: Prisma.JsonValue | null;
      metadata: Prisma.JsonValue | null;
    },
    status: SchedulerRunStatus,
    error?: string,
  ) {
    return this.prisma.schedulerJobHistory.create({
      data: this.buildHistoryData(job, status, error),
    });
  }

  private buildHistoryData(
    job: {
      id: string;
      tenantId: string | null;
      cronId: string | null;
      taskName: string;
      taskType: SchedulerTaskType;
      queueName: string;
      status: SchedulerRunStatus;
      attempts: number;
      payload: Prisma.JsonValue | null;
      metadata: Prisma.JsonValue | null;
    },
    status: SchedulerRunStatus,
    error?: string,
  ): Prisma.SchedulerJobHistoryUncheckedCreateInput {
    return {
      tenantId: job.tenantId,
      jobId: job.id,
      cronId: job.cronId,
      runId: `run_${randomUUID()}`,
      taskName: job.taskName,
      taskType: job.taskType,
      queueName: job.queueName,
      status,
      attempt: Math.max(1, job.attempts),
      startedAt: status === 'RUNNING' ? new Date() : undefined,
      finishedAt: ['SUCCEEDED', 'FAILED', 'CANCELLED', 'DEAD_LETTER'].includes(status)
        ? new Date()
        : undefined,
      error,
      payload: this.toJson(job.payload),
      metadata: this.toJson(job.metadata),
      actorId: this.context.getUserId(),
    };
  }

  private calculateNextAttempt(job: {
    attempts: number;
    retryDelaySeconds: number;
    retryStrategy: string;
  }) {
    const multiplier =
      job.retryStrategy === 'EXPONENTIAL' ? Math.max(1, 2 ** Math.max(0, job.attempts - 1)) : 1;
    return new Date(Date.now() + job.retryDelaySeconds * multiplier * 1000);
  }

  private schedulerJobWhere(
    query: Pick<SchedulerMonitoringQueryDto, 'queueName' | 'taskName'>,
    tenantId?: string | null,
  ): Prisma.SchedulerScheduledJobWhereInput {
    return this.softDelete.activeWhere({
      ...(tenantId ? { tenantId } : {}),
      ...(query.queueName ? { queueName: query.queueName } : {}),
      ...(query.taskName ? { taskName: query.taskName } : {}),
    });
  }

  private createdAtRange(
    query: Pick<SchedulerMonitoringQueryDto, 'from' | 'to'>,
  ): Prisma.DateTimeFilter | undefined {
    if (!query.from && !query.to) return undefined;
    return {
      ...(query.from ? { gte: new Date(query.from) } : {}),
      ...(query.to ? { lte: new Date(query.to) } : {}),
    };
  }

  private groupCount(group: { _count?: true | { _all?: number } }): number {
    return typeof group._count === 'object' ? group._count._all ?? 0 : 0;
  }

  private validateCronExpression(expression: string) {
    const parts = expression.trim().split(/\s+/);
    if (![5, 6].includes(parts.length)) {
      throw new BadRequestException('Cron expression must contain 5 or 6 fields');
    }
  }

  private async resolveTenantId(tenantId?: string | null): Promise<string | null> {
    const resolved = tenantId ?? this.context.getTenantId();
    if (!resolved) return null;
    const tenant = await this.prisma.tenant.findFirst({
      where: this.softDelete.activeWhere({ id: resolved }),
      select: { id: true },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return resolved;
  }

  private async ensureCronExists(id: string) {
    const cron = await this.prisma.schedulerCronRegistry.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!cron) throw new NotFoundException('Scheduler cron not found');
    return cron;
  }

  private async ensureJobExists(id: string) {
    const job = await this.prisma.schedulerScheduledJob.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!job) throw new NotFoundException('Scheduled job not found');
    return job;
  }

  private async ensureCronUnique(
    tenantId: string | null,
    code: string,
    excludeId?: string,
  ) {
    const cron = await this.prisma.schedulerCronRegistry.findFirst({
      where: {
        tenantId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    if (cron) throw new ConflictException('Scheduler cron already exists');
  }

  private async ensureJobKeyUnique(jobKey: string) {
    const job = await this.prisma.schedulerScheduledJob.findUnique({
      where: { jobKey },
    });
    if (job) throw new ConflictException('Scheduled job key already exists');
  }

  private toJson(
    value: unknown,
  ): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput | undefined {
    if (value === undefined) return undefined;
    if (value === null) return Prisma.JsonNull;
    return value as Prisma.InputJsonValue;
  }
}
