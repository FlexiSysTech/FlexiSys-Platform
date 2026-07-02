# FlexiSys Platform RC 1.0 Stabilization Report

Date: 2026-07-02
Scope: Full repository stabilization inspection
Status: Report only, no code changes

## Inspection Scope

Reviewed:

- `.architecture`
- `handbook`
- `docs`
- `docs/RELEASE_CANDIDATE_1_0.md`
- API source tree under `apps/api/src`
- Prisma schema and migration-backed model structure
- Module wiring, provider registration, controller protection, query patterns, audit usage, soft-delete usage, tenant context usage, logging, and obvious dead-code signals

The repository currently contains 598 API source files across 31 source directories.

## Critical Issues

1. Tenant and company context can be supplied through request headers without verified membership enforcement.
   - Evidence: `RequestContextMiddleware` reads `x-tenant-id`, `x-tenant-code`, `x-company-id`, and `x-branch-id` directly from request headers in `apps/api/src/platform/request-context/request-context.middleware.ts`.
   - Risk: Any authenticated user with a broad permission could potentially select another tenant/company context unless every controller/service separately validates membership.
   - Recommended RC fix: Introduce a tenant/company authorization guard that resolves allowed tenant/company/branch access from the authenticated user and rejects mismatched headers before services use request context.

2. Several sensitive legacy modules expose unscoped reads that do not apply tenant, company, branch, or request-context filters.
   - Evidence: `EmployeesService.findAll` returns all employees in `apps/api/src/employees/employees.service.ts`; `WorkflowRuntimeService.findAll` returns all workflow requests in `apps/api/src/workflows/runtime/workflow-runtime.service.ts`; `JournalEntriesService.findAll` returns all journal entries in `apps/api/src/accounting/journal-entries/journal-entries.service.ts`.
   - Risk: Cross-company or cross-tenant leakage of employee, workflow, payroll, and accounting data.
   - Recommended RC fix: Add mandatory company/tenant scoping to list and detail APIs, using verified request context rather than caller-supplied filters.

3. Accounting report APIs are globally scoped and can aggregate financial data across all companies.
   - Evidence: `AccountingReportsService.trialBalance`, `generalLedger`, `payrollAccountingReport`, and `costCenterAccountingReport` query accounts, journal lines, and journal entries without a company filter in `apps/api/src/accounting/reports/accounting-reports.service.ts`.
   - Risk: Cross-company financial data exposure and incorrect enterprise reporting.
   - Recommended RC fix: Require `companyId` from verified context or query input and filter every accounting report query by company; add branch/cost-center filters where applicable.

4. Public API signature verification appears to use the stored hash as the HMAC secret.
   - Evidence: API keys store `secretHash`, but `verifySignedRequest` calls `createHmac('sha256', key.secretHash)` in `apps/api/src/public-api/public-api.service.ts`.
   - Risk: A client signing with the one-time raw secret will not match server verification unless the client is expected to use the hash as the actual secret. That breaks request signing semantics and can make the Public API platform unusable for signed requests.
   - Recommended RC fix: Define the signing contract explicitly. Either store an encrypted/retrievable signing secret, or document and enforce a derived-secret protocol where the client signs with the same derived key.

## High Issues

1. Hard deletes remain in business-critical modules.
   - Evidence: Direct deletes exist in employees, permissions, payroll, accounting, organization, assets, documents, leave, recruitment, and performance services.
   - Risk: Loss of auditability and recovery for regulated HR/payroll/accounting records.
   - Recommended RC fix: Migrate business-critical deletes to the platform soft-delete service where models support `deletedAt`, and add soft-delete fields to remaining critical models where required.

2. Audit coverage is uneven across legacy modules.
   - Evidence: Newer modules use `AuditService`, while older modules such as employees, permissions, organization, and several payroll CRUD services do not consistently record create/update/delete events.
   - Risk: Sensitive HR/payroll/security changes may not be traceable.
   - Recommended RC fix: Add audit coverage to employee changes, permission changes, payroll component/profile changes, and all accounting write actions through the central audit framework.

3. Relation validation does not always enforce same-company consistency.
   - Evidence: `EmployeesService.ensureOptionalRelationsExist` validates branch, department, position, and cost center existence but does not verify they belong to the employee company. `JournalEntriesService.ensureDimensionsExist` validates optional dimensions exist but does not verify they belong to the journal entry company.
   - Risk: Cross-company references can corrupt reporting and tenant isolation.
   - Recommended RC fix: Enforce same-company checks for all relation validators, especially employee organization fields and accounting journal dimensions.

