$schemaPath = "apps\api\prisma\schema.prisma"

if (!(Test-Path $schemaPath)) {
  Write-Error "schema.prisma not found. Run this script from project root."
  exit 1
}

$schema = Get-Content $schemaPath -Raw

if ($schema -notmatch "enum NotificationChannel") {
  $schema = $schema -replace "enum SelfServiceRequestStatus\s*\{[\s\S]*?\}", @"
enum SelfServiceRequestStatus {
  DRAFT
  SUBMITTED
  IN_REVIEW
  APPROVED
  REJECTED
  CANCELLED
}

enum NotificationChannel {
  IN_APP
  EMAIL
  WHATSAPP
  PUSH
  SMS
}

enum NotificationStatus {
  PENDING
  SENT
  FAILED
  READ
  CANCELLED
}

enum WorkflowStatus {
  DRAFT
  ACTIVE
  INACTIVE
  ARCHIVED
}

enum WorkflowRequestStatus {
  PENDING
  APPROVED
  REJECTED
  CANCELLED
}

enum WorkflowStepStatus {
  PENDING
  APPROVED
  REJECTED
  SKIPPED
}
"@
}

if ($schema -notmatch "notifications\s+Notification\[\]") {
  $schema = $schema -replace "selfServiceRequests\s+SelfServiceRequest\[\]", "selfServiceRequests SelfServiceRequest[]`n  notifications       Notification[]"
}

if ($schema -notmatch "workflowRequests\s+WorkflowRequest\[\]") {
  $schema = $schema -replace "managedPerformanceReviews\s+PerformanceReview\[\]\s+@relation\(""PerformanceReviewManager""\)", "managedPerformanceReviews PerformanceReview[] @relation(""PerformanceReviewManager"")`n  workflowRequests    WorkflowRequest[]`n  workflowApprovals   WorkflowStep[]"
}

if ($schema -notmatch "model Notification") {
  $models = @"

model Notification {
  id          String             @id @default(cuid())
  companyId   String?
  employeeId  String?
  channel     NotificationChannel @default(IN_APP)
  status      NotificationStatus  @default(PENDING)
  title       String
  message     String
  metadata    Json?
  scheduledAt DateTime?
  sentAt      DateTime?
  readAt      DateTime?
  failedAt    DateTime?
  error       String?
  createdAt   DateTime           @default(now())
  updatedAt   DateTime           @updatedAt

  company     Company?           @relation(fields: [companyId], references: [id], onDelete: Cascade)
  employee    Employee?          @relation(fields: [employeeId], references: [id], onDelete: SetNull)

  @@index([companyId])
  @@index([employeeId])
  @@index([channel])
  @@index([status])
  @@index([scheduledAt])
}

model WorkflowDefinition {
  id          String         @id @default(cuid())
  companyId   String
  code        String
  name        String
  description String?
  entityType  String
  status      WorkflowStatus @default(DRAFT)
  isDefault   Boolean        @default(false)
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  company     Company        @relation(fields: [companyId], references: [id], onDelete: Cascade)
  steps       WorkflowDefinitionStep[]
  requests    WorkflowRequest[]

  @@unique([companyId, code])
  @@index([companyId])
  @@index([entityType])
  @@index([status])
}

model WorkflowDefinitionStep {
  id             String             @id @default(cuid())
  workflowId     String
  stepOrder      Int
  name           String
  approverRoleId String?
  approverUserId String?
  approverEmployeeId String?
  isRequired     Boolean            @default(true)
  createdAt      DateTime           @default(now())
  updatedAt      DateTime           @updatedAt

  workflow       WorkflowDefinition @relation(fields: [workflowId], references: [id], onDelete: Cascade)
  approverRole   Role?              @relation(fields: [approverRoleId], references: [id], onDelete: SetNull)
  approverUser   User?              @relation(fields: [approverUserId], references: [id], onDelete: SetNull)
  approverEmployee Employee?        @relation(fields: [approverEmployeeId], references: [id], onDelete: SetNull)

  @@unique([workflowId, stepOrder])
  @@index([workflowId])
  @@index([approverRoleId])
  @@index([approverUserId])
  @@index([approverEmployeeId])
}

model WorkflowRequest {
  id          String                @id @default(cuid())
  workflowId  String
  requesterId String?
  entityType  String
  entityId    String
  title       String
  status      WorkflowRequestStatus @default(PENDING)
  payload     Json?
  submittedAt DateTime              @default(now())
  completedAt DateTime?
  createdAt   DateTime              @default(now())
  updatedAt   DateTime              @updatedAt

  workflow    WorkflowDefinition    @relation(fields: [workflowId], references: [id], onDelete: Cascade)
  requester   Employee?             @relation(fields: [requesterId], references: [id], onDelete: SetNull)
  steps       WorkflowStep[]

  @@index([workflowId])
  @@index([requesterId])
  @@index([entityType])
  @@index([entityId])
  @@index([status])
}

model WorkflowStep {
  id             String             @id @default(cuid())
  requestId      String
  stepOrder      Int
  name           String
  approverId     String?
  status         WorkflowStepStatus @default(PENDING)
  comments       String?
  actedAt        DateTime?
  createdAt      DateTime           @default(now())
  updatedAt      DateTime           @updatedAt

  request        WorkflowRequest    @relation(fields: [requestId], references: [id], onDelete: Cascade)
  approver       Employee?          @relation(fields: [approverId], references: [id], onDelete: SetNull)

  @@unique([requestId, stepOrder])
  @@index([requestId])
  @@index([approverId])
  @@index([status])
}
"@

  $schema = $schema -replace "`nmodel AuditLog", "$models`n`nmodel AuditLog"
}

[System.IO.File]::WriteAllText($schemaPath, $schema, [System.Text.UTF8Encoding]::new($false))

Write-Host "Notifications and Workflow schema patch applied."
