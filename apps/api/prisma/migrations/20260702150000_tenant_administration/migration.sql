-- CreateEnum
CREATE TYPE "TenantProvisioningAction" AS ENUM ('PROVISION', 'ACTIVATE', 'SUSPEND', 'RESUME', 'ARCHIVE');

-- CreateEnum
CREATE TYPE "TenantProvisioningStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "TenantUsagePeriod" AS ENUM ('DAILY', 'MONTHLY', 'YEARLY', 'LIFETIME');

-- CreateTable
CREATE TABLE "TenantUsageLimit" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "limitValue" INTEGER NOT NULL,
    "currentValue" INTEGER NOT NULL DEFAULT 0,
    "period" "TenantUsagePeriod" NOT NULL DEFAULT 'MONTHLY',
    "status" "TenantConfigurationStatus" NOT NULL DEFAULT 'ACTIVE',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantUsageLimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantProvisioningEvent" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "action" "TenantProvisioningAction" NOT NULL,
    "status" "TenantProvisioningStatus" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,
    "payload" JSONB,
    "actorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TenantProvisioningEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TenantUsageLimit_tenantId_key_period_key" ON "TenantUsageLimit"("tenantId", "key", "period");
CREATE INDEX "TenantUsageLimit_tenantId_idx" ON "TenantUsageLimit"("tenantId");
CREATE INDEX "TenantUsageLimit_key_idx" ON "TenantUsageLimit"("key");
CREATE INDEX "TenantUsageLimit_period_idx" ON "TenantUsageLimit"("period");
CREATE INDEX "TenantUsageLimit_status_idx" ON "TenantUsageLimit"("status");
CREATE INDEX "TenantUsageLimit_deletedAt_idx" ON "TenantUsageLimit"("deletedAt");

-- CreateIndex
CREATE INDEX "TenantProvisioningEvent_tenantId_idx" ON "TenantProvisioningEvent"("tenantId");
CREATE INDEX "TenantProvisioningEvent_action_idx" ON "TenantProvisioningEvent"("action");
CREATE INDEX "TenantProvisioningEvent_status_idx" ON "TenantProvisioningEvent"("status");
CREATE INDEX "TenantProvisioningEvent_createdAt_idx" ON "TenantProvisioningEvent"("createdAt");

-- AddForeignKey
ALTER TABLE "TenantUsageLimit" ADD CONSTRAINT "TenantUsageLimit_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TenantProvisioningEvent" ADD CONSTRAINT "TenantProvisioningEvent_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
