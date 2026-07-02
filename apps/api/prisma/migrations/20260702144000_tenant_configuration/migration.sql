-- CreateEnum
CREATE TYPE "TenantConfigurationStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateTable
CREATE TABLE "TenantSetting" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB,
    "isSecret" BOOLEAN NOT NULL DEFAULT false,
    "secretRef" TEXT,
    "status" "TenantConfigurationStatus" NOT NULL DEFAULT 'ACTIVE',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantFeatureFlag" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "config" JSONB,
    "status" "TenantConfigurationStatus" NOT NULL DEFAULT 'ACTIVE',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantFeatureFlag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantLocalization" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "timezone" TEXT,
    "dateFormat" TEXT,
    "timeFormat" TEXT,
    "currency" TEXT,
    "status" "TenantConfigurationStatus" NOT NULL DEFAULT 'ACTIVE',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantLocalization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantBranding" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "brandName" TEXT,
    "logoUrl" TEXT,
    "faviconUrl" TEXT,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "accentColor" TEXT,
    "metadata" JSONB,
    "status" "TenantConfigurationStatus" NOT NULL DEFAULT 'ACTIVE',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantBranding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TenantSetting_tenantId_key_key" ON "TenantSetting"("tenantId", "key");
CREATE INDEX "TenantSetting_tenantId_idx" ON "TenantSetting"("tenantId");
CREATE INDEX "TenantSetting_key_idx" ON "TenantSetting"("key");
CREATE INDEX "TenantSetting_status_idx" ON "TenantSetting"("status");
CREATE INDEX "TenantSetting_deletedAt_idx" ON "TenantSetting"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "TenantFeatureFlag_tenantId_key_key" ON "TenantFeatureFlag"("tenantId", "key");
CREATE INDEX "TenantFeatureFlag_tenantId_idx" ON "TenantFeatureFlag"("tenantId");
CREATE INDEX "TenantFeatureFlag_key_idx" ON "TenantFeatureFlag"("key");
CREATE INDEX "TenantFeatureFlag_enabled_idx" ON "TenantFeatureFlag"("enabled");
CREATE INDEX "TenantFeatureFlag_status_idx" ON "TenantFeatureFlag"("status");
CREATE INDEX "TenantFeatureFlag_deletedAt_idx" ON "TenantFeatureFlag"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "TenantLocalization_tenantId_locale_key" ON "TenantLocalization"("tenantId", "locale");
CREATE INDEX "TenantLocalization_tenantId_idx" ON "TenantLocalization"("tenantId");
CREATE INDEX "TenantLocalization_locale_idx" ON "TenantLocalization"("locale");
CREATE INDEX "TenantLocalization_status_idx" ON "TenantLocalization"("status");
CREATE INDEX "TenantLocalization_deletedAt_idx" ON "TenantLocalization"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "TenantBranding_tenantId_key" ON "TenantBranding"("tenantId");
CREATE INDEX "TenantBranding_tenantId_idx" ON "TenantBranding"("tenantId");
CREATE INDEX "TenantBranding_status_idx" ON "TenantBranding"("status");
CREATE INDEX "TenantBranding_deletedAt_idx" ON "TenantBranding"("deletedAt");

-- AddForeignKey
ALTER TABLE "TenantSetting" ADD CONSTRAINT "TenantSetting_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TenantFeatureFlag" ADD CONSTRAINT "TenantFeatureFlag_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TenantLocalization" ADD CONSTRAINT "TenantLocalization_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TenantBranding" ADD CONSTRAINT "TenantBranding_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
