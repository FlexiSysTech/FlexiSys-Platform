# FlexiSys Architecture Inventory

Date: 2026-07-02
Scope: Generated from the current FlexiSys-Platform codebase.

## Summary

| Metric | Value |
| --- | --- |
| moduleCount | 94 |
| controllerCount | 230 |
| serviceCount | 252 |
| routeCount | 1584 |
| prismaModelCount | 140 |
| prismaEnumCount | 129 |
| permissionUsageCount | 726 |
| detectedCircularDependencyRiskCount | 0 |

## Module Overview

| Module | Context | Controllers | Services | Routes | Tables | Audit | Pagination | Tenant/Company Scope |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AccountingModule | accounting | 5 | 5 | 19 | 13 | Yes | No | Yes |
| AccountsModule | accounting | 1 | 1 | 5 | 5 | Yes | No | Yes |
| AccountingCostCenterReportsModule | accounting | 1 | 1 | 3 | 6 | No | No | Yes |
| JournalEntriesModule | accounting | 1 | 1 | 6 | 11 | Yes | No | Yes |
| PayrollAccountingModule | accounting | 1 | 1 | 1 | 9 | Yes | No | Yes |
| AccountingReportsModule | accounting | 1 | 1 | 4 | 5 | No | No | Yes |
| AiModule | ai | 5 | 5 | 25 | 17 | Yes | Yes | Yes |
| AppModule | app.module.ts | 85 | 96 | 657 | 138 | Yes | Yes | Yes |
| AssetItemsModule | assets | 1 | 1 | 5 | 4 | No | No | Yes |
| AssetsModule | assets | 5 | 5 | 22 | 7 | No | No | Yes |
| AssetAssignmentsModule | assets | 1 | 1 | 6 | 4 | No | No | No |
| AssetCategoriesModule | assets | 1 | 1 | 5 | 4 | No | No | Yes |
| AssetsDashboardModule | assets | 1 | 1 | 1 | 3 | No | No | No |
| AssetMaintenanceModule | assets | 1 | 1 | 5 | 3 | No | No | No |
| AttendanceModule | attendance | 3 | 3 | 15 | 7 | No | No | Yes |
| HolidaysModule | attendance | 1 | 1 | 5 | 4 | No | No | Yes |
| AttendanceRecordsModule | attendance | 1 | 1 | 5 | 4 | No | No | No |
| ShiftsModule | attendance | 1 | 1 | 5 | 4 | No | No | Yes |
| AuthModule | auth | 1 | 1 | 1 | 4 | No | No | No |
| BiModule | bi | 1 | 1 | 23 | 16 | Yes | Yes | Yes |
| BusinessRulesModule | business-rules | 1 | 1 | 22 | 8 | Yes | Yes | Yes |
| DocumentCategoriesModule | documents | 1 | 1 | 5 | 4 | No | No | Yes |
| DocumentsDashboardModule | documents | 1 | 1 | 1 | 2 | No | No | No |
| DocumentItemsModule | documents | 1 | 1 | 6 | 6 | No | No | Yes |
| DocumentsModule | documents | 5 | 5 | 20 | 6 | No | No | Yes |
| DocumentExpirationModule | documents | 1 | 1 | 3 | 2 | No | No | No |
| DocumentVersionsModule | documents | 1 | 1 | 5 | 3 | No | No | No |
| EmployeesModule | employees | 1 | 1 | 5 | 8 | No | No | Yes |
| EssModule | ess | 1 | 1 | 8 | 3 | No | No | No |
| SelfServiceRequestsModule | ess | 1 | 1 | 8 | 3 | No | No | No |
| IntegrationsModule | integrations | 1 | 1 | 58 | 13 | Yes | Yes | Yes |
| LeaveBalancesModule | leave | 1 | 1 | 5 | 5 | No | No | Yes |
| LeaveRequestsModule | leave | 1 | 1 | 5 | 4 | No | No | No |
| LeaveTypesModule | leave | 1 | 1 | 5 | 3 | No | No | Yes |
| LeaveModule | leave | 3 | 3 | 15 | 6 | No | No | Yes |
| MobileModule | mobile | 1 | 1 | 16 | 12 | Yes | Yes | Yes |
| NotificationDashboardModule | notifications | 1 | 1 | 1 | 2 | No | No | No |
| NotificationsModule | notifications | 3 | 4 | 17 | 6 | No | No | Yes |
| ObservabilityModule | observability | 1 | 1 | 34 | 9 | Yes | Yes | Yes |
| BranchesModule | organization | 1 | 1 | 5 | 3 | No | No | Yes |
| CompaniesModule | organization | 1 | 1 | 5 | 2 | No | No | No |
| CostCentersModule | organization | 1 | 1 | 5 | 4 | No | No | Yes |
| DepartmentsModule | organization | 1 | 1 | 5 | 4 | No | No | Yes |
| OrganizationModule | organization | 5 | 5 | 25 | 6 | No | No | Yes |
| PositionsModule | organization | 1 | 1 | 5 | 4 | No | No | Yes |
| PayrollApprovalModule | payroll | 1 | 1 | 4 | 5 | Yes | No | Yes |
| PayrollAttendanceModule | payroll | 1 | 1 | 1 | 7 | No | No | Yes |
| PayrollCalculationModule | payroll | 1 | 1 | 2 | 6 | No | No | Yes |
| PayrollItemsModule | payroll | 1 | 1 | 6 | 5 | No | No | No |
| PayrollPeriodsModule | payroll | 1 | 1 | 5 | 4 | No | No | Yes |
| PayrollProfilesModule | payroll | 1 | 1 | 5 | 3 | No | No | No |
| PayrollRunsModule | payroll | 1 | 1 | 5 | 5 | No | No | Yes |
| PayrollModule | payroll | 10 | 10 | 44 | 16 | Yes | No | Yes |
| PayslipsModule | payroll | 1 | 1 | 6 | 8 | No | No | No |
| PayrollReportsModule | payroll | 1 | 1 | 5 | 6 | No | No | No |
| SalaryComponentsModule | payroll | 1 | 1 | 5 | 3 | No | No | Yes |
| PerformanceCyclesModule | performance | 1 | 1 | 5 | 3 | No | No | Yes |
| PerformanceDashboardModule | performance | 1 | 1 | 1 | 4 | No | No | No |
| PerformanceGoalsModule | performance | 1 | 1 | 5 | 4 | No | No | No |
| PerformanceModule | performance | 5 | 5 | 21 | 7 | No | No | Yes |
| PerformanceReviewItemsModule | performance | 1 | 1 | 5 | 3 | No | No | No |
| PerformanceReviewsModule | performance | 1 | 1 | 5 | 4 | No | No | No |
| PerformanceOptimizationModule | performance-optimization | 1 | 1 | 11 | 4 | Yes | Yes | Yes |
| PermissionsModule | permissions | 1 | 1 | 5 | 1 | No | No | No |
| PlatformModule | platform | 0 | 5 | 0 | 5 | Yes | Yes | Yes |
| PluginsModule | plugins | 1 | 1 | 57 | 17 | Yes | Yes | Yes |
| PrismaModule | prisma | 0 | 1 | 0 | 0 | No | No | No |
| PublicApiModule | public-api | 1 | 1 | 31 | 11 | Yes | Yes | Yes |
| ApplicantsModule | recruitment | 1 | 1 | 5 | 2 | No | No | No |
| ApplicationsModule | recruitment | 1 | 1 | 5 | 5 | No | No | No |
| RecruitmentDashboardModule | recruitment | 1 | 1 | 1 | 7 | No | No | No |
| HiringModule | recruitment | 1 | 1 | 1 | 10 | Yes | No | Yes |
| InterviewEvaluationsModule | recruitment | 1 | 1 | 5 | 4 | No | No | No |
| InterviewsModule | recruitment | 1 | 1 | 5 | 4 | No | No | No |
| JobPositionsModule | recruitment | 1 | 1 | 5 | 4 | No | No | Yes |
| OfferLettersModule | recruitment | 1 | 1 | 8 | 3 | No | No | No |
| RecruitmentModule | recruitment | 9 | 9 | 40 | 15 | Yes | No | Yes |
| VacanciesModule | recruitment | 1 | 1 | 5 | 5 | No | No | Yes |
| ReportingDashboardsModule | reporting | 1 | 1 | 4 | 11 | No | No | No |
| ReportDefinitionsModule | reporting | 1 | 1 | 7 | 6 | No | No | Yes |
| ReportExecutionModule | reporting | 1 | 1 | 3 | 6 | No | No | Yes |
| ReportExportModule | reporting | 1 | 1 | 1 | 3 | No | No | No |
| FinanceReportsModule | reporting | 1 | 1 | 5 | 7 | No | No | No |
| HrReportsModule | reporting | 1 | 1 | 4 | 10 | No | No | No |
| ReportingModule | reporting | 6 | 6 | 24 | 24 | No | No | Yes |
| RolesModule | roles | 1 | 1 | 5 | 2 | No | No | No |
| SchedulerModule | scheduler | 1 | 1 | 19 | 6 | Yes | Yes | Yes |
| SearchModule | search | 1 | 1 | 9 | 13 | Yes | Yes | Yes |
| TenantsModule | tenants | 1 | 5 | 43 | 13 | Yes | Yes | Yes |
| UsersModule | users | 1 | 1 | 5 | 4 | No | No | No |
| WorkflowDashboardModule | workflows | 1 | 1 | 1 | 4 | No | No | No |
| WorkflowDefinitionsModule | workflows | 1 | 1 | 9 | 7 | No | No | Yes |
| WorkflowRuntimeModule | workflows | 1 | 1 | 7 | 7 | No | No | No |
| WorkflowsModule | workflows | 3 | 3 | 17 | 10 | No | No | Yes |

## Modules

### AccountingModule

Accounting bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/accounting/accounting.module.ts |
| Controllers | apps/api/src/accounting/accounts/accounts.controller.ts, apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.controller.ts, apps/api/src/accounting/journal-entries/journal-entries.controller.ts, apps/api/src/accounting/payroll-accounting/payroll-accounting.controller.ts, apps/api/src/accounting/reports/accounting-reports.controller.ts |
| Services | apps/api/src/accounting/accounts/accounts.service.ts, apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.service.ts, apps/api/src/accounting/journal-entries/journal-entries.service.ts, apps/api/src/accounting/payroll-accounting/payroll-accounting.service.ts, apps/api/src/accounting/reports/accounting-reports.service.ts |
| Repositories | None detected |
| DTOs | 6 |
| Entities | 5 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Accounting / Accounts', 'Accounting / Cost Centers', 'Accounting / Journal Entries', 'Accounting / Payroll', 'Accounting / Reports' |
| Permissions | 10 |
| Prisma Models/Tables | User, Permission, Company, Account, JournalEntry, JournalEntryLine, Branch, Department, CostCenter, Employee, PayrollRun, Payslip, AuditLog |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | Yes |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 10 |
| Security Notes | 0 |
| Technical Debt | 2 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /accounting/accounts |  |  |
| GET | /accounting/accounts/:id | Permission.ACCOUNTING_READ | Get chart of accounts |
| POST | /accounting/accounts | Permission.ACCOUNTING_READ | Get account by id |
| PATCH | /accounting/accounts/:id | Permission.ACCOUNTING_CREATE | Create account |
| DELETE | /accounting/accounts/:id | Permission.ACCOUNTING_UPDATE | Update account |
| GET | /accounting/dimensions/cost-centers |  |  |
| GET | /accounting/dimensions/departments | Permission.ACCOUNTING_READ | Get accounting balances by cost center |
| GET | /accounting/dimensions/branches | Permission.ACCOUNTING_READ | Get accounting balances by department |
| GET | /accounting/journal-entries |  |  |
| GET | /accounting/journal-entries/:id | Permission.ACCOUNTING_READ | Get journal entries |
| POST | /accounting/journal-entries | Permission.ACCOUNTING_READ | Get journal entry by id |
| PATCH | /accounting/journal-entries/:id | Permission.ACCOUNTING_CREATE | Create balanced journal entry |
| POST | /accounting/journal-entries/:id/post | Permission.ACCOUNTING_UPDATE | Update draft journal entry |
| POST | /accounting/journal-entries/:id/void | Permission.ACCOUNTING_UPDATE | Post journal entry |
| POST | /accounting/payroll/generate-journal |  |  |
| GET | /accounting/reports/trial-balance |  |  |
| GET | /accounting/reports/general-ledger | Permission.ACCOUNTING_READ | Get trial balance |
| GET | /accounting/reports/payroll | Permission.ACCOUNTING_READ | Get general ledger |
| GET | /accounting/reports/cost-centers | Permission.ACCOUNTING_READ | Get payroll accounting report |

### AccountsModule

Accounts bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/accounting/accounts/accounts.module.ts |
| Controllers | apps/api/src/accounting/accounts/accounts.controller.ts |
| Services | apps/api/src/accounting/accounts/accounts.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Accounting / Accounts' |
| Permissions | 4 |
| Prisma Models/Tables | User, Permission, Company, Account, AuditLog |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | Yes |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /accounting/accounts |  |  |
| GET | /accounting/accounts/:id | Permission.ACCOUNTING_READ | Get chart of accounts |
| POST | /accounting/accounts | Permission.ACCOUNTING_READ | Get account by id |
| PATCH | /accounting/accounts/:id | Permission.ACCOUNTING_CREATE | Create account |
| DELETE | /accounting/accounts/:id | Permission.ACCOUNTING_UPDATE | Update account |

### AccountingCostCenterReportsModule

Accounting Cost Center Reports bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.module.ts |
| Controllers | apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.controller.ts |
| Services | apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.service.ts |
| Repositories | None detected |
| DTOs | 0 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Accounting / Cost Centers' |
| Permissions | 1 |
| Prisma Models/Tables | Permission, JournalEntry, JournalEntryLine, Branch, Department, CostCenter |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 2 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /accounting/dimensions/cost-centers |  |  |
| GET | /accounting/dimensions/departments | Permission.ACCOUNTING_READ | Get accounting balances by cost center |
| GET | /accounting/dimensions/branches | Permission.ACCOUNTING_READ | Get accounting balances by department |

### JournalEntriesModule

Journal Entries bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/accounting/journal-entries/journal-entries.module.ts |
| Controllers | apps/api/src/accounting/journal-entries/journal-entries.controller.ts |
| Services | apps/api/src/accounting/journal-entries/journal-entries.service.ts |
| Repositories | None detected |
| DTOs | 3 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Accounting / Journal Entries' |
| Permissions | 3 |
| Prisma Models/Tables | User, Permission, Company, Account, JournalEntry, JournalEntryLine, Branch, Department, CostCenter, Employee, AuditLog |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | Yes |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 3 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /accounting/journal-entries |  |  |
| GET | /accounting/journal-entries/:id | Permission.ACCOUNTING_READ | Get journal entries |
| POST | /accounting/journal-entries | Permission.ACCOUNTING_READ | Get journal entry by id |
| PATCH | /accounting/journal-entries/:id | Permission.ACCOUNTING_CREATE | Create balanced journal entry |
| POST | /accounting/journal-entries/:id/post | Permission.ACCOUNTING_UPDATE | Update draft journal entry |
| POST | /accounting/journal-entries/:id/void | Permission.ACCOUNTING_UPDATE | Post journal entry |

### PayrollAccountingModule

Payroll Accounting bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/accounting/payroll-accounting/payroll-accounting.module.ts |
| Controllers | apps/api/src/accounting/payroll-accounting/payroll-accounting.controller.ts |
| Services | apps/api/src/accounting/payroll-accounting/payroll-accounting.service.ts |
| Repositories | None detected |
| DTOs | 1 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Accounting / Payroll' |
| Permissions | 1 |
| Prisma Models/Tables | User, Permission, Company, Account, JournalEntry, Employee, PayrollRun, Payslip, AuditLog |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | Yes |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 2 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| POST | /accounting/payroll/generate-journal |  |  |

### AccountingReportsModule

Accounting Reports bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/accounting/reports/accounting-reports.module.ts |
| Controllers | apps/api/src/accounting/reports/accounting-reports.controller.ts |
| Services | apps/api/src/accounting/reports/accounting-reports.service.ts |
| Repositories | None detected |
| DTOs | 0 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Accounting / Reports' |
| Permissions | 1 |
| Prisma Models/Tables | Permission, Account, JournalEntry, JournalEntryLine, CostCenter |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 2 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /accounting/reports/trial-balance |  |  |
| GET | /accounting/reports/general-ledger | Permission.ACCOUNTING_READ | Get trial balance |
| GET | /accounting/reports/payroll | Permission.ACCOUNTING_READ | Get general ledger |
| GET | /accounting/reports/cost-centers | Permission.ACCOUNTING_READ | Get payroll accounting report |

### AiModule

Ai bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/ai/ai.module.ts |
| Controllers | apps/api/src/ai/ai-core.controller.ts, apps/api/src/ai/ai-governance.controller.ts, apps/api/src/ai/hr-assistant.controller.ts, apps/api/src/ai/reporting-ai.controller.ts, apps/api/src/ai/workflow-ai.controller.ts |
| Services | apps/api/src/ai/ai-core.service.ts, apps/api/src/ai/ai-governance.service.ts, apps/api/src/ai/hr-assistant.service.ts, apps/api/src/ai/reporting-ai.service.ts, apps/api/src/ai/workflow-ai.service.ts |
| Repositories | None detected |
| DTOs | 8 |
| Entities | 5 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'AI / Core', 'AI / Governance', 'AI / HR Assistant', 'AI / Reporting', 'AI / Workflow' |
| Permissions | 9 |
| Prisma Models/Tables | Permission, Company, ReportDefinition, ReportExecution, Employee, LeaveRequest, PayrollRun, Vacancy, Document, WorkflowDefinition, WorkflowRequest, BusinessRuleExecution, AiProviderConfig, AiRequestLog, AiUsageRecord, AiUsageLimit, AiSafetyPolicy |
| Module Dependencies | common, platform, prisma, business-rules |
| Request Context | Yes |
| Pagination | Yes |
| Audit | Yes |
| Soft Delete | Yes |
| Status Transitions | Yes |
| Business Rules | Yes |
| Workflow | Yes |
| Notifications | No |
| AI | Yes |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 4 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /ai/providers |  |  |
| POST | /ai/providers | Permission.AI_READ | Get AI provider configurations |
| PATCH | /ai/providers/:id | Permission.AI_CREATE | Create AI provider configuration |
| DELETE | /ai/providers/:id | Permission.AI_UPDATE | Update AI provider configuration |
| POST | /ai/complete | Permission.AI_DELETE | Soft delete AI provider configuration |
| GET | /ai/requests | Permission.AI_EXECUTE | Run an AI completion request |
| GET | /ai/usage | Permission.AI_READ | Get AI request logs |
| GET | /ai/governance/limits |  |  |
| POST | /ai/governance/limits | Permission.AI_GOVERN | Get AI usage limits |
| PATCH | /ai/governance/limits/:id | Permission.AI_GOVERN | Create AI usage limit |
| DELETE | /ai/governance/limits/:id | Permission.AI_GOVERN | Update AI usage limit |
| GET | /ai/governance/policies | Permission.AI_GOVERN | Soft delete AI usage limit |
| POST | /ai/governance/policies | Permission.AI_GOVERN | Get AI safety policies |
| PATCH | /ai/governance/policies/:id | Permission.AI_GOVERN | Create AI safety policy |
| DELETE | /ai/governance/policies/:id | Permission.AI_GOVERN | Update AI safety policy |
| GET | /ai/hr/employee-insights |  |  |
| GET | /ai/hr/leave-analysis | Permission.AI_EXECUTE | Generate employee insights |
| GET | /ai/hr/payroll-explanation | Permission.AI_EXECUTE | Analyze leave trends |
| GET | /ai/hr/document-alerts | Permission.AI_EXECUTE | Explain a payroll run |
| POST | /ai/reporting/natural-language |  |  |
| GET | /ai/reporting/dashboard-insights | Permission.AI_EXECUTE | Interpret a natural language report request |
| GET | /ai/reporting/anomalies | Permission.AI_EXECUTE | Generate dashboard insights |
| POST | /ai/workflow/approval-recommendation |  |  |
| POST | /ai/workflow/risk-score | Permission.AI_EXECUTE | Generate workflow approval recommendation |
| POST | /ai/workflow/rule-suggestions | Permission.AI_EXECUTE | Score workflow approval risk |

### AppModule

App bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/app.module.ts |
| Controllers | apps/api/src/accounting/accounts/accounts.controller.ts, apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.controller.ts, apps/api/src/accounting/journal-entries/journal-entries.controller.ts, apps/api/src/accounting/payroll-accounting/payroll-accounting.controller.ts, apps/api/src/accounting/reports/accounting-reports.controller.ts, apps/api/src/ai/ai-core.controller.ts, apps/api/src/ai/ai-governance.controller.ts, apps/api/src/ai/hr-assistant.controller.ts, apps/api/src/ai/reporting-ai.controller.ts, apps/api/src/ai/workflow-ai.controller.ts, apps/api/src/app.controller.ts, apps/api/src/assets/assets/assets.controller.ts, apps/api/src/assets/assignments/asset-assignments.controller.ts, apps/api/src/assets/categories/asset-categories.controller.ts, apps/api/src/assets/dashboard/assets-dashboard.controller.ts, apps/api/src/assets/maintenance/asset-maintenance.controller.ts, apps/api/src/attendance/holidays/holidays.controller.ts, apps/api/src/attendance/records/attendance-records.controller.ts, apps/api/src/attendance/shifts/shifts.controller.ts, apps/api/src/auth/auth.controller.ts, apps/api/src/bi/bi.controller.ts, apps/api/src/business-rules/business-rules.controller.ts, apps/api/src/documents/categories/document-categories.controller.ts, apps/api/src/documents/dashboard/documents-dashboard.controller.ts, apps/api/src/documents/documents/documents.controller.ts, apps/api/src/documents/expiration/document-expiration.controller.ts, apps/api/src/documents/versions/document-versions.controller.ts, apps/api/src/employees/employees.controller.ts, apps/api/src/ess/requests/self-service-requests.controller.ts, apps/api/src/integrations/integrations.controller.ts, apps/api/src/leave/leave-balances/leave-balances.controller.ts, apps/api/src/leave/leave-requests/leave-requests.controller.ts, apps/api/src/leave/leave-types/leave-types.controller.ts, apps/api/src/mobile/mobile.controller.ts, apps/api/src/notifications/dashboard/notification-dashboard.controller.ts, apps/api/src/notifications/jobs/notification-jobs.controller.ts, apps/api/src/notifications/notifications.controller.ts, apps/api/src/observability/observability.controller.ts, apps/api/src/organization/branches/branches.controller.ts, apps/api/src/organization/companies/companies.controller.ts, apps/api/src/organization/cost-centers/cost-centers.controller.ts, apps/api/src/organization/departments/departments.controller.ts, apps/api/src/organization/positions/positions.controller.ts, apps/api/src/payroll/approval/payroll-approval.controller.ts, apps/api/src/payroll/attendance/payroll-attendance.controller.ts, apps/api/src/payroll/calculation/payroll-calculation.controller.ts, apps/api/src/payroll/payroll-items/payroll-items.controller.ts, apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts, apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts, apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts, apps/api/src/payroll/payslips/payslips.controller.ts, apps/api/src/payroll/reports/payroll-reports.controller.ts, apps/api/src/payroll/salary-components/salary-components.controller.ts, apps/api/src/performance/cycles/performance-cycles.controller.ts, apps/api/src/performance/dashboard/performance-dashboard.controller.ts, apps/api/src/performance/goals/performance-goals.controller.ts, apps/api/src/performance/review-items/performance-review-items.controller.ts, apps/api/src/performance/reviews/performance-reviews.controller.ts, apps/api/src/performance-optimization/performance-optimization.controller.ts, apps/api/src/permissions/permissions.controller.ts, apps/api/src/plugins/plugins.controller.ts, apps/api/src/public-api/public-api.controller.ts, apps/api/src/recruitment/applicants/applicants.controller.ts, apps/api/src/recruitment/applications/applications.controller.ts, apps/api/src/recruitment/dashboard/recruitment-dashboard.controller.ts, apps/api/src/recruitment/hiring/hiring.controller.ts, apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts, apps/api/src/recruitment/interviews/interviews.controller.ts, apps/api/src/recruitment/job-positions/job-positions.controller.ts, apps/api/src/recruitment/offer-letters/offer-letters.controller.ts, apps/api/src/recruitment/vacancies/vacancies.controller.ts, apps/api/src/reporting/dashboards/reporting-dashboards.controller.ts, apps/api/src/reporting/definitions/report-definitions.controller.ts, apps/api/src/reporting/execution/report-execution.controller.ts, apps/api/src/reporting/exports/report-export.controller.ts, apps/api/src/reporting/finance/finance-reports.controller.ts, apps/api/src/reporting/hr/hr-reports.controller.ts, apps/api/src/roles/roles.controller.ts, apps/api/src/scheduler/scheduler.controller.ts, apps/api/src/search/search.controller.ts, apps/api/src/tenants/tenants.controller.ts, apps/api/src/users/users.controller.ts, apps/api/src/workflows/dashboard/workflow-dashboard.controller.ts, apps/api/src/workflows/definitions/workflow-definitions.controller.ts, apps/api/src/workflows/runtime/workflow-runtime.controller.ts |
| Services | apps/api/src/accounting/accounts/accounts.service.ts, apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.service.ts, apps/api/src/accounting/journal-entries/journal-entries.service.ts, apps/api/src/accounting/payroll-accounting/payroll-accounting.service.ts, apps/api/src/accounting/reports/accounting-reports.service.ts, apps/api/src/ai/ai-core.service.ts, apps/api/src/ai/ai-governance.service.ts, apps/api/src/ai/hr-assistant.service.ts, apps/api/src/ai/reporting-ai.service.ts, apps/api/src/ai/workflow-ai.service.ts, apps/api/src/app.service.ts, apps/api/src/assets/assets/assets.service.ts, apps/api/src/assets/assignments/asset-assignments.service.ts, apps/api/src/assets/categories/asset-categories.service.ts, apps/api/src/assets/dashboard/assets-dashboard.service.ts, apps/api/src/assets/maintenance/asset-maintenance.service.ts, apps/api/src/attendance/holidays/holidays.service.ts, apps/api/src/attendance/records/attendance-records.service.ts, apps/api/src/attendance/shifts/shifts.service.ts, apps/api/src/auth/auth.service.ts, apps/api/src/bi/bi.service.ts, apps/api/src/business-rules/business-rules.service.ts, apps/api/src/documents/categories/document-categories.service.ts, apps/api/src/documents/dashboard/documents-dashboard.service.ts, apps/api/src/documents/documents/documents.service.ts, apps/api/src/documents/expiration/document-expiration.service.ts, apps/api/src/documents/versions/document-versions.service.ts, apps/api/src/employees/employees.service.ts, apps/api/src/ess/requests/self-service-requests.service.ts, apps/api/src/integrations/integrations.service.ts, apps/api/src/leave/leave-balances/leave-balances.service.ts, apps/api/src/leave/leave-requests/leave-requests.service.ts, apps/api/src/leave/leave-types/leave-types.service.ts, apps/api/src/mobile/mobile.service.ts, apps/api/src/notifications/dashboard/notification-dashboard.service.ts, apps/api/src/notifications/jobs/notification-jobs.service.ts, apps/api/src/notifications/notifications.service.ts, apps/api/src/notifications/queue/notification-queue.service.ts, apps/api/src/observability/observability.service.ts, apps/api/src/organization/branches/branches.service.ts, apps/api/src/organization/companies/companies.service.ts, apps/api/src/organization/cost-centers/cost-centers.service.ts, apps/api/src/organization/departments/departments.service.ts, apps/api/src/organization/positions/positions.service.ts, apps/api/src/payroll/approval/payroll-approval.service.ts, apps/api/src/payroll/attendance/payroll-attendance.service.ts, apps/api/src/payroll/calculation/payroll-calculation.service.ts, apps/api/src/payroll/payroll-items/payroll-items.service.ts, apps/api/src/payroll/payroll-periods/payroll-periods.service.ts, apps/api/src/payroll/payroll-profiles/payroll-profiles.service.ts, apps/api/src/payroll/payroll-runs/payroll-runs.service.ts, apps/api/src/payroll/payslips/payslips.service.ts, apps/api/src/payroll/reports/payroll-reports.service.ts, apps/api/src/payroll/salary-components/salary-components.service.ts, apps/api/src/performance/cycles/performance-cycles.service.ts, apps/api/src/performance/dashboard/performance-dashboard.service.ts, apps/api/src/performance/goals/performance-goals.service.ts, apps/api/src/performance/review-items/performance-review-items.service.ts, apps/api/src/performance/reviews/performance-reviews.service.ts, apps/api/src/performance-optimization/performance-optimization.service.ts, apps/api/src/permissions/permissions.service.ts, apps/api/src/platform/audit/audit.service.ts, apps/api/src/platform/pagination/pagination.service.ts, apps/api/src/platform/request-context/request-context.service.ts, apps/api/src/platform/soft-delete/soft-delete.service.ts, apps/api/src/platform/status-transitions/status-transition.service.ts, apps/api/src/plugins/plugins.service.ts, apps/api/src/prisma/prisma.service.ts, apps/api/src/public-api/public-api.service.ts, apps/api/src/recruitment/applicants/applicants.service.ts, apps/api/src/recruitment/applications/applications.service.ts, apps/api/src/recruitment/dashboard/recruitment-dashboard.service.ts, apps/api/src/recruitment/hiring/hiring.service.ts, apps/api/src/recruitment/interview-evaluations/interview-evaluations.service.ts, apps/api/src/recruitment/interviews/interviews.service.ts, apps/api/src/recruitment/job-positions/job-positions.service.ts, apps/api/src/recruitment/offer-letters/offer-letters.service.ts, apps/api/src/recruitment/vacancies/vacancies.service.ts, apps/api/src/reporting/dashboards/reporting-dashboards.service.ts, apps/api/src/reporting/definitions/report-definitions.service.ts, apps/api/src/reporting/execution/report-execution.service.ts, apps/api/src/reporting/exports/report-export.service.ts, apps/api/src/reporting/finance/finance-reports.service.ts, apps/api/src/reporting/hr/hr-reports.service.ts, apps/api/src/roles/roles.service.ts, apps/api/src/scheduler/scheduler.service.ts, apps/api/src/search/search.service.ts, apps/api/src/tenants/tenant-administration.service.ts, apps/api/src/tenants/tenant-configuration.service.ts, apps/api/src/tenants/tenant-isolation.service.ts, apps/api/src/tenants/tenant-security.service.ts, apps/api/src/tenants/tenants.service.ts, apps/api/src/users/users.service.ts, apps/api/src/workflows/dashboard/workflow-dashboard.service.ts, apps/api/src/workflows/definitions/workflow-definitions.service.ts, apps/api/src/workflows/runtime/workflow-runtime.service.ts |
| Repositories | None detected |
| DTOs | 165 |
| Entities | 109 |
| Enums | None detected |
| Guards | apps/api/src/auth/jwt-auth.guard.ts, apps/api/src/common/guards/permissions.guard.ts, apps/api/src/common/guards/roles.guard.ts |
| Interceptors | apps/api/src/observability/observability-http-metrics.interceptor.ts, apps/api/src/observability/observability-logging.interceptor.ts, apps/api/src/observability/observability-tracing.interceptor.ts, apps/api/src/platform/audit/audit.interceptor.ts, apps/api/src/platform/request-context/request-context.interceptor.ts |
| Filters | None detected |
| Decorators | apps/api/src/auth/decorators/public.decorator.ts, apps/api/src/common/decorators/permissions.decorator.ts, apps/api/src/common/decorators/public.decorator.ts, apps/api/src/common/decorators/roles.decorator.ts, apps/api/src/platform/audit/audit.decorator.ts, apps/api/src/platform/request-context/decorators/branch-context.decorator.ts, apps/api/src/platform/request-context/decorators/company-context.decorator.ts, apps/api/src/platform/request-context/decorators/current-user.decorator.ts, apps/api/src/platform/request-context/decorators/request-metadata.decorator.ts, apps/api/src/platform/request-context/decorators/tenant-context.decorator.ts |
| Middleware | apps/api/src/platform/request-context/request-context.middleware.ts |
| Swagger Tags | 'Accounting / Accounts', 'Accounting / Cost Centers', 'Accounting / Journal Entries', 'Accounting / Payroll', 'Accounting / Reports', 'AI / Core', 'AI / Governance', 'AI / HR Assistant', 'AI / Reporting', 'AI / Workflow', 'Assets', 'Assets / Assignments', 'Assets / Categories', 'Assets / Dashboard', 'Assets / Maintenance', 'Attendance / Holidays', 'Attendance / Records', 'Attendance / Shifts', 'Auth', 'BI & Analytics', 'Business Rules', 'Documents / Categories', 'Documents / Dashboard', 'Documents', 'Documents / Expiration', 'Documents / Versions', 'Employees', 'ESS / Requests', 'Integrations', 'Leave / Balances', 'Leave / Requests', 'Leave / Types', 'Mobile Backend', 'Notification Dashboard', 'Notification Jobs', 'Notifications', 'Observability', 'Organization / Branches', 'Organization / Companies', 'Organization / Cost Centers', 'Organization / Departments', 'Organization / Positions', 'Payroll / Approval', 'Payroll / Attendance', 'Payroll / Calculation', 'Payroll / Items', 'Payroll / Periods', 'Payroll / Profiles', 'Payroll / Runs', 'Payroll / Payslips', 'Payroll / Reports', 'Payroll / Salary Components', 'Performance / Cycles', 'Performance / Dashboard', 'Performance / Goals', 'Performance / Review Items', 'Performance / Reviews', 'Performance Optimization', 'Permissions', 'Plugins', 'Public API Platform', 'Recruitment / Applicants', 'Recruitment / Applications', 'Recruitment / Dashboard', 'Recruitment / Hiring', 'Recruitment / Interview Evaluations', 'Recruitment / Interviews', 'Recruitment / Job Positions', 'Recruitment / Offer Letters', 'Recruitment / Vacancies', 'Reporting / Dashboards', 'Reporting / Definitions', 'Reporting / Execution', 'Reporting / Exports', 'Reporting / Payroll & Accounting', 'Reporting / HR', 'Roles', 'Scheduler', 'Enterprise Search', 'Tenants', 'Users', 'Workflow Dashboard', 'Workflow Definitions', 'Workflow Runtime' |
| Permissions | 273 |
| Prisma Models/Tables | User, Role, Permission, UserRole, RolePermission, Company, Tenant, TenantDomain, TenantSetting, TenantFeatureFlag, TenantLocalization, TenantBranding, TenantUsageLimit, TenantProvisioningEvent, TenantPermissionPolicy, TenantAuditEvent, PublicApiGroup, PublicApiRegistry, PublicApiVersion, PublicApiApplication, PublicApiKey, PublicApiRateLimitPolicy, PublicApiUsageCounter, PublicApiRequestLog, PublicApiSignatureNonce, ObservabilityHealthProvider, ObservabilityHealthCheckResult, ObservabilityMetricDefinition, ObservabilityMetricSample, ObservabilityLogEntry, ObservabilityTrace, ObservabilitySpan, SchedulerCronRegistry, SchedulerScheduledJob, SchedulerJobHistory, SchedulerFailureRecovery, MobileDevice, MobileSession, MobilePushNotification, MobileSyncCursor, MobileSyncChange, SearchIndex, SearchQueryLog, BiKpiDefinition, BiKpiSnapshot, BiDataset, BiMetricDefinition, BiMetricObservation, BiAnalyticsExecution, BiDashboard, BiDashboardWidget, BiPredictionModel, BiPredictionRun, Account, JournalEntry, JournalEntryLine, ReportCategory, ReportDefinition, ReportParameter, ReportExecution, Branch, Department, Position, CostCenter, Employee, Shift, AttendanceRecord, Holiday, LeaveType, LeaveBalance, LeaveRequest, SalaryComponent, PayrollProfile, PayrollPeriod, PayrollRun, PayrollItem, Payslip, JobPosition, Vacancy, Applicant, JobApplication, Interview, InterviewEvaluation, OfferLetter, PerformanceCycle, PerformanceGoal, PerformanceReview, PerformanceReviewItem, AssetCategory, Asset, AssetAssignment, AssetMaintenance, DocumentCategory, Document, DocumentVersion, SelfServiceRequest, Notification, WorkflowDefinition, WorkflowDefinitionStep, WorkflowRequest, WorkflowStep, AuditLog, BusinessRuleCategory, BusinessRule, BusinessRuleCondition, BusinessRuleAction, BusinessRuleExecution, AiProviderConfig, AiRequestLog, AiUsageRecord, AiUsageLimit, AiSafetyPolicy, IntegrationProvider, IntegrationCredential, IntegrationConnection, IntegrationInboundEvent, IntegrationExecutionHistory, IntegrationRetryPolicy, IntegrationWebhook, IntegrationRestConnector, IntegrationOutboundJob, IntegrationRetryHistory, IntegrationHealthSnapshot, PluginManifest, PluginRegistryEntry, PluginLifecycleEvent, PluginSandboxPolicy, PluginDependency, PluginCapabilityGrant, PluginMarketplacePackage, PluginMarketplaceVersion, PluginInstallation, PluginEventSubscription, PluginHook, PluginServiceBinding, PluginPermissionGrant, PluginConfiguration, PluginEvent |
| Module Dependencies | accounting, common, prisma, @prisma/client/runtime/library, ai, platform, business-rules, app.controller, app.service, assets, attendance, auth, bi, documents, employees, ess, integrations, leave, mobile, notifications, observability, organization, payroll, performance-optimization, performance, plugins, permissions, public-api, recruitment, reporting, roles, scheduler, search, tenants, users, workflows, passport-jwt, app.module, rxjs/operators, rxjs, express, node:async_hooks |
| Request Context | Yes |
| Pagination | Yes |
| Audit | Yes |
| Soft Delete | Yes |
| Status Transitions | Yes |
| Business Rules | Yes |
| Workflow | Yes |
| Notifications | Yes |
| AI | Yes |
| Reporting | Yes |
| Public API | Yes |
| Search | Yes |
| Events | Yes |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | JWT_SECRET, NODE_ENV, PORT |
| Performance Hotspots | 102 |
| Security Notes | 4 |
| Technical Debt | 48 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /accounting/accounts |  |  |
| GET | /accounting/accounts/:id | Permission.ACCOUNTING_READ | Get chart of accounts |
| POST | /accounting/accounts | Permission.ACCOUNTING_READ | Get account by id |
| PATCH | /accounting/accounts/:id | Permission.ACCOUNTING_CREATE | Create account |
| DELETE | /accounting/accounts/:id | Permission.ACCOUNTING_UPDATE | Update account |
| GET | /accounting/dimensions/cost-centers |  |  |
| GET | /accounting/dimensions/departments | Permission.ACCOUNTING_READ | Get accounting balances by cost center |
| GET | /accounting/dimensions/branches | Permission.ACCOUNTING_READ | Get accounting balances by department |
| GET | /accounting/journal-entries |  |  |
| GET | /accounting/journal-entries/:id | Permission.ACCOUNTING_READ | Get journal entries |
| POST | /accounting/journal-entries | Permission.ACCOUNTING_READ | Get journal entry by id |
| PATCH | /accounting/journal-entries/:id | Permission.ACCOUNTING_CREATE | Create balanced journal entry |
| POST | /accounting/journal-entries/:id/post | Permission.ACCOUNTING_UPDATE | Update draft journal entry |
| POST | /accounting/journal-entries/:id/void | Permission.ACCOUNTING_UPDATE | Post journal entry |
| POST | /accounting/payroll/generate-journal |  |  |
| GET | /accounting/reports/trial-balance |  |  |
| GET | /accounting/reports/general-ledger | Permission.ACCOUNTING_READ | Get trial balance |
| GET | /accounting/reports/payroll | Permission.ACCOUNTING_READ | Get general ledger |
| GET | /accounting/reports/cost-centers | Permission.ACCOUNTING_READ | Get payroll accounting report |
| GET | /ai/providers |  |  |
| POST | /ai/providers | Permission.AI_READ | Get AI provider configurations |
| PATCH | /ai/providers/:id | Permission.AI_CREATE | Create AI provider configuration |
| DELETE | /ai/providers/:id | Permission.AI_UPDATE | Update AI provider configuration |
| POST | /ai/complete | Permission.AI_DELETE | Soft delete AI provider configuration |
| GET | /ai/requests | Permission.AI_EXECUTE | Run an AI completion request |
| GET | /ai/usage | Permission.AI_READ | Get AI request logs |
| GET | /ai/governance/limits |  |  |
| POST | /ai/governance/limits | Permission.AI_GOVERN | Get AI usage limits |
| PATCH | /ai/governance/limits/:id | Permission.AI_GOVERN | Create AI usage limit |
| DELETE | /ai/governance/limits/:id | Permission.AI_GOVERN | Update AI usage limit |
| GET | /ai/governance/policies | Permission.AI_GOVERN | Soft delete AI usage limit |
| POST | /ai/governance/policies | Permission.AI_GOVERN | Get AI safety policies |
| PATCH | /ai/governance/policies/:id | Permission.AI_GOVERN | Create AI safety policy |
| DELETE | /ai/governance/policies/:id | Permission.AI_GOVERN | Update AI safety policy |
| GET | /ai/hr/employee-insights |  |  |
| GET | /ai/hr/leave-analysis | Permission.AI_EXECUTE | Generate employee insights |
| GET | /ai/hr/payroll-explanation | Permission.AI_EXECUTE | Analyze leave trends |
| GET | /ai/hr/document-alerts | Permission.AI_EXECUTE | Explain a payroll run |
| POST | /ai/reporting/natural-language |  |  |
| GET | /ai/reporting/dashboard-insights | Permission.AI_EXECUTE | Interpret a natural language report request |
| GET | /ai/reporting/anomalies | Permission.AI_EXECUTE | Generate dashboard insights |
| POST | /ai/workflow/approval-recommendation |  |  |
| POST | /ai/workflow/risk-score | Permission.AI_EXECUTE | Generate workflow approval recommendation |
| POST | /ai/workflow/rule-suggestions | Permission.AI_EXECUTE | Score workflow approval risk |
| GET | / |  |  |
| GET | /assets |  |  |
| GET | /assets/:id | Permission.ASSETS_READ | Get all assets |
| POST | /assets | Permission.ASSETS_READ | Get asset by id |
| PATCH | /assets/:id | Permission.ASSETS_CREATE | Create asset |
| DELETE | /assets/:id | Permission.ASSETS_UPDATE | Update asset |
| GET | /assets/assignments |  |  |
| GET | /assets/assignments/:id | Permission.ASSETS_READ | Get all asset assignments |
| POST | /assets/assignments | Permission.ASSETS_READ | Get asset assignment by id |
| POST | /assets/assignments/:id/return | Permission.ASSETS_CREATE | Assign asset to employee |
| POST | /assets/assignments/:id/lost | Permission.ASSETS_UPDATE | Return assigned asset |
| DELETE | /assets/assignments/:id | Permission.ASSETS_UPDATE | Mark assigned asset as lost |
| GET | /assets/categories |  |  |
| GET | /assets/categories/:id | Permission.ASSETS_READ | Get all asset categories |
| POST | /assets/categories | Permission.ASSETS_READ | Get asset category by id |
| PATCH | /assets/categories/:id | Permission.ASSETS_CREATE | Create asset category |
| DELETE | /assets/categories/:id | Permission.ASSETS_UPDATE | Update asset category |
| GET | /assets/dashboard/summary |  |  |
| GET | /assets/maintenance |  |  |
| GET | /assets/maintenance/:id | Permission.ASSETS_READ | Get all asset maintenance records |
| POST | /assets/maintenance | Permission.ASSETS_READ | Get asset maintenance by id |
| PATCH | /assets/maintenance/:id | Permission.ASSETS_CREATE | Create asset maintenance record |
| DELETE | /assets/maintenance/:id | Permission.ASSETS_UPDATE | Update asset maintenance record |
| GET | /attendance/holidays |  |  |
| GET | /attendance/holidays/:id | Permission.ATTENDANCE_READ | Get all holidays |
| POST | /attendance/holidays | Permission.ATTENDANCE_READ | Get holiday by id |
| PATCH | /attendance/holidays/:id | Permission.ATTENDANCE_CREATE | Create holiday |
| DELETE | /attendance/holidays/:id | Permission.ATTENDANCE_UPDATE | Update holiday |
| GET | /attendance/records |  |  |
| GET | /attendance/records/:id | Permission.ATTENDANCE_READ | Get all attendance records |
| POST | /attendance/records | Permission.ATTENDANCE_READ | Get attendance record by id |
| PATCH | /attendance/records/:id | Permission.ATTENDANCE_CREATE | Create attendance record |
| DELETE | /attendance/records/:id | Permission.ATTENDANCE_UPDATE | Update attendance record |
| GET | /attendance/shifts |  |  |
| GET | /attendance/shifts/:id | Permission.ATTENDANCE_READ | Get all shifts |
| POST | /attendance/shifts | Permission.ATTENDANCE_READ | Get shift by id |
| PATCH | /attendance/shifts/:id | Permission.ATTENDANCE_CREATE | Create shift |
| DELETE | /attendance/shifts/:id | Permission.ATTENDANCE_UPDATE | Update shift |
| POST | /auth/login |  |  |
| GET | /bi/kpis |  |  |
| POST | /bi/kpis | Permission.BI_READ | List KPI definitions |
| PATCH | /bi/kpis/:id | Permission.BI_MANAGE | Create KPI definition |
| POST | /bi/kpis/:id/archive | Permission.BI_MANAGE | Update KPI definition |
| POST | /bi/kpis/:id/snapshots | Permission.BI_MANAGE | Archive KPI definition |
| GET | /bi/kpis/:id/snapshots | Permission.BI_EXECUTE | Record KPI snapshot |
| GET | /bi/datasets | Permission.BI_READ | List KPI snapshots |
| POST | /bi/datasets | Permission.BI_READ | List analytics datasets |
| PATCH | /bi/datasets/:id | Permission.BI_MANAGE | Create analytics dataset |
| POST | /bi/datasets/:id/run | Permission.BI_MANAGE | Update analytics dataset |
| GET | /bi/metrics | Permission.BI_EXECUTE | Run analytics dataset execution |
| POST | /bi/metrics | Permission.BI_READ | List analytics metrics |
| PATCH | /bi/metrics/:id | Permission.BI_MANAGE | Create analytics metric |
| POST | /bi/metrics/:id/observations | Permission.BI_MANAGE | Update analytics metric |
| GET | /bi/dashboards | Permission.BI_EXECUTE | Record analytics metric observation |
| POST | /bi/dashboards | Permission.BI_DASHBOARD | List BI dashboards |
| POST | /bi/dashboards/:id/widgets | Permission.BI_MANAGE | Create BI dashboard |
| GET | /bi/dashboards/executive/summary | Permission.BI_MANAGE | Add BI dashboard widget |
| GET | /bi/kpis/:id/trend | Permission.BI_DASHBOARD | Get executive dashboard summary |
| GET | /bi/metrics/:id/trend | Permission.BI_READ | Get KPI trend analysis |
| GET | /bi/predictions/models | Permission.BI_READ | Get metric trend analysis |
| POST | /bi/predictions/models | Permission.BI_PREDICT | List BI prediction models |
| POST | /bi/predictions/models/:id/run | Permission.BI_PREDICT | Create BI prediction model |
| GET | /business-rules/categories |  |  |
| POST | /business-rules/categories | Permission.BUSINESS_RULES_READ | Get business rule categories |
| PATCH | /business-rules/categories/:id | Permission.BUSINESS_RULES_CREATE | Create business rule category |
| DELETE | /business-rules/categories/:id | Permission.BUSINESS_RULES_UPDATE | Update business rule category |
| POST | /business-rules/categories/:id/restore | Permission.BUSINESS_RULES_DELETE | Soft delete business rule category |
| GET | /business-rules/executions | Permission.BUSINESS_RULES_UPDATE | Restore business rule category |
| GET | /business-rules/dashboard | Permission.BUSINESS_RULES_READ | Get business rule execution history |
| GET | /business-rules | Permission.BUSINESS_RULES_READ | Get business rules dashboard |
| POST | /business-rules/evaluate | Permission.BUSINESS_RULES_READ | Get business rules |
| GET | /business-rules/:id/conditions | Permission.BUSINESS_RULES_EXECUTE | Evaluate active business rules |
| POST | /business-rules/:id/conditions | Permission.BUSINESS_RULES_READ | Get business rule conditions |
| PATCH | /business-rules/:id/conditions/:conditionId | Permission.BUSINESS_RULES_UPDATE | Create business rule condition |
| DELETE | /business-rules/:id/conditions/:conditionId | Permission.BUSINESS_RULES_UPDATE | Update business rule condition |
| GET | /business-rules/:id/actions | Permission.BUSINESS_RULES_DELETE | Soft delete business rule condition |
| POST | /business-rules/:id/actions | Permission.BUSINESS_RULES_READ | Get business rule actions |
| PATCH | /business-rules/:id/actions/:actionId | Permission.BUSINESS_RULES_UPDATE | Create business rule action |
| DELETE | /business-rules/:id/actions/:actionId | Permission.BUSINESS_RULES_UPDATE | Update business rule action |
| GET | /business-rules/:id | Permission.BUSINESS_RULES_DELETE | Soft delete business rule action |
| POST | /business-rules | Permission.BUSINESS_RULES_READ | Get business rule by id |
| PATCH | /business-rules/:id | Permission.BUSINESS_RULES_CREATE | Create business rule |
| DELETE | /business-rules/:id | Permission.BUSINESS_RULES_UPDATE | Update business rule |
| POST | /business-rules/:id/restore | Permission.BUSINESS_RULES_DELETE | Soft delete business rule |
| GET | /documents/categories |  |  |
| GET | /documents/categories/:id | Permission.DOCUMENTS_READ | Get all document categories |
| POST | /documents/categories | Permission.DOCUMENTS_READ | Get document category by id |
| PATCH | /documents/categories/:id | Permission.DOCUMENTS_CREATE | Create document category |
| DELETE | /documents/categories/:id | Permission.DOCUMENTS_UPDATE | Update document category |
| GET | /documents/dashboard/summary |  |  |
| GET | /documents |  |  |
| GET | /documents/:id | Permission.DOCUMENTS_READ | Get all documents |
| POST | /documents | Permission.DOCUMENTS_READ | Get document by id |
| PATCH | /documents/:id | Permission.DOCUMENTS_CREATE | Create document |
| POST | /documents/:id/archive | Permission.DOCUMENTS_UPDATE | Update document |
| DELETE | /documents/:id | Permission.DOCUMENTS_UPDATE | Archive document |
| POST | /documents/expiration/mark-expired |  |  |
| GET | /documents/expiration/expired | Permission.DOCUMENTS_UPDATE | Mark expired documents |
| GET | /documents/expiration/soon/:days | Permission.DOCUMENTS_READ | Get expired documents |
| GET | /documents/versions |  |  |
| GET | /documents/versions/document/:documentId | Permission.DOCUMENTS_READ | Get all document versions |
| GET | /documents/versions/:id | Permission.DOCUMENTS_READ | Get versions by document |
| POST | /documents/versions | Permission.DOCUMENTS_READ | Get document version by id |
| DELETE | /documents/versions/:id | Permission.DOCUMENTS_CREATE | Create document version |
| GET | /employees |  |  |
| GET | /employees/:id | Permission.EMPLOYEES_READ | Get all employees |
| POST | /employees | Permission.EMPLOYEES_READ | Get employee by id |
| PATCH | /employees/:id | Permission.EMPLOYEES_CREATE | Create employee |
| DELETE | /employees/:id | Permission.EMPLOYEES_UPDATE | Update employee |
| GET | /ess/requests |  |  |
| GET | /ess/requests/employee/:employeeId | Permission.ESS_READ | Get all self-service requests |
| GET | /ess/requests/:id | Permission.ESS_READ | Get requests by employee |
| POST | /ess/requests | Permission.ESS_READ | Get self-service request by id |
| PATCH | /ess/requests/:id | Permission.ESS_CREATE | Create self-service request |
| POST | /ess/requests/:id/submit | Permission.ESS_UPDATE | Update draft self-service request |
| POST | /ess/requests/:id/review | Permission.ESS_UPDATE | Submit self-service request |
| DELETE | /ess/requests/:id | Permission.ESS_UPDATE | Review self-service request |
| GET | /integrations/providers |  |  |
| POST | /integrations/providers | Permission.INTEGRATIONS_READ | Get integration providers |
| PATCH | /integrations/providers/:id | Permission.INTEGRATIONS_CREATE | Create integration provider |
| DELETE | /integrations/providers/:id | Permission.INTEGRATIONS_UPDATE | Update integration provider |
| POST | /integrations/providers/:id/restore | Permission.INTEGRATIONS_DELETE | Soft delete integration provider |
| POST | /integrations/providers/:id/enable | Permission.INTEGRATIONS_UPDATE | Restore integration provider |
| POST | /integrations/providers/:id/disable | Permission.INTEGRATIONS_UPDATE | Enable integration provider |
| GET | /integrations/credentials | Permission.INTEGRATIONS_UPDATE | Disable integration provider |
| POST | /integrations/credentials | Permission.INTEGRATIONS_READ | Get integration credentials |
| PATCH | /integrations/credentials/:id | Permission.INTEGRATIONS_CREATE | Create integration credential |
| DELETE | /integrations/credentials/:id | Permission.INTEGRATIONS_UPDATE | Update integration credential |
| POST | /integrations/credentials/:id/restore | Permission.INTEGRATIONS_DELETE | Soft delete integration credential |
| POST | /integrations/credentials/:id/enable | Permission.INTEGRATIONS_UPDATE | Restore integration credential |
| POST | /integrations/credentials/:id/disable | Permission.INTEGRATIONS_UPDATE | Enable integration credential |
| GET | /integrations/connections | Permission.INTEGRATIONS_UPDATE | Disable integration credential |
| POST | /integrations/connections | Permission.INTEGRATIONS_READ | Get integration connections |
| PATCH | /integrations/connections/:id | Permission.INTEGRATIONS_CREATE | Create integration connection |
| DELETE | /integrations/connections/:id | Permission.INTEGRATIONS_UPDATE | Update integration connection |
| POST | /integrations/connections/:id/restore | Permission.INTEGRATIONS_DELETE | Soft delete integration connection |
| POST | /integrations/connections/:id/test | Permission.INTEGRATIONS_UPDATE | Restore integration connection |
| POST | /integrations/connections/:id/connect | Permission.INTEGRATIONS_EXECUTE | Test integration connection |
| POST | /integrations/connections/:id/disconnect | Permission.INTEGRATIONS_EXECUTE | Connect integration connection |
| POST | /integrations/connections/:id/enable | Permission.INTEGRATIONS_EXECUTE | Disconnect integration connection |
| POST | /integrations/connections/:id/disable | Permission.INTEGRATIONS_UPDATE | Enable integration connection |
| GET | /integrations/retry-policies | Permission.INTEGRATIONS_UPDATE | Disable integration connection |
| POST | /integrations/retry-policies | Permission.INTEGRATIONS_READ | Get integration retry policies |
| PATCH | /integrations/retry-policies/:id | Permission.INTEGRATIONS_CREATE | Create integration retry policy |
| DELETE | /integrations/retry-policies/:id | Permission.INTEGRATIONS_UPDATE | Update integration retry policy |
| POST | /integrations/retry-policies/:id/restore | Permission.INTEGRATIONS_DELETE | Soft delete integration retry policy |
| POST | /integrations/retry-policies/:id/enable | Permission.INTEGRATIONS_UPDATE | Restore integration retry policy |
| POST | /integrations/retry-policies/:id/disable | Permission.INTEGRATIONS_UPDATE | Enable integration retry policy |
| GET | /integrations/webhooks | Permission.INTEGRATIONS_UPDATE | Disable integration retry policy |
| POST | /integrations/webhooks | Permission.INTEGRATIONS_READ | Get outbound webhooks |
| PATCH | /integrations/webhooks/:id | Permission.INTEGRATIONS_CREATE | Create outbound webhook |
| DELETE | /integrations/webhooks/:id | Permission.INTEGRATIONS_UPDATE | Update outbound webhook |
| POST | /integrations/webhooks/:id/restore | Permission.INTEGRATIONS_DELETE | Soft delete outbound webhook |
| POST | /integrations/webhooks/:id/enable | Permission.INTEGRATIONS_UPDATE | Restore outbound webhook |
| POST | /integrations/webhooks/:id/disable | Permission.INTEGRATIONS_UPDATE | Enable outbound webhook |
| GET | /integrations/rest-connectors | Permission.INTEGRATIONS_UPDATE | Disable outbound webhook |
| POST | /integrations/rest-connectors | Permission.INTEGRATIONS_READ | Get REST connectors |
| PATCH | /integrations/rest-connectors/:id | Permission.INTEGRATIONS_CREATE | Create REST connector |
| DELETE | /integrations/rest-connectors/:id | Permission.INTEGRATIONS_UPDATE | Update REST connector |
| POST | /integrations/rest-connectors/:id/restore | Permission.INTEGRATIONS_DELETE | Soft delete REST connector |
| POST | /integrations/rest-connectors/:id/enable | Permission.INTEGRATIONS_UPDATE | Restore REST connector |
| POST | /integrations/rest-connectors/:id/disable | Permission.INTEGRATIONS_UPDATE | Enable REST connector |
| GET | /integrations/outbound-jobs | Permission.INTEGRATIONS_UPDATE | Disable REST connector |
| POST | /integrations/outbound-jobs | Permission.INTEGRATIONS_MONITOR | Get outbound integration jobs |
| POST | /integrations/outbound-jobs/process-due | Permission.INTEGRATIONS_EXECUTE | Queue outbound integration job |
| POST | /integrations/outbound-jobs/:id/execute | Permission.INTEGRATIONS_EXECUTE | Process due outbound integration jobs |
| POST | /integrations/outbound-jobs/:id/retry | Permission.INTEGRATIONS_EXECUTE | Execute outbound integration job |
| POST | /integrations/outbound-jobs/:id/cancel | Permission.INTEGRATIONS_EXECUTE | Retry failed outbound integration job |
| POST | /integrations/inbound/:connectionId/webhook | Permission.INTEGRATIONS_UPDATE | Cancel outbound integration job |
| GET | /integrations/inbound-events | Permission.INTEGRATIONS_UPDATE | Receive inbound integration webhook |
| GET | /integrations/executions | Permission.INTEGRATIONS_MONITOR | Get inbound integration events |
| GET | /integrations/dashboard | Permission.INTEGRATIONS_MONITOR | Get integration execution history |
| GET | /integrations/retry-history | Permission.INTEGRATIONS_MONITOR | Get integration monitoring dashboard |
| GET | /integrations/health | Permission.INTEGRATIONS_MONITOR | Get integration retry history |
| POST | /integrations/connections/:id/health-check | Permission.INTEGRATIONS_MONITOR | Get integration health snapshots |
| GET | /leave/balances |  |  |
| GET | /leave/balances/:id | Permission.LEAVE_READ | Get all records |
| POST | /leave/balances | Permission.LEAVE_READ | Get record by id |
| PATCH | /leave/balances/:id | Permission.LEAVE_CREATE | Create record |
| DELETE | /leave/balances/:id | Permission.LEAVE_UPDATE | Update record |
| GET | /leave/requests |  |  |
| GET | /leave/requests/:id | Permission.LEAVE_READ | Get all records |
| POST | /leave/requests | Permission.LEAVE_READ | Get record by id |
| PATCH | /leave/requests/:id | Permission.LEAVE_CREATE | Create record |
| DELETE | /leave/requests/:id | Permission.LEAVE_UPDATE | Update record |
| GET | /leave/types |  |  |
| GET | /leave/types/:id | Permission.LEAVE_READ | Get all records |
| POST | /leave/types | Permission.LEAVE_READ | Get record by id |
| PATCH | /leave/types/:id | Permission.LEAVE_CREATE | Create record |
| DELETE | /leave/types/:id | Permission.LEAVE_UPDATE | Update record |
| POST | /mobile/auth/login |  |  |
| POST | /mobile/auth/refresh |  | Authenticate mobile user and create session |
| POST | /mobile/auth/logout |  | Refresh mobile access token |
| GET | /mobile/bootstrap | Permission.MOBILE_ACCESS | Logout mobile session |
| POST | /mobile/devices/register | Permission.MOBILE_ACCESS | Get mobile bootstrap payload |
| GET | /mobile/devices | Permission.MOBILE_ACCESS | Register or update current mobile device |
| PATCH | /mobile/devices/:id | Permission.MOBILE_READ | List registered mobile devices |
| POST | /mobile/devices/:id/revoke | Permission.MOBILE_MANAGE | Update mobile device |
| GET | /mobile/sessions | Permission.MOBILE_MANAGE | Revoke mobile device and active sessions |
| POST | /mobile/sessions/:id/revoke | Permission.MOBILE_SESSIONS | List mobile sessions |
| POST | /mobile/push/notifications | Permission.MOBILE_SESSIONS | Revoke mobile session |
| GET | /mobile/push/notifications | Permission.MOBILE_PUSH | Create mobile push notification outbox record |
| PATCH | /mobile/push/notifications/:id | Permission.MOBILE_PUSH | List mobile push notifications |
| POST | /mobile/sync/pull | Permission.MOBILE_PUSH | Update mobile push notification status |
| POST | /mobile/sync/changes | Permission.MOBILE_SYNC | Pull offline sync changes |
| GET | /mobile/sync/changes | Permission.MOBILE_SYNC | Create mobile sync change record |
| GET | /notifications/dashboard |  |  |
| POST | /notifications/jobs/scheduled |  |  |
| POST | /notifications/jobs/retry-failed | Permission.NOTIFICATIONS_UPDATE | Run scheduled notification delivery job |
| POST | /notifications/jobs/expire-workflows | Permission.NOTIFICATIONS_UPDATE | Run failed notification retry job |
| POST | /notifications/jobs/cleanup | Permission.WORKFLOWS_UPDATE | Expire stale workflow requests |
| POST | /notifications/jobs/maintenance | Permission.NOTIFICATIONS_DELETE | Cleanup old delivered notifications |
| GET | /notifications |  |  |
| GET | /notifications/employee/:employeeId | Permission.NOTIFICATIONS_READ | Get all notifications |
| GET | /notifications/:id | Permission.NOTIFICATIONS_READ | Get notifications by employee |
| POST | /notifications | Permission.NOTIFICATIONS_READ | Get notification by id |
| PATCH | /notifications/:id | Permission.NOTIFICATIONS_CREATE | Create notification |
| POST | /notifications/:id/read | Permission.NOTIFICATIONS_UPDATE | Update notification |
| POST | /notifications/:id/sent | Permission.NOTIFICATIONS_UPDATE | Mark notification as read |
| POST | /notifications/:id/cancel | Permission.NOTIFICATIONS_UPDATE | Mark notification as sent |
| POST | /notifications/queue/process | Permission.NOTIFICATIONS_UPDATE | Cancel notification |
| POST | /notifications/queue/retry-failed | Permission.NOTIFICATIONS_UPDATE | Process queued notifications |
| DELETE | /notifications/:id | Permission.NOTIFICATIONS_UPDATE | Retry failed notifications |
| GET | /observability/health/providers |  |  |
| POST | /observability/health/providers | Permission.OBSERVABILITY_READ | Get health providers |
| PATCH | /observability/health/providers/:id | Permission.OBSERVABILITY_CREATE | Create health provider |
| DELETE | /observability/health/providers/:id | Permission.OBSERVABILITY_UPDATE | Update health provider |
| POST | /observability/health/providers/:id/run | Permission.OBSERVABILITY_DELETE | Soft delete health provider |
| POST | /observability/health/liveness | Permission.OBSERVABILITY_ADMIN | Run a health provider check |
| POST | /observability/health/readiness | Permission.OBSERVABILITY_READ | Run liveness checks |
| GET | /observability/health/results | Permission.OBSERVABILITY_READ | Run readiness checks |
| GET | /observability/metrics/definitions | Permission.OBSERVABILITY_READ | Get health check results |
| POST | /observability/metrics/definitions | Permission.OBSERVABILITY_READ | Get metric definitions |
| PATCH | /observability/metrics/definitions/:id | Permission.OBSERVABILITY_CREATE | Create metric definition |
| DELETE | /observability/metrics/definitions/:id | Permission.OBSERVABILITY_UPDATE | Update metric definition |
| GET | /observability/metrics/samples | Permission.OBSERVABILITY_DELETE | Soft delete metric definition |
| POST | /observability/metrics/samples | Permission.OBSERVABILITY_READ | Get metric samples |
| GET | /observability/metrics/http | Permission.OBSERVABILITY_CREATE | Record metric sample |
| GET | /observability/metrics/database | Permission.OBSERVABILITY_READ | Get HTTP metrics summary |
| GET | /observability/metrics/workflow | Permission.OBSERVABILITY_READ | Get database metrics summary |
| GET | /observability/metrics/payroll | Permission.OBSERVABILITY_READ | Get workflow metrics summary |
| GET | /observability/metrics/business-rules | Permission.OBSERVABILITY_READ | Get payroll metrics summary |
| GET | /observability/logs | Permission.OBSERVABILITY_READ | Get business rules metrics summary |
| POST | /observability/logs | Permission.OBSERVABILITY_READ | Get structured log entries |
| GET | /observability/logs/summary | Permission.OBSERVABILITY_CREATE | Record structured log entry |
| GET | /observability/traces | Permission.OBSERVABILITY_READ | Get log level summary |
| POST | /observability/traces | Permission.OBSERVABILITY_READ | Get distributed traces |
| GET | /observability/traces/spans | Permission.OBSERVABILITY_CREATE | Start distributed trace |
| POST | /observability/traces/spans | Permission.OBSERVABILITY_READ | Get distributed trace spans |
| GET | /observability/traces/requests | Permission.OBSERVABILITY_CREATE | Record distributed trace span |
| GET | /observability/traces/services | Permission.OBSERVABILITY_READ | Get request tracing summary |
| GET | /observability/traces/database | Permission.OBSERVABILITY_READ | Get service tracing summary |
| GET | /observability/traces/external-providers | Permission.OBSERVABILITY_READ | Get database timing summary |
| GET | /observability/management/status | Permission.OBSERVABILITY_READ | Get external provider timing summary |
| GET | /observability/management/diagnostics | Permission.OBSERVABILITY_ADMIN | Get system observability status |
| GET | /observability/management/metrics | Permission.OBSERVABILITY_ADMIN | Get system diagnostics |
| GET | /observability/management/health | Permission.OBSERVABILITY_ADMIN | Get management metrics overview |
| GET | /organization/branches |  |  |
| GET | /organization/branches/:id | Permission.ORGANIZATION_READ | Get all branches |
| POST | /organization/branches | Permission.ORGANIZATION_READ | Get branches by id |
| PATCH | /organization/branches/:id | Permission.ORGANIZATION_CREATE | Create branches |
| DELETE | /organization/branches/:id | Permission.ORGANIZATION_UPDATE | Update branches |
| GET | /organization/companies |  |  |
| GET | /organization/companies/:id | Permission.ORGANIZATION_READ | Get all companies |
| POST | /organization/companies | Permission.ORGANIZATION_READ | Get company by id |
| PATCH | /organization/companies/:id | Permission.ORGANIZATION_CREATE | Create company |
| DELETE | /organization/companies/:id | Permission.ORGANIZATION_UPDATE | Update company |
| GET | /organization/cost-centers |  |  |
| GET | /organization/cost-centers/:id | Permission.ORGANIZATION_READ | Get all cost centers |
| POST | /organization/cost-centers | Permission.ORGANIZATION_READ | Get cost centers by id |
| PATCH | /organization/cost-centers/:id | Permission.ORGANIZATION_CREATE | Create cost centers |
| DELETE | /organization/cost-centers/:id | Permission.ORGANIZATION_UPDATE | Update cost centers |
| GET | /organization/departments |  |  |
| GET | /organization/departments/:id | Permission.ORGANIZATION_READ | Get all departments |
| POST | /organization/departments | Permission.ORGANIZATION_READ | Get departments by id |
| PATCH | /organization/departments/:id | Permission.ORGANIZATION_CREATE | Create departments |
| DELETE | /organization/departments/:id | Permission.ORGANIZATION_UPDATE | Update departments |
| GET | /organization/positions |  |  |
| GET | /organization/positions/:id | Permission.ORGANIZATION_READ | Get all positions |
| POST | /organization/positions | Permission.ORGANIZATION_READ | Get positions by id |
| PATCH | /organization/positions/:id | Permission.ORGANIZATION_CREATE | Create positions |
| DELETE | /organization/positions/:id | Permission.ORGANIZATION_UPDATE | Update positions |
| POST | /payroll/runs/:id/review |  |  |
| POST | /payroll/runs/:id/approve | Permission.PAYROLL_UPDATE | Submit payroll run for review |
| POST | /payroll/runs/:id/reject | Permission.PAYROLL_UPDATE | Approve payroll run |
| POST | /payroll/runs/:id/lock | Permission.PAYROLL_UPDATE | Reject payroll run |
| POST | /payroll/attendance/apply |  |  |
| POST | /payroll/calculation/preview |  |  |
| POST | /payroll/calculation/calculate | Permission.PAYROLL_READ | Preview payroll calculations |
| GET | /payroll/items |  |  |
| GET | /payroll/items/run/:payrollRunId | Permission.PAYROLL_READ | Get all payroll items |
| GET | /payroll/items/:id | Permission.PAYROLL_READ | Get payroll items by run |
| POST | /payroll/items | Permission.PAYROLL_READ | Get payroll item by id |
| PATCH | /payroll/items/:id | Permission.PAYROLL_CREATE | Create payroll item |
| DELETE | /payroll/items/:id | Permission.PAYROLL_UPDATE | Update payroll item |
| GET | /payroll/periods |  |  |
| GET | /payroll/periods/:id | Permission.PAYROLL_READ | Get all payroll periods |
| POST | /payroll/periods | Permission.PAYROLL_READ | Get payroll period by id |
| PATCH | /payroll/periods/:id | Permission.PAYROLL_CREATE | Create payroll period |
| DELETE | /payroll/periods/:id | Permission.PAYROLL_UPDATE | Update payroll period |
| GET | /payroll/profiles |  |  |
| GET | /payroll/profiles/:id | Permission.PAYROLL_READ | Get all records |
| POST | /payroll/profiles | Permission.PAYROLL_READ | Get record by id |
| PATCH | /payroll/profiles/:id | Permission.PAYROLL_CREATE | Create record |
| DELETE | /payroll/profiles/:id | Permission.PAYROLL_UPDATE | Update record |
| GET | /payroll/runs |  |  |
| GET | /payroll/runs/:id | Permission.PAYROLL_READ | Get all records |
| POST | /payroll/runs | Permission.PAYROLL_READ | Get record by id |
| PATCH | /payroll/runs/:id | Permission.PAYROLL_CREATE | Create record |
| DELETE | /payroll/runs/:id | Permission.PAYROLL_UPDATE | Update record |
| GET | /payroll/payslips |  |  |
| GET | /payroll/payslips/employee/:employeeId | Permission.PAYROLL_READ | Get all payslips |
| GET | /payroll/payslips/:id | Permission.PAYROLL_READ | Get employee-visible payslips |
| GET | /payroll/payslips/:id/pdf-payload | Permission.PAYROLL_READ | Get payslip by id |
| PATCH | /payroll/payslips/:id | Permission.PAYROLL_READ | Get PDF-ready payslip payload |
| POST | /payroll/payslips/run/:payrollRunId/issue | Permission.PAYROLL_UPDATE | Update payslip |
| GET | /payroll/reports/dashboard |  |  |
| GET | /payroll/reports/salary | Permission.PAYROLL_READ | Get payroll dashboard |
| GET | /payroll/reports/departments | Permission.PAYROLL_READ | Get salary report |
| GET | /payroll/reports/cost-centers | Permission.PAYROLL_READ | Get department payroll report |
| GET | /payroll/reports/monthly | Permission.PAYROLL_READ | Get cost center payroll report |
| GET | /payroll/salary-components |  |  |
| GET | /payroll/salary-components/:id | Permission.PAYROLL_READ | Get all records |
| POST | /payroll/salary-components | Permission.PAYROLL_READ | Get record by id |
| PATCH | /payroll/salary-components/:id | Permission.PAYROLL_CREATE | Create record |
| DELETE | /payroll/salary-components/:id | Permission.PAYROLL_UPDATE | Update record |
| GET | /performance/cycles |  |  |
| GET | /performance/cycles/:id | Permission.PERFORMANCE_READ | Get all performance cycles |
| POST | /performance/cycles | Permission.PERFORMANCE_READ | Get performance cycle by id |
| PATCH | /performance/cycles/:id | Permission.PERFORMANCE_CREATE | Create performance cycle |
| DELETE | /performance/cycles/:id | Permission.PERFORMANCE_UPDATE | Update performance cycle |
| GET | /performance/dashboard/summary |  |  |
| GET | /performance/goals |  |  |
| GET | /performance/goals/:id | Permission.PERFORMANCE_READ | Get all performance goals |
| POST | /performance/goals | Permission.PERFORMANCE_READ | Get performance goal by id |
| PATCH | /performance/goals/:id | Permission.PERFORMANCE_CREATE | Create performance goal |
| DELETE | /performance/goals/:id | Permission.PERFORMANCE_UPDATE | Update performance goal |
| GET | /performance/review-items |  |  |
| GET | /performance/review-items/:id | Permission.PERFORMANCE_READ | Get all performance review items |
| POST | /performance/review-items | Permission.PERFORMANCE_READ | Get performance review item by id |
| PATCH | /performance/review-items/:id | Permission.PERFORMANCE_CREATE | Create performance review item |
| DELETE | /performance/review-items/:id | Permission.PERFORMANCE_UPDATE | Update performance review item |
| GET | /performance/reviews |  |  |
| GET | /performance/reviews/:id | Permission.PERFORMANCE_READ | Get all performance reviews |
| POST | /performance/reviews | Permission.PERFORMANCE_READ | Get performance review by id |
| PATCH | /performance/reviews/:id | Permission.PERFORMANCE_CREATE | Create performance review |
| DELETE | /performance/reviews/:id | Permission.PERFORMANCE_UPDATE | Update performance review |
| GET | /performance-optimization/queries/recommendations |  |  |
| GET | /performance-optimization/cache | Permission.PERFORMANCE_OPTIMIZATION_READ | Get query optimization recommendations |
| GET | /performance-optimization/cache/stats | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | List cache entries |
| GET | /performance-optimization/cache/:key | Permission.PERFORMANCE_OPTIMIZATION_READ | Get cache statistics |
| POST | /performance-optimization/cache | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | Read cache entry |
| POST | /performance-optimization/cache/invalidate | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | Set cache entry |
| POST | /performance-optimization/batch/plan | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | Invalidate cache entries |
| POST | /performance-optimization/lazy-loading/plan | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE | Create batch operation plan |
| GET | /performance-optimization/memory | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE | Create lazy-loading plan |
| GET | /performance-optimization/metrics | Permission.PERFORMANCE_OPTIMIZATION_READ | Get memory statistics |
| POST | /performance-optimization/metrics | Permission.PERFORMANCE_OPTIMIZATION_METRICS | List performance metrics |
| GET | /permissions |  |  |
| GET | /permissions/:id | Permission.PERMISSIONS_READ | Get all permissions |
| POST | /permissions | Permission.PERMISSIONS_READ | Get permission by id |
| PATCH | /permissions/:id | Permission.PERMISSIONS_CREATE | Create permission |
| DELETE | /permissions/:id | Permission.PERMISSIONS_UPDATE | Update permission |
| GET | /plugins/manifests |  |  |
| POST | /plugins/manifests | Permission.PLUGINS_READ | Get plugin manifests |
| PATCH | /plugins/manifests/:id | Permission.PLUGINS_CREATE | Create plugin manifest |
| DELETE | /plugins/manifests/:id | Permission.PLUGINS_UPDATE | Update plugin manifest |
| POST | /plugins/manifests/:id/restore | Permission.PLUGINS_DELETE | Soft delete plugin manifest |
| POST | /plugins/manifests/:id/load | Permission.PLUGINS_UPDATE | Restore plugin manifest |
| GET | /plugins/registry | Permission.PLUGINS_EXECUTE | Load plugin manifest into registry |
| POST | /plugins/registry/:id/enable | Permission.PLUGINS_READ | Get plugin registry entries |
| POST | /plugins/registry/:id/disable | Permission.PLUGINS_EXECUTE | Enable loaded plugin |
| POST | /plugins/registry/:id/unload | Permission.PLUGINS_EXECUTE | Disable loaded plugin |
| GET | /plugins/registry/:id/lifecycle-events | Permission.PLUGINS_EXECUTE | Unload plugin from registry |
| GET | /plugins/sdk/event-subscriptions | Permission.PLUGINS_READ | Get plugin lifecycle events |
| POST | /plugins/sdk/event-subscriptions | Permission.PLUGINS_READ | Get plugin event subscriptions |
| PATCH | /plugins/sdk/event-subscriptions/:id | Permission.PLUGINS_UPDATE | Create plugin event subscription |
| DELETE | /plugins/sdk/event-subscriptions/:id | Permission.PLUGINS_UPDATE | Update plugin event subscription |
| GET | /plugins/sdk/hooks | Permission.PLUGINS_DELETE | Soft delete plugin event subscription |
| POST | /plugins/sdk/hooks | Permission.PLUGINS_READ | Get plugin hooks |
| PATCH | /plugins/sdk/hooks/:id | Permission.PLUGINS_UPDATE | Create plugin hook |
| DELETE | /plugins/sdk/hooks/:id | Permission.PLUGINS_UPDATE | Update plugin hook |
| GET | /plugins/sdk/service-bindings | Permission.PLUGINS_DELETE | Soft delete plugin hook |
| POST | /plugins/sdk/service-bindings | Permission.PLUGINS_READ | Get plugin service bindings |
| PATCH | /plugins/sdk/service-bindings/:id | Permission.PLUGINS_UPDATE | Create plugin service binding |
| DELETE | /plugins/sdk/service-bindings/:id | Permission.PLUGINS_UPDATE | Update plugin service binding |
| GET | /plugins/sdk/permission-grants | Permission.PLUGINS_DELETE | Soft delete plugin service binding |
| POST | /plugins/sdk/permission-grants | Permission.PLUGINS_READ | Get plugin permission grants |
| DELETE | /plugins/sdk/permission-grants/:id | Permission.PLUGINS_GOVERN | Grant permission to plugin |
| GET | /plugins/sdk/configurations | Permission.PLUGINS_GOVERN | Revoke plugin permission grant |
| POST | /plugins/sdk/configurations | Permission.PLUGINS_READ | Get plugin configurations |
| PATCH | /plugins/sdk/configurations/:id | Permission.PLUGINS_UPDATE | Create plugin configuration |
| DELETE | /plugins/sdk/configurations/:id | Permission.PLUGINS_UPDATE | Update plugin configuration |
| POST | /plugins/sdk/events | Permission.PLUGINS_DELETE | Soft delete plugin configuration |
| GET | /plugins/sdk/events | Permission.PLUGINS_EXECUTE | Emit plugin SDK event |
| GET | /plugins/marketplace/packages | Permission.PLUGINS_READ | Get plugin SDK event history |
| POST | /plugins/marketplace/packages | Permission.PLUGINS_READ | Get marketplace packages |
| PATCH | /plugins/marketplace/packages/:id | Permission.PLUGINS_CREATE | Create marketplace package |
| GET | /plugins/marketplace/versions | Permission.PLUGINS_UPDATE | Update marketplace package |
| POST | /plugins/marketplace/versions | Permission.PLUGINS_READ | Get marketplace package versions |
| PATCH | /plugins/marketplace/versions/:id | Permission.PLUGINS_CREATE | Create marketplace package version |
| POST | /plugins/marketplace/versions/:id/install | Permission.PLUGINS_UPDATE | Update marketplace package version |
| GET | /plugins/marketplace/installations | Permission.PLUGINS_EXECUTE | Install marketplace package version |
| POST | /plugins/marketplace/installations/:id/enable | Permission.PLUGINS_READ | Get plugin installations |
| POST | /plugins/marketplace/installations/:id/disable | Permission.PLUGINS_EXECUTE | Enable plugin installation |
| POST | /plugins/marketplace/installations/:id/uninstall | Permission.PLUGINS_EXECUTE | Disable plugin installation |
| POST | /plugins/marketplace/installations/:id/upgrade | Permission.PLUGINS_DELETE | Uninstall plugin installation |
| GET | /plugins/isolation/sandbox-policies | Permission.PLUGINS_EXECUTE | Upgrade plugin installation |
| POST | /plugins/isolation/sandbox-policies | Permission.PLUGINS_READ | Get plugin sandbox policies |
| GET | /plugins/isolation/dependencies | Permission.PLUGINS_GOVERN | Create or update plugin sandbox policy |
| POST | /plugins/isolation/dependencies | Permission.PLUGINS_READ | Get plugin dependencies |
| PATCH | /plugins/isolation/dependencies/:id | Permission.PLUGINS_UPDATE | Create plugin dependency |
| POST | /plugins/isolation/registry/:id/validate-dependencies | Permission.PLUGINS_UPDATE | Update plugin dependency |
| GET | /plugins/isolation/capability-grants | Permission.PLUGINS_EXECUTE | Validate plugin dependencies |
| POST | /plugins/isolation/capability-grants | Permission.PLUGINS_READ | Get plugin capability grants |
| DELETE | /plugins/isolation/capability-grants/:id | Permission.PLUGINS_GOVERN | Grant plugin capability |
| POST | /plugins/isolation/registry/:id/validate | Permission.PLUGINS_GOVERN | Revoke plugin capability |
| POST | /plugins/management/upload | Permission.PLUGINS_EXECUTE | Validate plugin isolation posture |
| GET | /plugins/management/registry/:id/health | Permission.PLUGINS_CREATE | Upload plugin manifest package metadata |
| GET | /plugins/management/metrics | Permission.PLUGINS_READ | Get plugin health |
| GET | /public-api/registry/groups |  |  |
| POST | /public-api/registry/groups | Permission.PUBLIC_API_READ | Get public API groups |
| PATCH | /public-api/registry/groups/:id | Permission.PUBLIC_API_CREATE | Create public API group |
| DELETE | /public-api/registry/groups/:id | Permission.PUBLIC_API_UPDATE | Update public API group |
| GET | /public-api/registry/apis | Permission.PUBLIC_API_DELETE | Soft delete public API group |
| POST | /public-api/registry/apis | Permission.PUBLIC_API_READ | Get public APIs |
| PATCH | /public-api/registry/apis/:id | Permission.PUBLIC_API_CREATE | Create public API metadata |
| DELETE | /public-api/registry/apis/:id | Permission.PUBLIC_API_UPDATE | Update public API metadata |
| GET | /public-api/registry/versions | Permission.PUBLIC_API_DELETE | Soft delete public API metadata |
| POST | /public-api/registry/versions | Permission.PUBLIC_API_READ | Get public API versions |
| PATCH | /public-api/registry/versions/:id | Permission.PUBLIC_API_CREATE | Create public API version |
| GET | /public-api/keys | Permission.PUBLIC_API_UPDATE | Update public API version |
| POST | /public-api/keys | Permission.PUBLIC_API_KEYS | Get public API keys |
| POST | /public-api/keys/:id/rotate | Permission.PUBLIC_API_KEYS | Create public API key |
| POST | /public-api/keys/:id/revoke | Permission.PUBLIC_API_KEYS | Rotate public API key |
| GET | /public-api/rate-limits/policies | Permission.PUBLIC_API_KEYS | Revoke public API key |
| POST | /public-api/rate-limits/policies | Permission.PUBLIC_API_ADMIN | Get public API rate limit policies |
| PATCH | /public-api/rate-limits/policies/:id | Permission.PUBLIC_API_ADMIN | Create public API rate limit policy |
| DELETE | /public-api/rate-limits/policies/:id | Permission.PUBLIC_API_ADMIN | Update public API rate limit policy |
| POST | /public-api/rate-limits/evaluate | Permission.PUBLIC_API_ADMIN | Soft delete public API rate limit policy |
| GET | /public-api/rate-limits/usage | Permission.PUBLIC_API_ADMIN | Evaluate and record public API rate limit usage |
| GET | /public-api/developer/applications | Permission.PUBLIC_API_READ | Get public API usage counters |
| POST | /public-api/developer/applications | Permission.PUBLIC_API_READ | Get developer applications |
| PATCH | /public-api/developer/applications/:id | Permission.PUBLIC_API_CREATE | Register developer application |
| DELETE | /public-api/developer/applications/:id | Permission.PUBLIC_API_UPDATE | Update developer application |
| POST | /public-api/developer/applications/:id/keys | Permission.PUBLIC_API_DELETE | Soft delete developer application |
| POST | /public-api/developer/applications/:id/keys/:keyId/revoke | Permission.PUBLIC_API_KEYS | Generate developer application key |
| GET | /public-api/developer/applications/:id/usage | Permission.PUBLIC_API_KEYS | Revoke developer application key |
| POST | /public-api/security/verify-signature | Permission.PUBLIC_API_READ | Get developer application usage statistics |
| GET | /public-api/security/request-logs | Permission.PUBLIC_API_ADMIN | Verify signed public API request |
| POST | /public-api/security/request-logs | Permission.PUBLIC_API_ADMIN | Get public API request logs |
| GET | /recruitment/applicants |  |  |
| GET | /recruitment/applicants/:id | Permission.RECRUITMENT_READ | Get all records |
| POST | /recruitment/applicants | Permission.RECRUITMENT_READ | Get record by id |
| PATCH | /recruitment/applicants/:id | Permission.RECRUITMENT_CREATE | Create record |
| DELETE | /recruitment/applicants/:id | Permission.RECRUITMENT_UPDATE | Update record |
| GET | /recruitment/applications |  |  |
| GET | /recruitment/applications/:id | Permission.RECRUITMENT_READ | Get all applications |
| POST | /recruitment/applications | Permission.RECRUITMENT_READ | Get application by id |
| PATCH | /recruitment/applications/:id | Permission.RECRUITMENT_CREATE | Create application |
| DELETE | /recruitment/applications/:id | Permission.RECRUITMENT_UPDATE | Update application |
| GET | /recruitment/dashboard/summary |  |  |
| POST | /recruitment/hiring/hire |  |  |
| GET | /recruitment/interview-evaluations |  |  |
| GET | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_READ | Get all interview evaluations |
| POST | /recruitment/interview-evaluations | Permission.RECRUITMENT_READ | Get interview evaluation by id |
| PATCH | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_CREATE | Create interview evaluation |
| DELETE | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_UPDATE | Update interview evaluation |
| GET | /recruitment/interviews |  |  |
| GET | /recruitment/interviews/:id | Permission.RECRUITMENT_READ | Get all interviews |
| POST | /recruitment/interviews | Permission.RECRUITMENT_READ | Get interview by id |
| PATCH | /recruitment/interviews/:id | Permission.RECRUITMENT_CREATE | Create interview |
| DELETE | /recruitment/interviews/:id | Permission.RECRUITMENT_UPDATE | Update interview |
| GET | /recruitment/job-positions |  |  |
| GET | /recruitment/job-positions/:id | Permission.RECRUITMENT_READ | Get all job positions |
| POST | /recruitment/job-positions | Permission.RECRUITMENT_READ | Get job position by id |
| PATCH | /recruitment/job-positions/:id | Permission.RECRUITMENT_CREATE | Create job position |
| DELETE | /recruitment/job-positions/:id | Permission.RECRUITMENT_UPDATE | Update job position |
| GET | /recruitment/offer-letters |  |  |
| GET | /recruitment/offer-letters/:id | Permission.RECRUITMENT_READ | Get all offer letters |
| POST | /recruitment/offer-letters | Permission.RECRUITMENT_READ | Get offer letter by id |
| PATCH | /recruitment/offer-letters/:id | Permission.RECRUITMENT_CREATE | Create offer letter |
| POST | /recruitment/offer-letters/:id/send | Permission.RECRUITMENT_UPDATE | Update offer letter |
| POST | /recruitment/offer-letters/:id/accept | Permission.RECRUITMENT_UPDATE | Send offer letter |
| POST | /recruitment/offer-letters/:id/reject | Permission.RECRUITMENT_UPDATE | Accept offer letter |
| DELETE | /recruitment/offer-letters/:id | Permission.RECRUITMENT_UPDATE | Reject offer letter |
| GET | /recruitment/vacancies |  |  |
| GET | /recruitment/vacancies/:id | Permission.RECRUITMENT_READ | Get all records |
| POST | /recruitment/vacancies | Permission.RECRUITMENT_READ | Get record by id |
| PATCH | /recruitment/vacancies/:id | Permission.RECRUITMENT_CREATE | Create record |
| DELETE | /recruitment/vacancies/:id | Permission.RECRUITMENT_UPDATE | Update record |
| GET | /reporting/dashboards/executive |  |  |
| GET | /reporting/dashboards/hr | Permission.REPORTING_READ | Get executive dashboard |
| GET | /reporting/dashboards/payroll | Permission.REPORTING_READ | Get HR dashboard |
| GET | /reporting/dashboards/accounting | Permission.REPORTING_READ | Get payroll dashboard |
| GET | /reporting/categories |  |  |
| POST | /reporting/categories | Permission.REPORTING_READ | Get report categories |
| PATCH | /reporting/categories/:id | Permission.REPORTING_CREATE | Create report category |
| GET | /reporting/definitions | Permission.REPORTING_UPDATE | Update report category |
| GET | /reporting/definitions/:id | Permission.REPORTING_READ | Get report definitions |
| POST | /reporting/definitions | Permission.REPORTING_READ | Get report definition by id |
| PATCH | /reporting/definitions/:id | Permission.REPORTING_CREATE | Create report definition |
| GET | /reporting/executions |  |  |
| GET | /reporting/executions/:id | Permission.REPORTING_READ | Get report execution history |
| POST | /reporting/executions | Permission.REPORTING_READ | Get report execution by id |
| POST | /reporting/exports |  |  |
| GET | /reporting/finance/payroll-summary |  |  |
| GET | /reporting/finance/payslip-summary | Permission.REPORTING_READ | Get payroll summary report |
| GET | /reporting/finance/trial-balance | Permission.REPORTING_READ | Get payslip summary report |
| GET | /reporting/finance/general-ledger | Permission.REPORTING_READ | Get accounting trial balance report |
| GET | /reporting/finance/cost-centers | Permission.REPORTING_READ | Get accounting general ledger report |
| GET | /reporting/hr/employees |  |  |
| GET | /reporting/hr/attendance | Permission.REPORTING_READ | Get employee report |
| GET | /reporting/hr/leave | Permission.REPORTING_READ | Get attendance report |
| GET | /reporting/hr/recruitment | Permission.REPORTING_READ | Get leave report |
| GET | /roles |  |  |
| GET | /roles/:id | Permission.ROLES_READ | Get all roles |
| POST | /roles | Permission.ROLES_READ | Get role by id |
| PATCH | /roles/:id | Permission.ROLES_CREATE | Create role |
| DELETE | /roles/:id | Permission.ROLES_UPDATE | Update role |
| GET | /scheduler/crons |  |  |
| POST | /scheduler/crons | Permission.SCHEDULER_READ | Get cron registry entries |
| PATCH | /scheduler/crons/:id | Permission.SCHEDULER_CREATE | Create cron registry entry |
| DELETE | /scheduler/crons/:id | Permission.SCHEDULER_UPDATE | Update cron registry entry |
| GET | /scheduler/jobs | Permission.SCHEDULER_DELETE | Soft delete cron registry entry |
| POST | /scheduler/jobs | Permission.SCHEDULER_READ | Get scheduled jobs |
| PATCH | /scheduler/jobs/:id | Permission.SCHEDULER_CREATE | Schedule background job |
| POST | /scheduler/jobs/:id/cancel | Permission.SCHEDULER_UPDATE | Update scheduled job |
| GET | /scheduler/history | Permission.SCHEDULER_EXECUTE | Cancel scheduled job |
| POST | /scheduler/queue/claim | Permission.SCHEDULER_READ | Get scheduler job history |
| POST | /scheduler/jobs/:id/complete | Permission.SCHEDULER_EXECUTE | Claim due scheduler jobs for a worker |
| POST | /scheduler/jobs/:id/fail | Permission.SCHEDULER_EXECUTE | Complete a running scheduler job |
| POST | /scheduler/jobs/:id/retry | Permission.SCHEDULER_EXECUTE | Fail a running scheduler job and apply retry policy |
| POST | /scheduler/jobs/:id/recover | Permission.SCHEDULER_EXECUTE | Retry a failed or dead-letter scheduler job |
| GET | /scheduler/recoveries | Permission.SCHEDULER_EXECUTE | Apply failure recovery action to a scheduler job |
| GET | /scheduler/monitoring/dashboard | Permission.SCHEDULER_MONITOR | Get scheduler failure recovery records |
| GET | /scheduler/monitoring/queues | Permission.SCHEDULER_MONITOR | Get scheduler dashboard metrics |
| GET | /scheduler/monitoring/failures | Permission.SCHEDULER_MONITOR | Get scheduler queue status |
| GET | /scheduler/monitoring/system-status | Permission.SCHEDULER_MONITOR | Get scheduler failure report |
| GET | /search/global |  |  |
| GET | /search/employees | Permission.SEARCH_GLOBAL | Run global enterprise search |
| GET | /search/payroll | Permission.SEARCH_EMPLOYEES | Search employees |
| GET | /search/documents | Permission.SEARCH_PAYROLL | Search payroll records |
| GET | /search/workflows | Permission.SEARCH_DOCUMENTS | Search documents |
| GET | /search/index | Permission.SEARCH_WORKFLOWS | Search workflows |
| POST | /search/index | Permission.SEARCH_ADMIN | List search index records |
| POST | /search/index/rebuild | Permission.SEARCH_ADMIN | Create or update search index record |
| GET | /search/audit | Permission.SEARCH_ADMIN | Rebuild search index from supported domains |
| GET | /tenants |  |  |
| POST | /tenants | Permission.TENANTS_READ | Get tenant registry |
| PATCH | /tenants/:id | Permission.TENANTS_CREATE | Create tenant |
| DELETE | /tenants/:id | Permission.TENANTS_UPDATE | Update tenant |
| POST | /tenants/:id/restore | Permission.TENANTS_DELETE | Soft delete tenant |
| GET | /tenants/domains | Permission.TENANTS_UPDATE | Restore tenant |
| POST | /tenants/domains | Permission.TENANTS_READ | Get tenant domains |
| POST | /tenants/resolve | Permission.TENANTS_UPDATE | Create tenant domain |
| GET | /tenants/isolation/companies | Permission.TENANTS_READ | Resolve tenant from context, code, or domain |
| POST | /tenants/isolation/companies/:companyId/assign | Permission.TENANTS_READ | Get tenant-scoped companies |
| GET | /tenants/isolation/branches | Permission.TENANTS_UPDATE | Assign company to tenant |
| POST | /tenants/isolation/branches/:branchId/assign | Permission.TENANTS_READ | Get tenant-scoped branches |
| POST | /tenants/isolation/validate | Permission.TENANTS_UPDATE | Assign branch to tenant |
| GET | /tenants/configuration/settings | Permission.TENANTS_SECURITY | Validate tenant data isolation scope |
| POST | /tenants/configuration/settings | Permission.TENANTS_READ | Get tenant settings |
| PATCH | /tenants/configuration/settings/:id | Permission.TENANTS_UPDATE | Create tenant setting |
| DELETE | /tenants/configuration/settings/:id | Permission.TENANTS_UPDATE | Update tenant setting |
| GET | /tenants/configuration/feature-flags | Permission.TENANTS_DELETE | Soft delete tenant setting |
| POST | /tenants/configuration/feature-flags | Permission.TENANTS_READ | Get tenant feature flags |
| PATCH | /tenants/configuration/feature-flags/:id | Permission.TENANTS_UPDATE | Create tenant feature flag |
| DELETE | /tenants/configuration/feature-flags/:id | Permission.TENANTS_UPDATE | Update tenant feature flag |
| GET | /tenants/configuration/localizations | Permission.TENANTS_DELETE | Soft delete tenant feature flag |
| POST | /tenants/configuration/localizations | Permission.TENANTS_READ | Get tenant localization profiles |
| PATCH | /tenants/configuration/localizations/:id | Permission.TENANTS_UPDATE | Create tenant localization profile |
| POST | /tenants/configuration/branding | Permission.TENANTS_UPDATE | Update tenant localization profile |
| POST | /tenants/administration/provision | Permission.TENANTS_UPDATE | Create or update tenant branding |
| POST | /tenants/administration/:id/activate | Permission.TENANTS_PROVISION | Provision tenant |
| POST | /tenants/administration/:id/suspend | Permission.TENANTS_PROVISION | Activate tenant |
| POST | /tenants/administration/:id/resume | Permission.TENANTS_PROVISION | Suspend tenant |
| POST | /tenants/administration/:id/archive | Permission.TENANTS_PROVISION | Resume tenant |
| GET | /tenants/administration/usage-limits | Permission.TENANTS_PROVISION | Archive tenant |
| POST | /tenants/administration/usage-limits | Permission.TENANTS_READ | Get tenant usage limits |
| PATCH | /tenants/administration/usage-limits/:id | Permission.TENANTS_UPDATE | Create tenant usage limit |
| DELETE | /tenants/administration/usage-limits/:id | Permission.TENANTS_UPDATE | Update tenant usage limit |
| GET | /tenants/administration/events | Permission.TENANTS_DELETE | Soft delete tenant usage limit |
| POST | /tenants/administration/events | Permission.TENANTS_READ | Get tenant provisioning events |
| GET | /tenants/security/permission-policies | Permission.TENANTS_PROVISION | Record tenant provisioning event |
| POST | /tenants/security/permission-policies | Permission.TENANTS_SECURITY | Get tenant permission policies |
| PATCH | /tenants/security/permission-policies/:id | Permission.TENANTS_SECURITY | Create tenant permission policy |
| DELETE | /tenants/security/permission-policies/:id | Permission.TENANTS_SECURITY | Update tenant permission policy |
| POST | /tenants/security/validate | Permission.TENANTS_SECURITY | Soft delete tenant permission policy |
| GET | /tenants/security/audit-events | Permission.TENANTS_SECURITY | Validate tenant security boundary |
| POST | /tenants/security/audit-events | Permission.TENANTS_SECURITY | Get tenant audit events |
| GET | /users |  |  |
| GET | /users/:id | Permission.USERS_READ | Get all users |
| POST | /users | Permission.USERS_READ | Get user by id |
| PATCH | /users/:id | Permission.USERS_CREATE | Create user |
| DELETE | /users/:id | Permission.USERS_UPDATE | Update user |
| GET | /workflows/dashboard |  |  |
| GET | /workflows/definitions |  |  |
| GET | /workflows/definitions/:id | Permission.WORKFLOWS_READ | Get all workflow definitions |
| POST | /workflows/definitions | Permission.WORKFLOWS_READ | Get workflow definition by id |
| PATCH | /workflows/definitions/:id | Permission.WORKFLOWS_CREATE | Create workflow definition |
| POST | /workflows/definitions/:id/activate | Permission.WORKFLOWS_UPDATE | Update workflow definition |
| POST | /workflows/definitions/:id/archive | Permission.WORKFLOWS_UPDATE | Activate workflow definition |
| POST | /workflows/definitions/:id/steps | Permission.WORKFLOWS_UPDATE | Archive workflow definition |
| PATCH | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE | Add workflow definition step |
| DELETE | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE | Update workflow definition step |
| GET | /workflows/requests |  |  |
| GET | /workflows/requests/:id | Permission.WORKFLOWS_READ | Get all workflow requests |
| GET | /workflows/requests/:id/history | Permission.WORKFLOWS_READ | Get workflow request by id |
| POST | /workflows/requests | Permission.WORKFLOWS_READ | Get workflow request history |
| POST | /workflows/requests/:id/steps/:stepId/approve | Permission.WORKFLOWS_CREATE | Submit workflow request |
| POST | /workflows/requests/:id/steps/:stepId/reject | Permission.WORKFLOWS_UPDATE | Approve workflow step |
| POST | /workflows/requests/:id/cancel | Permission.WORKFLOWS_UPDATE | Reject workflow step |

