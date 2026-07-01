-- CreateEnum
CREATE TYPE "PerformanceCycleStatus" AS ENUM ('DRAFT', 'ACTIVE', 'CLOSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PerformanceReviewStatus" AS ENUM ('DRAFT', 'SELF_REVIEW', 'MANAGER_REVIEW', 'HR_REVIEW', 'APPROVED', 'REJECTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "PerformanceGoalStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PerformanceRating" AS ENUM ('OUTSTANDING', 'EXCEEDS_EXPECTATIONS', 'MEETS_EXPECTATIONS', 'NEEDS_IMPROVEMENT', 'UNSATISFACTORY');

-- CreateTable
CREATE TABLE "PerformanceCycle" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "PerformanceCycleStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jobPositionId" TEXT,

    CONSTRAINT "PerformanceCycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformanceGoal" (
    "id" TEXT NOT NULL,
    "cycleId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "weight" DECIMAL(6,2) NOT NULL DEFAULT 0,
    "targetValue" DECIMAL(12,2),
    "actualValue" DECIMAL(12,2),
    "status" "PerformanceGoalStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PerformanceGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformanceReview" (
    "id" TEXT NOT NULL,
    "cycleId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "managerId" TEXT,
    "status" "PerformanceReviewStatus" NOT NULL DEFAULT 'DRAFT',
    "selfScore" DECIMAL(6,2),
    "managerScore" DECIMAL(6,2),
    "finalScore" DECIMAL(6,2),
    "finalRating" "PerformanceRating",
    "selfComments" TEXT,
    "managerComments" TEXT,
    "hrComments" TEXT,
    "submittedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PerformanceReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformanceReviewItem" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "weight" DECIMAL(6,2) NOT NULL DEFAULT 0,
    "score" DECIMAL(6,2),
    "rating" "PerformanceRating",
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PerformanceReviewItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PerformanceCycle_companyId_idx" ON "PerformanceCycle"("companyId");

-- CreateIndex
CREATE INDEX "PerformanceCycle_status_idx" ON "PerformanceCycle"("status");

-- CreateIndex
CREATE INDEX "PerformanceCycle_startDate_idx" ON "PerformanceCycle"("startDate");

-- CreateIndex
CREATE INDEX "PerformanceCycle_endDate_idx" ON "PerformanceCycle"("endDate");

-- CreateIndex
CREATE UNIQUE INDEX "PerformanceCycle_companyId_code_key" ON "PerformanceCycle"("companyId", "code");

-- CreateIndex
CREATE INDEX "PerformanceGoal_cycleId_idx" ON "PerformanceGoal"("cycleId");

-- CreateIndex
CREATE INDEX "PerformanceGoal_employeeId_idx" ON "PerformanceGoal"("employeeId");

-- CreateIndex
CREATE INDEX "PerformanceGoal_status_idx" ON "PerformanceGoal"("status");

-- CreateIndex
CREATE INDEX "PerformanceReview_cycleId_idx" ON "PerformanceReview"("cycleId");

-- CreateIndex
CREATE INDEX "PerformanceReview_employeeId_idx" ON "PerformanceReview"("employeeId");

-- CreateIndex
CREATE INDEX "PerformanceReview_managerId_idx" ON "PerformanceReview"("managerId");

-- CreateIndex
CREATE INDEX "PerformanceReview_status_idx" ON "PerformanceReview"("status");

-- CreateIndex
CREATE UNIQUE INDEX "PerformanceReview_cycleId_employeeId_key" ON "PerformanceReview"("cycleId", "employeeId");

-- CreateIndex
CREATE INDEX "PerformanceReviewItem_reviewId_idx" ON "PerformanceReviewItem"("reviewId");

-- CreateIndex
CREATE INDEX "PerformanceReviewItem_rating_idx" ON "PerformanceReviewItem"("rating");

-- AddForeignKey
ALTER TABLE "PerformanceCycle" ADD CONSTRAINT "PerformanceCycle_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceCycle" ADD CONSTRAINT "PerformanceCycle_jobPositionId_fkey" FOREIGN KEY ("jobPositionId") REFERENCES "JobPosition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceGoal" ADD CONSTRAINT "PerformanceGoal_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "PerformanceCycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceGoal" ADD CONSTRAINT "PerformanceGoal_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceReview" ADD CONSTRAINT "PerformanceReview_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "PerformanceCycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceReview" ADD CONSTRAINT "PerformanceReview_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceReview" ADD CONSTRAINT "PerformanceReview_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceReviewItem" ADD CONSTRAINT "PerformanceReviewItem_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "PerformanceReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
