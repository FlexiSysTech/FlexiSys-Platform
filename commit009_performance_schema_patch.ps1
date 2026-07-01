$schemaPath = "apps\api\prisma\schema.prisma"

if (!(Test-Path $schemaPath)) {
  Write-Error "schema.prisma not found. Run this script from project root."
  exit 1
}

$schema = Get-Content $schemaPath -Raw

if ($schema -notmatch "enum PerformanceCycleStatus") {
  $schema = $schema -replace "enum OfferStatus\s*\{[\s\S]*?\}", @"
enum OfferStatus {
  DRAFT
  SENT
  ACCEPTED
  REJECTED
  EXPIRED
  CANCELLED
}

enum PerformanceCycleStatus {
  DRAFT
  ACTIVE
  CLOSED
  ARCHIVED
}

enum PerformanceReviewStatus {
  DRAFT
  SELF_REVIEW
  MANAGER_REVIEW
  HR_REVIEW
  APPROVED
  REJECTED
  CLOSED
}

enum PerformanceGoalStatus {
  DRAFT
  ACTIVE
  COMPLETED
  CANCELLED
}

enum PerformanceRating {
  OUTSTANDING
  EXCEEDS_EXPECTATIONS
  MEETS_EXPECTATIONS
  NEEDS_IMPROVEMENT
  UNSATISFACTORY
}
"@
}

if ($schema -notmatch "performanceCycles\s+PerformanceCycle\[\]") {
  $schema = $schema -replace "vacancies\s+Vacancy\[\]", "vacancies             Vacancy[]`n  performanceCycles    PerformanceCycle[]"
}

if ($schema -notmatch "performanceGoals\s+PerformanceGoal\[\]") {
  $schema = $schema -replace "interviewEvaluations\s+InterviewEvaluation\[\]\s+@relation\(""InterviewEvaluationEvaluator""\)", "interviewEvaluations InterviewEvaluation[] @relation(""InterviewEvaluationEvaluator"")`n  performanceGoals     PerformanceGoal[]`n  performanceReviews   PerformanceReview[]"
}

if ($schema -notmatch "model PerformanceCycle") {
  $models = @"

model PerformanceCycle {
  id          String                 @id @default(cuid())
  companyId   String
  code        String
  name        String
  description String?
  startDate   DateTime
  endDate     DateTime
  status      PerformanceCycleStatus @default(DRAFT)
  createdAt   DateTime               @default(now())
  updatedAt   DateTime               @updatedAt

  company     Company                @relation(fields: [companyId], references: [id], onDelete: Cascade)
  goals       PerformanceGoal[]
  reviews     PerformanceReview[]

  @@unique([companyId, code])
  @@index([companyId])
  @@index([status])
  @@index([startDate])
  @@index([endDate])
}

model PerformanceGoal {
  id          String                @id @default(cuid())
  cycleId     String
  employeeId  String
  title       String
  description String?
  weight      Decimal               @default(0) @db.Decimal(6, 2)
  targetValue Decimal?              @db.Decimal(12, 2)
  actualValue Decimal?              @db.Decimal(12, 2)
  status      PerformanceGoalStatus @default(DRAFT)
  createdAt   DateTime              @default(now())
  updatedAt   DateTime              @updatedAt

  cycle       PerformanceCycle      @relation(fields: [cycleId], references: [id], onDelete: Cascade)
  employee    Employee              @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@index([cycleId])
  @@index([employeeId])
  @@index([status])
}

model PerformanceReview {
  id              String                  @id @default(cuid())
  cycleId          String
  employeeId       String
  managerId        String?
  status           PerformanceReviewStatus @default(DRAFT)
  selfScore        Decimal?                @db.Decimal(6, 2)
  managerScore     Decimal?                @db.Decimal(6, 2)
  finalScore       Decimal?                @db.Decimal(6, 2)
  finalRating      PerformanceRating?
  selfComments     String?
  managerComments  String?
  hrComments       String?
  submittedAt      DateTime?
  approvedAt       DateTime?
  createdAt        DateTime                @default(now())
  updatedAt        DateTime                @updatedAt

  cycle            PerformanceCycle        @relation(fields: [cycleId], references: [id], onDelete: Cascade)
  employee         Employee                @relation("PerformanceReviewEmployee", fields: [employeeId], references: [id], onDelete: Cascade)
  manager          Employee?               @relation("PerformanceReviewManager", fields: [managerId], references: [id], onDelete: SetNull)
  items            PerformanceReviewItem[]

  @@unique([cycleId, employeeId])
  @@index([cycleId])
  @@index([employeeId])
  @@index([managerId])
  @@index([status])
}

model PerformanceReviewItem {
  id          String             @id @default(cuid())
  reviewId    String
  title       String
  description String?
  weight      Decimal            @default(0) @db.Decimal(6, 2)
  score       Decimal?           @db.Decimal(6, 2)
  rating      PerformanceRating?
  comments    String?
  createdAt   DateTime           @default(now())
  updatedAt   DateTime           @updatedAt

  review      PerformanceReview  @relation(fields: [reviewId], references: [id], onDelete: Cascade)

  @@index([reviewId])
  @@index([rating])
}
"@

  $schema = $schema -replace "`nmodel AuditLog", "$models`n`nmodel AuditLog"
}

if ($schema -notmatch "managedPerformanceReviews\s+PerformanceReview\[\]") {
  $schema = $schema -replace "performanceReviews\s+PerformanceReview\[\]", "performanceReviews   PerformanceReview[] @relation(""PerformanceReviewEmployee"")`n  managedPerformanceReviews PerformanceReview[] @relation(""PerformanceReviewManager"")"
}

[System.IO.File]::WriteAllText($schemaPath, $schema, [System.Text.UTF8Encoding]::new($false))

Write-Host "Performance schema patch applied."