### AssetItemsModule

Assets bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/assets/assets/assets.module.ts |
| Controllers | apps/api/src/assets/assets/assets.controller.ts |
| Services | apps/api/src/assets/assets/assets.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Assets' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, AssetCategory, Asset |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /assets |  |  |
| GET | /assets/:id | Permission.ASSETS_READ | Get all assets |
| POST | /assets | Permission.ASSETS_READ | Get asset by id |
| PATCH | /assets/:id | Permission.ASSETS_CREATE | Create asset |
| DELETE | /assets/:id | Permission.ASSETS_UPDATE | Update asset |

### AssetsModule

Assets bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/assets/assets.module.ts |
| Controllers | apps/api/src/assets/assets/assets.controller.ts, apps/api/src/assets/assignments/asset-assignments.controller.ts, apps/api/src/assets/categories/asset-categories.controller.ts, apps/api/src/assets/dashboard/assets-dashboard.controller.ts, apps/api/src/assets/maintenance/asset-maintenance.controller.ts |
| Services | apps/api/src/assets/assets/assets.service.ts, apps/api/src/assets/assignments/asset-assignments.service.ts, apps/api/src/assets/categories/asset-categories.service.ts, apps/api/src/assets/dashboard/assets-dashboard.service.ts, apps/api/src/assets/maintenance/asset-maintenance.service.ts |
| Repositories | None detected |
| DTOs | 8 |
| Entities | 5 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Assets', 'Assets / Assignments', 'Assets / Categories', 'Assets / Dashboard', 'Assets / Maintenance' |
| Permissions | 17 |
| Prisma Models/Tables | Permission, Company, Employee, AssetCategory, Asset, AssetAssignment, AssetMaintenance |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 4 |
| Security Notes | 0 |
| Technical Debt | 4 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /assets |  |  |
| GET | /assets/:id | Permission.ASSETS_READ | Get all assets |
| POST | /assets | Permission.ASSETS_READ | Get asset by id |
| PATCH | /assets/:id | Permission.ASSETS_CREATE | Create asset |
| DELETE | /assets/:id | Permission.ASSETS_UPDATE | Update asset |
| GET | /assets/assignments |  |  |
| GET | /assets/assignments/:id | Permission.ASSETS_READ | Get all asset assignments |
| POST | /assets/assignments | Permission.ASSETS_READ | Get asset assignment by id |
| POST | /assets/assignments/:id/return | Permission.ASSETS_CREATE | Assign asset to employee |
| POST | /assets/assignments/:id/lost | Permission.ASSETS_UPDATE | Return assigned asset |
| DELETE | /assets/assignments/:id | Permission.ASSETS_UPDATE | Mark assigned asset as lost |
| GET | /assets/categories |  |  |
| GET | /assets/categories/:id | Permission.ASSETS_READ | Get all asset categories |
| POST | /assets/categories | Permission.ASSETS_READ | Get asset category by id |
| PATCH | /assets/categories/:id | Permission.ASSETS_CREATE | Create asset category |
| DELETE | /assets/categories/:id | Permission.ASSETS_UPDATE | Update asset category |
| GET | /assets/dashboard/summary |  |  |
| GET | /assets/maintenance |  |  |
| GET | /assets/maintenance/:id | Permission.ASSETS_READ | Get all asset maintenance records |
| POST | /assets/maintenance | Permission.ASSETS_READ | Get asset maintenance by id |
| PATCH | /assets/maintenance/:id | Permission.ASSETS_CREATE | Create asset maintenance record |
| DELETE | /assets/maintenance/:id | Permission.ASSETS_UPDATE | Update asset maintenance record |

