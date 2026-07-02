# FlexiSys Platform RC 1.0 Quality Audit Report

Date: 2026-07-02
Scope: RC 1.0 code quality inspection
Status: Report only, no application code changes

## Audit Scope

Reviewed repository quality signals across:

- Architecture, handbook, and documentation expectations
- Module wiring and dependency registration
- Controller permission coverage
- DTO, entity, service, and provider usage
- Prisma query patterns, transactions, indexes, and relation validation
- Audit logging and central audit adoption
- Soft-delete adoption
- Error handling, naming, logging, and technical debt

The smoke test report was copied into `reports/SMOKE_TEST_REPORT.md` for repository report retention.

## Validation Summary

- Controller protection scan found no controllers missing both `@Permissions` and `@Public`.
- Module scan found no `forwardRef` usage or explicit circular dependency markers.
- Prisma schema contains broad indexing for newer platform modules, especially tenant, company, branch, status, deleted, lifecycle, date, and history fields.
- Stricter unused-code compilation checks fail with unused imports/helpers. This is a quality issue, not a normal build blocker unless those compiler options are enabled.

## Critical

### 1. Request context accepts tenant and company headers without verified membership enforcement

Evidence:

- `apps/api/src/platform/request-context/request-context.middleware.ts` reads tenant, company, branch, correlation, and request metadata directly from headers.

Risk:

- A caller may be able to select a tenant, company, or branch context unless every downstream service independently validates membership.
- This conflicts with the multi-tenant zero-leakage goal.

Recommended RC fix:

- Add a tenant/company/branch context guard that resolves allowed context from the authenticated user and rejects mismatched request headers before controllers and services execute.

### 2. Sensitive legacy read APIs remain globally scoped

Evidence:

- `apps/api/src/employees/employees.service.ts` exposes `findAll()` without request-context scoping.
- `apps/api/src/workflows/runtime/workflow-runtime.service.ts` exposes `findAll()` without tenant/company scoping.
- `apps/api/src/accounting/journal-entries/journal-entries.service.ts` exposes `findAll()` without company scoping.

Risk:

- Employee, workflow, and accounting records can be returned across company boundaries.

Recommended RC fix:

- Scope these list and detail APIs by verified tenant/company context.
- Reject cross-company direct ID access unless the authenticated user is explicitly allowed to access the target company.

### 3. Accounting report aggregation is not company scoped

Evidence:

- `apps/api/src/accounting/reports/accounting-reports.service.ts` reads accounts, journal lines, and journal entries without mandatory company context.
- Finance reporting services aggregate journal lines in memory.

Risk:

- Trial balance, general ledger, payroll accounting, and cost center reports can aggregate financial data across companies.

Recommended RC fix:

- Require verified company context for all accounting reports.
- Apply company filters to journal entries, accounts, lines, payroll runs, and cost center dimensions.

### 4. Public API request signing uses the stored secret hash as the HMAC key

Evidence:

- `apps/api/src/public-api/public-api.service.ts` stores `secretHash`.
- Signature verification calls `createHmac('sha256', key.secretHash)`.

Risk:

- Clients receive the raw secret only during creation/rotation, but server verification appears to sign with the hash. That can make signed Public API requests fail or force clients into an unclear derived-secret protocol.

Recommended RC fix:

- Define the signing contract explicitly.
- Store an encrypted retrievable signing secret, or document and implement a deterministic derived signing key that both client and server can reproduce.

## High

### 1. Hard deletes remain in regulated business modules

Evidence:

- Direct `delete` or `deleteMany` calls exist in employees, users, roles, permissions, payroll, accounting, organization, assets, documents, leave, recruitment, performance, notifications, and attendance services.
- Newer modules use the Platform Foundation soft-delete service more consistently.

Risk:

- Loss of auditability and recovery for HR, payroll, accounting, and security records.

Recommended RC fix:

- Prioritize audited soft delete for employees, payroll, accounting, permissions, users, roles, documents, and organization records.
- Reserve hard deletes for transient cleanup data only.

### 2. Audit logging coverage is inconsistent

Evidence:

- New platform modules use `AuditService`.
- Some accounting and recruitment operations write directly to `auditLog`.
- Several legacy services do not consistently audit create/update/delete lifecycle events.

Risk:

- Sensitive production actions may not be traceable through one consistent audit framework.

Recommended RC fix:

- Standardize all business mutations on the central audit framework.
- Keep direct transactional audit writes only where same-transaction persistence is required and wrap them behind the audit abstraction.

### 3. Relation validation does not consistently enforce same-company boundaries

Evidence:

- Employee relation validation checks whether branch, department, position, and cost center records exist, but does not consistently prove they belong to the employee company.
- Accounting journal dimension validation checks existence of accounts, cost centers, departments, and branches, but same-company enforcement is incomplete.

Risk:

- Cross-company references can corrupt reporting and weaken tenant isolation.

Recommended RC fix:

- Add same-company and same-tenant validation to every relation validator for employee, payroll, accounting, organization, document, workflow, and reporting dimensions.

### 4. N+1 query and per-row write risks exist in high-volume workflows

Evidence:

- Payroll attendance processing queries attendance and leave data while iterating employee rates.
- Workflow runtime creates and resolves approval steps inside loops.
- Accounting journal validation validates line dimensions one line at a time.
- Scheduler and notification jobs iterate due records and update them individually.

Risk:

- Large tenants may experience slow payroll runs, long transactions, and high database load.

Recommended RC fix:

- Batch preload related data.
- Use grouped queries and `createMany` or bounded batched writes where business rules allow.
- Keep transaction size predictable.

### 5. Payroll formula support uses dynamic JavaScript execution

Evidence:

- `apps/api/src/payroll/calculation/payroll-calculation.service.ts` evaluates formulas using `Function(...)`.

