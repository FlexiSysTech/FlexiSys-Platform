-- CreateEnum
CREATE TYPE "PublicApiKeyStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'REVOKED', 'ROTATED');

-- CreateTable
CREATE TABLE "PublicApiApplication" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerUserId" TEXT,
    "callbackUrls" JSONB,
    "status" "PublicApiStatus" NOT NULL DEFAULT 'DRAFT',
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicApiApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicApiKey" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "applicationId" TEXT,
    "name" TEXT NOT NULL,
    "keyId" TEXT NOT NULL,
    "secretHash" TEXT NOT NULL,
    "scopes" JSONB,
    "status" "PublicApiKeyStatus" NOT NULL DEFAULT 'ACTIVE',
    "expiresAt" TIMESTAMP(3),
    "rotatedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "lastUsedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicApiApplication_tenantId_code_key" ON "PublicApiApplication"("tenantId", "code");
CREATE INDEX "PublicApiApplication_tenantId_idx" ON "PublicApiApplication"("tenantId");
CREATE INDEX "PublicApiApplication_code_idx" ON "PublicApiApplication"("code");
CREATE INDEX "PublicApiApplication_ownerUserId_idx" ON "PublicApiApplication"("ownerUserId");
CREATE INDEX "PublicApiApplication_status_idx" ON "PublicApiApplication"("status");
CREATE INDEX "PublicApiApplication_deletedAt_idx" ON "PublicApiApplication"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PublicApiKey_keyId_key" ON "PublicApiKey"("keyId");
CREATE INDEX "PublicApiKey_tenantId_idx" ON "PublicApiKey"("tenantId");
CREATE INDEX "PublicApiKey_applicationId_idx" ON "PublicApiKey"("applicationId");
CREATE INDEX "PublicApiKey_keyId_idx" ON "PublicApiKey"("keyId");
CREATE INDEX "PublicApiKey_status_idx" ON "PublicApiKey"("status");
CREATE INDEX "PublicApiKey_expiresAt_idx" ON "PublicApiKey"("expiresAt");
CREATE INDEX "PublicApiKey_lastUsedAt_idx" ON "PublicApiKey"("lastUsedAt");
CREATE INDEX "PublicApiKey_deletedAt_idx" ON "PublicApiKey"("deletedAt");

-- AddForeignKey
ALTER TABLE "PublicApiApplication" ADD CONSTRAINT "PublicApiApplication_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PublicApiKey" ADD CONSTRAINT "PublicApiKey_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PublicApiKey" ADD CONSTRAINT "PublicApiKey_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "PublicApiApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
