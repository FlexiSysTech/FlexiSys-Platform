-- CreateEnum
CREATE TYPE "BiPredictionModelType" AS ENUM ('LINEAR_TREND', 'MOVING_AVERAGE', 'SEASONAL_BASELINE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "BiPredictionStatus" AS ENUM ('DRAFT', 'ACTIVE', 'RETIRED');

-- CreateEnum
CREATE TYPE "BiPredictionRunStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED');

-- CreateTable
CREATE TABLE "BiPredictionModel" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "companyId" TEXT,
    "branchId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "modelType" "BiPredictionModelType" NOT NULL DEFAULT 'LINEAR_TREND',
    "targetType" TEXT NOT NULL,
    "targetId" TEXT,
    "horizonDays" INTEGER NOT NULL DEFAULT 30,
    "confidence" DECIMAL(8,4),
    "status" "BiPredictionStatus" NOT NULL DEFAULT 'DRAFT',
    "config" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BiPredictionModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BiPredictionRun" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "companyId" TEXT,
    "branchId" TEXT,
    "modelId" TEXT NOT NULL,
    "status" "BiPredictionRunStatus" NOT NULL DEFAULT 'PENDING',
    "inputWindowStart" TIMESTAMP(3),
    "inputWindowEnd" TIMESTAMP(3),
    "forecastStart" TIMESTAMP(3) NOT NULL,
    "forecastEnd" TIMESTAMP(3) NOT NULL,
    "predictedValue" DECIMAL(18,4),
    "confidence" DECIMAL(8,4),
    "result" JSONB,
    "error" TEXT,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BiPredictionRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BiPredictionModel_tenantId_companyId_code_key" ON "BiPredictionModel"("tenantId", "companyId", "code");
CREATE INDEX "BiPredictionModel_tenantId_idx" ON "BiPredictionModel"("tenantId");
CREATE INDEX "BiPredictionModel_companyId_idx" ON "BiPredictionModel"("companyId");
CREATE INDEX "BiPredictionModel_branchId_idx" ON "BiPredictionModel"("branchId");
CREATE INDEX "BiPredictionModel_modelType_idx" ON "BiPredictionModel"("modelType");
CREATE INDEX "BiPredictionModel_targetType_idx" ON "BiPredictionModel"("targetType");
CREATE INDEX "BiPredictionModel_targetId_idx" ON "BiPredictionModel"("targetId");
CREATE INDEX "BiPredictionModel_status_idx" ON "BiPredictionModel"("status");
CREATE INDEX "BiPredictionModel_deletedAt_idx" ON "BiPredictionModel"("deletedAt");
CREATE INDEX "BiPredictionRun_tenantId_idx" ON "BiPredictionRun"("tenantId");
CREATE INDEX "BiPredictionRun_companyId_idx" ON "BiPredictionRun"("companyId");
CREATE INDEX "BiPredictionRun_branchId_idx" ON "BiPredictionRun"("branchId");
CREATE INDEX "BiPredictionRun_modelId_idx" ON "BiPredictionRun"("modelId");
CREATE INDEX "BiPredictionRun_status_idx" ON "BiPredictionRun"("status");
CREATE INDEX "BiPredictionRun_forecastStart_idx" ON "BiPredictionRun"("forecastStart");
CREATE INDEX "BiPredictionRun_forecastEnd_idx" ON "BiPredictionRun"("forecastEnd");
CREATE INDEX "BiPredictionRun_executedAt_idx" ON "BiPredictionRun"("executedAt");

-- AddForeignKey
ALTER TABLE "BiPredictionModel" ADD CONSTRAINT "BiPredictionModel_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiPredictionModel" ADD CONSTRAINT "BiPredictionModel_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiPredictionModel" ADD CONSTRAINT "BiPredictionModel_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BiPredictionRun" ADD CONSTRAINT "BiPredictionRun_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiPredictionRun" ADD CONSTRAINT "BiPredictionRun_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiPredictionRun" ADD CONSTRAINT "BiPredictionRun_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BiPredictionRun" ADD CONSTRAINT "BiPredictionRun_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "BiPredictionModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
