-- CreateEnum
CREATE TYPE "PluginHookType" AS ENUM ('BEFORE', 'AFTER', 'VALIDATION', 'ENRICHMENT');

-- CreateEnum
CREATE TYPE "PluginServiceType" AS ENUM ('INTERNAL_API', 'INTEGRATION', 'AI', 'REPORTING', 'CUSTOM');

-- CreateEnum
CREATE TYPE "PluginEventStatus" AS ENUM ('PENDING', 'DISPATCHED', 'FAILED');

-- CreateTable
CREATE TABLE "PluginEventSubscription" (
    "id" TEXT NOT NULL,
    "registryEntryId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "filter" JSONB,
    "status" "PluginStatus" NOT NULL DEFAULT 'ACTIVE',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PluginEventSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PluginHook" (
    "id" TEXT NOT NULL,
    "registryEntryId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "hookPoint" TEXT NOT NULL,
    "type" "PluginHookType" NOT NULL DEFAULT 'AFTER',
    "priority" INTEGER NOT NULL DEFAULT 100,
    "config" JSONB,
    "status" "PluginStatus" NOT NULL DEFAULT 'ACTIVE',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PluginHook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PluginServiceBinding" (
    "id" TEXT NOT NULL,
    "registryEntryId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "serviceType" "PluginServiceType" NOT NULL DEFAULT 'INTERNAL_API',
    "endpoint" TEXT,
    "contract" JSONB,
    "status" "PluginStatus" NOT NULL DEFAULT 'ACTIVE',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PluginServiceBinding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PluginPermissionGrant" (
    "id" TEXT NOT NULL,
    "registryEntryId" TEXT NOT NULL,
    "permissionCode" TEXT NOT NULL,
    "status" "PluginStatus" NOT NULL DEFAULT 'ACTIVE',
    "constraints" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PluginPermissionGrant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PluginConfiguration" (
    "id" TEXT NOT NULL,
    "registryEntryId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB,
    "isSecret" BOOLEAN NOT NULL DEFAULT false,
    "secretRef" TEXT,
    "status" "PluginStatus" NOT NULL DEFAULT 'ACTIVE',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PluginConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PluginEvent" (
    "id" TEXT NOT NULL,
    "registryEntryId" TEXT,
    "eventName" TEXT NOT NULL,
    "payload" JSONB,
    "status" "PluginEventStatus" NOT NULL DEFAULT 'PENDING',
    "error" TEXT,
    "dispatchedAt" TIMESTAMP(3),
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PluginEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PluginEventSubscription_registryEntryId_eventName_key" ON "PluginEventSubscription"("registryEntryId", "eventName");
CREATE INDEX "PluginEventSubscription_registryEntryId_idx" ON "PluginEventSubscription"("registryEntryId");
CREATE INDEX "PluginEventSubscription_eventName_idx" ON "PluginEventSubscription"("eventName");
CREATE INDEX "PluginEventSubscription_status_idx" ON "PluginEventSubscription"("status");
CREATE INDEX "PluginEventSubscription_deletedAt_idx" ON "PluginEventSubscription"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PluginHook_registryEntryId_code_key" ON "PluginHook"("registryEntryId", "code");
CREATE INDEX "PluginHook_registryEntryId_idx" ON "PluginHook"("registryEntryId");
CREATE INDEX "PluginHook_hookPoint_idx" ON "PluginHook"("hookPoint");
CREATE INDEX "PluginHook_type_idx" ON "PluginHook"("type");
CREATE INDEX "PluginHook_priority_idx" ON "PluginHook"("priority");
CREATE INDEX "PluginHook_status_idx" ON "PluginHook"("status");
CREATE INDEX "PluginHook_deletedAt_idx" ON "PluginHook"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PluginServiceBinding_registryEntryId_code_key" ON "PluginServiceBinding"("registryEntryId", "code");
CREATE INDEX "PluginServiceBinding_registryEntryId_idx" ON "PluginServiceBinding"("registryEntryId");
CREATE INDEX "PluginServiceBinding_serviceType_idx" ON "PluginServiceBinding"("serviceType");
CREATE INDEX "PluginServiceBinding_status_idx" ON "PluginServiceBinding"("status");
CREATE INDEX "PluginServiceBinding_deletedAt_idx" ON "PluginServiceBinding"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PluginPermissionGrant_registryEntryId_permissionCode_key" ON "PluginPermissionGrant"("registryEntryId", "permissionCode");
CREATE INDEX "PluginPermissionGrant_registryEntryId_idx" ON "PluginPermissionGrant"("registryEntryId");
CREATE INDEX "PluginPermissionGrant_permissionCode_idx" ON "PluginPermissionGrant"("permissionCode");
CREATE INDEX "PluginPermissionGrant_status_idx" ON "PluginPermissionGrant"("status");
CREATE INDEX "PluginPermissionGrant_deletedAt_idx" ON "PluginPermissionGrant"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PluginConfiguration_registryEntryId_key_key" ON "PluginConfiguration"("registryEntryId", "key");
CREATE INDEX "PluginConfiguration_registryEntryId_idx" ON "PluginConfiguration"("registryEntryId");
CREATE INDEX "PluginConfiguration_key_idx" ON "PluginConfiguration"("key");
CREATE INDEX "PluginConfiguration_isSecret_idx" ON "PluginConfiguration"("isSecret");
CREATE INDEX "PluginConfiguration_status_idx" ON "PluginConfiguration"("status");
CREATE INDEX "PluginConfiguration_deletedAt_idx" ON "PluginConfiguration"("deletedAt");

-- CreateIndex
CREATE INDEX "PluginEvent_registryEntryId_idx" ON "PluginEvent"("registryEntryId");
CREATE INDEX "PluginEvent_eventName_idx" ON "PluginEvent"("eventName");
CREATE INDEX "PluginEvent_status_idx" ON "PluginEvent"("status");
CREATE INDEX "PluginEvent_createdAt_idx" ON "PluginEvent"("createdAt");

-- AddForeignKey
ALTER TABLE "PluginEventSubscription" ADD CONSTRAINT "PluginEventSubscription_registryEntryId_fkey" FOREIGN KEY ("registryEntryId") REFERENCES "PluginRegistryEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PluginHook" ADD CONSTRAINT "PluginHook_registryEntryId_fkey" FOREIGN KEY ("registryEntryId") REFERENCES "PluginRegistryEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PluginServiceBinding" ADD CONSTRAINT "PluginServiceBinding_registryEntryId_fkey" FOREIGN KEY ("registryEntryId") REFERENCES "PluginRegistryEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PluginPermissionGrant" ADD CONSTRAINT "PluginPermissionGrant_registryEntryId_fkey" FOREIGN KEY ("registryEntryId") REFERENCES "PluginRegistryEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PluginConfiguration" ADD CONSTRAINT "PluginConfiguration_registryEntryId_fkey" FOREIGN KEY ("registryEntryId") REFERENCES "PluginRegistryEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PluginEvent" ADD CONSTRAINT "PluginEvent_registryEntryId_fkey" FOREIGN KEY ("registryEntryId") REFERENCES "PluginRegistryEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
