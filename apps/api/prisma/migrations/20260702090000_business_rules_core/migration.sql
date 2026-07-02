-- CreateEnum
CREATE TYPE "BusinessRuleStatus" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BusinessRuleScope" AS ENUM ('GLOBAL', 'COMPANY', 'BRANCH');

-- CreateEnum
CREATE TYPE "BusinessRuleTrigger" AS ENUM ('MANUAL', 'API', 'EVENT', 'SCHEDULED');

-- CreateEnum
CREATE TYPE "BusinessRuleConditionOperator" AS ENUM ('EQUALS', 'NOT_EQUALS', 'GREATER_THAN', 'GREATER_THAN_OR_EQUALS', 'LESS_THAN', 'LESS_THAN_OR_EQUALS', 'CONTAINS', 'NOT_CONTAINS', 'IN', 'NOT_IN', 'EXISTS', 'NOT_EXISTS');

-- CreateEnum
CREATE TYPE "BusinessRuleLogicalOperator" AS ENUM ('AND', 'OR');

-- CreateEnum
CREATE TYPE "BusinessRuleActionType" AS ENUM ('VALIDATION_ERROR', 'SET_FIELD', 'ADD_TAG', 'AUDIT_EVENT', 'NOTIFICATION', 'WORKFLOW');

-- CreateEnum
CREATE TYPE "BusinessRuleExecutionStatus" AS ENUM ('MATCHED', 'NOT_MATCHED', 'BLOCKED', 'ERROR');

-- CreateTable
CREATE TABLE "BusinessRuleCategory" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessRuleCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessRule" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "branchId" TEXT,
    "categoryId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "module" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "trigger" "BusinessRuleTrigger" NOT NULL DEFAULT 'API',
    "scope" "BusinessRuleScope" NOT NULL DEFAULT 'COMPANY',
    "status" "BusinessRuleStatus" NOT NULL DEFAULT 'DRAFT',
    "priority" INTEGER NOT NULL DEFAULT 100,
    "effectiveFrom" TIMESTAMP(3),
    "effectiveTo" TIMESTAMP(3),
    "stopProcessing" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessRuleCondition" (
    "id" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "operator" "BusinessRuleConditionOperator" NOT NULL,
    "value" JSONB,
    "logicalOperator" "BusinessRuleLogicalOperator" NOT NULL DEFAULT 'AND',
    "groupKey" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessRuleCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessRuleAction" (
    "id" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "type" "BusinessRuleActionType" NOT NULL,
    "target" TEXT,
    "value" JSONB,
    "message" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessRuleAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessRuleExecution" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "ruleId" TEXT,
    "module" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "trigger" "BusinessRuleTrigger" NOT NULL,
    "status" "BusinessRuleExecutionStatus" NOT NULL DEFAULT 'NOT_MATCHED',
    "input" JSONB,
    "result" JSONB,
    "error" TEXT,
    "executedById" TEXT,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusinessRuleExecution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessRuleCategory_companyId_code_key" ON "BusinessRuleCategory"("companyId", "code");
CREATE INDEX "BusinessRuleCategory_companyId_idx" ON "BusinessRuleCategory"("companyId");
CREATE INDEX "BusinessRuleCategory_code_idx" ON "BusinessRuleCategory"("code");
CREATE INDEX "BusinessRuleCategory_deletedAt_idx" ON "BusinessRuleCategory"("deletedAt");
CREATE UNIQUE INDEX "BusinessRule_companyId_code_key" ON "BusinessRule"("companyId", "code");
CREATE INDEX "BusinessRule_companyId_idx" ON "BusinessRule"("companyId");
CREATE INDEX "BusinessRule_branchId_idx" ON "BusinessRule"("branchId");
CREATE INDEX "BusinessRule_categoryId_idx" ON "BusinessRule"("categoryId");
CREATE INDEX "BusinessRule_module_idx" ON "BusinessRule"("module");
CREATE INDEX "BusinessRule_entity_idx" ON "BusinessRule"("entity");
CREATE INDEX "BusinessRule_trigger_idx" ON "BusinessRule"("trigger");
CREATE INDEX "BusinessRule_status_idx" ON "BusinessRule"("status");
CREATE INDEX "BusinessRule_priority_idx" ON "BusinessRule"("priority");
CREATE INDEX "BusinessRule_deletedAt_idx" ON "BusinessRule"("deletedAt");
CREATE INDEX "BusinessRuleCondition_ruleId_idx" ON "BusinessRuleCondition"("ruleId");
CREATE INDEX "BusinessRuleCondition_field_idx" ON "BusinessRuleCondition"("field");
CREATE INDEX "BusinessRuleCondition_operator_idx" ON "BusinessRuleCondition"("operator");
CREATE INDEX "BusinessRuleCondition_displayOrder_idx" ON "BusinessRuleCondition"("displayOrder");
CREATE INDEX "BusinessRuleAction_ruleId_idx" ON "BusinessRuleAction"("ruleId");
CREATE INDEX "BusinessRuleAction_type_idx" ON "BusinessRuleAction"("type");
CREATE INDEX "BusinessRuleAction_displayOrder_idx" ON "BusinessRuleAction"("displayOrder");
CREATE INDEX "BusinessRuleExecution_companyId_idx" ON "BusinessRuleExecution"("companyId");
CREATE INDEX "BusinessRuleExecution_ruleId_idx" ON "BusinessRuleExecution"("ruleId");
CREATE INDEX "BusinessRuleExecution_module_idx" ON "BusinessRuleExecution"("module");
CREATE INDEX "BusinessRuleExecution_entity_idx" ON "BusinessRuleExecution"("entity");
CREATE INDEX "BusinessRuleExecution_trigger_idx" ON "BusinessRuleExecution"("trigger");
CREATE INDEX "BusinessRuleExecution_status_idx" ON "BusinessRuleExecution"("status");
CREATE INDEX "BusinessRuleExecution_executedAt_idx" ON "BusinessRuleExecution"("executedAt");

-- AddForeignKey
ALTER TABLE "BusinessRuleCategory" ADD CONSTRAINT "BusinessRuleCategory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BusinessRule" ADD CONSTRAINT "BusinessRule_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BusinessRule" ADD CONSTRAINT "BusinessRule_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BusinessRule" ADD CONSTRAINT "BusinessRule_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BusinessRuleCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BusinessRuleCondition" ADD CONSTRAINT "BusinessRuleCondition_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "BusinessRule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BusinessRuleAction" ADD CONSTRAINT "BusinessRuleAction_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "BusinessRule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BusinessRuleExecution" ADD CONSTRAINT "BusinessRuleExecution_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BusinessRuleExecution" ADD CONSTRAINT "BusinessRuleExecution_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "BusinessRule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
