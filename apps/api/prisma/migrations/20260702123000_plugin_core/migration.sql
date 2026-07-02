-- CreateEnum
CREATE TYPE "PluginSource" AS ENUM ('SYSTEM', 'LOCAL', 'UPLOAD', 'MARKETPLACE');

-- CreateEnum
CREATE TYPE "PluginStatus" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PluginLifecycleState" AS ENUM ('REGISTERED', 'LOADED', 'ENABLED', 'DISABLED', 'ERROR', 'UNINSTALLED');

-- CreateEnum
CREATE TYPE "PluginLifecycleAction" AS ENUM ('REGISTER', 'LOAD', 'ENABLE', 'DISABLE', 'RELOAD', 'UNLOAD', 'UNINSTALL', 'HEALTH_CHECK');

-- CreateTable
CREATE TABLE "PluginManifest" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "pluginKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "description" TEXT,
    "publisher" TEXT,
    "source" "PluginSource" NOT NULL DEFAULT 'LOCAL',
    "status" "PluginStatus" NOT NULL DEFAULT 'DRAFT',
    "entryPoint" TEXT,
    "checksum" TEXT,
    "manifest" JSONB NOT NULL,
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PluginManifest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PluginRegistryEntry" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "manifestId" TEXT NOT NULL,
    "status" "PluginStatus" NOT NULL DEFAULT 'DRAFT',
    "lifecycle" "PluginLifecycleState" NOT NULL DEFAULT 'REGISTERED',
    "config" JSONB,
    "loadedAt" TIMESTAMP(3),
    "enabledAt" TIMESTAMP(3),
    "disabledAt" TIMESTAMP(3),
    "lastError" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PluginRegistryEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PluginLifecycleEvent" (
    "id" TEXT NOT NULL,
    "registryEntryId" TEXT NOT NULL,
    "action" "PluginLifecycleAction" NOT NULL,
    "fromState" "PluginLifecycleState",
    "toState" "PluginLifecycleState",
    "success" BOOLEAN NOT NULL DEFAULT true,
    "message" TEXT,
    "metadata" JSONB,
    "actorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PluginLifecycleEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PluginManifest_companyId_pluginKey_version_key" ON "PluginManifest"("companyId", "pluginKey", "version");

-- CreateIndex
CREATE INDEX "PluginManifest_companyId_idx" ON "PluginManifest"("companyId");

-- CreateIndex
CREATE INDEX "PluginManifest_pluginKey_idx" ON "PluginManifest"("pluginKey");

-- CreateIndex
CREATE INDEX "PluginManifest_version_idx" ON "PluginManifest"("version");

-- CreateIndex
CREATE INDEX "PluginManifest_source_idx" ON "PluginManifest"("source");

-- CreateIndex
CREATE INDEX "PluginManifest_status_idx" ON "PluginManifest"("status");

-- CreateIndex
CREATE INDEX "PluginManifest_deletedAt_idx" ON "PluginManifest"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PluginRegistryEntry_companyId_manifestId_key" ON "PluginRegistryEntry"("companyId", "manifestId");

-- CreateIndex
CREATE INDEX "PluginRegistryEntry_companyId_idx" ON "PluginRegistryEntry"("companyId");

-- CreateIndex
CREATE INDEX "PluginRegistryEntry_manifestId_idx" ON "PluginRegistryEntry"("manifestId");

-- CreateIndex
CREATE INDEX "PluginRegistryEntry_status_idx" ON "PluginRegistryEntry"("status");

-- CreateIndex
CREATE INDEX "PluginRegistryEntry_lifecycle_idx" ON "PluginRegistryEntry"("lifecycle");

-- CreateIndex
CREATE INDEX "PluginRegistryEntry_deletedAt_idx" ON "PluginRegistryEntry"("deletedAt");

-- CreateIndex
CREATE INDEX "PluginLifecycleEvent_registryEntryId_idx" ON "PluginLifecycleEvent"("registryEntryId");

-- CreateIndex
CREATE INDEX "PluginLifecycleEvent_action_idx" ON "PluginLifecycleEvent"("action");

-- CreateIndex
CREATE INDEX "PluginLifecycleEvent_success_idx" ON "PluginLifecycleEvent"("success");

-- CreateIndex
CREATE INDEX "PluginLifecycleEvent_createdAt_idx" ON "PluginLifecycleEvent"("createdAt");

-- AddForeignKey
ALTER TABLE "PluginManifest" ADD CONSTRAINT "PluginManifest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PluginRegistryEntry" ADD CONSTRAINT "PluginRegistryEntry_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PluginRegistryEntry" ADD CONSTRAINT "PluginRegistryEntry_manifestId_fkey" FOREIGN KEY ("manifestId") REFERENCES "PluginManifest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PluginLifecycleEvent" ADD CONSTRAINT "PluginLifecycleEvent_registryEntryId_fkey" FOREIGN KEY ("registryEntryId") REFERENCES "PluginRegistryEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
