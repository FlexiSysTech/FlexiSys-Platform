-- CreateEnum
CREATE TYPE "TenantStatus" AS ENUM ('PROVISIONING', 'ACTIVE', 'SUSPENDED', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TenantPlan" AS ENUM ('STARTER', 'PROFESSIONAL', 'ENTERPRISE', 'CUSTOM');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN "tenantId" TEXT;

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "legalName" TEXT,
    "status" "TenantStatus" NOT NULL DEFAULT 'PROVISIONING',
    "plan" "TenantPlan" NOT NULL DEFAULT 'STARTER',
    "primaryDomain" TEXT,
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantDomain" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantDomain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_code_key" ON "Tenant"("code");
CREATE INDEX "Tenant_code_idx" ON "Tenant"("code");
CREATE INDEX "Tenant_status_idx" ON "Tenant"("status");
CREATE INDEX "Tenant_plan_idx" ON "Tenant"("plan");
CREATE INDEX "Tenant_primaryDomain_idx" ON "Tenant"("primaryDomain");
CREATE INDEX "Tenant_deletedAt_idx" ON "Tenant"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "TenantDomain_domain_key" ON "TenantDomain"("domain");
CREATE INDEX "TenantDomain_tenantId_idx" ON "TenantDomain"("tenantId");
CREATE INDEX "TenantDomain_domain_idx" ON "TenantDomain"("domain");
CREATE INDEX "TenantDomain_isPrimary_idx" ON "TenantDomain"("isPrimary");
CREATE INDEX "TenantDomain_deletedAt_idx" ON "TenantDomain"("deletedAt");

-- CreateIndex
CREATE INDEX "Company_tenantId_idx" ON "Company"("tenantId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "TenantDomain" ADD CONSTRAINT "TenantDomain_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
