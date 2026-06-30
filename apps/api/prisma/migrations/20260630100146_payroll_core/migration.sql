-- CreateEnum
CREATE TYPE "SalaryComponentType" AS ENUM ('EARNING', 'DEDUCTION');

-- CreateEnum
CREATE TYPE "SalaryComponentCalculationType" AS ENUM ('FIXED', 'PERCENTAGE');

-- CreateEnum
CREATE TYPE "PayrollRunStatus" AS ENUM ('DRAFT', 'PROCESSING', 'APPROVED', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PayrollItemType" AS ENUM ('EARNING', 'DEDUCTION');

-- CreateEnum
CREATE TYPE "PayslipStatus" AS ENUM ('DRAFT', 'ISSUED', 'PAID', 'CANCELLED');

-- CreateTable
CREATE TABLE "SalaryComponent" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "SalaryComponentType" NOT NULL,
    "calculationType" "SalaryComponentCalculationType" NOT NULL DEFAULT 'FIXED',
    "defaultAmount" DECIMAL(12,2),
    "defaultPercent" DECIMAL(8,4),
    "isTaxable" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalaryComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollProfile" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "basicSalary" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "housingAllowance" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "transportAllowance" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "otherAllowance" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "bankName" TEXT,
    "bankIban" TEXT,
    "effectiveFrom" TIMESTAMP(3) NOT NULL,
    "effectiveTo" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PayrollProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollRun" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "status" "PayrollRunStatus" NOT NULL DEFAULT 'DRAFT',
    "startedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PayrollRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollItem" (
    "id" TEXT NOT NULL,
    "payrollRunId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "salaryComponentId" TEXT,
    "type" "PayrollItemType" NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PayrollItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payslip" (
    "id" TEXT NOT NULL,
    "payrollRunId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "grossEarnings" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "totalDeductions" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "netPay" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "status" "PayslipStatus" NOT NULL DEFAULT 'DRAFT',
    "issuedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payslip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SalaryComponent_companyId_idx" ON "SalaryComponent"("companyId");

-- CreateIndex
CREATE INDEX "SalaryComponent_type_idx" ON "SalaryComponent"("type");

-- CreateIndex
CREATE INDEX "SalaryComponent_isActive_idx" ON "SalaryComponent"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "SalaryComponent_companyId_code_key" ON "SalaryComponent"("companyId", "code");

-- CreateIndex
CREATE INDEX "PayrollProfile_employeeId_idx" ON "PayrollProfile"("employeeId");

-- CreateIndex
CREATE INDEX "PayrollProfile_effectiveFrom_idx" ON "PayrollProfile"("effectiveFrom");

-- CreateIndex
CREATE INDEX "PayrollProfile_effectiveTo_idx" ON "PayrollProfile"("effectiveTo");

-- CreateIndex
CREATE INDEX "PayrollRun_companyId_idx" ON "PayrollRun"("companyId");

-- CreateIndex
CREATE INDEX "PayrollRun_year_idx" ON "PayrollRun"("year");

-- CreateIndex
CREATE INDEX "PayrollRun_month_idx" ON "PayrollRun"("month");

-- CreateIndex
CREATE INDEX "PayrollRun_status_idx" ON "PayrollRun"("status");

-- CreateIndex
CREATE UNIQUE INDEX "PayrollRun_companyId_year_month_key" ON "PayrollRun"("companyId", "year", "month");

-- CreateIndex
CREATE INDEX "PayrollItem_payrollRunId_idx" ON "PayrollItem"("payrollRunId");

-- CreateIndex
CREATE INDEX "PayrollItem_employeeId_idx" ON "PayrollItem"("employeeId");

-- CreateIndex
CREATE INDEX "PayrollItem_salaryComponentId_idx" ON "PayrollItem"("salaryComponentId");

-- CreateIndex
CREATE INDEX "PayrollItem_type_idx" ON "PayrollItem"("type");

-- CreateIndex
CREATE INDEX "Payslip_payrollRunId_idx" ON "Payslip"("payrollRunId");

-- CreateIndex
CREATE INDEX "Payslip_employeeId_idx" ON "Payslip"("employeeId");

-- CreateIndex
CREATE INDEX "Payslip_status_idx" ON "Payslip"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Payslip_payrollRunId_employeeId_key" ON "Payslip"("payrollRunId", "employeeId");

-- AddForeignKey
ALTER TABLE "SalaryComponent" ADD CONSTRAINT "SalaryComponent_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollProfile" ADD CONSTRAINT "PayrollProfile_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollRun" ADD CONSTRAINT "PayrollRun_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollItem" ADD CONSTRAINT "PayrollItem_payrollRunId_fkey" FOREIGN KEY ("payrollRunId") REFERENCES "PayrollRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollItem" ADD CONSTRAINT "PayrollItem_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollItem" ADD CONSTRAINT "PayrollItem_salaryComponentId_fkey" FOREIGN KEY ("salaryComponentId") REFERENCES "SalaryComponent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payslip" ADD CONSTRAINT "Payslip_payrollRunId_fkey" FOREIGN KEY ("payrollRunId") REFERENCES "PayrollRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payslip" ADD CONSTRAINT "Payslip_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
