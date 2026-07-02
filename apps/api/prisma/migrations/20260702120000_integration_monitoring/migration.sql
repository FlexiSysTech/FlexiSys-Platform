-- CreateEnum
CREATE TYPE "IntegrationDirection" AS ENUM ('INBOUND', 'OUTBOUND');

-- CreateEnum
CREATE TYPE "IntegrationExecutionStatus" AS ENUM ('STARTED', 'SUCCESS', 'FAILED', 'SKIPPED');

-- CreateEnum
CREATE TYPE "IntegrationHealthStatus" AS ENUM ('HEALTHY', 'DEGRADED', 'DOWN', 'UNKNOWN');

-- CreateTable
CREATE TABLE "IntegrationExecutionHistory" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "connectionId" TEXT,
    "outboundJobId" TEXT,
    "inboundEventId" TEXT,
    "direction" "IntegrationDirection" NOT NULL,
    "operation" TEXT NOT NULL,
    "status" "IntegrationExecutionStatus" NOT NULL DEFAULT 'STARTED',
    "requestSummary" JSONB,
    "responseSummary" JSONB,
    "error" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "durationMs" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IntegrationExecutionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationRetryHistory" (
    "id" TEXT NOT NULL,
    "outboundJobId" TEXT NOT NULL,
    "attemptNumber" INTEGER NOT NULL,
    "status" "IntegrationOutboundStatus" NOT NULL,
    "scheduledAt" TIMESTAMP(3),
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IntegrationRetryHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationHealthSnapshot" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "connectionId" TEXT,
    "status" "IntegrationHealthStatus" NOT NULL DEFAULT 'UNKNOWN',
    "latencyMs" INTEGER,
    "error" TEXT,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IntegrationHealthSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IntegrationExecutionHistory_companyId_idx" ON "IntegrationExecutionHistory"("companyId");

-- CreateIndex
CREATE INDEX "IntegrationExecutionHistory_connectionId_idx" ON "IntegrationExecutionHistory"("connectionId");

-- CreateIndex
CREATE INDEX "IntegrationExecutionHistory_outboundJobId_idx" ON "IntegrationExecutionHistory"("outboundJobId");

-- CreateIndex
CREATE INDEX "IntegrationExecutionHistory_inboundEventId_idx" ON "IntegrationExecutionHistory"("inboundEventId");

-- CreateIndex
CREATE INDEX "IntegrationExecutionHistory_direction_idx" ON "IntegrationExecutionHistory"("direction");

-- CreateIndex
CREATE INDEX "IntegrationExecutionHistory_operation_idx" ON "IntegrationExecutionHistory"("operation");

-- CreateIndex
CREATE INDEX "IntegrationExecutionHistory_status_idx" ON "IntegrationExecutionHistory"("status");

-- CreateIndex
CREATE INDEX "IntegrationExecutionHistory_startedAt_idx" ON "IntegrationExecutionHistory"("startedAt");

-- CreateIndex
CREATE INDEX "IntegrationRetryHistory_outboundJobId_idx" ON "IntegrationRetryHistory"("outboundJobId");

-- CreateIndex
CREATE INDEX "IntegrationRetryHistory_status_idx" ON "IntegrationRetryHistory"("status");

-- CreateIndex
CREATE INDEX "IntegrationRetryHistory_scheduledAt_idx" ON "IntegrationRetryHistory"("scheduledAt");

-- CreateIndex
CREATE INDEX "IntegrationRetryHistory_attemptedAt_idx" ON "IntegrationRetryHistory"("attemptedAt");

-- CreateIndex
CREATE INDEX "IntegrationHealthSnapshot_companyId_idx" ON "IntegrationHealthSnapshot"("companyId");

-- CreateIndex
CREATE INDEX "IntegrationHealthSnapshot_connectionId_idx" ON "IntegrationHealthSnapshot"("connectionId");

-- CreateIndex
CREATE INDEX "IntegrationHealthSnapshot_status_idx" ON "IntegrationHealthSnapshot"("status");

-- CreateIndex
CREATE INDEX "IntegrationHealthSnapshot_checkedAt_idx" ON "IntegrationHealthSnapshot"("checkedAt");

-- AddForeignKey
ALTER TABLE "IntegrationExecutionHistory" ADD CONSTRAINT "IntegrationExecutionHistory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationExecutionHistory" ADD CONSTRAINT "IntegrationExecutionHistory_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "IntegrationConnection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationExecutionHistory" ADD CONSTRAINT "IntegrationExecutionHistory_outboundJobId_fkey" FOREIGN KEY ("outboundJobId") REFERENCES "IntegrationOutboundJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationExecutionHistory" ADD CONSTRAINT "IntegrationExecutionHistory_inboundEventId_fkey" FOREIGN KEY ("inboundEventId") REFERENCES "IntegrationInboundEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationRetryHistory" ADD CONSTRAINT "IntegrationRetryHistory_outboundJobId_fkey" FOREIGN KEY ("outboundJobId") REFERENCES "IntegrationOutboundJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationHealthSnapshot" ADD CONSTRAINT "IntegrationHealthSnapshot_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationHealthSnapshot" ADD CONSTRAINT "IntegrationHealthSnapshot_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "IntegrationConnection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