### AssetAssignmentsModule

Asset Assignments bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/assets/assignments/asset-assignments.module.ts |
| Controllers | apps/api/src/assets/assignments/asset-assignments.controller.ts |
| Services | apps/api/src/assets/assignments/asset-assignments.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Assets / Assignments' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Employee, Asset, AssetAssignment |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /assets/assignments |  |  |
| GET | /assets/assignments/:id | Permission.ASSETS_READ | Get all asset assignments |
| POST | /assets/assignments | Permission.ASSETS_READ | Get asset assignment by id |
| POST | /assets/assignments/:id/return | Permission.ASSETS_CREATE | Assign asset to employee |
| POST | /assets/assignments/:id/lost | Permission.ASSETS_UPDATE | Return assigned asset |
| DELETE | /assets/assignments/:id | Permission.ASSETS_UPDATE | Mark assigned asset as lost |

### AssetCategoriesModule

Asset Categories bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/assets/categories/asset-categories.module.ts |
| Controllers | apps/api/src/assets/categories/asset-categories.controller.ts |
| Services | apps/api/src/assets/categories/asset-categories.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Assets / Categories' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, AssetCategory, Asset |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /assets/categories |  |  |
| GET | /assets/categories/:id | Permission.ASSETS_READ | Get all asset categories |
| POST | /assets/categories | Permission.ASSETS_READ | Get asset category by id |
| PATCH | /assets/categories/:id | Permission.ASSETS_CREATE | Create asset category |
| DELETE | /assets/categories/:id | Permission.ASSETS_UPDATE | Update asset category |

### AssetsDashboardModule

Assets Dashboard bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/assets/dashboard/assets-dashboard.module.ts |
| Controllers | apps/api/src/assets/dashboard/assets-dashboard.controller.ts |
| Services | apps/api/src/assets/dashboard/assets-dashboard.service.ts |
| Repositories | None detected |
| DTOs | 0 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Assets / Dashboard' |
| Permissions | 1 |
| Prisma Models/Tables | Permission, Asset, AssetMaintenance |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 0 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /assets/dashboard/summary |  |  |

### AssetMaintenanceModule

Asset Maintenance bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/assets/maintenance/asset-maintenance.module.ts |
| Controllers | apps/api/src/assets/maintenance/asset-maintenance.controller.ts |
| Services | apps/api/src/assets/maintenance/asset-maintenance.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Assets / Maintenance' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Asset, AssetMaintenance |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /assets/maintenance |  |  |
| GET | /assets/maintenance/:id | Permission.ASSETS_READ | Get all asset maintenance records |
| POST | /assets/maintenance | Permission.ASSETS_READ | Get asset maintenance by id |
| PATCH | /assets/maintenance/:id | Permission.ASSETS_CREATE | Create asset maintenance record |
| DELETE | /assets/maintenance/:id | Permission.ASSETS_UPDATE | Update asset maintenance record |

### AttendanceModule

Attendance bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/attendance/attendance.module.ts |
| Controllers | apps/api/src/attendance/holidays/holidays.controller.ts, apps/api/src/attendance/records/attendance-records.controller.ts, apps/api/src/attendance/shifts/shifts.controller.ts |
| Services | apps/api/src/attendance/holidays/holidays.service.ts, apps/api/src/attendance/records/attendance-records.service.ts, apps/api/src/attendance/shifts/shifts.service.ts |
| Repositories | None detected |
| DTOs | 6 |
| Entities | 3 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Attendance / Holidays', 'Attendance / Records', 'Attendance / Shifts' |
| Permissions | 12 |
| Prisma Models/Tables | Permission, Company, Branch, Employee, Shift, AttendanceRecord, Holiday |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | Yes |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 3 |
| Security Notes | 0 |
| Technical Debt | 3 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /attendance/holidays |  |  |
| GET | /attendance/holidays/:id | Permission.ATTENDANCE_READ | Get all holidays |
| POST | /attendance/holidays | Permission.ATTENDANCE_READ | Get holiday by id |
| PATCH | /attendance/holidays/:id | Permission.ATTENDANCE_CREATE | Create holiday |
| DELETE | /attendance/holidays/:id | Permission.ATTENDANCE_UPDATE | Update holiday |
| GET | /attendance/records |  |  |
| GET | /attendance/records/:id | Permission.ATTENDANCE_READ | Get all attendance records |
| POST | /attendance/records | Permission.ATTENDANCE_READ | Get attendance record by id |
| PATCH | /attendance/records/:id | Permission.ATTENDANCE_CREATE | Create attendance record |
| DELETE | /attendance/records/:id | Permission.ATTENDANCE_UPDATE | Update attendance record |
| GET | /attendance/shifts |  |  |
| GET | /attendance/shifts/:id | Permission.ATTENDANCE_READ | Get all shifts |
| POST | /attendance/shifts | Permission.ATTENDANCE_READ | Get shift by id |
| PATCH | /attendance/shifts/:id | Permission.ATTENDANCE_CREATE | Create shift |
| DELETE | /attendance/shifts/:id | Permission.ATTENDANCE_UPDATE | Update shift |

### HolidaysModule

Holidays bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/attendance/holidays/holidays.module.ts |
| Controllers | apps/api/src/attendance/holidays/holidays.controller.ts |
| Services | apps/api/src/attendance/holidays/holidays.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Attendance / Holidays' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, Branch, Holiday |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /attendance/holidays |  |  |
| GET | /attendance/holidays/:id | Permission.ATTENDANCE_READ | Get all holidays |
| POST | /attendance/holidays | Permission.ATTENDANCE_READ | Get holiday by id |
| PATCH | /attendance/holidays/:id | Permission.ATTENDANCE_CREATE | Create holiday |
| DELETE | /attendance/holidays/:id | Permission.ATTENDANCE_UPDATE | Update holiday |

### AttendanceRecordsModule

Attendance Records bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/attendance/records/attendance-records.module.ts |
| Controllers | apps/api/src/attendance/records/attendance-records.controller.ts |
| Services | apps/api/src/attendance/records/attendance-records.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Attendance / Records' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Employee, Shift, AttendanceRecord |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | Yes |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /attendance/records |  |  |
| GET | /attendance/records/:id | Permission.ATTENDANCE_READ | Get all attendance records |
| POST | /attendance/records | Permission.ATTENDANCE_READ | Get attendance record by id |
| PATCH | /attendance/records/:id | Permission.ATTENDANCE_CREATE | Create attendance record |
| DELETE | /attendance/records/:id | Permission.ATTENDANCE_UPDATE | Update attendance record |

### ShiftsModule

Shifts bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/attendance/shifts/shifts.module.ts |
| Controllers | apps/api/src/attendance/shifts/shifts.controller.ts |
| Services | apps/api/src/attendance/shifts/shifts.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Attendance / Shifts' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, Branch, Shift |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /attendance/shifts |  |  |
| GET | /attendance/shifts/:id | Permission.ATTENDANCE_READ | Get all shifts |
| POST | /attendance/shifts | Permission.ATTENDANCE_READ | Get shift by id |
| PATCH | /attendance/shifts/:id | Permission.ATTENDANCE_CREATE | Create shift |
| DELETE | /attendance/shifts/:id | Permission.ATTENDANCE_UPDATE | Update shift |

### AuthModule

Auth bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/auth/auth.module.ts |
| Controllers | apps/api/src/auth/auth.controller.ts |
| Services | apps/api/src/auth/auth.service.ts |
| Repositories | None detected |
| DTOs | 1 |
| Entities | 0 |
| Enums | None detected |
| Guards | apps/api/src/auth/jwt-auth.guard.ts |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | apps/api/src/auth/decorators/public.decorator.ts |
| Middleware | None detected |
| Swagger Tags | 'Auth' |
| Permissions | 0 |
| Prisma Models/Tables | User, Role, Permission, RolePermission |
| Module Dependencies | prisma, passport-jwt |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | JWT_SECRET, NODE_ENV |
| Performance Hotspots | 2 |
| Security Notes | 1 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| POST | /auth/login |  |  |

### BiModule

Bi bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/bi/bi.module.ts |
| Controllers | apps/api/src/bi/bi.controller.ts |
| Services | apps/api/src/bi/bi.service.ts |
| Repositories | None detected |
| DTOs | 5 |
| Entities | 5 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'BI & Analytics' |
| Permissions | 5 |
| Prisma Models/Tables | Permission, BiKpiDefinition, BiKpiSnapshot, BiDataset, BiMetricDefinition, BiMetricObservation, BiAnalyticsExecution, BiDashboard, BiDashboardWidget, BiPredictionModel, BiPredictionRun, Position, Employee, PayrollRun, Document, WorkflowRequest |
| Module Dependencies | common, platform, prisma |
| Request Context | Yes |
| Pagination | Yes |
| Audit | Yes |
| Soft Delete | Yes |
| Status Transitions | No |
| Business Rules | No |
| Workflow | Yes |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /bi/kpis |  |  |
| POST | /bi/kpis | Permission.BI_READ | List KPI definitions |
| PATCH | /bi/kpis/:id | Permission.BI_MANAGE | Create KPI definition |
| POST | /bi/kpis/:id/archive | Permission.BI_MANAGE | Update KPI definition |
| POST | /bi/kpis/:id/snapshots | Permission.BI_MANAGE | Archive KPI definition |
| GET | /bi/kpis/:id/snapshots | Permission.BI_EXECUTE | Record KPI snapshot |
| GET | /bi/datasets | Permission.BI_READ | List KPI snapshots |
| POST | /bi/datasets | Permission.BI_READ | List analytics datasets |
| PATCH | /bi/datasets/:id | Permission.BI_MANAGE | Create analytics dataset |
| POST | /bi/datasets/:id/run | Permission.BI_MANAGE | Update analytics dataset |
| GET | /bi/metrics | Permission.BI_EXECUTE | Run analytics dataset execution |
| POST | /bi/metrics | Permission.BI_READ | List analytics metrics |
| PATCH | /bi/metrics/:id | Permission.BI_MANAGE | Create analytics metric |
| POST | /bi/metrics/:id/observations | Permission.BI_MANAGE | Update analytics metric |
| GET | /bi/dashboards | Permission.BI_EXECUTE | Record analytics metric observation |
| POST | /bi/dashboards | Permission.BI_DASHBOARD | List BI dashboards |
| POST | /bi/dashboards/:id/widgets | Permission.BI_MANAGE | Create BI dashboard |
| GET | /bi/dashboards/executive/summary | Permission.BI_MANAGE | Add BI dashboard widget |
| GET | /bi/kpis/:id/trend | Permission.BI_DASHBOARD | Get executive dashboard summary |
| GET | /bi/metrics/:id/trend | Permission.BI_READ | Get KPI trend analysis |
| GET | /bi/predictions/models | Permission.BI_READ | Get metric trend analysis |
| POST | /bi/predictions/models | Permission.BI_PREDICT | List BI prediction models |
| POST | /bi/predictions/models/:id/run | Permission.BI_PREDICT | Create BI prediction model |

