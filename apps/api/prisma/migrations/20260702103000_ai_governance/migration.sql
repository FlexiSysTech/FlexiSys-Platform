-- CreateEnum
CREATE TYPE "AiGovernanceStatus" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateTable
CREATE TABLE "AiUsageLimit" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "feature" "AiFeatureArea",
    "status" "AiGovernanceStatus" NOT NULL DEFAULT 'DRAFT',
    "monthlyTokenLimit" INTEGER,
    "monthlyCostLimit" DECIMAL(14,4),
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiUsageLimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiSafetyPolicy" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "AiGovernanceStatus" NOT NULL DEFAULT 'DRAFT',
    "blockedTerms" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiSafetyPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AiUsageLimit_companyId_idx" ON "AiUsageLimit"("companyId");
CREATE INDEX "AiUsageLimit_feature_idx" ON "AiUsageLimit"("feature");
CREATE INDEX "AiUsageLimit_status_idx" ON "AiUsageLimit"("status");
CREATE INDEX "AiUsageLimit_deletedAt_idx" ON "AiUsageLimit"("deletedAt");
CREATE UNIQUE INDEX "AiSafetyPolicy_companyId_code_key" ON "AiSafetyPolicy"("companyId", "code");
CREATE INDEX "AiSafetyPolicy_companyId_idx" ON "AiSafetyPolicy"("companyId");
CREATE INDEX "AiSafetyPolicy_code_idx" ON "AiSafetyPolicy"("code");
CREATE INDEX "AiSafetyPolicy_status_idx" ON "AiSafetyPolicy"("status");
CREATE INDEX "AiSafetyPolicy_deletedAt_idx" ON "AiSafetyPolicy"("deletedAt");

-- AddForeignKey
ALTER TABLE "AiUsageLimit" ADD CONSTRAINT "AiUsageLimit_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AiSafetyPolicy" ADD CONSTRAINT "AiSafetyPolicy_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
