-- CreateEnum
CREATE TYPE "BiKpiValueType" AS ENUM ('NUMBER', 'CURRENCY', 'PERCENTAGE', 'RATIO');

-- CreateEnum
CREATE TYPE "BiKpiStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BiAggregationPeriod" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY');

-- CreateTable
CREATE TABLE "BiKpiDefinition" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "companyId" TEXT,
    "branchId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "valueType" "BiKpiValueType" NOT NULL DEFAULT 'NUMBER',
    "formula" TEXT,
    "targetValue" DECIMAL(18,4),
    "warningValue" DECIMAL(18,4),
    "criticalValue" DECIMAL(18,4),
    "unit" TEXT,
    "status" "BiKpiStatus" NOT NULL DEFAULT 'ACTIVE',
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BiKpiDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BiKpiSnapshot" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "companyId" TEXT,
    "branchId" TEXT,
    "kpiId" TEXT NOT NULL,
    "period" "BiAggregationPeriod" NOT NULL DEFAULT 'MONTHLY',
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "value" DECIMAL(18,4) NOT NULL,
    "targetValue" DECIMAL(18,4),
    "variance" DECIMAL(18,4),
    "source" TEXT,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BiKpiSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BiKpiDefinition_tenantId_companyId_code_key" ON "BiKpiDefinition"("tenantId", "companyId", "code");
CREATE INDEX "BiKpiDefinition_tenantId_idx" ON "BiKpiDefinition"("tenantId");
CREATE INDEX "BiKpiDefinition_companyId_idx" ON "BiKpiDefinition"("companyId");
CREATE INDEX "BiKpiDefinition_branchId_idx" ON "BiKpiDefinition"("branchId");
CREATE INDEX "BiKpiDefinition_category_idx" ON "BiKpiDefinition"("category");
CREATE INDEX "BiKpiDefinition_status_idx" ON "BiKpiDefinition"("status");
CREATE INDEX "BiKpiDefinition_deletedAt_idx" ON "BiKpiDefinition"("deletedAt");
CREATE UNIQUE INDEX "BiKpiSnapshot_kpiId_period_periodStart_companyId_branchId_key" ON "BiKpiSnapshot"("kpiId", "period", "periodStart", "companyId", "branchId");
CREATE INDEX "BiKpiSnapshot_tenantId_idx" ON "BiKpiSnapshot"("tenantId");
CREATE INDEX "BiKpiSnapshot_companyId_idx" ON "BiKpiSnapshot"("companyId");
CREATE INDEX "BiKpiSnapshot_branchId_idx" ON "BiKpiSnapshot"("branchId");
CREATE INDEX "BiKpiSnapshot_kpiId_idx" ON "BiKpiSnapshot"("kpiId");
CREATE INDEX "BiKpiSnapshot_period_idx" ON "BiKpiSnapshot"("period");
CREATE INDEX "BiKpiSnapshot_periodStart_idx" ON "BiKpiSnapshot"("periodStart");
CREATE INDEX "BiKpiSnapshot_periodEnd_idx" ON "BiKpiSnapshot"("periodEnd");
CREATE INDEX "BiKpiSnapshot_calculatedAt_idx" ON "BiKpiSnapshot"("calculatedAt");

-- AddForeignKey
ALTER TABLE "BiKpiDefinition" ADD CONSTRAINT "BiKpiDefinition_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiKpiDefinition" ADD CONSTRAINT "BiKpiDefinition_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiKpiDefinition" ADD CONSTRAINT "BiKpiDefinition_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BiKpiSnapshot" ADD CONSTRAINT "BiKpiSnapshot_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiKpiSnapshot" ADD CONSTRAINT "BiKpiSnapshot_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiKpiSnapshot" ADD CONSTRAINT "BiKpiSnapshot_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BiKpiSnapshot" ADD CONSTRAINT "BiKpiSnapshot_kpiId_fkey" FOREIGN KEY ("kpiId") REFERENCES "BiKpiDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
