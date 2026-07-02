-- CreateEnum
CREATE TYPE "SchedulerJobStatus" AS ENUM ('ACTIVE', 'PAUSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SchedulerTaskType" AS ENUM ('CRON', 'BACKGROUND', 'QUEUE');

-- CreateEnum
CREATE TYPE "SchedulerPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "SchedulerRunStatus" AS ENUM ('PENDING', 'QUEUED', 'RUNNING', 'SUCCEEDED', 'FAILED', 'CANCELLED', 'RETRY_SCHEDULED', 'DEAD_LETTER');

-- CreateEnum
CREATE TYPE "SchedulerRetryStrategy" AS ENUM ('NONE', 'FIXED', 'EXPONENTIAL');

-- CreateTable
CREATE TABLE "SchedulerCronRegistry" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "taskName" TEXT NOT NULL,
    "cronExpression" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "taskType" "SchedulerTaskType" NOT NULL DEFAULT 'CRON',
    "queueName" TEXT NOT NULL DEFAULT 'default',
    "priority" "SchedulerPriority" NOT NULL DEFAULT 'NORMAL',
    "status" "SchedulerJobStatus" NOT NULL DEFAULT 'ACTIVE',
    "payload" JSONB,
    "nextRunAt" TIMESTAMP(3),
    "lastRunAt" TIMESTAMP(3),
    "maxRetries" INTEGER NOT NULL DEFAULT 3,
    "retryStrategy" "SchedulerRetryStrategy" NOT NULL DEFAULT 'FIXED',
    "retryDelaySeconds" INTEGER NOT NULL DEFAULT 60,
    "timeoutSeconds" INTEGER NOT NULL DEFAULT 300,
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchedulerCronRegistry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchedulerScheduledJob" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "cronId" TEXT,
    "jobKey" TEXT NOT NULL,
    "taskName" TEXT NOT NULL,
    "taskType" "SchedulerTaskType" NOT NULL DEFAULT 'BACKGROUND',
    "queueName" TEXT NOT NULL DEFAULT 'default',
    "priority" "SchedulerPriority" NOT NULL DEFAULT 'NORMAL',
    "status" "SchedulerRunStatus" NOT NULL DEFAULT 'PENDING',
    "payload" JSONB,
    "runAt" TIMESTAMP(3) NOT NULL,
    "nextAttemptAt" TIMESTAMP(3),
    "lockedAt" TIMESTAMP(3),
    "lockedBy" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "retryStrategy" "SchedulerRetryStrategy" NOT NULL DEFAULT 'FIXED',
    "retryDelaySeconds" INTEGER NOT NULL DEFAULT 60,
    "timeoutSeconds" INTEGER NOT NULL DEFAULT 300,
    "completedAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "error" TEXT,
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchedulerScheduledJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchedulerJobHistory" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "jobId" TEXT,
    "cronId" TEXT,
    "runId" TEXT NOT NULL,
    "taskName" TEXT NOT NULL,
    "taskType" "SchedulerTaskType" NOT NULL,
    "queueName" TEXT NOT NULL,
    "status" "SchedulerRunStatus" NOT NULL,
    "attempt" INTEGER NOT NULL DEFAULT 1,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "durationMs" INTEGER,
    "error" TEXT,
    "payload" JSONB,
    "metadata" JSONB,
    "actorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SchedulerJobHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SchedulerCronRegistry_tenantId_code_key" ON "SchedulerCronRegistry"("tenantId", "code");
CREATE INDEX "SchedulerCronRegistry_tenantId_idx" ON "SchedulerCronRegistry"("tenantId");
CREATE INDEX "SchedulerCronRegistry_code_idx" ON "SchedulerCronRegistry"("code");
CREATE INDEX "SchedulerCronRegistry_taskName_idx" ON "SchedulerCronRegistry"("taskName");
CREATE INDEX "SchedulerCronRegistry_queueName_idx" ON "SchedulerCronRegistry"("queueName");
CREATE INDEX "SchedulerCronRegistry_status_idx" ON "SchedulerCronRegistry"("status");
CREATE INDEX "SchedulerCronRegistry_nextRunAt_idx" ON "SchedulerCronRegistry"("nextRunAt");
CREATE INDEX "SchedulerCronRegistry_deletedAt_idx" ON "SchedulerCronRegistry"("deletedAt");
CREATE UNIQUE INDEX "SchedulerScheduledJob_jobKey_key" ON "SchedulerScheduledJob"("jobKey");
CREATE INDEX "SchedulerScheduledJob_tenantId_idx" ON "SchedulerScheduledJob"("tenantId");
CREATE INDEX "SchedulerScheduledJob_cronId_idx" ON "SchedulerScheduledJob"("cronId");
CREATE INDEX "SchedulerScheduledJob_taskName_idx" ON "SchedulerScheduledJob"("taskName");
CREATE INDEX "SchedulerScheduledJob_taskType_idx" ON "SchedulerScheduledJob"("taskType");
CREATE INDEX "SchedulerScheduledJob_queueName_idx" ON "SchedulerScheduledJob"("queueName");
CREATE INDEX "SchedulerScheduledJob_priority_idx" ON "SchedulerScheduledJob"("priority");
CREATE INDEX "SchedulerScheduledJob_status_idx" ON "SchedulerScheduledJob"("status");
CREATE INDEX "SchedulerScheduledJob_runAt_idx" ON "SchedulerScheduledJob"("runAt");
CREATE INDEX "SchedulerScheduledJob_nextAttemptAt_idx" ON "SchedulerScheduledJob"("nextAttemptAt");
CREATE INDEX "SchedulerScheduledJob_lockedAt_idx" ON "SchedulerScheduledJob"("lockedAt");
CREATE INDEX "SchedulerScheduledJob_deletedAt_idx" ON "SchedulerScheduledJob"("deletedAt");
CREATE UNIQUE INDEX "SchedulerJobHistory_runId_key" ON "SchedulerJobHistory"("runId");
CREATE INDEX "SchedulerJobHistory_tenantId_idx" ON "SchedulerJobHistory"("tenantId");
CREATE INDEX "SchedulerJobHistory_jobId_idx" ON "SchedulerJobHistory"("jobId");
CREATE INDEX "SchedulerJobHistory_cronId_idx" ON "SchedulerJobHistory"("cronId");
CREATE INDEX "SchedulerJobHistory_taskName_idx" ON "SchedulerJobHistory"("taskName");
CREATE INDEX "SchedulerJobHistory_queueName_idx" ON "SchedulerJobHistory"("queueName");
CREATE INDEX "SchedulerJobHistory_status_idx" ON "SchedulerJobHistory"("status");
CREATE INDEX "SchedulerJobHistory_startedAt_idx" ON "SchedulerJobHistory"("startedAt");
CREATE INDEX "SchedulerJobHistory_finishedAt_idx" ON "SchedulerJobHistory"("finishedAt");
CREATE INDEX "SchedulerJobHistory_createdAt_idx" ON "SchedulerJobHistory"("createdAt");

-- AddForeignKey
ALTER TABLE "SchedulerCronRegistry" ADD CONSTRAINT "SchedulerCronRegistry_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SchedulerScheduledJob" ADD CONSTRAINT "SchedulerScheduledJob_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SchedulerScheduledJob" ADD CONSTRAINT "SchedulerScheduledJob_cronId_fkey" FOREIGN KEY ("cronId") REFERENCES "SchedulerCronRegistry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SchedulerJobHistory" ADD CONSTRAINT "SchedulerJobHistory_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SchedulerJobHistory" ADD CONSTRAINT "SchedulerJobHistory_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "SchedulerScheduledJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SchedulerJobHistory" ADD CONSTRAINT "SchedulerJobHistory_cronId_fkey" FOREIGN KEY ("cronId") REFERENCES "SchedulerCronRegistry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