### BusinessRulesModule

Business Rules bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/business-rules/business-rules.module.ts |
| Controllers | apps/api/src/business-rules/business-rules.controller.ts |
| Services | apps/api/src/business-rules/business-rules.service.ts |
| Repositories | None detected |
| DTOs | 11 |
| Entities | 5 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Business Rules' |
| Permissions | 5 |
| Prisma Models/Tables | Permission, Company, Branch, BusinessRuleCategory, BusinessRule, BusinessRuleCondition, BusinessRuleAction, BusinessRuleExecution |
| Module Dependencies | common, platform, prisma |
| Request Context | Yes |
| Pagination | Yes |
| Audit | Yes |
| Soft Delete | Yes |
| Status Transitions | Yes |
| Business Rules | Yes |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 3 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /business-rules/categories |  |  |
| POST | /business-rules/categories | Permission.BUSINESS_RULES_READ | Get business rule categories |
| PATCH | /business-rules/categories/:id | Permission.BUSINESS_RULES_CREATE | Create business rule category |
| DELETE | /business-rules/categories/:id | Permission.BUSINESS_RULES_UPDATE | Update business rule category |
| POST | /business-rules/categories/:id/restore | Permission.BUSINESS_RULES_DELETE | Soft delete business rule category |
| GET | /business-rules/executions | Permission.BUSINESS_RULES_UPDATE | Restore business rule category |
| GET | /business-rules/dashboard | Permission.BUSINESS_RULES_READ | Get business rule execution history |
| GET | /business-rules | Permission.BUSINESS_RULES_READ | Get business rules dashboard |
| POST | /business-rules/evaluate | Permission.BUSINESS_RULES_READ | Get business rules |
| GET | /business-rules/:id/conditions | Permission.BUSINESS_RULES_EXECUTE | Evaluate active business rules |
| POST | /business-rules/:id/conditions | Permission.BUSINESS_RULES_READ | Get business rule conditions |
| PATCH | /business-rules/:id/conditions/:conditionId | Permission.BUSINESS_RULES_UPDATE | Create business rule condition |
| DELETE | /business-rules/:id/conditions/:conditionId | Permission.BUSINESS_RULES_UPDATE | Update business rule condition |
| GET | /business-rules/:id/actions | Permission.BUSINESS_RULES_DELETE | Soft delete business rule condition |
| POST | /business-rules/:id/actions | Permission.BUSINESS_RULES_READ | Get business rule actions |
| PATCH | /business-rules/:id/actions/:actionId | Permission.BUSINESS_RULES_UPDATE | Create business rule action |
| DELETE | /business-rules/:id/actions/:actionId | Permission.BUSINESS_RULES_UPDATE | Update business rule action |
| GET | /business-rules/:id | Permission.BUSINESS_RULES_DELETE | Soft delete business rule action |
| POST | /business-rules | Permission.BUSINESS_RULES_READ | Get business rule by id |
| PATCH | /business-rules/:id | Permission.BUSINESS_RULES_CREATE | Create business rule |
| DELETE | /business-rules/:id | Permission.BUSINESS_RULES_UPDATE | Update business rule |
| POST | /business-rules/:id/restore | Permission.BUSINESS_RULES_DELETE | Soft delete business rule |

### DocumentCategoriesModule

Document Categories bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/documents/categories/document-categories.module.ts |
| Controllers | apps/api/src/documents/categories/document-categories.controller.ts |
| Services | apps/api/src/documents/categories/document-categories.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Documents / Categories' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, DocumentCategory, Document |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /documents/categories |  |  |
| GET | /documents/categories/:id | Permission.DOCUMENTS_READ | Get all document categories |
| POST | /documents/categories | Permission.DOCUMENTS_READ | Get document category by id |
| PATCH | /documents/categories/:id | Permission.DOCUMENTS_CREATE | Create document category |
| DELETE | /documents/categories/:id | Permission.DOCUMENTS_UPDATE | Update document category |

### DocumentsDashboardModule

Documents Dashboard bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/documents/dashboard/documents-dashboard.module.ts |
| Controllers | apps/api/src/documents/dashboard/documents-dashboard.controller.ts |
| Services | apps/api/src/documents/dashboard/documents-dashboard.service.ts |
| Repositories | None detected |
| DTOs | 0 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Documents / Dashboard' |
| Permissions | 1 |
| Prisma Models/Tables | Permission, Document |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 0 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /documents/dashboard/summary |  |  |

### DocumentItemsModule

Documents bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/documents/documents/documents.module.ts |
| Controllers | apps/api/src/documents/documents/documents.controller.ts |
| Services | apps/api/src/documents/documents/documents.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Documents' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, Employee, DocumentCategory, Document, DocumentVersion |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /documents |  |  |
| GET | /documents/:id | Permission.DOCUMENTS_READ | Get all documents |
| POST | /documents | Permission.DOCUMENTS_READ | Get document by id |
| PATCH | /documents/:id | Permission.DOCUMENTS_CREATE | Create document |
| POST | /documents/:id/archive | Permission.DOCUMENTS_UPDATE | Update document |
| DELETE | /documents/:id | Permission.DOCUMENTS_UPDATE | Archive document |

### DocumentsModule

Documents bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/documents/documents.module.ts |
| Controllers | apps/api/src/documents/categories/document-categories.controller.ts, apps/api/src/documents/dashboard/documents-dashboard.controller.ts, apps/api/src/documents/documents/documents.controller.ts, apps/api/src/documents/expiration/document-expiration.controller.ts, apps/api/src/documents/versions/document-versions.controller.ts |
| Services | apps/api/src/documents/categories/document-categories.service.ts, apps/api/src/documents/dashboard/documents-dashboard.service.ts, apps/api/src/documents/documents/documents.service.ts, apps/api/src/documents/expiration/document-expiration.service.ts, apps/api/src/documents/versions/document-versions.service.ts |
| Repositories | None detected |
| DTOs | 5 |
| Entities | 4 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Documents / Categories', 'Documents / Dashboard', 'Documents', 'Documents / Expiration', 'Documents / Versions' |
| Permissions | 14 |
| Prisma Models/Tables | Permission, Company, Employee, DocumentCategory, Document, DocumentVersion |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 3 |
| Security Notes | 0 |
| Technical Debt | 2 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /documents/categories |  |  |
| GET | /documents/categories/:id | Permission.DOCUMENTS_READ | Get all document categories |
| POST | /documents/categories | Permission.DOCUMENTS_READ | Get document category by id |
| PATCH | /documents/categories/:id | Permission.DOCUMENTS_CREATE | Create document category |
| DELETE | /documents/categories/:id | Permission.DOCUMENTS_UPDATE | Update document category |
| GET | /documents/dashboard/summary |  |  |
| GET | /documents |  |  |
| GET | /documents/:id | Permission.DOCUMENTS_READ | Get all documents |
| POST | /documents | Permission.DOCUMENTS_READ | Get document by id |
| PATCH | /documents/:id | Permission.DOCUMENTS_CREATE | Create document |
| POST | /documents/:id/archive | Permission.DOCUMENTS_UPDATE | Update document |
| DELETE | /documents/:id | Permission.DOCUMENTS_UPDATE | Archive document |
| POST | /documents/expiration/mark-expired |  |  |
| GET | /documents/expiration/expired | Permission.DOCUMENTS_UPDATE | Mark expired documents |
| GET | /documents/expiration/soon/:days | Permission.DOCUMENTS_READ | Get expired documents |
| GET | /documents/versions |  |  |
| GET | /documents/versions/document/:documentId | Permission.DOCUMENTS_READ | Get all document versions |
| GET | /documents/versions/:id | Permission.DOCUMENTS_READ | Get versions by document |
| POST | /documents/versions | Permission.DOCUMENTS_READ | Get document version by id |
| DELETE | /documents/versions/:id | Permission.DOCUMENTS_CREATE | Create document version |

### DocumentExpirationModule

Document Expiration bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/documents/expiration/document-expiration.module.ts |
| Controllers | apps/api/src/documents/expiration/document-expiration.controller.ts |
| Services | apps/api/src/documents/expiration/document-expiration.service.ts |
| Repositories | None detected |
| DTOs | 0 |
| Entities | 0 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Documents / Expiration' |
| Permissions | 2 |
| Prisma Models/Tables | Permission, Document |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 0 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| POST | /documents/expiration/mark-expired |  |  |
| GET | /documents/expiration/expired | Permission.DOCUMENTS_UPDATE | Mark expired documents |
| GET | /documents/expiration/soon/:days | Permission.DOCUMENTS_READ | Get expired documents |

### DocumentVersionsModule

Document Versions bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/documents/versions/document-versions.module.ts |
| Controllers | apps/api/src/documents/versions/document-versions.controller.ts |
| Services | apps/api/src/documents/versions/document-versions.service.ts |
| Repositories | None detected |
| DTOs | 1 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Documents / Versions' |
| Permissions | 3 |
| Prisma Models/Tables | Permission, Document, DocumentVersion |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /documents/versions |  |  |
| GET | /documents/versions/document/:documentId | Permission.DOCUMENTS_READ | Get all document versions |
| GET | /documents/versions/:id | Permission.DOCUMENTS_READ | Get versions by document |
| POST | /documents/versions | Permission.DOCUMENTS_READ | Get document version by id |
| DELETE | /documents/versions/:id | Permission.DOCUMENTS_CREATE | Create document version |

### EmployeesModule

Employees bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/employees/employees.module.ts |
| Controllers | apps/api/src/employees/employees.controller.ts |
| Services | apps/api/src/employees/employees.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Employees' |
| Permissions | 4 |
| Prisma Models/Tables | User, Permission, Company, Branch, Department, Position, CostCenter, Employee |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /employees |  |  |
| GET | /employees/:id | Permission.EMPLOYEES_READ | Get all employees |
| POST | /employees | Permission.EMPLOYEES_READ | Get employee by id |
| PATCH | /employees/:id | Permission.EMPLOYEES_CREATE | Create employee |
| DELETE | /employees/:id | Permission.EMPLOYEES_UPDATE | Update employee |

### EssModule

Ess bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/ess/ess.module.ts |
| Controllers | apps/api/src/ess/requests/self-service-requests.controller.ts |
| Services | apps/api/src/ess/requests/self-service-requests.service.ts |
| Repositories | None detected |
| DTOs | 3 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'ESS / Requests' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Employee, SelfServiceRequest |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /ess/requests |  |  |
| GET | /ess/requests/employee/:employeeId | Permission.ESS_READ | Get all self-service requests |
| GET | /ess/requests/:id | Permission.ESS_READ | Get requests by employee |
| POST | /ess/requests | Permission.ESS_READ | Get self-service request by id |
| PATCH | /ess/requests/:id | Permission.ESS_CREATE | Create self-service request |
| POST | /ess/requests/:id/submit | Permission.ESS_UPDATE | Update draft self-service request |
| POST | /ess/requests/:id/review | Permission.ESS_UPDATE | Submit self-service request |
| DELETE | /ess/requests/:id | Permission.ESS_UPDATE | Review self-service request |

### SelfServiceRequestsModule

Self Service Requests bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/ess/requests/self-service-requests.module.ts |
| Controllers | apps/api/src/ess/requests/self-service-requests.controller.ts |
| Services | apps/api/src/ess/requests/self-service-requests.service.ts |
| Repositories | None detected |
| DTOs | 3 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'ESS / Requests' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Employee, SelfServiceRequest |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /ess/requests |  |  |
| GET | /ess/requests/employee/:employeeId | Permission.ESS_READ | Get all self-service requests |
| GET | /ess/requests/:id | Permission.ESS_READ | Get requests by employee |
| POST | /ess/requests | Permission.ESS_READ | Get self-service request by id |
| PATCH | /ess/requests/:id | Permission.ESS_CREATE | Create self-service request |
| POST | /ess/requests/:id/submit | Permission.ESS_UPDATE | Update draft self-service request |
| POST | /ess/requests/:id/review | Permission.ESS_UPDATE | Submit self-service request |
| DELETE | /ess/requests/:id | Permission.ESS_UPDATE | Review self-service request |

### IntegrationsModule

Integrations bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/integrations/integrations.module.ts |
| Controllers | apps/api/src/integrations/integrations.controller.ts |
| Services | apps/api/src/integrations/integrations.service.ts |
| Repositories | None detected |
| DTOs | 4 |
| Entities | 4 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Integrations' |
| Permissions | 6 |
| Prisma Models/Tables | Permission, Company, IntegrationProvider, IntegrationCredential, IntegrationConnection, IntegrationInboundEvent, IntegrationExecutionHistory, IntegrationRetryPolicy, IntegrationWebhook, IntegrationRestConnector, IntegrationOutboundJob, IntegrationRetryHistory, IntegrationHealthSnapshot |
| Module Dependencies | platform, auth, common, business-rules, prisma |
| Request Context | Yes |
| Pagination | Yes |
| Audit | Yes |
| Soft Delete | Yes |
| Status Transitions | Yes |
| Business Rules | Yes |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | Yes |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 2 |
| Security Notes | 1 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /integrations/providers |  |  |
| POST | /integrations/providers | Permission.INTEGRATIONS_READ | Get integration providers |
| PATCH | /integrations/providers/:id | Permission.INTEGRATIONS_CREATE | Create integration provider |
| DELETE | /integrations/providers/:id | Permission.INTEGRATIONS_UPDATE | Update integration provider |
| POST | /integrations/providers/:id/restore | Permission.INTEGRATIONS_DELETE | Soft delete integration provider |
| POST | /integrations/providers/:id/enable | Permission.INTEGRATIONS_UPDATE | Restore integration provider |
| POST | /integrations/providers/:id/disable | Permission.INTEGRATIONS_UPDATE | Enable integration provider |
| GET | /integrations/credentials | Permission.INTEGRATIONS_UPDATE | Disable integration provider |
| POST | /integrations/credentials | Permission.INTEGRATIONS_READ | Get integration credentials |
| PATCH | /integrations/credentials/:id | Permission.INTEGRATIONS_CREATE | Create integration credential |
| DELETE | /integrations/credentials/:id | Permission.INTEGRATIONS_UPDATE | Update integration credential |
| POST | /integrations/credentials/:id/restore | Permission.INTEGRATIONS_DELETE | Soft delete integration credential |
| POST | /integrations/credentials/:id/enable | Permission.INTEGRATIONS_UPDATE | Restore integration credential |
| POST | /integrations/credentials/:id/disable | Permission.INTEGRATIONS_UPDATE | Enable integration credential |
| GET | /integrations/connections | Permission.INTEGRATIONS_UPDATE | Disable integration credential |
| POST | /integrations/connections | Permission.INTEGRATIONS_READ | Get integration connections |
| PATCH | /integrations/connections/:id | Permission.INTEGRATIONS_CREATE | Create integration connection |
| DELETE | /integrations/connections/:id | Permission.INTEGRATIONS_UPDATE | Update integration connection |
| POST | /integrations/connections/:id/restore | Permission.INTEGRATIONS_DELETE | Soft delete integration connection |
| POST | /integrations/connections/:id/test | Permission.INTEGRATIONS_UPDATE | Restore integration connection |
| POST | /integrations/connections/:id/connect | Permission.INTEGRATIONS_EXECUTE | Test integration connection |
| POST | /integrations/connections/:id/disconnect | Permission.INTEGRATIONS_EXECUTE | Connect integration connection |
| POST | /integrations/connections/:id/enable | Permission.INTEGRATIONS_EXECUTE | Disconnect integration connection |
| POST | /integrations/connections/:id/disable | Permission.INTEGRATIONS_UPDATE | Enable integration connection |
| GET | /integrations/retry-policies | Permission.INTEGRATIONS_UPDATE | Disable integration connection |
| POST | /integrations/retry-policies | Permission.INTEGRATIONS_READ | Get integration retry policies |
| PATCH | /integrations/retry-policies/:id | Permission.INTEGRATIONS_CREATE | Create integration retry policy |
| DELETE | /integrations/retry-policies/:id | Permission.INTEGRATIONS_UPDATE | Update integration retry policy |
| POST | /integrations/retry-policies/:id/restore | Permission.INTEGRATIONS_DELETE | Soft delete integration retry policy |
| POST | /integrations/retry-policies/:id/enable | Permission.INTEGRATIONS_UPDATE | Restore integration retry policy |
| POST | /integrations/retry-policies/:id/disable | Permission.INTEGRATIONS_UPDATE | Enable integration retry policy |
| GET | /integrations/webhooks | Permission.INTEGRATIONS_UPDATE | Disable integration retry policy |
| POST | /integrations/webhooks | Permission.INTEGRATIONS_READ | Get outbound webhooks |
| PATCH | /integrations/webhooks/:id | Permission.INTEGRATIONS_CREATE | Create outbound webhook |
| DELETE | /integrations/webhooks/:id | Permission.INTEGRATIONS_UPDATE | Update outbound webhook |
| POST | /integrations/webhooks/:id/restore | Permission.INTEGRATIONS_DELETE | Soft delete outbound webhook |
| POST | /integrations/webhooks/:id/enable | Permission.INTEGRATIONS_UPDATE | Restore outbound webhook |
| POST | /integrations/webhooks/:id/disable | Permission.INTEGRATIONS_UPDATE | Enable outbound webhook |
| GET | /integrations/rest-connectors | Permission.INTEGRATIONS_UPDATE | Disable outbound webhook |
| POST | /integrations/rest-connectors | Permission.INTEGRATIONS_READ | Get REST connectors |
| PATCH | /integrations/rest-connectors/:id | Permission.INTEGRATIONS_CREATE | Create REST connector |
| DELETE | /integrations/rest-connectors/:id | Permission.INTEGRATIONS_UPDATE | Update REST connector |
| POST | /integrations/rest-connectors/:id/restore | Permission.INTEGRATIONS_DELETE | Soft delete REST connector |
| POST | /integrations/rest-connectors/:id/enable | Permission.INTEGRATIONS_UPDATE | Restore REST connector |
| POST | /integrations/rest-connectors/:id/disable | Permission.INTEGRATIONS_UPDATE | Enable REST connector |
| GET | /integrations/outbound-jobs | Permission.INTEGRATIONS_UPDATE | Disable REST connector |
| POST | /integrations/outbound-jobs | Permission.INTEGRATIONS_MONITOR | Get outbound integration jobs |
| POST | /integrations/outbound-jobs/process-due | Permission.INTEGRATIONS_EXECUTE | Queue outbound integration job |
| POST | /integrations/outbound-jobs/:id/execute | Permission.INTEGRATIONS_EXECUTE | Process due outbound integration jobs |
| POST | /integrations/outbound-jobs/:id/retry | Permission.INTEGRATIONS_EXECUTE | Execute outbound integration job |
| POST | /integrations/outbound-jobs/:id/cancel | Permission.INTEGRATIONS_EXECUTE | Retry failed outbound integration job |
| POST | /integrations/inbound/:connectionId/webhook | Permission.INTEGRATIONS_UPDATE | Cancel outbound integration job |
| GET | /integrations/inbound-events | Permission.INTEGRATIONS_UPDATE | Receive inbound integration webhook |
| GET | /integrations/executions | Permission.INTEGRATIONS_MONITOR | Get inbound integration events |
| GET | /integrations/dashboard | Permission.INTEGRATIONS_MONITOR | Get integration execution history |
| GET | /integrations/retry-history | Permission.INTEGRATIONS_MONITOR | Get integration monitoring dashboard |
| GET | /integrations/health | Permission.INTEGRATIONS_MONITOR | Get integration retry history |
| POST | /integrations/connections/:id/health-check | Permission.INTEGRATIONS_MONITOR | Get integration health snapshots |

### LeaveBalancesModule

Leave Balances bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/leave/leave-balances/leave-balances.module.ts |
| Controllers | apps/api/src/leave/leave-balances/leave-balances.controller.ts |
| Services | apps/api/src/leave/leave-balances/leave-balances.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Leave / Balances' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, Employee, LeaveType, LeaveBalance |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /leave/balances |  |  |
| GET | /leave/balances/:id | Permission.LEAVE_READ | Get all records |
| POST | /leave/balances | Permission.LEAVE_READ | Get record by id |
| PATCH | /leave/balances/:id | Permission.LEAVE_CREATE | Create record |
| DELETE | /leave/balances/:id | Permission.LEAVE_UPDATE | Update record |

### LeaveRequestsModule

Leave Requests bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/leave/leave-requests/leave-requests.module.ts |
| Controllers | apps/api/src/leave/leave-requests/leave-requests.controller.ts |
| Services | apps/api/src/leave/leave-requests/leave-requests.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Leave / Requests' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Employee, LeaveType, LeaveRequest |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /leave/requests |  |  |
| GET | /leave/requests/:id | Permission.LEAVE_READ | Get all records |
| POST | /leave/requests | Permission.LEAVE_READ | Get record by id |
| PATCH | /leave/requests/:id | Permission.LEAVE_CREATE | Create record |
| DELETE | /leave/requests/:id | Permission.LEAVE_UPDATE | Update record |

### LeaveTypesModule

Leave Types bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/leave/leave-types/leave-types.module.ts |
| Controllers | apps/api/src/leave/leave-types/leave-types.controller.ts |
| Services | apps/api/src/leave/leave-types/leave-types.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Leave / Types' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, LeaveType |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /leave/types |  |  |
| GET | /leave/types/:id | Permission.LEAVE_READ | Get all records |
| POST | /leave/types | Permission.LEAVE_READ | Get record by id |
| PATCH | /leave/types/:id | Permission.LEAVE_CREATE | Create record |
| DELETE | /leave/types/:id | Permission.LEAVE_UPDATE | Update record |

### LeaveModule

Leave bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/leave/leave.module.ts |
| Controllers | apps/api/src/leave/leave-balances/leave-balances.controller.ts, apps/api/src/leave/leave-requests/leave-requests.controller.ts, apps/api/src/leave/leave-types/leave-types.controller.ts |
| Services | apps/api/src/leave/leave-balances/leave-balances.service.ts, apps/api/src/leave/leave-requests/leave-requests.service.ts, apps/api/src/leave/leave-types/leave-types.service.ts |
| Repositories | None detected |
| DTOs | 6 |
| Entities | 3 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Leave / Balances', 'Leave / Requests', 'Leave / Types' |
| Permissions | 12 |
| Prisma Models/Tables | Permission, Company, Employee, LeaveType, LeaveBalance, LeaveRequest |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 3 |
| Security Notes | 0 |
| Technical Debt | 3 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /leave/balances |  |  |
| GET | /leave/balances/:id | Permission.LEAVE_READ | Get all records |
| POST | /leave/balances | Permission.LEAVE_READ | Get record by id |
| PATCH | /leave/balances/:id | Permission.LEAVE_CREATE | Create record |
| DELETE | /leave/balances/:id | Permission.LEAVE_UPDATE | Update record |
| GET | /leave/requests |  |  |
| GET | /leave/requests/:id | Permission.LEAVE_READ | Get all records |
| POST | /leave/requests | Permission.LEAVE_READ | Get record by id |
| PATCH | /leave/requests/:id | Permission.LEAVE_CREATE | Create record |
| DELETE | /leave/requests/:id | Permission.LEAVE_UPDATE | Update record |
| GET | /leave/types |  |  |
| GET | /leave/types/:id | Permission.LEAVE_READ | Get all records |
| POST | /leave/types | Permission.LEAVE_READ | Get record by id |
| PATCH | /leave/types/:id | Permission.LEAVE_CREATE | Create record |
| DELETE | /leave/types/:id | Permission.LEAVE_UPDATE | Update record |

### MobileModule

Mobile bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/mobile/mobile.module.ts |
| Controllers | apps/api/src/mobile/mobile.controller.ts |
| Services | apps/api/src/mobile/mobile.service.ts |
| Repositories | None detected |
| DTOs | 5 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Mobile Backend' |
| Permissions | 6 |
| Prisma Models/Tables | User, Role, Permission, Company, Tenant, MobileDevice, MobileSession, MobilePushNotification, MobileSyncCursor, MobileSyncChange, Branch, Notification |
| Module Dependencies | platform, auth, common, prisma |
| Request Context | Yes |
| Pagination | Yes |
| Audit | Yes |
| Soft Delete | Yes |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | Yes |
| AI | Yes |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 2 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| POST | /mobile/auth/login |  |  |
| POST | /mobile/auth/refresh |  | Authenticate mobile user and create session |
| POST | /mobile/auth/logout |  | Refresh mobile access token |
| GET | /mobile/bootstrap | Permission.MOBILE_ACCESS | Logout mobile session |
| POST | /mobile/devices/register | Permission.MOBILE_ACCESS | Get mobile bootstrap payload |
| GET | /mobile/devices | Permission.MOBILE_ACCESS | Register or update current mobile device |
| PATCH | /mobile/devices/:id | Permission.MOBILE_READ | List registered mobile devices |
| POST | /mobile/devices/:id/revoke | Permission.MOBILE_MANAGE | Update mobile device |
| GET | /mobile/sessions | Permission.MOBILE_MANAGE | Revoke mobile device and active sessions |
| POST | /mobile/sessions/:id/revoke | Permission.MOBILE_SESSIONS | List mobile sessions |
| POST | /mobile/push/notifications | Permission.MOBILE_SESSIONS | Revoke mobile session |
| GET | /mobile/push/notifications | Permission.MOBILE_PUSH | Create mobile push notification outbox record |
| PATCH | /mobile/push/notifications/:id | Permission.MOBILE_PUSH | List mobile push notifications |
| POST | /mobile/sync/pull | Permission.MOBILE_PUSH | Update mobile push notification status |
| POST | /mobile/sync/changes | Permission.MOBILE_SYNC | Pull offline sync changes |
| GET | /mobile/sync/changes | Permission.MOBILE_SYNC | Create mobile sync change record |

### NotificationDashboardModule

Notification Dashboard bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/notifications/dashboard/notification-dashboard.module.ts |
| Controllers | apps/api/src/notifications/dashboard/notification-dashboard.controller.ts |
| Services | apps/api/src/notifications/dashboard/notification-dashboard.service.ts |
| Repositories | None detected |
| DTOs | 0 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Notification Dashboard' |
| Permissions | 1 |
| Prisma Models/Tables | Permission, Notification |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | Yes |
| AI | Yes |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 0 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /notifications/dashboard |  |  |

### NotificationsModule

Notifications bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/notifications/notifications.module.ts |
| Controllers | apps/api/src/notifications/dashboard/notification-dashboard.controller.ts, apps/api/src/notifications/jobs/notification-jobs.controller.ts, apps/api/src/notifications/notifications.controller.ts |
| Services | apps/api/src/notifications/dashboard/notification-dashboard.service.ts, apps/api/src/notifications/jobs/notification-jobs.service.ts, apps/api/src/notifications/notifications.service.ts, apps/api/src/notifications/queue/notification-queue.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 2 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Notification Dashboard', 'Notification Jobs', 'Notifications' |
| Permissions | 8 |
| Prisma Models/Tables | Permission, Company, Employee, Notification, WorkflowRequest, WorkflowStep |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | Yes |
| Notifications | Yes |
| AI | Yes |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 3 |
| Security Notes | 0 |
| Technical Debt | 2 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /notifications/dashboard |  |  |
| POST | /notifications/jobs/scheduled |  |  |
| POST | /notifications/jobs/retry-failed | Permission.NOTIFICATIONS_UPDATE | Run scheduled notification delivery job |
| POST | /notifications/jobs/expire-workflows | Permission.NOTIFICATIONS_UPDATE | Run failed notification retry job |
| POST | /notifications/jobs/cleanup | Permission.WORKFLOWS_UPDATE | Expire stale workflow requests |
| POST | /notifications/jobs/maintenance | Permission.NOTIFICATIONS_DELETE | Cleanup old delivered notifications |
| GET | /notifications |  |  |
| GET | /notifications/employee/:employeeId | Permission.NOTIFICATIONS_READ | Get all notifications |
| GET | /notifications/:id | Permission.NOTIFICATIONS_READ | Get notifications by employee |
| POST | /notifications | Permission.NOTIFICATIONS_READ | Get notification by id |
| PATCH | /notifications/:id | Permission.NOTIFICATIONS_CREATE | Create notification |
| POST | /notifications/:id/read | Permission.NOTIFICATIONS_UPDATE | Update notification |
| POST | /notifications/:id/sent | Permission.NOTIFICATIONS_UPDATE | Mark notification as read |
| POST | /notifications/:id/cancel | Permission.NOTIFICATIONS_UPDATE | Mark notification as sent |
| POST | /notifications/queue/process | Permission.NOTIFICATIONS_UPDATE | Cancel notification |
| POST | /notifications/queue/retry-failed | Permission.NOTIFICATIONS_UPDATE | Process queued notifications |
| DELETE | /notifications/:id | Permission.NOTIFICATIONS_UPDATE | Retry failed notifications |

