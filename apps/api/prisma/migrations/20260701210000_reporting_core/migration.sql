-- CreateEnum
CREATE TYPE "ReportDefinitionStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ReportParameterType" AS ENUM ('STRING', 'NUMBER', 'DATE', 'BOOLEAN', 'ENUM');

-- CreateEnum
CREATE TYPE "ReportExecutionStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "ReportExportFormat" AS ENUM ('JSON', 'CSV', 'EXCEL', 'PDF');

-- CreateTable
CREATE TABLE "ReportCategory" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReportCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportDefinition" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "categoryId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "module" TEXT NOT NULL,
    "handler" TEXT NOT NULL,
    "status" "ReportDefinitionStatus" NOT NULL DEFAULT 'ACTIVE',
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReportDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportParameter" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "ReportParameterType" NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "defaultValue" TEXT,
    "options" JSONB,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReportParameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportExecution" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "reportId" TEXT,
    "handler" TEXT NOT NULL,
    "status" "ReportExecutionStatus" NOT NULL DEFAULT 'PENDING',
    "format" "ReportExportFormat" NOT NULL DEFAULT 'JSON',
    "parameters" JSONB,
    "rowCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "error" TEXT,
    "executedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReportExecution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReportCategory_companyId_code_key" ON "ReportCategory"("companyId", "code");
CREATE INDEX "ReportCategory_companyId_idx" ON "ReportCategory"("companyId");
CREATE INDEX "ReportCategory_code_idx" ON "ReportCategory"("code");
CREATE UNIQUE INDEX "ReportDefinition_companyId_code_key" ON "ReportDefinition"("companyId", "code");
CREATE INDEX "ReportDefinition_companyId_idx" ON "ReportDefinition"("companyId");
CREATE INDEX "ReportDefinition_categoryId_idx" ON "ReportDefinition"("categoryId");
CREATE INDEX "ReportDefinition_module_idx" ON "ReportDefinition"("module");
CREATE INDEX "ReportDefinition_handler_idx" ON "ReportDefinition"("handler");
CREATE INDEX "ReportDefinition_status_idx" ON "ReportDefinition"("status");
CREATE UNIQUE INDEX "ReportParameter_reportId_code_key" ON "ReportParameter"("reportId", "code");
CREATE INDEX "ReportParameter_reportId_idx" ON "ReportParameter"("reportId");
CREATE INDEX "ReportParameter_type_idx" ON "ReportParameter"("type");
CREATE INDEX "ReportExecution_companyId_idx" ON "ReportExecution"("companyId");
CREATE INDEX "ReportExecution_reportId_idx" ON "ReportExecution"("reportId");
CREATE INDEX "ReportExecution_handler_idx" ON "ReportExecution"("handler");
CREATE INDEX "ReportExecution_status_idx" ON "ReportExecution"("status");
CREATE INDEX "ReportExecution_format_idx" ON "ReportExecution"("format");
CREATE INDEX "ReportExecution_createdAt_idx" ON "ReportExecution"("createdAt");

-- AddForeignKey
ALTER TABLE "ReportCategory" ADD CONSTRAINT "ReportCategory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReportDefinition" ADD CONSTRAINT "ReportDefinition_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReportDefinition" ADD CONSTRAINT "ReportDefinition_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ReportCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ReportParameter" ADD CONSTRAINT "ReportParameter_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ReportDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReportExecution" ADD CONSTRAINT "ReportExecution_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReportExecution" ADD CONSTRAINT "ReportExecution_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ReportDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
