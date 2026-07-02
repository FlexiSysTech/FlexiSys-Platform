-- CreateTable
CREATE TABLE "TenantPermissionPolicy" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "permissionCode" TEXT NOT NULL,
    "allowed" BOOLEAN NOT NULL DEFAULT true,
    "constraints" JSONB,
    "status" "TenantConfigurationStatus" NOT NULL DEFAULT 'ACTIVE',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantPermissionPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantAuditEvent" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "payload" JSONB,
    "actorId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TenantAuditEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TenantPermissionPolicy_tenantId_permissionCode_key" ON "TenantPermissionPolicy"("tenantId", "permissionCode");
CREATE INDEX "TenantPermissionPolicy_tenantId_idx" ON "TenantPermissionPolicy"("tenantId");
CREATE INDEX "TenantPermissionPolicy_permissionCode_idx" ON "TenantPermissionPolicy"("permissionCode");
CREATE INDEX "TenantPermissionPolicy_allowed_idx" ON "TenantPermissionPolicy"("allowed");
CREATE INDEX "TenantPermissionPolicy_status_idx" ON "TenantPermissionPolicy"("status");
CREATE INDEX "TenantPermissionPolicy_deletedAt_idx" ON "TenantPermissionPolicy"("deletedAt");

-- CreateIndex
CREATE INDEX "TenantAuditEvent_tenantId_idx" ON "TenantAuditEvent"("tenantId");
CREATE INDEX "TenantAuditEvent_action_idx" ON "TenantAuditEvent"("action");
CREATE INDEX "TenantAuditEvent_entity_idx" ON "TenantAuditEvent"("entity");
CREATE INDEX "TenantAuditEvent_entityId_idx" ON "TenantAuditEvent"("entityId");
CREATE INDEX "TenantAuditEvent_createdAt_idx" ON "TenantAuditEvent"("createdAt");

-- AddForeignKey
ALTER TABLE "TenantPermissionPolicy" ADD CONSTRAINT "TenantPermissionPolicy_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TenantAuditEvent" ADD CONSTRAINT "TenantAuditEvent_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
