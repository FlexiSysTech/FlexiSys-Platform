-- CreateEnum
CREATE TYPE "SalaryComponentCategory" AS ENUM ('BASIC_SALARY', 'ALLOWANCE', 'DEDUCTION', 'BONUS', 'COMMISSION', 'OVERTIME', 'LOAN', 'ADVANCE_SALARY', 'OTHER');

-- CreateEnum
CREATE TYPE "PayrollPeriodStatus" AS ENUM ('OPEN', 'LOCKED', 'CLOSED');

-- AlterEnum
ALTER TYPE "SalaryComponentCalculationType" ADD VALUE 'FORMULA';

-- AlterEnum
ALTER TYPE "PayrollRunStatus" ADD VALUE 'IN_REVIEW';
ALTER TYPE "PayrollRunStatus" ADD VALUE 'REJECTED';
ALTER TYPE "PayrollRunStatus" ADD VALUE 'LOCKED';

-- CreateTable
CREATE TABLE "PayrollPeriod" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "PayrollPeriodStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PayrollPeriod_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "SalaryComponent" ADD COLUMN "category" "SalaryComponentCategory" NOT NULL DEFAULT 'OTHER',
ADD COLUMN "formula" TEXT,
ADD COLUMN "affectsGross" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "affectsTaxable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "affectsNet" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "employerCost" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "displayOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PayrollRun" ADD COLUMN "periodId" TEXT,
ADD COLUMN "grossSalary" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN "taxableSalary" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN "totalDeductions" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN "netSalary" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN "employerCost" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN "reviewedAt" TIMESTAMP(3),
ADD COLUMN "reviewedById" TEXT,
ADD COLUMN "approvedById" TEXT,
ADD COLUMN "rejectedAt" TIMESTAMP(3),
ADD COLUMN "rejectedReason" TEXT,
ADD COLUMN "lockedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "PayrollItem" ADD COLUMN "category" "SalaryComponentCategory" NOT NULL DEFAULT 'OTHER',
ADD COLUMN "quantity" DECIMAL(12,4),
ADD COLUMN "rate" DECIMAL(12,4),
ADD COLUMN "taxableAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN "employerCost" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN "formula" TEXT,
ADD COLUMN "source" TEXT,
ADD COLUMN "sourceRef" TEXT,
ADD COLUMN "isSystemGenerated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Payslip" ADD COLUMN "taxableSalary" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN "employerCost" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN "currency" TEXT NOT NULL DEFAULT 'SAR',
ADD COLUMN "pdfPayload" JSONB,
ADD COLUMN "employeeVisible" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "PayrollPeriod_companyId_idx" ON "PayrollPeriod"("companyId");

-- CreateIndex
CREATE INDEX "PayrollPeriod_status_idx" ON "PayrollPeriod"("status");

-- CreateIndex
CREATE INDEX "PayrollPeriod_startDate_idx" ON "PayrollPeriod"("startDate");

-- CreateIndex
CREATE INDEX "PayrollPeriod_endDate_idx" ON "PayrollPeriod"("endDate");

-- CreateIndex
CREATE UNIQUE INDEX "PayrollPeriod_companyId_code_key" ON "PayrollPeriod"("companyId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "PayrollPeriod_companyId_startDate_endDate_key" ON "PayrollPeriod"("companyId", "startDate", "endDate");

-- CreateIndex
CREATE INDEX "SalaryComponent_category_idx" ON "SalaryComponent"("category");

-- CreateIndex
CREATE INDEX "PayrollRun_periodId_idx" ON "PayrollRun"("periodId");

-- CreateIndex
CREATE INDEX "PayrollRun_reviewedById_idx" ON "PayrollRun"("reviewedById");

-- CreateIndex
CREATE INDEX "PayrollRun_approvedById_idx" ON "PayrollRun"("approvedById");

-- CreateIndex
CREATE INDEX "PayrollItem_category_idx" ON "PayrollItem"("category");

-- CreateIndex
CREATE INDEX "PayrollItem_source_idx" ON "PayrollItem"("source");

-- AddForeignKey
ALTER TABLE "PayrollPeriod" ADD CONSTRAINT "PayrollPeriod_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollRun" ADD CONSTRAINT "PayrollRun_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "PayrollPeriod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollRun" ADD CONSTRAINT "PayrollRun_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollRun" ADD CONSTRAINT "PayrollRun_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
