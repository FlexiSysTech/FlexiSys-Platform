-- CreateEnum
CREATE TYPE "SchedulerRecoveryAction" AS ENUM ('RETRY', 'REQUEUE', 'CANCEL', 'MARK_RESOLVED', 'DEAD_LETTER');

-- CreateEnum
CREATE TYPE "SchedulerRecoveryStatus" AS ENUM ('PENDING', 'APPLIED', 'FAILED');

-- CreateTable
CREATE TABLE "SchedulerFailureRecovery" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "jobId" TEXT,
    "historyId" TEXT,
    "action" "SchedulerRecoveryAction" NOT NULL,
    "status" "SchedulerRecoveryStatus" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,
    "payload" JSONB,
    "appliedAt" TIMESTAMP(3),
    "error" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchedulerFailureRecovery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SchedulerFailureRecovery_tenantId_idx" ON "SchedulerFailureRecovery"("tenantId");
CREATE INDEX "SchedulerFailureRecovery_jobId_idx" ON "SchedulerFailureRecovery"("jobId");
CREATE INDEX "SchedulerFailureRecovery_historyId_idx" ON "SchedulerFailureRecovery"("historyId");
CREATE INDEX "SchedulerFailureRecovery_action_idx" ON "SchedulerFailureRecovery"("action");
CREATE INDEX "SchedulerFailureRecovery_status_idx" ON "SchedulerFailureRecovery"("status");
CREATE INDEX "SchedulerFailureRecovery_appliedAt_idx" ON "SchedulerFailureRecovery"("appliedAt");
CREATE INDEX "SchedulerFailureRecovery_createdAt_idx" ON "SchedulerFailureRecovery"("createdAt");

-- AddForeignKey
ALTER TABLE "SchedulerFailureRecovery" ADD CONSTRAINT "SchedulerFailureRecovery_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SchedulerFailureRecovery" ADD CONSTRAINT "SchedulerFailureRecovery_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "SchedulerScheduledJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SchedulerFailureRecovery" ADD CONSTRAINT "SchedulerFailureRecovery_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "SchedulerJobHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
