$schemaPath = "apps\api\prisma\schema.prisma"

if (!(Test-Path $schemaPath)) {
  Write-Error "schema.prisma not found. Run this script from project root."
  exit 1
}

$schema = Get-Content $schemaPath -Raw

if ($schema -notmatch "enum DocumentStatus") {
  $schema = $schema -replace "enum AssetMaintenanceStatus\s*\{[\s\S]*?\}", @"
enum AssetMaintenanceStatus {
  SCHEDULED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum DocumentStatus {
  ACTIVE
  EXPIRED
  ARCHIVED
  DELETED
}

enum DocumentVisibility {
  PRIVATE
  HR_ONLY
  MANAGER
  EMPLOYEE
  PUBLIC
}

enum DocumentOwnerType {
  COMPANY
  EMPLOYEE
  ASSET
  RECRUITMENT
  OTHER
}
"@
}

if ($schema -notmatch "documentCategories\s+DocumentCategory\[\]") {
  $schema = $schema -replace "assets\s+Asset\[\]", "assets               Asset[]`n  documentCategories  DocumentCategory[]`n  documents           Document[]"
}

if ($schema -notmatch "documents\s+Document\[\]") {
  $schema = $schema -replace "assetAssignments\s+AssetAssignment\[\]", "assetAssignments     AssetAssignment[]`n  documents           Document[]"
}

if ($schema -notmatch "model DocumentCategory") {
  $models = @"

model DocumentCategory {
  id          String   @id @default(cuid())
  companyId   String
  code        String
  name        String
  description String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  company     Company  @relation(fields: [companyId], references: [id], onDelete: Cascade)
  documents   Document[]

  @@unique([companyId, code])
  @@index([companyId])
  @@index([isActive])
}

model Document {
  id             String             @id @default(cuid())
  companyId      String
  categoryId     String?
  employeeId     String?
  code           String
  title          String
  description    String?
  fileName       String?
  fileUrl        String?
  mimeType       String?
  sizeBytes      Int?
  ownerType      DocumentOwnerType  @default(COMPANY)
  visibility     DocumentVisibility @default(HR_ONLY)
  status         DocumentStatus     @default(ACTIVE)
  issueDate      DateTime?
  expiryDate     DateTime?
  version        Int                @default(1)
  tags           String?
  notes          String?
  createdAt      DateTime           @default(now())
  updatedAt      DateTime           @updatedAt

  company        Company            @relation(fields: [companyId], references: [id], onDelete: Cascade)
  category       DocumentCategory?  @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  employee       Employee?          @relation(fields: [employeeId], references: [id], onDelete: SetNull)
  versions       DocumentVersion[]

  @@unique([companyId, code])
  @@index([companyId])
  @@index([categoryId])
  @@index([employeeId])
  @@index([ownerType])
  @@index([visibility])
  @@index([status])
  @@index([expiryDate])
}

model DocumentVersion {
  id           String   @id @default(cuid())
  documentId   String
  version      Int
  fileName     String?
  fileUrl      String?
  mimeType     String?
  sizeBytes    Int?
  notes        String?
  createdAt    DateTime @default(now())

  document     Document @relation(fields: [documentId], references: [id], onDelete: Cascade)

  @@unique([documentId, version])
  @@index([documentId])
}
"@

  $schema = $schema -replace "`nmodel AuditLog", "$models`n`nmodel AuditLog"
}

[System.IO.File]::WriteAllText($schemaPath, $schema, [System.Text.UTF8Encoding]::new($false))

Write-Host "Documents schema patch applied."
