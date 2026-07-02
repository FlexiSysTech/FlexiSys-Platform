-- CreateEnum
CREATE TYPE "IntegrationInboundStatus" AS ENUM ('RECEIVED', 'VALIDATED', 'NORMALIZED', 'REJECTED', 'PROCESSED', 'FAILED');

-- CreateTable
CREATE TABLE "IntegrationInboundEvent" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "connectionId" TEXT,
    "eventType" TEXT NOT NULL,
    "source" TEXT,
    "headers" JSONB,
    "signature" TEXT,
    "signatureValid" BOOLEAN NOT NULL DEFAULT false,
    "rawPayload" JSONB,
    "normalizedPayload" JSONB,
    "status" "IntegrationInboundStatus" NOT NULL DEFAULT 'RECEIVED',
    "error" TEXT,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationInboundEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IntegrationInboundEvent_companyId_idx" ON "IntegrationInboundEvent"("companyId");

-- CreateIndex
CREATE INDEX "IntegrationInboundEvent_connectionId_idx" ON "IntegrationInboundEvent"("connectionId");

-- CreateIndex
CREATE INDEX "IntegrationInboundEvent_eventType_idx" ON "IntegrationInboundEvent"("eventType");

-- CreateIndex
CREATE INDEX "IntegrationInboundEvent_status_idx" ON "IntegrationInboundEvent"("status");

-- CreateIndex
CREATE INDEX "IntegrationInboundEvent_signatureValid_idx" ON "IntegrationInboundEvent"("signatureValid");

-- CreateIndex
CREATE INDEX "IntegrationInboundEvent_receivedAt_idx" ON "IntegrationInboundEvent"("receivedAt");

-- AddForeignKey
ALTER TABLE "IntegrationInboundEvent" ADD CONSTRAINT "IntegrationInboundEvent_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationInboundEvent" ADD CONSTRAINT "IntegrationInboundEvent_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "IntegrationConnection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
