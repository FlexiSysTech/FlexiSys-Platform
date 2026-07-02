-- CreateEnum
CREATE TYPE "SearchEntityType" AS ENUM ('EMPLOYEE', 'PAYROLL_RUN', 'PAYROLL_ITEM', 'DOCUMENT', 'WORKFLOW_DEFINITION', 'WORKFLOW_REQUEST');

-- CreateEnum
CREATE TYPE "SearchIndexStatus" AS ENUM ('ACTIVE', 'STALE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SearchScope" AS ENUM ('GLOBAL', 'EMPLOYEE', 'PAYROLL', 'DOCUMENT', 'WORKFLOW');

-- CreateTable
CREATE TABLE "SearchIndex" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "companyId" TEXT,
    "branchId" TEXT,
    "entityType" "SearchEntityType" NOT NULL,
    "entityId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "content" TEXT,
    "keywords" TEXT,
    "searchableText" TEXT NOT NULL,
    "status" "SearchIndexStatus" NOT NULL DEFAULT 'ACTIVE',
    "sourceUpdatedAt" TIMESTAMP(3),
    "lastIndexedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchQueryLog" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "companyId" TEXT,
    "branchId" TEXT,
    "userId" TEXT,
    "scope" "SearchScope" NOT NULL DEFAULT 'GLOBAL',
    "query" TEXT NOT NULL,
    "filters" JSONB,
    "resultCount" INTEGER NOT NULL DEFAULT 0,
    "durationMs" INTEGER NOT NULL DEFAULT 0,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchQueryLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchIndex_entityType_entityId_key" ON "SearchIndex"("entityType", "entityId");
CREATE INDEX "SearchIndex_tenantId_idx" ON "SearchIndex"("tenantId");
CREATE INDEX "SearchIndex_companyId_idx" ON "SearchIndex"("companyId");
CREATE INDEX "SearchIndex_branchId_idx" ON "SearchIndex"("branchId");
CREATE INDEX "SearchIndex_entityType_idx" ON "SearchIndex"("entityType");
CREATE INDEX "SearchIndex_status_idx" ON "SearchIndex"("status");
CREATE INDEX "SearchIndex_sourceUpdatedAt_idx" ON "SearchIndex"("sourceUpdatedAt");
CREATE INDEX "SearchIndex_lastIndexedAt_idx" ON "SearchIndex"("lastIndexedAt");
CREATE INDEX "SearchIndex_deletedAt_idx" ON "SearchIndex"("deletedAt");
CREATE INDEX "SearchIndex_searchableText_fulltext_idx" ON "SearchIndex" USING GIN (to_tsvector('simple', coalesce("searchableText", '')));
CREATE INDEX "SearchQueryLog_tenantId_idx" ON "SearchQueryLog"("tenantId");
CREATE INDEX "SearchQueryLog_companyId_idx" ON "SearchQueryLog"("companyId");
CREATE INDEX "SearchQueryLog_branchId_idx" ON "SearchQueryLog"("branchId");
CREATE INDEX "SearchQueryLog_userId_idx" ON "SearchQueryLog"("userId");
CREATE INDEX "SearchQueryLog_scope_idx" ON "SearchQueryLog"("scope");
CREATE INDEX "SearchQueryLog_createdAt_idx" ON "SearchQueryLog"("createdAt");

-- AddForeignKey
ALTER TABLE "SearchIndex" ADD CONSTRAINT "SearchIndex_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SearchIndex" ADD CONSTRAINT "SearchIndex_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SearchIndex" ADD CONSTRAINT "SearchIndex_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SearchQueryLog" ADD CONSTRAINT "SearchQueryLog_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SearchQueryLog" ADD CONSTRAINT "SearchQueryLog_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SearchQueryLog" ADD CONSTRAINT "SearchQueryLog_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
