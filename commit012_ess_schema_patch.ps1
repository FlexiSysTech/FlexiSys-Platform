$schemaPath = "apps\api\prisma\schema.prisma"

if (!(Test-Path $schemaPath)) {
  Write-Error "schema.prisma not found. Run this script from project root."
  exit 1
}

$schema = Get-Content $schemaPath -Raw

if ($schema -notmatch "enum SelfServiceRequestType") {
  $schema = $schema -replace "enum DocumentOwnerType\s*\{[\s\S]*?\}", @"
enum DocumentOwnerType {
  COMPANY
  EMPLOYEE
  ASSET
  RECRUITMENT
  OTHER
}

enum SelfServiceRequestType {
  PROFILE_UPDATE
  DOCUMENT_REQUEST
  ASSET_REQUEST
  PAYSLIP_REQUEST
  GENERAL
}

enum SelfServiceRequestStatus {
  DRAFT
  SUBMITTED
  IN_REVIEW
  APPROVED
  REJECTED
  CANCELLED
}
"@
}

if ($schema -notmatch "selfServiceRequests\s+SelfServiceRequest\[\]") {
  $schema = $schema -replace "documents\s+Document\[\]", "documents           Document[]`n  selfServiceRequests SelfServiceRequest[]"
}

if ($schema -notmatch "model SelfServiceRequest") {
  $models = @"

model SelfServiceRequest {
  id          String                   @id @default(cuid())
  employeeId  String
  type        SelfServiceRequestType
  title       String
  description String?
  status      SelfServiceRequestStatus @default(DRAFT)
  payload     Json?
  response    String?
  submittedAt DateTime?
  reviewedAt  DateTime?
  createdAt   DateTime                 @default(now())
  updatedAt   DateTime                 @updatedAt

  employee    Employee                 @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@index([employeeId])
  @@index([type])
  @@index([status])
  @@index([submittedAt])
}
"@

  $schema = $schema -replace "`nmodel AuditLog", "$models`n`nmodel AuditLog"
}

[System.IO.File]::WriteAllText($schemaPath, $schema, [System.Text.UTF8Encoding]::new($false))

Write-Host "ESS schema patch applied."