### ObservabilityModule

Observability bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/observability/observability.module.ts |
| Controllers | apps/api/src/observability/observability.controller.ts |
| Services | apps/api/src/observability/observability.service.ts |
| Repositories | None detected |
| DTOs | 5 |
| Entities | 5 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | apps/api/src/observability/observability-http-metrics.interceptor.ts, apps/api/src/observability/observability-logging.interceptor.ts, apps/api/src/observability/observability-tracing.interceptor.ts |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Observability' |
| Permissions | 5 |
| Prisma Models/Tables | Permission, Tenant, ObservabilityHealthProvider, ObservabilityHealthCheckResult, ObservabilityMetricDefinition, ObservabilityMetricSample, ObservabilityLogEntry, ObservabilityTrace, ObservabilitySpan |
| Module Dependencies | platform, rxjs/operators, rxjs, prisma, common |
| Request Context | Yes |
| Pagination | Yes |
| Audit | Yes |
| Soft Delete | Yes |
| Status Transitions | No |
| Business Rules | Yes |
| Workflow | Yes |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /observability/health/providers |  |  |
| POST | /observability/health/providers | Permission.OBSERVABILITY_READ | Get health providers |
| PATCH | /observability/health/providers/:id | Permission.OBSERVABILITY_CREATE | Create health provider |
| DELETE | /observability/health/providers/:id | Permission.OBSERVABILITY_UPDATE | Update health provider |
| POST | /observability/health/providers/:id/run | Permission.OBSERVABILITY_DELETE | Soft delete health provider |
| POST | /observability/health/liveness | Permission.OBSERVABILITY_ADMIN | Run a health provider check |
| POST | /observability/health/readiness | Permission.OBSERVABILITY_READ | Run liveness checks |
| GET | /observability/health/results | Permission.OBSERVABILITY_READ | Run readiness checks |
| GET | /observability/metrics/definitions | Permission.OBSERVABILITY_READ | Get health check results |
| POST | /observability/metrics/definitions | Permission.OBSERVABILITY_READ | Get metric definitions |
| PATCH | /observability/metrics/definitions/:id | Permission.OBSERVABILITY_CREATE | Create metric definition |
| DELETE | /observability/metrics/definitions/:id | Permission.OBSERVABILITY_UPDATE | Update metric definition |
| GET | /observability/metrics/samples | Permission.OBSERVABILITY_DELETE | Soft delete metric definition |
| POST | /observability/metrics/samples | Permission.OBSERVABILITY_READ | Get metric samples |
| GET | /observability/metrics/http | Permission.OBSERVABILITY_CREATE | Record metric sample |
| GET | /observability/metrics/database | Permission.OBSERVABILITY_READ | Get HTTP metrics summary |
| GET | /observability/metrics/workflow | Permission.OBSERVABILITY_READ | Get database metrics summary |
| GET | /observability/metrics/payroll | Permission.OBSERVABILITY_READ | Get workflow metrics summary |
| GET | /observability/metrics/business-rules | Permission.OBSERVABILITY_READ | Get payroll metrics summary |
| GET | /observability/logs | Permission.OBSERVABILITY_READ | Get business rules metrics summary |
| POST | /observability/logs | Permission.OBSERVABILITY_READ | Get structured log entries |
| GET | /observability/logs/summary | Permission.OBSERVABILITY_CREATE | Record structured log entry |
| GET | /observability/traces | Permission.OBSERVABILITY_READ | Get log level summary |
| POST | /observability/traces | Permission.OBSERVABILITY_READ | Get distributed traces |
| GET | /observability/traces/spans | Permission.OBSERVABILITY_CREATE | Start distributed trace |
| POST | /observability/traces/spans | Permission.OBSERVABILITY_READ | Get distributed trace spans |
| GET | /observability/traces/requests | Permission.OBSERVABILITY_CREATE | Record distributed trace span |
| GET | /observability/traces/services | Permission.OBSERVABILITY_READ | Get request tracing summary |
| GET | /observability/traces/database | Permission.OBSERVABILITY_READ | Get service tracing summary |
| GET | /observability/traces/external-providers | Permission.OBSERVABILITY_READ | Get database timing summary |
| GET | /observability/management/status | Permission.OBSERVABILITY_READ | Get external provider timing summary |
| GET | /observability/management/diagnostics | Permission.OBSERVABILITY_ADMIN | Get system observability status |
| GET | /observability/management/metrics | Permission.OBSERVABILITY_ADMIN | Get system diagnostics |
| GET | /observability/management/health | Permission.OBSERVABILITY_ADMIN | Get management metrics overview |

### BranchesModule

Branches bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/organization/branches/branches.module.ts |
| Controllers | apps/api/src/organization/branches/branches.controller.ts |
| Services | apps/api/src/organization/branches/branches.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Organization / Branches' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, Branch |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /organization/branches |  |  |
| GET | /organization/branches/:id | Permission.ORGANIZATION_READ | Get all branches |
| POST | /organization/branches | Permission.ORGANIZATION_READ | Get branches by id |
| PATCH | /organization/branches/:id | Permission.ORGANIZATION_CREATE | Create branches |
| DELETE | /organization/branches/:id | Permission.ORGANIZATION_UPDATE | Update branches |

### CompaniesModule

Companies bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/organization/companies/companies.module.ts |
| Controllers | apps/api/src/organization/companies/companies.controller.ts |
| Services | apps/api/src/organization/companies/companies.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Organization / Companies' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /organization/companies |  |  |
| GET | /organization/companies/:id | Permission.ORGANIZATION_READ | Get all companies |
| POST | /organization/companies | Permission.ORGANIZATION_READ | Get company by id |
| PATCH | /organization/companies/:id | Permission.ORGANIZATION_CREATE | Create company |
| DELETE | /organization/companies/:id | Permission.ORGANIZATION_UPDATE | Update company |

### CostCentersModule

Cost Centers bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/organization/cost-centers/cost-centers.module.ts |
| Controllers | apps/api/src/organization/cost-centers/cost-centers.controller.ts |
| Services | apps/api/src/organization/cost-centers/cost-centers.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Organization / Cost Centers' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, Branch, CostCenter |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /organization/cost-centers |  |  |
| GET | /organization/cost-centers/:id | Permission.ORGANIZATION_READ | Get all cost centers |
| POST | /organization/cost-centers | Permission.ORGANIZATION_READ | Get cost centers by id |
| PATCH | /organization/cost-centers/:id | Permission.ORGANIZATION_CREATE | Create cost centers |
| DELETE | /organization/cost-centers/:id | Permission.ORGANIZATION_UPDATE | Update cost centers |

### DepartmentsModule

Departments bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/organization/departments/departments.module.ts |
| Controllers | apps/api/src/organization/departments/departments.controller.ts |
| Services | apps/api/src/organization/departments/departments.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Organization / Departments' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, Branch, Department |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /organization/departments |  |  |
| GET | /organization/departments/:id | Permission.ORGANIZATION_READ | Get all departments |
| POST | /organization/departments | Permission.ORGANIZATION_READ | Get departments by id |
| PATCH | /organization/departments/:id | Permission.ORGANIZATION_CREATE | Create departments |
| DELETE | /organization/departments/:id | Permission.ORGANIZATION_UPDATE | Update departments |

### OrganizationModule

Organization bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/organization/organization.module.ts |
| Controllers | apps/api/src/organization/branches/branches.controller.ts, apps/api/src/organization/companies/companies.controller.ts, apps/api/src/organization/cost-centers/cost-centers.controller.ts, apps/api/src/organization/departments/departments.controller.ts, apps/api/src/organization/positions/positions.controller.ts |
| Services | apps/api/src/organization/branches/branches.service.ts, apps/api/src/organization/companies/companies.service.ts, apps/api/src/organization/cost-centers/cost-centers.service.ts, apps/api/src/organization/departments/departments.service.ts, apps/api/src/organization/positions/positions.service.ts |
| Repositories | None detected |
| DTOs | 10 |
| Entities | 5 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Organization / Branches', 'Organization / Companies', 'Organization / Cost Centers', 'Organization / Departments', 'Organization / Positions' |
| Permissions | 20 |
| Prisma Models/Tables | Permission, Company, Branch, Department, Position, CostCenter |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 5 |
| Security Notes | 0 |
| Technical Debt | 5 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /organization/branches |  |  |
| GET | /organization/branches/:id | Permission.ORGANIZATION_READ | Get all branches |
| POST | /organization/branches | Permission.ORGANIZATION_READ | Get branches by id |
| PATCH | /organization/branches/:id | Permission.ORGANIZATION_CREATE | Create branches |
| DELETE | /organization/branches/:id | Permission.ORGANIZATION_UPDATE | Update branches |
| GET | /organization/companies |  |  |
| GET | /organization/companies/:id | Permission.ORGANIZATION_READ | Get all companies |
| POST | /organization/companies | Permission.ORGANIZATION_READ | Get company by id |
| PATCH | /organization/companies/:id | Permission.ORGANIZATION_CREATE | Create company |
| DELETE | /organization/companies/:id | Permission.ORGANIZATION_UPDATE | Update company |
| GET | /organization/cost-centers |  |  |
| GET | /organization/cost-centers/:id | Permission.ORGANIZATION_READ | Get all cost centers |
| POST | /organization/cost-centers | Permission.ORGANIZATION_READ | Get cost centers by id |
| PATCH | /organization/cost-centers/:id | Permission.ORGANIZATION_CREATE | Create cost centers |
| DELETE | /organization/cost-centers/:id | Permission.ORGANIZATION_UPDATE | Update cost centers |
| GET | /organization/departments |  |  |
| GET | /organization/departments/:id | Permission.ORGANIZATION_READ | Get all departments |
| POST | /organization/departments | Permission.ORGANIZATION_READ | Get departments by id |
| PATCH | /organization/departments/:id | Permission.ORGANIZATION_CREATE | Create departments |
| DELETE | /organization/departments/:id | Permission.ORGANIZATION_UPDATE | Update departments |
| GET | /organization/positions |  |  |
| GET | /organization/positions/:id | Permission.ORGANIZATION_READ | Get all positions |
| POST | /organization/positions | Permission.ORGANIZATION_READ | Get positions by id |
| PATCH | /organization/positions/:id | Permission.ORGANIZATION_CREATE | Create positions |
| DELETE | /organization/positions/:id | Permission.ORGANIZATION_UPDATE | Update positions |

### PositionsModule

Positions bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/organization/positions/positions.module.ts |
| Controllers | apps/api/src/organization/positions/positions.controller.ts |
| Services | apps/api/src/organization/positions/positions.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Organization / Positions' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, Department, Position |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /organization/positions |  |  |
| GET | /organization/positions/:id | Permission.ORGANIZATION_READ | Get all positions |
| POST | /organization/positions | Permission.ORGANIZATION_READ | Get positions by id |
| PATCH | /organization/positions/:id | Permission.ORGANIZATION_CREATE | Create positions |
| DELETE | /organization/positions/:id | Permission.ORGANIZATION_UPDATE | Update positions |

### PayrollApprovalModule

Payroll Approval bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/payroll/approval/payroll-approval.module.ts |
| Controllers | apps/api/src/payroll/approval/payroll-approval.controller.ts |
| Services | apps/api/src/payroll/approval/payroll-approval.service.ts |
| Repositories | None detected |
| DTOs | 1 |
| Entities | 0 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Payroll / Approval' |
| Permissions | 1 |
| Prisma Models/Tables | User, Permission, PayrollPeriod, PayrollRun, AuditLog |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | Yes |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 0 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| POST | /payroll/runs/:id/review |  |  |
| POST | /payroll/runs/:id/approve | Permission.PAYROLL_UPDATE | Submit payroll run for review |
| POST | /payroll/runs/:id/reject | Permission.PAYROLL_UPDATE | Approve payroll run |
| POST | /payroll/runs/:id/lock | Permission.PAYROLL_UPDATE | Reject payroll run |

### PayrollAttendanceModule

Payroll Attendance bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/payroll/attendance/payroll-attendance.module.ts |
| Controllers | apps/api/src/payroll/attendance/payroll-attendance.controller.ts |
| Services | apps/api/src/payroll/attendance/payroll-attendance.service.ts |
| Repositories | None detected |
| DTOs | 1 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Payroll / Attendance' |
| Permissions | 1 |
| Prisma Models/Tables | Permission, Employee, AttendanceRecord, LeaveRequest, PayrollRun, PayrollItem, Payslip |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 2 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| POST | /payroll/attendance/apply |  |  |

### PayrollCalculationModule

Payroll Calculation bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/payroll/calculation/payroll-calculation.module.ts |
| Controllers | apps/api/src/payroll/calculation/payroll-calculation.controller.ts |
| Services | apps/api/src/payroll/calculation/payroll-calculation.service.ts |
| Repositories | None detected |
| DTOs | 1 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Payroll / Calculation' |
| Permissions | 2 |
| Prisma Models/Tables | Permission, Employee, SalaryComponent, PayrollRun, PayrollItem, Payslip |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 2 |
| Security Notes | 1 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| POST | /payroll/calculation/preview |  |  |
| POST | /payroll/calculation/calculate | Permission.PAYROLL_READ | Preview payroll calculations |

### PayrollItemsModule

Payroll Items bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/payroll/payroll-items/payroll-items.module.ts |
| Controllers | apps/api/src/payroll/payroll-items/payroll-items.controller.ts |
| Services | apps/api/src/payroll/payroll-items/payroll-items.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Payroll / Items' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Employee, SalaryComponent, PayrollRun, PayrollItem |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /payroll/items |  |  |
| GET | /payroll/items/run/:payrollRunId | Permission.PAYROLL_READ | Get all payroll items |
| GET | /payroll/items/:id | Permission.PAYROLL_READ | Get payroll items by run |
| POST | /payroll/items | Permission.PAYROLL_READ | Get payroll item by id |
| PATCH | /payroll/items/:id | Permission.PAYROLL_CREATE | Create payroll item |
| DELETE | /payroll/items/:id | Permission.PAYROLL_UPDATE | Update payroll item |

### PayrollPeriodsModule

Payroll Periods bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/payroll/payroll-periods/payroll-periods.module.ts |
| Controllers | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts |
| Services | apps/api/src/payroll/payroll-periods/payroll-periods.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Payroll / Periods' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, PayrollPeriod, PayrollRun |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /payroll/periods |  |  |
| GET | /payroll/periods/:id | Permission.PAYROLL_READ | Get all payroll periods |
| POST | /payroll/periods | Permission.PAYROLL_READ | Get payroll period by id |
| PATCH | /payroll/periods/:id | Permission.PAYROLL_CREATE | Create payroll period |
| DELETE | /payroll/periods/:id | Permission.PAYROLL_UPDATE | Update payroll period |

### PayrollProfilesModule

Payroll Profiles bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/payroll/payroll-profiles/payroll-profiles.module.ts |
| Controllers | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts |
| Services | apps/api/src/payroll/payroll-profiles/payroll-profiles.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Payroll / Profiles' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Employee, PayrollProfile |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /payroll/profiles |  |  |
| GET | /payroll/profiles/:id | Permission.PAYROLL_READ | Get all records |
| POST | /payroll/profiles | Permission.PAYROLL_READ | Get record by id |
| PATCH | /payroll/profiles/:id | Permission.PAYROLL_CREATE | Create record |
| DELETE | /payroll/profiles/:id | Permission.PAYROLL_UPDATE | Update record |

### PayrollRunsModule

Payroll Runs bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/payroll/payroll-runs/payroll-runs.module.ts |
| Controllers | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts |
| Services | apps/api/src/payroll/payroll-runs/payroll-runs.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Payroll / Runs' |
| Permissions | 4 |
| Prisma Models/Tables | User, Permission, Company, PayrollPeriod, PayrollRun |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /payroll/runs |  |  |
| GET | /payroll/runs/:id | Permission.PAYROLL_READ | Get all records |
| POST | /payroll/runs | Permission.PAYROLL_READ | Get record by id |
| PATCH | /payroll/runs/:id | Permission.PAYROLL_CREATE | Create record |
| DELETE | /payroll/runs/:id | Permission.PAYROLL_UPDATE | Update record |

### PayrollModule

Payroll bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/payroll/payroll.module.ts |
| Controllers | apps/api/src/payroll/approval/payroll-approval.controller.ts, apps/api/src/payroll/attendance/payroll-attendance.controller.ts, apps/api/src/payroll/calculation/payroll-calculation.controller.ts, apps/api/src/payroll/payroll-items/payroll-items.controller.ts, apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts, apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts, apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts, apps/api/src/payroll/payslips/payslips.controller.ts, apps/api/src/payroll/reports/payroll-reports.controller.ts, apps/api/src/payroll/salary-components/salary-components.controller.ts |
| Services | apps/api/src/payroll/approval/payroll-approval.service.ts, apps/api/src/payroll/attendance/payroll-attendance.service.ts, apps/api/src/payroll/calculation/payroll-calculation.service.ts, apps/api/src/payroll/payroll-items/payroll-items.service.ts, apps/api/src/payroll/payroll-periods/payroll-periods.service.ts, apps/api/src/payroll/payroll-profiles/payroll-profiles.service.ts, apps/api/src/payroll/payroll-runs/payroll-runs.service.ts, apps/api/src/payroll/payslips/payslips.service.ts, apps/api/src/payroll/reports/payroll-reports.service.ts, apps/api/src/payroll/salary-components/salary-components.service.ts |
| Repositories | None detected |
| DTOs | 14 |
| Entities | 9 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Payroll / Approval', 'Payroll / Attendance', 'Payroll / Calculation', 'Payroll / Items', 'Payroll / Periods', 'Payroll / Profiles', 'Payroll / Runs', 'Payroll / Payslips', 'Payroll / Reports', 'Payroll / Salary Components' |
| Permissions | 27 |
| Prisma Models/Tables | User, Permission, Company, Department, Position, CostCenter, Employee, AttendanceRecord, LeaveRequest, SalaryComponent, PayrollProfile, PayrollPeriod, PayrollRun, PayrollItem, Payslip, AuditLog |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | Yes |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 14 |
| Security Notes | 1 |
| Technical Debt | 7 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| POST | /payroll/runs/:id/review |  |  |
| POST | /payroll/runs/:id/approve | Permission.PAYROLL_UPDATE | Submit payroll run for review |
| POST | /payroll/runs/:id/reject | Permission.PAYROLL_UPDATE | Approve payroll run |
| POST | /payroll/runs/:id/lock | Permission.PAYROLL_UPDATE | Reject payroll run |
| POST | /payroll/attendance/apply |  |  |
| POST | /payroll/calculation/preview |  |  |
| POST | /payroll/calculation/calculate | Permission.PAYROLL_READ | Preview payroll calculations |
| GET | /payroll/items |  |  |
| GET | /payroll/items/run/:payrollRunId | Permission.PAYROLL_READ | Get all payroll items |
| GET | /payroll/items/:id | Permission.PAYROLL_READ | Get payroll items by run |
| POST | /payroll/items | Permission.PAYROLL_READ | Get payroll item by id |
| PATCH | /payroll/items/:id | Permission.PAYROLL_CREATE | Create payroll item |
| DELETE | /payroll/items/:id | Permission.PAYROLL_UPDATE | Update payroll item |
| GET | /payroll/periods |  |  |
| GET | /payroll/periods/:id | Permission.PAYROLL_READ | Get all payroll periods |
| POST | /payroll/periods | Permission.PAYROLL_READ | Get payroll period by id |
| PATCH | /payroll/periods/:id | Permission.PAYROLL_CREATE | Create payroll period |
| DELETE | /payroll/periods/:id | Permission.PAYROLL_UPDATE | Update payroll period |
| GET | /payroll/profiles |  |  |
| GET | /payroll/profiles/:id | Permission.PAYROLL_READ | Get all records |
| POST | /payroll/profiles | Permission.PAYROLL_READ | Get record by id |
| PATCH | /payroll/profiles/:id | Permission.PAYROLL_CREATE | Create record |
| DELETE | /payroll/profiles/:id | Permission.PAYROLL_UPDATE | Update record |
| GET | /payroll/runs |  |  |
| GET | /payroll/runs/:id | Permission.PAYROLL_READ | Get all records |
| POST | /payroll/runs | Permission.PAYROLL_READ | Get record by id |
| PATCH | /payroll/runs/:id | Permission.PAYROLL_CREATE | Create record |
| DELETE | /payroll/runs/:id | Permission.PAYROLL_UPDATE | Update record |
| GET | /payroll/payslips |  |  |
| GET | /payroll/payslips/employee/:employeeId | Permission.PAYROLL_READ | Get all payslips |
| GET | /payroll/payslips/:id | Permission.PAYROLL_READ | Get employee-visible payslips |
| GET | /payroll/payslips/:id/pdf-payload | Permission.PAYROLL_READ | Get payslip by id |
| PATCH | /payroll/payslips/:id | Permission.PAYROLL_READ | Get PDF-ready payslip payload |
| POST | /payroll/payslips/run/:payrollRunId/issue | Permission.PAYROLL_UPDATE | Update payslip |
| GET | /payroll/reports/dashboard |  |  |
| GET | /payroll/reports/salary | Permission.PAYROLL_READ | Get payroll dashboard |
| GET | /payroll/reports/departments | Permission.PAYROLL_READ | Get salary report |
| GET | /payroll/reports/cost-centers | Permission.PAYROLL_READ | Get department payroll report |
| GET | /payroll/reports/monthly | Permission.PAYROLL_READ | Get cost center payroll report |
| GET | /payroll/salary-components |  |  |
| GET | /payroll/salary-components/:id | Permission.PAYROLL_READ | Get all records |
| POST | /payroll/salary-components | Permission.PAYROLL_READ | Get record by id |
| PATCH | /payroll/salary-components/:id | Permission.PAYROLL_CREATE | Create record |
| DELETE | /payroll/salary-components/:id | Permission.PAYROLL_UPDATE | Update record |

### PayslipsModule

Payslips bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/payroll/payslips/payslips.module.ts |
| Controllers | apps/api/src/payroll/payslips/payslips.controller.ts |
| Services | apps/api/src/payroll/payslips/payslips.service.ts |
| Repositories | None detected |
| DTOs | 1 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Payroll / Payslips' |
| Permissions | 2 |
| Prisma Models/Tables | Permission, Company, Department, Position, Employee, PayrollRun, PayrollItem, Payslip |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 3 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /payroll/payslips |  |  |
| GET | /payroll/payslips/employee/:employeeId | Permission.PAYROLL_READ | Get all payslips |
| GET | /payroll/payslips/:id | Permission.PAYROLL_READ | Get employee-visible payslips |
| GET | /payroll/payslips/:id/pdf-payload | Permission.PAYROLL_READ | Get payslip by id |
| PATCH | /payroll/payslips/:id | Permission.PAYROLL_READ | Get PDF-ready payslip payload |
| POST | /payroll/payslips/run/:payrollRunId/issue | Permission.PAYROLL_UPDATE | Update payslip |

### PayrollReportsModule

Payroll Reports bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/payroll/reports/payroll-reports.module.ts |
| Controllers | apps/api/src/payroll/reports/payroll-reports.controller.ts |
| Services | apps/api/src/payroll/reports/payroll-reports.service.ts |
| Repositories | None detected |
| DTOs | 0 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Payroll / Reports' |
| Permissions | 1 |
| Prisma Models/Tables | Permission, Department, CostCenter, Employee, PayrollRun, Payslip |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 2 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /payroll/reports/dashboard |  |  |
| GET | /payroll/reports/salary | Permission.PAYROLL_READ | Get payroll dashboard |
| GET | /payroll/reports/departments | Permission.PAYROLL_READ | Get salary report |
| GET | /payroll/reports/cost-centers | Permission.PAYROLL_READ | Get department payroll report |
| GET | /payroll/reports/monthly | Permission.PAYROLL_READ | Get cost center payroll report |

### SalaryComponentsModule

Salary Components bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/payroll/salary-components/salary-components.module.ts |
| Controllers | apps/api/src/payroll/salary-components/salary-components.controller.ts |
| Services | apps/api/src/payroll/salary-components/salary-components.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Payroll / Salary Components' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, SalaryComponent |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /payroll/salary-components |  |  |
| GET | /payroll/salary-components/:id | Permission.PAYROLL_READ | Get all records |
| POST | /payroll/salary-components | Permission.PAYROLL_READ | Get record by id |
| PATCH | /payroll/salary-components/:id | Permission.PAYROLL_CREATE | Create record |
| DELETE | /payroll/salary-components/:id | Permission.PAYROLL_UPDATE | Update record |

### PerformanceCyclesModule

Performance Cycles bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/performance/cycles/performance-cycles.module.ts |
| Controllers | apps/api/src/performance/cycles/performance-cycles.controller.ts |
| Services | apps/api/src/performance/cycles/performance-cycles.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Performance / Cycles' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, PerformanceCycle |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /performance/cycles |  |  |
| GET | /performance/cycles/:id | Permission.PERFORMANCE_READ | Get all performance cycles |
| POST | /performance/cycles | Permission.PERFORMANCE_READ | Get performance cycle by id |
| PATCH | /performance/cycles/:id | Permission.PERFORMANCE_CREATE | Create performance cycle |
| DELETE | /performance/cycles/:id | Permission.PERFORMANCE_UPDATE | Update performance cycle |

### PerformanceDashboardModule

Performance Dashboard bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/performance/dashboard/performance-dashboard.module.ts |
| Controllers | apps/api/src/performance/dashboard/performance-dashboard.controller.ts |
| Services | apps/api/src/performance/dashboard/performance-dashboard.service.ts |
| Repositories | None detected |
| DTOs | 0 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Performance / Dashboard' |
| Permissions | 1 |
| Prisma Models/Tables | Permission, PerformanceCycle, PerformanceGoal, PerformanceReview |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 0 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /performance/dashboard/summary |  |  |

### PerformanceGoalsModule

Performance Goals bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/performance/goals/performance-goals.module.ts |
| Controllers | apps/api/src/performance/goals/performance-goals.controller.ts |
| Services | apps/api/src/performance/goals/performance-goals.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Performance / Goals' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Employee, PerformanceCycle, PerformanceGoal |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /performance/goals |  |  |
| GET | /performance/goals/:id | Permission.PERFORMANCE_READ | Get all performance goals |
| POST | /performance/goals | Permission.PERFORMANCE_READ | Get performance goal by id |
| PATCH | /performance/goals/:id | Permission.PERFORMANCE_CREATE | Create performance goal |
| DELETE | /performance/goals/:id | Permission.PERFORMANCE_UPDATE | Update performance goal |

### PerformanceModule

