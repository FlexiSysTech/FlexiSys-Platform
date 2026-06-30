$schemaPath = "apps\api\prisma\schema.prisma"

if (!(Test-Path $schemaPath)) {
  Write-Error "schema.prisma not found. Run this script from project root: I:\FlexiSys\Repositories\FlexiSys-Platform"
  exit 1
}

$schema = Get-Content $schemaPath -Raw

if ($schema -notmatch "enum RecruitmentStatus") {
  $schema = $schema -replace "enum PayslipStatus\s*\{\s*DRAFT\s*ISSUED\s*PAID\s*CANCELLED\s*\}", @"
enum PayslipStatus {
  DRAFT
  ISSUED
  PAID
  CANCELLED
}

enum RecruitmentStatus {
  ACTIVE
  INACTIVE
  ARCHIVED
}

enum VacancyStatus {
  DRAFT
  OPEN
  CLOSED
  CANCELLED
}

enum ApplicantStatus {
  NEW
  SCREENING
  INTERVIEW
  OFFER
  HIRED
  REJECTED
}

enum JobApplicationStatus {
  APPLIED
  SCREENING
  SHORTLISTED
  INTERVIEW
  OFFER
  HIRED
  REJECTED
  WITHDRAWN
}

enum InterviewStatus {
  SCHEDULED
  COMPLETED
  CANCELLED
  NO_SHOW
}

enum OfferStatus {
  DRAFT
  SENT
  ACCEPTED
  REJECTED
  EXPIRED
  CANCELLED
}
"@
}

if ($schema -notmatch "jobPositions\s+JobPosition\[\]") {
  $schema = $schema -replace "payrollRuns\s+PayrollRun\[\]", "payrollRuns            PayrollRun[]`n  jobPositions          JobPosition[]`n  vacancies             Vacancy[]"
}

if ($schema -notmatch "applications\s+JobApplication\[\]") {
  $schema = $schema -replace "payslips\s+Payslip\[\]", "payslips           Payslip[]`n  applications       JobApplication[]`n  interviews         Interview[]"
}

if ($schema -notmatch "model JobPosition") {
  $models = @"

model JobPosition {
  id          String            @id @default(cuid())
  companyId   String
  code        String
  title       String
  description String?
  status      RecruitmentStatus @default(ACTIVE)
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt

  company     Company           @relation(fields: [companyId], references: [id], onDelete: Cascade)
  vacancies   Vacancy[]

  @@unique([companyId, code])
  @@index([companyId])
  @@index([status])
}

model Vacancy {
  id            String        @id @default(cuid())
  companyId     String
  jobPositionId String
  code          String
  title         String
  description   String?
  openings      Int           @default(1)
  status        VacancyStatus @default(DRAFT)
  openedAt      DateTime?
  closedAt      DateTime?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  company       Company       @relation(fields: [companyId], references: [id], onDelete: Cascade)
  jobPosition   JobPosition   @relation(fields: [jobPositionId], references: [id], onDelete: Cascade)
  applications  JobApplication[]

  @@unique([companyId, code])
  @@index([companyId])
  @@index([jobPositionId])
  @@index([status])
}

model Applicant {
  id             String          @id @default(cuid())
  firstName      String
  middleName     String?
  lastName       String
  fullName       String
  email          String?
  phone          String?
  nationalId     String?
  nationality    String?
  currentCompany String?
  currentTitle   String?
  resumeUrl      String?
  status         ApplicantStatus @default(NEW)
  notes          String?
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt

  applications   JobApplication[]

  @@index([email])
  @@index([phone])
  @@index([status])
}

model JobApplication {
  id           String               @id @default(cuid())
  vacancyId    String
  applicantId  String
  employeeId   String?
  status       JobApplicationStatus @default(APPLIED)
  source       String?
  appliedAt    DateTime             @default(now())
  hiredAt      DateTime?
  rejectedAt   DateTime?
  notes        String?
  createdAt    DateTime             @default(now())
  updatedAt    DateTime             @updatedAt

  vacancy      Vacancy              @relation(fields: [vacancyId], references: [id], onDelete: Cascade)
  applicant    Applicant            @relation(fields: [applicantId], references: [id], onDelete: Cascade)
  employee     Employee?            @relation(fields: [employeeId], references: [id], onDelete: SetNull)
  interviews   Interview[]
  offerLetters OfferLetter[]

  @@unique([vacancyId, applicantId])
  @@index([vacancyId])
  @@index([applicantId])
  @@index([employeeId])
  @@index([status])
}

model Interview {
  id            String          @id @default(cuid())
  applicationId String
  interviewerId String?
  scheduledAt   DateTime
  location      String?
  meetingUrl    String?
  status        InterviewStatus @default(SCHEDULED)
  score         Decimal?        @db.Decimal(5, 2)
  feedback      String?
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  application   JobApplication  @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  interviewer   Employee?       @relation(fields: [interviewerId], references: [id], onDelete: SetNull)

  @@index([applicationId])
  @@index([interviewerId])
  @@index([scheduledAt])
  @@index([status])
}

model OfferLetter {
  id            String         @id @default(cuid())
  applicationId String
  title         String
  salaryAmount  Decimal?       @db.Decimal(12, 2)
  startDate     DateTime?
  expiryDate    DateTime?
  status        OfferStatus    @default(DRAFT)
  sentAt        DateTime?
  acceptedAt    DateTime?
  rejectedAt    DateTime?
  content       String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  application   JobApplication @relation(fields: [applicationId], references: [id], onDelete: Cascade)

  @@index([applicationId])
  @@index([status])
}
"@

  $schema = $schema -replace "`nmodel AuditLog", "$models`n`nmodel AuditLog"
}

Set-Content $schemaPath $schema -Encoding UTF8
Write-Host "Recruitment schema patch applied."
