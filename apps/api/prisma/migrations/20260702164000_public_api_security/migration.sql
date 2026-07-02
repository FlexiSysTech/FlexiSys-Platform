-- CreateTable
CREATE TABLE "PublicApiRequestLog" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "applicationId" TEXT,
    "apiId" TEXT,
    "keyId" TEXT,
    "method" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "signatureValid" BOOLEAN NOT NULL DEFAULT false,
    "statusCode" INTEGER,
    "requestHash" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PublicApiRequestLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicApiSignatureNonce" (
    "id" TEXT NOT NULL,
    "nonceKey" TEXT NOT NULL,
    "tenantId" TEXT,
    "applicationId" TEXT,
    "nonce" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PublicApiSignatureNonce_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PublicApiRequestLog_tenantId_idx" ON "PublicApiRequestLog"("tenantId");
CREATE INDEX "PublicApiRequestLog_applicationId_idx" ON "PublicApiRequestLog"("applicationId");
CREATE INDEX "PublicApiRequestLog_apiId_idx" ON "PublicApiRequestLog"("apiId");
CREATE INDEX "PublicApiRequestLog_keyId_idx" ON "PublicApiRequestLog"("keyId");
CREATE INDEX "PublicApiRequestLog_endpoint_idx" ON "PublicApiRequestLog"("endpoint");
CREATE INDEX "PublicApiRequestLog_signatureValid_idx" ON "PublicApiRequestLog"("signatureValid");
CREATE INDEX "PublicApiRequestLog_statusCode_idx" ON "PublicApiRequestLog"("statusCode");
CREATE INDEX "PublicApiRequestLog_createdAt_idx" ON "PublicApiRequestLog"("createdAt");
CREATE UNIQUE INDEX "PublicApiSignatureNonce_nonceKey_key" ON "PublicApiSignatureNonce"("nonceKey");
CREATE INDEX "PublicApiSignatureNonce_tenantId_idx" ON "PublicApiSignatureNonce"("tenantId");
CREATE INDEX "PublicApiSignatureNonce_applicationId_idx" ON "PublicApiSignatureNonce"("applicationId");
CREATE INDEX "PublicApiSignatureNonce_nonce_idx" ON "PublicApiSignatureNonce"("nonce");
CREATE INDEX "PublicApiSignatureNonce_expiresAt_idx" ON "PublicApiSignatureNonce"("expiresAt");
CREATE INDEX "PublicApiSignatureNonce_usedAt_idx" ON "PublicApiSignatureNonce"("usedAt");

-- AddForeignKey
ALTER TABLE "PublicApiRequestLog" ADD CONSTRAINT "PublicApiRequestLog_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PublicApiRequestLog" ADD CONSTRAINT "PublicApiRequestLog_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "PublicApiApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PublicApiRequestLog" ADD CONSTRAINT "PublicApiRequestLog_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "PublicApiRegistry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PublicApiSignatureNonce" ADD CONSTRAINT "PublicApiSignatureNonce_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PublicApiSignatureNonce" ADD CONSTRAINT "PublicApiSignatureNonce_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "PublicApiApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
