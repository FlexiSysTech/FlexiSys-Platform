$schemaPath = "apps\api\prisma\schema.prisma"

$schema = Get-Content $schemaPath -Raw

if ($schema -notmatch "enum LeaveTypeStatus") {
  $schema = $schema -replace "enum WeekDay \{([\s\S]*?)\}", @"
enum WeekDay {
  SUNDAY
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY
}

enum LeaveTypeStatus {
  ACTIVE
  INACTIVE
  ARCHIVED
}

enum LeaveRequestStatus {
  DRAFT
  PENDING
  APPROVED
  REJECTED
  CANCELLED
}

enum LeaveApprovalStatus {
  PENDING
  APPROVED
  REJECTED
}
"@
}

if ($schema -notmatch 'leaveApprovals\s+LeaveApproval\[\]') {
  $schema = $schema -replace "employee\s+Employee\?", "employee          Employee?`n  leaveApprovals    LeaveApproval[] @relation(""LeaveApprovalApprover"")"
}

if ($schema -notmatch 'leaveTypes\s+LeaveType\[\]') {
  $schema = $schema -replace "holidays\s+Holiday\[\]", "holidays               Holiday[]`n  leaveTypes             LeaveType[]`n  leaveBalances          LeaveBalance[]"
}

if ($schema -notmatch 'leaveBalances\s+LeaveBalance\[\]') {
  $schema = $schema -replace "attendanceRecords AttendanceRecord\[\]", "attendanceRecords AttendanceRecord[]`n  leaveBalances     LeaveBalance[]`n  leaveRequests     LeaveRequest[]"
}

if ($schema -notmatch "model LeaveType") {
  $leaveModels = @"

model LeaveType {
  id                  String          @id @default(cuid())
  companyId           String
  code                String
  name                String
  description         String?
  annualAllowanceDays Decimal?        @db.Decimal(8, 2)
  requiresApproval    Boolean         @default(true)
  isPaid              Boolean         @default(true)
  status              LeaveTypeStatus @default(ACTIVE)
  createdAt           DateTime        @default(now())
  updatedAt           DateTime        @updatedAt

  company             Company         @relation(fields: [companyId], references: [id], onDelete: Cascade)
  balances            LeaveBalance[]
  requests            LeaveRequest[]

  @@unique([companyId, code])
  @@index([companyId])
  @@index([status])
}

model LeaveBalance {
  id             String   @id @default(cuid())
  companyId      String
  employeeId     String
  leaveTypeId    String
  year           Int
  openingBalance Decimal  @default(0) @db.Decimal(8, 2)
  accrued        Decimal  @default(0) @db.Decimal(8, 2)
  used           Decimal  @default(0) @db.Decimal(8, 2)
  adjusted       Decimal  @default(0) @db.Decimal(8, 2)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  company        Company   @relation(fields: [companyId], references: [id], onDelete: Cascade)
  employee       Employee  @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  leaveType      LeaveType @relation(fields: [leaveTypeId], references: [id], onDelete: Cascade)

  @@unique([employeeId, leaveTypeId, year])
  @@index([companyId])
  @@index([employeeId])
  @@index([leaveTypeId])
  @@index([year])
}

model LeaveRequest {
  id          String             @id @default(cuid())
  employeeId  String
  leaveTypeId String
  startDate   DateTime
  endDate     DateTime
  totalDays   Decimal            @db.Decimal(8, 2)
  reason      String?
  status      LeaveRequestStatus @default(PENDING)
  submittedAt DateTime           @default(now())
  approvedAt  DateTime?
  rejectedAt  DateTime?
  cancelledAt DateTime?
  createdAt   DateTime           @default(now())
  updatedAt   DateTime           @updatedAt

  employee    Employee           @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  leaveType   LeaveType          @relation(fields: [leaveTypeId], references: [id], onDelete: Cascade)
  approvals   LeaveApproval[]

  @@index([employeeId])
  @@index([leaveTypeId])
  @@index([startDate])
  @@index([endDate])
  @@index([status])
}

model LeaveApproval {
  id             String              @id @default(cuid())
  leaveRequestId String
  approverId     String
  level          Int                 @default(1)
  status         LeaveApprovalStatus @default(PENDING)
  comments       String?
  actedAt        DateTime?
  createdAt      DateTime            @default(now())
  updatedAt      DateTime            @updatedAt

  leaveRequest   LeaveRequest        @relation(fields: [leaveRequestId], references: [id], onDelete: Cascade)
  approver       User                @relation("LeaveApprovalApprover", fields: [approverId], references: [id], onDelete: Cascade)

  @@unique([leaveRequestId, approverId, level])
  @@index([leaveRequestId])
  @@index([approverId])
  @@index([status])
}
"@

  $schema = $schema -replace "`nmodel AuditLog", "$leaveModels`n`nmodel AuditLog"
}

Set-Content $schemaPath $schema -Encoding UTF8
Write-Host "Leave schema patch applied."
