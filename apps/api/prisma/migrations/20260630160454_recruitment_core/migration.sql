-- CreateEnum
CREATE TYPE "RecruitmentStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "VacancyStatus" AS ENUM ('DRAFT', 'OPEN', 'CLOSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ApplicantStatus" AS ENUM ('NEW', 'SCREENING', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED');

-- CreateEnum
CREATE TYPE "JobApplicationStatus" AS ENUM ('APPLIED', 'SCREENING', 'SHORTLISTED', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'CANCELLED');

-- CreateTable
CREATE TABLE "JobPosition" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "RecruitmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "jobPositionId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "openings" INTEGER NOT NULL DEFAULT 1,
    "status" "VacancyStatus" NOT NULL DEFAULT 'DRAFT',
    "openedAt" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applicant" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "nationalId" TEXT,
    "nationality" TEXT,
    "currentCompany" TEXT,
    "currentTitle" TEXT,
    "resumeUrl" TEXT,
    "status" "ApplicantStatus" NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Applicant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "vacancyId" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "employeeId" TEXT,
    "status" "JobApplicationStatus" NOT NULL DEFAULT 'APPLIED',
    "source" TEXT,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hiredAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "interviewerId" TEXT,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "meetingUrl" TEXT,
    "status" "InterviewStatus" NOT NULL DEFAULT 'SCHEDULED',
    "score" DECIMAL(5,2),
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferLetter" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "salaryAmount" DECIMAL(12,2),
    "startDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "status" "OfferStatus" NOT NULL DEFAULT 'DRAFT',
    "sentAt" TIMESTAMP(3),
    "acceptedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfferLetter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JobPosition_companyId_idx" ON "JobPosition"("companyId");

-- CreateIndex
CREATE INDEX "JobPosition_status_idx" ON "JobPosition"("status");

-- CreateIndex
CREATE UNIQUE INDEX "JobPosition_companyId_code_key" ON "JobPosition"("companyId", "code");

-- CreateIndex
CREATE INDEX "Vacancy_companyId_idx" ON "Vacancy"("companyId");

-- CreateIndex
CREATE INDEX "Vacancy_jobPositionId_idx" ON "Vacancy"("jobPositionId");

-- CreateIndex
CREATE INDEX "Vacancy_status_idx" ON "Vacancy"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Vacancy_companyId_code_key" ON "Vacancy"("companyId", "code");

-- CreateIndex
CREATE INDEX "Applicant_email_idx" ON "Applicant"("email");

-- CreateIndex
CREATE INDEX "Applicant_phone_idx" ON "Applicant"("phone");

-- CreateIndex
CREATE INDEX "Applicant_status_idx" ON "Applicant"("status");

-- CreateIndex
CREATE INDEX "JobApplication_vacancyId_idx" ON "JobApplication"("vacancyId");

-- CreateIndex
CREATE INDEX "JobApplication_applicantId_idx" ON "JobApplication"("applicantId");

-- CreateIndex
CREATE INDEX "JobApplication_employeeId_idx" ON "JobApplication"("employeeId");

-- CreateIndex
CREATE INDEX "JobApplication_status_idx" ON "JobApplication"("status");

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_vacancyId_applicantId_key" ON "JobApplication"("vacancyId", "applicantId");

-- CreateIndex
CREATE INDEX "Interview_applicationId_idx" ON "Interview"("applicationId");

-- CreateIndex
CREATE INDEX "Interview_interviewerId_idx" ON "Interview"("interviewerId");

-- CreateIndex
CREATE INDEX "Interview_scheduledAt_idx" ON "Interview"("scheduledAt");

-- CreateIndex
CREATE INDEX "Interview_status_idx" ON "Interview"("status");

-- CreateIndex
CREATE INDEX "OfferLetter_applicationId_idx" ON "OfferLetter"("applicationId");

-- CreateIndex
CREATE INDEX "OfferLetter_status_idx" ON "OfferLetter"("status");

-- AddForeignKey
ALTER TABLE "JobPosition" ADD CONSTRAINT "JobPosition_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_jobPositionId_fkey" FOREIGN KEY ("jobPositionId") REFERENCES "JobPosition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "JobApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferLetter" ADD CONSTRAINT "OfferLetter_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "JobApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