Risk:

- Even with input sanitization, enterprise payroll formulas should not depend on dynamic JavaScript execution.

Recommended RC fix:

- Replace with a controlled expression parser or a small formula engine that supports only approved variables, literals, and operators.

### 6. Stricter unused-code checks fail

Evidence:

- `npx tsc --noEmit --pretty false --noUnusedLocals --noUnusedParameters` reports unused declarations in:
  - `apps/api/src/mobile/mobile.service.ts`
  - `apps/api/src/observability/observability.service.ts`
  - `apps/api/src/payroll/calculation/payroll-calculation.service.ts`
  - `apps/api/src/plugins/plugins.service.ts`
  - `apps/api/src/workflows/runtime/workflow-runtime.service.ts`

Risk:

- Dead-code drift increases maintenance cost and hides accidental incomplete implementation.

Recommended RC fix:

- Remove unused helpers/imports and consider enabling unused checks in CI after cleanup.

## Medium

### 1. Many legacy list APIs are unpaginated

Evidence:

- `findAll(): Promise<...[]>` appears across employees, accounting, workflows, assets, attendance, documents, leave, payroll, organization, recruitment, users, permissions, performance, and reporting services.

Risk:

- Enterprise-size tenants may hit memory, latency, and response-size limits.

Recommended RC fix:

- Migrate high-volume list endpoints to the Platform Foundation pagination framework.

### 2. Search foundation still relies on `contains` queries

Evidence:

- `apps/api/src/search/search.service.ts` uses Prisma `contains` filters across employee, payroll, document, workflow, and global search fields.
- `SearchIndex.searchableText` is indexed by normal metadata indexes, not a PostgreSQL full-text index.

Risk:

- Search performance will degrade as tenants accumulate large employee, document, payroll, and workflow datasets.

Recommended RC fix:

- Introduce PostgreSQL full-text vectors/indexes or an external search adapter behind the search service boundary.

### 3. Transaction usage is uneven in older services

Evidence:

- Newer platform modules commonly use transactions for list/count and multi-write operations.
- Several legacy CRUD services perform separate validation and write operations outside a transaction.

Risk:

- Race conditions can occur around uniqueness checks, relation validation, and multi-entity updates.

Recommended RC fix:

- Wrap multi-step state changes in Prisma transactions.
- Prefer database unique constraints for final enforcement of uniqueness.

### 4. Duplicated validation and CRUD patterns are widespread

Evidence:

- Repeated existence checks for company, branch, department, employee, user, account, and cost center appear across services.
- Repeated create/update/delete service shapes exist across HR, organization, payroll, recruitment, assets, and documents.

Risk:

- Validation behavior can drift between modules and future fixes must be repeated in many places.

Recommended RC fix:

- Introduce shared domain validators and tenant-aware repository helpers for common scoped operations.

### 5. Status transition handling is inconsistent

Evidence:

- Public API and newer platform modules use central lifecycle/status helpers more consistently.
- Payroll, workflow, accounting, documents, and legacy HR modules still use inline status checks and ad hoc transition logic.

Risk:

- Lifecycle rules can diverge across modules.

Recommended RC fix:

- Migrate module lifecycle checks to the Platform Foundation status transition framework when those modules are next modified.

### 6. Broad module exports increase coupling surface

Evidence:

- Most feature modules export their services by default.

Risk:

- Cross-domain calls can grow without explicit architectural intent.

Recommended RC fix:

- Export only services intentionally consumed outside the module boundary.
- Prefer integration services or application services for cross-domain coordination.

## Low

### 1. Seed script prints demo credentials

Evidence:

- `apps/api/prisma/seed.js` logs the seeded admin username and password.

Risk:

- Acceptable for local development, but risky if seed logs are captured in shared environments.

Recommended RC fix:

- Gate credential output behind a development-only flag.

### 2. Logging style is not consistently structured at service level

Evidence:

- Startup and platform-level logging are structured through Nest logging.
- Many business services rely on exceptions and audit records but do not emit structured operational logs for important warnings or recoverable failures.

Risk:

- Production diagnostics may require reading audit tables rather than application logs.

Recommended RC fix:

- Define a service-level logging policy for warning, error, recovery, retry, and security events.

### 3. Documentation and ADRs trail implementation maturity

Evidence:

- Some ADR files still contain template-style sections.
- Roadmap documentation lags the completed enterprise modules.

Risk:

- New engineers may not have a fully accurate view of architectural decisions and release scope.

Recommended RC fix:

- Complete ADR rationale/trade-off sections and update the roadmap through RC 1.0.

### 4. Naming consistency needs polish

Evidence:

- Naming varies between singular and plural domain labels in a few areas, such as workflow/workflows and report/reporting module boundaries.

Risk:

- Low functional risk, but it increases navigation friction.

Recommended RC fix:

- Normalize naming as modules are next touched, without broad rename churn during RC stabilization.

## Recommended RC Fix Order

1. Enforce verified tenant, company, and branch request context.
2. Scope employee, workflow, journal entry, and accounting report reads.
3. Correct or formalize Public API request signing.
4. Add same-company relation validation to employee and accounting paths.
5. Remove hard deletes from regulated HR, payroll, accounting, security, and document modules.
6. Replace payroll dynamic formula execution.
7. Batch payroll attendance, workflow step, accounting validation, scheduler, and notification loops.
8. Remove unused declarations reported by stricter TypeScript checks.
9. Paginate high-volume legacy list APIs.
10. Add full-text search indexing or a search adapter.

## Final Quality Gate Assessment

RC 1.0 remains buildable and smoke-validated, but this audit identifies production-quality blockers in tenant/company scoping, accounting report isolation, and Public API request signing semantics.

No application code was changed during this quality audit.
