# Route Catalog

Date: 2026-07-02

| Method | Path | Module | File | Permission |
| --- | --- | --- | --- | --- |
| GET | /accounting/accounts | AccountingModule | apps/api/src/accounting/accounts/accounts.controller.ts |  |
| GET | /accounting/accounts/:id | AccountingModule | apps/api/src/accounting/accounts/accounts.controller.ts | Permission.ACCOUNTING_READ |
| POST | /accounting/accounts | AccountingModule | apps/api/src/accounting/accounts/accounts.controller.ts | Permission.ACCOUNTING_READ |
| PATCH | /accounting/accounts/:id | AccountingModule | apps/api/src/accounting/accounts/accounts.controller.ts | Permission.ACCOUNTING_CREATE |
| DELETE | /accounting/accounts/:id | AccountingModule | apps/api/src/accounting/accounts/accounts.controller.ts | Permission.ACCOUNTING_UPDATE |
| GET | /accounting/dimensions/cost-centers | AccountingModule | apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.controller.ts |  |
| GET | /accounting/dimensions/departments | AccountingModule | apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.controller.ts | Permission.ACCOUNTING_READ |
| GET | /accounting/dimensions/branches | AccountingModule | apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.controller.ts | Permission.ACCOUNTING_READ |
| GET | /accounting/journal-entries | AccountingModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts |  |
| GET | /accounting/journal-entries/:id | AccountingModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts | Permission.ACCOUNTING_READ |
| POST | /accounting/journal-entries | AccountingModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts | Permission.ACCOUNTING_READ |
| PATCH | /accounting/journal-entries/:id | AccountingModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts | Permission.ACCOUNTING_CREATE |
| POST | /accounting/journal-entries/:id/post | AccountingModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts | Permission.ACCOUNTING_UPDATE |
| POST | /accounting/journal-entries/:id/void | AccountingModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts | Permission.ACCOUNTING_UPDATE |
| POST | /accounting/payroll/generate-journal | AccountingModule | apps/api/src/accounting/payroll-accounting/payroll-accounting.controller.ts |  |
| GET | /accounting/reports/trial-balance | AccountingModule | apps/api/src/accounting/reports/accounting-reports.controller.ts |  |
| GET | /accounting/reports/general-ledger | AccountingModule | apps/api/src/accounting/reports/accounting-reports.controller.ts | Permission.ACCOUNTING_READ |
| GET | /accounting/reports/payroll | AccountingModule | apps/api/src/accounting/reports/accounting-reports.controller.ts | Permission.ACCOUNTING_READ |
| GET | /accounting/reports/cost-centers | AccountingModule | apps/api/src/accounting/reports/accounting-reports.controller.ts | Permission.ACCOUNTING_READ |
| GET | /accounting/accounts | AccountsModule | apps/api/src/accounting/accounts/accounts.controller.ts |  |
| GET | /accounting/accounts/:id | AccountsModule | apps/api/src/accounting/accounts/accounts.controller.ts | Permission.ACCOUNTING_READ |
| POST | /accounting/accounts | AccountsModule | apps/api/src/accounting/accounts/accounts.controller.ts | Permission.ACCOUNTING_READ |
| PATCH | /accounting/accounts/:id | AccountsModule | apps/api/src/accounting/accounts/accounts.controller.ts | Permission.ACCOUNTING_CREATE |
| DELETE | /accounting/accounts/:id | AccountsModule | apps/api/src/accounting/accounts/accounts.controller.ts | Permission.ACCOUNTING_UPDATE |
| GET | /accounting/dimensions/cost-centers | AccountingCostCenterReportsModule | apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.controller.ts |  |
| GET | /accounting/dimensions/departments | AccountingCostCenterReportsModule | apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.controller.ts | Permission.ACCOUNTING_READ |
| GET | /accounting/dimensions/branches | AccountingCostCenterReportsModule | apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.controller.ts | Permission.ACCOUNTING_READ |
| GET | /accounting/journal-entries | JournalEntriesModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts |  |
| GET | /accounting/journal-entries/:id | JournalEntriesModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts | Permission.ACCOUNTING_READ |
| POST | /accounting/journal-entries | JournalEntriesModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts | Permission.ACCOUNTING_READ |
| PATCH | /accounting/journal-entries/:id | JournalEntriesModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts | Permission.ACCOUNTING_CREATE |
| POST | /accounting/journal-entries/:id/post | JournalEntriesModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts | Permission.ACCOUNTING_UPDATE |
| POST | /accounting/journal-entries/:id/void | JournalEntriesModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts | Permission.ACCOUNTING_UPDATE |
| POST | /accounting/payroll/generate-journal | PayrollAccountingModule | apps/api/src/accounting/payroll-accounting/payroll-accounting.controller.ts |  |
| GET | /accounting/reports/trial-balance | AccountingReportsModule | apps/api/src/accounting/reports/accounting-reports.controller.ts |  |
| GET | /accounting/reports/general-ledger | AccountingReportsModule | apps/api/src/accounting/reports/accounting-reports.controller.ts | Permission.ACCOUNTING_READ |
| GET | /accounting/reports/payroll | AccountingReportsModule | apps/api/src/accounting/reports/accounting-reports.controller.ts | Permission.ACCOUNTING_READ |
| GET | /accounting/reports/cost-centers | AccountingReportsModule | apps/api/src/accounting/reports/accounting-reports.controller.ts | Permission.ACCOUNTING_READ |
| GET | /ai/providers | AiModule | apps/api/src/ai/ai-core.controller.ts |  |
| POST | /ai/providers | AiModule | apps/api/src/ai/ai-core.controller.ts | Permission.AI_READ |
| PATCH | /ai/providers/:id | AiModule | apps/api/src/ai/ai-core.controller.ts | Permission.AI_CREATE |
| DELETE | /ai/providers/:id | AiModule | apps/api/src/ai/ai-core.controller.ts | Permission.AI_UPDATE |
| POST | /ai/complete | AiModule | apps/api/src/ai/ai-core.controller.ts | Permission.AI_DELETE |
| GET | /ai/requests | AiModule | apps/api/src/ai/ai-core.controller.ts | Permission.AI_EXECUTE |
| GET | /ai/usage | AiModule | apps/api/src/ai/ai-core.controller.ts | Permission.AI_READ |
| GET | /ai/governance/limits | AiModule | apps/api/src/ai/ai-governance.controller.ts |  |
| POST | /ai/governance/limits | AiModule | apps/api/src/ai/ai-governance.controller.ts | Permission.AI_GOVERN |
| PATCH | /ai/governance/limits/:id | AiModule | apps/api/src/ai/ai-governance.controller.ts | Permission.AI_GOVERN |
| DELETE | /ai/governance/limits/:id | AiModule | apps/api/src/ai/ai-governance.controller.ts | Permission.AI_GOVERN |
| GET | /ai/governance/policies | AiModule | apps/api/src/ai/ai-governance.controller.ts | Permission.AI_GOVERN |
| POST | /ai/governance/policies | AiModule | apps/api/src/ai/ai-governance.controller.ts | Permission.AI_GOVERN |
| PATCH | /ai/governance/policies/:id | AiModule | apps/api/src/ai/ai-governance.controller.ts | Permission.AI_GOVERN |
| DELETE | /ai/governance/policies/:id | AiModule | apps/api/src/ai/ai-governance.controller.ts | Permission.AI_GOVERN |
| GET | /ai/hr/employee-insights | AiModule | apps/api/src/ai/hr-assistant.controller.ts |  |
| GET | /ai/hr/leave-analysis | AiModule | apps/api/src/ai/hr-assistant.controller.ts | Permission.AI_EXECUTE |
| GET | /ai/hr/payroll-explanation | AiModule | apps/api/src/ai/hr-assistant.controller.ts | Permission.AI_EXECUTE |
| GET | /ai/hr/document-alerts | AiModule | apps/api/src/ai/hr-assistant.controller.ts | Permission.AI_EXECUTE |
| POST | /ai/reporting/natural-language | AiModule | apps/api/src/ai/reporting-ai.controller.ts |  |
| GET | /ai/reporting/dashboard-insights | AiModule | apps/api/src/ai/reporting-ai.controller.ts | Permission.AI_EXECUTE |
| GET | /ai/reporting/anomalies | AiModule | apps/api/src/ai/reporting-ai.controller.ts | Permission.AI_EXECUTE |
| POST | /ai/workflow/approval-recommendation | AiModule | apps/api/src/ai/workflow-ai.controller.ts |  |
| POST | /ai/workflow/risk-score | AiModule | apps/api/src/ai/workflow-ai.controller.ts | Permission.AI_EXECUTE |
| POST | /ai/workflow/rule-suggestions | AiModule | apps/api/src/ai/workflow-ai.controller.ts | Permission.AI_EXECUTE |
| GET | /accounting/accounts | AppModule | apps/api/src/accounting/accounts/accounts.controller.ts |  |
| GET | /accounting/accounts/:id | AppModule | apps/api/src/accounting/accounts/accounts.controller.ts | Permission.ACCOUNTING_READ |
| POST | /accounting/accounts | AppModule | apps/api/src/accounting/accounts/accounts.controller.ts | Permission.ACCOUNTING_READ |
| PATCH | /accounting/accounts/:id | AppModule | apps/api/src/accounting/accounts/accounts.controller.ts | Permission.ACCOUNTING_CREATE |
| DELETE | /accounting/accounts/:id | AppModule | apps/api/src/accounting/accounts/accounts.controller.ts | Permission.ACCOUNTING_UPDATE |
| GET | /accounting/dimensions/cost-centers | AppModule | apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.controller.ts |  |
| GET | /accounting/dimensions/departments | AppModule | apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.controller.ts | Permission.ACCOUNTING_READ |
| GET | /accounting/dimensions/branches | AppModule | apps/api/src/accounting/cost-center-reports/accounting-cost-center-reports.controller.ts | Permission.ACCOUNTING_READ |
| GET | /accounting/journal-entries | AppModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts |  |
| GET | /accounting/journal-entries/:id | AppModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts | Permission.ACCOUNTING_READ |
| POST | /accounting/journal-entries | AppModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts | Permission.ACCOUNTING_READ |
| PATCH | /accounting/journal-entries/:id | AppModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts | Permission.ACCOUNTING_CREATE |
| POST | /accounting/journal-entries/:id/post | AppModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts | Permission.ACCOUNTING_UPDATE |
| POST | /accounting/journal-entries/:id/void | AppModule | apps/api/src/accounting/journal-entries/journal-entries.controller.ts | Permission.ACCOUNTING_UPDATE |
| POST | /accounting/payroll/generate-journal | AppModule | apps/api/src/accounting/payroll-accounting/payroll-accounting.controller.ts |  |
| GET | /accounting/reports/trial-balance | AppModule | apps/api/src/accounting/reports/accounting-reports.controller.ts |  |
| GET | /accounting/reports/general-ledger | AppModule | apps/api/src/accounting/reports/accounting-reports.controller.ts | Permission.ACCOUNTING_READ |
| GET | /accounting/reports/payroll | AppModule | apps/api/src/accounting/reports/accounting-reports.controller.ts | Permission.ACCOUNTING_READ |
| GET | /accounting/reports/cost-centers | AppModule | apps/api/src/accounting/reports/accounting-reports.controller.ts | Permission.ACCOUNTING_READ |
| GET | /ai/providers | AppModule | apps/api/src/ai/ai-core.controller.ts |  |
| POST | /ai/providers | AppModule | apps/api/src/ai/ai-core.controller.ts | Permission.AI_READ |
| PATCH | /ai/providers/:id | AppModule | apps/api/src/ai/ai-core.controller.ts | Permission.AI_CREATE |
| DELETE | /ai/providers/:id | AppModule | apps/api/src/ai/ai-core.controller.ts | Permission.AI_UPDATE |
| POST | /ai/complete | AppModule | apps/api/src/ai/ai-core.controller.ts | Permission.AI_DELETE |
| GET | /ai/requests | AppModule | apps/api/src/ai/ai-core.controller.ts | Permission.AI_EXECUTE |
| GET | /ai/usage | AppModule | apps/api/src/ai/ai-core.controller.ts | Permission.AI_READ |
| GET | /ai/governance/limits | AppModule | apps/api/src/ai/ai-governance.controller.ts |  |
| POST | /ai/governance/limits | AppModule | apps/api/src/ai/ai-governance.controller.ts | Permission.AI_GOVERN |
| PATCH | /ai/governance/limits/:id | AppModule | apps/api/src/ai/ai-governance.controller.ts | Permission.AI_GOVERN |
| DELETE | /ai/governance/limits/:id | AppModule | apps/api/src/ai/ai-governance.controller.ts | Permission.AI_GOVERN |
| GET | /ai/governance/policies | AppModule | apps/api/src/ai/ai-governance.controller.ts | Permission.AI_GOVERN |
| POST | /ai/governance/policies | AppModule | apps/api/src/ai/ai-governance.controller.ts | Permission.AI_GOVERN |
| PATCH | /ai/governance/policies/:id | AppModule | apps/api/src/ai/ai-governance.controller.ts | Permission.AI_GOVERN |
| DELETE | /ai/governance/policies/:id | AppModule | apps/api/src/ai/ai-governance.controller.ts | Permission.AI_GOVERN |
| GET | /ai/hr/employee-insights | AppModule | apps/api/src/ai/hr-assistant.controller.ts |  |
| GET | /ai/hr/leave-analysis | AppModule | apps/api/src/ai/hr-assistant.controller.ts | Permission.AI_EXECUTE |
| GET | /ai/hr/payroll-explanation | AppModule | apps/api/src/ai/hr-assistant.controller.ts | Permission.AI_EXECUTE |
| GET | /ai/hr/document-alerts | AppModule | apps/api/src/ai/hr-assistant.controller.ts | Permission.AI_EXECUTE |
| POST | /ai/reporting/natural-language | AppModule | apps/api/src/ai/reporting-ai.controller.ts |  |
| GET | /ai/reporting/dashboard-insights | AppModule | apps/api/src/ai/reporting-ai.controller.ts | Permission.AI_EXECUTE |
| GET | /ai/reporting/anomalies | AppModule | apps/api/src/ai/reporting-ai.controller.ts | Permission.AI_EXECUTE |
| POST | /ai/workflow/approval-recommendation | AppModule | apps/api/src/ai/workflow-ai.controller.ts |  |
| POST | /ai/workflow/risk-score | AppModule | apps/api/src/ai/workflow-ai.controller.ts | Permission.AI_EXECUTE |
| POST | /ai/workflow/rule-suggestions | AppModule | apps/api/src/ai/workflow-ai.controller.ts | Permission.AI_EXECUTE |
| GET | / | AppModule | apps/api/src/app.controller.ts |  |
| GET | /assets | AppModule | apps/api/src/assets/assets/assets.controller.ts |  |
| GET | /assets/:id | AppModule | apps/api/src/assets/assets/assets.controller.ts | Permission.ASSETS_READ |
| POST | /assets | AppModule | apps/api/src/assets/assets/assets.controller.ts | Permission.ASSETS_READ |
| PATCH | /assets/:id | AppModule | apps/api/src/assets/assets/assets.controller.ts | Permission.ASSETS_CREATE |
| DELETE | /assets/:id | AppModule | apps/api/src/assets/assets/assets.controller.ts | Permission.ASSETS_UPDATE |
| GET | /assets/assignments | AppModule | apps/api/src/assets/assignments/asset-assignments.controller.ts |  |
| GET | /assets/assignments/:id | AppModule | apps/api/src/assets/assignments/asset-assignments.controller.ts | Permission.ASSETS_READ |
| POST | /assets/assignments | AppModule | apps/api/src/assets/assignments/asset-assignments.controller.ts | Permission.ASSETS_READ |
| POST | /assets/assignments/:id/return | AppModule | apps/api/src/assets/assignments/asset-assignments.controller.ts | Permission.ASSETS_CREATE |
| POST | /assets/assignments/:id/lost | AppModule | apps/api/src/assets/assignments/asset-assignments.controller.ts | Permission.ASSETS_UPDATE |
| DELETE | /assets/assignments/:id | AppModule | apps/api/src/assets/assignments/asset-assignments.controller.ts | Permission.ASSETS_UPDATE |
| GET | /assets/categories | AppModule | apps/api/src/assets/categories/asset-categories.controller.ts |  |
| GET | /assets/categories/:id | AppModule | apps/api/src/assets/categories/asset-categories.controller.ts | Permission.ASSETS_READ |
| POST | /assets/categories | AppModule | apps/api/src/assets/categories/asset-categories.controller.ts | Permission.ASSETS_READ |
| PATCH | /assets/categories/:id | AppModule | apps/api/src/assets/categories/asset-categories.controller.ts | Permission.ASSETS_CREATE |
| DELETE | /assets/categories/:id | AppModule | apps/api/src/assets/categories/asset-categories.controller.ts | Permission.ASSETS_UPDATE |
| GET | /assets/dashboard/summary | AppModule | apps/api/src/assets/dashboard/assets-dashboard.controller.ts |  |
| GET | /assets/maintenance | AppModule | apps/api/src/assets/maintenance/asset-maintenance.controller.ts |  |
| GET | /assets/maintenance/:id | AppModule | apps/api/src/assets/maintenance/asset-maintenance.controller.ts | Permission.ASSETS_READ |
| POST | /assets/maintenance | AppModule | apps/api/src/assets/maintenance/asset-maintenance.controller.ts | Permission.ASSETS_READ |
| PATCH | /assets/maintenance/:id | AppModule | apps/api/src/assets/maintenance/asset-maintenance.controller.ts | Permission.ASSETS_CREATE |
| DELETE | /assets/maintenance/:id | AppModule | apps/api/src/assets/maintenance/asset-maintenance.controller.ts | Permission.ASSETS_UPDATE |
| GET | /attendance/holidays | AppModule | apps/api/src/attendance/holidays/holidays.controller.ts |  |
| GET | /attendance/holidays/:id | AppModule | apps/api/src/attendance/holidays/holidays.controller.ts | Permission.ATTENDANCE_READ |
| POST | /attendance/holidays | AppModule | apps/api/src/attendance/holidays/holidays.controller.ts | Permission.ATTENDANCE_READ |
| PATCH | /attendance/holidays/:id | AppModule | apps/api/src/attendance/holidays/holidays.controller.ts | Permission.ATTENDANCE_CREATE |
| DELETE | /attendance/holidays/:id | AppModule | apps/api/src/attendance/holidays/holidays.controller.ts | Permission.ATTENDANCE_UPDATE |
| GET | /attendance/records | AppModule | apps/api/src/attendance/records/attendance-records.controller.ts |  |
| GET | /attendance/records/:id | AppModule | apps/api/src/attendance/records/attendance-records.controller.ts | Permission.ATTENDANCE_READ |
| POST | /attendance/records | AppModule | apps/api/src/attendance/records/attendance-records.controller.ts | Permission.ATTENDANCE_READ |
| PATCH | /attendance/records/:id | AppModule | apps/api/src/attendance/records/attendance-records.controller.ts | Permission.ATTENDANCE_CREATE |
| DELETE | /attendance/records/:id | AppModule | apps/api/src/attendance/records/attendance-records.controller.ts | Permission.ATTENDANCE_UPDATE |
| GET | /attendance/shifts | AppModule | apps/api/src/attendance/shifts/shifts.controller.ts |  |
| GET | /attendance/shifts/:id | AppModule | apps/api/src/attendance/shifts/shifts.controller.ts | Permission.ATTENDANCE_READ |
| POST | /attendance/shifts | AppModule | apps/api/src/attendance/shifts/shifts.controller.ts | Permission.ATTENDANCE_READ |
| PATCH | /attendance/shifts/:id | AppModule | apps/api/src/attendance/shifts/shifts.controller.ts | Permission.ATTENDANCE_CREATE |
| DELETE | /attendance/shifts/:id | AppModule | apps/api/src/attendance/shifts/shifts.controller.ts | Permission.ATTENDANCE_UPDATE |
| POST | /auth/login | AppModule | apps/api/src/auth/auth.controller.ts |  |
| GET | /bi/kpis | AppModule | apps/api/src/bi/bi.controller.ts |  |
| POST | /bi/kpis | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_READ |
| PATCH | /bi/kpis/:id | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| POST | /bi/kpis/:id/archive | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| POST | /bi/kpis/:id/snapshots | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| GET | /bi/kpis/:id/snapshots | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_EXECUTE |
| GET | /bi/datasets | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_READ |
| POST | /bi/datasets | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_READ |
| PATCH | /bi/datasets/:id | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| POST | /bi/datasets/:id/run | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| GET | /bi/metrics | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_EXECUTE |
| POST | /bi/metrics | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_READ |
| PATCH | /bi/metrics/:id | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| POST | /bi/metrics/:id/observations | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| GET | /bi/dashboards | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_EXECUTE |
| POST | /bi/dashboards | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_DASHBOARD |
| POST | /bi/dashboards/:id/widgets | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| GET | /bi/dashboards/executive/summary | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| GET | /bi/kpis/:id/trend | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_DASHBOARD |
| GET | /bi/metrics/:id/trend | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_READ |
| GET | /bi/predictions/models | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_READ |
| POST | /bi/predictions/models | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_PREDICT |
| POST | /bi/predictions/models/:id/run | AppModule | apps/api/src/bi/bi.controller.ts | Permission.BI_PREDICT |
| GET | /business-rules/categories | AppModule | apps/api/src/business-rules/business-rules.controller.ts |  |
| POST | /business-rules/categories | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_READ |
| PATCH | /business-rules/categories/:id | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_CREATE |
| DELETE | /business-rules/categories/:id | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_UPDATE |
| POST | /business-rules/categories/:id/restore | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_DELETE |
| GET | /business-rules/executions | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_UPDATE |
| GET | /business-rules/dashboard | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_READ |
| GET | /business-rules | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_READ |
| POST | /business-rules/evaluate | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_READ |
| GET | /business-rules/:id/conditions | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_EXECUTE |
| POST | /business-rules/:id/conditions | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_READ |
| PATCH | /business-rules/:id/conditions/:conditionId | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_UPDATE |
| DELETE | /business-rules/:id/conditions/:conditionId | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_UPDATE |
| GET | /business-rules/:id/actions | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_DELETE |
| POST | /business-rules/:id/actions | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_READ |
| PATCH | /business-rules/:id/actions/:actionId | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_UPDATE |
| DELETE | /business-rules/:id/actions/:actionId | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_UPDATE |
| GET | /business-rules/:id | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_DELETE |
| POST | /business-rules | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_READ |
| PATCH | /business-rules/:id | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_CREATE |
| DELETE | /business-rules/:id | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_UPDATE |
| POST | /business-rules/:id/restore | AppModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_DELETE |
| GET | /documents/categories | AppModule | apps/api/src/documents/categories/document-categories.controller.ts |  |
| GET | /documents/categories/:id | AppModule | apps/api/src/documents/categories/document-categories.controller.ts | Permission.DOCUMENTS_READ |
| POST | /documents/categories | AppModule | apps/api/src/documents/categories/document-categories.controller.ts | Permission.DOCUMENTS_READ |
| PATCH | /documents/categories/:id | AppModule | apps/api/src/documents/categories/document-categories.controller.ts | Permission.DOCUMENTS_CREATE |
| DELETE | /documents/categories/:id | AppModule | apps/api/src/documents/categories/document-categories.controller.ts | Permission.DOCUMENTS_UPDATE |
| GET | /documents/dashboard/summary | AppModule | apps/api/src/documents/dashboard/documents-dashboard.controller.ts |  |
| GET | /documents | AppModule | apps/api/src/documents/documents/documents.controller.ts |  |
| GET | /documents/:id | AppModule | apps/api/src/documents/documents/documents.controller.ts | Permission.DOCUMENTS_READ |
| POST | /documents | AppModule | apps/api/src/documents/documents/documents.controller.ts | Permission.DOCUMENTS_READ |
| PATCH | /documents/:id | AppModule | apps/api/src/documents/documents/documents.controller.ts | Permission.DOCUMENTS_CREATE |
| POST | /documents/:id/archive | AppModule | apps/api/src/documents/documents/documents.controller.ts | Permission.DOCUMENTS_UPDATE |
| DELETE | /documents/:id | AppModule | apps/api/src/documents/documents/documents.controller.ts | Permission.DOCUMENTS_UPDATE |
| POST | /documents/expiration/mark-expired | AppModule | apps/api/src/documents/expiration/document-expiration.controller.ts |  |
| GET | /documents/expiration/expired | AppModule | apps/api/src/documents/expiration/document-expiration.controller.ts | Permission.DOCUMENTS_UPDATE |
| GET | /documents/expiration/soon/:days | AppModule | apps/api/src/documents/expiration/document-expiration.controller.ts | Permission.DOCUMENTS_READ |
| GET | /documents/versions | AppModule | apps/api/src/documents/versions/document-versions.controller.ts |  |
| GET | /documents/versions/document/:documentId | AppModule | apps/api/src/documents/versions/document-versions.controller.ts | Permission.DOCUMENTS_READ |
| GET | /documents/versions/:id | AppModule | apps/api/src/documents/versions/document-versions.controller.ts | Permission.DOCUMENTS_READ |
| POST | /documents/versions | AppModule | apps/api/src/documents/versions/document-versions.controller.ts | Permission.DOCUMENTS_READ |
| DELETE | /documents/versions/:id | AppModule | apps/api/src/documents/versions/document-versions.controller.ts | Permission.DOCUMENTS_CREATE |
| GET | /employees | AppModule | apps/api/src/employees/employees.controller.ts |  |
| GET | /employees/:id | AppModule | apps/api/src/employees/employees.controller.ts | Permission.EMPLOYEES_READ |
| POST | /employees | AppModule | apps/api/src/employees/employees.controller.ts | Permission.EMPLOYEES_READ |
| PATCH | /employees/:id | AppModule | apps/api/src/employees/employees.controller.ts | Permission.EMPLOYEES_CREATE |
| DELETE | /employees/:id | AppModule | apps/api/src/employees/employees.controller.ts | Permission.EMPLOYEES_UPDATE |
| GET | /ess/requests | AppModule | apps/api/src/ess/requests/self-service-requests.controller.ts |  |
| GET | /ess/requests/employee/:employeeId | AppModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_READ |
| GET | /ess/requests/:id | AppModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_READ |
| POST | /ess/requests | AppModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_READ |
| PATCH | /ess/requests/:id | AppModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_CREATE |
| POST | /ess/requests/:id/submit | AppModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_UPDATE |
| POST | /ess/requests/:id/review | AppModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_UPDATE |
| DELETE | /ess/requests/:id | AppModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_UPDATE |
| GET | /integrations/providers | AppModule | apps/api/src/integrations/integrations.controller.ts |  |
| POST | /integrations/providers | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_READ |
| PATCH | /integrations/providers/:id | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_CREATE |
| DELETE | /integrations/providers/:id | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/providers/:id/restore | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_DELETE |
| POST | /integrations/providers/:id/enable | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/providers/:id/disable | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/credentials | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/credentials | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_READ |
| PATCH | /integrations/credentials/:id | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_CREATE |
| DELETE | /integrations/credentials/:id | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/credentials/:id/restore | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_DELETE |
| POST | /integrations/credentials/:id/enable | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/credentials/:id/disable | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/connections | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/connections | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_READ |
| PATCH | /integrations/connections/:id | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_CREATE |
| DELETE | /integrations/connections/:id | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/connections/:id/restore | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_DELETE |
| POST | /integrations/connections/:id/test | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/connections/:id/connect | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_EXECUTE |
| POST | /integrations/connections/:id/disconnect | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_EXECUTE |
| POST | /integrations/connections/:id/enable | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_EXECUTE |
| POST | /integrations/connections/:id/disable | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/retry-policies | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/retry-policies | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_READ |
| PATCH | /integrations/retry-policies/:id | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_CREATE |
| DELETE | /integrations/retry-policies/:id | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/retry-policies/:id/restore | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_DELETE |
| POST | /integrations/retry-policies/:id/enable | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/retry-policies/:id/disable | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/webhooks | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/webhooks | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_READ |
| PATCH | /integrations/webhooks/:id | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_CREATE |
| DELETE | /integrations/webhooks/:id | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/webhooks/:id/restore | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_DELETE |
| POST | /integrations/webhooks/:id/enable | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/webhooks/:id/disable | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/rest-connectors | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/rest-connectors | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_READ |
| PATCH | /integrations/rest-connectors/:id | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_CREATE |
| DELETE | /integrations/rest-connectors/:id | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/rest-connectors/:id/restore | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_DELETE |
| POST | /integrations/rest-connectors/:id/enable | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/rest-connectors/:id/disable | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/outbound-jobs | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/outbound-jobs | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_MONITOR |
| POST | /integrations/outbound-jobs/process-due | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_EXECUTE |
| POST | /integrations/outbound-jobs/:id/execute | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_EXECUTE |
| POST | /integrations/outbound-jobs/:id/retry | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_EXECUTE |
| POST | /integrations/outbound-jobs/:id/cancel | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_EXECUTE |
| POST | /integrations/inbound/:connectionId/webhook | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/inbound-events | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/executions | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_MONITOR |
| GET | /integrations/dashboard | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_MONITOR |
| GET | /integrations/retry-history | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_MONITOR |
| GET | /integrations/health | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_MONITOR |
| POST | /integrations/connections/:id/health-check | AppModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_MONITOR |
| GET | /leave/balances | AppModule | apps/api/src/leave/leave-balances/leave-balances.controller.ts |  |
| GET | /leave/balances/:id | AppModule | apps/api/src/leave/leave-balances/leave-balances.controller.ts | Permission.LEAVE_READ |
| POST | /leave/balances | AppModule | apps/api/src/leave/leave-balances/leave-balances.controller.ts | Permission.LEAVE_READ |
| PATCH | /leave/balances/:id | AppModule | apps/api/src/leave/leave-balances/leave-balances.controller.ts | Permission.LEAVE_CREATE |
| DELETE | /leave/balances/:id | AppModule | apps/api/src/leave/leave-balances/leave-balances.controller.ts | Permission.LEAVE_UPDATE |
| GET | /leave/requests | AppModule | apps/api/src/leave/leave-requests/leave-requests.controller.ts |  |
| GET | /leave/requests/:id | AppModule | apps/api/src/leave/leave-requests/leave-requests.controller.ts | Permission.LEAVE_READ |
| POST | /leave/requests | AppModule | apps/api/src/leave/leave-requests/leave-requests.controller.ts | Permission.LEAVE_READ |
| PATCH | /leave/requests/:id | AppModule | apps/api/src/leave/leave-requests/leave-requests.controller.ts | Permission.LEAVE_CREATE |
| DELETE | /leave/requests/:id | AppModule | apps/api/src/leave/leave-requests/leave-requests.controller.ts | Permission.LEAVE_UPDATE |
| GET | /leave/types | AppModule | apps/api/src/leave/leave-types/leave-types.controller.ts |  |
| GET | /leave/types/:id | AppModule | apps/api/src/leave/leave-types/leave-types.controller.ts | Permission.LEAVE_READ |
| POST | /leave/types | AppModule | apps/api/src/leave/leave-types/leave-types.controller.ts | Permission.LEAVE_READ |
| PATCH | /leave/types/:id | AppModule | apps/api/src/leave/leave-types/leave-types.controller.ts | Permission.LEAVE_CREATE |
| DELETE | /leave/types/:id | AppModule | apps/api/src/leave/leave-types/leave-types.controller.ts | Permission.LEAVE_UPDATE |
| POST | /mobile/auth/login | AppModule | apps/api/src/mobile/mobile.controller.ts |  |
| POST | /mobile/auth/refresh | AppModule | apps/api/src/mobile/mobile.controller.ts |  |
| POST | /mobile/auth/logout | AppModule | apps/api/src/mobile/mobile.controller.ts |  |
| GET | /mobile/bootstrap | AppModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_ACCESS |
| POST | /mobile/devices/register | AppModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_ACCESS |
| GET | /mobile/devices | AppModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_ACCESS |
| PATCH | /mobile/devices/:id | AppModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_READ |
| POST | /mobile/devices/:id/revoke | AppModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_MANAGE |
| GET | /mobile/sessions | AppModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_MANAGE |
| POST | /mobile/sessions/:id/revoke | AppModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_SESSIONS |
| POST | /mobile/push/notifications | AppModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_SESSIONS |
| GET | /mobile/push/notifications | AppModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_PUSH |
| PATCH | /mobile/push/notifications/:id | AppModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_PUSH |
| POST | /mobile/sync/pull | AppModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_PUSH |
| POST | /mobile/sync/changes | AppModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_SYNC |
| GET | /mobile/sync/changes | AppModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_SYNC |
| GET | /notifications/dashboard | AppModule | apps/api/src/notifications/dashboard/notification-dashboard.controller.ts |  |
| POST | /notifications/jobs/scheduled | AppModule | apps/api/src/notifications/jobs/notification-jobs.controller.ts |  |
| POST | /notifications/jobs/retry-failed | AppModule | apps/api/src/notifications/jobs/notification-jobs.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| POST | /notifications/jobs/expire-workflows | AppModule | apps/api/src/notifications/jobs/notification-jobs.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| POST | /notifications/jobs/cleanup | AppModule | apps/api/src/notifications/jobs/notification-jobs.controller.ts | Permission.WORKFLOWS_UPDATE |
| POST | /notifications/jobs/maintenance | AppModule | apps/api/src/notifications/jobs/notification-jobs.controller.ts | Permission.NOTIFICATIONS_DELETE |
| GET | /notifications | AppModule | apps/api/src/notifications/notifications.controller.ts |  |
| GET | /notifications/employee/:employeeId | AppModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_READ |
| GET | /notifications/:id | AppModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_READ |
| POST | /notifications | AppModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_READ |
| PATCH | /notifications/:id | AppModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_CREATE |
| POST | /notifications/:id/read | AppModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| POST | /notifications/:id/sent | AppModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| POST | /notifications/:id/cancel | AppModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| POST | /notifications/queue/process | AppModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| POST | /notifications/queue/retry-failed | AppModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| DELETE | /notifications/:id | AppModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| GET | /observability/health/providers | AppModule | apps/api/src/observability/observability.controller.ts |  |
| POST | /observability/health/providers | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| PATCH | /observability/health/providers/:id | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_CREATE |
| DELETE | /observability/health/providers/:id | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_UPDATE |
| POST | /observability/health/providers/:id/run | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_DELETE |
| POST | /observability/health/liveness | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_ADMIN |
| POST | /observability/health/readiness | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/health/results | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/metrics/definitions | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| POST | /observability/metrics/definitions | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| PATCH | /observability/metrics/definitions/:id | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_CREATE |
| DELETE | /observability/metrics/definitions/:id | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_UPDATE |
| GET | /observability/metrics/samples | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_DELETE |
| POST | /observability/metrics/samples | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/metrics/http | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_CREATE |
| GET | /observability/metrics/database | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/metrics/workflow | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/metrics/payroll | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/metrics/business-rules | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/logs | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| POST | /observability/logs | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/logs/summary | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_CREATE |
| GET | /observability/traces | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| POST | /observability/traces | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/traces/spans | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_CREATE |
| POST | /observability/traces/spans | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/traces/requests | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_CREATE |
| GET | /observability/traces/services | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/traces/database | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/traces/external-providers | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/management/status | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/management/diagnostics | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_ADMIN |
| GET | /observability/management/metrics | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_ADMIN |
| GET | /observability/management/health | AppModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_ADMIN |
| GET | /organization/branches | AppModule | apps/api/src/organization/branches/branches.controller.ts |  |
| GET | /organization/branches/:id | AppModule | apps/api/src/organization/branches/branches.controller.ts | Permission.ORGANIZATION_READ |
| POST | /organization/branches | AppModule | apps/api/src/organization/branches/branches.controller.ts | Permission.ORGANIZATION_READ |
| PATCH | /organization/branches/:id | AppModule | apps/api/src/organization/branches/branches.controller.ts | Permission.ORGANIZATION_CREATE |
| DELETE | /organization/branches/:id | AppModule | apps/api/src/organization/branches/branches.controller.ts | Permission.ORGANIZATION_UPDATE |
| GET | /organization/companies | AppModule | apps/api/src/organization/companies/companies.controller.ts |  |
| GET | /organization/companies/:id | AppModule | apps/api/src/organization/companies/companies.controller.ts | Permission.ORGANIZATION_READ |
| POST | /organization/companies | AppModule | apps/api/src/organization/companies/companies.controller.ts | Permission.ORGANIZATION_READ |
| PATCH | /organization/companies/:id | AppModule | apps/api/src/organization/companies/companies.controller.ts | Permission.ORGANIZATION_CREATE |
| DELETE | /organization/companies/:id | AppModule | apps/api/src/organization/companies/companies.controller.ts | Permission.ORGANIZATION_UPDATE |
| GET | /organization/cost-centers | AppModule | apps/api/src/organization/cost-centers/cost-centers.controller.ts |  |
| GET | /organization/cost-centers/:id | AppModule | apps/api/src/organization/cost-centers/cost-centers.controller.ts | Permission.ORGANIZATION_READ |
| POST | /organization/cost-centers | AppModule | apps/api/src/organization/cost-centers/cost-centers.controller.ts | Permission.ORGANIZATION_READ |
| PATCH | /organization/cost-centers/:id | AppModule | apps/api/src/organization/cost-centers/cost-centers.controller.ts | Permission.ORGANIZATION_CREATE |
| DELETE | /organization/cost-centers/:id | AppModule | apps/api/src/organization/cost-centers/cost-centers.controller.ts | Permission.ORGANIZATION_UPDATE |
| GET | /organization/departments | AppModule | apps/api/src/organization/departments/departments.controller.ts |  |
| GET | /organization/departments/:id | AppModule | apps/api/src/organization/departments/departments.controller.ts | Permission.ORGANIZATION_READ |
| POST | /organization/departments | AppModule | apps/api/src/organization/departments/departments.controller.ts | Permission.ORGANIZATION_READ |
| PATCH | /organization/departments/:id | AppModule | apps/api/src/organization/departments/departments.controller.ts | Permission.ORGANIZATION_CREATE |
| DELETE | /organization/departments/:id | AppModule | apps/api/src/organization/departments/departments.controller.ts | Permission.ORGANIZATION_UPDATE |
| GET | /organization/positions | AppModule | apps/api/src/organization/positions/positions.controller.ts |  |
| GET | /organization/positions/:id | AppModule | apps/api/src/organization/positions/positions.controller.ts | Permission.ORGANIZATION_READ |
| POST | /organization/positions | AppModule | apps/api/src/organization/positions/positions.controller.ts | Permission.ORGANIZATION_READ |
| PATCH | /organization/positions/:id | AppModule | apps/api/src/organization/positions/positions.controller.ts | Permission.ORGANIZATION_CREATE |
| DELETE | /organization/positions/:id | AppModule | apps/api/src/organization/positions/positions.controller.ts | Permission.ORGANIZATION_UPDATE |
| POST | /payroll/runs/:id/review | AppModule | apps/api/src/payroll/approval/payroll-approval.controller.ts |  |
| POST | /payroll/runs/:id/approve | AppModule | apps/api/src/payroll/approval/payroll-approval.controller.ts | Permission.PAYROLL_UPDATE |
| POST | /payroll/runs/:id/reject | AppModule | apps/api/src/payroll/approval/payroll-approval.controller.ts | Permission.PAYROLL_UPDATE |
| POST | /payroll/runs/:id/lock | AppModule | apps/api/src/payroll/approval/payroll-approval.controller.ts | Permission.PAYROLL_UPDATE |
| POST | /payroll/attendance/apply | AppModule | apps/api/src/payroll/attendance/payroll-attendance.controller.ts |  |
| POST | /payroll/calculation/preview | AppModule | apps/api/src/payroll/calculation/payroll-calculation.controller.ts |  |
| POST | /payroll/calculation/calculate | AppModule | apps/api/src/payroll/calculation/payroll-calculation.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/items | AppModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts |  |
| GET | /payroll/items/run/:payrollRunId | AppModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/items/:id | AppModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/items | AppModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/items/:id | AppModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts | Permission.PAYROLL_CREATE |
| DELETE | /payroll/items/:id | AppModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /payroll/periods | AppModule | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts |  |
| GET | /payroll/periods/:id | AppModule | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/periods | AppModule | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/periods/:id | AppModule | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts | Permission.PAYROLL_CREATE |
| DELETE | /payroll/periods/:id | AppModule | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /payroll/profiles | AppModule | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts |  |
| GET | /payroll/profiles/:id | AppModule | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/profiles | AppModule | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/profiles/:id | AppModule | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts | Permission.PAYROLL_CREATE |
| DELETE | /payroll/profiles/:id | AppModule | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /payroll/runs | AppModule | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts |  |
| GET | /payroll/runs/:id | AppModule | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/runs | AppModule | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/runs/:id | AppModule | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts | Permission.PAYROLL_CREATE |
| DELETE | /payroll/runs/:id | AppModule | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /payroll/payslips | AppModule | apps/api/src/payroll/payslips/payslips.controller.ts |  |
| GET | /payroll/payslips/employee/:employeeId | AppModule | apps/api/src/payroll/payslips/payslips.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/payslips/:id | AppModule | apps/api/src/payroll/payslips/payslips.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/payslips/:id/pdf-payload | AppModule | apps/api/src/payroll/payslips/payslips.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/payslips/:id | AppModule | apps/api/src/payroll/payslips/payslips.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/payslips/run/:payrollRunId/issue | AppModule | apps/api/src/payroll/payslips/payslips.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /payroll/reports/dashboard | AppModule | apps/api/src/payroll/reports/payroll-reports.controller.ts |  |
| GET | /payroll/reports/salary | AppModule | apps/api/src/payroll/reports/payroll-reports.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/reports/departments | AppModule | apps/api/src/payroll/reports/payroll-reports.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/reports/cost-centers | AppModule | apps/api/src/payroll/reports/payroll-reports.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/reports/monthly | AppModule | apps/api/src/payroll/reports/payroll-reports.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/salary-components | AppModule | apps/api/src/payroll/salary-components/salary-components.controller.ts |  |
| GET | /payroll/salary-components/:id | AppModule | apps/api/src/payroll/salary-components/salary-components.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/salary-components | AppModule | apps/api/src/payroll/salary-components/salary-components.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/salary-components/:id | AppModule | apps/api/src/payroll/salary-components/salary-components.controller.ts | Permission.PAYROLL_CREATE |
| DELETE | /payroll/salary-components/:id | AppModule | apps/api/src/payroll/salary-components/salary-components.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /performance/cycles | AppModule | apps/api/src/performance/cycles/performance-cycles.controller.ts |  |
| GET | /performance/cycles/:id | AppModule | apps/api/src/performance/cycles/performance-cycles.controller.ts | Permission.PERFORMANCE_READ |
| POST | /performance/cycles | AppModule | apps/api/src/performance/cycles/performance-cycles.controller.ts | Permission.PERFORMANCE_READ |
| PATCH | /performance/cycles/:id | AppModule | apps/api/src/performance/cycles/performance-cycles.controller.ts | Permission.PERFORMANCE_CREATE |
| DELETE | /performance/cycles/:id | AppModule | apps/api/src/performance/cycles/performance-cycles.controller.ts | Permission.PERFORMANCE_UPDATE |
| GET | /performance/dashboard/summary | AppModule | apps/api/src/performance/dashboard/performance-dashboard.controller.ts |  |
| GET | /performance/goals | AppModule | apps/api/src/performance/goals/performance-goals.controller.ts |  |
| GET | /performance/goals/:id | AppModule | apps/api/src/performance/goals/performance-goals.controller.ts | Permission.PERFORMANCE_READ |
| POST | /performance/goals | AppModule | apps/api/src/performance/goals/performance-goals.controller.ts | Permission.PERFORMANCE_READ |
| PATCH | /performance/goals/:id | AppModule | apps/api/src/performance/goals/performance-goals.controller.ts | Permission.PERFORMANCE_CREATE |
| DELETE | /performance/goals/:id | AppModule | apps/api/src/performance/goals/performance-goals.controller.ts | Permission.PERFORMANCE_UPDATE |
| GET | /performance/review-items | AppModule | apps/api/src/performance/review-items/performance-review-items.controller.ts |  |
| GET | /performance/review-items/:id | AppModule | apps/api/src/performance/review-items/performance-review-items.controller.ts | Permission.PERFORMANCE_READ |
| POST | /performance/review-items | AppModule | apps/api/src/performance/review-items/performance-review-items.controller.ts | Permission.PERFORMANCE_READ |
| PATCH | /performance/review-items/:id | AppModule | apps/api/src/performance/review-items/performance-review-items.controller.ts | Permission.PERFORMANCE_CREATE |
| DELETE | /performance/review-items/:id | AppModule | apps/api/src/performance/review-items/performance-review-items.controller.ts | Permission.PERFORMANCE_UPDATE |
| GET | /performance/reviews | AppModule | apps/api/src/performance/reviews/performance-reviews.controller.ts |  |
| GET | /performance/reviews/:id | AppModule | apps/api/src/performance/reviews/performance-reviews.controller.ts | Permission.PERFORMANCE_READ |
| POST | /performance/reviews | AppModule | apps/api/src/performance/reviews/performance-reviews.controller.ts | Permission.PERFORMANCE_READ |
| PATCH | /performance/reviews/:id | AppModule | apps/api/src/performance/reviews/performance-reviews.controller.ts | Permission.PERFORMANCE_CREATE |
| DELETE | /performance/reviews/:id | AppModule | apps/api/src/performance/reviews/performance-reviews.controller.ts | Permission.PERFORMANCE_UPDATE |
| GET | /performance-optimization/queries/recommendations | AppModule | apps/api/src/performance-optimization/performance-optimization.controller.ts |  |
| GET | /performance-optimization/cache | AppModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_READ |
| GET | /performance-optimization/cache/stats | AppModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| GET | /performance-optimization/cache/:key | AppModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_READ |
| POST | /performance-optimization/cache | AppModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| POST | /performance-optimization/cache/invalidate | AppModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| POST | /performance-optimization/batch/plan | AppModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| POST | /performance-optimization/lazy-loading/plan | AppModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE |
| GET | /performance-optimization/memory | AppModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE |
| GET | /performance-optimization/metrics | AppModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_READ |
| POST | /performance-optimization/metrics | AppModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_METRICS |
| GET | /permissions | AppModule | apps/api/src/permissions/permissions.controller.ts |  |
| GET | /permissions/:id | AppModule | apps/api/src/permissions/permissions.controller.ts | Permission.PERMISSIONS_READ |
| POST | /permissions | AppModule | apps/api/src/permissions/permissions.controller.ts | Permission.PERMISSIONS_READ |
| PATCH | /permissions/:id | AppModule | apps/api/src/permissions/permissions.controller.ts | Permission.PERMISSIONS_CREATE |
| DELETE | /permissions/:id | AppModule | apps/api/src/permissions/permissions.controller.ts | Permission.PERMISSIONS_UPDATE |
| GET | /plugins/manifests | AppModule | apps/api/src/plugins/plugins.controller.ts |  |
| POST | /plugins/manifests | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/manifests/:id | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_CREATE |
| DELETE | /plugins/manifests/:id | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| POST | /plugins/manifests/:id/restore | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_DELETE |
| POST | /plugins/manifests/:id/load | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| GET | /plugins/registry | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| POST | /plugins/registry/:id/enable | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| POST | /plugins/registry/:id/disable | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| POST | /plugins/registry/:id/unload | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| GET | /plugins/registry/:id/lifecycle-events | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| GET | /plugins/sdk/event-subscriptions | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| POST | /plugins/sdk/event-subscriptions | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/sdk/event-subscriptions/:id | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| DELETE | /plugins/sdk/event-subscriptions/:id | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| GET | /plugins/sdk/hooks | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_DELETE |
| POST | /plugins/sdk/hooks | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/sdk/hooks/:id | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| DELETE | /plugins/sdk/hooks/:id | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| GET | /plugins/sdk/service-bindings | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_DELETE |
| POST | /plugins/sdk/service-bindings | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/sdk/service-bindings/:id | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| DELETE | /plugins/sdk/service-bindings/:id | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| GET | /plugins/sdk/permission-grants | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_DELETE |
| POST | /plugins/sdk/permission-grants | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| DELETE | /plugins/sdk/permission-grants/:id | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_GOVERN |
| GET | /plugins/sdk/configurations | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_GOVERN |
| POST | /plugins/sdk/configurations | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/sdk/configurations/:id | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| DELETE | /plugins/sdk/configurations/:id | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| POST | /plugins/sdk/events | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_DELETE |
| GET | /plugins/sdk/events | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| GET | /plugins/marketplace/packages | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| POST | /plugins/marketplace/packages | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/marketplace/packages/:id | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_CREATE |
| GET | /plugins/marketplace/versions | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| POST | /plugins/marketplace/versions | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/marketplace/versions/:id | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_CREATE |
| POST | /plugins/marketplace/versions/:id/install | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| GET | /plugins/marketplace/installations | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| POST | /plugins/marketplace/installations/:id/enable | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| POST | /plugins/marketplace/installations/:id/disable | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| POST | /plugins/marketplace/installations/:id/uninstall | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| POST | /plugins/marketplace/installations/:id/upgrade | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_DELETE |
| GET | /plugins/isolation/sandbox-policies | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| POST | /plugins/isolation/sandbox-policies | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| GET | /plugins/isolation/dependencies | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_GOVERN |
| POST | /plugins/isolation/dependencies | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/isolation/dependencies/:id | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| POST | /plugins/isolation/registry/:id/validate-dependencies | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| GET | /plugins/isolation/capability-grants | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| POST | /plugins/isolation/capability-grants | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| DELETE | /plugins/isolation/capability-grants/:id | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_GOVERN |
| POST | /plugins/isolation/registry/:id/validate | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_GOVERN |
| POST | /plugins/management/upload | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| GET | /plugins/management/registry/:id/health | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_CREATE |
| GET | /plugins/management/metrics | AppModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| GET | /public-api/registry/groups | AppModule | apps/api/src/public-api/public-api.controller.ts |  |
| POST | /public-api/registry/groups | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_READ |
| PATCH | /public-api/registry/groups/:id | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_CREATE |
| DELETE | /public-api/registry/groups/:id | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_UPDATE |
| GET | /public-api/registry/apis | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_DELETE |
| POST | /public-api/registry/apis | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_READ |
| PATCH | /public-api/registry/apis/:id | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_CREATE |
| DELETE | /public-api/registry/apis/:id | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_UPDATE |
| GET | /public-api/registry/versions | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_DELETE |
| POST | /public-api/registry/versions | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_READ |
| PATCH | /public-api/registry/versions/:id | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_CREATE |
| GET | /public-api/keys | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_UPDATE |
| POST | /public-api/keys | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_KEYS |
| POST | /public-api/keys/:id/rotate | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_KEYS |
| POST | /public-api/keys/:id/revoke | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_KEYS |
| GET | /public-api/rate-limits/policies | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_KEYS |
| POST | /public-api/rate-limits/policies | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_ADMIN |
| PATCH | /public-api/rate-limits/policies/:id | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_ADMIN |
| DELETE | /public-api/rate-limits/policies/:id | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_ADMIN |
| POST | /public-api/rate-limits/evaluate | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_ADMIN |
| GET | /public-api/rate-limits/usage | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_ADMIN |
| GET | /public-api/developer/applications | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_READ |
| POST | /public-api/developer/applications | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_READ |
| PATCH | /public-api/developer/applications/:id | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_CREATE |
| DELETE | /public-api/developer/applications/:id | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_UPDATE |
| POST | /public-api/developer/applications/:id/keys | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_DELETE |
| POST | /public-api/developer/applications/:id/keys/:keyId/revoke | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_KEYS |
| GET | /public-api/developer/applications/:id/usage | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_KEYS |
| POST | /public-api/security/verify-signature | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_READ |
| GET | /public-api/security/request-logs | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_ADMIN |
| POST | /public-api/security/request-logs | AppModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_ADMIN |
| GET | /recruitment/applicants | AppModule | apps/api/src/recruitment/applicants/applicants.controller.ts |  |
| GET | /recruitment/applicants/:id | AppModule | apps/api/src/recruitment/applicants/applicants.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/applicants | AppModule | apps/api/src/recruitment/applicants/applicants.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/applicants/:id | AppModule | apps/api/src/recruitment/applicants/applicants.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/applicants/:id | AppModule | apps/api/src/recruitment/applicants/applicants.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/applications | AppModule | apps/api/src/recruitment/applications/applications.controller.ts |  |
| GET | /recruitment/applications/:id | AppModule | apps/api/src/recruitment/applications/applications.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/applications | AppModule | apps/api/src/recruitment/applications/applications.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/applications/:id | AppModule | apps/api/src/recruitment/applications/applications.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/applications/:id | AppModule | apps/api/src/recruitment/applications/applications.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/dashboard/summary | AppModule | apps/api/src/recruitment/dashboard/recruitment-dashboard.controller.ts |  |
| POST | /recruitment/hiring/hire | AppModule | apps/api/src/recruitment/hiring/hiring.controller.ts |  |
| GET | /recruitment/interview-evaluations | AppModule | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts |  |
| GET | /recruitment/interview-evaluations/:id | AppModule | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/interview-evaluations | AppModule | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/interview-evaluations/:id | AppModule | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/interview-evaluations/:id | AppModule | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/interviews | AppModule | apps/api/src/recruitment/interviews/interviews.controller.ts |  |
| GET | /recruitment/interviews/:id | AppModule | apps/api/src/recruitment/interviews/interviews.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/interviews | AppModule | apps/api/src/recruitment/interviews/interviews.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/interviews/:id | AppModule | apps/api/src/recruitment/interviews/interviews.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/interviews/:id | AppModule | apps/api/src/recruitment/interviews/interviews.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/job-positions | AppModule | apps/api/src/recruitment/job-positions/job-positions.controller.ts |  |
| GET | /recruitment/job-positions/:id | AppModule | apps/api/src/recruitment/job-positions/job-positions.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/job-positions | AppModule | apps/api/src/recruitment/job-positions/job-positions.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/job-positions/:id | AppModule | apps/api/src/recruitment/job-positions/job-positions.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/job-positions/:id | AppModule | apps/api/src/recruitment/job-positions/job-positions.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/offer-letters | AppModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts |  |
| GET | /recruitment/offer-letters/:id | AppModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/offer-letters | AppModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/offer-letters/:id | AppModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_CREATE |
| POST | /recruitment/offer-letters/:id/send | AppModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_UPDATE |
| POST | /recruitment/offer-letters/:id/accept | AppModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_UPDATE |
| POST | /recruitment/offer-letters/:id/reject | AppModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_UPDATE |
| DELETE | /recruitment/offer-letters/:id | AppModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/vacancies | AppModule | apps/api/src/recruitment/vacancies/vacancies.controller.ts |  |
| GET | /recruitment/vacancies/:id | AppModule | apps/api/src/recruitment/vacancies/vacancies.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/vacancies | AppModule | apps/api/src/recruitment/vacancies/vacancies.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/vacancies/:id | AppModule | apps/api/src/recruitment/vacancies/vacancies.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/vacancies/:id | AppModule | apps/api/src/recruitment/vacancies/vacancies.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /reporting/dashboards/executive | AppModule | apps/api/src/reporting/dashboards/reporting-dashboards.controller.ts |  |
| GET | /reporting/dashboards/hr | AppModule | apps/api/src/reporting/dashboards/reporting-dashboards.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/dashboards/payroll | AppModule | apps/api/src/reporting/dashboards/reporting-dashboards.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/dashboards/accounting | AppModule | apps/api/src/reporting/dashboards/reporting-dashboards.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/categories | AppModule | apps/api/src/reporting/definitions/report-definitions.controller.ts |  |
| POST | /reporting/categories | AppModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_READ |
| PATCH | /reporting/categories/:id | AppModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_CREATE |
| GET | /reporting/definitions | AppModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_UPDATE |
| GET | /reporting/definitions/:id | AppModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_READ |
| POST | /reporting/definitions | AppModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_READ |
| PATCH | /reporting/definitions/:id | AppModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_CREATE |
| GET | /reporting/executions | AppModule | apps/api/src/reporting/execution/report-execution.controller.ts |  |
| GET | /reporting/executions/:id | AppModule | apps/api/src/reporting/execution/report-execution.controller.ts | Permission.REPORTING_READ |
| POST | /reporting/executions | AppModule | apps/api/src/reporting/execution/report-execution.controller.ts | Permission.REPORTING_READ |
| POST | /reporting/exports | AppModule | apps/api/src/reporting/exports/report-export.controller.ts |  |
| GET | /reporting/finance/payroll-summary | AppModule | apps/api/src/reporting/finance/finance-reports.controller.ts |  |
| GET | /reporting/finance/payslip-summary | AppModule | apps/api/src/reporting/finance/finance-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/finance/trial-balance | AppModule | apps/api/src/reporting/finance/finance-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/finance/general-ledger | AppModule | apps/api/src/reporting/finance/finance-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/finance/cost-centers | AppModule | apps/api/src/reporting/finance/finance-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/hr/employees | AppModule | apps/api/src/reporting/hr/hr-reports.controller.ts |  |
| GET | /reporting/hr/attendance | AppModule | apps/api/src/reporting/hr/hr-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/hr/leave | AppModule | apps/api/src/reporting/hr/hr-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/hr/recruitment | AppModule | apps/api/src/reporting/hr/hr-reports.controller.ts | Permission.REPORTING_READ |
| GET | /roles | AppModule | apps/api/src/roles/roles.controller.ts |  |
| GET | /roles/:id | AppModule | apps/api/src/roles/roles.controller.ts | Permission.ROLES_READ |
| POST | /roles | AppModule | apps/api/src/roles/roles.controller.ts | Permission.ROLES_READ |
| PATCH | /roles/:id | AppModule | apps/api/src/roles/roles.controller.ts | Permission.ROLES_CREATE |
| DELETE | /roles/:id | AppModule | apps/api/src/roles/roles.controller.ts | Permission.ROLES_UPDATE |
| GET | /scheduler/crons | AppModule | apps/api/src/scheduler/scheduler.controller.ts |  |
| POST | /scheduler/crons | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_READ |
| PATCH | /scheduler/crons/:id | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_CREATE |
| DELETE | /scheduler/crons/:id | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_UPDATE |
| GET | /scheduler/jobs | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_DELETE |
| POST | /scheduler/jobs | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_READ |
| PATCH | /scheduler/jobs/:id | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_CREATE |
| POST | /scheduler/jobs/:id/cancel | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_UPDATE |
| GET | /scheduler/history | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_EXECUTE |
| POST | /scheduler/queue/claim | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_READ |
| POST | /scheduler/jobs/:id/complete | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_EXECUTE |
| POST | /scheduler/jobs/:id/fail | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_EXECUTE |
| POST | /scheduler/jobs/:id/retry | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_EXECUTE |
| POST | /scheduler/jobs/:id/recover | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_EXECUTE |
| GET | /scheduler/recoveries | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_EXECUTE |
| GET | /scheduler/monitoring/dashboard | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_MONITOR |
| GET | /scheduler/monitoring/queues | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_MONITOR |
| GET | /scheduler/monitoring/failures | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_MONITOR |
| GET | /scheduler/monitoring/system-status | AppModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_MONITOR |
| GET | /search/global | AppModule | apps/api/src/search/search.controller.ts |  |
| GET | /search/employees | AppModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_GLOBAL |
| GET | /search/payroll | AppModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_EMPLOYEES |
| GET | /search/documents | AppModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_PAYROLL |
| GET | /search/workflows | AppModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_DOCUMENTS |
| GET | /search/index | AppModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_WORKFLOWS |
| POST | /search/index | AppModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_ADMIN |
| POST | /search/index/rebuild | AppModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_ADMIN |
| GET | /search/audit | AppModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_ADMIN |
| GET | /tenants | AppModule | apps/api/src/tenants/tenants.controller.ts |  |
| POST | /tenants | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| PATCH | /tenants/:id | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_CREATE |
| DELETE | /tenants/:id | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| POST | /tenants/:id/restore | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_DELETE |
| GET | /tenants/domains | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| POST | /tenants/domains | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| POST | /tenants/resolve | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| GET | /tenants/isolation/companies | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| POST | /tenants/isolation/companies/:companyId/assign | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| GET | /tenants/isolation/branches | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| POST | /tenants/isolation/branches/:branchId/assign | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| POST | /tenants/isolation/validate | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| GET | /tenants/configuration/settings | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_SECURITY |
| POST | /tenants/configuration/settings | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| PATCH | /tenants/configuration/settings/:id | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| DELETE | /tenants/configuration/settings/:id | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| GET | /tenants/configuration/feature-flags | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_DELETE |
| POST | /tenants/configuration/feature-flags | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| PATCH | /tenants/configuration/feature-flags/:id | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| DELETE | /tenants/configuration/feature-flags/:id | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| GET | /tenants/configuration/localizations | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_DELETE |
| POST | /tenants/configuration/localizations | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| PATCH | /tenants/configuration/localizations/:id | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| POST | /tenants/configuration/branding | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| POST | /tenants/administration/provision | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| POST | /tenants/administration/:id/activate | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_PROVISION |
| POST | /tenants/administration/:id/suspend | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_PROVISION |
| POST | /tenants/administration/:id/resume | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_PROVISION |
| POST | /tenants/administration/:id/archive | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_PROVISION |
| GET | /tenants/administration/usage-limits | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_PROVISION |
| POST | /tenants/administration/usage-limits | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| PATCH | /tenants/administration/usage-limits/:id | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| DELETE | /tenants/administration/usage-limits/:id | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| GET | /tenants/administration/events | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_DELETE |
| POST | /tenants/administration/events | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| GET | /tenants/security/permission-policies | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_PROVISION |
| POST | /tenants/security/permission-policies | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_SECURITY |
| PATCH | /tenants/security/permission-policies/:id | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_SECURITY |
| DELETE | /tenants/security/permission-policies/:id | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_SECURITY |
| POST | /tenants/security/validate | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_SECURITY |
| GET | /tenants/security/audit-events | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_SECURITY |
| POST | /tenants/security/audit-events | AppModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_SECURITY |
| GET | /users | AppModule | apps/api/src/users/users.controller.ts |  |
| GET | /users/:id | AppModule | apps/api/src/users/users.controller.ts | Permission.USERS_READ |
| POST | /users | AppModule | apps/api/src/users/users.controller.ts | Permission.USERS_READ |
| PATCH | /users/:id | AppModule | apps/api/src/users/users.controller.ts | Permission.USERS_CREATE |
| DELETE | /users/:id | AppModule | apps/api/src/users/users.controller.ts | Permission.USERS_UPDATE |
| GET | /workflows/dashboard | AppModule | apps/api/src/workflows/dashboard/workflow-dashboard.controller.ts |  |
| GET | /workflows/definitions | AppModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts |  |
| GET | /workflows/definitions/:id | AppModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_READ |
| POST | /workflows/definitions | AppModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_READ |
| PATCH | /workflows/definitions/:id | AppModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_CREATE |
| POST | /workflows/definitions/:id/activate | AppModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_UPDATE |
| POST | /workflows/definitions/:id/archive | AppModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_UPDATE |
| POST | /workflows/definitions/:id/steps | AppModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_UPDATE |
| PATCH | /workflows/definitions/:id/steps/:stepId | AppModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_UPDATE |
| DELETE | /workflows/definitions/:id/steps/:stepId | AppModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_UPDATE |
| GET | /workflows/requests | AppModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts |  |
| GET | /workflows/requests/:id | AppModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_READ |
| GET | /workflows/requests/:id/history | AppModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_READ |
| POST | /workflows/requests | AppModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_READ |
| POST | /workflows/requests/:id/steps/:stepId/approve | AppModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_CREATE |
| POST | /workflows/requests/:id/steps/:stepId/reject | AppModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_UPDATE |
| POST | /workflows/requests/:id/cancel | AppModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_UPDATE |
| GET | /assets | AssetItemsModule | apps/api/src/assets/assets/assets.controller.ts |  |
| GET | /assets/:id | AssetItemsModule | apps/api/src/assets/assets/assets.controller.ts | Permission.ASSETS_READ |
| POST | /assets | AssetItemsModule | apps/api/src/assets/assets/assets.controller.ts | Permission.ASSETS_READ |
| PATCH | /assets/:id | AssetItemsModule | apps/api/src/assets/assets/assets.controller.ts | Permission.ASSETS_CREATE |
| DELETE | /assets/:id | AssetItemsModule | apps/api/src/assets/assets/assets.controller.ts | Permission.ASSETS_UPDATE |
| GET | /assets | AssetsModule | apps/api/src/assets/assets/assets.controller.ts |  |
| GET | /assets/:id | AssetsModule | apps/api/src/assets/assets/assets.controller.ts | Permission.ASSETS_READ |
| POST | /assets | AssetsModule | apps/api/src/assets/assets/assets.controller.ts | Permission.ASSETS_READ |
| PATCH | /assets/:id | AssetsModule | apps/api/src/assets/assets/assets.controller.ts | Permission.ASSETS_CREATE |
| DELETE | /assets/:id | AssetsModule | apps/api/src/assets/assets/assets.controller.ts | Permission.ASSETS_UPDATE |
| GET | /assets/assignments | AssetsModule | apps/api/src/assets/assignments/asset-assignments.controller.ts |  |
| GET | /assets/assignments/:id | AssetsModule | apps/api/src/assets/assignments/asset-assignments.controller.ts | Permission.ASSETS_READ |
| POST | /assets/assignments | AssetsModule | apps/api/src/assets/assignments/asset-assignments.controller.ts | Permission.ASSETS_READ |
| POST | /assets/assignments/:id/return | AssetsModule | apps/api/src/assets/assignments/asset-assignments.controller.ts | Permission.ASSETS_CREATE |
| POST | /assets/assignments/:id/lost | AssetsModule | apps/api/src/assets/assignments/asset-assignments.controller.ts | Permission.ASSETS_UPDATE |
| DELETE | /assets/assignments/:id | AssetsModule | apps/api/src/assets/assignments/asset-assignments.controller.ts | Permission.ASSETS_UPDATE |
| GET | /assets/categories | AssetsModule | apps/api/src/assets/categories/asset-categories.controller.ts |  |
| GET | /assets/categories/:id | AssetsModule | apps/api/src/assets/categories/asset-categories.controller.ts | Permission.ASSETS_READ |
| POST | /assets/categories | AssetsModule | apps/api/src/assets/categories/asset-categories.controller.ts | Permission.ASSETS_READ |
| PATCH | /assets/categories/:id | AssetsModule | apps/api/src/assets/categories/asset-categories.controller.ts | Permission.ASSETS_CREATE |
| DELETE | /assets/categories/:id | AssetsModule | apps/api/src/assets/categories/asset-categories.controller.ts | Permission.ASSETS_UPDATE |
| GET | /assets/dashboard/summary | AssetsModule | apps/api/src/assets/dashboard/assets-dashboard.controller.ts |  |
| GET | /assets/maintenance | AssetsModule | apps/api/src/assets/maintenance/asset-maintenance.controller.ts |  |
| GET | /assets/maintenance/:id | AssetsModule | apps/api/src/assets/maintenance/asset-maintenance.controller.ts | Permission.ASSETS_READ |
| POST | /assets/maintenance | AssetsModule | apps/api/src/assets/maintenance/asset-maintenance.controller.ts | Permission.ASSETS_READ |
| PATCH | /assets/maintenance/:id | AssetsModule | apps/api/src/assets/maintenance/asset-maintenance.controller.ts | Permission.ASSETS_CREATE |
| DELETE | /assets/maintenance/:id | AssetsModule | apps/api/src/assets/maintenance/asset-maintenance.controller.ts | Permission.ASSETS_UPDATE |
| GET | /assets/assignments | AssetAssignmentsModule | apps/api/src/assets/assignments/asset-assignments.controller.ts |  |
| GET | /assets/assignments/:id | AssetAssignmentsModule | apps/api/src/assets/assignments/asset-assignments.controller.ts | Permission.ASSETS_READ |
| POST | /assets/assignments | AssetAssignmentsModule | apps/api/src/assets/assignments/asset-assignments.controller.ts | Permission.ASSETS_READ |
| POST | /assets/assignments/:id/return | AssetAssignmentsModule | apps/api/src/assets/assignments/asset-assignments.controller.ts | Permission.ASSETS_CREATE |
| POST | /assets/assignments/:id/lost | AssetAssignmentsModule | apps/api/src/assets/assignments/asset-assignments.controller.ts | Permission.ASSETS_UPDATE |
| DELETE | /assets/assignments/:id | AssetAssignmentsModule | apps/api/src/assets/assignments/asset-assignments.controller.ts | Permission.ASSETS_UPDATE |
| GET | /assets/categories | AssetCategoriesModule | apps/api/src/assets/categories/asset-categories.controller.ts |  |
| GET | /assets/categories/:id | AssetCategoriesModule | apps/api/src/assets/categories/asset-categories.controller.ts | Permission.ASSETS_READ |
| POST | /assets/categories | AssetCategoriesModule | apps/api/src/assets/categories/asset-categories.controller.ts | Permission.ASSETS_READ |
| PATCH | /assets/categories/:id | AssetCategoriesModule | apps/api/src/assets/categories/asset-categories.controller.ts | Permission.ASSETS_CREATE |
| DELETE | /assets/categories/:id | AssetCategoriesModule | apps/api/src/assets/categories/asset-categories.controller.ts | Permission.ASSETS_UPDATE |
| GET | /assets/dashboard/summary | AssetsDashboardModule | apps/api/src/assets/dashboard/assets-dashboard.controller.ts |  |
| GET | /assets/maintenance | AssetMaintenanceModule | apps/api/src/assets/maintenance/asset-maintenance.controller.ts |  |
| GET | /assets/maintenance/:id | AssetMaintenanceModule | apps/api/src/assets/maintenance/asset-maintenance.controller.ts | Permission.ASSETS_READ |
| POST | /assets/maintenance | AssetMaintenanceModule | apps/api/src/assets/maintenance/asset-maintenance.controller.ts | Permission.ASSETS_READ |
| PATCH | /assets/maintenance/:id | AssetMaintenanceModule | apps/api/src/assets/maintenance/asset-maintenance.controller.ts | Permission.ASSETS_CREATE |
| DELETE | /assets/maintenance/:id | AssetMaintenanceModule | apps/api/src/assets/maintenance/asset-maintenance.controller.ts | Permission.ASSETS_UPDATE |
| GET | /attendance/holidays | AttendanceModule | apps/api/src/attendance/holidays/holidays.controller.ts |  |
| GET | /attendance/holidays/:id | AttendanceModule | apps/api/src/attendance/holidays/holidays.controller.ts | Permission.ATTENDANCE_READ |
| POST | /attendance/holidays | AttendanceModule | apps/api/src/attendance/holidays/holidays.controller.ts | Permission.ATTENDANCE_READ |
| PATCH | /attendance/holidays/:id | AttendanceModule | apps/api/src/attendance/holidays/holidays.controller.ts | Permission.ATTENDANCE_CREATE |
| DELETE | /attendance/holidays/:id | AttendanceModule | apps/api/src/attendance/holidays/holidays.controller.ts | Permission.ATTENDANCE_UPDATE |
| GET | /attendance/records | AttendanceModule | apps/api/src/attendance/records/attendance-records.controller.ts |  |
| GET | /attendance/records/:id | AttendanceModule | apps/api/src/attendance/records/attendance-records.controller.ts | Permission.ATTENDANCE_READ |
| POST | /attendance/records | AttendanceModule | apps/api/src/attendance/records/attendance-records.controller.ts | Permission.ATTENDANCE_READ |
| PATCH | /attendance/records/:id | AttendanceModule | apps/api/src/attendance/records/attendance-records.controller.ts | Permission.ATTENDANCE_CREATE |
| DELETE | /attendance/records/:id | AttendanceModule | apps/api/src/attendance/records/attendance-records.controller.ts | Permission.ATTENDANCE_UPDATE |
| GET | /attendance/shifts | AttendanceModule | apps/api/src/attendance/shifts/shifts.controller.ts |  |
| GET | /attendance/shifts/:id | AttendanceModule | apps/api/src/attendance/shifts/shifts.controller.ts | Permission.ATTENDANCE_READ |
| POST | /attendance/shifts | AttendanceModule | apps/api/src/attendance/shifts/shifts.controller.ts | Permission.ATTENDANCE_READ |
| PATCH | /attendance/shifts/:id | AttendanceModule | apps/api/src/attendance/shifts/shifts.controller.ts | Permission.ATTENDANCE_CREATE |
| DELETE | /attendance/shifts/:id | AttendanceModule | apps/api/src/attendance/shifts/shifts.controller.ts | Permission.ATTENDANCE_UPDATE |
| GET | /attendance/holidays | HolidaysModule | apps/api/src/attendance/holidays/holidays.controller.ts |  |
| GET | /attendance/holidays/:id | HolidaysModule | apps/api/src/attendance/holidays/holidays.controller.ts | Permission.ATTENDANCE_READ |
| POST | /attendance/holidays | HolidaysModule | apps/api/src/attendance/holidays/holidays.controller.ts | Permission.ATTENDANCE_READ |
| PATCH | /attendance/holidays/:id | HolidaysModule | apps/api/src/attendance/holidays/holidays.controller.ts | Permission.ATTENDANCE_CREATE |
| DELETE | /attendance/holidays/:id | HolidaysModule | apps/api/src/attendance/holidays/holidays.controller.ts | Permission.ATTENDANCE_UPDATE |
| GET | /attendance/records | AttendanceRecordsModule | apps/api/src/attendance/records/attendance-records.controller.ts |  |
| GET | /attendance/records/:id | AttendanceRecordsModule | apps/api/src/attendance/records/attendance-records.controller.ts | Permission.ATTENDANCE_READ |
| POST | /attendance/records | AttendanceRecordsModule | apps/api/src/attendance/records/attendance-records.controller.ts | Permission.ATTENDANCE_READ |
| PATCH | /attendance/records/:id | AttendanceRecordsModule | apps/api/src/attendance/records/attendance-records.controller.ts | Permission.ATTENDANCE_CREATE |
| DELETE | /attendance/records/:id | AttendanceRecordsModule | apps/api/src/attendance/records/attendance-records.controller.ts | Permission.ATTENDANCE_UPDATE |
| GET | /attendance/shifts | ShiftsModule | apps/api/src/attendance/shifts/shifts.controller.ts |  |
| GET | /attendance/shifts/:id | ShiftsModule | apps/api/src/attendance/shifts/shifts.controller.ts | Permission.ATTENDANCE_READ |
| POST | /attendance/shifts | ShiftsModule | apps/api/src/attendance/shifts/shifts.controller.ts | Permission.ATTENDANCE_READ |
| PATCH | /attendance/shifts/:id | ShiftsModule | apps/api/src/attendance/shifts/shifts.controller.ts | Permission.ATTENDANCE_CREATE |
| DELETE | /attendance/shifts/:id | ShiftsModule | apps/api/src/attendance/shifts/shifts.controller.ts | Permission.ATTENDANCE_UPDATE |
| POST | /auth/login | AuthModule | apps/api/src/auth/auth.controller.ts |  |
| GET | /bi/kpis | BiModule | apps/api/src/bi/bi.controller.ts |  |
| POST | /bi/kpis | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_READ |
| PATCH | /bi/kpis/:id | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| POST | /bi/kpis/:id/archive | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| POST | /bi/kpis/:id/snapshots | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| GET | /bi/kpis/:id/snapshots | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_EXECUTE |
| GET | /bi/datasets | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_READ |
| POST | /bi/datasets | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_READ |
| PATCH | /bi/datasets/:id | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| POST | /bi/datasets/:id/run | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| GET | /bi/metrics | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_EXECUTE |
| POST | /bi/metrics | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_READ |
| PATCH | /bi/metrics/:id | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| POST | /bi/metrics/:id/observations | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| GET | /bi/dashboards | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_EXECUTE |
| POST | /bi/dashboards | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_DASHBOARD |
| POST | /bi/dashboards/:id/widgets | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| GET | /bi/dashboards/executive/summary | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_MANAGE |
| GET | /bi/kpis/:id/trend | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_DASHBOARD |
| GET | /bi/metrics/:id/trend | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_READ |
| GET | /bi/predictions/models | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_READ |
| POST | /bi/predictions/models | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_PREDICT |
| POST | /bi/predictions/models/:id/run | BiModule | apps/api/src/bi/bi.controller.ts | Permission.BI_PREDICT |
| GET | /business-rules/categories | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts |  |
| POST | /business-rules/categories | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_READ |
| PATCH | /business-rules/categories/:id | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_CREATE |
| DELETE | /business-rules/categories/:id | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_UPDATE |
| POST | /business-rules/categories/:id/restore | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_DELETE |
| GET | /business-rules/executions | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_UPDATE |
| GET | /business-rules/dashboard | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_READ |
| GET | /business-rules | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_READ |
| POST | /business-rules/evaluate | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_READ |
| GET | /business-rules/:id/conditions | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_EXECUTE |
| POST | /business-rules/:id/conditions | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_READ |
| PATCH | /business-rules/:id/conditions/:conditionId | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_UPDATE |
| DELETE | /business-rules/:id/conditions/:conditionId | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_UPDATE |
| GET | /business-rules/:id/actions | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_DELETE |
| POST | /business-rules/:id/actions | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_READ |
| PATCH | /business-rules/:id/actions/:actionId | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_UPDATE |
| DELETE | /business-rules/:id/actions/:actionId | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_UPDATE |
| GET | /business-rules/:id | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_DELETE |
| POST | /business-rules | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_READ |
| PATCH | /business-rules/:id | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_CREATE |
| DELETE | /business-rules/:id | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_UPDATE |
| POST | /business-rules/:id/restore | BusinessRulesModule | apps/api/src/business-rules/business-rules.controller.ts | Permission.BUSINESS_RULES_DELETE |
| GET | /documents/categories | DocumentCategoriesModule | apps/api/src/documents/categories/document-categories.controller.ts |  |
| GET | /documents/categories/:id | DocumentCategoriesModule | apps/api/src/documents/categories/document-categories.controller.ts | Permission.DOCUMENTS_READ |
| POST | /documents/categories | DocumentCategoriesModule | apps/api/src/documents/categories/document-categories.controller.ts | Permission.DOCUMENTS_READ |
| PATCH | /documents/categories/:id | DocumentCategoriesModule | apps/api/src/documents/categories/document-categories.controller.ts | Permission.DOCUMENTS_CREATE |
| DELETE | /documents/categories/:id | DocumentCategoriesModule | apps/api/src/documents/categories/document-categories.controller.ts | Permission.DOCUMENTS_UPDATE |
| GET | /documents/dashboard/summary | DocumentsDashboardModule | apps/api/src/documents/dashboard/documents-dashboard.controller.ts |  |
| GET | /documents | DocumentItemsModule | apps/api/src/documents/documents/documents.controller.ts |  |
| GET | /documents/:id | DocumentItemsModule | apps/api/src/documents/documents/documents.controller.ts | Permission.DOCUMENTS_READ |
| POST | /documents | DocumentItemsModule | apps/api/src/documents/documents/documents.controller.ts | Permission.DOCUMENTS_READ |
| PATCH | /documents/:id | DocumentItemsModule | apps/api/src/documents/documents/documents.controller.ts | Permission.DOCUMENTS_CREATE |
| POST | /documents/:id/archive | DocumentItemsModule | apps/api/src/documents/documents/documents.controller.ts | Permission.DOCUMENTS_UPDATE |
| DELETE | /documents/:id | DocumentItemsModule | apps/api/src/documents/documents/documents.controller.ts | Permission.DOCUMENTS_UPDATE |
| GET | /documents/categories | DocumentsModule | apps/api/src/documents/categories/document-categories.controller.ts |  |
| GET | /documents/categories/:id | DocumentsModule | apps/api/src/documents/categories/document-categories.controller.ts | Permission.DOCUMENTS_READ |
| POST | /documents/categories | DocumentsModule | apps/api/src/documents/categories/document-categories.controller.ts | Permission.DOCUMENTS_READ |
| PATCH | /documents/categories/:id | DocumentsModule | apps/api/src/documents/categories/document-categories.controller.ts | Permission.DOCUMENTS_CREATE |
| DELETE | /documents/categories/:id | DocumentsModule | apps/api/src/documents/categories/document-categories.controller.ts | Permission.DOCUMENTS_UPDATE |
| GET | /documents/dashboard/summary | DocumentsModule | apps/api/src/documents/dashboard/documents-dashboard.controller.ts |  |
| GET | /documents | DocumentsModule | apps/api/src/documents/documents/documents.controller.ts |  |
| GET | /documents/:id | DocumentsModule | apps/api/src/documents/documents/documents.controller.ts | Permission.DOCUMENTS_READ |
| POST | /documents | DocumentsModule | apps/api/src/documents/documents/documents.controller.ts | Permission.DOCUMENTS_READ |
| PATCH | /documents/:id | DocumentsModule | apps/api/src/documents/documents/documents.controller.ts | Permission.DOCUMENTS_CREATE |
| POST | /documents/:id/archive | DocumentsModule | apps/api/src/documents/documents/documents.controller.ts | Permission.DOCUMENTS_UPDATE |
| DELETE | /documents/:id | DocumentsModule | apps/api/src/documents/documents/documents.controller.ts | Permission.DOCUMENTS_UPDATE |
| POST | /documents/expiration/mark-expired | DocumentsModule | apps/api/src/documents/expiration/document-expiration.controller.ts |  |
| GET | /documents/expiration/expired | DocumentsModule | apps/api/src/documents/expiration/document-expiration.controller.ts | Permission.DOCUMENTS_UPDATE |
| GET | /documents/expiration/soon/:days | DocumentsModule | apps/api/src/documents/expiration/document-expiration.controller.ts | Permission.DOCUMENTS_READ |
| GET | /documents/versions | DocumentsModule | apps/api/src/documents/versions/document-versions.controller.ts |  |
| GET | /documents/versions/document/:documentId | DocumentsModule | apps/api/src/documents/versions/document-versions.controller.ts | Permission.DOCUMENTS_READ |
| GET | /documents/versions/:id | DocumentsModule | apps/api/src/documents/versions/document-versions.controller.ts | Permission.DOCUMENTS_READ |
| POST | /documents/versions | DocumentsModule | apps/api/src/documents/versions/document-versions.controller.ts | Permission.DOCUMENTS_READ |
| DELETE | /documents/versions/:id | DocumentsModule | apps/api/src/documents/versions/document-versions.controller.ts | Permission.DOCUMENTS_CREATE |
| POST | /documents/expiration/mark-expired | DocumentExpirationModule | apps/api/src/documents/expiration/document-expiration.controller.ts |  |
| GET | /documents/expiration/expired | DocumentExpirationModule | apps/api/src/documents/expiration/document-expiration.controller.ts | Permission.DOCUMENTS_UPDATE |
| GET | /documents/expiration/soon/:days | DocumentExpirationModule | apps/api/src/documents/expiration/document-expiration.controller.ts | Permission.DOCUMENTS_READ |
| GET | /documents/versions | DocumentVersionsModule | apps/api/src/documents/versions/document-versions.controller.ts |  |
| GET | /documents/versions/document/:documentId | DocumentVersionsModule | apps/api/src/documents/versions/document-versions.controller.ts | Permission.DOCUMENTS_READ |
| GET | /documents/versions/:id | DocumentVersionsModule | apps/api/src/documents/versions/document-versions.controller.ts | Permission.DOCUMENTS_READ |
| POST | /documents/versions | DocumentVersionsModule | apps/api/src/documents/versions/document-versions.controller.ts | Permission.DOCUMENTS_READ |
| DELETE | /documents/versions/:id | DocumentVersionsModule | apps/api/src/documents/versions/document-versions.controller.ts | Permission.DOCUMENTS_CREATE |
| GET | /employees | EmployeesModule | apps/api/src/employees/employees.controller.ts |  |
| GET | /employees/:id | EmployeesModule | apps/api/src/employees/employees.controller.ts | Permission.EMPLOYEES_READ |
| POST | /employees | EmployeesModule | apps/api/src/employees/employees.controller.ts | Permission.EMPLOYEES_READ |
| PATCH | /employees/:id | EmployeesModule | apps/api/src/employees/employees.controller.ts | Permission.EMPLOYEES_CREATE |
| DELETE | /employees/:id | EmployeesModule | apps/api/src/employees/employees.controller.ts | Permission.EMPLOYEES_UPDATE |
| GET | /ess/requests | EssModule | apps/api/src/ess/requests/self-service-requests.controller.ts |  |
| GET | /ess/requests/employee/:employeeId | EssModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_READ |
| GET | /ess/requests/:id | EssModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_READ |
| POST | /ess/requests | EssModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_READ |
| PATCH | /ess/requests/:id | EssModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_CREATE |
| POST | /ess/requests/:id/submit | EssModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_UPDATE |
| POST | /ess/requests/:id/review | EssModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_UPDATE |
| DELETE | /ess/requests/:id | EssModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_UPDATE |
| GET | /ess/requests | SelfServiceRequestsModule | apps/api/src/ess/requests/self-service-requests.controller.ts |  |
| GET | /ess/requests/employee/:employeeId | SelfServiceRequestsModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_READ |
| GET | /ess/requests/:id | SelfServiceRequestsModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_READ |
| POST | /ess/requests | SelfServiceRequestsModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_READ |
| PATCH | /ess/requests/:id | SelfServiceRequestsModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_CREATE |
| POST | /ess/requests/:id/submit | SelfServiceRequestsModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_UPDATE |
| POST | /ess/requests/:id/review | SelfServiceRequestsModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_UPDATE |
| DELETE | /ess/requests/:id | SelfServiceRequestsModule | apps/api/src/ess/requests/self-service-requests.controller.ts | Permission.ESS_UPDATE |
| GET | /integrations/providers | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts |  |
| POST | /integrations/providers | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_READ |
| PATCH | /integrations/providers/:id | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_CREATE |
| DELETE | /integrations/providers/:id | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/providers/:id/restore | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_DELETE |
| POST | /integrations/providers/:id/enable | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/providers/:id/disable | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/credentials | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/credentials | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_READ |
| PATCH | /integrations/credentials/:id | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_CREATE |
| DELETE | /integrations/credentials/:id | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/credentials/:id/restore | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_DELETE |
| POST | /integrations/credentials/:id/enable | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/credentials/:id/disable | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/connections | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/connections | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_READ |
| PATCH | /integrations/connections/:id | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_CREATE |
| DELETE | /integrations/connections/:id | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/connections/:id/restore | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_DELETE |
| POST | /integrations/connections/:id/test | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/connections/:id/connect | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_EXECUTE |
| POST | /integrations/connections/:id/disconnect | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_EXECUTE |
| POST | /integrations/connections/:id/enable | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_EXECUTE |
| POST | /integrations/connections/:id/disable | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/retry-policies | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/retry-policies | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_READ |
| PATCH | /integrations/retry-policies/:id | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_CREATE |
| DELETE | /integrations/retry-policies/:id | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/retry-policies/:id/restore | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_DELETE |
| POST | /integrations/retry-policies/:id/enable | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/retry-policies/:id/disable | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/webhooks | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/webhooks | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_READ |
| PATCH | /integrations/webhooks/:id | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_CREATE |
| DELETE | /integrations/webhooks/:id | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/webhooks/:id/restore | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_DELETE |
| POST | /integrations/webhooks/:id/enable | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/webhooks/:id/disable | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/rest-connectors | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/rest-connectors | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_READ |
| PATCH | /integrations/rest-connectors/:id | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_CREATE |
| DELETE | /integrations/rest-connectors/:id | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/rest-connectors/:id/restore | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_DELETE |
| POST | /integrations/rest-connectors/:id/enable | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/rest-connectors/:id/disable | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/outbound-jobs | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| POST | /integrations/outbound-jobs | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_MONITOR |
| POST | /integrations/outbound-jobs/process-due | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_EXECUTE |
| POST | /integrations/outbound-jobs/:id/execute | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_EXECUTE |
| POST | /integrations/outbound-jobs/:id/retry | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_EXECUTE |
| POST | /integrations/outbound-jobs/:id/cancel | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_EXECUTE |
| POST | /integrations/inbound/:connectionId/webhook | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/inbound-events | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_UPDATE |
| GET | /integrations/executions | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_MONITOR |
| GET | /integrations/dashboard | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_MONITOR |
| GET | /integrations/retry-history | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_MONITOR |
| GET | /integrations/health | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_MONITOR |
| POST | /integrations/connections/:id/health-check | IntegrationsModule | apps/api/src/integrations/integrations.controller.ts | Permission.INTEGRATIONS_MONITOR |
| GET | /leave/balances | LeaveBalancesModule | apps/api/src/leave/leave-balances/leave-balances.controller.ts |  |
| GET | /leave/balances/:id | LeaveBalancesModule | apps/api/src/leave/leave-balances/leave-balances.controller.ts | Permission.LEAVE_READ |
| POST | /leave/balances | LeaveBalancesModule | apps/api/src/leave/leave-balances/leave-balances.controller.ts | Permission.LEAVE_READ |
| PATCH | /leave/balances/:id | LeaveBalancesModule | apps/api/src/leave/leave-balances/leave-balances.controller.ts | Permission.LEAVE_CREATE |
| DELETE | /leave/balances/:id | LeaveBalancesModule | apps/api/src/leave/leave-balances/leave-balances.controller.ts | Permission.LEAVE_UPDATE |
| GET | /leave/requests | LeaveRequestsModule | apps/api/src/leave/leave-requests/leave-requests.controller.ts |  |
| GET | /leave/requests/:id | LeaveRequestsModule | apps/api/src/leave/leave-requests/leave-requests.controller.ts | Permission.LEAVE_READ |
| POST | /leave/requests | LeaveRequestsModule | apps/api/src/leave/leave-requests/leave-requests.controller.ts | Permission.LEAVE_READ |
| PATCH | /leave/requests/:id | LeaveRequestsModule | apps/api/src/leave/leave-requests/leave-requests.controller.ts | Permission.LEAVE_CREATE |
| DELETE | /leave/requests/:id | LeaveRequestsModule | apps/api/src/leave/leave-requests/leave-requests.controller.ts | Permission.LEAVE_UPDATE |
| GET | /leave/types | LeaveTypesModule | apps/api/src/leave/leave-types/leave-types.controller.ts |  |
| GET | /leave/types/:id | LeaveTypesModule | apps/api/src/leave/leave-types/leave-types.controller.ts | Permission.LEAVE_READ |
| POST | /leave/types | LeaveTypesModule | apps/api/src/leave/leave-types/leave-types.controller.ts | Permission.LEAVE_READ |
| PATCH | /leave/types/:id | LeaveTypesModule | apps/api/src/leave/leave-types/leave-types.controller.ts | Permission.LEAVE_CREATE |
| DELETE | /leave/types/:id | LeaveTypesModule | apps/api/src/leave/leave-types/leave-types.controller.ts | Permission.LEAVE_UPDATE |
| GET | /leave/balances | LeaveModule | apps/api/src/leave/leave-balances/leave-balances.controller.ts |  |
| GET | /leave/balances/:id | LeaveModule | apps/api/src/leave/leave-balances/leave-balances.controller.ts | Permission.LEAVE_READ |
| POST | /leave/balances | LeaveModule | apps/api/src/leave/leave-balances/leave-balances.controller.ts | Permission.LEAVE_READ |
| PATCH | /leave/balances/:id | LeaveModule | apps/api/src/leave/leave-balances/leave-balances.controller.ts | Permission.LEAVE_CREATE |
| DELETE | /leave/balances/:id | LeaveModule | apps/api/src/leave/leave-balances/leave-balances.controller.ts | Permission.LEAVE_UPDATE |
| GET | /leave/requests | LeaveModule | apps/api/src/leave/leave-requests/leave-requests.controller.ts |  |
| GET | /leave/requests/:id | LeaveModule | apps/api/src/leave/leave-requests/leave-requests.controller.ts | Permission.LEAVE_READ |
| POST | /leave/requests | LeaveModule | apps/api/src/leave/leave-requests/leave-requests.controller.ts | Permission.LEAVE_READ |
| PATCH | /leave/requests/:id | LeaveModule | apps/api/src/leave/leave-requests/leave-requests.controller.ts | Permission.LEAVE_CREATE |
| DELETE | /leave/requests/:id | LeaveModule | apps/api/src/leave/leave-requests/leave-requests.controller.ts | Permission.LEAVE_UPDATE |
| GET | /leave/types | LeaveModule | apps/api/src/leave/leave-types/leave-types.controller.ts |  |
| GET | /leave/types/:id | LeaveModule | apps/api/src/leave/leave-types/leave-types.controller.ts | Permission.LEAVE_READ |
| POST | /leave/types | LeaveModule | apps/api/src/leave/leave-types/leave-types.controller.ts | Permission.LEAVE_READ |
| PATCH | /leave/types/:id | LeaveModule | apps/api/src/leave/leave-types/leave-types.controller.ts | Permission.LEAVE_CREATE |
| DELETE | /leave/types/:id | LeaveModule | apps/api/src/leave/leave-types/leave-types.controller.ts | Permission.LEAVE_UPDATE |
| POST | /mobile/auth/login | MobileModule | apps/api/src/mobile/mobile.controller.ts |  |
| POST | /mobile/auth/refresh | MobileModule | apps/api/src/mobile/mobile.controller.ts |  |
| POST | /mobile/auth/logout | MobileModule | apps/api/src/mobile/mobile.controller.ts |  |
| GET | /mobile/bootstrap | MobileModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_ACCESS |
| POST | /mobile/devices/register | MobileModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_ACCESS |
| GET | /mobile/devices | MobileModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_ACCESS |
| PATCH | /mobile/devices/:id | MobileModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_READ |
| POST | /mobile/devices/:id/revoke | MobileModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_MANAGE |
| GET | /mobile/sessions | MobileModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_MANAGE |
| POST | /mobile/sessions/:id/revoke | MobileModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_SESSIONS |
| POST | /mobile/push/notifications | MobileModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_SESSIONS |
| GET | /mobile/push/notifications | MobileModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_PUSH |
| PATCH | /mobile/push/notifications/:id | MobileModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_PUSH |
| POST | /mobile/sync/pull | MobileModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_PUSH |
| POST | /mobile/sync/changes | MobileModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_SYNC |
| GET | /mobile/sync/changes | MobileModule | apps/api/src/mobile/mobile.controller.ts | Permission.MOBILE_SYNC |
| GET | /notifications/dashboard | NotificationDashboardModule | apps/api/src/notifications/dashboard/notification-dashboard.controller.ts |  |
| GET | /notifications/dashboard | NotificationsModule | apps/api/src/notifications/dashboard/notification-dashboard.controller.ts |  |
| POST | /notifications/jobs/scheduled | NotificationsModule | apps/api/src/notifications/jobs/notification-jobs.controller.ts |  |
| POST | /notifications/jobs/retry-failed | NotificationsModule | apps/api/src/notifications/jobs/notification-jobs.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| POST | /notifications/jobs/expire-workflows | NotificationsModule | apps/api/src/notifications/jobs/notification-jobs.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| POST | /notifications/jobs/cleanup | NotificationsModule | apps/api/src/notifications/jobs/notification-jobs.controller.ts | Permission.WORKFLOWS_UPDATE |
| POST | /notifications/jobs/maintenance | NotificationsModule | apps/api/src/notifications/jobs/notification-jobs.controller.ts | Permission.NOTIFICATIONS_DELETE |
| GET | /notifications | NotificationsModule | apps/api/src/notifications/notifications.controller.ts |  |
| GET | /notifications/employee/:employeeId | NotificationsModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_READ |
| GET | /notifications/:id | NotificationsModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_READ |
| POST | /notifications | NotificationsModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_READ |
| PATCH | /notifications/:id | NotificationsModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_CREATE |
| POST | /notifications/:id/read | NotificationsModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| POST | /notifications/:id/sent | NotificationsModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| POST | /notifications/:id/cancel | NotificationsModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| POST | /notifications/queue/process | NotificationsModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| POST | /notifications/queue/retry-failed | NotificationsModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| DELETE | /notifications/:id | NotificationsModule | apps/api/src/notifications/notifications.controller.ts | Permission.NOTIFICATIONS_UPDATE |
| GET | /observability/health/providers | ObservabilityModule | apps/api/src/observability/observability.controller.ts |  |
| POST | /observability/health/providers | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| PATCH | /observability/health/providers/:id | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_CREATE |
| DELETE | /observability/health/providers/:id | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_UPDATE |
| POST | /observability/health/providers/:id/run | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_DELETE |
| POST | /observability/health/liveness | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_ADMIN |
| POST | /observability/health/readiness | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/health/results | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/metrics/definitions | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| POST | /observability/metrics/definitions | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| PATCH | /observability/metrics/definitions/:id | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_CREATE |
| DELETE | /observability/metrics/definitions/:id | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_UPDATE |
| GET | /observability/metrics/samples | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_DELETE |
| POST | /observability/metrics/samples | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/metrics/http | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_CREATE |
| GET | /observability/metrics/database | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/metrics/workflow | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/metrics/payroll | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/metrics/business-rules | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/logs | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| POST | /observability/logs | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/logs/summary | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_CREATE |
| GET | /observability/traces | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| POST | /observability/traces | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/traces/spans | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_CREATE |
| POST | /observability/traces/spans | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/traces/requests | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_CREATE |
| GET | /observability/traces/services | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/traces/database | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/traces/external-providers | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/management/status | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_READ |
| GET | /observability/management/diagnostics | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_ADMIN |
| GET | /observability/management/metrics | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_ADMIN |
| GET | /observability/management/health | ObservabilityModule | apps/api/src/observability/observability.controller.ts | Permission.OBSERVABILITY_ADMIN |
| GET | /organization/branches | BranchesModule | apps/api/src/organization/branches/branches.controller.ts |  |
| GET | /organization/branches/:id | BranchesModule | apps/api/src/organization/branches/branches.controller.ts | Permission.ORGANIZATION_READ |
| POST | /organization/branches | BranchesModule | apps/api/src/organization/branches/branches.controller.ts | Permission.ORGANIZATION_READ |
| PATCH | /organization/branches/:id | BranchesModule | apps/api/src/organization/branches/branches.controller.ts | Permission.ORGANIZATION_CREATE |
| DELETE | /organization/branches/:id | BranchesModule | apps/api/src/organization/branches/branches.controller.ts | Permission.ORGANIZATION_UPDATE |
| GET | /organization/companies | CompaniesModule | apps/api/src/organization/companies/companies.controller.ts |  |
| GET | /organization/companies/:id | CompaniesModule | apps/api/src/organization/companies/companies.controller.ts | Permission.ORGANIZATION_READ |
| POST | /organization/companies | CompaniesModule | apps/api/src/organization/companies/companies.controller.ts | Permission.ORGANIZATION_READ |
| PATCH | /organization/companies/:id | CompaniesModule | apps/api/src/organization/companies/companies.controller.ts | Permission.ORGANIZATION_CREATE |
| DELETE | /organization/companies/:id | CompaniesModule | apps/api/src/organization/companies/companies.controller.ts | Permission.ORGANIZATION_UPDATE |
| GET | /organization/cost-centers | CostCentersModule | apps/api/src/organization/cost-centers/cost-centers.controller.ts |  |
| GET | /organization/cost-centers/:id | CostCentersModule | apps/api/src/organization/cost-centers/cost-centers.controller.ts | Permission.ORGANIZATION_READ |
| POST | /organization/cost-centers | CostCentersModule | apps/api/src/organization/cost-centers/cost-centers.controller.ts | Permission.ORGANIZATION_READ |
| PATCH | /organization/cost-centers/:id | CostCentersModule | apps/api/src/organization/cost-centers/cost-centers.controller.ts | Permission.ORGANIZATION_CREATE |
| DELETE | /organization/cost-centers/:id | CostCentersModule | apps/api/src/organization/cost-centers/cost-centers.controller.ts | Permission.ORGANIZATION_UPDATE |
| GET | /organization/departments | DepartmentsModule | apps/api/src/organization/departments/departments.controller.ts |  |
| GET | /organization/departments/:id | DepartmentsModule | apps/api/src/organization/departments/departments.controller.ts | Permission.ORGANIZATION_READ |
| POST | /organization/departments | DepartmentsModule | apps/api/src/organization/departments/departments.controller.ts | Permission.ORGANIZATION_READ |
| PATCH | /organization/departments/:id | DepartmentsModule | apps/api/src/organization/departments/departments.controller.ts | Permission.ORGANIZATION_CREATE |
| DELETE | /organization/departments/:id | DepartmentsModule | apps/api/src/organization/departments/departments.controller.ts | Permission.ORGANIZATION_UPDATE |
| GET | /organization/branches | OrganizationModule | apps/api/src/organization/branches/branches.controller.ts |  |
| GET | /organization/branches/:id | OrganizationModule | apps/api/src/organization/branches/branches.controller.ts | Permission.ORGANIZATION_READ |
| POST | /organization/branches | OrganizationModule | apps/api/src/organization/branches/branches.controller.ts | Permission.ORGANIZATION_READ |
| PATCH | /organization/branches/:id | OrganizationModule | apps/api/src/organization/branches/branches.controller.ts | Permission.ORGANIZATION_CREATE |
| DELETE | /organization/branches/:id | OrganizationModule | apps/api/src/organization/branches/branches.controller.ts | Permission.ORGANIZATION_UPDATE |
| GET | /organization/companies | OrganizationModule | apps/api/src/organization/companies/companies.controller.ts |  |
| GET | /organization/companies/:id | OrganizationModule | apps/api/src/organization/companies/companies.controller.ts | Permission.ORGANIZATION_READ |
| POST | /organization/companies | OrganizationModule | apps/api/src/organization/companies/companies.controller.ts | Permission.ORGANIZATION_READ |
| PATCH | /organization/companies/:id | OrganizationModule | apps/api/src/organization/companies/companies.controller.ts | Permission.ORGANIZATION_CREATE |
| DELETE | /organization/companies/:id | OrganizationModule | apps/api/src/organization/companies/companies.controller.ts | Permission.ORGANIZATION_UPDATE |
| GET | /organization/cost-centers | OrganizationModule | apps/api/src/organization/cost-centers/cost-centers.controller.ts |  |
| GET | /organization/cost-centers/:id | OrganizationModule | apps/api/src/organization/cost-centers/cost-centers.controller.ts | Permission.ORGANIZATION_READ |
| POST | /organization/cost-centers | OrganizationModule | apps/api/src/organization/cost-centers/cost-centers.controller.ts | Permission.ORGANIZATION_READ |
| PATCH | /organization/cost-centers/:id | OrganizationModule | apps/api/src/organization/cost-centers/cost-centers.controller.ts | Permission.ORGANIZATION_CREATE |
| DELETE | /organization/cost-centers/:id | OrganizationModule | apps/api/src/organization/cost-centers/cost-centers.controller.ts | Permission.ORGANIZATION_UPDATE |
| GET | /organization/departments | OrganizationModule | apps/api/src/organization/departments/departments.controller.ts |  |
| GET | /organization/departments/:id | OrganizationModule | apps/api/src/organization/departments/departments.controller.ts | Permission.ORGANIZATION_READ |
| POST | /organization/departments | OrganizationModule | apps/api/src/organization/departments/departments.controller.ts | Permission.ORGANIZATION_READ |
| PATCH | /organization/departments/:id | OrganizationModule | apps/api/src/organization/departments/departments.controller.ts | Permission.ORGANIZATION_CREATE |
| DELETE | /organization/departments/:id | OrganizationModule | apps/api/src/organization/departments/departments.controller.ts | Permission.ORGANIZATION_UPDATE |
| GET | /organization/positions | OrganizationModule | apps/api/src/organization/positions/positions.controller.ts |  |
| GET | /organization/positions/:id | OrganizationModule | apps/api/src/organization/positions/positions.controller.ts | Permission.ORGANIZATION_READ |
| POST | /organization/positions | OrganizationModule | apps/api/src/organization/positions/positions.controller.ts | Permission.ORGANIZATION_READ |
| PATCH | /organization/positions/:id | OrganizationModule | apps/api/src/organization/positions/positions.controller.ts | Permission.ORGANIZATION_CREATE |
| DELETE | /organization/positions/:id | OrganizationModule | apps/api/src/organization/positions/positions.controller.ts | Permission.ORGANIZATION_UPDATE |
| GET | /organization/positions | PositionsModule | apps/api/src/organization/positions/positions.controller.ts |  |
| GET | /organization/positions/:id | PositionsModule | apps/api/src/organization/positions/positions.controller.ts | Permission.ORGANIZATION_READ |
| POST | /organization/positions | PositionsModule | apps/api/src/organization/positions/positions.controller.ts | Permission.ORGANIZATION_READ |
| PATCH | /organization/positions/:id | PositionsModule | apps/api/src/organization/positions/positions.controller.ts | Permission.ORGANIZATION_CREATE |
| DELETE | /organization/positions/:id | PositionsModule | apps/api/src/organization/positions/positions.controller.ts | Permission.ORGANIZATION_UPDATE |
| POST | /payroll/runs/:id/review | PayrollApprovalModule | apps/api/src/payroll/approval/payroll-approval.controller.ts |  |
| POST | /payroll/runs/:id/approve | PayrollApprovalModule | apps/api/src/payroll/approval/payroll-approval.controller.ts | Permission.PAYROLL_UPDATE |
| POST | /payroll/runs/:id/reject | PayrollApprovalModule | apps/api/src/payroll/approval/payroll-approval.controller.ts | Permission.PAYROLL_UPDATE |
| POST | /payroll/runs/:id/lock | PayrollApprovalModule | apps/api/src/payroll/approval/payroll-approval.controller.ts | Permission.PAYROLL_UPDATE |
| POST | /payroll/attendance/apply | PayrollAttendanceModule | apps/api/src/payroll/attendance/payroll-attendance.controller.ts |  |
| POST | /payroll/calculation/preview | PayrollCalculationModule | apps/api/src/payroll/calculation/payroll-calculation.controller.ts |  |
| POST | /payroll/calculation/calculate | PayrollCalculationModule | apps/api/src/payroll/calculation/payroll-calculation.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/items | PayrollItemsModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts |  |
| GET | /payroll/items/run/:payrollRunId | PayrollItemsModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/items/:id | PayrollItemsModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/items | PayrollItemsModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/items/:id | PayrollItemsModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts | Permission.PAYROLL_CREATE |
| DELETE | /payroll/items/:id | PayrollItemsModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /payroll/periods | PayrollPeriodsModule | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts |  |
| GET | /payroll/periods/:id | PayrollPeriodsModule | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/periods | PayrollPeriodsModule | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/periods/:id | PayrollPeriodsModule | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts | Permission.PAYROLL_CREATE |
| DELETE | /payroll/periods/:id | PayrollPeriodsModule | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /payroll/profiles | PayrollProfilesModule | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts |  |
| GET | /payroll/profiles/:id | PayrollProfilesModule | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/profiles | PayrollProfilesModule | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/profiles/:id | PayrollProfilesModule | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts | Permission.PAYROLL_CREATE |
| DELETE | /payroll/profiles/:id | PayrollProfilesModule | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /payroll/runs | PayrollRunsModule | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts |  |
| GET | /payroll/runs/:id | PayrollRunsModule | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/runs | PayrollRunsModule | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/runs/:id | PayrollRunsModule | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts | Permission.PAYROLL_CREATE |
| DELETE | /payroll/runs/:id | PayrollRunsModule | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts | Permission.PAYROLL_UPDATE |
| POST | /payroll/runs/:id/review | PayrollModule | apps/api/src/payroll/approval/payroll-approval.controller.ts |  |
| POST | /payroll/runs/:id/approve | PayrollModule | apps/api/src/payroll/approval/payroll-approval.controller.ts | Permission.PAYROLL_UPDATE |
| POST | /payroll/runs/:id/reject | PayrollModule | apps/api/src/payroll/approval/payroll-approval.controller.ts | Permission.PAYROLL_UPDATE |
| POST | /payroll/runs/:id/lock | PayrollModule | apps/api/src/payroll/approval/payroll-approval.controller.ts | Permission.PAYROLL_UPDATE |
| POST | /payroll/attendance/apply | PayrollModule | apps/api/src/payroll/attendance/payroll-attendance.controller.ts |  |
| POST | /payroll/calculation/preview | PayrollModule | apps/api/src/payroll/calculation/payroll-calculation.controller.ts |  |
| POST | /payroll/calculation/calculate | PayrollModule | apps/api/src/payroll/calculation/payroll-calculation.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/items | PayrollModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts |  |
| GET | /payroll/items/run/:payrollRunId | PayrollModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/items/:id | PayrollModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/items | PayrollModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/items/:id | PayrollModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts | Permission.PAYROLL_CREATE |
| DELETE | /payroll/items/:id | PayrollModule | apps/api/src/payroll/payroll-items/payroll-items.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /payroll/periods | PayrollModule | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts |  |
| GET | /payroll/periods/:id | PayrollModule | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/periods | PayrollModule | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/periods/:id | PayrollModule | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts | Permission.PAYROLL_CREATE |
| DELETE | /payroll/periods/:id | PayrollModule | apps/api/src/payroll/payroll-periods/payroll-periods.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /payroll/profiles | PayrollModule | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts |  |
| GET | /payroll/profiles/:id | PayrollModule | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/profiles | PayrollModule | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/profiles/:id | PayrollModule | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts | Permission.PAYROLL_CREATE |
| DELETE | /payroll/profiles/:id | PayrollModule | apps/api/src/payroll/payroll-profiles/payroll-profiles.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /payroll/runs | PayrollModule | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts |  |
| GET | /payroll/runs/:id | PayrollModule | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/runs | PayrollModule | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/runs/:id | PayrollModule | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts | Permission.PAYROLL_CREATE |
| DELETE | /payroll/runs/:id | PayrollModule | apps/api/src/payroll/payroll-runs/payroll-runs.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /payroll/payslips | PayrollModule | apps/api/src/payroll/payslips/payslips.controller.ts |  |
| GET | /payroll/payslips/employee/:employeeId | PayrollModule | apps/api/src/payroll/payslips/payslips.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/payslips/:id | PayrollModule | apps/api/src/payroll/payslips/payslips.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/payslips/:id/pdf-payload | PayrollModule | apps/api/src/payroll/payslips/payslips.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/payslips/:id | PayrollModule | apps/api/src/payroll/payslips/payslips.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/payslips/run/:payrollRunId/issue | PayrollModule | apps/api/src/payroll/payslips/payslips.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /payroll/reports/dashboard | PayrollModule | apps/api/src/payroll/reports/payroll-reports.controller.ts |  |
| GET | /payroll/reports/salary | PayrollModule | apps/api/src/payroll/reports/payroll-reports.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/reports/departments | PayrollModule | apps/api/src/payroll/reports/payroll-reports.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/reports/cost-centers | PayrollModule | apps/api/src/payroll/reports/payroll-reports.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/reports/monthly | PayrollModule | apps/api/src/payroll/reports/payroll-reports.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/salary-components | PayrollModule | apps/api/src/payroll/salary-components/salary-components.controller.ts |  |
| GET | /payroll/salary-components/:id | PayrollModule | apps/api/src/payroll/salary-components/salary-components.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/salary-components | PayrollModule | apps/api/src/payroll/salary-components/salary-components.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/salary-components/:id | PayrollModule | apps/api/src/payroll/salary-components/salary-components.controller.ts | Permission.PAYROLL_CREATE |
| DELETE | /payroll/salary-components/:id | PayrollModule | apps/api/src/payroll/salary-components/salary-components.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /payroll/payslips | PayslipsModule | apps/api/src/payroll/payslips/payslips.controller.ts |  |
| GET | /payroll/payslips/employee/:employeeId | PayslipsModule | apps/api/src/payroll/payslips/payslips.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/payslips/:id | PayslipsModule | apps/api/src/payroll/payslips/payslips.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/payslips/:id/pdf-payload | PayslipsModule | apps/api/src/payroll/payslips/payslips.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/payslips/:id | PayslipsModule | apps/api/src/payroll/payslips/payslips.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/payslips/run/:payrollRunId/issue | PayslipsModule | apps/api/src/payroll/payslips/payslips.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /payroll/reports/dashboard | PayrollReportsModule | apps/api/src/payroll/reports/payroll-reports.controller.ts |  |
| GET | /payroll/reports/salary | PayrollReportsModule | apps/api/src/payroll/reports/payroll-reports.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/reports/departments | PayrollReportsModule | apps/api/src/payroll/reports/payroll-reports.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/reports/cost-centers | PayrollReportsModule | apps/api/src/payroll/reports/payroll-reports.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/reports/monthly | PayrollReportsModule | apps/api/src/payroll/reports/payroll-reports.controller.ts | Permission.PAYROLL_READ |
| GET | /payroll/salary-components | SalaryComponentsModule | apps/api/src/payroll/salary-components/salary-components.controller.ts |  |
| GET | /payroll/salary-components/:id | SalaryComponentsModule | apps/api/src/payroll/salary-components/salary-components.controller.ts | Permission.PAYROLL_READ |
| POST | /payroll/salary-components | SalaryComponentsModule | apps/api/src/payroll/salary-components/salary-components.controller.ts | Permission.PAYROLL_READ |
| PATCH | /payroll/salary-components/:id | SalaryComponentsModule | apps/api/src/payroll/salary-components/salary-components.controller.ts | Permission.PAYROLL_CREATE |
| DELETE | /payroll/salary-components/:id | SalaryComponentsModule | apps/api/src/payroll/salary-components/salary-components.controller.ts | Permission.PAYROLL_UPDATE |
| GET | /performance/cycles | PerformanceCyclesModule | apps/api/src/performance/cycles/performance-cycles.controller.ts |  |
| GET | /performance/cycles/:id | PerformanceCyclesModule | apps/api/src/performance/cycles/performance-cycles.controller.ts | Permission.PERFORMANCE_READ |
| POST | /performance/cycles | PerformanceCyclesModule | apps/api/src/performance/cycles/performance-cycles.controller.ts | Permission.PERFORMANCE_READ |
| PATCH | /performance/cycles/:id | PerformanceCyclesModule | apps/api/src/performance/cycles/performance-cycles.controller.ts | Permission.PERFORMANCE_CREATE |
| DELETE | /performance/cycles/:id | PerformanceCyclesModule | apps/api/src/performance/cycles/performance-cycles.controller.ts | Permission.PERFORMANCE_UPDATE |
| GET | /performance/dashboard/summary | PerformanceDashboardModule | apps/api/src/performance/dashboard/performance-dashboard.controller.ts |  |
| GET | /performance/goals | PerformanceGoalsModule | apps/api/src/performance/goals/performance-goals.controller.ts |  |
| GET | /performance/goals/:id | PerformanceGoalsModule | apps/api/src/performance/goals/performance-goals.controller.ts | Permission.PERFORMANCE_READ |
| POST | /performance/goals | PerformanceGoalsModule | apps/api/src/performance/goals/performance-goals.controller.ts | Permission.PERFORMANCE_READ |
| PATCH | /performance/goals/:id | PerformanceGoalsModule | apps/api/src/performance/goals/performance-goals.controller.ts | Permission.PERFORMANCE_CREATE |
| DELETE | /performance/goals/:id | PerformanceGoalsModule | apps/api/src/performance/goals/performance-goals.controller.ts | Permission.PERFORMANCE_UPDATE |
| GET | /performance/cycles | PerformanceModule | apps/api/src/performance/cycles/performance-cycles.controller.ts |  |
| GET | /performance/cycles/:id | PerformanceModule | apps/api/src/performance/cycles/performance-cycles.controller.ts | Permission.PERFORMANCE_READ |
| POST | /performance/cycles | PerformanceModule | apps/api/src/performance/cycles/performance-cycles.controller.ts | Permission.PERFORMANCE_READ |
| PATCH | /performance/cycles/:id | PerformanceModule | apps/api/src/performance/cycles/performance-cycles.controller.ts | Permission.PERFORMANCE_CREATE |
| DELETE | /performance/cycles/:id | PerformanceModule | apps/api/src/performance/cycles/performance-cycles.controller.ts | Permission.PERFORMANCE_UPDATE |
| GET | /performance/dashboard/summary | PerformanceModule | apps/api/src/performance/dashboard/performance-dashboard.controller.ts |  |
| GET | /performance/goals | PerformanceModule | apps/api/src/performance/goals/performance-goals.controller.ts |  |
| GET | /performance/goals/:id | PerformanceModule | apps/api/src/performance/goals/performance-goals.controller.ts | Permission.PERFORMANCE_READ |
| POST | /performance/goals | PerformanceModule | apps/api/src/performance/goals/performance-goals.controller.ts | Permission.PERFORMANCE_READ |
| PATCH | /performance/goals/:id | PerformanceModule | apps/api/src/performance/goals/performance-goals.controller.ts | Permission.PERFORMANCE_CREATE |
| DELETE | /performance/goals/:id | PerformanceModule | apps/api/src/performance/goals/performance-goals.controller.ts | Permission.PERFORMANCE_UPDATE |
| GET | /performance/review-items | PerformanceModule | apps/api/src/performance/review-items/performance-review-items.controller.ts |  |
| GET | /performance/review-items/:id | PerformanceModule | apps/api/src/performance/review-items/performance-review-items.controller.ts | Permission.PERFORMANCE_READ |
| POST | /performance/review-items | PerformanceModule | apps/api/src/performance/review-items/performance-review-items.controller.ts | Permission.PERFORMANCE_READ |
| PATCH | /performance/review-items/:id | PerformanceModule | apps/api/src/performance/review-items/performance-review-items.controller.ts | Permission.PERFORMANCE_CREATE |
| DELETE | /performance/review-items/:id | PerformanceModule | apps/api/src/performance/review-items/performance-review-items.controller.ts | Permission.PERFORMANCE_UPDATE |
| GET | /performance/reviews | PerformanceModule | apps/api/src/performance/reviews/performance-reviews.controller.ts |  |
| GET | /performance/reviews/:id | PerformanceModule | apps/api/src/performance/reviews/performance-reviews.controller.ts | Permission.PERFORMANCE_READ |
| POST | /performance/reviews | PerformanceModule | apps/api/src/performance/reviews/performance-reviews.controller.ts | Permission.PERFORMANCE_READ |
| PATCH | /performance/reviews/:id | PerformanceModule | apps/api/src/performance/reviews/performance-reviews.controller.ts | Permission.PERFORMANCE_CREATE |
| DELETE | /performance/reviews/:id | PerformanceModule | apps/api/src/performance/reviews/performance-reviews.controller.ts | Permission.PERFORMANCE_UPDATE |
| GET | /performance/review-items | PerformanceReviewItemsModule | apps/api/src/performance/review-items/performance-review-items.controller.ts |  |
| GET | /performance/review-items/:id | PerformanceReviewItemsModule | apps/api/src/performance/review-items/performance-review-items.controller.ts | Permission.PERFORMANCE_READ |
| POST | /performance/review-items | PerformanceReviewItemsModule | apps/api/src/performance/review-items/performance-review-items.controller.ts | Permission.PERFORMANCE_READ |
| PATCH | /performance/review-items/:id | PerformanceReviewItemsModule | apps/api/src/performance/review-items/performance-review-items.controller.ts | Permission.PERFORMANCE_CREATE |
| DELETE | /performance/review-items/:id | PerformanceReviewItemsModule | apps/api/src/performance/review-items/performance-review-items.controller.ts | Permission.PERFORMANCE_UPDATE |
| GET | /performance/reviews | PerformanceReviewsModule | apps/api/src/performance/reviews/performance-reviews.controller.ts |  |
| GET | /performance/reviews/:id | PerformanceReviewsModule | apps/api/src/performance/reviews/performance-reviews.controller.ts | Permission.PERFORMANCE_READ |
| POST | /performance/reviews | PerformanceReviewsModule | apps/api/src/performance/reviews/performance-reviews.controller.ts | Permission.PERFORMANCE_READ |
| PATCH | /performance/reviews/:id | PerformanceReviewsModule | apps/api/src/performance/reviews/performance-reviews.controller.ts | Permission.PERFORMANCE_CREATE |
| DELETE | /performance/reviews/:id | PerformanceReviewsModule | apps/api/src/performance/reviews/performance-reviews.controller.ts | Permission.PERFORMANCE_UPDATE |
| GET | /performance-optimization/queries/recommendations | PerformanceOptimizationModule | apps/api/src/performance-optimization/performance-optimization.controller.ts |  |
| GET | /performance-optimization/cache | PerformanceOptimizationModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_READ |
| GET | /performance-optimization/cache/stats | PerformanceOptimizationModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| GET | /performance-optimization/cache/:key | PerformanceOptimizationModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_READ |
| POST | /performance-optimization/cache | PerformanceOptimizationModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| POST | /performance-optimization/cache/invalidate | PerformanceOptimizationModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| POST | /performance-optimization/batch/plan | PerformanceOptimizationModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| POST | /performance-optimization/lazy-loading/plan | PerformanceOptimizationModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE |
| GET | /performance-optimization/memory | PerformanceOptimizationModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE |
| GET | /performance-optimization/metrics | PerformanceOptimizationModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_READ |
| POST | /performance-optimization/metrics | PerformanceOptimizationModule | apps/api/src/performance-optimization/performance-optimization.controller.ts | Permission.PERFORMANCE_OPTIMIZATION_METRICS |
| GET | /permissions | PermissionsModule | apps/api/src/permissions/permissions.controller.ts |  |
| GET | /permissions/:id | PermissionsModule | apps/api/src/permissions/permissions.controller.ts | Permission.PERMISSIONS_READ |
| POST | /permissions | PermissionsModule | apps/api/src/permissions/permissions.controller.ts | Permission.PERMISSIONS_READ |
| PATCH | /permissions/:id | PermissionsModule | apps/api/src/permissions/permissions.controller.ts | Permission.PERMISSIONS_CREATE |
| DELETE | /permissions/:id | PermissionsModule | apps/api/src/permissions/permissions.controller.ts | Permission.PERMISSIONS_UPDATE |
| GET | /plugins/manifests | PluginsModule | apps/api/src/plugins/plugins.controller.ts |  |
| POST | /plugins/manifests | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/manifests/:id | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_CREATE |
| DELETE | /plugins/manifests/:id | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| POST | /plugins/manifests/:id/restore | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_DELETE |
| POST | /plugins/manifests/:id/load | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| GET | /plugins/registry | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| POST | /plugins/registry/:id/enable | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| POST | /plugins/registry/:id/disable | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| POST | /plugins/registry/:id/unload | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| GET | /plugins/registry/:id/lifecycle-events | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| GET | /plugins/sdk/event-subscriptions | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| POST | /plugins/sdk/event-subscriptions | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/sdk/event-subscriptions/:id | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| DELETE | /plugins/sdk/event-subscriptions/:id | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| GET | /plugins/sdk/hooks | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_DELETE |
| POST | /plugins/sdk/hooks | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/sdk/hooks/:id | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| DELETE | /plugins/sdk/hooks/:id | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| GET | /plugins/sdk/service-bindings | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_DELETE |
| POST | /plugins/sdk/service-bindings | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/sdk/service-bindings/:id | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| DELETE | /plugins/sdk/service-bindings/:id | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| GET | /plugins/sdk/permission-grants | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_DELETE |
| POST | /plugins/sdk/permission-grants | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| DELETE | /plugins/sdk/permission-grants/:id | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_GOVERN |
| GET | /plugins/sdk/configurations | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_GOVERN |
| POST | /plugins/sdk/configurations | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/sdk/configurations/:id | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| DELETE | /plugins/sdk/configurations/:id | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| POST | /plugins/sdk/events | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_DELETE |
| GET | /plugins/sdk/events | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| GET | /plugins/marketplace/packages | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| POST | /plugins/marketplace/packages | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/marketplace/packages/:id | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_CREATE |
| GET | /plugins/marketplace/versions | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| POST | /plugins/marketplace/versions | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/marketplace/versions/:id | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_CREATE |
| POST | /plugins/marketplace/versions/:id/install | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| GET | /plugins/marketplace/installations | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| POST | /plugins/marketplace/installations/:id/enable | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| POST | /plugins/marketplace/installations/:id/disable | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| POST | /plugins/marketplace/installations/:id/uninstall | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| POST | /plugins/marketplace/installations/:id/upgrade | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_DELETE |
| GET | /plugins/isolation/sandbox-policies | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| POST | /plugins/isolation/sandbox-policies | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| GET | /plugins/isolation/dependencies | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_GOVERN |
| POST | /plugins/isolation/dependencies | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| PATCH | /plugins/isolation/dependencies/:id | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| POST | /plugins/isolation/registry/:id/validate-dependencies | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_UPDATE |
| GET | /plugins/isolation/capability-grants | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| POST | /plugins/isolation/capability-grants | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| DELETE | /plugins/isolation/capability-grants/:id | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_GOVERN |
| POST | /plugins/isolation/registry/:id/validate | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_GOVERN |
| POST | /plugins/management/upload | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_EXECUTE |
| GET | /plugins/management/registry/:id/health | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_CREATE |
| GET | /plugins/management/metrics | PluginsModule | apps/api/src/plugins/plugins.controller.ts | Permission.PLUGINS_READ |
| GET | /public-api/registry/groups | PublicApiModule | apps/api/src/public-api/public-api.controller.ts |  |
| POST | /public-api/registry/groups | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_READ |
| PATCH | /public-api/registry/groups/:id | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_CREATE |
| DELETE | /public-api/registry/groups/:id | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_UPDATE |
| GET | /public-api/registry/apis | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_DELETE |
| POST | /public-api/registry/apis | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_READ |
| PATCH | /public-api/registry/apis/:id | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_CREATE |
| DELETE | /public-api/registry/apis/:id | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_UPDATE |
| GET | /public-api/registry/versions | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_DELETE |
| POST | /public-api/registry/versions | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_READ |
| PATCH | /public-api/registry/versions/:id | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_CREATE |
| GET | /public-api/keys | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_UPDATE |
| POST | /public-api/keys | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_KEYS |
| POST | /public-api/keys/:id/rotate | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_KEYS |
| POST | /public-api/keys/:id/revoke | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_KEYS |
| GET | /public-api/rate-limits/policies | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_KEYS |
| POST | /public-api/rate-limits/policies | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_ADMIN |
| PATCH | /public-api/rate-limits/policies/:id | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_ADMIN |
| DELETE | /public-api/rate-limits/policies/:id | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_ADMIN |
| POST | /public-api/rate-limits/evaluate | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_ADMIN |
| GET | /public-api/rate-limits/usage | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_ADMIN |
| GET | /public-api/developer/applications | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_READ |
| POST | /public-api/developer/applications | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_READ |
| PATCH | /public-api/developer/applications/:id | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_CREATE |
| DELETE | /public-api/developer/applications/:id | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_UPDATE |
| POST | /public-api/developer/applications/:id/keys | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_DELETE |
| POST | /public-api/developer/applications/:id/keys/:keyId/revoke | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_KEYS |
| GET | /public-api/developer/applications/:id/usage | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_KEYS |
| POST | /public-api/security/verify-signature | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_READ |
| GET | /public-api/security/request-logs | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_ADMIN |
| POST | /public-api/security/request-logs | PublicApiModule | apps/api/src/public-api/public-api.controller.ts | Permission.PUBLIC_API_ADMIN |
| GET | /recruitment/applicants | ApplicantsModule | apps/api/src/recruitment/applicants/applicants.controller.ts |  |
| GET | /recruitment/applicants/:id | ApplicantsModule | apps/api/src/recruitment/applicants/applicants.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/applicants | ApplicantsModule | apps/api/src/recruitment/applicants/applicants.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/applicants/:id | ApplicantsModule | apps/api/src/recruitment/applicants/applicants.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/applicants/:id | ApplicantsModule | apps/api/src/recruitment/applicants/applicants.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/applications | ApplicationsModule | apps/api/src/recruitment/applications/applications.controller.ts |  |
| GET | /recruitment/applications/:id | ApplicationsModule | apps/api/src/recruitment/applications/applications.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/applications | ApplicationsModule | apps/api/src/recruitment/applications/applications.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/applications/:id | ApplicationsModule | apps/api/src/recruitment/applications/applications.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/applications/:id | ApplicationsModule | apps/api/src/recruitment/applications/applications.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/dashboard/summary | RecruitmentDashboardModule | apps/api/src/recruitment/dashboard/recruitment-dashboard.controller.ts |  |
| POST | /recruitment/hiring/hire | HiringModule | apps/api/src/recruitment/hiring/hiring.controller.ts |  |
| GET | /recruitment/interview-evaluations | InterviewEvaluationsModule | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts |  |
| GET | /recruitment/interview-evaluations/:id | InterviewEvaluationsModule | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/interview-evaluations | InterviewEvaluationsModule | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/interview-evaluations/:id | InterviewEvaluationsModule | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/interview-evaluations/:id | InterviewEvaluationsModule | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/interviews | InterviewsModule | apps/api/src/recruitment/interviews/interviews.controller.ts |  |
| GET | /recruitment/interviews/:id | InterviewsModule | apps/api/src/recruitment/interviews/interviews.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/interviews | InterviewsModule | apps/api/src/recruitment/interviews/interviews.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/interviews/:id | InterviewsModule | apps/api/src/recruitment/interviews/interviews.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/interviews/:id | InterviewsModule | apps/api/src/recruitment/interviews/interviews.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/job-positions | JobPositionsModule | apps/api/src/recruitment/job-positions/job-positions.controller.ts |  |
| GET | /recruitment/job-positions/:id | JobPositionsModule | apps/api/src/recruitment/job-positions/job-positions.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/job-positions | JobPositionsModule | apps/api/src/recruitment/job-positions/job-positions.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/job-positions/:id | JobPositionsModule | apps/api/src/recruitment/job-positions/job-positions.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/job-positions/:id | JobPositionsModule | apps/api/src/recruitment/job-positions/job-positions.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/offer-letters | OfferLettersModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts |  |
| GET | /recruitment/offer-letters/:id | OfferLettersModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/offer-letters | OfferLettersModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/offer-letters/:id | OfferLettersModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_CREATE |
| POST | /recruitment/offer-letters/:id/send | OfferLettersModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_UPDATE |
| POST | /recruitment/offer-letters/:id/accept | OfferLettersModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_UPDATE |
| POST | /recruitment/offer-letters/:id/reject | OfferLettersModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_UPDATE |
| DELETE | /recruitment/offer-letters/:id | OfferLettersModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/applicants | RecruitmentModule | apps/api/src/recruitment/applicants/applicants.controller.ts |  |
| GET | /recruitment/applicants/:id | RecruitmentModule | apps/api/src/recruitment/applicants/applicants.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/applicants | RecruitmentModule | apps/api/src/recruitment/applicants/applicants.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/applicants/:id | RecruitmentModule | apps/api/src/recruitment/applicants/applicants.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/applicants/:id | RecruitmentModule | apps/api/src/recruitment/applicants/applicants.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/applications | RecruitmentModule | apps/api/src/recruitment/applications/applications.controller.ts |  |
| GET | /recruitment/applications/:id | RecruitmentModule | apps/api/src/recruitment/applications/applications.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/applications | RecruitmentModule | apps/api/src/recruitment/applications/applications.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/applications/:id | RecruitmentModule | apps/api/src/recruitment/applications/applications.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/applications/:id | RecruitmentModule | apps/api/src/recruitment/applications/applications.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/dashboard/summary | RecruitmentModule | apps/api/src/recruitment/dashboard/recruitment-dashboard.controller.ts |  |
| POST | /recruitment/hiring/hire | RecruitmentModule | apps/api/src/recruitment/hiring/hiring.controller.ts |  |
| GET | /recruitment/interview-evaluations | RecruitmentModule | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts |  |
| GET | /recruitment/interview-evaluations/:id | RecruitmentModule | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/interview-evaluations | RecruitmentModule | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/interview-evaluations/:id | RecruitmentModule | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/interview-evaluations/:id | RecruitmentModule | apps/api/src/recruitment/interview-evaluations/interview-evaluations.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/interviews | RecruitmentModule | apps/api/src/recruitment/interviews/interviews.controller.ts |  |
| GET | /recruitment/interviews/:id | RecruitmentModule | apps/api/src/recruitment/interviews/interviews.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/interviews | RecruitmentModule | apps/api/src/recruitment/interviews/interviews.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/interviews/:id | RecruitmentModule | apps/api/src/recruitment/interviews/interviews.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/interviews/:id | RecruitmentModule | apps/api/src/recruitment/interviews/interviews.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/job-positions | RecruitmentModule | apps/api/src/recruitment/job-positions/job-positions.controller.ts |  |
| GET | /recruitment/job-positions/:id | RecruitmentModule | apps/api/src/recruitment/job-positions/job-positions.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/job-positions | RecruitmentModule | apps/api/src/recruitment/job-positions/job-positions.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/job-positions/:id | RecruitmentModule | apps/api/src/recruitment/job-positions/job-positions.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/job-positions/:id | RecruitmentModule | apps/api/src/recruitment/job-positions/job-positions.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/offer-letters | RecruitmentModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts |  |
| GET | /recruitment/offer-letters/:id | RecruitmentModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/offer-letters | RecruitmentModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/offer-letters/:id | RecruitmentModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_CREATE |
| POST | /recruitment/offer-letters/:id/send | RecruitmentModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_UPDATE |
| POST | /recruitment/offer-letters/:id/accept | RecruitmentModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_UPDATE |
| POST | /recruitment/offer-letters/:id/reject | RecruitmentModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_UPDATE |
| DELETE | /recruitment/offer-letters/:id | RecruitmentModule | apps/api/src/recruitment/offer-letters/offer-letters.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/vacancies | RecruitmentModule | apps/api/src/recruitment/vacancies/vacancies.controller.ts |  |
| GET | /recruitment/vacancies/:id | RecruitmentModule | apps/api/src/recruitment/vacancies/vacancies.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/vacancies | RecruitmentModule | apps/api/src/recruitment/vacancies/vacancies.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/vacancies/:id | RecruitmentModule | apps/api/src/recruitment/vacancies/vacancies.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/vacancies/:id | RecruitmentModule | apps/api/src/recruitment/vacancies/vacancies.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /recruitment/vacancies | VacanciesModule | apps/api/src/recruitment/vacancies/vacancies.controller.ts |  |
| GET | /recruitment/vacancies/:id | VacanciesModule | apps/api/src/recruitment/vacancies/vacancies.controller.ts | Permission.RECRUITMENT_READ |
| POST | /recruitment/vacancies | VacanciesModule | apps/api/src/recruitment/vacancies/vacancies.controller.ts | Permission.RECRUITMENT_READ |
| PATCH | /recruitment/vacancies/:id | VacanciesModule | apps/api/src/recruitment/vacancies/vacancies.controller.ts | Permission.RECRUITMENT_CREATE |
| DELETE | /recruitment/vacancies/:id | VacanciesModule | apps/api/src/recruitment/vacancies/vacancies.controller.ts | Permission.RECRUITMENT_UPDATE |
| GET | /reporting/dashboards/executive | ReportingDashboardsModule | apps/api/src/reporting/dashboards/reporting-dashboards.controller.ts |  |
| GET | /reporting/dashboards/hr | ReportingDashboardsModule | apps/api/src/reporting/dashboards/reporting-dashboards.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/dashboards/payroll | ReportingDashboardsModule | apps/api/src/reporting/dashboards/reporting-dashboards.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/dashboards/accounting | ReportingDashboardsModule | apps/api/src/reporting/dashboards/reporting-dashboards.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/categories | ReportDefinitionsModule | apps/api/src/reporting/definitions/report-definitions.controller.ts |  |
| POST | /reporting/categories | ReportDefinitionsModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_READ |
| PATCH | /reporting/categories/:id | ReportDefinitionsModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_CREATE |
| GET | /reporting/definitions | ReportDefinitionsModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_UPDATE |
| GET | /reporting/definitions/:id | ReportDefinitionsModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_READ |
| POST | /reporting/definitions | ReportDefinitionsModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_READ |
| PATCH | /reporting/definitions/:id | ReportDefinitionsModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_CREATE |
| GET | /reporting/executions | ReportExecutionModule | apps/api/src/reporting/execution/report-execution.controller.ts |  |
| GET | /reporting/executions/:id | ReportExecutionModule | apps/api/src/reporting/execution/report-execution.controller.ts | Permission.REPORTING_READ |
| POST | /reporting/executions | ReportExecutionModule | apps/api/src/reporting/execution/report-execution.controller.ts | Permission.REPORTING_READ |
| POST | /reporting/exports | ReportExportModule | apps/api/src/reporting/exports/report-export.controller.ts |  |
| GET | /reporting/finance/payroll-summary | FinanceReportsModule | apps/api/src/reporting/finance/finance-reports.controller.ts |  |
| GET | /reporting/finance/payslip-summary | FinanceReportsModule | apps/api/src/reporting/finance/finance-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/finance/trial-balance | FinanceReportsModule | apps/api/src/reporting/finance/finance-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/finance/general-ledger | FinanceReportsModule | apps/api/src/reporting/finance/finance-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/finance/cost-centers | FinanceReportsModule | apps/api/src/reporting/finance/finance-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/hr/employees | HrReportsModule | apps/api/src/reporting/hr/hr-reports.controller.ts |  |
| GET | /reporting/hr/attendance | HrReportsModule | apps/api/src/reporting/hr/hr-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/hr/leave | HrReportsModule | apps/api/src/reporting/hr/hr-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/hr/recruitment | HrReportsModule | apps/api/src/reporting/hr/hr-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/dashboards/executive | ReportingModule | apps/api/src/reporting/dashboards/reporting-dashboards.controller.ts |  |
| GET | /reporting/dashboards/hr | ReportingModule | apps/api/src/reporting/dashboards/reporting-dashboards.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/dashboards/payroll | ReportingModule | apps/api/src/reporting/dashboards/reporting-dashboards.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/dashboards/accounting | ReportingModule | apps/api/src/reporting/dashboards/reporting-dashboards.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/categories | ReportingModule | apps/api/src/reporting/definitions/report-definitions.controller.ts |  |
| POST | /reporting/categories | ReportingModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_READ |
| PATCH | /reporting/categories/:id | ReportingModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_CREATE |
| GET | /reporting/definitions | ReportingModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_UPDATE |
| GET | /reporting/definitions/:id | ReportingModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_READ |
| POST | /reporting/definitions | ReportingModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_READ |
| PATCH | /reporting/definitions/:id | ReportingModule | apps/api/src/reporting/definitions/report-definitions.controller.ts | Permission.REPORTING_CREATE |
| GET | /reporting/executions | ReportingModule | apps/api/src/reporting/execution/report-execution.controller.ts |  |
| GET | /reporting/executions/:id | ReportingModule | apps/api/src/reporting/execution/report-execution.controller.ts | Permission.REPORTING_READ |
| POST | /reporting/executions | ReportingModule | apps/api/src/reporting/execution/report-execution.controller.ts | Permission.REPORTING_READ |
| POST | /reporting/exports | ReportingModule | apps/api/src/reporting/exports/report-export.controller.ts |  |
| GET | /reporting/finance/payroll-summary | ReportingModule | apps/api/src/reporting/finance/finance-reports.controller.ts |  |
| GET | /reporting/finance/payslip-summary | ReportingModule | apps/api/src/reporting/finance/finance-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/finance/trial-balance | ReportingModule | apps/api/src/reporting/finance/finance-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/finance/general-ledger | ReportingModule | apps/api/src/reporting/finance/finance-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/finance/cost-centers | ReportingModule | apps/api/src/reporting/finance/finance-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/hr/employees | ReportingModule | apps/api/src/reporting/hr/hr-reports.controller.ts |  |
| GET | /reporting/hr/attendance | ReportingModule | apps/api/src/reporting/hr/hr-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/hr/leave | ReportingModule | apps/api/src/reporting/hr/hr-reports.controller.ts | Permission.REPORTING_READ |
| GET | /reporting/hr/recruitment | ReportingModule | apps/api/src/reporting/hr/hr-reports.controller.ts | Permission.REPORTING_READ |
| GET | /roles | RolesModule | apps/api/src/roles/roles.controller.ts |  |
| GET | /roles/:id | RolesModule | apps/api/src/roles/roles.controller.ts | Permission.ROLES_READ |
| POST | /roles | RolesModule | apps/api/src/roles/roles.controller.ts | Permission.ROLES_READ |
| PATCH | /roles/:id | RolesModule | apps/api/src/roles/roles.controller.ts | Permission.ROLES_CREATE |
| DELETE | /roles/:id | RolesModule | apps/api/src/roles/roles.controller.ts | Permission.ROLES_UPDATE |
| GET | /scheduler/crons | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts |  |
| POST | /scheduler/crons | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_READ |
| PATCH | /scheduler/crons/:id | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_CREATE |
| DELETE | /scheduler/crons/:id | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_UPDATE |
| GET | /scheduler/jobs | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_DELETE |
| POST | /scheduler/jobs | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_READ |
| PATCH | /scheduler/jobs/:id | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_CREATE |
| POST | /scheduler/jobs/:id/cancel | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_UPDATE |
| GET | /scheduler/history | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_EXECUTE |
| POST | /scheduler/queue/claim | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_READ |
| POST | /scheduler/jobs/:id/complete | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_EXECUTE |
| POST | /scheduler/jobs/:id/fail | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_EXECUTE |
| POST | /scheduler/jobs/:id/retry | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_EXECUTE |
| POST | /scheduler/jobs/:id/recover | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_EXECUTE |
| GET | /scheduler/recoveries | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_EXECUTE |
| GET | /scheduler/monitoring/dashboard | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_MONITOR |
| GET | /scheduler/monitoring/queues | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_MONITOR |
| GET | /scheduler/monitoring/failures | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_MONITOR |
| GET | /scheduler/monitoring/system-status | SchedulerModule | apps/api/src/scheduler/scheduler.controller.ts | Permission.SCHEDULER_MONITOR |
| GET | /search/global | SearchModule | apps/api/src/search/search.controller.ts |  |
| GET | /search/employees | SearchModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_GLOBAL |
| GET | /search/payroll | SearchModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_EMPLOYEES |
| GET | /search/documents | SearchModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_PAYROLL |
| GET | /search/workflows | SearchModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_DOCUMENTS |
| GET | /search/index | SearchModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_WORKFLOWS |
| POST | /search/index | SearchModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_ADMIN |
| POST | /search/index/rebuild | SearchModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_ADMIN |
| GET | /search/audit | SearchModule | apps/api/src/search/search.controller.ts | Permission.SEARCH_ADMIN |
| GET | /tenants | TenantsModule | apps/api/src/tenants/tenants.controller.ts |  |
| POST | /tenants | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| PATCH | /tenants/:id | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_CREATE |
| DELETE | /tenants/:id | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| POST | /tenants/:id/restore | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_DELETE |
| GET | /tenants/domains | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| POST | /tenants/domains | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| POST | /tenants/resolve | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| GET | /tenants/isolation/companies | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| POST | /tenants/isolation/companies/:companyId/assign | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| GET | /tenants/isolation/branches | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| POST | /tenants/isolation/branches/:branchId/assign | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| POST | /tenants/isolation/validate | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| GET | /tenants/configuration/settings | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_SECURITY |
| POST | /tenants/configuration/settings | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| PATCH | /tenants/configuration/settings/:id | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| DELETE | /tenants/configuration/settings/:id | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| GET | /tenants/configuration/feature-flags | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_DELETE |
| POST | /tenants/configuration/feature-flags | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| PATCH | /tenants/configuration/feature-flags/:id | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| DELETE | /tenants/configuration/feature-flags/:id | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| GET | /tenants/configuration/localizations | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_DELETE |
| POST | /tenants/configuration/localizations | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| PATCH | /tenants/configuration/localizations/:id | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| POST | /tenants/configuration/branding | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| POST | /tenants/administration/provision | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| POST | /tenants/administration/:id/activate | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_PROVISION |
| POST | /tenants/administration/:id/suspend | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_PROVISION |
| POST | /tenants/administration/:id/resume | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_PROVISION |
| POST | /tenants/administration/:id/archive | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_PROVISION |
| GET | /tenants/administration/usage-limits | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_PROVISION |
| POST | /tenants/administration/usage-limits | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| PATCH | /tenants/administration/usage-limits/:id | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| DELETE | /tenants/administration/usage-limits/:id | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_UPDATE |
| GET | /tenants/administration/events | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_DELETE |
| POST | /tenants/administration/events | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_READ |
| GET | /tenants/security/permission-policies | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_PROVISION |
| POST | /tenants/security/permission-policies | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_SECURITY |
| PATCH | /tenants/security/permission-policies/:id | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_SECURITY |
| DELETE | /tenants/security/permission-policies/:id | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_SECURITY |
| POST | /tenants/security/validate | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_SECURITY |
| GET | /tenants/security/audit-events | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_SECURITY |
| POST | /tenants/security/audit-events | TenantsModule | apps/api/src/tenants/tenants.controller.ts | Permission.TENANTS_SECURITY |
| GET | /users | UsersModule | apps/api/src/users/users.controller.ts |  |
| GET | /users/:id | UsersModule | apps/api/src/users/users.controller.ts | Permission.USERS_READ |
| POST | /users | UsersModule | apps/api/src/users/users.controller.ts | Permission.USERS_READ |
| PATCH | /users/:id | UsersModule | apps/api/src/users/users.controller.ts | Permission.USERS_CREATE |
| DELETE | /users/:id | UsersModule | apps/api/src/users/users.controller.ts | Permission.USERS_UPDATE |
| GET | /workflows/dashboard | WorkflowDashboardModule | apps/api/src/workflows/dashboard/workflow-dashboard.controller.ts |  |
| GET | /workflows/definitions | WorkflowDefinitionsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts |  |
| GET | /workflows/definitions/:id | WorkflowDefinitionsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_READ |
| POST | /workflows/definitions | WorkflowDefinitionsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_READ |
| PATCH | /workflows/definitions/:id | WorkflowDefinitionsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_CREATE |
| POST | /workflows/definitions/:id/activate | WorkflowDefinitionsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_UPDATE |
| POST | /workflows/definitions/:id/archive | WorkflowDefinitionsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_UPDATE |
| POST | /workflows/definitions/:id/steps | WorkflowDefinitionsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_UPDATE |
| PATCH | /workflows/definitions/:id/steps/:stepId | WorkflowDefinitionsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_UPDATE |
| DELETE | /workflows/definitions/:id/steps/:stepId | WorkflowDefinitionsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_UPDATE |
| GET | /workflows/requests | WorkflowRuntimeModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts |  |
| GET | /workflows/requests/:id | WorkflowRuntimeModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_READ |
| GET | /workflows/requests/:id/history | WorkflowRuntimeModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_READ |
| POST | /workflows/requests | WorkflowRuntimeModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_READ |
| POST | /workflows/requests/:id/steps/:stepId/approve | WorkflowRuntimeModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_CREATE |
| POST | /workflows/requests/:id/steps/:stepId/reject | WorkflowRuntimeModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_UPDATE |
| POST | /workflows/requests/:id/cancel | WorkflowRuntimeModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_UPDATE |
| GET | /workflows/dashboard | WorkflowsModule | apps/api/src/workflows/dashboard/workflow-dashboard.controller.ts |  |
| GET | /workflows/definitions | WorkflowsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts |  |
| GET | /workflows/definitions/:id | WorkflowsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_READ |
| POST | /workflows/definitions | WorkflowsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_READ |
| PATCH | /workflows/definitions/:id | WorkflowsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_CREATE |
| POST | /workflows/definitions/:id/activate | WorkflowsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_UPDATE |
| POST | /workflows/definitions/:id/archive | WorkflowsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_UPDATE |
| POST | /workflows/definitions/:id/steps | WorkflowsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_UPDATE |
| PATCH | /workflows/definitions/:id/steps/:stepId | WorkflowsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_UPDATE |
| DELETE | /workflows/definitions/:id/steps/:stepId | WorkflowsModule | apps/api/src/workflows/definitions/workflow-definitions.controller.ts | Permission.WORKFLOWS_UPDATE |
| GET | /workflows/requests | WorkflowsModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts |  |
| GET | /workflows/requests/:id | WorkflowsModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_READ |
| GET | /workflows/requests/:id/history | WorkflowsModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_READ |
| POST | /workflows/requests | WorkflowsModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_READ |
| POST | /workflows/requests/:id/steps/:stepId/approve | WorkflowsModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_CREATE |
| POST | /workflows/requests/:id/steps/:stepId/reject | WorkflowsModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_UPDATE |
| POST | /workflows/requests/:id/cancel | WorkflowsModule | apps/api/src/workflows/runtime/workflow-runtime.controller.ts | Permission.WORKFLOWS_UPDATE |
