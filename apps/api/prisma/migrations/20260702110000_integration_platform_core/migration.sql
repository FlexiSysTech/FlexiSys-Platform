-- CreateEnum
CREATE TYPE "IntegrationProviderType" AS ENUM ('REST', 'WEBHOOK', 'FILE', 'DATABASE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "IntegrationStatus" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "IntegrationCredentialType" AS ENUM ('API_KEY', 'BASIC_AUTH', 'BEARER_TOKEN', 'OAUTH2', 'CUSTOM');

-- CreateEnum
CREATE TYPE "IntegrationConnectionStatus" AS ENUM ('DISCONNECTED', 'CONNECTING', 'CONNECTED', 'FAILED', 'DISABLED');

-- CreateTable
CREATE TABLE "IntegrationProvider" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "IntegrationProviderType" NOT NULL DEFAULT 'REST',
    "status" "IntegrationStatus" NOT NULL DEFAULT 'DRAFT',
    "baseUrl" TEXT,
    "config" JSONB,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationCredential" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "providerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "IntegrationCredentialType" NOT NULL DEFAULT 'API_KEY',
    "maskedSecret" TEXT,
    "secretRef" TEXT,
    "metadata" JSONB,
    "status" "IntegrationStatus" NOT NULL DEFAULT 'DRAFT',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationConnection" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "providerId" TEXT NOT NULL,
    "credentialId" TEXT,
    "name" TEXT NOT NULL,
    "status" "IntegrationConnectionStatus" NOT NULL DEFAULT 'DISCONNECTED',
    "config" JSONB,
    "lastTestedAt" TIMESTAMP(3),
    "lastConnectedAt" TIMESTAMP(3),
    "lastError" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationConnection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IntegrationProvider_companyId_code_key" ON "IntegrationProvider"("companyId", "code");

-- CreateIndex
CREATE INDEX "IntegrationProvider_companyId_idx" ON "IntegrationProvider"("companyId");

-- CreateIndex
CREATE INDEX "IntegrationProvider_code_idx" ON "IntegrationProvider"("code");

-- CreateIndex
CREATE INDEX "IntegrationProvider_type_idx" ON "IntegrationProvider"("type");

-- CreateIndex
CREATE INDEX "IntegrationProvider_status_idx" ON "IntegrationProvider"("status");

-- CreateIndex
CREATE INDEX "IntegrationProvider_deletedAt_idx" ON "IntegrationProvider"("deletedAt");

-- CreateIndex
CREATE INDEX "IntegrationCredential_companyId_idx" ON "IntegrationCredential"("companyId");

-- CreateIndex
CREATE INDEX "IntegrationCredential_providerId_idx" ON "IntegrationCredential"("providerId");

-- CreateIndex
CREATE INDEX "IntegrationCredential_type_idx" ON "IntegrationCredential"("type");

-- CreateIndex
CREATE INDEX "IntegrationCredential_status_idx" ON "IntegrationCredential"("status");

-- CreateIndex
CREATE INDEX "IntegrationCredential_deletedAt_idx" ON "IntegrationCredential"("deletedAt");

-- CreateIndex
CREATE INDEX "IntegrationConnection_companyId_idx" ON "IntegrationConnection"("companyId");

-- CreateIndex
CREATE INDEX "IntegrationConnection_providerId_idx" ON "IntegrationConnection"("providerId");

-- CreateIndex
CREATE INDEX "IntegrationConnection_credentialId_idx" ON "IntegrationConnection"("credentialId");

-- CreateIndex
CREATE INDEX "IntegrationConnection_status_idx" ON "IntegrationConnection"("status");

-- CreateIndex
CREATE INDEX "IntegrationConnection_deletedAt_idx" ON "IntegrationConnection"("deletedAt");

-- AddForeignKey
ALTER TABLE "IntegrationProvider" ADD CONSTRAINT "IntegrationProvider_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationCredential" ADD CONSTRAINT "IntegrationCredential_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationCredential" ADD CONSTRAINT "IntegrationCredential_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "IntegrationProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationConnection" ADD CONSTRAINT "IntegrationConnection_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationConnection" ADD CONSTRAINT "IntegrationConnection_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "IntegrationProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationConnection" ADD CONSTRAINT "IntegrationConnection_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "IntegrationCredential"("id") ON DELETE SET NULL ON UPDATE CASCADE;
