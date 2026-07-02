-- CreateEnum
CREATE TYPE "ObservabilityHealthStatus" AS ENUM ('HEALTHY', 'DEGRADED', 'DOWN', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "ObservabilityCheckType" AS ENUM ('LIVENESS', 'READINESS', 'DATABASE', 'MODULE', 'EXTERNAL_PROVIDER', 'CUSTOM');

-- CreateEnum
CREATE TYPE "ObservabilityProviderStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateTable
CREATE TABLE "ObservabilityHealthProvider" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,
    "checkType" "ObservabilityCheckType" NOT NULL,
    "status" "ObservabilityProviderStatus" NOT NULL DEFAULT 'ACTIVE',
    "timeoutMs" INTEGER NOT NULL DEFAULT 5000,
    "intervalSeconds" INTEGER NOT NULL DEFAULT 60,
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ObservabilityHealthProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObservabilityHealthCheckResult" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "providerId" TEXT,
    "checkType" "ObservabilityCheckType" NOT NULL,
    "moduleName" TEXT NOT NULL,
    "status" "ObservabilityHealthStatus" NOT NULL DEFAULT 'UNKNOWN',
    "message" TEXT,
    "latencyMs" INTEGER,
    "metadata" JSONB,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ObservabilityHealthCheckResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ObservabilityHealthProvider_tenantId_code_key" ON "ObservabilityHealthProvider"("tenantId", "code");
CREATE INDEX "ObservabilityHealthProvider_tenantId_idx" ON "ObservabilityHealthProvider"("tenantId");
CREATE INDEX "ObservabilityHealthProvider_code_idx" ON "ObservabilityHealthProvider"("code");
CREATE INDEX "ObservabilityHealthProvider_moduleName_idx" ON "ObservabilityHealthProvider"("moduleName");
CREATE INDEX "ObservabilityHealthProvider_checkType_idx" ON "ObservabilityHealthProvider"("checkType");
CREATE INDEX "ObservabilityHealthProvider_status_idx" ON "ObservabilityHealthProvider"("status");
CREATE INDEX "ObservabilityHealthProvider_deletedAt_idx" ON "ObservabilityHealthProvider"("deletedAt");
CREATE INDEX "ObservabilityHealthCheckResult_tenantId_idx" ON "ObservabilityHealthCheckResult"("tenantId");
CREATE INDEX "ObservabilityHealthCheckResult_providerId_idx" ON "ObservabilityHealthCheckResult"("providerId");
CREATE INDEX "ObservabilityHealthCheckResult_checkType_idx" ON "ObservabilityHealthCheckResult"("checkType");
CREATE INDEX "ObservabilityHealthCheckResult_moduleName_idx" ON "ObservabilityHealthCheckResult"("moduleName");
CREATE INDEX "ObservabilityHealthCheckResult_status_idx" ON "ObservabilityHealthCheckResult"("status");
CREATE INDEX "ObservabilityHealthCheckResult_checkedAt_idx" ON "ObservabilityHealthCheckResult"("checkedAt");

-- AddForeignKey
ALTER TABLE "ObservabilityHealthProvider" ADD CONSTRAINT "ObservabilityHealthProvider_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ObservabilityHealthCheckResult" ADD CONSTRAINT "ObservabilityHealthCheckResult_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ObservabilityHealthCheckResult" ADD CONSTRAINT "ObservabilityHealthCheckResult_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "ObservabilityHealthProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
