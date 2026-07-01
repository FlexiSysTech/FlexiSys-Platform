-- CreateEnum
CREATE TYPE "InterviewEvaluationRecommendation" AS ENUM ('HIRE', 'HOLD', 'REJECT');

-- CreateTable
CREATE TABLE "InterviewEvaluation" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "evaluatorId" TEXT,
    "criteria" TEXT NOT NULL,
    "score" DECIMAL(5,2) NOT NULL,
    "recommendation" "InterviewEvaluationRecommendation",
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InterviewEvaluation_interviewId_idx" ON "InterviewEvaluation"("interviewId");

-- CreateIndex
CREATE INDEX "InterviewEvaluation_evaluatorId_idx" ON "InterviewEvaluation"("evaluatorId");

-- CreateIndex
CREATE INDEX "InterviewEvaluation_recommendation_idx" ON "InterviewEvaluation"("recommendation");

-- AddForeignKey
ALTER TABLE "InterviewEvaluation" ADD CONSTRAINT "InterviewEvaluation_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewEvaluation" ADD CONSTRAINT "InterviewEvaluation_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
