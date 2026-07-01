$schemaPath = "apps\api\prisma\schema.prisma"

if (!(Test-Path $schemaPath)) {
  Write-Error "schema.prisma not found. Run this script from project root."
  exit 1
}

$schema = Get-Content $schemaPath -Raw

if ($schema -notmatch "enum AssetStatus") {
  $schema = $schema -replace "enum PerformanceRating\s*\{[\s\S]*?\}", @"
enum PerformanceRating {
  OUTSTANDING
  EXCEEDS_EXPECTATIONS
  MEETS_EXPECTATIONS
  NEEDS_IMPROVEMENT
  UNSATISFACTORY
}

enum AssetStatus {
  AVAILABLE
  ASSIGNED
  MAINTENANCE
  RETIRED
  LOST
}

enum AssetAssignmentStatus {
  ASSIGNED
  RETURNED
  LOST
  DAMAGED
}

enum AssetMaintenanceStatus {
  SCHEDULED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}
"@
}

if ($schema -notmatch "assetCategories\s+AssetCategory\[\]") {
  $schema = $schema -replace "performanceCycles\s+PerformanceCycle\[\]", "performanceCycles    PerformanceCycle[]`n  assetCategories      AssetCategory[]`n  assets               Asset[]"
}

if ($schema -notmatch "assetAssignments\s+AssetAssignment\[\]") {
  $schema = $schema -replace "managedPerformanceReviews\s+PerformanceReview\[\]\s+@relation\(""PerformanceReviewManager""\)", "managedPerformanceReviews PerformanceReview[] @relation(""PerformanceReviewManager"")`n  assetAssignments     AssetAssignment[]"
}

if ($schema -notmatch "model AssetCategory") {
  $models = @"

model AssetCategory {
  id          String   @id @default(cuid())
  companyId   String
  code        String
  name        String
  description String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  company     Company  @relation(fields: [companyId], references: [id], onDelete: Cascade)
  assets      Asset[]

  @@unique([companyId, code])
  @@index([companyId])
  @@index([isActive])
}

model Asset {
  id             String      @id @default(cuid())
  companyId      String
  categoryId     String?
  code           String
  name           String
  serialNumber   String?
  purchaseDate   DateTime?
  purchaseCost   Decimal?    @db.Decimal(12, 2)
  currentValue   Decimal?    @db.Decimal(12, 2)
  location       String?
  status         AssetStatus @default(AVAILABLE)
  notes          String?
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt

  company        Company     @relation(fields: [companyId], references: [id], onDelete: Cascade)
  category       AssetCategory? @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  assignments    AssetAssignment[]
  maintenances   AssetMaintenance[]

  @@unique([companyId, code])
  @@index([companyId])
  @@index([categoryId])
  @@index([status])
}

model AssetAssignment {
  id             String                @id @default(cuid())
  assetId        String
  employeeId     String
  assignedAt     DateTime              @default(now())
  returnedAt     DateTime?
  status         AssetAssignmentStatus @default(ASSIGNED)
  conditionOut   String?
  conditionIn    String?
  notes          String?
  createdAt      DateTime              @default(now())
  updatedAt      DateTime              @updatedAt

  asset          Asset                 @relation(fields: [assetId], references: [id], onDelete: Cascade)
  employee       Employee              @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@index([assetId])
  @@index([employeeId])
  @@index([status])
}

model AssetMaintenance {
  id             String                 @id @default(cuid())
  assetId        String
  title          String
  description    String?
  vendorName     String?
  cost           Decimal?               @db.Decimal(12, 2)
  scheduledDate  DateTime?
  completedDate  DateTime?
  status         AssetMaintenanceStatus @default(SCHEDULED)
  createdAt      DateTime               @default(now())
  updatedAt      DateTime               @updatedAt

  asset          Asset                  @relation(fields: [assetId], references: [id], onDelete: Cascade)

  @@index([assetId])
  @@index([status])
  @@index([scheduledDate])
}
"@

  $schema = $schema -replace "`nmodel AuditLog", "$models`n`nmodel AuditLog"
}

[System.IO.File]::WriteAllText($schemaPath, $schema, [System.Text.UTF8Encoding]::new($false))

Write-Host "Assets schema patch applied."