4. Payroll attendance integration performs database queries inside per-employee loops.
   - Evidence: `PayrollAttendanceService.applyAttendanceImpacts` loads attendance records and leave requests inside a loop over employee rates.
   - Risk: N+1 behavior during payroll processing; high latency or transaction timeouts for large companies.
   - Recommended RC fix: Preload attendance and leave data for all employees in the payroll period with grouped queries, then batch-create generated payroll items.

5. Payroll formula evaluation uses dynamic code execution.
   - Evidence: `PayrollCalculationService.evaluateFormula` uses `Function(...)` after sanitizing expressions.
   - Risk: The current regex reduces exposure, but enterprise payroll formulas should not depend on dynamic JavaScript execution.
   - Recommended RC fix: Replace with a small expression parser or a controlled formula engine that supports only approved operators and variables.

6. Compiler unused-code checks fail when explicitly enabled.
   - Evidence: `npx tsc --noEmit --pretty false --noUnusedLocals --noUnusedParameters` reported unused members/imports in mobile, observability, payroll calculation, plugins, and workflow runtime.
   - Risk: Small but real dead-code drift before production.
   - Recommended RC fix: Remove unused imports/helpers or enable unused checks in CI after cleanup.

## Medium Issues

1. Many list endpoints are unpaginated.
   - Evidence: `findAll(): Promise<...[]>` appears across employees, accounting, workflows, assets, attendance, documents, leave, payroll, organization, recruitment, users, permissions, and performance services.
   - Risk: Memory and latency issues at enterprise scale.
   - Recommended RC fix: Migrate list endpoints to the platform pagination framework as modules are stabilized.

2. Repository pattern is inconsistent.
   - Evidence: Most services call Prisma directly. Newer modules use platform services, but older modules repeat raw Prisma CRUD, validation, and mapping logic.
   - Risk: Duplicated behavior and uneven tenant/audit/soft-delete enforcement.
   - Recommended RC fix: Introduce tenant-aware repository helpers for common scoped reads/writes and use them first in sensitive modules.

3. Validation logic is duplicated across services.
   - Evidence: Repeated `ensureCompanyExists`, `ensureUserExists`, uniqueness checks, decimal conversion, rounding, status checks, and relation validation helpers.
   - Risk: Inconsistent validation behavior and more defects during future module changes.
   - Recommended RC fix: Extract shared validators for company, branch, user, employee, account, and status checks.

4. Status transition handling is inconsistent.
   - Evidence: Public API uses the platform status transition service; payroll, workflow, accounting, and older modules use inline status arrays and ad hoc checks.
   - Risk: Lifecycle rules drift across modules.
   - Recommended RC fix: Move payroll run, journal entry, workflow request, payslip, and document lifecycle checks onto the platform status transition service.

5. Full-text search foundation still relies heavily on `contains` queries.
   - Evidence: Search service uses Prisma `contains` across text fields and a denormalized `searchableText` field.
   - Risk: PostgreSQL `LIKE`/`ILIKE` style searches will not scale for large tenants without full-text indexes.
   - Recommended RC fix: Add PostgreSQL full-text vectors/indexes or an external search adapter behind the search service interface.

6. Accounting reports and payroll reports load broad datasets into memory.
   - Evidence: Accounting reports aggregate lines in application memory; payroll reports load payslips/runs and reduce them in service code.
   - Risk: Slow dashboards and high memory pressure for large companies.
   - Recommended RC fix: Push summaries into grouped database queries or reporting materialized views.

7. Module exports are broad.
   - Evidence: Most feature modules export their services by default, even when not clearly consumed by other modules.
   - Risk: Larger dependency surface and more accidental cross-domain coupling.
   - Recommended RC fix: Export only services intentionally used outside the module boundary.

## Low Issues

1. Seed script prints demo credentials.
   - Evidence: `apps/api/prisma/seed.js` logs admin username and password.
   - Risk: Acceptable for local seed data, but unsafe if seed output is captured in shared environments.
   - Recommended RC fix: Gate seed credential output behind a development-only flag.

