-- CreateEnum
CREATE TYPE "BiDatasetStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BiMetricType" AS ENUM ('COUNT', 'SUM', 'AVERAGE', 'MIN', 'MAX', 'CUSTOM');

-- CreateEnum
CREATE TYPE "BiExecutionStatus" AS ENUM ('PENDING', 'RUNNING', 'SUCCEEDED', 'FAILED');

-- CreateTable
CREATE TABLE "BiDataset" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "companyId" TEXT,
    "branchId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "source" TEXT NOT NULL,
    "entityType" TEXT,
    "refreshCron" TEXT,
    "status" "BiDatasetStatus" NOT NULL DEFAULT 'ACTIVE',
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BiDataset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BiMetricDefinition" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "companyId" TEXT,
    "branchId" TEXT,
    "datasetId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "metricType" "BiMetricType" NOT NULL DEFAULT 'COUNT',
    "expression" TEXT,
    "valueType" "BiKpiValueType" NOT NULL DEFAULT 'NUMBER',
    "status" "BiDatasetStatus" NOT NULL DEFAULT 'ACTIVE',
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BiMetricDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BiMetricObservation" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "companyId" TEXT,
    "branchId" TEXT,
    "metricId" TEXT NOT NULL,
    "period" "BiAggregationPeriod" NOT NULL DEFAULT 'MONTHLY',
    "observedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DECIMAL(18,4) NOT NULL,
    "dimensions" JSONB,
    "metadata" JSONB,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BiMetricObservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BiAnalyticsExecution" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "companyId" TEXT,
    "branchId" TEXT,
    "datasetId" TEXT,
    "executionType" TEXT NOT NULL,
    "status" "BiExecutionStatus" NOT NULL DEFAULT 'PENDING',
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "durationMs" INTEGER,
    "result" JSONB,
    "error" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BiAnalyticsExecution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BiDataset_tenantId_companyId_code_key" ON "BiDataset"("tenantId", "companyId", "code");
CREATE INDEX "BiDataset_tenantId_idx" ON "BiDataset"("tenantId");
CREATE INDEX "BiDataset_companyId_idx" ON "BiDataset"("companyId");
CREATE INDEX "BiDataset_branchId_idx" ON "BiDataset"("branchId");
CREATE INDEX "BiDataset_source_idx" ON "BiDataset"("source");
CREATE INDEX "BiDataset_entityType_idx" ON "BiDataset"("entityType");
CREATE INDEX "BiDataset_status_idx" ON "BiDataset"("status");
CREATE INDEX "BiDataset_deletedAt_idx" ON "BiDataset"("deletedAt");
CREATE UNIQUE INDEX "BiMetricDefinition_tenantId_companyId_code_key" ON "BiMetricDefinition"("tenantId", "companyId", "code");
CREATE INDEX "BiMetricDefinition_tenantId_idx" ON "BiMetricDefinition"("tenantId");
CREATE INDEX "BiMetricDefinition_companyId_idx" ON "BiMetricDefinition"("companyId");
CREATE INDEX "BiMetricDefinition_branchId_idx" ON "BiMetricDefinition"("branchId");
CREATE INDEX "BiMetricDefinition_datasetId_idx" ON "BiMetricDefinition"("datasetId");
CREATE INDEX "BiMetricDefinition_metricType_idx" ON "BiMetricDefinition"("metricType");
CREATE INDEX "BiMetricDefinition_status_idx" ON "BiMetricDefinition"("status");
CREATE INDEX "BiMetricDefinition_deletedAt_idx" ON "BiMetricDefinition"("deletedAt");
CREATE INDEX "BiMetricObservation_tenantId_idx" ON "BiMetricObservation"("tenantId");
CREATE INDEX "BiMetricObservation_companyId_idx" ON "BiMetricObservation"("companyId");
CREATE INDEX "BiMetricObservation_branchId_idx" ON "BiMetricObservation"("branchId");
CREATE INDEX "BiMetricObservation_metricId_idx" ON "BiMetricObservation"("metricId");
CREATE INDEX "BiMetricObservation_period_idx" ON "BiMetricObservation"("period");
CREATE INDEX "BiMetricObservation_observedAt_idx" ON "BiMetricObservation"("observedAt");
CREATE INDEX "BiAnalyticsExecution_tenantId_idx" ON "BiAnalyticsExecution"("tenantId");
CREATE INDEX "BiAnalyticsExecution_companyId_idx" ON "BiAnalyticsExecution"("companyId");
CREATE INDEX "BiAnalyticsExecution_branchId_idx" ON "BiAnalyticsExecution"("branchId");
CREATE INDEX "BiAnalyticsExecution_datasetId_idx" ON "BiAnalyticsExecution"("datasetId");
CREATE INDEX "BiAnalyticsExecution_executionType_idx" ON "BiAnalyticsExecution"("executionType");
CREATE INDEX "BiAnalyticsExecution_status_idx" ON "BiAnalyticsExecution"("status");
CREATE INDEX "BiAnalyticsExecution_startedAt_idx" ON "BiAnalyticsExecution"("startedAt");
CREATE INDEX "BiAnalyticsExecution_createdAt_idx" ON "BiAnalyticsExecution"("createdAt");

-- AddForeignKey
ALTER TABLE "BiDataset" ADD CONSTRAINT "BiDataset_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiDataset" ADD CONSTRAINT "BiDataset_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiDataset" ADD CONSTRAINT "BiDataset_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BiMetricDefinition" ADD CONSTRAINT "BiMetricDefinition_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiMetricDefinition" ADD CONSTRAINT "BiMetricDefinition_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiMetricDefinition" ADD CONSTRAINT "BiMetricDefinition_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BiMetricDefinition" ADD CONSTRAINT "BiMetricDefinition_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "BiDataset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BiMetricObservation" ADD CONSTRAINT "BiMetricObservation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiMetricObservation" ADD CONSTRAINT "BiMetricObservation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiMetricObservation" ADD CONSTRAINT "BiMetricObservation_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BiMetricObservation" ADD CONSTRAINT "BiMetricObservation_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "BiMetricDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiAnalyticsExecution" ADD CONSTRAINT "BiAnalyticsExecution_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiAnalyticsExecution" ADD CONSTRAINT "BiAnalyticsExecution_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiAnalyticsExecution" ADD CONSTRAINT "BiAnalyticsExecution_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BiAnalyticsExecution" ADD CONSTRAINT "BiAnalyticsExecution_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "BiDataset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
