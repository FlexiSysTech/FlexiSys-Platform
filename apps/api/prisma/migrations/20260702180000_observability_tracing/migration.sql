-- CreateEnum
CREATE TYPE "ObservabilityTraceStatus" AS ENUM ('STARTED', 'SUCCESS', 'ERROR');

-- CreateEnum
CREATE TYPE "ObservabilitySpanType" AS ENUM ('REQUEST', 'SERVICE', 'DATABASE', 'EXTERNAL_PROVIDER', 'CUSTOM');

-- CreateTable
CREATE TABLE "ObservabilityTrace" (
    "id" TEXT NOT NULL,
    "traceId" TEXT NOT NULL,
    "tenantId" TEXT,
    "userId" TEXT,
    "correlationId" TEXT,
    "requestId" TEXT,
    "rootSpanName" TEXT NOT NULL,
    "status" "ObservabilityTraceStatus" NOT NULL DEFAULT 'STARTED',
    "durationMs" INTEGER,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ObservabilityTrace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObservabilitySpan" (
    "id" TEXT NOT NULL,
    "traceRecordId" TEXT NOT NULL,
    "tenantId" TEXT,
    "parentSpanId" TEXT,
    "spanName" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,
    "spanType" "ObservabilitySpanType" NOT NULL,
    "status" "ObservabilityTraceStatus" NOT NULL DEFAULT 'STARTED',
    "durationMs" INTEGER,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ObservabilitySpan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ObservabilityTrace_traceId_key" ON "ObservabilityTrace"("traceId");
CREATE INDEX "ObservabilityTrace_tenantId_idx" ON "ObservabilityTrace"("tenantId");
CREATE INDEX "ObservabilityTrace_userId_idx" ON "ObservabilityTrace"("userId");
CREATE INDEX "ObservabilityTrace_correlationId_idx" ON "ObservabilityTrace"("correlationId");
CREATE INDEX "ObservabilityTrace_requestId_idx" ON "ObservabilityTrace"("requestId");
CREATE INDEX "ObservabilityTrace_status_idx" ON "ObservabilityTrace"("status");
CREATE INDEX "ObservabilityTrace_startedAt_idx" ON "ObservabilityTrace"("startedAt");
CREATE INDEX "ObservabilityTrace_endedAt_idx" ON "ObservabilityTrace"("endedAt");
CREATE INDEX "ObservabilitySpan_traceRecordId_idx" ON "ObservabilitySpan"("traceRecordId");
CREATE INDEX "ObservabilitySpan_tenantId_idx" ON "ObservabilitySpan"("tenantId");
CREATE INDEX "ObservabilitySpan_parentSpanId_idx" ON "ObservabilitySpan"("parentSpanId");
CREATE INDEX "ObservabilitySpan_moduleName_idx" ON "ObservabilitySpan"("moduleName");
CREATE INDEX "ObservabilitySpan_spanType_idx" ON "ObservabilitySpan"("spanType");
CREATE INDEX "ObservabilitySpan_status_idx" ON "ObservabilitySpan"("status");
CREATE INDEX "ObservabilitySpan_startedAt_idx" ON "ObservabilitySpan"("startedAt");
CREATE INDEX "ObservabilitySpan_endedAt_idx" ON "ObservabilitySpan"("endedAt");

-- AddForeignKey
ALTER TABLE "ObservabilityTrace" ADD CONSTRAINT "ObservabilityTrace_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ObservabilitySpan" ADD CONSTRAINT "ObservabilitySpan_traceRecordId_fkey" FOREIGN KEY ("traceRecordId") REFERENCES "ObservabilityTrace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ObservabilitySpan" ADD CONSTRAINT "ObservabilitySpan_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ObservabilitySpan" ADD CONSTRAINT "ObservabilitySpan_parentSpanId_fkey" FOREIGN KEY ("parentSpanId") REFERENCES "ObservabilitySpan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
