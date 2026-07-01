-- CreateEnum
CREATE TYPE "SelfServiceRequestType" AS ENUM ('PROFILE_UPDATE', 'DOCUMENT_REQUEST', 'ASSET_REQUEST', 'PAYSLIP_REQUEST', 'GENERAL');

-- CreateEnum
CREATE TYPE "SelfServiceRequestStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateTable
CREATE TABLE "SelfServiceRequest" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "type" "SelfServiceRequestType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "SelfServiceRequestStatus" NOT NULL DEFAULT 'DRAFT',
    "payload" JSONB,
    "response" TEXT,
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT,
    "jobPositionId" TEXT,
    "assetCategoryId" TEXT,
    "documentCategoryId" TEXT,

    CONSTRAINT "SelfServiceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SelfServiceRequest_employeeId_idx" ON "SelfServiceRequest"("employeeId");

-- CreateIndex
CREATE INDEX "SelfServiceRequest_type_idx" ON "SelfServiceRequest"("type");

-- CreateIndex
CREATE INDEX "SelfServiceRequest_status_idx" ON "SelfServiceRequest"("status");

-- CreateIndex
CREATE INDEX "SelfServiceRequest_submittedAt_idx" ON "SelfServiceRequest"("submittedAt");

-- AddForeignKey
ALTER TABLE "SelfServiceRequest" ADD CONSTRAINT "SelfServiceRequest_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelfServiceRequest" ADD CONSTRAINT "SelfServiceRequest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelfServiceRequest" ADD CONSTRAINT "SelfServiceRequest_jobPositionId_fkey" FOREIGN KEY ("jobPositionId") REFERENCES "JobPosition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelfServiceRequest" ADD CONSTRAINT "SelfServiceRequest_assetCategoryId_fkey" FOREIGN KEY ("assetCategoryId") REFERENCES "AssetCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelfServiceRequest" ADD CONSTRAINT "SelfServiceRequest_documentCategoryId_fkey" FOREIGN KEY ("documentCategoryId") REFERENCES "DocumentCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