Performance bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/performance/performance.module.ts |
| Controllers | apps/api/src/performance/cycles/performance-cycles.controller.ts, apps/api/src/performance/dashboard/performance-dashboard.controller.ts, apps/api/src/performance/goals/performance-goals.controller.ts, apps/api/src/performance/review-items/performance-review-items.controller.ts, apps/api/src/performance/reviews/performance-reviews.controller.ts |
| Services | apps/api/src/performance/cycles/performance-cycles.service.ts, apps/api/src/performance/dashboard/performance-dashboard.service.ts, apps/api/src/performance/goals/performance-goals.service.ts, apps/api/src/performance/review-items/performance-review-items.service.ts, apps/api/src/performance/reviews/performance-reviews.service.ts |
| Repositories | None detected |
| DTOs | 8 |
| Entities | 5 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Performance / Cycles', 'Performance / Dashboard', 'Performance / Goals', 'Performance / Review Items', 'Performance / Reviews' |
| Permissions | 17 |
| Prisma Models/Tables | Permission, Company, Employee, PerformanceCycle, PerformanceGoal, PerformanceReview, PerformanceReviewItem |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 4 |
| Security Notes | 0 |
| Technical Debt | 4 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /performance/cycles |  |  |
| GET | /performance/cycles/:id | Permission.PERFORMANCE_READ | Get all performance cycles |
| POST | /performance/cycles | Permission.PERFORMANCE_READ | Get performance cycle by id |
| PATCH | /performance/cycles/:id | Permission.PERFORMANCE_CREATE | Create performance cycle |
| DELETE | /performance/cycles/:id | Permission.PERFORMANCE_UPDATE | Update performance cycle |
| GET | /performance/dashboard/summary |  |  |
| GET | /performance/goals |  |  |
| GET | /performance/goals/:id | Permission.PERFORMANCE_READ | Get all performance goals |
| POST | /performance/goals | Permission.PERFORMANCE_READ | Get performance goal by id |
| PATCH | /performance/goals/:id | Permission.PERFORMANCE_CREATE | Create performance goal |
| DELETE | /performance/goals/:id | Permission.PERFORMANCE_UPDATE | Update performance goal |
| GET | /performance/review-items |  |  |
| GET | /performance/review-items/:id | Permission.PERFORMANCE_READ | Get all performance review items |
| POST | /performance/review-items | Permission.PERFORMANCE_READ | Get performance review item by id |
| PATCH | /performance/review-items/:id | Permission.PERFORMANCE_CREATE | Create performance review item |
| DELETE | /performance/review-items/:id | Permission.PERFORMANCE_UPDATE | Update performance review item |
| GET | /performance/reviews |  |  |
| GET | /performance/reviews/:id | Permission.PERFORMANCE_READ | Get all performance reviews |
| POST | /performance/reviews | Permission.PERFORMANCE_READ | Get performance review by id |
| PATCH | /performance/reviews/:id | Permission.PERFORMANCE_CREATE | Create performance review |
| DELETE | /performance/reviews/:id | Permission.PERFORMANCE_UPDATE | Update performance review |

### PerformanceReviewItemsModule

Performance Review Items bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/performance/review-items/performance-review-items.module.ts |
| Controllers | apps/api/src/performance/review-items/performance-review-items.controller.ts |
| Services | apps/api/src/performance/review-items/performance-review-items.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Performance / Review Items' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, PerformanceReview, PerformanceReviewItem |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /performance/review-items |  |  |
| GET | /performance/review-items/:id | Permission.PERFORMANCE_READ | Get all performance review items |
| POST | /performance/review-items | Permission.PERFORMANCE_READ | Get performance review item by id |
| PATCH | /performance/review-items/:id | Permission.PERFORMANCE_CREATE | Create performance review item |
| DELETE | /performance/review-items/:id | Permission.PERFORMANCE_UPDATE | Update performance review item |

### PerformanceReviewsModule

Performance Reviews bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/performance/reviews/performance-reviews.module.ts |
| Controllers | apps/api/src/performance/reviews/performance-reviews.controller.ts |
| Services | apps/api/src/performance/reviews/performance-reviews.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Performance / Reviews' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Employee, PerformanceCycle, PerformanceReview |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /performance/reviews |  |  |
| GET | /performance/reviews/:id | Permission.PERFORMANCE_READ | Get all performance reviews |
| POST | /performance/reviews | Permission.PERFORMANCE_READ | Get performance review by id |
| PATCH | /performance/reviews/:id | Permission.PERFORMANCE_CREATE | Create performance review |
| DELETE | /performance/reviews/:id | Permission.PERFORMANCE_UPDATE | Update performance review |

### PerformanceOptimizationModule

Performance Optimization bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/performance-optimization/performance-optimization.module.ts |
| Controllers | apps/api/src/performance-optimization/performance-optimization.controller.ts |
| Services | apps/api/src/performance-optimization/performance-optimization.service.ts |
| Repositories | None detected |
| DTOs | 1 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Performance Optimization' |
| Permissions | 4 |
| Prisma Models/Tables | User, Permission, ObservabilityMetricSample, Document |
| Module Dependencies | platform, common, prisma |
| Request Context | Yes |
| Pagination | Yes |
| Audit | Yes |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /performance-optimization/queries/recommendations |  |  |
| GET | /performance-optimization/cache | Permission.PERFORMANCE_OPTIMIZATION_READ | Get query optimization recommendations |
| GET | /performance-optimization/cache/stats | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | List cache entries |
| GET | /performance-optimization/cache/:key | Permission.PERFORMANCE_OPTIMIZATION_READ | Get cache statistics |
| POST | /performance-optimization/cache | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | Read cache entry |
| POST | /performance-optimization/cache/invalidate | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | Set cache entry |
| POST | /performance-optimization/batch/plan | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | Invalidate cache entries |
| POST | /performance-optimization/lazy-loading/plan | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE | Create batch operation plan |
| GET | /performance-optimization/memory | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE | Create lazy-loading plan |
| GET | /performance-optimization/metrics | Permission.PERFORMANCE_OPTIMIZATION_READ | Get memory statistics |
| POST | /performance-optimization/metrics | Permission.PERFORMANCE_OPTIMIZATION_METRICS | List performance metrics |

### PermissionsModule

Permissions bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/permissions/permissions.module.ts |
| Controllers | apps/api/src/permissions/permissions.controller.ts |
| Services | apps/api/src/permissions/permissions.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Permissions' |
| Permissions | 4 |
| Prisma Models/Tables | Permission |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /permissions |  |  |
| GET | /permissions/:id | Permission.PERMISSIONS_READ | Get all permissions |
| POST | /permissions | Permission.PERMISSIONS_READ | Get permission by id |
| PATCH | /permissions/:id | Permission.PERMISSIONS_CREATE | Create permission |
| DELETE | /permissions/:id | Permission.PERMISSIONS_UPDATE | Update permission |

### PlatformModule

Platform bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/platform/platform.module.ts |
| Controllers |  |
| Services | apps/api/src/platform/audit/audit.service.ts, apps/api/src/platform/pagination/pagination.service.ts, apps/api/src/platform/request-context/request-context.service.ts, apps/api/src/platform/soft-delete/soft-delete.service.ts, apps/api/src/platform/status-transitions/status-transition.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | apps/api/src/platform/audit/audit.interceptor.ts, apps/api/src/platform/request-context/request-context.interceptor.ts |
| Filters | None detected |
| Decorators | apps/api/src/platform/audit/audit.decorator.ts, apps/api/src/platform/request-context/decorators/branch-context.decorator.ts, apps/api/src/platform/request-context/decorators/company-context.decorator.ts, apps/api/src/platform/request-context/decorators/current-user.decorator.ts, apps/api/src/platform/request-context/decorators/request-metadata.decorator.ts, apps/api/src/platform/request-context/decorators/tenant-context.decorator.ts |
| Middleware | apps/api/src/platform/request-context/request-context.middleware.ts |
| Swagger Tags | None detected |
| Permissions | 0 |
| Prisma Models/Tables | User, Company, Tenant, Branch, AuditLog |
| Module Dependencies | rxjs, prisma, express, node:async_hooks |
| Request Context | Yes |
| Pagination | Yes |
| Audit | Yes |
| Soft Delete | Yes |
| Status Transitions | Yes |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 0 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

### PluginsModule

Plugins bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/plugins/plugins.module.ts |
| Controllers | apps/api/src/plugins/plugins.controller.ts |
| Services | apps/api/src/plugins/plugins.service.ts |
| Repositories | None detected |
| DTOs | 4 |
| Entities | 4 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Plugins' |
| Permissions | 6 |
| Prisma Models/Tables | Permission, Company, PluginManifest, PluginRegistryEntry, PluginLifecycleEvent, PluginSandboxPolicy, PluginDependency, PluginCapabilityGrant, PluginMarketplacePackage, PluginMarketplaceVersion, PluginInstallation, PluginEventSubscription, PluginHook, PluginServiceBinding, PluginPermissionGrant, PluginConfiguration, PluginEvent |
| Module Dependencies | platform, common, business-rules, prisma |
| Request Context | Yes |
| Pagination | Yes |
| Audit | Yes |
| Soft Delete | Yes |
| Status Transitions | Yes |
| Business Rules | Yes |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | Yes |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 2 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /plugins/manifests |  |  |
| POST | /plugins/manifests | Permission.PLUGINS_READ | Get plugin manifests |
| PATCH | /plugins/manifests/:id | Permission.PLUGINS_CREATE | Create plugin manifest |
| DELETE | /plugins/manifests/:id | Permission.PLUGINS_UPDATE | Update plugin manifest |
| POST | /plugins/manifests/:id/restore | Permission.PLUGINS_DELETE | Soft delete plugin manifest |
| POST | /plugins/manifests/:id/load | Permission.PLUGINS_UPDATE | Restore plugin manifest |
| GET | /plugins/registry | Permission.PLUGINS_EXECUTE | Load plugin manifest into registry |
| POST | /plugins/registry/:id/enable | Permission.PLUGINS_READ | Get plugin registry entries |
| POST | /plugins/registry/:id/disable | Permission.PLUGINS_EXECUTE | Enable loaded plugin |
| POST | /plugins/registry/:id/unload | Permission.PLUGINS_EXECUTE | Disable loaded plugin |
| GET | /plugins/registry/:id/lifecycle-events | Permission.PLUGINS_EXECUTE | Unload plugin from registry |
| GET | /plugins/sdk/event-subscriptions | Permission.PLUGINS_READ | Get plugin lifecycle events |
| POST | /plugins/sdk/event-subscriptions | Permission.PLUGINS_READ | Get plugin event subscriptions |
| PATCH | /plugins/sdk/event-subscriptions/:id | Permission.PLUGINS_UPDATE | Create plugin event subscription |
| DELETE | /plugins/sdk/event-subscriptions/:id | Permission.PLUGINS_UPDATE | Update plugin event subscription |
| GET | /plugins/sdk/hooks | Permission.PLUGINS_DELETE | Soft delete plugin event subscription |
| POST | /plugins/sdk/hooks | Permission.PLUGINS_READ | Get plugin hooks |
| PATCH | /plugins/sdk/hooks/:id | Permission.PLUGINS_UPDATE | Create plugin hook |
| DELETE | /plugins/sdk/hooks/:id | Permission.PLUGINS_UPDATE | Update plugin hook |
| GET | /plugins/sdk/service-bindings | Permission.PLUGINS_DELETE | Soft delete plugin hook |
| POST | /plugins/sdk/service-bindings | Permission.PLUGINS_READ | Get plugin service bindings |
| PATCH | /plugins/sdk/service-bindings/:id | Permission.PLUGINS_UPDATE | Create plugin service binding |
| DELETE | /plugins/sdk/service-bindings/:id | Permission.PLUGINS_UPDATE | Update plugin service binding |
| GET | /plugins/sdk/permission-grants | Permission.PLUGINS_DELETE | Soft delete plugin service binding |
| POST | /plugins/sdk/permission-grants | Permission.PLUGINS_READ | Get plugin permission grants |
| DELETE | /plugins/sdk/permission-grants/:id | Permission.PLUGINS_GOVERN | Grant permission to plugin |
| GET | /plugins/sdk/configurations | Permission.PLUGINS_GOVERN | Revoke plugin permission grant |
| POST | /plugins/sdk/configurations | Permission.PLUGINS_READ | Get plugin configurations |
| PATCH | /plugins/sdk/configurations/:id | Permission.PLUGINS_UPDATE | Create plugin configuration |
| DELETE | /plugins/sdk/configurations/:id | Permission.PLUGINS_UPDATE | Update plugin configuration |
| POST | /plugins/sdk/events | Permission.PLUGINS_DELETE | Soft delete plugin configuration |
| GET | /plugins/sdk/events | Permission.PLUGINS_EXECUTE | Emit plugin SDK event |
| GET | /plugins/marketplace/packages | Permission.PLUGINS_READ | Get plugin SDK event history |
| POST | /plugins/marketplace/packages | Permission.PLUGINS_READ | Get marketplace packages |
| PATCH | /plugins/marketplace/packages/:id | Permission.PLUGINS_CREATE | Create marketplace package |
| GET | /plugins/marketplace/versions | Permission.PLUGINS_UPDATE | Update marketplace package |
| POST | /plugins/marketplace/versions | Permission.PLUGINS_READ | Get marketplace package versions |
| PATCH | /plugins/marketplace/versions/:id | Permission.PLUGINS_CREATE | Create marketplace package version |
| POST | /plugins/marketplace/versions/:id/install | Permission.PLUGINS_UPDATE | Update marketplace package version |
| GET | /plugins/marketplace/installations | Permission.PLUGINS_EXECUTE | Install marketplace package version |
| POST | /plugins/marketplace/installations/:id/enable | Permission.PLUGINS_READ | Get plugin installations |
| POST | /plugins/marketplace/installations/:id/disable | Permission.PLUGINS_EXECUTE | Enable plugin installation |
| POST | /plugins/marketplace/installations/:id/uninstall | Permission.PLUGINS_EXECUTE | Disable plugin installation |
| POST | /plugins/marketplace/installations/:id/upgrade | Permission.PLUGINS_DELETE | Uninstall plugin installation |
| GET | /plugins/isolation/sandbox-policies | Permission.PLUGINS_EXECUTE | Upgrade plugin installation |
| POST | /plugins/isolation/sandbox-policies | Permission.PLUGINS_READ | Get plugin sandbox policies |
| GET | /plugins/isolation/dependencies | Permission.PLUGINS_GOVERN | Create or update plugin sandbox policy |
| POST | /plugins/isolation/dependencies | Permission.PLUGINS_READ | Get plugin dependencies |
| PATCH | /plugins/isolation/dependencies/:id | Permission.PLUGINS_UPDATE | Create plugin dependency |
| POST | /plugins/isolation/registry/:id/validate-dependencies | Permission.PLUGINS_UPDATE | Update plugin dependency |
| GET | /plugins/isolation/capability-grants | Permission.PLUGINS_EXECUTE | Validate plugin dependencies |
| POST | /plugins/isolation/capability-grants | Permission.PLUGINS_READ | Get plugin capability grants |
| DELETE | /plugins/isolation/capability-grants/:id | Permission.PLUGINS_GOVERN | Grant plugin capability |
| POST | /plugins/isolation/registry/:id/validate | Permission.PLUGINS_GOVERN | Revoke plugin capability |
| POST | /plugins/management/upload | Permission.PLUGINS_EXECUTE | Validate plugin isolation posture |
| GET | /plugins/management/registry/:id/health | Permission.PLUGINS_CREATE | Upload plugin manifest package metadata |
| GET | /plugins/management/metrics | Permission.PLUGINS_READ | Get plugin health |

### PrismaModule

Prisma bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/prisma/prisma.module.ts |
| Controllers |  |
| Services | apps/api/src/prisma/prisma.service.ts |
| Repositories | None detected |
| DTOs | 0 |
| Entities | 0 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | None detected |
| Permissions | 0 |
| Prisma Models/Tables | None inferred |
| Module Dependencies | None detected |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 0 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

### PublicApiModule

Public Api bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/public-api/public-api.module.ts |
| Controllers | apps/api/src/public-api/public-api.controller.ts |
| Services | apps/api/src/public-api/public-api.service.ts |
| Repositories | None detected |
| DTOs | 5 |
| Entities | 5 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Public API Platform' |
| Permissions | 6 |
| Prisma Models/Tables | Permission, Tenant, PublicApiGroup, PublicApiRegistry, PublicApiVersion, PublicApiApplication, PublicApiKey, PublicApiRateLimitPolicy, PublicApiUsageCounter, PublicApiRequestLog, PublicApiSignatureNonce |
| Module Dependencies | platform, common, prisma |
| Request Context | Yes |
| Pagination | Yes |
| Audit | Yes |
| Soft Delete | Yes |
| Status Transitions | Yes |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | Yes |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 1 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /public-api/registry/groups |  |  |
| POST | /public-api/registry/groups | Permission.PUBLIC_API_READ | Get public API groups |
| PATCH | /public-api/registry/groups/:id | Permission.PUBLIC_API_CREATE | Create public API group |
| DELETE | /public-api/registry/groups/:id | Permission.PUBLIC_API_UPDATE | Update public API group |
| GET | /public-api/registry/apis | Permission.PUBLIC_API_DELETE | Soft delete public API group |
| POST | /public-api/registry/apis | Permission.PUBLIC_API_READ | Get public APIs |
| PATCH | /public-api/registry/apis/:id | Permission.PUBLIC_API_CREATE | Create public API metadata |
| DELETE | /public-api/registry/apis/:id | Permission.PUBLIC_API_UPDATE | Update public API metadata |
| GET | /public-api/registry/versions | Permission.PUBLIC_API_DELETE | Soft delete public API metadata |
| POST | /public-api/registry/versions | Permission.PUBLIC_API_READ | Get public API versions |
| PATCH | /public-api/registry/versions/:id | Permission.PUBLIC_API_CREATE | Create public API version |
| GET | /public-api/keys | Permission.PUBLIC_API_UPDATE | Update public API version |
| POST | /public-api/keys | Permission.PUBLIC_API_KEYS | Get public API keys |
| POST | /public-api/keys/:id/rotate | Permission.PUBLIC_API_KEYS | Create public API key |
| POST | /public-api/keys/:id/revoke | Permission.PUBLIC_API_KEYS | Rotate public API key |
| GET | /public-api/rate-limits/policies | Permission.PUBLIC_API_KEYS | Revoke public API key |
| POST | /public-api/rate-limits/policies | Permission.PUBLIC_API_ADMIN | Get public API rate limit policies |
| PATCH | /public-api/rate-limits/policies/:id | Permission.PUBLIC_API_ADMIN | Create public API rate limit policy |
| DELETE | /public-api/rate-limits/policies/:id | Permission.PUBLIC_API_ADMIN | Update public API rate limit policy |
| POST | /public-api/rate-limits/evaluate | Permission.PUBLIC_API_ADMIN | Soft delete public API rate limit policy |
| GET | /public-api/rate-limits/usage | Permission.PUBLIC_API_ADMIN | Evaluate and record public API rate limit usage |
| GET | /public-api/developer/applications | Permission.PUBLIC_API_READ | Get public API usage counters |
| POST | /public-api/developer/applications | Permission.PUBLIC_API_READ | Get developer applications |
| PATCH | /public-api/developer/applications/:id | Permission.PUBLIC_API_CREATE | Register developer application |
| DELETE | /public-api/developer/applications/:id | Permission.PUBLIC_API_UPDATE | Update developer application |
| POST | /public-api/developer/applications/:id/keys | Permission.PUBLIC_API_DELETE | Soft delete developer application |
| POST | /public-api/developer/applications/:id/keys/:keyId/revoke | Permission.PUBLIC_API_KEYS | Generate developer application key |
| GET | /public-api/developer/applications/:id/usage | Permission.PUBLIC_API_KEYS | Revoke developer application key |
| POST | /public-api/security/verify-signature | Permission.PUBLIC_API_READ | Get developer application usage statistics |
| GET | /public-api/security/request-logs | Permission.PUBLIC_API_ADMIN | Verify signed public API request |
| POST | /public-api/security/request-logs | Permission.PUBLIC_API_ADMIN | Get public API request logs |

### ApplicantsModule

Applicants bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/recruitment/applicants/applicants.module.ts |
| Controllers | apps/api/src/recruitment/applicants/applicants.controller.ts |
| Services | apps/api/src/recruitment/applicants/applicants.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Recruitment / Applicants' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Applicant |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /recruitment/applicants |  |  |
| GET | /recruitment/applicants/:id | Permission.RECRUITMENT_READ | Get all records |
| POST | /recruitment/applicants | Permission.RECRUITMENT_READ | Get record by id |
| PATCH | /recruitment/applicants/:id | Permission.RECRUITMENT_CREATE | Create record |
| DELETE | /recruitment/applicants/:id | Permission.RECRUITMENT_UPDATE | Update record |

### ApplicationsModule

Applications bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/recruitment/applications/applications.module.ts |
| Controllers | apps/api/src/recruitment/applications/applications.controller.ts |
| Services | apps/api/src/recruitment/applications/applications.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Recruitment / Applications' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Employee, Vacancy, Applicant, JobApplication |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /recruitment/applications |  |  |
| GET | /recruitment/applications/:id | Permission.RECRUITMENT_READ | Get all applications |
| POST | /recruitment/applications | Permission.RECRUITMENT_READ | Get application by id |
| PATCH | /recruitment/applications/:id | Permission.RECRUITMENT_CREATE | Create application |
| DELETE | /recruitment/applications/:id | Permission.RECRUITMENT_UPDATE | Update application |

### RecruitmentDashboardModule

Recruitment Dashboard bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/recruitment/dashboard/recruitment-dashboard.module.ts |
| Controllers | apps/api/src/recruitment/dashboard/recruitment-dashboard.controller.ts |
| Services | apps/api/src/recruitment/dashboard/recruitment-dashboard.service.ts |
| Repositories | None detected |
| DTOs | 0 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Recruitment / Dashboard' |
| Permissions | 1 |
| Prisma Models/Tables | Permission, JobPosition, Vacancy, Applicant, JobApplication, Interview, OfferLetter |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 0 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /recruitment/dashboard/summary |  |  |

### HiringModule

Hiring bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/recruitment/hiring/hiring.module.ts |
| Controllers | apps/api/src/recruitment/hiring/hiring.controller.ts |
| Services | apps/api/src/recruitment/hiring/hiring.service.ts |
| Repositories | None detected |
| DTOs | 1 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Recruitment / Hiring' |
| Permissions | 1 |
| Prisma Models/Tables | User, Role, Permission, Company, Employee, PayrollProfile, Vacancy, Applicant, JobApplication, AuditLog |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | Yes |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| POST | /recruitment/hiring/hire |  |  |

### InterviewEvaluationsModule

Interview Evaluations bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/recruitment/interview-evaluations/interview-evaluations.module.ts |
| Controllers | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts |
| Services | apps/api/src/recruitment/interview-evaluations/interview-evaluations.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Recruitment / Interview Evaluations' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Employee, Interview, InterviewEvaluation |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /recruitment/interview-evaluations |  |  |
| GET | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_READ | Get all interview evaluations |
| POST | /recruitment/interview-evaluations | Permission.RECRUITMENT_READ | Get interview evaluation by id |
| PATCH | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_CREATE | Create interview evaluation |
| DELETE | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_UPDATE | Update interview evaluation |

### InterviewsModule

Interviews bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/recruitment/interviews/interviews.module.ts |
| Controllers | apps/api/src/recruitment/interviews/interviews.controller.ts |
| Services | apps/api/src/recruitment/interviews/interviews.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Recruitment / Interviews' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Employee, JobApplication, Interview |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /recruitment/interviews |  |  |
| GET | /recruitment/interviews/:id | Permission.RECRUITMENT_READ | Get all interviews |
| POST | /recruitment/interviews | Permission.RECRUITMENT_READ | Get interview by id |
| PATCH | /recruitment/interviews/:id | Permission.RECRUITMENT_CREATE | Create interview |
| DELETE | /recruitment/interviews/:id | Permission.RECRUITMENT_UPDATE | Update interview |

### JobPositionsModule

Job Positions bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/recruitment/job-positions/job-positions.module.ts |
| Controllers | apps/api/src/recruitment/job-positions/job-positions.controller.ts |
| Services | apps/api/src/recruitment/job-positions/job-positions.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Recruitment / Job Positions' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, Position, JobPosition |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /recruitment/job-positions |  |  |
| GET | /recruitment/job-positions/:id | Permission.RECRUITMENT_READ | Get all job positions |
| POST | /recruitment/job-positions | Permission.RECRUITMENT_READ | Get job position by id |
| PATCH | /recruitment/job-positions/:id | Permission.RECRUITMENT_CREATE | Create job position |
| DELETE | /recruitment/job-positions/:id | Permission.RECRUITMENT_UPDATE | Update job position |

### OfferLettersModule

Offer Letters bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/recruitment/offer-letters/offer-letters.module.ts |
| Controllers | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts |
| Services | apps/api/src/recruitment/offer-letters/offer-letters.service.ts |
| Repositories | None detected |
| DTOs | 3 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Recruitment / Offer Letters' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, JobApplication, OfferLetter |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /recruitment/offer-letters |  |  |
| GET | /recruitment/offer-letters/:id | Permission.RECRUITMENT_READ | Get all offer letters |
| POST | /recruitment/offer-letters | Permission.RECRUITMENT_READ | Get offer letter by id |
| PATCH | /recruitment/offer-letters/:id | Permission.RECRUITMENT_CREATE | Create offer letter |
| POST | /recruitment/offer-letters/:id/send | Permission.RECRUITMENT_UPDATE | Update offer letter |
| POST | /recruitment/offer-letters/:id/accept | Permission.RECRUITMENT_UPDATE | Send offer letter |
| POST | /recruitment/offer-letters/:id/reject | Permission.RECRUITMENT_UPDATE | Accept offer letter |
| DELETE | /recruitment/offer-letters/:id | Permission.RECRUITMENT_UPDATE | Reject offer letter |

### RecruitmentModule

Recruitment bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/recruitment/recruitment.module.ts |
| Controllers | apps/api/src/recruitment/applicants/applicants.controller.ts, apps/api/src/recruitment/applications/applications.controller.ts, apps/api/src/recruitment/dashboard/recruitment-dashboard.controller.ts, apps/api/src/recruitment/hiring/hiring.controller.ts, apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts, apps/api/src/recruitment/interviews/interviews.controller.ts, apps/api/src/recruitment/job-positions/job-positions.controller.ts, apps/api/src/recruitment/offer-letters/offer-letters.controller.ts, apps/api/src/recruitment/vacancies/vacancies.controller.ts |
| Services | apps/api/src/recruitment/applicants/applicants.service.ts, apps/api/src/recruitment/applications/applications.service.ts, apps/api/src/recruitment/dashboard/recruitment-dashboard.service.ts, apps/api/src/recruitment/hiring/hiring.service.ts, apps/api/src/recruitment/interview-evaluations/interview-evaluations.service.ts, apps/api/src/recruitment/interviews/interviews.service.ts, apps/api/src/recruitment/job-positions/job-positions.service.ts, apps/api/src/recruitment/offer-letters/offer-letters.service.ts, apps/api/src/recruitment/vacancies/vacancies.service.ts |
| Repositories | None detected |
| DTOs | 16 |
| Entities | 9 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Recruitment / Applicants', 'Recruitment / Applications', 'Recruitment / Dashboard', 'Recruitment / Hiring', 'Recruitment / Interview Evaluations', 'Recruitment / Interviews', 'Recruitment / Job Positions', 'Recruitment / Offer Letters', 'Recruitment / Vacancies' |
| Permissions | 30 |
| Prisma Models/Tables | User, Role, Permission, Company, Position, Employee, PayrollProfile, JobPosition, Vacancy, Applicant, JobApplication, Interview, InterviewEvaluation, OfferLetter, AuditLog |
| Module Dependencies | common, prisma, @prisma/client/runtime/library |
| Request Context | No |
| Pagination | No |
| Audit | Yes |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 8 |
| Security Notes | 0 |
| Technical Debt | 7 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /recruitment/applicants |  |  |
| GET | /recruitment/applicants/:id | Permission.RECRUITMENT_READ | Get all records |
| POST | /recruitment/applicants | Permission.RECRUITMENT_READ | Get record by id |
| PATCH | /recruitment/applicants/:id | Permission.RECRUITMENT_CREATE | Create record |
| DELETE | /recruitment/applicants/:id | Permission.RECRUITMENT_UPDATE | Update record |
| GET | /recruitment/applications |  |  |
| GET | /recruitment/applications/:id | Permission.RECRUITMENT_READ | Get all applications |
| POST | /recruitment/applications | Permission.RECRUITMENT_READ | Get application by id |
| PATCH | /recruitment/applications/:id | Permission.RECRUITMENT_CREATE | Create application |
| DELETE | /recruitment/applications/:id | Permission.RECRUITMENT_UPDATE | Update application |
| GET | /recruitment/dashboard/summary |  |  |
| POST | /recruitment/hiring/hire |  |  |
| GET | /recruitment/interview-evaluations |  |  |
| GET | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_READ | Get all interview evaluations |
| POST | /recruitment/interview-evaluations | Permission.RECRUITMENT_READ | Get interview evaluation by id |
| PATCH | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_CREATE | Create interview evaluation |
| DELETE | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_UPDATE | Update interview evaluation |
| GET | /recruitment/interviews |  |  |
| GET | /recruitment/interviews/:id | Permission.RECRUITMENT_READ | Get all interviews |
| POST | /recruitment/interviews | Permission.RECRUITMENT_READ | Get interview by id |
| PATCH | /recruitment/interviews/:id | Permission.RECRUITMENT_CREATE | Create interview |
| DELETE | /recruitment/interviews/:id | Permission.RECRUITMENT_UPDATE | Update interview |
| GET | /recruitment/job-positions |  |  |
| GET | /recruitment/job-positions/:id | Permission.RECRUITMENT_READ | Get all job positions |
| POST | /recruitment/job-positions | Permission.RECRUITMENT_READ | Get job position by id |
| PATCH | /recruitment/job-positions/:id | Permission.RECRUITMENT_CREATE | Create job position |
| DELETE | /recruitment/job-positions/:id | Permission.RECRUITMENT_UPDATE | Update job position |
| GET | /recruitment/offer-letters |  |  |
| GET | /recruitment/offer-letters/:id | Permission.RECRUITMENT_READ | Get all offer letters |
| POST | /recruitment/offer-letters | Permission.RECRUITMENT_READ | Get offer letter by id |
| PATCH | /recruitment/offer-letters/:id | Permission.RECRUITMENT_CREATE | Create offer letter |
| POST | /recruitment/offer-letters/:id/send | Permission.RECRUITMENT_UPDATE | Update offer letter |
| POST | /recruitment/offer-letters/:id/accept | Permission.RECRUITMENT_UPDATE | Send offer letter |
| POST | /recruitment/offer-letters/:id/reject | Permission.RECRUITMENT_UPDATE | Accept offer letter |
| DELETE | /recruitment/offer-letters/:id | Permission.RECRUITMENT_UPDATE | Reject offer letter |
| GET | /recruitment/vacancies |  |  |
| GET | /recruitment/vacancies/:id | Permission.RECRUITMENT_READ | Get all records |
| POST | /recruitment/vacancies | Permission.RECRUITMENT_READ | Get record by id |
| PATCH | /recruitment/vacancies/:id | Permission.RECRUITMENT_CREATE | Create record |
| DELETE | /recruitment/vacancies/:id | Permission.RECRUITMENT_UPDATE | Update record |