2. Architecture ADR files are placeholders.
   - Evidence: ADR files describe accepted decisions but still contain template text.
   - Risk: Architecture decisions are not fully traceable.
   - Recommended RC fix: Complete ADR rationale and trade-off sections before production signoff.

3. Documentation roadmap is stale.
   - Evidence: `docs/ROADMAP.md` and `handbook/20-Roadmap.md` lag behind the actual completed modules.
   - Risk: Misleading onboarding and release planning.
   - Recommended RC fix: Update roadmap docs to match commits through RC 1.0.

4. Logging is not consistently structured at service level.
   - Evidence: Startup uses Nest `Logger`, while most services do not use structured logs for important operational actions.
   - Risk: Production diagnostics rely mostly on audit records and observability interceptors.
   - Recommended RC fix: Define logging policy for error, warning, and operational events.

## Technical Debt

- Legacy modules are not fully migrated to Platform Foundation primitives.
- Soft-delete support is partial and depends on model availability.
- Several soft-delete calls require `as never` delegate casts because Prisma delegates are not represented through a strong shared repository abstraction.
- DTO/entity classes exist in some platform utilities with no current production references, such as soft-delete DTO/entity helpers.
- Rounding and decimal conversion are repeated across payroll, accounting, reporting, and assets services.
- Audit writes mix central `AuditService` and direct `auditLog.create` calls.
- Some modules still use hard-coded status arrays instead of central transition rules.
- Several high-volume service methods return arrays directly rather than pagination responses.

## Refactoring Opportunities

1. Add verified tenant/company context enforcement.
   - Create a guard or interceptor that validates request context against authenticated user access.
   - Make service-level `companyId` and `tenantId` resolution depend on verified context.

2. Introduce tenant-aware repository helpers.
   - Standardize `findMany`, `findOne`, `create`, `update`, soft delete, and restore patterns.
   - Centralize active/deleted filters.

3. Consolidate common validation services.
   - Company/branch/department/employee/user/account validators should be reusable.
   - Validators should enforce same-company and same-tenant boundaries.

4. Standardize audit usage.
   - Prefer central `AuditService` for all new and migrated modules.
   - Preserve direct transactional audit writes only where strict same-transaction persistence is required.

5. Normalize list endpoints.
   - Introduce pagination DTOs to legacy modules.
   - Remove raw array-returning list APIs from high-volume areas.

6. Create report query services.
   - Push payroll/accounting/reporting dashboards toward grouped SQL, materialized views, or read models.

## Performance Improvements

- Batch payroll attendance impact calculation instead of querying attendance and leave per employee.
- Batch payslip updates where possible in payroll calculation and attendance refresh flows.
- Replace accounting and payroll report in-memory reductions with database aggregation.
- Add full-text search indexes for `SearchIndex.searchableText`.
- Add composite indexes for frequent scoped report queries, such as `JournalEntry(companyId, status, entryDate)` and `JournalEntryLine(accountId, costCenterId)`.
- Paginate all high-volume list endpoints.
- Limit broad `include` usage in report and dashboard queries to selected fields.

## Security Improvements

- Validate tenant/company/branch request context against authenticated user access.
- Require company/tenant scoping for every sensitive read API.
- Replace or formally define Public API HMAC secret derivation.
- Replace dynamic payroll formula execution with a controlled expression engine.
- Remove seed credential logging outside local development.
- Extend audit coverage to employee, permission, payroll, accounting, and organization mutations.
- Add same-company validation for all cross-entity relation IDs.

## Recommended RC Fixes

Before production RC signoff, prioritize:

1. Enforce verified tenant/company/branch context and reject unverified context headers.
2. Scope accounting reports, employee reads, workflow reads, and journal entry reads by verified company/tenant context.
3. Fix Public API request signing semantics.
4. Add same-company validation for employee optional relations and journal entry dimensions.
5. Replace payroll attendance per-employee DB loops with batched queries.
6. Remove unused code reported by compiler unused checks.
7. Convert hard deletes in employees, payroll, accounting, and permissions to audited soft-delete patterns where business rules require retention.
8. Update stale roadmap and ADR documentation.

## Final Stabilization Decision

RC 1.0 is buildable and smoke-validated, but production stabilization should address the critical tenant/company scoping and accounting/public API issues before final release.

No application code was changed during this stabilization review.
