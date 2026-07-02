-- CreateEnum
CREATE TYPE "MobileDevicePlatform" AS ENUM ('IOS', 'ANDROID', 'WEB', 'OTHER');

-- CreateEnum
CREATE TYPE "MobileDeviceStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'REVOKED', 'LOST');

-- CreateEnum
CREATE TYPE "MobileSessionStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'REVOKED');

-- CreateEnum
CREATE TYPE "MobilePushProvider" AS ENUM ('FCM', 'APNS', 'EXPO', 'WEB_PUSH', 'NONE');

-- CreateEnum
CREATE TYPE "MobilePushStatus" AS ENUM ('PENDING', 'SENT', 'FAILED', 'READ', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MobileSyncOperation" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "MobileSyncStatus" AS ENUM ('PENDING', 'SYNCED', 'CONFLICT', 'FAILED');

-- CreateTable
CREATE TABLE "MobileDevice" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "userId" TEXT NOT NULL,
    "companyId" TEXT,
    "branchId" TEXT,
    "deviceIdentifier" TEXT NOT NULL,
    "platform" "MobileDevicePlatform" NOT NULL,
    "appVersion" TEXT,
    "osVersion" TEXT,
    "model" TEXT,
    "manufacturer" TEXT,
    "pushToken" TEXT,
    "pushProvider" "MobilePushProvider" NOT NULL DEFAULT 'NONE',
    "status" "MobileDeviceStatus" NOT NULL DEFAULT 'ACTIVE',
    "lastSeenAt" TIMESTAMP(3),
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MobileDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobileSession" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT,
    "companyId" TEXT,
    "branchId" TEXT,
    "sessionTokenHash" TEXT NOT NULL,
    "refreshTokenHash" TEXT NOT NULL,
    "status" "MobileSessionStatus" NOT NULL DEFAULT 'ACTIVE',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "refreshExpiresAt" TIMESTAMP(3) NOT NULL,
    "lastSeenAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "revokeReason" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MobileSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobilePushNotification" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "userId" TEXT,
    "deviceId" TEXT,
    "provider" "MobilePushProvider" NOT NULL DEFAULT 'NONE',
    "status" "MobilePushStatus" NOT NULL DEFAULT 'PENDING',
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "payload" JSONB,
    "scheduledAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "error" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MobilePushNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobileSyncCursor" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT,
    "companyId" TEXT,
    "branchId" TEXT,
    "scope" TEXT NOT NULL,
    "cursor" TEXT NOT NULL,
    "lastSyncedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MobileSyncCursor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobileSyncChange" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "companyId" TEXT,
    "branchId" TEXT,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "operation" "MobileSyncOperation" NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "payload" JSONB,
    "syncStatus" "MobileSyncStatus" NOT NULL DEFAULT 'PENDING',
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MobileSyncChange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MobileDevice_userId_deviceIdentifier_key" ON "MobileDevice"("userId", "deviceIdentifier");
CREATE INDEX "MobileDevice_tenantId_idx" ON "MobileDevice"("tenantId");
CREATE INDEX "MobileDevice_userId_idx" ON "MobileDevice"("userId");
CREATE INDEX "MobileDevice_companyId_idx" ON "MobileDevice"("companyId");
CREATE INDEX "MobileDevice_branchId_idx" ON "MobileDevice"("branchId");
CREATE INDEX "MobileDevice_platform_idx" ON "MobileDevice"("platform");
CREATE INDEX "MobileDevice_status_idx" ON "MobileDevice"("status");
CREATE INDEX "MobileDevice_pushToken_idx" ON "MobileDevice"("pushToken");
CREATE INDEX "MobileDevice_lastSeenAt_idx" ON "MobileDevice"("lastSeenAt");
CREATE INDEX "MobileDevice_deletedAt_idx" ON "MobileDevice"("deletedAt");
CREATE UNIQUE INDEX "MobileSession_sessionTokenHash_key" ON "MobileSession"("sessionTokenHash");
CREATE UNIQUE INDEX "MobileSession_refreshTokenHash_key" ON "MobileSession"("refreshTokenHash");
CREATE INDEX "MobileSession_tenantId_idx" ON "MobileSession"("tenantId");
CREATE INDEX "MobileSession_userId_idx" ON "MobileSession"("userId");
CREATE INDEX "MobileSession_deviceId_idx" ON "MobileSession"("deviceId");
CREATE INDEX "MobileSession_companyId_idx" ON "MobileSession"("companyId");
CREATE INDEX "MobileSession_branchId_idx" ON "MobileSession"("branchId");
CREATE INDEX "MobileSession_status_idx" ON "MobileSession"("status");
CREATE INDEX "MobileSession_expiresAt_idx" ON "MobileSession"("expiresAt");
CREATE INDEX "MobileSession_refreshExpiresAt_idx" ON "MobileSession"("refreshExpiresAt");
CREATE INDEX "MobileSession_lastSeenAt_idx" ON "MobileSession"("lastSeenAt");
CREATE INDEX "MobilePushNotification_tenantId_idx" ON "MobilePushNotification"("tenantId");
CREATE INDEX "MobilePushNotification_userId_idx" ON "MobilePushNotification"("userId");
CREATE INDEX "MobilePushNotification_deviceId_idx" ON "MobilePushNotification"("deviceId");
CREATE INDEX "MobilePushNotification_provider_idx" ON "MobilePushNotification"("provider");
CREATE INDEX "MobilePushNotification_status_idx" ON "MobilePushNotification"("status");
CREATE INDEX "MobilePushNotification_scheduledAt_idx" ON "MobilePushNotification"("scheduledAt");
CREATE INDEX "MobilePushNotification_createdAt_idx" ON "MobilePushNotification"("createdAt");
CREATE UNIQUE INDEX "MobileSyncCursor_userId_deviceId_scope_key" ON "MobileSyncCursor"("userId", "deviceId", "scope");
CREATE INDEX "MobileSyncCursor_tenantId_idx" ON "MobileSyncCursor"("tenantId");
CREATE INDEX "MobileSyncCursor_userId_idx" ON "MobileSyncCursor"("userId");
CREATE INDEX "MobileSyncCursor_deviceId_idx" ON "MobileSyncCursor"("deviceId");
CREATE INDEX "MobileSyncCursor_companyId_idx" ON "MobileSyncCursor"("companyId");
CREATE INDEX "MobileSyncCursor_branchId_idx" ON "MobileSyncCursor"("branchId");
CREATE INDEX "MobileSyncCursor_scope_idx" ON "MobileSyncCursor"("scope");
CREATE INDEX "MobileSyncCursor_lastSyncedAt_idx" ON "MobileSyncCursor"("lastSyncedAt");
CREATE INDEX "MobileSyncCursor_deletedAt_idx" ON "MobileSyncCursor"("deletedAt");
CREATE INDEX "MobileSyncChange_tenantId_idx" ON "MobileSyncChange"("tenantId");
CREATE INDEX "MobileSyncChange_companyId_idx" ON "MobileSyncChange"("companyId");
CREATE INDEX "MobileSyncChange_branchId_idx" ON "MobileSyncChange"("branchId");
CREATE INDEX "MobileSyncChange_entityType_idx" ON "MobileSyncChange"("entityType");
CREATE INDEX "MobileSyncChange_entityId_idx" ON "MobileSyncChange"("entityId");
CREATE INDEX "MobileSyncChange_operation_idx" ON "MobileSyncChange"("operation");
CREATE INDEX "MobileSyncChange_syncStatus_idx" ON "MobileSyncChange"("syncStatus");
CREATE INDEX "MobileSyncChange_occurredAt_idx" ON "MobileSyncChange"("occurredAt");
CREATE INDEX "MobileSyncChange_createdAt_idx" ON "MobileSyncChange"("createdAt");

-- AddForeignKey
ALTER TABLE "MobileDevice" ADD CONSTRAINT "MobileDevice_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobileDevice" ADD CONSTRAINT "MobileDevice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobileDevice" ADD CONSTRAINT "MobileDevice_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MobileDevice" ADD CONSTRAINT "MobileDevice_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MobileSession" ADD CONSTRAINT "MobileSession_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobileSession" ADD CONSTRAINT "MobileSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobileSession" ADD CONSTRAINT "MobileSession_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "MobileDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MobileSession" ADD CONSTRAINT "MobileSession_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MobileSession" ADD CONSTRAINT "MobileSession_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MobilePushNotification" ADD CONSTRAINT "MobilePushNotification_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobilePushNotification" ADD CONSTRAINT "MobilePushNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MobilePushNotification" ADD CONSTRAINT "MobilePushNotification_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "MobileDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MobileSyncCursor" ADD CONSTRAINT "MobileSyncCursor_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobileSyncCursor" ADD CONSTRAINT "MobileSyncCursor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobileSyncCursor" ADD CONSTRAINT "MobileSyncCursor_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "MobileDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MobileSyncCursor" ADD CONSTRAINT "MobileSyncCursor_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MobileSyncCursor" ADD CONSTRAINT "MobileSyncCursor_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MobileSyncChange" ADD CONSTRAINT "MobileSyncChange_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobileSyncChange" ADD CONSTRAINT "MobileSyncChange_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MobileSyncChange" ADD CONSTRAINT "MobileSyncChange_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
