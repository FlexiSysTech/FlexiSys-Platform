-- CreateEnum
CREATE TYPE "PluginSandboxLevel" AS ENUM ('TRUSTED', 'RESTRICTED', 'ISOLATED');

-- CreateEnum
CREATE TYPE "PluginCapabilityType" AS ENUM ('EVENTS', 'HOOKS', 'SERVICES', 'CONFIGURATION', 'PERMISSIONS', 'INTEGRATIONS', 'AI', 'NETWORK', 'FILESYSTEM');

-- CreateEnum
CREATE TYPE "PluginDependencyStatus" AS ENUM ('SATISFIED', 'MISSING', 'INCOMPATIBLE');

-- CreateTable
CREATE TABLE "PluginSandboxPolicy" (
    "id" TEXT NOT NULL,
    "registryEntryId" TEXT NOT NULL,
    "level" "PluginSandboxLevel" NOT NULL DEFAULT 'ISOLATED',
    "allowedCapabilities" JSONB,
    "networkPolicy" JSONB,
    "resourceLimits" JSONB,
    "status" "PluginStatus" NOT NULL DEFAULT 'ACTIVE',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PluginSandboxPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PluginDependency" (
    "id" TEXT NOT NULL,
    "registryEntryId" TEXT NOT NULL,
    "dependencyKey" TEXT NOT NULL,
    "requiredVersion" TEXT,
    "optional" BOOLEAN NOT NULL DEFAULT false,
    "status" "PluginDependencyStatus" NOT NULL DEFAULT 'MISSING',
    "resolvedVersion" TEXT,
    "message" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PluginDependency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PluginCapabilityGrant" (
    "id" TEXT NOT NULL,
    "registryEntryId" TEXT NOT NULL,
    "capability" "PluginCapabilityType" NOT NULL,
    "status" "PluginStatus" NOT NULL DEFAULT 'ACTIVE',
    "constraints" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PluginCapabilityGrant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PluginSandboxPolicy_registryEntryId_key" ON "PluginSandboxPolicy"("registryEntryId");
CREATE INDEX "PluginSandboxPolicy_level_idx" ON "PluginSandboxPolicy"("level");
CREATE INDEX "PluginSandboxPolicy_status_idx" ON "PluginSandboxPolicy"("status");
CREATE INDEX "PluginSandboxPolicy_deletedAt_idx" ON "PluginSandboxPolicy"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PluginDependency_registryEntryId_dependencyKey_key" ON "PluginDependency"("registryEntryId", "dependencyKey");
CREATE INDEX "PluginDependency_registryEntryId_idx" ON "PluginDependency"("registryEntryId");
CREATE INDEX "PluginDependency_dependencyKey_idx" ON "PluginDependency"("dependencyKey");
CREATE INDEX "PluginDependency_status_idx" ON "PluginDependency"("status");
CREATE INDEX "PluginDependency_optional_idx" ON "PluginDependency"("optional");

-- CreateIndex
CREATE UNIQUE INDEX "PluginCapabilityGrant_registryEntryId_capability_key" ON "PluginCapabilityGrant"("registryEntryId", "capability");
CREATE INDEX "PluginCapabilityGrant_registryEntryId_idx" ON "PluginCapabilityGrant"("registryEntryId");
CREATE INDEX "PluginCapabilityGrant_capability_idx" ON "PluginCapabilityGrant"("capability");
CREATE INDEX "PluginCapabilityGrant_status_idx" ON "PluginCapabilityGrant"("status");
CREATE INDEX "PluginCapabilityGrant_deletedAt_idx" ON "PluginCapabilityGrant"("deletedAt");

-- AddForeignKey
ALTER TABLE "PluginSandboxPolicy" ADD CONSTRAINT "PluginSandboxPolicy_registryEntryId_fkey" FOREIGN KEY ("registryEntryId") REFERENCES "PluginRegistryEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PluginDependency" ADD CONSTRAINT "PluginDependency_registryEntryId_fkey" FOREIGN KEY ("registryEntryId") REFERENCES "PluginRegistryEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PluginCapabilityGrant" ADD CONSTRAINT "PluginCapabilityGrant_registryEntryId_fkey" FOREIGN KEY ("registryEntryId") REFERENCES "PluginRegistryEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
