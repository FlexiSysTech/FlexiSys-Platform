-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('IN_APP', 'EMAIL', 'WHATSAPP', 'PUSH', 'SMS');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED', 'READ', 'CANCELLED');

-- CreateEnum
CREATE TYPE "WorkflowStatus" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "WorkflowRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "WorkflowStepStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SKIPPED');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "employeeId" TEXT,
    "channel" "NotificationChannel" NOT NULL DEFAULT 'IN_APP',
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" JSONB,
    "scheduledAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jobPositionId" TEXT,
    "assetCategoryId" TEXT,
    "documentCategoryId" TEXT,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowDefinition" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "entityType" TEXT NOT NULL,
    "status" "WorkflowStatus" NOT NULL DEFAULT 'DRAFT',
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowDefinitionStep" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "stepOrder" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "approverRoleId" TEXT,
    "approverUserId" TEXT,
    "approverEmployeeId" TEXT,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowDefinitionStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowRequest" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "requesterId" TEXT,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "WorkflowRequestStatus" NOT NULL DEFAULT 'PENDING',
    "payload" JSONB,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowStep" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "stepOrder" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "approverId" TEXT,
    "status" "WorkflowStepStatus" NOT NULL DEFAULT 'PENDING',
    "comments" TEXT,
    "actedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowStep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Notification_companyId_idx" ON "Notification"("companyId");

-- CreateIndex
CREATE INDEX "Notification_employeeId_idx" ON "Notification"("employeeId");

-- CreateIndex
CREATE INDEX "Notification_channel_idx" ON "Notification"("channel");

-- CreateIndex
CREATE INDEX "Notification_status_idx" ON "Notification"("status");

-- CreateIndex
CREATE INDEX "Notification_scheduledAt_idx" ON "Notification"("scheduledAt");

-- CreateIndex
CREATE INDEX "WorkflowDefinition_companyId_idx" ON "WorkflowDefinition"("companyId");

-- CreateIndex
CREATE INDEX "WorkflowDefinition_entityType_idx" ON "WorkflowDefinition"("entityType");

-- CreateIndex
CREATE INDEX "WorkflowDefinition_status_idx" ON "WorkflowDefinition"("status");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowDefinition_companyId_code_key" ON "WorkflowDefinition"("companyId", "code");

-- CreateIndex
CREATE INDEX "WorkflowDefinitionStep_workflowId_idx" ON "WorkflowDefinitionStep"("workflowId");

-- CreateIndex
CREATE INDEX "WorkflowDefinitionStep_approverRoleId_idx" ON "WorkflowDefinitionStep"("approverRoleId");

-- CreateIndex
CREATE INDEX "WorkflowDefinitionStep_approverUserId_idx" ON "WorkflowDefinitionStep"("approverUserId");

-- CreateIndex
CREATE INDEX "WorkflowDefinitionStep_approverEmployeeId_idx" ON "WorkflowDefinitionStep"("approverEmployeeId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowDefinitionStep_workflowId_stepOrder_key" ON "WorkflowDefinitionStep"("workflowId", "stepOrder");

-- CreateIndex
CREATE INDEX "WorkflowRequest_workflowId_idx" ON "WorkflowRequest"("workflowId");

-- CreateIndex
CREATE INDEX "WorkflowRequest_requesterId_idx" ON "WorkflowRequest"("requesterId");

-- CreateIndex
CREATE INDEX "WorkflowRequest_entityType_idx" ON "WorkflowRequest"("entityType");

-- CreateIndex
CREATE INDEX "WorkflowRequest_entityId_idx" ON "WorkflowRequest"("entityId");

-- CreateIndex
CREATE INDEX "WorkflowRequest_status_idx" ON "WorkflowRequest"("status");

-- CreateIndex
CREATE INDEX "WorkflowStep_requestId_idx" ON "WorkflowStep"("requestId");

-- CreateIndex
CREATE INDEX "WorkflowStep_approverId_idx" ON "WorkflowStep"("approverId");

-- CreateIndex
CREATE INDEX "WorkflowStep_status_idx" ON "WorkflowStep"("status");

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowStep_requestId_stepOrder_key" ON "WorkflowStep"("requestId", "stepOrder");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_jobPositionId_fkey" FOREIGN KEY ("jobPositionId") REFERENCES "JobPosition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_assetCategoryId_fkey" FOREIGN KEY ("assetCategoryId") REFERENCES "AssetCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_documentCategoryId_fkey" FOREIGN KEY ("documentCategoryId") REFERENCES "DocumentCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowDefinition" ADD CONSTRAINT "WorkflowDefinition_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowDefinitionStep" ADD CONSTRAINT "WorkflowDefinitionStep_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "WorkflowDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowDefinitionStep" ADD CONSTRAINT "WorkflowDefinitionStep_approverRoleId_fkey" FOREIGN KEY ("approverRoleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowDefinitionStep" ADD CONSTRAINT "WorkflowDefinitionStep_approverUserId_fkey" FOREIGN KEY ("approverUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowDefinitionStep" ADD CONSTRAINT "WorkflowDefinitionStep_approverEmployeeId_fkey" FOREIGN KEY ("approverEmployeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowRequest" ADD CONSTRAINT "WorkflowRequest_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "WorkflowDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowRequest" ADD CONSTRAINT "WorkflowRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStep" ADD CONSTRAINT "WorkflowStep_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "WorkflowRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStep" ADD CONSTRAINT "WorkflowStep_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
