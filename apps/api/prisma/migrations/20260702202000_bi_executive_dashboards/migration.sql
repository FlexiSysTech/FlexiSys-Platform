-- CreateEnum
CREATE TYPE "BiDashboardStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BiDashboardWidgetType" AS ENUM ('KPI', 'CHART', 'TABLE', 'TREND', 'FORECAST');

-- CreateTable
CREATE TABLE "BiDashboard" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "companyId" TEXT,
    "branchId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "audience" TEXT NOT NULL DEFAULT 'EXECUTIVE',
    "status" "BiDashboardStatus" NOT NULL DEFAULT 'DRAFT',
    "layout" JSONB,
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BiDashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BiDashboardWidget" (
    "id" TEXT NOT NULL,
    "dashboardId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "widgetType" "BiDashboardWidgetType" NOT NULL,
    "dataSource" TEXT,
    "config" JSONB,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BiDashboardWidget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BiDashboard_tenantId_companyId_code_key" ON "BiDashboard"("tenantId", "companyId", "code");
CREATE INDEX "BiDashboard_tenantId_idx" ON "BiDashboard"("tenantId");
CREATE INDEX "BiDashboard_companyId_idx" ON "BiDashboard"("companyId");
CREATE INDEX "BiDashboard_branchId_idx" ON "BiDashboard"("branchId");
CREATE INDEX "BiDashboard_audience_idx" ON "BiDashboard"("audience");
CREATE INDEX "BiDashboard_status_idx" ON "BiDashboard"("status");
CREATE INDEX "BiDashboard_deletedAt_idx" ON "BiDashboard"("deletedAt");
CREATE UNIQUE INDEX "BiDashboardWidget_dashboardId_code_key" ON "BiDashboardWidget"("dashboardId", "code");
CREATE INDEX "BiDashboardWidget_dashboardId_idx" ON "BiDashboardWidget"("dashboardId");
CREATE INDEX "BiDashboardWidget_widgetType_idx" ON "BiDashboardWidget"("widgetType");
CREATE INDEX "BiDashboardWidget_position_idx" ON "BiDashboardWidget"("position");

-- AddForeignKey
ALTER TABLE "BiDashboard" ADD CONSTRAINT "BiDashboard_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiDashboard" ADD CONSTRAINT "BiDashboard_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BiDashboard" ADD CONSTRAINT "BiDashboard_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BiDashboardWidget" ADD CONSTRAINT "BiDashboardWidget_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "BiDashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
