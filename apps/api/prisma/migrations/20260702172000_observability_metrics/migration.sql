-- CreateEnum
CREATE TYPE "ObservabilityMetricType" AS ENUM ('HTTP', 'DATABASE', 'WORKFLOW', 'PAYROLL', 'BUSINESS_RULES', 'CUSTOM');

-- CreateEnum
CREATE TYPE "ObservabilityMetricUnit" AS ENUM ('COUNT', 'MILLISECONDS', 'PERCENT', 'BYTES', 'VALUE');

-- CreateTable
CREATE TABLE "ObservabilityMetricDefinition" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,
    "metricType" "ObservabilityMetricType" NOT NULL,
    "unit" "ObservabilityMetricUnit" NOT NULL DEFAULT 'VALUE',
    "status" "ObservabilityProviderStatus" NOT NULL DEFAULT 'ACTIVE',
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ObservabilityMetricDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObservabilityMetricSample" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "definitionId" TEXT,
    "metricType" "ObservabilityMetricType" NOT NULL,
    "moduleName" TEXT NOT NULL,
    "metricName" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" "ObservabilityMetricUnit" NOT NULL DEFAULT 'VALUE',
    "endpoint" TEXT,
    "statusCode" INTEGER,
    "durationMs" INTEGER,
    "labels" JSONB,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ObservabilityMetricSample_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ObservabilityMetricDefinition_tenantId_code_key" ON "ObservabilityMetricDefinition"("tenantId", "code");
CREATE INDEX "ObservabilityMetricDefinition_tenantId_idx" ON "ObservabilityMetricDefinition"("tenantId");
CREATE INDEX "ObservabilityMetricDefinition_code_idx" ON "ObservabilityMetricDefinition"("code");
CREATE INDEX "ObservabilityMetricDefinition_moduleName_idx" ON "ObservabilityMetricDefinition"("moduleName");
CREATE INDEX "ObservabilityMetricDefinition_metricType_idx" ON "ObservabilityMetricDefinition"("metricType");
CREATE INDEX "ObservabilityMetricDefinition_status_idx" ON "ObservabilityMetricDefinition"("status");
CREATE INDEX "ObservabilityMetricDefinition_deletedAt_idx" ON "ObservabilityMetricDefinition"("deletedAt");
CREATE INDEX "ObservabilityMetricSample_tenantId_idx" ON "ObservabilityMetricSample"("tenantId");
CREATE INDEX "ObservabilityMetricSample_definitionId_idx" ON "ObservabilityMetricSample"("definitionId");
CREATE INDEX "ObservabilityMetricSample_metricType_idx" ON "ObservabilityMetricSample"("metricType");
CREATE INDEX "ObservabilityMetricSample_moduleName_idx" ON "ObservabilityMetricSample"("moduleName");
CREATE INDEX "ObservabilityMetricSample_metricName_idx" ON "ObservabilityMetricSample"("metricName");
CREATE INDEX "ObservabilityMetricSample_endpoint_idx" ON "ObservabilityMetricSample"("endpoint");
CREATE INDEX "ObservabilityMetricSample_statusCode_idx" ON "ObservabilityMetricSample"("statusCode");
CREATE INDEX "ObservabilityMetricSample_recordedAt_idx" ON "ObservabilityMetricSample"("recordedAt");

-- AddForeignKey
ALTER TABLE "ObservabilityMetricDefinition" ADD CONSTRAINT "ObservabilityMetricDefinition_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ObservabilityMetricSample" ADD CONSTRAINT "ObservabilityMetricSample_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ObservabilityMetricSample" ADD CONSTRAINT "ObservabilityMetricSample_definitionId_fkey" FOREIGN KEY ("definitionId") REFERENCES "ObservabilityMetricDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
