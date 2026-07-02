-- AlterTable
ALTER TABLE "BusinessRuleCondition" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "BusinessRuleCondition" ADD COLUMN "deletedById" TEXT;

-- AlterTable
ALTER TABLE "BusinessRuleAction" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "BusinessRuleAction" ADD COLUMN "deletedById" TEXT;

-- CreateIndex
CREATE INDEX "BusinessRuleCondition_deletedAt_idx" ON "BusinessRuleCondition"("deletedAt");
CREATE INDEX "BusinessRuleAction_deletedAt_idx" ON "BusinessRuleAction"("deletedAt");
