$schemaPath = "apps\api\prisma\schema.prisma"
$modulePath = "apps\api\src\recruitment\recruitment.module.ts"

if (!(Test-Path $schemaPath)) {
  Write-Error "schema.prisma not found. Run this script from project root."
  exit 1
}

$schema = Get-Content $schemaPath -Raw

if ($schema -notmatch "enum InterviewEvaluationRecommendation") {
  $schema = $schema -replace "enum OfferStatus\s*\{\s*DRAFT\s*SENT\s*ACCEPTED\s*REJECTED\s*EXPIRED\s*CANCELLED\s*\}", @"
enum OfferStatus {
  DRAFT
  SENT
  ACCEPTED
  REJECTED
  EXPIRED
  CANCELLED
}

enum InterviewEvaluationRecommendation {
  HIRE
  HOLD
  REJECT
}
"@
}

if ($schema -notmatch "interviewEvaluations\s+InterviewEvaluation\[\]") {
  $schema = $schema -replace "(interviews\s+Interview\[\])", "`$1`n  interviewEvaluations InterviewEvaluation[] @relation(""InterviewEvaluationEvaluator"")"
}

if ($schema -notmatch "evaluations\s+InterviewEvaluation\[\]") {
  $schema = $schema -replace "(feedback\s+String\?\s*\r?\n\s*createdAt\s+DateTime)", "feedback      String?`n  evaluations   InterviewEvaluation[]`n  createdAt     DateTime"
}

if ($schema -notmatch "model InterviewEvaluation") {
  $model = @"

model InterviewEvaluation {
  id             String                            @id @default(cuid())
  interviewId    String
  evaluatorId    String?
  criteria       String
  score          Decimal                           @db.Decimal(5, 2)
  recommendation InterviewEvaluationRecommendation?
  comments       String?
  createdAt      DateTime                          @default(now())
  updatedAt      DateTime                          @updatedAt

  interview      Interview                         @relation(fields: [interviewId], references: [id], onDelete: Cascade)
  evaluator      Employee?                         @relation("InterviewEvaluationEvaluator", fields: [evaluatorId], references: [id], onDelete: SetNull)

  @@index([interviewId])
  @@index([evaluatorId])
  @@index([recommendation])
}
"@
  $schema = $schema -replace "`nmodel OfferLetter", "$model`n`nmodel OfferLetter"
}

Set-Content $schemaPath $schema -Encoding UTF8

if (Test-Path $modulePath) {
  $module = Get-Content $modulePath -Raw

  if ($module -notmatch "InterviewEvaluationsModule") {
    if ($module -match "InterviewsModule") {
      $module = $module -replace "(import \{ InterviewsModule \} from './interviews/interviews.module';)", "`$1`nimport { InterviewEvaluationsModule } from './interview-evaluations/interview-evaluations.module';"
      $module = $module -replace "(InterviewsModule,\s*)", "`$1`n    InterviewEvaluationsModule,"
    } elseif ($module -match "ApplicationsModule") {
      $module = $module -replace "(import \{ ApplicationsModule \} from './applications/applications.module';)", "`$1`nimport { InterviewEvaluationsModule } from './interview-evaluations/interview-evaluations.module';"
      $module = $module -replace "(ApplicationsModule,\s*)", "`$1`n    InterviewEvaluationsModule,"
    } else {
      Write-Warning "Could not automatically update recruitment.module.ts. Add InterviewEvaluationsModule manually."
    }
    Set-Content $modulePath $module -Encoding UTF8
  }
} else {
  Write-Warning "recruitment.module.ts not found."
}

Write-Host "Interview Evaluations schema/module patch applied."
