-- CreateEnum
CREATE TYPE "PluginInstallationStatus" AS ENUM ('INSTALLED', 'ENABLED', 'DISABLED', 'UPGRADED', 'UNINSTALLED');

-- CreateTable
CREATE TABLE "PluginMarketplacePackage" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "packageKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "publisher" TEXT,
    "summary" TEXT,
    "websiteUrl" TEXT,
    "status" "PluginStatus" NOT NULL DEFAULT 'DRAFT',
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PluginMarketplacePackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PluginMarketplaceVersion" (
    "id" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "manifestId" TEXT,
    "version" TEXT NOT NULL,
    "releaseNotes" TEXT,
    "compatibility" JSONB,
    "checksum" TEXT,
    "status" "PluginStatus" NOT NULL DEFAULT 'DRAFT',
    "metadata" JSONB,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PluginMarketplaceVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PluginInstallation" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "packageVersionId" TEXT NOT NULL,
    "registryEntryId" TEXT,
    "status" "PluginInstallationStatus" NOT NULL DEFAULT 'INSTALLED',
    "installedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enabledAt" TIMESTAMP(3),
    "disabledAt" TIMESTAMP(3),
    "uninstalledAt" TIMESTAMP(3),
    "upgradedFromId" TEXT,
    "config" JSONB,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PluginInstallation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PluginMarketplacePackage_companyId_packageKey_key" ON "PluginMarketplacePackage"("companyId", "packageKey");
CREATE INDEX "PluginMarketplacePackage_companyId_idx" ON "PluginMarketplacePackage"("companyId");
CREATE INDEX "PluginMarketplacePackage_packageKey_idx" ON "PluginMarketplacePackage"("packageKey");
CREATE INDEX "PluginMarketplacePackage_publisher_idx" ON "PluginMarketplacePackage"("publisher");
CREATE INDEX "PluginMarketplacePackage_status_idx" ON "PluginMarketplacePackage"("status");
CREATE INDEX "PluginMarketplacePackage_deletedAt_idx" ON "PluginMarketplacePackage"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PluginMarketplaceVersion_packageId_version_key" ON "PluginMarketplaceVersion"("packageId", "version");
CREATE INDEX "PluginMarketplaceVersion_packageId_idx" ON "PluginMarketplaceVersion"("packageId");
CREATE INDEX "PluginMarketplaceVersion_manifestId_idx" ON "PluginMarketplaceVersion"("manifestId");
CREATE INDEX "PluginMarketplaceVersion_version_idx" ON "PluginMarketplaceVersion"("version");
CREATE INDEX "PluginMarketplaceVersion_status_idx" ON "PluginMarketplaceVersion"("status");

-- CreateIndex
CREATE INDEX "PluginInstallation_companyId_idx" ON "PluginInstallation"("companyId");
CREATE INDEX "PluginInstallation_packageVersionId_idx" ON "PluginInstallation"("packageVersionId");
CREATE INDEX "PluginInstallation_registryEntryId_idx" ON "PluginInstallation"("registryEntryId");
CREATE INDEX "PluginInstallation_status_idx" ON "PluginInstallation"("status");
CREATE INDEX "PluginInstallation_installedAt_idx" ON "PluginInstallation"("installedAt");
CREATE INDEX "PluginInstallation_upgradedFromId_idx" ON "PluginInstallation"("upgradedFromId");

-- AddForeignKey
ALTER TABLE "PluginMarketplacePackage" ADD CONSTRAINT "PluginMarketplacePackage_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PluginMarketplaceVersion" ADD CONSTRAINT "PluginMarketplaceVersion_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "PluginMarketplacePackage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PluginMarketplaceVersion" ADD CONSTRAINT "PluginMarketplaceVersion_manifestId_fkey" FOREIGN KEY ("manifestId") REFERENCES "PluginManifest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PluginInstallation" ADD CONSTRAINT "PluginInstallation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PluginInstallation" ADD CONSTRAINT "PluginInstallation_packageVersionId_fkey" FOREIGN KEY ("packageVersionId") REFERENCES "PluginMarketplaceVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PluginInstallation" ADD CONSTRAINT "PluginInstallation_registryEntryId_fkey" FOREIGN KEY ("registryEntryId") REFERENCES "PluginRegistryEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PluginInstallation" ADD CONSTRAINT "PluginInstallation_upgradedFromId_fkey" FOREIGN KEY ("upgradedFromId") REFERENCES "PluginInstallation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
