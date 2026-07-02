-- CreateEnum
CREATE TYPE "IntegrationHttpMethod" AS ENUM ('GET', 'POST', 'PUT', 'PATCH', 'DELETE');

-- CreateEnum
CREATE TYPE "IntegrationOutboundStatus" AS ENUM ('PENDING', 'QUEUED', 'PROCESSING', 'DELIVERED', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "IntegrationRetryPolicy" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "backoffSeconds" INTEGER NOT NULL DEFAULT 60,
    "backoffMultiplier" INTEGER NOT NULL DEFAULT 2,
    "status" "IntegrationStatus" NOT NULL DEFAULT 'ACTIVE',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationRetryPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationWebhook" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "providerId" TEXT NOT NULL,
    "retryPolicyId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "httpMethod" "IntegrationHttpMethod" NOT NULL DEFAULT 'POST',
    "headers" JSONB,
    "payloadTemplate" JSONB,
    "status" "IntegrationStatus" NOT NULL DEFAULT 'DRAFT',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationWebhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationRestConnector" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "connectionId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "endpointPath" TEXT NOT NULL,
    "httpMethod" "IntegrationHttpMethod" NOT NULL DEFAULT 'POST',
    "requestTemplate" JSONB,
    "responseMapping" JSONB,
    "status" "IntegrationStatus" NOT NULL DEFAULT 'DRAFT',
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationRestConnector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationOutboundJob" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "connectionId" TEXT,
    "webhookId" TEXT,
    "restConnectorId" TEXT,
    "retryPolicyId" TEXT,
    "eventType" TEXT NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "httpMethod" "IntegrationHttpMethod" NOT NULL DEFAULT 'POST',
    "headers" JSONB,
    "payload" JSONB,
    "status" "IntegrationOutboundStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "nextAttemptAt" TIMESTAMP(3),
    "queuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "error" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationOutboundJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IntegrationRetryPolicy_companyId_code_key" ON "IntegrationRetryPolicy"("companyId", "code");

-- CreateIndex
CREATE INDEX "IntegrationRetryPolicy_companyId_idx" ON "IntegrationRetryPolicy"("companyId");

-- CreateIndex
CREATE INDEX "IntegrationRetryPolicy_code_idx" ON "IntegrationRetryPolicy"("code");

-- CreateIndex
CREATE INDEX "IntegrationRetryPolicy_status_idx" ON "IntegrationRetryPolicy"("status");

-- CreateIndex
CREATE INDEX "IntegrationRetryPolicy_deletedAt_idx" ON "IntegrationRetryPolicy"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "IntegrationWebhook_companyId_code_key" ON "IntegrationWebhook"("companyId", "code");

-- CreateIndex
CREATE INDEX "IntegrationWebhook_companyId_idx" ON "IntegrationWebhook"("companyId");

-- CreateIndex
CREATE INDEX "IntegrationWebhook_providerId_idx" ON "IntegrationWebhook"("providerId");

-- CreateIndex
CREATE INDEX "IntegrationWebhook_retryPolicyId_idx" ON "IntegrationWebhook"("retryPolicyId");

-- CreateIndex
CREATE INDEX "IntegrationWebhook_eventType_idx" ON "IntegrationWebhook"("eventType");

-- CreateIndex
CREATE INDEX "IntegrationWebhook_status_idx" ON "IntegrationWebhook"("status");

-- CreateIndex
CREATE INDEX "IntegrationWebhook_deletedAt_idx" ON "IntegrationWebhook"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "IntegrationRestConnector_companyId_code_key" ON "IntegrationRestConnector"("companyId", "code");

-- CreateIndex
CREATE INDEX "IntegrationRestConnector_companyId_idx" ON "IntegrationRestConnector"("companyId");

-- CreateIndex
CREATE INDEX "IntegrationRestConnector_connectionId_idx" ON "IntegrationRestConnector"("connectionId");

-- CreateIndex
CREATE INDEX "IntegrationRestConnector_status_idx" ON "IntegrationRestConnector"("status");

-- CreateIndex
CREATE INDEX "IntegrationRestConnector_deletedAt_idx" ON "IntegrationRestConnector"("deletedAt");

-- CreateIndex
CREATE INDEX "IntegrationOutboundJob_companyId_idx" ON "IntegrationOutboundJob"("companyId");

-- CreateIndex
CREATE INDEX "IntegrationOutboundJob_connectionId_idx" ON "IntegrationOutboundJob"("connectionId");

-- CreateIndex
CREATE INDEX "IntegrationOutboundJob_webhookId_idx" ON "IntegrationOutboundJob"("webhookId");

-- CreateIndex
CREATE INDEX "IntegrationOutboundJob_restConnectorId_idx" ON "IntegrationOutboundJob"("restConnectorId");

-- CreateIndex
CREATE INDEX "IntegrationOutboundJob_retryPolicyId_idx" ON "IntegrationOutboundJob"("retryPolicyId");

-- CreateIndex
CREATE INDEX "IntegrationOutboundJob_eventType_idx" ON "IntegrationOutboundJob"("eventType");

-- CreateIndex
CREATE INDEX "IntegrationOutboundJob_status_idx" ON "IntegrationOutboundJob"("status");

-- CreateIndex
CREATE INDEX "IntegrationOutboundJob_nextAttemptAt_idx" ON "IntegrationOutboundJob"("nextAttemptAt");

-- CreateIndex
CREATE INDEX "IntegrationOutboundJob_queuedAt_idx" ON "IntegrationOutboundJob"("queuedAt");

-- AddForeignKey
ALTER TABLE "IntegrationRetryPolicy" ADD CONSTRAINT "IntegrationRetryPolicy_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationWebhook" ADD CONSTRAINT "IntegrationWebhook_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationWebhook" ADD CONSTRAINT "IntegrationWebhook_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "IntegrationProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationWebhook" ADD CONSTRAINT "IntegrationWebhook_retryPolicyId_fkey" FOREIGN KEY ("retryPolicyId") REFERENCES "IntegrationRetryPolicy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationRestConnector" ADD CONSTRAINT "IntegrationRestConnector_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationRestConnector" ADD CONSTRAINT "IntegrationRestConnector_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "IntegrationConnection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationOutboundJob" ADD CONSTRAINT "IntegrationOutboundJob_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationOutboundJob" ADD CONSTRAINT "IntegrationOutboundJob_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "IntegrationConnection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationOutboundJob" ADD CONSTRAINT "IntegrationOutboundJob_webhookId_fkey" FOREIGN KEY ("webhookId") REFERENCES "IntegrationWebhook"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationOutboundJob" ADD CONSTRAINT "IntegrationOutboundJob_restConnectorId_fkey" FOREIGN KEY ("restConnectorId") REFERENCES "IntegrationRestConnector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationOutboundJob" ADD CONSTRAINT "IntegrationOutboundJob_retryPolicyId_fkey" FOREIGN KEY ("retryPolicyId") REFERENCES "IntegrationRetryPolicy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
