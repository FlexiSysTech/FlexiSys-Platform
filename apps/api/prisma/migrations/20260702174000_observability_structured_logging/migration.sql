-- CreateEnum
CREATE TYPE "ObservabilityLogLevel" AS ENUM ('DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL');

-- CreateTable
CREATE TABLE "ObservabilityLogEntry" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "userId" TEXT,
    "correlationId" TEXT,
    "requestId" TEXT,
    "moduleName" TEXT NOT NULL,
    "level" "ObservabilityLogLevel" NOT NULL DEFAULT 'INFO',
    "message" TEXT NOT NULL,
    "method" TEXT,
    "path" TEXT,
    "statusCode" INTEGER,
    "durationMs" INTEGER,
    "context" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ObservabilityLogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ObservabilityLogEntry_tenantId_idx" ON "ObservabilityLogEntry"("tenantId");
CREATE INDEX "ObservabilityLogEntry_userId_idx" ON "ObservabilityLogEntry"("userId");
CREATE INDEX "ObservabilityLogEntry_correlationId_idx" ON "ObservabilityLogEntry"("correlationId");
CREATE INDEX "ObservabilityLogEntry_requestId_idx" ON "ObservabilityLogEntry"("requestId");
CREATE INDEX "ObservabilityLogEntry_moduleName_idx" ON "ObservabilityLogEntry"("moduleName");
CREATE INDEX "ObservabilityLogEntry_level_idx" ON "ObservabilityLogEntry"("level");
CREATE INDEX "ObservabilityLogEntry_statusCode_idx" ON "ObservabilityLogEntry"("statusCode");
CREATE INDEX "ObservabilityLogEntry_createdAt_idx" ON "ObservabilityLogEntry"("createdAt");

-- AddForeignKey
ALTER TABLE "ObservabilityLogEntry" ADD CONSTRAINT "ObservabilityLogEntry_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
