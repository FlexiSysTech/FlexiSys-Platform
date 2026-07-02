-- CreateEnum
CREATE TYPE "AiProviderType" AS ENUM ('INTERNAL', 'OPENAI', 'AZURE_OPENAI', 'CUSTOM');

-- CreateEnum
CREATE TYPE "AiProviderStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AiRequestStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "AiFeatureArea" AS ENUM ('CORE', 'HR_ASSISTANT', 'WORKFLOW', 'REPORTING', 'GOVERNANCE');

-- CreateTable
CREATE TABLE "AiProviderConfig" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AiProviderType" NOT NULL DEFAULT 'INTERNAL',
    "status" "AiProviderStatus" NOT NULL DEFAULT 'ACTIVE',
    "model" TEXT,
    "endpoint" TEXT,
    "settings" JSONB,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiProviderConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiRequestLog" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "providerId" TEXT,
    "feature" "AiFeatureArea" NOT NULL DEFAULT 'CORE',
    "operation" TEXT NOT NULL,
    "status" "AiRequestStatus" NOT NULL DEFAULT 'PENDING',
    "prompt" TEXT,
    "requestPayload" JSONB,
    "responseText" TEXT,
    "responsePayload" JSONB,
    "error" TEXT,
    "promptTokens" INTEGER NOT NULL DEFAULT 0,
    "completionTokens" INTEGER NOT NULL DEFAULT 0,
    "totalTokens" INTEGER NOT NULL DEFAULT 0,
    "costAmount" DECIMAL(14,4) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "requestedById" TEXT,
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiRequestLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiUsageRecord" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "requestLogId" TEXT,
    "feature" "AiFeatureArea" NOT NULL DEFAULT 'CORE',
    "operation" TEXT NOT NULL,
    "promptTokens" INTEGER NOT NULL DEFAULT 0,
    "completionTokens" INTEGER NOT NULL DEFAULT 0,
    "totalTokens" INTEGER NOT NULL DEFAULT 0,
    "costAmount" DECIMAL(14,4) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "usedById" TEXT,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiUsageRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AiProviderConfig_companyId_code_key" ON "AiProviderConfig"("companyId", "code");
CREATE INDEX "AiProviderConfig_companyId_idx" ON "AiProviderConfig"("companyId");
CREATE INDEX "AiProviderConfig_code_idx" ON "AiProviderConfig"("code");
CREATE INDEX "AiProviderConfig_type_idx" ON "AiProviderConfig"("type");
CREATE INDEX "AiProviderConfig_status_idx" ON "AiProviderConfig"("status");
CREATE INDEX "AiProviderConfig_isDefault_idx" ON "AiProviderConfig"("isDefault");
CREATE INDEX "AiProviderConfig_deletedAt_idx" ON "AiProviderConfig"("deletedAt");
CREATE INDEX "AiRequestLog_companyId_idx" ON "AiRequestLog"("companyId");
CREATE INDEX "AiRequestLog_providerId_idx" ON "AiRequestLog"("providerId");
CREATE INDEX "AiRequestLog_feature_idx" ON "AiRequestLog"("feature");
CREATE INDEX "AiRequestLog_operation_idx" ON "AiRequestLog"("operation");
CREATE INDEX "AiRequestLog_status_idx" ON "AiRequestLog"("status");
CREATE INDEX "AiRequestLog_requestedById_idx" ON "AiRequestLog"("requestedById");
CREATE INDEX "AiRequestLog_startedAt_idx" ON "AiRequestLog"("startedAt");
CREATE INDEX "AiRequestLog_deletedAt_idx" ON "AiRequestLog"("deletedAt");
CREATE INDEX "AiUsageRecord_companyId_idx" ON "AiUsageRecord"("companyId");
CREATE INDEX "AiUsageRecord_requestLogId_idx" ON "AiUsageRecord"("requestLogId");
CREATE INDEX "AiUsageRecord_feature_idx" ON "AiUsageRecord"("feature");
CREATE INDEX "AiUsageRecord_operation_idx" ON "AiUsageRecord"("operation");
CREATE INDEX "AiUsageRecord_usedById_idx" ON "AiUsageRecord"("usedById");
CREATE INDEX "AiUsageRecord_usedAt_idx" ON "AiUsageRecord"("usedAt");

-- AddForeignKey
ALTER TABLE "AiProviderConfig" ADD CONSTRAINT "AiProviderConfig_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AiRequestLog" ADD CONSTRAINT "AiRequestLog_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AiRequestLog" ADD CONSTRAINT "AiRequestLog_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AiProviderConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AiUsageRecord" ADD CONSTRAINT "AiUsageRecord_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AiUsageRecord" ADD CONSTRAINT "AiUsageRecord_requestLogId_fkey" FOREIGN KEY ("requestLogId") REFERENCES "AiRequestLog"("id") ON DELETE SET NULL ON UPDATE CASCADE;
