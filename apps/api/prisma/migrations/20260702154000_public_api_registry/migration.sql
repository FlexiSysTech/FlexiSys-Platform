-- CreateEnum
CREATE TYPE "PublicApiStatus" AS ENUM ('DRAFT', 'ACTIVE', 'DEPRECATED', 'RETIRED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PublicApiLifecycle" AS ENUM ('DESIGN', 'REVIEW', 'PUBLISHED', 'DEPRECATED', 'RETIRED');

-- CreateTable
CREATE TABLE "PublicApiGroup" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "PublicApiStatus" NOT NULL DEFAULT 'DRAFT',
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicApiGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicApiRegistry" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "groupId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "basePath" TEXT NOT NULL,
    "status" "PublicApiStatus" NOT NULL DEFAULT 'DRAFT',
    "lifecycle" "PublicApiLifecycle" NOT NULL DEFAULT 'DESIGN',
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicApiRegistry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicApiVersion" (
    "id" TEXT NOT NULL,
    "apiId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "pathPrefix" TEXT,
    "status" "PublicApiStatus" NOT NULL DEFAULT 'DRAFT',
    "lifecycle" "PublicApiLifecycle" NOT NULL DEFAULT 'DESIGN',
    "releasedAt" TIMESTAMP(3),
    "deprecatedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicApiVersion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicApiGroup_tenantId_code_key" ON "PublicApiGroup"("tenantId", "code");
CREATE INDEX "PublicApiGroup_tenantId_idx" ON "PublicApiGroup"("tenantId");
CREATE INDEX "PublicApiGroup_code_idx" ON "PublicApiGroup"("code");
CREATE INDEX "PublicApiGroup_status_idx" ON "PublicApiGroup"("status");
CREATE INDEX "PublicApiGroup_deletedAt_idx" ON "PublicApiGroup"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PublicApiRegistry_tenantId_code_key" ON "PublicApiRegistry"("tenantId", "code");
CREATE INDEX "PublicApiRegistry_tenantId_idx" ON "PublicApiRegistry"("tenantId");
CREATE INDEX "PublicApiRegistry_groupId_idx" ON "PublicApiRegistry"("groupId");
CREATE INDEX "PublicApiRegistry_code_idx" ON "PublicApiRegistry"("code");
CREATE INDEX "PublicApiRegistry_basePath_idx" ON "PublicApiRegistry"("basePath");
CREATE INDEX "PublicApiRegistry_status_idx" ON "PublicApiRegistry"("status");
CREATE INDEX "PublicApiRegistry_lifecycle_idx" ON "PublicApiRegistry"("lifecycle");
CREATE INDEX "PublicApiRegistry_deletedAt_idx" ON "PublicApiRegistry"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PublicApiVersion_apiId_version_key" ON "PublicApiVersion"("apiId", "version");
CREATE INDEX "PublicApiVersion_apiId_idx" ON "PublicApiVersion"("apiId");
CREATE INDEX "PublicApiVersion_version_idx" ON "PublicApiVersion"("version");
CREATE INDEX "PublicApiVersion_status_idx" ON "PublicApiVersion"("status");
CREATE INDEX "PublicApiVersion_lifecycle_idx" ON "PublicApiVersion"("lifecycle");
CREATE INDEX "PublicApiVersion_releasedAt_idx" ON "PublicApiVersion"("releasedAt");
CREATE INDEX "PublicApiVersion_deprecatedAt_idx" ON "PublicApiVersion"("deprecatedAt");
CREATE INDEX "PublicApiVersion_deletedAt_idx" ON "PublicApiVersion"("deletedAt");

-- AddForeignKey
ALTER TABLE "PublicApiGroup" ADD CONSTRAINT "PublicApiGroup_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PublicApiRegistry" ADD CONSTRAINT "PublicApiRegistry_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PublicApiRegistry" ADD CONSTRAINT "PublicApiRegistry_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "PublicApiGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PublicApiVersion" ADD CONSTRAINT "PublicApiVersion_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "PublicApiRegistry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
