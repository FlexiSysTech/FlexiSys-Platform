-- CreateEnum
CREATE TYPE "PublicApiRateLimitWindow" AS ENUM ('MINUTE', 'HOUR', 'DAY', 'MONTH');

-- CreateTable
CREATE TABLE "PublicApiRateLimitPolicy" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "applicationId" TEXT,
    "apiId" TEXT,
    "endpoint" TEXT,
    "name" TEXT NOT NULL,
    "limitValue" INTEGER NOT NULL,
    "window" "PublicApiRateLimitWindow" NOT NULL DEFAULT 'MINUTE',
    "status" "PublicApiStatus" NOT NULL DEFAULT 'ACTIVE',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicApiRateLimitPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicApiUsageCounter" (
    "id" TEXT NOT NULL,
    "counterKey" TEXT NOT NULL,
    "tenantId" TEXT,
    "applicationId" TEXT,
    "apiId" TEXT,
    "endpoint" TEXT,
    "window" "PublicApiRateLimitWindow" NOT NULL,
    "windowStart" TIMESTAMP(3) NOT NULL,
    "windowEnd" TIMESTAMP(3) NOT NULL,
    "requestCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicApiUsageCounter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PublicApiRateLimitPolicy_tenantId_idx" ON "PublicApiRateLimitPolicy"("tenantId");
CREATE INDEX "PublicApiRateLimitPolicy_applicationId_idx" ON "PublicApiRateLimitPolicy"("applicationId");
CREATE INDEX "PublicApiRateLimitPolicy_apiId_idx" ON "PublicApiRateLimitPolicy"("apiId");
CREATE INDEX "PublicApiRateLimitPolicy_endpoint_idx" ON "PublicApiRateLimitPolicy"("endpoint");
CREATE INDEX "PublicApiRateLimitPolicy_window_idx" ON "PublicApiRateLimitPolicy"("window");
CREATE INDEX "PublicApiRateLimitPolicy_status_idx" ON "PublicApiRateLimitPolicy"("status");
CREATE INDEX "PublicApiRateLimitPolicy_deletedAt_idx" ON "PublicApiRateLimitPolicy"("deletedAt");
CREATE UNIQUE INDEX "PublicApiUsageCounter_counterKey_key" ON "PublicApiUsageCounter"("counterKey");
CREATE INDEX "PublicApiUsageCounter_tenantId_idx" ON "PublicApiUsageCounter"("tenantId");
CREATE INDEX "PublicApiUsageCounter_applicationId_idx" ON "PublicApiUsageCounter"("applicationId");
CREATE INDEX "PublicApiUsageCounter_apiId_idx" ON "PublicApiUsageCounter"("apiId");
CREATE INDEX "PublicApiUsageCounter_endpoint_idx" ON "PublicApiUsageCounter"("endpoint");
CREATE INDEX "PublicApiUsageCounter_window_idx" ON "PublicApiUsageCounter"("window");
CREATE INDEX "PublicApiUsageCounter_windowStart_idx" ON "PublicApiUsageCounter"("windowStart");
CREATE INDEX "PublicApiUsageCounter_windowEnd_idx" ON "PublicApiUsageCounter"("windowEnd");

-- AddForeignKey
ALTER TABLE "PublicApiRateLimitPolicy" ADD CONSTRAINT "PublicApiRateLimitPolicy_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PublicApiRateLimitPolicy" ADD CONSTRAINT "PublicApiRateLimitPolicy_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "PublicApiApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PublicApiRateLimitPolicy" ADD CONSTRAINT "PublicApiRateLimitPolicy_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "PublicApiRegistry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PublicApiUsageCounter" ADD CONSTRAINT "PublicApiUsageCounter_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PublicApiUsageCounter" ADD CONSTRAINT "PublicApiUsageCounter_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "PublicApiApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PublicApiUsageCounter" ADD CONSTRAINT "PublicApiUsageCounter_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "PublicApiRegistry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