### VacanciesModule

Vacancies bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/recruitment/vacancies/vacancies.module.ts |
| Controllers | apps/api/src/recruitment/vacancies/vacancies.controller.ts |
| Services | apps/api/src/recruitment/vacancies/vacancies.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Recruitment / Vacancies' |
| Permissions | 4 |
| Prisma Models/Tables | Permission, Company, Position, JobPosition, Vacancy |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /recruitment/vacancies |  |  |
| GET | /recruitment/vacancies/:id | Permission.RECRUITMENT_READ | Get all records |
| POST | /recruitment/vacancies | Permission.RECRUITMENT_READ | Get record by id |
| PATCH | /recruitment/vacancies/:id | Permission.RECRUITMENT_CREATE | Create record |
| DELETE | /recruitment/vacancies/:id | Permission.RECRUITMENT_UPDATE | Update record |

### ReportingDashboardsModule

Reporting Dashboards bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/reporting/dashboards/reporting-dashboards.module.ts |
| Controllers | apps/api/src/reporting/dashboards/reporting-dashboards.controller.ts |
| Services | apps/api/src/reporting/dashboards/reporting-dashboards.service.ts |
| Repositories | None detected |
| DTOs | 0 |
| Entities | 0 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Reporting / Dashboards' |
| Permissions | 1 |
| Prisma Models/Tables | Permission, Account, JournalEntry, Employee, AttendanceRecord, LeaveRequest, PayrollRun, Payslip, Vacancy, Applicant, WorkflowRequest |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | Yes |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 0 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /reporting/dashboards/executive |  |  |
| GET | /reporting/dashboards/hr | Permission.REPORTING_READ | Get executive dashboard |
| GET | /reporting/dashboards/payroll | Permission.REPORTING_READ | Get HR dashboard |
| GET | /reporting/dashboards/accounting | Permission.REPORTING_READ | Get payroll dashboard |

### ReportDefinitionsModule

Report Definitions bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/reporting/definitions/report-definitions.module.ts |
| Controllers | apps/api/src/reporting/definitions/report-definitions.controller.ts |
| Services | apps/api/src/reporting/definitions/report-definitions.service.ts |
| Repositories | None detected |
| DTOs | 5 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Reporting / Definitions' |
| Permissions | 3 |
| Prisma Models/Tables | Permission, Company, ReportCategory, ReportDefinition, ReportParameter, Employee |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /reporting/categories |  |  |
| POST | /reporting/categories | Permission.REPORTING_READ | Get report categories |
| PATCH | /reporting/categories/:id | Permission.REPORTING_CREATE | Create report category |
| GET | /reporting/definitions | Permission.REPORTING_UPDATE | Update report category |
| GET | /reporting/definitions/:id | Permission.REPORTING_READ | Get report definitions |
| POST | /reporting/definitions | Permission.REPORTING_READ | Get report definition by id |
| PATCH | /reporting/definitions/:id | Permission.REPORTING_CREATE | Create report definition |

### ReportExecutionModule

Report Execution bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/reporting/execution/report-execution.module.ts |
| Controllers | apps/api/src/reporting/execution/report-execution.controller.ts |
| Services | apps/api/src/reporting/execution/report-execution.service.ts |
| Repositories | None detected |
| DTOs | 1 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Reporting / Execution' |
| Permissions | 2 |
| Prisma Models/Tables | User, Permission, Company, ReportDefinition, ReportExecution, Employee |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 1 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /reporting/executions |  |  |
| GET | /reporting/executions/:id | Permission.REPORTING_READ | Get report execution history |
| POST | /reporting/executions | Permission.REPORTING_READ | Get report execution by id |

### ReportExportModule

Report Export bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/reporting/exports/report-export.module.ts |
| Controllers | apps/api/src/reporting/exports/report-export.controller.ts |
| Services | apps/api/src/reporting/exports/report-export.service.ts |
| Repositories | None detected |
| DTOs | 1 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Reporting / Exports' |
| Permissions | 1 |
| Prisma Models/Tables | Permission, Employee, Document |
| Module Dependencies | common |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 0 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| POST | /reporting/exports |  |  |

### FinanceReportsModule

Finance Reports bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/reporting/finance/finance-reports.module.ts |
| Controllers | apps/api/src/reporting/finance/finance-reports.controller.ts |
| Services | apps/api/src/reporting/finance/finance-reports.service.ts |
| Repositories | None detected |
| DTOs | 0 |
| Entities | 0 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Reporting / Payroll & Accounting' |
| Permissions | 1 |
| Prisma Models/Tables | Permission, Account, JournalEntry, JournalEntryLine, CostCenter, PayrollRun, Payslip |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 2 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /reporting/finance/payroll-summary |  |  |
| GET | /reporting/finance/payslip-summary | Permission.REPORTING_READ | Get payroll summary report |
| GET | /reporting/finance/trial-balance | Permission.REPORTING_READ | Get payslip summary report |
| GET | /reporting/finance/general-ledger | Permission.REPORTING_READ | Get accounting trial balance report |
| GET | /reporting/finance/cost-centers | Permission.REPORTING_READ | Get accounting general ledger report |

### HrReportsModule

Hr Reports bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/reporting/hr/hr-reports.module.ts |
| Controllers | apps/api/src/reporting/hr/hr-reports.controller.ts |
| Services | apps/api/src/reporting/hr/hr-reports.service.ts |
| Repositories | None detected |
| DTOs | 0 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Reporting / HR' |
| Permissions | 1 |
| Prisma Models/Tables | Permission, Department, Employee, AttendanceRecord, LeaveType, LeaveRequest, Vacancy, Applicant, JobApplication, Interview |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 0 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /reporting/hr/employees |  |  |
| GET | /reporting/hr/attendance | Permission.REPORTING_READ | Get employee report |
| GET | /reporting/hr/leave | Permission.REPORTING_READ | Get attendance report |
| GET | /reporting/hr/recruitment | Permission.REPORTING_READ | Get leave report |

### ReportingModule

Reporting bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/reporting/reporting.module.ts |
| Controllers | apps/api/src/reporting/dashboards/reporting-dashboards.controller.ts, apps/api/src/reporting/definitions/report-definitions.controller.ts, apps/api/src/reporting/execution/report-execution.controller.ts, apps/api/src/reporting/exports/report-export.controller.ts, apps/api/src/reporting/finance/finance-reports.controller.ts, apps/api/src/reporting/hr/hr-reports.controller.ts |
| Services | apps/api/src/reporting/dashboards/reporting-dashboards.service.ts, apps/api/src/reporting/definitions/report-definitions.service.ts, apps/api/src/reporting/execution/report-execution.service.ts, apps/api/src/reporting/exports/report-export.service.ts, apps/api/src/reporting/finance/finance-reports.service.ts, apps/api/src/reporting/hr/hr-reports.service.ts |
| Repositories | None detected |
| DTOs | 7 |
| Entities | 4 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Reporting / Dashboards', 'Reporting / Definitions', 'Reporting / Execution', 'Reporting / Exports', 'Reporting / Payroll & Accounting', 'Reporting / HR' |
| Permissions | 9 |
| Prisma Models/Tables | User, Permission, Company, Account, JournalEntry, JournalEntryLine, ReportCategory, ReportDefinition, ReportParameter, ReportExecution, Department, CostCenter, Employee, AttendanceRecord, LeaveType, LeaveRequest, PayrollRun, Payslip, Vacancy, Applicant, JobApplication, Interview, Document, WorkflowRequest |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | Yes |
| Notifications | No |
| AI | Yes |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 4 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /reporting/dashboards/executive |  |  |
| GET | /reporting/dashboards/hr | Permission.REPORTING_READ | Get executive dashboard |
| GET | /reporting/dashboards/payroll | Permission.REPORTING_READ | Get HR dashboard |
| GET | /reporting/dashboards/accounting | Permission.REPORTING_READ | Get payroll dashboard |
| GET | /reporting/categories |  |  |
| POST | /reporting/categories | Permission.REPORTING_READ | Get report categories |
| PATCH | /reporting/categories/:id | Permission.REPORTING_CREATE | Create report category |
| GET | /reporting/definitions | Permission.REPORTING_UPDATE | Update report category |
| GET | /reporting/definitions/:id | Permission.REPORTING_READ | Get report definitions |
| POST | /reporting/definitions | Permission.REPORTING_READ | Get report definition by id |
| PATCH | /reporting/definitions/:id | Permission.REPORTING_CREATE | Create report definition |
| GET | /reporting/executions |  |  |
| GET | /reporting/executions/:id | Permission.REPORTING_READ | Get report execution history |
| POST | /reporting/executions | Permission.REPORTING_READ | Get report execution by id |
| POST | /reporting/exports |  |  |
| GET | /reporting/finance/payroll-summary |  |  |
| GET | /reporting/finance/payslip-summary | Permission.REPORTING_READ | Get payroll summary report |
| GET | /reporting/finance/trial-balance | Permission.REPORTING_READ | Get payslip summary report |
| GET | /reporting/finance/general-ledger | Permission.REPORTING_READ | Get accounting trial balance report |
| GET | /reporting/finance/cost-centers | Permission.REPORTING_READ | Get accounting general ledger report |
| GET | /reporting/hr/employees |  |  |
| GET | /reporting/hr/attendance | Permission.REPORTING_READ | Get employee report |
| GET | /reporting/hr/leave | Permission.REPORTING_READ | Get attendance report |
| GET | /reporting/hr/recruitment | Permission.REPORTING_READ | Get leave report |

### RolesModule

Roles bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/roles/roles.module.ts |
| Controllers | apps/api/src/roles/roles.controller.ts |
| Services | apps/api/src/roles/roles.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Roles' |
| Permissions | 4 |
| Prisma Models/Tables | Role, Permission |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 2 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /roles |  |  |
| GET | /roles/:id | Permission.ROLES_READ | Get all roles |
| POST | /roles | Permission.ROLES_READ | Get role by id |
| PATCH | /roles/:id | Permission.ROLES_CREATE | Create role |
| DELETE | /roles/:id | Permission.ROLES_UPDATE | Update role |

### SchedulerModule

Scheduler bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/scheduler/scheduler.module.ts |
| Controllers | apps/api/src/scheduler/scheduler.controller.ts |
| Services | apps/api/src/scheduler/scheduler.service.ts |
| Repositories | None detected |
| DTOs | 3 |
| Entities | 3 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Scheduler' |
| Permissions | 6 |
| Prisma Models/Tables | Permission, Tenant, SchedulerCronRegistry, SchedulerScheduledJob, SchedulerJobHistory, SchedulerFailureRecovery |
| Module Dependencies | platform, common, prisma |
| Request Context | Yes |
| Pagination | Yes |
| Audit | Yes |
| Soft Delete | Yes |
| Status Transitions | Yes |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | Yes |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 2 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /scheduler/crons |  |  |
| POST | /scheduler/crons | Permission.SCHEDULER_READ | Get cron registry entries |
| PATCH | /scheduler/crons/:id | Permission.SCHEDULER_CREATE | Create cron registry entry |
| DELETE | /scheduler/crons/:id | Permission.SCHEDULER_UPDATE | Update cron registry entry |
| GET | /scheduler/jobs | Permission.SCHEDULER_DELETE | Soft delete cron registry entry |
| POST | /scheduler/jobs | Permission.SCHEDULER_READ | Get scheduled jobs |
| PATCH | /scheduler/jobs/:id | Permission.SCHEDULER_CREATE | Schedule background job |
| POST | /scheduler/jobs/:id/cancel | Permission.SCHEDULER_UPDATE | Update scheduled job |
| GET | /scheduler/history | Permission.SCHEDULER_EXECUTE | Cancel scheduled job |
| POST | /scheduler/queue/claim | Permission.SCHEDULER_READ | Get scheduler job history |
| POST | /scheduler/jobs/:id/complete | Permission.SCHEDULER_EXECUTE | Claim due scheduler jobs for a worker |
| POST | /scheduler/jobs/:id/fail | Permission.SCHEDULER_EXECUTE | Complete a running scheduler job |
| POST | /scheduler/jobs/:id/retry | Permission.SCHEDULER_EXECUTE | Fail a running scheduler job and apply retry policy |
| POST | /scheduler/jobs/:id/recover | Permission.SCHEDULER_EXECUTE | Retry a failed or dead-letter scheduler job |
| GET | /scheduler/recoveries | Permission.SCHEDULER_EXECUTE | Apply failure recovery action to a scheduler job |
| GET | /scheduler/monitoring/dashboard | Permission.SCHEDULER_MONITOR | Get scheduler failure recovery records |
| GET | /scheduler/monitoring/queues | Permission.SCHEDULER_MONITOR | Get scheduler dashboard metrics |
| GET | /scheduler/monitoring/failures | Permission.SCHEDULER_MONITOR | Get scheduler queue status |
| GET | /scheduler/monitoring/system-status | Permission.SCHEDULER_MONITOR | Get scheduler failure report |

### SearchModule

Search bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/search/search.module.ts |
| Controllers | apps/api/src/search/search.controller.ts |
| Services | apps/api/src/search/search.service.ts |
| Repositories | None detected |
| DTOs | 1 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Enterprise Search' |
| Permissions | 6 |
| Prisma Models/Tables | Permission, Company, Tenant, SearchIndex, SearchQueryLog, Branch, Department, Employee, PayrollRun, PayrollItem, Document, WorkflowDefinition, WorkflowRequest |
| Module Dependencies | platform, common, prisma |
| Request Context | Yes |
| Pagination | Yes |
| Audit | Yes |
| Soft Delete | Yes |
| Status Transitions | No |
| Business Rules | No |
| Workflow | Yes |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | Yes |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 3 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /search/global |  |  |
| GET | /search/employees | Permission.SEARCH_GLOBAL | Run global enterprise search |
| GET | /search/payroll | Permission.SEARCH_EMPLOYEES | Search employees |
| GET | /search/documents | Permission.SEARCH_PAYROLL | Search payroll records |
| GET | /search/workflows | Permission.SEARCH_DOCUMENTS | Search documents |
| GET | /search/index | Permission.SEARCH_WORKFLOWS | Search workflows |
| POST | /search/index | Permission.SEARCH_ADMIN | List search index records |
| POST | /search/index/rebuild | Permission.SEARCH_ADMIN | Create or update search index record |
| GET | /search/audit | Permission.SEARCH_ADMIN | Rebuild search index from supported domains |

### TenantsModule

Tenants bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/tenants/tenants.module.ts |
| Controllers | apps/api/src/tenants/tenants.controller.ts |
| Services | apps/api/src/tenants/tenant-administration.service.ts, apps/api/src/tenants/tenant-configuration.service.ts, apps/api/src/tenants/tenant-isolation.service.ts, apps/api/src/tenants/tenant-security.service.ts, apps/api/src/tenants/tenants.service.ts |
| Repositories | None detected |
| DTOs | 5 |
| Entities | 5 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Tenants' |
| Permissions | 6 |
| Prisma Models/Tables | Permission, Company, Tenant, TenantDomain, TenantSetting, TenantFeatureFlag, TenantLocalization, TenantBranding, TenantUsageLimit, TenantProvisioningEvent, TenantPermissionPolicy, TenantAuditEvent, Branch |
| Module Dependencies | platform, prisma, common |
| Request Context | Yes |
| Pagination | Yes |
| Audit | Yes |
| Soft Delete | Yes |
| Status Transitions | Yes |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | Yes |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | Yes |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 4 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /tenants |  |  |
| POST | /tenants | Permission.TENANTS_READ | Get tenant registry |
| PATCH | /tenants/:id | Permission.TENANTS_CREATE | Create tenant |
| DELETE | /tenants/:id | Permission.TENANTS_UPDATE | Update tenant |
| POST | /tenants/:id/restore | Permission.TENANTS_DELETE | Soft delete tenant |
| GET | /tenants/domains | Permission.TENANTS_UPDATE | Restore tenant |
| POST | /tenants/domains | Permission.TENANTS_READ | Get tenant domains |
| POST | /tenants/resolve | Permission.TENANTS_UPDATE | Create tenant domain |
| GET | /tenants/isolation/companies | Permission.TENANTS_READ | Resolve tenant from context, code, or domain |
| POST | /tenants/isolation/companies/:companyId/assign | Permission.TENANTS_READ | Get tenant-scoped companies |
| GET | /tenants/isolation/branches | Permission.TENANTS_UPDATE | Assign company to tenant |
| POST | /tenants/isolation/branches/:branchId/assign | Permission.TENANTS_READ | Get tenant-scoped branches |
| POST | /tenants/isolation/validate | Permission.TENANTS_UPDATE | Assign branch to tenant |
| GET | /tenants/configuration/settings | Permission.TENANTS_SECURITY | Validate tenant data isolation scope |
| POST | /tenants/configuration/settings | Permission.TENANTS_READ | Get tenant settings |
| PATCH | /tenants/configuration/settings/:id | Permission.TENANTS_UPDATE | Create tenant setting |
| DELETE | /tenants/configuration/settings/:id | Permission.TENANTS_UPDATE | Update tenant setting |
| GET | /tenants/configuration/feature-flags | Permission.TENANTS_DELETE | Soft delete tenant setting |
| POST | /tenants/configuration/feature-flags | Permission.TENANTS_READ | Get tenant feature flags |
| PATCH | /tenants/configuration/feature-flags/:id | Permission.TENANTS_UPDATE | Create tenant feature flag |
| DELETE | /tenants/configuration/feature-flags/:id | Permission.TENANTS_UPDATE | Update tenant feature flag |
| GET | /tenants/configuration/localizations | Permission.TENANTS_DELETE | Soft delete tenant feature flag |
| POST | /tenants/configuration/localizations | Permission.TENANTS_READ | Get tenant localization profiles |
| PATCH | /tenants/configuration/localizations/:id | Permission.TENANTS_UPDATE | Create tenant localization profile |
| POST | /tenants/configuration/branding | Permission.TENANTS_UPDATE | Update tenant localization profile |
| POST | /tenants/administration/provision | Permission.TENANTS_UPDATE | Create or update tenant branding |
| POST | /tenants/administration/:id/activate | Permission.TENANTS_PROVISION | Provision tenant |
| POST | /tenants/administration/:id/suspend | Permission.TENANTS_PROVISION | Activate tenant |
| POST | /tenants/administration/:id/resume | Permission.TENANTS_PROVISION | Suspend tenant |
| POST | /tenants/administration/:id/archive | Permission.TENANTS_PROVISION | Resume tenant |
| GET | /tenants/administration/usage-limits | Permission.TENANTS_PROVISION | Archive tenant |
| POST | /tenants/administration/usage-limits | Permission.TENANTS_READ | Get tenant usage limits |
| PATCH | /tenants/administration/usage-limits/:id | Permission.TENANTS_UPDATE | Create tenant usage limit |
| DELETE | /tenants/administration/usage-limits/:id | Permission.TENANTS_UPDATE | Update tenant usage limit |
| GET | /tenants/administration/events | Permission.TENANTS_DELETE | Soft delete tenant usage limit |
| POST | /tenants/administration/events | Permission.TENANTS_READ | Get tenant provisioning events |
| GET | /tenants/security/permission-policies | Permission.TENANTS_PROVISION | Record tenant provisioning event |
| POST | /tenants/security/permission-policies | Permission.TENANTS_SECURITY | Get tenant permission policies |
| PATCH | /tenants/security/permission-policies/:id | Permission.TENANTS_SECURITY | Create tenant permission policy |
| DELETE | /tenants/security/permission-policies/:id | Permission.TENANTS_SECURITY | Update tenant permission policy |
| POST | /tenants/security/validate | Permission.TENANTS_SECURITY | Soft delete tenant permission policy |
| GET | /tenants/security/audit-events | Permission.TENANTS_SECURITY | Validate tenant security boundary |
| POST | /tenants/security/audit-events | Permission.TENANTS_SECURITY | Get tenant audit events |

### UsersModule

Users bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/users/users.module.ts |
| Controllers | apps/api/src/users/users.controller.ts |
| Services | apps/api/src/users/users.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Users' |
| Permissions | 4 |
| Prisma Models/Tables | User, Role, Permission, RolePermission |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | No |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 2 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /users |  |  |
| GET | /users/:id | Permission.USERS_READ | Get all users |
| POST | /users | Permission.USERS_READ | Get user by id |
| PATCH | /users/:id | Permission.USERS_CREATE | Create user |
| DELETE | /users/:id | Permission.USERS_UPDATE | Update user |

### WorkflowDashboardModule

Workflow Dashboard bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/workflows/dashboard/workflow-dashboard.module.ts |
| Controllers | apps/api/src/workflows/dashboard/workflow-dashboard.controller.ts |
| Services | apps/api/src/workflows/dashboard/workflow-dashboard.service.ts |
| Repositories | None detected |
| DTOs | 0 |
| Entities | 1 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Workflow Dashboard' |
| Permissions | 1 |
| Prisma Models/Tables | Permission, WorkflowDefinition, WorkflowRequest, WorkflowStep |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | Yes |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 0 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /workflows/dashboard |  |  |

### WorkflowDefinitionsModule

Workflow Definitions bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/workflows/definitions/workflow-definitions.module.ts |
| Controllers | apps/api/src/workflows/definitions/workflow-definitions.controller.ts |
| Services | apps/api/src/workflows/definitions/workflow-definitions.service.ts |
| Repositories | None detected |
| DTOs | 4 |
| Entities | 2 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Workflow Definitions' |
| Permissions | 3 |
| Prisma Models/Tables | User, Role, Permission, Company, Employee, WorkflowDefinition, WorkflowDefinitionStep |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | Yes |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 3 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /workflows/definitions |  |  |
| GET | /workflows/definitions/:id | Permission.WORKFLOWS_READ | Get all workflow definitions |
| POST | /workflows/definitions | Permission.WORKFLOWS_READ | Get workflow definition by id |
| PATCH | /workflows/definitions/:id | Permission.WORKFLOWS_CREATE | Create workflow definition |
| POST | /workflows/definitions/:id/activate | Permission.WORKFLOWS_UPDATE | Update workflow definition |
| POST | /workflows/definitions/:id/archive | Permission.WORKFLOWS_UPDATE | Activate workflow definition |
| POST | /workflows/definitions/:id/steps | Permission.WORKFLOWS_UPDATE | Archive workflow definition |
| PATCH | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE | Add workflow definition step |
| DELETE | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE | Update workflow definition step |

### WorkflowRuntimeModule

Workflow Runtime bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/workflows/runtime/workflow-runtime.module.ts |
| Controllers | apps/api/src/workflows/runtime/workflow-runtime.controller.ts |
| Services | apps/api/src/workflows/runtime/workflow-runtime.service.ts |
| Repositories | None detected |
| DTOs | 2 |
| Entities | 2 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Workflow Runtime' |
| Permissions | 3 |
| Prisma Models/Tables | User, Permission, UserRole, Employee, WorkflowDefinition, WorkflowRequest, WorkflowStep |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | Yes |
| Notifications | No |
| AI | No |
| Reporting | No |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 3 |
| Security Notes | 0 |
| Technical Debt | 0 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /workflows/requests |  |  |
| GET | /workflows/requests/:id | Permission.WORKFLOWS_READ | Get all workflow requests |
| GET | /workflows/requests/:id/history | Permission.WORKFLOWS_READ | Get workflow request by id |
| POST | /workflows/requests | Permission.WORKFLOWS_READ | Get workflow request history |
| POST | /workflows/requests/:id/steps/:stepId/approve | Permission.WORKFLOWS_CREATE | Submit workflow request |
| POST | /workflows/requests/:id/steps/:stepId/reject | Permission.WORKFLOWS_UPDATE | Approve workflow step |
| POST | /workflows/requests/:id/cancel | Permission.WORKFLOWS_UPDATE | Reject workflow step |

### WorkflowsModule

Workflows bounded-context/module inventory generated from current NestJS source.

| Area | Inventory |
| --- | --- |
| Path | apps/api/src/workflows/workflows.module.ts |
| Controllers | apps/api/src/workflows/dashboard/workflow-dashboard.controller.ts, apps/api/src/workflows/definitions/workflow-definitions.controller.ts, apps/api/src/workflows/runtime/workflow-runtime.controller.ts |
| Services | apps/api/src/workflows/dashboard/workflow-dashboard.service.ts, apps/api/src/workflows/definitions/workflow-definitions.service.ts, apps/api/src/workflows/runtime/workflow-runtime.service.ts |
| Repositories | None detected |
| DTOs | 6 |
| Entities | 5 |
| Enums | None detected |
| Guards | None detected |
| Interceptors | None detected |
| Filters | None detected |
| Decorators | None detected |
| Middleware | None detected |
| Swagger Tags | 'Workflow Dashboard', 'Workflow Definitions', 'Workflow Runtime' |
| Permissions | 7 |
| Prisma Models/Tables | User, Role, Permission, UserRole, Company, Employee, WorkflowDefinition, WorkflowDefinitionStep, WorkflowRequest, WorkflowStep |
| Module Dependencies | common, prisma |
| Request Context | No |
| Pagination | No |
| Audit | No |
| Soft Delete | No |
| Status Transitions | No |
| Business Rules | No |
| Workflow | Yes |
| Notifications | No |
| AI | No |
| Reporting | Yes |
| Public API | No |
| Search | No |
| Events | No |
| Scheduled Jobs | No |
| External Integrations | Yes |
| Environment Variables | None detected |
| Performance Hotspots | 6 |
| Security Notes | 0 |
| Technical Debt | 1 |
| TODO/FIXME | 0 |
| Tests | No direct spec detected |

Routes:

| Method | Path | Permission | Summary |
| --- | --- | --- | --- |
| GET | /workflows/dashboard |  |  |
| GET | /workflows/definitions |  |  |
| GET | /workflows/definitions/:id | Permission.WORKFLOWS_READ | Get all workflow definitions |
| POST | /workflows/definitions | Permission.WORKFLOWS_READ | Get workflow definition by id |
| PATCH | /workflows/definitions/:id | Permission.WORKFLOWS_CREATE | Create workflow definition |
| POST | /workflows/definitions/:id/activate | Permission.WORKFLOWS_UPDATE | Update workflow definition |
| POST | /workflows/definitions/:id/archive | Permission.WORKFLOWS_UPDATE | Activate workflow definition |
| POST | /workflows/definitions/:id/steps | Permission.WORKFLOWS_UPDATE | Archive workflow definition |
| PATCH | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE | Add workflow definition step |
| DELETE | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE | Update workflow definition step |
| GET | /workflows/requests |  |  |
| GET | /workflows/requests/:id | Permission.WORKFLOWS_READ | Get all workflow requests |
| GET | /workflows/requests/:id/history | Permission.WORKFLOWS_READ | Get workflow request by id |
| POST | /workflows/requests | Permission.WORKFLOWS_READ | Get workflow request history |
| POST | /workflows/requests/:id/steps/:stepId/approve | Permission.WORKFLOWS_CREATE | Submit workflow request |
| POST | /workflows/requests/:id/steps/:stepId/reject | Permission.WORKFLOWS_UPDATE | Approve workflow step |
| POST | /workflows/requests/:id/cancel | Permission.WORKFLOWS_UPDATE | Reject workflow step |
