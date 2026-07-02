import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  SchedulerJobStatus,
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
import {
  SchedulerCronRegistryEntity,
  SchedulerJobHistoryEntity,
  SchedulerScheduledJobEntity,
} from './entities/scheduler-core.entity';

@Injectable()
export class SchedulerService {
  private readonly cronStatusRules = [
    { from: 'ACTIVE' as SchedulerJobStatus, to: ['PAUSED', 'ARCHIVED'] as SchedulerJobStatus[] },
    { from: 'PAUSED' as SchedulerJobStatus, to: ['ACTIVE', 'ARCHIVED'] as SchedulerJobStatus[] },
  ];

  private readonly jobStatusRules = [
    { from: 'PENDING' as SchedulerRunStatus, to: ['QUEUED', 'RUNNING', 'CANCELLED'] as SchedulerRunStatus[] },
    { from: 'QUEUED' as SchedulerRunStatus, to: ['RUNNING', 'CANCELLED'] as SchedulerRunStatus[] },
    { from: 'RUNNING' as SchedulerRunStatus, to: ['SUCCEEDED', 'FAILED', 'RETRY_SCHEDULED', 'CANCELLED'] as SchedulerRunStatus[] },
    { from: 'FAILED' as SchedulerRunStatus, to: ['RETRY_SCHEDULED', 'DEAD_LETTER'] as SchedulerRunStatus[] },
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
      data: {
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
      },
    });
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

  private toJson(value: unknown): Prisma.InputJsonValue | undefined {
    return value === undefined ? undefined : (value as Prisma.InputJsonValue);
  }
}
