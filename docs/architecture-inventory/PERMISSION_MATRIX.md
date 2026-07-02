# Permission Matrix

Date: 2026-07-02

## Permission Constants

| Constant | Value |
| --- | --- |

## Route Permission Usage

| Module | Method | Path | Permission |
| --- | --- | --- | --- |
| AccountingModule | GET | /accounting/accounts |  |
| AccountingModule | GET | /accounting/accounts/:id | Permission.ACCOUNTING_READ |
| AccountingModule | POST | /accounting/accounts | Permission.ACCOUNTING_READ |
| AccountingModule | PATCH | /accounting/accounts/:id | Permission.ACCOUNTING_CREATE |
| AccountingModule | DELETE | /accounting/accounts/:id | Permission.ACCOUNTING_UPDATE |
| AccountingModule | GET | /accounting/dimensions/cost-centers |  |
| AccountingModule | GET | /accounting/dimensions/departments | Permission.ACCOUNTING_READ |
| AccountingModule | GET | /accounting/dimensions/branches | Permission.ACCOUNTING_READ |
| AccountingModule | GET | /accounting/journal-entries |  |
| AccountingModule | GET | /accounting/journal-entries/:id | Permission.ACCOUNTING_READ |
| AccountingModule | POST | /accounting/journal-entries | Permission.ACCOUNTING_READ |
| AccountingModule | PATCH | /accounting/journal-entries/:id | Permission.ACCOUNTING_CREATE |
| AccountingModule | POST | /accounting/journal-entries/:id/post | Permission.ACCOUNTING_UPDATE |
| AccountingModule | POST | /accounting/journal-entries/:id/void | Permission.ACCOUNTING_UPDATE |
| AccountingModule | POST | /accounting/payroll/generate-journal |  |
| AccountingModule | GET | /accounting/reports/trial-balance |  |
| AccountingModule | GET | /accounting/reports/general-ledger | Permission.ACCOUNTING_READ |
| AccountingModule | GET | /accounting/reports/payroll | Permission.ACCOUNTING_READ |
| AccountingModule | GET | /accounting/reports/cost-centers | Permission.ACCOUNTING_READ |
| AccountsModule | GET | /accounting/accounts |  |
| AccountsModule | GET | /accounting/accounts/:id | Permission.ACCOUNTING_READ |
| AccountsModule | POST | /accounting/accounts | Permission.ACCOUNTING_READ |
| AccountsModule | PATCH | /accounting/accounts/:id | Permission.ACCOUNTING_CREATE |
| AccountsModule | DELETE | /accounting/accounts/:id | Permission.ACCOUNTING_UPDATE |
| AccountingCostCenterReportsModule | GET | /accounting/dimensions/cost-centers |  |
| AccountingCostCenterReportsModule | GET | /accounting/dimensions/departments | Permission.ACCOUNTING_READ |
| AccountingCostCenterReportsModule | GET | /accounting/dimensions/branches | Permission.ACCOUNTING_READ |
| JournalEntriesModule | GET | /accounting/journal-entries |  |
| JournalEntriesModule | GET | /accounting/journal-entries/:id | Permission.ACCOUNTING_READ |
| JournalEntriesModule | POST | /accounting/journal-entries | Permission.ACCOUNTING_READ |
| JournalEntriesModule | PATCH | /accounting/journal-entries/:id | Permission.ACCOUNTING_CREATE |
| JournalEntriesModule | POST | /accounting/journal-entries/:id/post | Permission.ACCOUNTING_UPDATE |
| JournalEntriesModule | POST | /accounting/journal-entries/:id/void | Permission.ACCOUNTING_UPDATE |
| PayrollAccountingModule | POST | /accounting/payroll/generate-journal |  |
| AccountingReportsModule | GET | /accounting/reports/trial-balance |  |
| AccountingReportsModule | GET | /accounting/reports/general-ledger | Permission.ACCOUNTING_READ |
| AccountingReportsModule | GET | /accounting/reports/payroll | Permission.ACCOUNTING_READ |
| AccountingReportsModule | GET | /accounting/reports/cost-centers | Permission.ACCOUNTING_READ |
| AiModule | GET | /ai/providers |  |
| AiModule | POST | /ai/providers | Permission.AI_READ |
| AiModule | PATCH | /ai/providers/:id | Permission.AI_CREATE |
| AiModule | DELETE | /ai/providers/:id | Permission.AI_UPDATE |
| AiModule | POST | /ai/complete | Permission.AI_DELETE |
| AiModule | GET | /ai/requests | Permission.AI_EXECUTE |
| AiModule | GET | /ai/usage | Permission.AI_READ |
| AiModule | GET | /ai/governance/limits |  |
| AiModule | POST | /ai/governance/limits | Permission.AI_GOVERN |
| AiModule | PATCH | /ai/governance/limits/:id | Permission.AI_GOVERN |
| AiModule | DELETE | /ai/governance/limits/:id | Permission.AI_GOVERN |
| AiModule | GET | /ai/governance/policies | Permission.AI_GOVERN |
| AiModule | POST | /ai/governance/policies | Permission.AI_GOVERN |
| AiModule | PATCH | /ai/governance/policies/:id | Permission.AI_GOVERN |
| AiModule | DELETE | /ai/governance/policies/:id | Permission.AI_GOVERN |
| AiModule | GET | /ai/hr/employee-insights |  |
| AiModule | GET | /ai/hr/leave-analysis | Permission.AI_EXECUTE |
| AiModule | GET | /ai/hr/payroll-explanation | Permission.AI_EXECUTE |
| AiModule | GET | /ai/hr/document-alerts | Permission.AI_EXECUTE |
| AiModule | POST | /ai/reporting/natural-language |  |
| AiModule | GET | /ai/reporting/dashboard-insights | Permission.AI_EXECUTE |
| AiModule | GET | /ai/reporting/anomalies | Permission.AI_EXECUTE |
| AiModule | POST | /ai/workflow/approval-recommendation |  |
| AiModule | POST | /ai/workflow/risk-score | Permission.AI_EXECUTE |
| AiModule | POST | /ai/workflow/rule-suggestions | Permission.AI_EXECUTE |
| AppModule | GET | /accounting/accounts |  |
| AppModule | GET | /accounting/accounts/:id | Permission.ACCOUNTING_READ |
| AppModule | POST | /accounting/accounts | Permission.ACCOUNTING_READ |
| AppModule | PATCH | /accounting/accounts/:id | Permission.ACCOUNTING_CREATE |
| AppModule | DELETE | /accounting/accounts/:id | Permission.ACCOUNTING_UPDATE |
| AppModule | GET | /accounting/dimensions/cost-centers |  |
| AppModule | GET | /accounting/dimensions/departments | Permission.ACCOUNTING_READ |
| AppModule | GET | /accounting/dimensions/branches | Permission.ACCOUNTING_READ |
| AppModule | GET | /accounting/journal-entries |  |
| AppModule | GET | /accounting/journal-entries/:id | Permission.ACCOUNTING_READ |
| AppModule | POST | /accounting/journal-entries | Permission.ACCOUNTING_READ |
| AppModule | PATCH | /accounting/journal-entries/:id | Permission.ACCOUNTING_CREATE |
| AppModule | POST | /accounting/journal-entries/:id/post | Permission.ACCOUNTING_UPDATE |
| AppModule | POST | /accounting/journal-entries/:id/void | Permission.ACCOUNTING_UPDATE |
| AppModule | POST | /accounting/payroll/generate-journal |  |
| AppModule | GET | /accounting/reports/trial-balance |  |
| AppModule | GET | /accounting/reports/general-ledger | Permission.ACCOUNTING_READ |
| AppModule | GET | /accounting/reports/payroll | Permission.ACCOUNTING_READ |
| AppModule | GET | /accounting/reports/cost-centers | Permission.ACCOUNTING_READ |
| AppModule | GET | /ai/providers |  |
| AppModule | POST | /ai/providers | Permission.AI_READ |
| AppModule | PATCH | /ai/providers/:id | Permission.AI_CREATE |
| AppModule | DELETE | /ai/providers/:id | Permission.AI_UPDATE |
| AppModule | POST | /ai/complete | Permission.AI_DELETE |
| AppModule | GET | /ai/requests | Permission.AI_EXECUTE |
| AppModule | GET | /ai/usage | Permission.AI_READ |
| AppModule | GET | /ai/governance/limits |  |
| AppModule | POST | /ai/governance/limits | Permission.AI_GOVERN |
| AppModule | PATCH | /ai/governance/limits/:id | Permission.AI_GOVERN |
| AppModule | DELETE | /ai/governance/limits/:id | Permission.AI_GOVERN |
| AppModule | GET | /ai/governance/policies | Permission.AI_GOVERN |
| AppModule | POST | /ai/governance/policies | Permission.AI_GOVERN |
| AppModule | PATCH | /ai/governance/policies/:id | Permission.AI_GOVERN |
| AppModule | DELETE | /ai/governance/policies/:id | Permission.AI_GOVERN |
| AppModule | GET | /ai/hr/employee-insights |  |
| AppModule | GET | /ai/hr/leave-analysis | Permission.AI_EXECUTE |
| AppModule | GET | /ai/hr/payroll-explanation | Permission.AI_EXECUTE |
| AppModule | GET | /ai/hr/document-alerts | Permission.AI_EXECUTE |
| AppModule | POST | /ai/reporting/natural-language |  |
| AppModule | GET | /ai/reporting/dashboard-insights | Permission.AI_EXECUTE |
| AppModule | GET | /ai/reporting/anomalies | Permission.AI_EXECUTE |
| AppModule | POST | /ai/workflow/approval-recommendation |  |
| AppModule | POST | /ai/workflow/risk-score | Permission.AI_EXECUTE |
| AppModule | POST | /ai/workflow/rule-suggestions | Permission.AI_EXECUTE |
| AppModule | GET | / |  |
| AppModule | GET | /assets |  |
| AppModule | GET | /assets/:id | Permission.ASSETS_READ |
| AppModule | POST | /assets | Permission.ASSETS_READ |
| AppModule | PATCH | /assets/:id | Permission.ASSETS_CREATE |
| AppModule | DELETE | /assets/:id | Permission.ASSETS_UPDATE |
| AppModule | GET | /assets/assignments |  |
| AppModule | GET | /assets/assignments/:id | Permission.ASSETS_READ |
| AppModule | POST | /assets/assignments | Permission.ASSETS_READ |
| AppModule | POST | /assets/assignments/:id/return | Permission.ASSETS_CREATE |
| AppModule | POST | /assets/assignments/:id/lost | Permission.ASSETS_UPDATE |
| AppModule | DELETE | /assets/assignments/:id | Permission.ASSETS_UPDATE |
| AppModule | GET | /assets/categories |  |
| AppModule | GET | /assets/categories/:id | Permission.ASSETS_READ |
| AppModule | POST | /assets/categories | Permission.ASSETS_READ |
| AppModule | PATCH | /assets/categories/:id | Permission.ASSETS_CREATE |
| AppModule | DELETE | /assets/categories/:id | Permission.ASSETS_UPDATE |
| AppModule | GET | /assets/dashboard/summary |  |
| AppModule | GET | /assets/maintenance |  |
| AppModule | GET | /assets/maintenance/:id | Permission.ASSETS_READ |
| AppModule | POST | /assets/maintenance | Permission.ASSETS_READ |
| AppModule | PATCH | /assets/maintenance/:id | Permission.ASSETS_CREATE |
| AppModule | DELETE | /assets/maintenance/:id | Permission.ASSETS_UPDATE |
| AppModule | GET | /attendance/holidays |  |
| AppModule | GET | /attendance/holidays/:id | Permission.ATTENDANCE_READ |
| AppModule | POST | /attendance/holidays | Permission.ATTENDANCE_READ |
| AppModule | PATCH | /attendance/holidays/:id | Permission.ATTENDANCE_CREATE |
| AppModule | DELETE | /attendance/holidays/:id | Permission.ATTENDANCE_UPDATE |
| AppModule | GET | /attendance/records |  |
| AppModule | GET | /attendance/records/:id | Permission.ATTENDANCE_READ |
| AppModule | POST | /attendance/records | Permission.ATTENDANCE_READ |
| AppModule | PATCH | /attendance/records/:id | Permission.ATTENDANCE_CREATE |
| AppModule | DELETE | /attendance/records/:id | Permission.ATTENDANCE_UPDATE |
| AppModule | GET | /attendance/shifts |  |
| AppModule | GET | /attendance/shifts/:id | Permission.ATTENDANCE_READ |
| AppModule | POST | /attendance/shifts | Permission.ATTENDANCE_READ |
| AppModule | PATCH | /attendance/shifts/:id | Permission.ATTENDANCE_CREATE |
| AppModule | DELETE | /attendance/shifts/:id | Permission.ATTENDANCE_UPDATE |
| AppModule | POST | /auth/login |  |
| AppModule | GET | /bi/kpis |  |
| AppModule | POST | /bi/kpis | Permission.BI_READ |
| AppModule | PATCH | /bi/kpis/:id | Permission.BI_MANAGE |
| AppModule | POST | /bi/kpis/:id/archive | Permission.BI_MANAGE |
| AppModule | POST | /bi/kpis/:id/snapshots | Permission.BI_MANAGE |
| AppModule | GET | /bi/kpis/:id/snapshots | Permission.BI_EXECUTE |
| AppModule | GET | /bi/datasets | Permission.BI_READ |
| AppModule | POST | /bi/datasets | Permission.BI_READ |
| AppModule | PATCH | /bi/datasets/:id | Permission.BI_MANAGE |
| AppModule | POST | /bi/datasets/:id/run | Permission.BI_MANAGE |
| AppModule | GET | /bi/metrics | Permission.BI_EXECUTE |
| AppModule | POST | /bi/metrics | Permission.BI_READ |
| AppModule | PATCH | /bi/metrics/:id | Permission.BI_MANAGE |
| AppModule | POST | /bi/metrics/:id/observations | Permission.BI_MANAGE |
| AppModule | GET | /bi/dashboards | Permission.BI_EXECUTE |
| AppModule | POST | /bi/dashboards | Permission.BI_DASHBOARD |
| AppModule | POST | /bi/dashboards/:id/widgets | Permission.BI_MANAGE |
| AppModule | GET | /bi/dashboards/executive/summary | Permission.BI_MANAGE |
| AppModule | GET | /bi/kpis/:id/trend | Permission.BI_DASHBOARD |
| AppModule | GET | /bi/metrics/:id/trend | Permission.BI_READ |
| AppModule | GET | /bi/predictions/models | Permission.BI_READ |
| AppModule | POST | /bi/predictions/models | Permission.BI_PREDICT |
| AppModule | POST | /bi/predictions/models/:id/run | Permission.BI_PREDICT |
| AppModule | GET | /business-rules/categories |  |
| AppModule | POST | /business-rules/categories | Permission.BUSINESS_RULES_READ |
| AppModule | PATCH | /business-rules/categories/:id | Permission.BUSINESS_RULES_CREATE |
| AppModule | DELETE | /business-rules/categories/:id | Permission.BUSINESS_RULES_UPDATE |
| AppModule | POST | /business-rules/categories/:id/restore | Permission.BUSINESS_RULES_DELETE |
| AppModule | GET | /business-rules/executions | Permission.BUSINESS_RULES_UPDATE |
| AppModule | GET | /business-rules/dashboard | Permission.BUSINESS_RULES_READ |
| AppModule | GET | /business-rules | Permission.BUSINESS_RULES_READ |
| AppModule | POST | /business-rules/evaluate | Permission.BUSINESS_RULES_READ |
| AppModule | GET | /business-rules/:id/conditions | Permission.BUSINESS_RULES_EXECUTE |
| AppModule | POST | /business-rules/:id/conditions | Permission.BUSINESS_RULES_READ |
| AppModule | PATCH | /business-rules/:id/conditions/:conditionId | Permission.BUSINESS_RULES_UPDATE |
| AppModule | DELETE | /business-rules/:id/conditions/:conditionId | Permission.BUSINESS_RULES_UPDATE |
| AppModule | GET | /business-rules/:id/actions | Permission.BUSINESS_RULES_DELETE |
| AppModule | POST | /business-rules/:id/actions | Permission.BUSINESS_RULES_READ |
| AppModule | PATCH | /business-rules/:id/actions/:actionId | Permission.BUSINESS_RULES_UPDATE |
| AppModule | DELETE | /business-rules/:id/actions/:actionId | Permission.BUSINESS_RULES_UPDATE |
| AppModule | GET | /business-rules/:id | Permission.BUSINESS_RULES_DELETE |
| AppModule | POST | /business-rules | Permission.BUSINESS_RULES_READ |
| AppModule | PATCH | /business-rules/:id | Permission.BUSINESS_RULES_CREATE |
| AppModule | DELETE | /business-rules/:id | Permission.BUSINESS_RULES_UPDATE |
| AppModule | POST | /business-rules/:id/restore | Permission.BUSINESS_RULES_DELETE |
| AppModule | GET | /documents/categories |  |
| AppModule | GET | /documents/categories/:id | Permission.DOCUMENTS_READ |
| AppModule | POST | /documents/categories | Permission.DOCUMENTS_READ |
| AppModule | PATCH | /documents/categories/:id | Permission.DOCUMENTS_CREATE |
| AppModule | DELETE | /documents/categories/:id | Permission.DOCUMENTS_UPDATE |
| AppModule | GET | /documents/dashboard/summary |  |
| AppModule | GET | /documents |  |
| AppModule | GET | /documents/:id | Permission.DOCUMENTS_READ |
| AppModule | POST | /documents | Permission.DOCUMENTS_READ |
| AppModule | PATCH | /documents/:id | Permission.DOCUMENTS_CREATE |
| AppModule | POST | /documents/:id/archive | Permission.DOCUMENTS_UPDATE |
| AppModule | DELETE | /documents/:id | Permission.DOCUMENTS_UPDATE |
| AppModule | POST | /documents/expiration/mark-expired |  |
| AppModule | GET | /documents/expiration/expired | Permission.DOCUMENTS_UPDATE |
| AppModule | GET | /documents/expiration/soon/:days | Permission.DOCUMENTS_READ |
| AppModule | GET | /documents/versions |  |
| AppModule | GET | /documents/versions/document/:documentId | Permission.DOCUMENTS_READ |
| AppModule | GET | /documents/versions/:id | Permission.DOCUMENTS_READ |
| AppModule | POST | /documents/versions | Permission.DOCUMENTS_READ |
| AppModule | DELETE | /documents/versions/:id | Permission.DOCUMENTS_CREATE |
| AppModule | GET | /employees |  |
| AppModule | GET | /employees/:id | Permission.EMPLOYEES_READ |
| AppModule | POST | /employees | Permission.EMPLOYEES_READ |
| AppModule | PATCH | /employees/:id | Permission.EMPLOYEES_CREATE |
| AppModule | DELETE | /employees/:id | Permission.EMPLOYEES_UPDATE |
| AppModule | GET | /ess/requests |  |
| AppModule | GET | /ess/requests/employee/:employeeId | Permission.ESS_READ |
| AppModule | GET | /ess/requests/:id | Permission.ESS_READ |
| AppModule | POST | /ess/requests | Permission.ESS_READ |
| AppModule | PATCH | /ess/requests/:id | Permission.ESS_CREATE |
| AppModule | POST | /ess/requests/:id/submit | Permission.ESS_UPDATE |
| AppModule | POST | /ess/requests/:id/review | Permission.ESS_UPDATE |
| AppModule | DELETE | /ess/requests/:id | Permission.ESS_UPDATE |
| AppModule | GET | /integrations/providers |  |
| AppModule | POST | /integrations/providers | Permission.INTEGRATIONS_READ |
| AppModule | PATCH | /integrations/providers/:id | Permission.INTEGRATIONS_CREATE |
| AppModule | DELETE | /integrations/providers/:id | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/providers/:id/restore | Permission.INTEGRATIONS_DELETE |
| AppModule | POST | /integrations/providers/:id/enable | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/providers/:id/disable | Permission.INTEGRATIONS_UPDATE |
| AppModule | GET | /integrations/credentials | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/credentials | Permission.INTEGRATIONS_READ |
| AppModule | PATCH | /integrations/credentials/:id | Permission.INTEGRATIONS_CREATE |
| AppModule | DELETE | /integrations/credentials/:id | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/credentials/:id/restore | Permission.INTEGRATIONS_DELETE |
| AppModule | POST | /integrations/credentials/:id/enable | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/credentials/:id/disable | Permission.INTEGRATIONS_UPDATE |
| AppModule | GET | /integrations/connections | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/connections | Permission.INTEGRATIONS_READ |
| AppModule | PATCH | /integrations/connections/:id | Permission.INTEGRATIONS_CREATE |
| AppModule | DELETE | /integrations/connections/:id | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/connections/:id/restore | Permission.INTEGRATIONS_DELETE |
| AppModule | POST | /integrations/connections/:id/test | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/connections/:id/connect | Permission.INTEGRATIONS_EXECUTE |
| AppModule | POST | /integrations/connections/:id/disconnect | Permission.INTEGRATIONS_EXECUTE |
| AppModule | POST | /integrations/connections/:id/enable | Permission.INTEGRATIONS_EXECUTE |
| AppModule | POST | /integrations/connections/:id/disable | Permission.INTEGRATIONS_UPDATE |
| AppModule | GET | /integrations/retry-policies | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/retry-policies | Permission.INTEGRATIONS_READ |
| AppModule | PATCH | /integrations/retry-policies/:id | Permission.INTEGRATIONS_CREATE |
| AppModule | DELETE | /integrations/retry-policies/:id | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/retry-policies/:id/restore | Permission.INTEGRATIONS_DELETE |
| AppModule | POST | /integrations/retry-policies/:id/enable | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/retry-policies/:id/disable | Permission.INTEGRATIONS_UPDATE |
| AppModule | GET | /integrations/webhooks | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/webhooks | Permission.INTEGRATIONS_READ |
| AppModule | PATCH | /integrations/webhooks/:id | Permission.INTEGRATIONS_CREATE |
| AppModule | DELETE | /integrations/webhooks/:id | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/webhooks/:id/restore | Permission.INTEGRATIONS_DELETE |
| AppModule | POST | /integrations/webhooks/:id/enable | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/webhooks/:id/disable | Permission.INTEGRATIONS_UPDATE |
| AppModule | GET | /integrations/rest-connectors | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/rest-connectors | Permission.INTEGRATIONS_READ |
| AppModule | PATCH | /integrations/rest-connectors/:id | Permission.INTEGRATIONS_CREATE |
| AppModule | DELETE | /integrations/rest-connectors/:id | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/rest-connectors/:id/restore | Permission.INTEGRATIONS_DELETE |
| AppModule | POST | /integrations/rest-connectors/:id/enable | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/rest-connectors/:id/disable | Permission.INTEGRATIONS_UPDATE |
| AppModule | GET | /integrations/outbound-jobs | Permission.INTEGRATIONS_UPDATE |
| AppModule | POST | /integrations/outbound-jobs | Permission.INTEGRATIONS_MONITOR |
| AppModule | POST | /integrations/outbound-jobs/process-due | Permission.INTEGRATIONS_EXECUTE |
| AppModule | POST | /integrations/outbound-jobs/:id/execute | Permission.INTEGRATIONS_EXECUTE |
| AppModule | POST | /integrations/outbound-jobs/:id/retry | Permission.INTEGRATIONS_EXECUTE |
| AppModule | POST | /integrations/outbound-jobs/:id/cancel | Permission.INTEGRATIONS_EXECUTE |
| AppModule | POST | /integrations/inbound/:connectionId/webhook | Permission.INTEGRATIONS_UPDATE |
| AppModule | GET | /integrations/inbound-events | Permission.INTEGRATIONS_UPDATE |
| AppModule | GET | /integrations/executions | Permission.INTEGRATIONS_MONITOR |
| AppModule | GET | /integrations/dashboard | Permission.INTEGRATIONS_MONITOR |
| AppModule | GET | /integrations/retry-history | Permission.INTEGRATIONS_MONITOR |
| AppModule | GET | /integrations/health | Permission.INTEGRATIONS_MONITOR |
| AppModule | POST | /integrations/connections/:id/health-check | Permission.INTEGRATIONS_MONITOR |
| AppModule | GET | /leave/balances |  |
| AppModule | GET | /leave/balances/:id | Permission.LEAVE_READ |
| AppModule | POST | /leave/balances | Permission.LEAVE_READ |
| AppModule | PATCH | /leave/balances/:id | Permission.LEAVE_CREATE |
| AppModule | DELETE | /leave/balances/:id | Permission.LEAVE_UPDATE |
| AppModule | GET | /leave/requests |  |
| AppModule | GET | /leave/requests/:id | Permission.LEAVE_READ |
| AppModule | POST | /leave/requests | Permission.LEAVE_READ |
| AppModule | PATCH | /leave/requests/:id | Permission.LEAVE_CREATE |
| AppModule | DELETE | /leave/requests/:id | Permission.LEAVE_UPDATE |
| AppModule | GET | /leave/types |  |
| AppModule | GET | /leave/types/:id | Permission.LEAVE_READ |
| AppModule | POST | /leave/types | Permission.LEAVE_READ |
| AppModule | PATCH | /leave/types/:id | Permission.LEAVE_CREATE |
| AppModule | DELETE | /leave/types/:id | Permission.LEAVE_UPDATE |
| AppModule | POST | /mobile/auth/login |  |
| AppModule | POST | /mobile/auth/refresh |  |
| AppModule | POST | /mobile/auth/logout |  |
| AppModule | GET | /mobile/bootstrap | Permission.MOBILE_ACCESS |
| AppModule | POST | /mobile/devices/register | Permission.MOBILE_ACCESS |
| AppModule | GET | /mobile/devices | Permission.MOBILE_ACCESS |
| AppModule | PATCH | /mobile/devices/:id | Permission.MOBILE_READ |
| AppModule | POST | /mobile/devices/:id/revoke | Permission.MOBILE_MANAGE |
| AppModule | GET | /mobile/sessions | Permission.MOBILE_MANAGE |
| AppModule | POST | /mobile/sessions/:id/revoke | Permission.MOBILE_SESSIONS |
| AppModule | POST | /mobile/push/notifications | Permission.MOBILE_SESSIONS |
| AppModule | GET | /mobile/push/notifications | Permission.MOBILE_PUSH |
| AppModule | PATCH | /mobile/push/notifications/:id | Permission.MOBILE_PUSH |
| AppModule | POST | /mobile/sync/pull | Permission.MOBILE_PUSH |
| AppModule | POST | /mobile/sync/changes | Permission.MOBILE_SYNC |
| AppModule | GET | /mobile/sync/changes | Permission.MOBILE_SYNC |
| AppModule | GET | /notifications/dashboard |  |
| AppModule | POST | /notifications/jobs/scheduled |  |
| AppModule | POST | /notifications/jobs/retry-failed | Permission.NOTIFICATIONS_UPDATE |
| AppModule | POST | /notifications/jobs/expire-workflows | Permission.NOTIFICATIONS_UPDATE |
| AppModule | POST | /notifications/jobs/cleanup | Permission.WORKFLOWS_UPDATE |
| AppModule | POST | /notifications/jobs/maintenance | Permission.NOTIFICATIONS_DELETE |
| AppModule | GET | /notifications |  |
| AppModule | GET | /notifications/employee/:employeeId | Permission.NOTIFICATIONS_READ |
| AppModule | GET | /notifications/:id | Permission.NOTIFICATIONS_READ |
| AppModule | POST | /notifications | Permission.NOTIFICATIONS_READ |
| AppModule | PATCH | /notifications/:id | Permission.NOTIFICATIONS_CREATE |
| AppModule | POST | /notifications/:id/read | Permission.NOTIFICATIONS_UPDATE |
| AppModule | POST | /notifications/:id/sent | Permission.NOTIFICATIONS_UPDATE |
| AppModule | POST | /notifications/:id/cancel | Permission.NOTIFICATIONS_UPDATE |
| AppModule | POST | /notifications/queue/process | Permission.NOTIFICATIONS_UPDATE |
| AppModule | POST | /notifications/queue/retry-failed | Permission.NOTIFICATIONS_UPDATE |
| AppModule | DELETE | /notifications/:id | Permission.NOTIFICATIONS_UPDATE |
| AppModule | GET | /observability/health/providers |  |
| AppModule | POST | /observability/health/providers | Permission.OBSERVABILITY_READ |
| AppModule | PATCH | /observability/health/providers/:id | Permission.OBSERVABILITY_CREATE |
| AppModule | DELETE | /observability/health/providers/:id | Permission.OBSERVABILITY_UPDATE |
| AppModule | POST | /observability/health/providers/:id/run | Permission.OBSERVABILITY_DELETE |
| AppModule | POST | /observability/health/liveness | Permission.OBSERVABILITY_ADMIN |
| AppModule | POST | /observability/health/readiness | Permission.OBSERVABILITY_READ |
| AppModule | GET | /observability/health/results | Permission.OBSERVABILITY_READ |
| AppModule | GET | /observability/metrics/definitions | Permission.OBSERVABILITY_READ |
| AppModule | POST | /observability/metrics/definitions | Permission.OBSERVABILITY_READ |
| AppModule | PATCH | /observability/metrics/definitions/:id | Permission.OBSERVABILITY_CREATE |
| AppModule | DELETE | /observability/metrics/definitions/:id | Permission.OBSERVABILITY_UPDATE |
| AppModule | GET | /observability/metrics/samples | Permission.OBSERVABILITY_DELETE |
| AppModule | POST | /observability/metrics/samples | Permission.OBSERVABILITY_READ |
| AppModule | GET | /observability/metrics/http | Permission.OBSERVABILITY_CREATE |
| AppModule | GET | /observability/metrics/database | Permission.OBSERVABILITY_READ |
| AppModule | GET | /observability/metrics/workflow | Permission.OBSERVABILITY_READ |
| AppModule | GET | /observability/metrics/payroll | Permission.OBSERVABILITY_READ |
| AppModule | GET | /observability/metrics/business-rules | Permission.OBSERVABILITY_READ |
| AppModule | GET | /observability/logs | Permission.OBSERVABILITY_READ |
| AppModule | POST | /observability/logs | Permission.OBSERVABILITY_READ |
| AppModule | GET | /observability/logs/summary | Permission.OBSERVABILITY_CREATE |
| AppModule | GET | /observability/traces | Permission.OBSERVABILITY_READ |
| AppModule | POST | /observability/traces | Permission.OBSERVABILITY_READ |
| AppModule | GET | /observability/traces/spans | Permission.OBSERVABILITY_CREATE |
| AppModule | POST | /observability/traces/spans | Permission.OBSERVABILITY_READ |
| AppModule | GET | /observability/traces/requests | Permission.OBSERVABILITY_CREATE |
| AppModule | GET | /observability/traces/services | Permission.OBSERVABILITY_READ |
| AppModule | GET | /observability/traces/database | Permission.OBSERVABILITY_READ |
| AppModule | GET | /observability/traces/external-providers | Permission.OBSERVABILITY_READ |
| AppModule | GET | /observability/management/status | Permission.OBSERVABILITY_READ |
| AppModule | GET | /observability/management/diagnostics | Permission.OBSERVABILITY_ADMIN |
| AppModule | GET | /observability/management/metrics | Permission.OBSERVABILITY_ADMIN |
| AppModule | GET | /observability/management/health | Permission.OBSERVABILITY_ADMIN |
| AppModule | GET | /organization/branches |  |
| AppModule | GET | /organization/branches/:id | Permission.ORGANIZATION_READ |
| AppModule | POST | /organization/branches | Permission.ORGANIZATION_READ |
| AppModule | PATCH | /organization/branches/:id | Permission.ORGANIZATION_CREATE |
| AppModule | DELETE | /organization/branches/:id | Permission.ORGANIZATION_UPDATE |
| AppModule | GET | /organization/companies |  |
| AppModule | GET | /organization/companies/:id | Permission.ORGANIZATION_READ |
| AppModule | POST | /organization/companies | Permission.ORGANIZATION_READ |
| AppModule | PATCH | /organization/companies/:id | Permission.ORGANIZATION_CREATE |
| AppModule | DELETE | /organization/companies/:id | Permission.ORGANIZATION_UPDATE |
| AppModule | GET | /organization/cost-centers |  |
| AppModule | GET | /organization/cost-centers/:id | Permission.ORGANIZATION_READ |
| AppModule | POST | /organization/cost-centers | Permission.ORGANIZATION_READ |
| AppModule | PATCH | /organization/cost-centers/:id | Permission.ORGANIZATION_CREATE |
| AppModule | DELETE | /organization/cost-centers/:id | Permission.ORGANIZATION_UPDATE |
| AppModule | GET | /organization/departments |  |
| AppModule | GET | /organization/departments/:id | Permission.ORGANIZATION_READ |
| AppModule | POST | /organization/departments | Permission.ORGANIZATION_READ |
| AppModule | PATCH | /organization/departments/:id | Permission.ORGANIZATION_CREATE |
| AppModule | DELETE | /organization/departments/:id | Permission.ORGANIZATION_UPDATE |
| AppModule | GET | /organization/positions |  |
| AppModule | GET | /organization/positions/:id | Permission.ORGANIZATION_READ |
| AppModule | POST | /organization/positions | Permission.ORGANIZATION_READ |
| AppModule | PATCH | /organization/positions/:id | Permission.ORGANIZATION_CREATE |
| AppModule | DELETE | /organization/positions/:id | Permission.ORGANIZATION_UPDATE |
| AppModule | POST | /payroll/runs/:id/review |  |
| AppModule | POST | /payroll/runs/:id/approve | Permission.PAYROLL_UPDATE |
| AppModule | POST | /payroll/runs/:id/reject | Permission.PAYROLL_UPDATE |
| AppModule | POST | /payroll/runs/:id/lock | Permission.PAYROLL_UPDATE |
| AppModule | POST | /payroll/attendance/apply |  |
| AppModule | POST | /payroll/calculation/preview |  |
| AppModule | POST | /payroll/calculation/calculate | Permission.PAYROLL_READ |
| AppModule | GET | /payroll/items |  |
| AppModule | GET | /payroll/items/run/:payrollRunId | Permission.PAYROLL_READ |
| AppModule | GET | /payroll/items/:id | Permission.PAYROLL_READ |
| AppModule | POST | /payroll/items | Permission.PAYROLL_READ |
| AppModule | PATCH | /payroll/items/:id | Permission.PAYROLL_CREATE |
| AppModule | DELETE | /payroll/items/:id | Permission.PAYROLL_UPDATE |
| AppModule | GET | /payroll/periods |  |
| AppModule | GET | /payroll/periods/:id | Permission.PAYROLL_READ |
| AppModule | POST | /payroll/periods | Permission.PAYROLL_READ |
| AppModule | PATCH | /payroll/periods/:id | Permission.PAYROLL_CREATE |
| AppModule | DELETE | /payroll/periods/:id | Permission.PAYROLL_UPDATE |
| AppModule | GET | /payroll/profiles |  |
| AppModule | GET | /payroll/profiles/:id | Permission.PAYROLL_READ |
| AppModule | POST | /payroll/profiles | Permission.PAYROLL_READ |
| AppModule | PATCH | /payroll/profiles/:id | Permission.PAYROLL_CREATE |
| AppModule | DELETE | /payroll/profiles/:id | Permission.PAYROLL_UPDATE |
| AppModule | GET | /payroll/runs |  |
| AppModule | GET | /payroll/runs/:id | Permission.PAYROLL_READ |
| AppModule | POST | /payroll/runs | Permission.PAYROLL_READ |
| AppModule | PATCH | /payroll/runs/:id | Permission.PAYROLL_CREATE |
| AppModule | DELETE | /payroll/runs/:id | Permission.PAYROLL_UPDATE |
| AppModule | GET | /payroll/payslips |  |
| AppModule | GET | /payroll/payslips/employee/:employeeId | Permission.PAYROLL_READ |
| AppModule | GET | /payroll/payslips/:id | Permission.PAYROLL_READ |
| AppModule | GET | /payroll/payslips/:id/pdf-payload | Permission.PAYROLL_READ |
| AppModule | PATCH | /payroll/payslips/:id | Permission.PAYROLL_READ |
| AppModule | POST | /payroll/payslips/run/:payrollRunId/issue | Permission.PAYROLL_UPDATE |
| AppModule | GET | /payroll/reports/dashboard |  |
| AppModule | GET | /payroll/reports/salary | Permission.PAYROLL_READ |
| AppModule | GET | /payroll/reports/departments | Permission.PAYROLL_READ |
| AppModule | GET | /payroll/reports/cost-centers | Permission.PAYROLL_READ |
| AppModule | GET | /payroll/reports/monthly | Permission.PAYROLL_READ |
| AppModule | GET | /payroll/salary-components |  |
| AppModule | GET | /payroll/salary-components/:id | Permission.PAYROLL_READ |
| AppModule | POST | /payroll/salary-components | Permission.PAYROLL_READ |
| AppModule | PATCH | /payroll/salary-components/:id | Permission.PAYROLL_CREATE |
| AppModule | DELETE | /payroll/salary-components/:id | Permission.PAYROLL_UPDATE |
| AppModule | GET | /performance/cycles |  |
| AppModule | GET | /performance/cycles/:id | Permission.PERFORMANCE_READ |
| AppModule | POST | /performance/cycles | Permission.PERFORMANCE_READ |
| AppModule | PATCH | /performance/cycles/:id | Permission.PERFORMANCE_CREATE |
| AppModule | DELETE | /performance/cycles/:id | Permission.PERFORMANCE_UPDATE |
| AppModule | GET | /performance/dashboard/summary |  |
| AppModule | GET | /performance/goals |  |
| AppModule | GET | /performance/goals/:id | Permission.PERFORMANCE_READ |
| AppModule | POST | /performance/goals | Permission.PERFORMANCE_READ |
| AppModule | PATCH | /performance/goals/:id | Permission.PERFORMANCE_CREATE |
| AppModule | DELETE | /performance/goals/:id | Permission.PERFORMANCE_UPDATE |
| AppModule | GET | /performance/review-items |  |
| AppModule | GET | /performance/review-items/:id | Permission.PERFORMANCE_READ |
| AppModule | POST | /performance/review-items | Permission.PERFORMANCE_READ |
| AppModule | PATCH | /performance/review-items/:id | Permission.PERFORMANCE_CREATE |
| AppModule | DELETE | /performance/review-items/:id | Permission.PERFORMANCE_UPDATE |
| AppModule | GET | /performance/reviews |  |
| AppModule | GET | /performance/reviews/:id | Permission.PERFORMANCE_READ |
| AppModule | POST | /performance/reviews | Permission.PERFORMANCE_READ |
| AppModule | PATCH | /performance/reviews/:id | Permission.PERFORMANCE_CREATE |
| AppModule | DELETE | /performance/reviews/:id | Permission.PERFORMANCE_UPDATE |
| AppModule | GET | /performance-optimization/queries/recommendations |  |
| AppModule | GET | /performance-optimization/cache | Permission.PERFORMANCE_OPTIMIZATION_READ |
| AppModule | GET | /performance-optimization/cache/stats | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| AppModule | GET | /performance-optimization/cache/:key | Permission.PERFORMANCE_OPTIMIZATION_READ |
| AppModule | POST | /performance-optimization/cache | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| AppModule | POST | /performance-optimization/cache/invalidate | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| AppModule | POST | /performance-optimization/batch/plan | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| AppModule | POST | /performance-optimization/lazy-loading/plan | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE |
| AppModule | GET | /performance-optimization/memory | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE |
| AppModule | GET | /performance-optimization/metrics | Permission.PERFORMANCE_OPTIMIZATION_READ |
| AppModule | POST | /performance-optimization/metrics | Permission.PERFORMANCE_OPTIMIZATION_METRICS |
| AppModule | GET | /permissions |  |
| AppModule | GET | /permissions/:id | Permission.PERMISSIONS_READ |
| AppModule | POST | /permissions | Permission.PERMISSIONS_READ |
| AppModule | PATCH | /permissions/:id | Permission.PERMISSIONS_CREATE |
| AppModule | DELETE | /permissions/:id | Permission.PERMISSIONS_UPDATE |
| AppModule | GET | /plugins/manifests |  |
| AppModule | POST | /plugins/manifests | Permission.PLUGINS_READ |
| AppModule | PATCH | /plugins/manifests/:id | Permission.PLUGINS_CREATE |
| AppModule | DELETE | /plugins/manifests/:id | Permission.PLUGINS_UPDATE |
| AppModule | POST | /plugins/manifests/:id/restore | Permission.PLUGINS_DELETE |
| AppModule | POST | /plugins/manifests/:id/load | Permission.PLUGINS_UPDATE |
| AppModule | GET | /plugins/registry | Permission.PLUGINS_EXECUTE |
| AppModule | POST | /plugins/registry/:id/enable | Permission.PLUGINS_READ |
| AppModule | POST | /plugins/registry/:id/disable | Permission.PLUGINS_EXECUTE |
| AppModule | POST | /plugins/registry/:id/unload | Permission.PLUGINS_EXECUTE |
| AppModule | GET | /plugins/registry/:id/lifecycle-events | Permission.PLUGINS_EXECUTE |
| AppModule | GET | /plugins/sdk/event-subscriptions | Permission.PLUGINS_READ |
| AppModule | POST | /plugins/sdk/event-subscriptions | Permission.PLUGINS_READ |
| AppModule | PATCH | /plugins/sdk/event-subscriptions/:id | Permission.PLUGINS_UPDATE |
| AppModule | DELETE | /plugins/sdk/event-subscriptions/:id | Permission.PLUGINS_UPDATE |
| AppModule | GET | /plugins/sdk/hooks | Permission.PLUGINS_DELETE |
| AppModule | POST | /plugins/sdk/hooks | Permission.PLUGINS_READ |
| AppModule | PATCH | /plugins/sdk/hooks/:id | Permission.PLUGINS_UPDATE |
| AppModule | DELETE | /plugins/sdk/hooks/:id | Permission.PLUGINS_UPDATE |
| AppModule | GET | /plugins/sdk/service-bindings | Permission.PLUGINS_DELETE |
| AppModule | POST | /plugins/sdk/service-bindings | Permission.PLUGINS_READ |
| AppModule | PATCH | /plugins/sdk/service-bindings/:id | Permission.PLUGINS_UPDATE |
| AppModule | DELETE | /plugins/sdk/service-bindings/:id | Permission.PLUGINS_UPDATE |
| AppModule | GET | /plugins/sdk/permission-grants | Permission.PLUGINS_DELETE |
| AppModule | POST | /plugins/sdk/permission-grants | Permission.PLUGINS_READ |
| AppModule | DELETE | /plugins/sdk/permission-grants/:id | Permission.PLUGINS_GOVERN |
| AppModule | GET | /plugins/sdk/configurations | Permission.PLUGINS_GOVERN |
| AppModule | POST | /plugins/sdk/configurations | Permission.PLUGINS_READ |
| AppModule | PATCH | /plugins/sdk/configurations/:id | Permission.PLUGINS_UPDATE |
| AppModule | DELETE | /plugins/sdk/configurations/:id | Permission.PLUGINS_UPDATE |
| AppModule | POST | /plugins/sdk/events | Permission.PLUGINS_DELETE |
| AppModule | GET | /plugins/sdk/events | Permission.PLUGINS_EXECUTE |
| AppModule | GET | /plugins/marketplace/packages | Permission.PLUGINS_READ |
| AppModule | POST | /plugins/marketplace/packages | Permission.PLUGINS_READ |
| AppModule | PATCH | /plugins/marketplace/packages/:id | Permission.PLUGINS_CREATE |
| AppModule | GET | /plugins/marketplace/versions | Permission.PLUGINS_UPDATE |
| AppModule | POST | /plugins/marketplace/versions | Permission.PLUGINS_READ |
| AppModule | PATCH | /plugins/marketplace/versions/:id | Permission.PLUGINS_CREATE |
| AppModule | POST | /plugins/marketplace/versions/:id/install | Permission.PLUGINS_UPDATE |
| AppModule | GET | /plugins/marketplace/installations | Permission.PLUGINS_EXECUTE |
| AppModule | POST | /plugins/marketplace/installations/:id/enable | Permission.PLUGINS_READ |
| AppModule | POST | /plugins/marketplace/installations/:id/disable | Permission.PLUGINS_EXECUTE |
| AppModule | POST | /plugins/marketplace/installations/:id/uninstall | Permission.PLUGINS_EXECUTE |
| AppModule | POST | /plugins/marketplace/installations/:id/upgrade | Permission.PLUGINS_DELETE |
| AppModule | GET | /plugins/isolation/sandbox-policies | Permission.PLUGINS_EXECUTE |
| AppModule | POST | /plugins/isolation/sandbox-policies | Permission.PLUGINS_READ |
| AppModule | GET | /plugins/isolation/dependencies | Permission.PLUGINS_GOVERN |
| AppModule | POST | /plugins/isolation/dependencies | Permission.PLUGINS_READ |
| AppModule | PATCH | /plugins/isolation/dependencies/:id | Permission.PLUGINS_UPDATE |
| AppModule | POST | /plugins/isolation/registry/:id/validate-dependencies | Permission.PLUGINS_UPDATE |
| AppModule | GET | /plugins/isolation/capability-grants | Permission.PLUGINS_EXECUTE |
| AppModule | POST | /plugins/isolation/capability-grants | Permission.PLUGINS_READ |
| AppModule | DELETE | /plugins/isolation/capability-grants/:id | Permission.PLUGINS_GOVERN |
| AppModule | POST | /plugins/isolation/registry/:id/validate | Permission.PLUGINS_GOVERN |
| AppModule | POST | /plugins/management/upload | Permission.PLUGINS_EXECUTE |
| AppModule | GET | /plugins/management/registry/:id/health | Permission.PLUGINS_CREATE |
| AppModule | GET | /plugins/management/metrics | Permission.PLUGINS_READ |
| AppModule | GET | /public-api/registry/groups |  |
| AppModule | POST | /public-api/registry/groups | Permission.PUBLIC_API_READ |
| AppModule | PATCH | /public-api/registry/groups/:id | Permission.PUBLIC_API_CREATE |
| AppModule | DELETE | /public-api/registry/groups/:id | Permission.PUBLIC_API_UPDATE |
| AppModule | GET | /public-api/registry/apis | Permission.PUBLIC_API_DELETE |
| AppModule | POST | /public-api/registry/apis | Permission.PUBLIC_API_READ |
| AppModule | PATCH | /public-api/registry/apis/:id | Permission.PUBLIC_API_CREATE |
| AppModule | DELETE | /public-api/registry/apis/:id | Permission.PUBLIC_API_UPDATE |
| AppModule | GET | /public-api/registry/versions | Permission.PUBLIC_API_DELETE |
| AppModule | POST | /public-api/registry/versions | Permission.PUBLIC_API_READ |
| AppModule | PATCH | /public-api/registry/versions/:id | Permission.PUBLIC_API_CREATE |
| AppModule | GET | /public-api/keys | Permission.PUBLIC_API_UPDATE |
| AppModule | POST | /public-api/keys | Permission.PUBLIC_API_KEYS |
| AppModule | POST | /public-api/keys/:id/rotate | Permission.PUBLIC_API_KEYS |
| AppModule | POST | /public-api/keys/:id/revoke | Permission.PUBLIC_API_KEYS |
| AppModule | GET | /public-api/rate-limits/policies | Permission.PUBLIC_API_KEYS |
| AppModule | POST | /public-api/rate-limits/policies | Permission.PUBLIC_API_ADMIN |
| AppModule | PATCH | /public-api/rate-limits/policies/:id | Permission.PUBLIC_API_ADMIN |
| AppModule | DELETE | /public-api/rate-limits/policies/:id | Permission.PUBLIC_API_ADMIN |
| AppModule | POST | /public-api/rate-limits/evaluate | Permission.PUBLIC_API_ADMIN |
| AppModule | GET | /public-api/rate-limits/usage | Permission.PUBLIC_API_ADMIN |
| AppModule | GET | /public-api/developer/applications | Permission.PUBLIC_API_READ |
| AppModule | POST | /public-api/developer/applications | Permission.PUBLIC_API_READ |
| AppModule | PATCH | /public-api/developer/applications/:id | Permission.PUBLIC_API_CREATE |
| AppModule | DELETE | /public-api/developer/applications/:id | Permission.PUBLIC_API_UPDATE |
| AppModule | POST | /public-api/developer/applications/:id/keys | Permission.PUBLIC_API_DELETE |
| AppModule | POST | /public-api/developer/applications/:id/keys/:keyId/revoke | Permission.PUBLIC_API_KEYS |
| AppModule | GET | /public-api/developer/applications/:id/usage | Permission.PUBLIC_API_KEYS |
| AppModule | POST | /public-api/security/verify-signature | Permission.PUBLIC_API_READ |
| AppModule | GET | /public-api/security/request-logs | Permission.PUBLIC_API_ADMIN |
| AppModule | POST | /public-api/security/request-logs | Permission.PUBLIC_API_ADMIN |
| AppModule | GET | /recruitment/applicants |  |
| AppModule | GET | /recruitment/applicants/:id | Permission.RECRUITMENT_READ |
| AppModule | POST | /recruitment/applicants | Permission.RECRUITMENT_READ |
| AppModule | PATCH | /recruitment/applicants/:id | Permission.RECRUITMENT_CREATE |
| AppModule | DELETE | /recruitment/applicants/:id | Permission.RECRUITMENT_UPDATE |
| AppModule | GET | /recruitment/applications |  |
| AppModule | GET | /recruitment/applications/:id | Permission.RECRUITMENT_READ |
| AppModule | POST | /recruitment/applications | Permission.RECRUITMENT_READ |
| AppModule | PATCH | /recruitment/applications/:id | Permission.RECRUITMENT_CREATE |
| AppModule | DELETE | /recruitment/applications/:id | Permission.RECRUITMENT_UPDATE |
| AppModule | GET | /recruitment/dashboard/summary |  |
| AppModule | POST | /recruitment/hiring/hire |  |
| AppModule | GET | /recruitment/interview-evaluations |  |
| AppModule | GET | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_READ |
| AppModule | POST | /recruitment/interview-evaluations | Permission.RECRUITMENT_READ |
| AppModule | PATCH | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_CREATE |
| AppModule | DELETE | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_UPDATE |
| AppModule | GET | /recruitment/interviews |  |
| AppModule | GET | /recruitment/interviews/:id | Permission.RECRUITMENT_READ |
| AppModule | POST | /recruitment/interviews | Permission.RECRUITMENT_READ |
| AppModule | PATCH | /recruitment/interviews/:id | Permission.RECRUITMENT_CREATE |
| AppModule | DELETE | /recruitment/interviews/:id | Permission.RECRUITMENT_UPDATE |
| AppModule | GET | /recruitment/job-positions |  |
| AppModule | GET | /recruitment/job-positions/:id | Permission.RECRUITMENT_READ |
| AppModule | POST | /recruitment/job-positions | Permission.RECRUITMENT_READ |
| AppModule | PATCH | /recruitment/job-positions/:id | Permission.RECRUITMENT_CREATE |
| AppModule | DELETE | /recruitment/job-positions/:id | Permission.RECRUITMENT_UPDATE |
| AppModule | GET | /recruitment/offer-letters |  |
| AppModule | GET | /recruitment/offer-letters/:id | Permission.RECRUITMENT_READ |
| AppModule | POST | /recruitment/offer-letters | Permission.RECRUITMENT_READ |
| AppModule | PATCH | /recruitment/offer-letters/:id | Permission.RECRUITMENT_CREATE |
| AppModule | POST | /recruitment/offer-letters/:id/send | Permission.RECRUITMENT_UPDATE |
| AppModule | POST | /recruitment/offer-letters/:id/accept | Permission.RECRUITMENT_UPDATE |
| AppModule | POST | /recruitment/offer-letters/:id/reject | Permission.RECRUITMENT_UPDATE |
| AppModule | DELETE | /recruitment/offer-letters/:id | Permission.RECRUITMENT_UPDATE |
| AppModule | GET | /recruitment/vacancies |  |
| AppModule | GET | /recruitment/vacancies/:id | Permission.RECRUITMENT_READ |
| AppModule | POST | /recruitment/vacancies | Permission.RECRUITMENT_READ |
| AppModule | PATCH | /recruitment/vacancies/:id | Permission.RECRUITMENT_CREATE |
| AppModule | DELETE | /recruitment/vacancies/:id | Permission.RECRUITMENT_UPDATE |
| AppModule | GET | /reporting/dashboards/executive |  |
| AppModule | GET | /reporting/dashboards/hr | Permission.REPORTING_READ |
| AppModule | GET | /reporting/dashboards/payroll | Permission.REPORTING_READ |
| AppModule | GET | /reporting/dashboards/accounting | Permission.REPORTING_READ |
| AppModule | GET | /reporting/categories |  |
| AppModule | POST | /reporting/categories | Permission.REPORTING_READ |
| AppModule | PATCH | /reporting/categories/:id | Permission.REPORTING_CREATE |
| AppModule | GET | /reporting/definitions | Permission.REPORTING_UPDATE |
| AppModule | GET | /reporting/definitions/:id | Permission.REPORTING_READ |
| AppModule | POST | /reporting/definitions | Permission.REPORTING_READ |
| AppModule | PATCH | /reporting/definitions/:id | Permission.REPORTING_CREATE |
| AppModule | GET | /reporting/executions |  |
| AppModule | GET | /reporting/executions/:id | Permission.REPORTING_READ |
| AppModule | POST | /reporting/executions | Permission.REPORTING_READ |
| AppModule | POST | /reporting/exports |  |
| AppModule | GET | /reporting/finance/payroll-summary |  |
| AppModule | GET | /reporting/finance/payslip-summary | Permission.REPORTING_READ |
| AppModule | GET | /reporting/finance/trial-balance | Permission.REPORTING_READ |
| AppModule | GET | /reporting/finance/general-ledger | Permission.REPORTING_READ |
| AppModule | GET | /reporting/finance/cost-centers | Permission.REPORTING_READ |
| AppModule | GET | /reporting/hr/employees |  |
| AppModule | GET | /reporting/hr/attendance | Permission.REPORTING_READ |
| AppModule | GET | /reporting/hr/leave | Permission.REPORTING_READ |
| AppModule | GET | /reporting/hr/recruitment | Permission.REPORTING_READ |
| AppModule | GET | /roles |  |
| AppModule | GET | /roles/:id | Permission.ROLES_READ |
| AppModule | POST | /roles | Permission.ROLES_READ |
| AppModule | PATCH | /roles/:id | Permission.ROLES_CREATE |
| AppModule | DELETE | /roles/:id | Permission.ROLES_UPDATE |
| AppModule | GET | /scheduler/crons |  |
| AppModule | POST | /scheduler/crons | Permission.SCHEDULER_READ |
| AppModule | PATCH | /scheduler/crons/:id | Permission.SCHEDULER_CREATE |
| AppModule | DELETE | /scheduler/crons/:id | Permission.SCHEDULER_UPDATE |
| AppModule | GET | /scheduler/jobs | Permission.SCHEDULER_DELETE |
| AppModule | POST | /scheduler/jobs | Permission.SCHEDULER_READ |
| AppModule | PATCH | /scheduler/jobs/:id | Permission.SCHEDULER_CREATE |
| AppModule | POST | /scheduler/jobs/:id/cancel | Permission.SCHEDULER_UPDATE |
| AppModule | GET | /scheduler/history | Permission.SCHEDULER_EXECUTE |
| AppModule | POST | /scheduler/queue/claim | Permission.SCHEDULER_READ |
| AppModule | POST | /scheduler/jobs/:id/complete | Permission.SCHEDULER_EXECUTE |
| AppModule | POST | /scheduler/jobs/:id/fail | Permission.SCHEDULER_EXECUTE |
| AppModule | POST | /scheduler/jobs/:id/retry | Permission.SCHEDULER_EXECUTE |
| AppModule | POST | /scheduler/jobs/:id/recover | Permission.SCHEDULER_EXECUTE |
| AppModule | GET | /scheduler/recoveries | Permission.SCHEDULER_EXECUTE |
| AppModule | GET | /scheduler/monitoring/dashboard | Permission.SCHEDULER_MONITOR |
| AppModule | GET | /scheduler/monitoring/queues | Permission.SCHEDULER_MONITOR |
| AppModule | GET | /scheduler/monitoring/failures | Permission.SCHEDULER_MONITOR |
| AppModule | GET | /scheduler/monitoring/system-status | Permission.SCHEDULER_MONITOR |
| AppModule | GET | /search/global |  |
| AppModule | GET | /search/employees | Permission.SEARCH_GLOBAL |
| AppModule | GET | /search/payroll | Permission.SEARCH_EMPLOYEES |
| AppModule | GET | /search/documents | Permission.SEARCH_PAYROLL |
| AppModule | GET | /search/workflows | Permission.SEARCH_DOCUMENTS |
| AppModule | GET | /search/index | Permission.SEARCH_WORKFLOWS |
| AppModule | POST | /search/index | Permission.SEARCH_ADMIN |
| AppModule | POST | /search/index/rebuild | Permission.SEARCH_ADMIN |
| AppModule | GET | /search/audit | Permission.SEARCH_ADMIN |
| AppModule | GET | /tenants |  |
| AppModule | POST | /tenants | Permission.TENANTS_READ |
| AppModule | PATCH | /tenants/:id | Permission.TENANTS_CREATE |
| AppModule | DELETE | /tenants/:id | Permission.TENANTS_UPDATE |
| AppModule | POST | /tenants/:id/restore | Permission.TENANTS_DELETE |
| AppModule | GET | /tenants/domains | Permission.TENANTS_UPDATE |
| AppModule | POST | /tenants/domains | Permission.TENANTS_READ |
| AppModule | POST | /tenants/resolve | Permission.TENANTS_UPDATE |
| AppModule | GET | /tenants/isolation/companies | Permission.TENANTS_READ |
| AppModule | POST | /tenants/isolation/companies/:companyId/assign | Permission.TENANTS_READ |
| AppModule | GET | /tenants/isolation/branches | Permission.TENANTS_UPDATE |
| AppModule | POST | /tenants/isolation/branches/:branchId/assign | Permission.TENANTS_READ |
| AppModule | POST | /tenants/isolation/validate | Permission.TENANTS_UPDATE |
| AppModule | GET | /tenants/configuration/settings | Permission.TENANTS_SECURITY |
| AppModule | POST | /tenants/configuration/settings | Permission.TENANTS_READ |
| AppModule | PATCH | /tenants/configuration/settings/:id | Permission.TENANTS_UPDATE |
| AppModule | DELETE | /tenants/configuration/settings/:id | Permission.TENANTS_UPDATE |
| AppModule | GET | /tenants/configuration/feature-flags | Permission.TENANTS_DELETE |
| AppModule | POST | /tenants/configuration/feature-flags | Permission.TENANTS_READ |
| AppModule | PATCH | /tenants/configuration/feature-flags/:id | Permission.TENANTS_UPDATE |
| AppModule | DELETE | /tenants/configuration/feature-flags/:id | Permission.TENANTS_UPDATE |
| AppModule | GET | /tenants/configuration/localizations | Permission.TENANTS_DELETE |
| AppModule | POST | /tenants/configuration/localizations | Permission.TENANTS_READ |
| AppModule | PATCH | /tenants/configuration/localizations/:id | Permission.TENANTS_UPDATE |
| AppModule | POST | /tenants/configuration/branding | Permission.TENANTS_UPDATE |
| AppModule | POST | /tenants/administration/provision | Permission.TENANTS_UPDATE |
| AppModule | POST | /tenants/administration/:id/activate | Permission.TENANTS_PROVISION |
| AppModule | POST | /tenants/administration/:id/suspend | Permission.TENANTS_PROVISION |
| AppModule | POST | /tenants/administration/:id/resume | Permission.TENANTS_PROVISION |
| AppModule | POST | /tenants/administration/:id/archive | Permission.TENANTS_PROVISION |
| AppModule | GET | /tenants/administration/usage-limits | Permission.TENANTS_PROVISION |
| AppModule | POST | /tenants/administration/usage-limits | Permission.TENANTS_READ |
| AppModule | PATCH | /tenants/administration/usage-limits/:id | Permission.TENANTS_UPDATE |
| AppModule | DELETE | /tenants/administration/usage-limits/:id | Permission.TENANTS_UPDATE |
| AppModule | GET | /tenants/administration/events | Permission.TENANTS_DELETE |
| AppModule | POST | /tenants/administration/events | Permission.TENANTS_READ |
| AppModule | GET | /tenants/security/permission-policies | Permission.TENANTS_PROVISION |
| AppModule | POST | /tenants/security/permission-policies | Permission.TENANTS_SECURITY |
| AppModule | PATCH | /tenants/security/permission-policies/:id | Permission.TENANTS_SECURITY |
| AppModule | DELETE | /tenants/security/permission-policies/:id | Permission.TENANTS_SECURITY |
| AppModule | POST | /tenants/security/validate | Permission.TENANTS_SECURITY |
| AppModule | GET | /tenants/security/audit-events | Permission.TENANTS_SECURITY |
| AppModule | POST | /tenants/security/audit-events | Permission.TENANTS_SECURITY |
| AppModule | GET | /users |  |
| AppModule | GET | /users/:id | Permission.USERS_READ |
| AppModule | POST | /users | Permission.USERS_READ |
| AppModule | PATCH | /users/:id | Permission.USERS_CREATE |
| AppModule | DELETE | /users/:id | Permission.USERS_UPDATE |
| AppModule | GET | /workflows/dashboard |  |
| AppModule | GET | /workflows/definitions |  |
| AppModule | GET | /workflows/definitions/:id | Permission.WORKFLOWS_READ |
| AppModule | POST | /workflows/definitions | Permission.WORKFLOWS_READ |
| AppModule | PATCH | /workflows/definitions/:id | Permission.WORKFLOWS_CREATE |
| AppModule | POST | /workflows/definitions/:id/activate | Permission.WORKFLOWS_UPDATE |
| AppModule | POST | /workflows/definitions/:id/archive | Permission.WORKFLOWS_UPDATE |
| AppModule | POST | /workflows/definitions/:id/steps | Permission.WORKFLOWS_UPDATE |
| AppModule | PATCH | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE |
| AppModule | DELETE | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE |
| AppModule | GET | /workflows/requests |  |
| AppModule | GET | /workflows/requests/:id | Permission.WORKFLOWS_READ |
| AppModule | GET | /workflows/requests/:id/history | Permission.WORKFLOWS_READ |
| AppModule | POST | /workflows/requests | Permission.WORKFLOWS_READ |
| AppModule | POST | /workflows/requests/:id/steps/:stepId/approve | Permission.WORKFLOWS_CREATE |
| AppModule | POST | /workflows/requests/:id/steps/:stepId/reject | Permission.WORKFLOWS_UPDATE |
| AppModule | POST | /workflows/requests/:id/cancel | Permission.WORKFLOWS_UPDATE |
| AssetItemsModule | GET | /assets |  |
| AssetItemsModule | GET | /assets/:id | Permission.ASSETS_READ |
| AssetItemsModule | POST | /assets | Permission.ASSETS_READ |
| AssetItemsModule | PATCH | /assets/:id | Permission.ASSETS_CREATE |
| AssetItemsModule | DELETE | /assets/:id | Permission.ASSETS_UPDATE |
| AssetsModule | GET | /assets |  |
| AssetsModule | GET | /assets/:id | Permission.ASSETS_READ |
| AssetsModule | POST | /assets | Permission.ASSETS_READ |
| AssetsModule | PATCH | /assets/:id | Permission.ASSETS_CREATE |
| AssetsModule | DELETE | /assets/:id | Permission.ASSETS_UPDATE |
| AssetsModule | GET | /assets/assignments |  |
| AssetsModule | GET | /assets/assignments/:id | Permission.ASSETS_READ |
| AssetsModule | POST | /assets/assignments | Permission.ASSETS_READ |
| AssetsModule | POST | /assets/assignments/:id/return | Permission.ASSETS_CREATE |
| AssetsModule | POST | /assets/assignments/:id/lost | Permission.ASSETS_UPDATE |
| AssetsModule | DELETE | /assets/assignments/:id | Permission.ASSETS_UPDATE |
| AssetsModule | GET | /assets/categories |  |
| AssetsModule | GET | /assets/categories/:id | Permission.ASSETS_READ |
| AssetsModule | POST | /assets/categories | Permission.ASSETS_READ |
| AssetsModule | PATCH | /assets/categories/:id | Permission.ASSETS_CREATE |
| AssetsModule | DELETE | /assets/categories/:id | Permission.ASSETS_UPDATE |
| AssetsModule | GET | /assets/dashboard/summary |  |
| AssetsModule | GET | /assets/maintenance |  |
| AssetsModule | GET | /assets/maintenance/:id | Permission.ASSETS_READ |
| AssetsModule | POST | /assets/maintenance | Permission.ASSETS_READ |
| AssetsModule | PATCH | /assets/maintenance/:id | Permission.ASSETS_CREATE |
| AssetsModule | DELETE | /assets/maintenance/:id | Permission.ASSETS_UPDATE |
| AssetAssignmentsModule | GET | /assets/assignments |  |
| AssetAssignmentsModule | GET | /assets/assignments/:id | Permission.ASSETS_READ |
| AssetAssignmentsModule | POST | /assets/assignments | Permission.ASSETS_READ |
| AssetAssignmentsModule | POST | /assets/assignments/:id/return | Permission.ASSETS_CREATE |
| AssetAssignmentsModule | POST | /assets/assignments/:id/lost | Permission.ASSETS_UPDATE |
| AssetAssignmentsModule | DELETE | /assets/assignments/:id | Permission.ASSETS_UPDATE |
| AssetCategoriesModule | GET | /assets/categories |  |
| AssetCategoriesModule | GET | /assets/categories/:id | Permission.ASSETS_READ |
| AssetCategoriesModule | POST | /assets/categories | Permission.ASSETS_READ |
| AssetCategoriesModule | PATCH | /assets/categories/:id | Permission.ASSETS_CREATE |
| AssetCategoriesModule | DELETE | /assets/categories/:id | Permission.ASSETS_UPDATE |
| AssetsDashboardModule | GET | /assets/dashboard/summary |  |
| AssetMaintenanceModule | GET | /assets/maintenance |  |
| AssetMaintenanceModule | GET | /assets/maintenance/:id | Permission.ASSETS_READ |
| AssetMaintenanceModule | POST | /assets/maintenance | Permission.ASSETS_READ |
| AssetMaintenanceModule | PATCH | /assets/maintenance/:id | Permission.ASSETS_CREATE |
| AssetMaintenanceModule | DELETE | /assets/maintenance/:id | Permission.ASSETS_UPDATE |
| AttendanceModule | GET | /attendance/holidays |  |
| AttendanceModule | GET | /attendance/holidays/:id | Permission.ATTENDANCE_READ |
| AttendanceModule | POST | /attendance/holidays | Permission.ATTENDANCE_READ |
| AttendanceModule | PATCH | /attendance/holidays/:id | Permission.ATTENDANCE_CREATE |
| AttendanceModule | DELETE | /attendance/holidays/:id | Permission.ATTENDANCE_UPDATE |
| AttendanceModule | GET | /attendance/records |  |
| AttendanceModule | GET | /attendance/records/:id | Permission.ATTENDANCE_READ |
| AttendanceModule | POST | /attendance/records | Permission.ATTENDANCE_READ |
| AttendanceModule | PATCH | /attendance/records/:id | Permission.ATTENDANCE_CREATE |
| AttendanceModule | DELETE | /attendance/records/:id | Permission.ATTENDANCE_UPDATE |
| AttendanceModule | GET | /attendance/shifts |  |
| AttendanceModule | GET | /attendance/shifts/:id | Permission.ATTENDANCE_READ |
| AttendanceModule | POST | /attendance/shifts | Permission.ATTENDANCE_READ |
| AttendanceModule | PATCH | /attendance/shifts/:id | Permission.ATTENDANCE_CREATE |
| AttendanceModule | DELETE | /attendance/shifts/:id | Permission.ATTENDANCE_UPDATE |
| HolidaysModule | GET | /attendance/holidays |  |
| HolidaysModule | GET | /attendance/holidays/:id | Permission.ATTENDANCE_READ |
| HolidaysModule | POST | /attendance/holidays | Permission.ATTENDANCE_READ |
| HolidaysModule | PATCH | /attendance/holidays/:id | Permission.ATTENDANCE_CREATE |
| HolidaysModule | DELETE | /attendance/holidays/:id | Permission.ATTENDANCE_UPDATE |
| AttendanceRecordsModule | GET | /attendance/records |  |
| AttendanceRecordsModule | GET | /attendance/records/:id | Permission.ATTENDANCE_READ |
| AttendanceRecordsModule | POST | /attendance/records | Permission.ATTENDANCE_READ |
| AttendanceRecordsModule | PATCH | /attendance/records/:id | Permission.ATTENDANCE_CREATE |
| AttendanceRecordsModule | DELETE | /attendance/records/:id | Permission.ATTENDANCE_UPDATE |
| ShiftsModule | GET | /attendance/shifts |  |
| ShiftsModule | GET | /attendance/shifts/:id | Permission.ATTENDANCE_READ |
| ShiftsModule | POST | /attendance/shifts | Permission.ATTENDANCE_READ |
| ShiftsModule | PATCH | /attendance/shifts/:id | Permission.ATTENDANCE_CREATE |
| ShiftsModule | DELETE | /attendance/shifts/:id | Permission.ATTENDANCE_UPDATE |
| AuthModule | POST | /auth/login |  |
| BiModule | GET | /bi/kpis |  |
| BiModule | POST | /bi/kpis | Permission.BI_READ |
| BiModule | PATCH | /bi/kpis/:id | Permission.BI_MANAGE |
| BiModule | POST | /bi/kpis/:id/archive | Permission.BI_MANAGE |
| BiModule | POST | /bi/kpis/:id/snapshots | Permission.BI_MANAGE |
| BiModule | GET | /bi/kpis/:id/snapshots | Permission.BI_EXECUTE |
| BiModule | GET | /bi/datasets | Permission.BI_READ |
| BiModule | POST | /bi/datasets | Permission.BI_READ |
| BiModule | PATCH | /bi/datasets/:id | Permission.BI_MANAGE |
| BiModule | POST | /bi/datasets/:id/run | Permission.BI_MANAGE |
| BiModule | GET | /bi/metrics | Permission.BI_EXECUTE |
| BiModule | POST | /bi/metrics | Permission.BI_READ |
| BiModule | PATCH | /bi/metrics/:id | Permission.BI_MANAGE |
| BiModule | POST | /bi/metrics/:id/observations | Permission.BI_MANAGE |
| BiModule | GET | /bi/dashboards | Permission.BI_EXECUTE |
| BiModule | POST | /bi/dashboards | Permission.BI_DASHBOARD |
| BiModule | POST | /bi/dashboards/:id/widgets | Permission.BI_MANAGE |
| BiModule | GET | /bi/dashboards/executive/summary | Permission.BI_MANAGE |
| BiModule | GET | /bi/kpis/:id/trend | Permission.BI_DASHBOARD |
| BiModule | GET | /bi/metrics/:id/trend | Permission.BI_READ |
| BiModule | GET | /bi/predictions/models | Permission.BI_READ |
| BiModule | POST | /bi/predictions/models | Permission.BI_PREDICT |
| BiModule | POST | /bi/predictions/models/:id/run | Permission.BI_PREDICT |
| BusinessRulesModule | GET | /business-rules/categories |  |
| BusinessRulesModule | POST | /business-rules/categories | Permission.BUSINESS_RULES_READ |
| BusinessRulesModule | PATCH | /business-rules/categories/:id | Permission.BUSINESS_RULES_CREATE |
| BusinessRulesModule | DELETE | /business-rules/categories/:id | Permission.BUSINESS_RULES_UPDATE |
| BusinessRulesModule | POST | /business-rules/categories/:id/restore | Permission.BUSINESS_RULES_DELETE |
| BusinessRulesModule | GET | /business-rules/executions | Permission.BUSINESS_RULES_UPDATE |
| BusinessRulesModule | GET | /business-rules/dashboard | Permission.BUSINESS_RULES_READ |
| BusinessRulesModule | GET | /business-rules | Permission.BUSINESS_RULES_READ |
| BusinessRulesModule | POST | /business-rules/evaluate | Permission.BUSINESS_RULES_READ |
| BusinessRulesModule | GET | /business-rules/:id/conditions | Permission.BUSINESS_RULES_EXECUTE |
| BusinessRulesModule | POST | /business-rules/:id/conditions | Permission.BUSINESS_RULES_READ |
| BusinessRulesModule | PATCH | /business-rules/:id/conditions/:conditionId | Permission.BUSINESS_RULES_UPDATE |
| BusinessRulesModule | DELETE | /business-rules/:id/conditions/:conditionId | Permission.BUSINESS_RULES_UPDATE |
| BusinessRulesModule | GET | /business-rules/:id/actions | Permission.BUSINESS_RULES_DELETE |
| BusinessRulesModule | POST | /business-rules/:id/actions | Permission.BUSINESS_RULES_READ |
| BusinessRulesModule | PATCH | /business-rules/:id/actions/:actionId | Permission.BUSINESS_RULES_UPDATE |
| BusinessRulesModule | DELETE | /business-rules/:id/actions/:actionId | Permission.BUSINESS_RULES_UPDATE |
| BusinessRulesModule | GET | /business-rules/:id | Permission.BUSINESS_RULES_DELETE |
| BusinessRulesModule | POST | /business-rules | Permission.BUSINESS_RULES_READ |
| BusinessRulesModule | PATCH | /business-rules/:id | Permission.BUSINESS_RULES_CREATE |
| BusinessRulesModule | DELETE | /business-rules/:id | Permission.BUSINESS_RULES_UPDATE |
| BusinessRulesModule | POST | /business-rules/:id/restore | Permission.BUSINESS_RULES_DELETE |
| DocumentCategoriesModule | GET | /documents/categories |  |
| DocumentCategoriesModule | GET | /documents/categories/:id | Permission.DOCUMENTS_READ |
| DocumentCategoriesModule | POST | /documents/categories | Permission.DOCUMENTS_READ |
| DocumentCategoriesModule | PATCH | /documents/categories/:id | Permission.DOCUMENTS_CREATE |
| DocumentCategoriesModule | DELETE | /documents/categories/:id | Permission.DOCUMENTS_UPDATE |
| DocumentsDashboardModule | GET | /documents/dashboard/summary |  |
| DocumentItemsModule | GET | /documents |  |
| DocumentItemsModule | GET | /documents/:id | Permission.DOCUMENTS_READ |
| DocumentItemsModule | POST | /documents | Permission.DOCUMENTS_READ |
| DocumentItemsModule | PATCH | /documents/:id | Permission.DOCUMENTS_CREATE |
| DocumentItemsModule | POST | /documents/:id/archive | Permission.DOCUMENTS_UPDATE |
| DocumentItemsModule | DELETE | /documents/:id | Permission.DOCUMENTS_UPDATE |
| DocumentsModule | GET | /documents/categories |  |
| DocumentsModule | GET | /documents/categories/:id | Permission.DOCUMENTS_READ |
| DocumentsModule | POST | /documents/categories | Permission.DOCUMENTS_READ |
| DocumentsModule | PATCH | /documents/categories/:id | Permission.DOCUMENTS_CREATE |
| DocumentsModule | DELETE | /documents/categories/:id | Permission.DOCUMENTS_UPDATE |
| DocumentsModule | GET | /documents/dashboard/summary |  |
| DocumentsModule | GET | /documents |  |
| DocumentsModule | GET | /documents/:id | Permission.DOCUMENTS_READ |
| DocumentsModule | POST | /documents | Permission.DOCUMENTS_READ |
| DocumentsModule | PATCH | /documents/:id | Permission.DOCUMENTS_CREATE |
| DocumentsModule | POST | /documents/:id/archive | Permission.DOCUMENTS_UPDATE |
| DocumentsModule | DELETE | /documents/:id | Permission.DOCUMENTS_UPDATE |
| DocumentsModule | POST | /documents/expiration/mark-expired |  |
| DocumentsModule | GET | /documents/expiration/expired | Permission.DOCUMENTS_UPDATE |
| DocumentsModule | GET | /documents/expiration/soon/:days | Permission.DOCUMENTS_READ |
| DocumentsModule | GET | /documents/versions |  |
| DocumentsModule | GET | /documents/versions/document/:documentId | Permission.DOCUMENTS_READ |
| DocumentsModule | GET | /documents/versions/:id | Permission.DOCUMENTS_READ |
| DocumentsModule | POST | /documents/versions | Permission.DOCUMENTS_READ |
| DocumentsModule | DELETE | /documents/versions/:id | Permission.DOCUMENTS_CREATE |
| DocumentExpirationModule | POST | /documents/expiration/mark-expired |  |
| DocumentExpirationModule | GET | /documents/expiration/expired | Permission.DOCUMENTS_UPDATE |
| DocumentExpirationModule | GET | /documents/expiration/soon/:days | Permission.DOCUMENTS_READ |
| DocumentVersionsModule | GET | /documents/versions |  |
| DocumentVersionsModule | GET | /documents/versions/document/:documentId | Permission.DOCUMENTS_READ |
| DocumentVersionsModule | GET | /documents/versions/:id | Permission.DOCUMENTS_READ |
| DocumentVersionsModule | POST | /documents/versions | Permission.DOCUMENTS_READ |
| DocumentVersionsModule | DELETE | /documents/versions/:id | Permission.DOCUMENTS_CREATE |
| EmployeesModule | GET | /employees |  |
| EmployeesModule | GET | /employees/:id | Permission.EMPLOYEES_READ |
| EmployeesModule | POST | /employees | Permission.EMPLOYEES_READ |
| EmployeesModule | PATCH | /employees/:id | Permission.EMPLOYEES_CREATE |
| EmployeesModule | DELETE | /employees/:id | Permission.EMPLOYEES_UPDATE |
| EssModule | GET | /ess/requests |  |
| EssModule | GET | /ess/requests/employee/:employeeId | Permission.ESS_READ |
| EssModule | GET | /ess/requests/:id | Permission.ESS_READ |
| EssModule | POST | /ess/requests | Permission.ESS_READ |
| EssModule | PATCH | /ess/requests/:id | Permission.ESS_CREATE |
| EssModule | POST | /ess/requests/:id/submit | Permission.ESS_UPDATE |
| EssModule | POST | /ess/requests/:id/review | Permission.ESS_UPDATE |
| EssModule | DELETE | /ess/requests/:id | Permission.ESS_UPDATE |
| SelfServiceRequestsModule | GET | /ess/requests |  |
| SelfServiceRequestsModule | GET | /ess/requests/employee/:employeeId | Permission.ESS_READ |
| SelfServiceRequestsModule | GET | /ess/requests/:id | Permission.ESS_READ |
| SelfServiceRequestsModule | POST | /ess/requests | Permission.ESS_READ |
| SelfServiceRequestsModule | PATCH | /ess/requests/:id | Permission.ESS_CREATE |
| SelfServiceRequestsModule | POST | /ess/requests/:id/submit | Permission.ESS_UPDATE |
| SelfServiceRequestsModule | POST | /ess/requests/:id/review | Permission.ESS_UPDATE |
| SelfServiceRequestsModule | DELETE | /ess/requests/:id | Permission.ESS_UPDATE |
| IntegrationsModule | GET | /integrations/providers |  |
| IntegrationsModule | POST | /integrations/providers | Permission.INTEGRATIONS_READ |
| IntegrationsModule | PATCH | /integrations/providers/:id | Permission.INTEGRATIONS_CREATE |
| IntegrationsModule | DELETE | /integrations/providers/:id | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/providers/:id/restore | Permission.INTEGRATIONS_DELETE |
| IntegrationsModule | POST | /integrations/providers/:id/enable | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/providers/:id/disable | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | GET | /integrations/credentials | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/credentials | Permission.INTEGRATIONS_READ |
| IntegrationsModule | PATCH | /integrations/credentials/:id | Permission.INTEGRATIONS_CREATE |
| IntegrationsModule | DELETE | /integrations/credentials/:id | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/credentials/:id/restore | Permission.INTEGRATIONS_DELETE |
| IntegrationsModule | POST | /integrations/credentials/:id/enable | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/credentials/:id/disable | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | GET | /integrations/connections | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/connections | Permission.INTEGRATIONS_READ |
| IntegrationsModule | PATCH | /integrations/connections/:id | Permission.INTEGRATIONS_CREATE |
| IntegrationsModule | DELETE | /integrations/connections/:id | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/connections/:id/restore | Permission.INTEGRATIONS_DELETE |
| IntegrationsModule | POST | /integrations/connections/:id/test | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/connections/:id/connect | Permission.INTEGRATIONS_EXECUTE |
| IntegrationsModule | POST | /integrations/connections/:id/disconnect | Permission.INTEGRATIONS_EXECUTE |
| IntegrationsModule | POST | /integrations/connections/:id/enable | Permission.INTEGRATIONS_EXECUTE |
| IntegrationsModule | POST | /integrations/connections/:id/disable | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | GET | /integrations/retry-policies | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/retry-policies | Permission.INTEGRATIONS_READ |
| IntegrationsModule | PATCH | /integrations/retry-policies/:id | Permission.INTEGRATIONS_CREATE |
| IntegrationsModule | DELETE | /integrations/retry-policies/:id | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/retry-policies/:id/restore | Permission.INTEGRATIONS_DELETE |
| IntegrationsModule | POST | /integrations/retry-policies/:id/enable | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/retry-policies/:id/disable | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | GET | /integrations/webhooks | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/webhooks | Permission.INTEGRATIONS_READ |
| IntegrationsModule | PATCH | /integrations/webhooks/:id | Permission.INTEGRATIONS_CREATE |
| IntegrationsModule | DELETE | /integrations/webhooks/:id | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/webhooks/:id/restore | Permission.INTEGRATIONS_DELETE |
| IntegrationsModule | POST | /integrations/webhooks/:id/enable | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/webhooks/:id/disable | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | GET | /integrations/rest-connectors | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/rest-connectors | Permission.INTEGRATIONS_READ |
| IntegrationsModule | PATCH | /integrations/rest-connectors/:id | Permission.INTEGRATIONS_CREATE |
| IntegrationsModule | DELETE | /integrations/rest-connectors/:id | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/rest-connectors/:id/restore | Permission.INTEGRATIONS_DELETE |
| IntegrationsModule | POST | /integrations/rest-connectors/:id/enable | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/rest-connectors/:id/disable | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | GET | /integrations/outbound-jobs | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | POST | /integrations/outbound-jobs | Permission.INTEGRATIONS_MONITOR |
| IntegrationsModule | POST | /integrations/outbound-jobs/process-due | Permission.INTEGRATIONS_EXECUTE |
| IntegrationsModule | POST | /integrations/outbound-jobs/:id/execute | Permission.INTEGRATIONS_EXECUTE |
| IntegrationsModule | POST | /integrations/outbound-jobs/:id/retry | Permission.INTEGRATIONS_EXECUTE |
| IntegrationsModule | POST | /integrations/outbound-jobs/:id/cancel | Permission.INTEGRATIONS_EXECUTE |
| IntegrationsModule | POST | /integrations/inbound/:connectionId/webhook | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | GET | /integrations/inbound-events | Permission.INTEGRATIONS_UPDATE |
| IntegrationsModule | GET | /integrations/executions | Permission.INTEGRATIONS_MONITOR |
| IntegrationsModule | GET | /integrations/dashboard | Permission.INTEGRATIONS_MONITOR |
| IntegrationsModule | GET | /integrations/retry-history | Permission.INTEGRATIONS_MONITOR |
| IntegrationsModule | GET | /integrations/health | Permission.INTEGRATIONS_MONITOR |
| IntegrationsModule | POST | /integrations/connections/:id/health-check | Permission.INTEGRATIONS_MONITOR |
| LeaveBalancesModule | GET | /leave/balances |  |
| LeaveBalancesModule | GET | /leave/balances/:id | Permission.LEAVE_READ |
| LeaveBalancesModule | POST | /leave/balances | Permission.LEAVE_READ |
| LeaveBalancesModule | PATCH | /leave/balances/:id | Permission.LEAVE_CREATE |
| LeaveBalancesModule | DELETE | /leave/balances/:id | Permission.LEAVE_UPDATE |
| LeaveRequestsModule | GET | /leave/requests |  |
| LeaveRequestsModule | GET | /leave/requests/:id | Permission.LEAVE_READ |
| LeaveRequestsModule | POST | /leave/requests | Permission.LEAVE_READ |
| LeaveRequestsModule | PATCH | /leave/requests/:id | Permission.LEAVE_CREATE |
| LeaveRequestsModule | DELETE | /leave/requests/:id | Permission.LEAVE_UPDATE |
| LeaveTypesModule | GET | /leave/types |  |
| LeaveTypesModule | GET | /leave/types/:id | Permission.LEAVE_READ |
| LeaveTypesModule | POST | /leave/types | Permission.LEAVE_READ |
| LeaveTypesModule | PATCH | /leave/types/:id | Permission.LEAVE_CREATE |
| LeaveTypesModule | DELETE | /leave/types/:id | Permission.LEAVE_UPDATE |
| LeaveModule | GET | /leave/balances |  |
| LeaveModule | GET | /leave/balances/:id | Permission.LEAVE_READ |
| LeaveModule | POST | /leave/balances | Permission.LEAVE_READ |
| LeaveModule | PATCH | /leave/balances/:id | Permission.LEAVE_CREATE |
| LeaveModule | DELETE | /leave/balances/:id | Permission.LEAVE_UPDATE |
| LeaveModule | GET | /leave/requests |  |
| LeaveModule | GET | /leave/requests/:id | Permission.LEAVE_READ |
| LeaveModule | POST | /leave/requests | Permission.LEAVE_READ |
| LeaveModule | PATCH | /leave/requests/:id | Permission.LEAVE_CREATE |
| LeaveModule | DELETE | /leave/requests/:id | Permission.LEAVE_UPDATE |
| LeaveModule | GET | /leave/types |  |
| LeaveModule | GET | /leave/types/:id | Permission.LEAVE_READ |
| LeaveModule | POST | /leave/types | Permission.LEAVE_READ |
| LeaveModule | PATCH | /leave/types/:id | Permission.LEAVE_CREATE |
| LeaveModule | DELETE | /leave/types/:id | Permission.LEAVE_UPDATE |
| MobileModule | POST | /mobile/auth/login |  |
| MobileModule | POST | /mobile/auth/refresh |  |
| MobileModule | POST | /mobile/auth/logout |  |
| MobileModule | GET | /mobile/bootstrap | Permission.MOBILE_ACCESS |
| MobileModule | POST | /mobile/devices/register | Permission.MOBILE_ACCESS |
| MobileModule | GET | /mobile/devices | Permission.MOBILE_ACCESS |
| MobileModule | PATCH | /mobile/devices/:id | Permission.MOBILE_READ |
| MobileModule | POST | /mobile/devices/:id/revoke | Permission.MOBILE_MANAGE |
| MobileModule | GET | /mobile/sessions | Permission.MOBILE_MANAGE |
| MobileModule | POST | /mobile/sessions/:id/revoke | Permission.MOBILE_SESSIONS |
| MobileModule | POST | /mobile/push/notifications | Permission.MOBILE_SESSIONS |
| MobileModule | GET | /mobile/push/notifications | Permission.MOBILE_PUSH |
| MobileModule | PATCH | /mobile/push/notifications/:id | Permission.MOBILE_PUSH |
| MobileModule | POST | /mobile/sync/pull | Permission.MOBILE_PUSH |
| MobileModule | POST | /mobile/sync/changes | Permission.MOBILE_SYNC |
| MobileModule | GET | /mobile/sync/changes | Permission.MOBILE_SYNC |
| NotificationDashboardModule | GET | /notifications/dashboard |  |
| NotificationsModule | GET | /notifications/dashboard |  |
| NotificationsModule | POST | /notifications/jobs/scheduled |  |
| NotificationsModule | POST | /notifications/jobs/retry-failed | Permission.NOTIFICATIONS_UPDATE |
| NotificationsModule | POST | /notifications/jobs/expire-workflows | Permission.NOTIFICATIONS_UPDATE |
| NotificationsModule | POST | /notifications/jobs/cleanup | Permission.WORKFLOWS_UPDATE |
| NotificationsModule | POST | /notifications/jobs/maintenance | Permission.NOTIFICATIONS_DELETE |
| NotificationsModule | GET | /notifications |  |
| NotificationsModule | GET | /notifications/employee/:employeeId | Permission.NOTIFICATIONS_READ |
| NotificationsModule | GET | /notifications/:id | Permission.NOTIFICATIONS_READ |
| NotificationsModule | POST | /notifications | Permission.NOTIFICATIONS_READ |
| NotificationsModule | PATCH | /notifications/:id | Permission.NOTIFICATIONS_CREATE |
| NotificationsModule | POST | /notifications/:id/read | Permission.NOTIFICATIONS_UPDATE |
| NotificationsModule | POST | /notifications/:id/sent | Permission.NOTIFICATIONS_UPDATE |
| NotificationsModule | POST | /notifications/:id/cancel | Permission.NOTIFICATIONS_UPDATE |
| NotificationsModule | POST | /notifications/queue/process | Permission.NOTIFICATIONS_UPDATE |
| NotificationsModule | POST | /notifications/queue/retry-failed | Permission.NOTIFICATIONS_UPDATE |
| NotificationsModule | DELETE | /notifications/:id | Permission.NOTIFICATIONS_UPDATE |
| ObservabilityModule | GET | /observability/health/providers |  |
| ObservabilityModule | POST | /observability/health/providers | Permission.OBSERVABILITY_READ |
| ObservabilityModule | PATCH | /observability/health/providers/:id | Permission.OBSERVABILITY_CREATE |
| ObservabilityModule | DELETE | /observability/health/providers/:id | Permission.OBSERVABILITY_UPDATE |
| ObservabilityModule | POST | /observability/health/providers/:id/run | Permission.OBSERVABILITY_DELETE |
| ObservabilityModule | POST | /observability/health/liveness | Permission.OBSERVABILITY_ADMIN |
| ObservabilityModule | POST | /observability/health/readiness | Permission.OBSERVABILITY_READ |
| ObservabilityModule | GET | /observability/health/results | Permission.OBSERVABILITY_READ |
| ObservabilityModule | GET | /observability/metrics/definitions | Permission.OBSERVABILITY_READ |
| ObservabilityModule | POST | /observability/metrics/definitions | Permission.OBSERVABILITY_READ |
| ObservabilityModule | PATCH | /observability/metrics/definitions/:id | Permission.OBSERVABILITY_CREATE |
| ObservabilityModule | DELETE | /observability/metrics/definitions/:id | Permission.OBSERVABILITY_UPDATE |
| ObservabilityModule | GET | /observability/metrics/samples | Permission.OBSERVABILITY_DELETE |
| ObservabilityModule | POST | /observability/metrics/samples | Permission.OBSERVABILITY_READ |
| ObservabilityModule | GET | /observability/metrics/http | Permission.OBSERVABILITY_CREATE |
| ObservabilityModule | GET | /observability/metrics/database | Permission.OBSERVABILITY_READ |
| ObservabilityModule | GET | /observability/metrics/workflow | Permission.OBSERVABILITY_READ |
| ObservabilityModule | GET | /observability/metrics/payroll | Permission.OBSERVABILITY_READ |
| ObservabilityModule | GET | /observability/metrics/business-rules | Permission.OBSERVABILITY_READ |
| ObservabilityModule | GET | /observability/logs | Permission.OBSERVABILITY_READ |
| ObservabilityModule | POST | /observability/logs | Permission.OBSERVABILITY_READ |
| ObservabilityModule | GET | /observability/logs/summary | Permission.OBSERVABILITY_CREATE |
| ObservabilityModule | GET | /observability/traces | Permission.OBSERVABILITY_READ |
| ObservabilityModule | POST | /observability/traces | Permission.OBSERVABILITY_READ |
| ObservabilityModule | GET | /observability/traces/spans | Permission.OBSERVABILITY_CREATE |
| ObservabilityModule | POST | /observability/traces/spans | Permission.OBSERVABILITY_READ |
| ObservabilityModule | GET | /observability/traces/requests | Permission.OBSERVABILITY_CREATE |
| ObservabilityModule | GET | /observability/traces/services | Permission.OBSERVABILITY_READ |
| ObservabilityModule | GET | /observability/traces/database | Permission.OBSERVABILITY_READ |
| ObservabilityModule | GET | /observability/traces/external-providers | Permission.OBSERVABILITY_READ |
| ObservabilityModule | GET | /observability/management/status | Permission.OBSERVABILITY_READ |
| ObservabilityModule | GET | /observability/management/diagnostics | Permission.OBSERVABILITY_ADMIN |
| ObservabilityModule | GET | /observability/management/metrics | Permission.OBSERVABILITY_ADMIN |
| ObservabilityModule | GET | /observability/management/health | Permission.OBSERVABILITY_ADMIN |
| BranchesModule | GET | /organization/branches |  |
| BranchesModule | GET | /organization/branches/:id | Permission.ORGANIZATION_READ |
| BranchesModule | POST | /organization/branches | Permission.ORGANIZATION_READ |
| BranchesModule | PATCH | /organization/branches/:id | Permission.ORGANIZATION_CREATE |
| BranchesModule | DELETE | /organization/branches/:id | Permission.ORGANIZATION_UPDATE |
| CompaniesModule | GET | /organization/companies |  |
| CompaniesModule | GET | /organization/companies/:id | Permission.ORGANIZATION_READ |
| CompaniesModule | POST | /organization/companies | Permission.ORGANIZATION_READ |
| CompaniesModule | PATCH | /organization/companies/:id | Permission.ORGANIZATION_CREATE |
| CompaniesModule | DELETE | /organization/companies/:id | Permission.ORGANIZATION_UPDATE |
| CostCentersModule | GET | /organization/cost-centers |  |
| CostCentersModule | GET | /organization/cost-centers/:id | Permission.ORGANIZATION_READ |
| CostCentersModule | POST | /organization/cost-centers | Permission.ORGANIZATION_READ |
| CostCentersModule | PATCH | /organization/cost-centers/:id | Permission.ORGANIZATION_CREATE |
| CostCentersModule | DELETE | /organization/cost-centers/:id | Permission.ORGANIZATION_UPDATE |
| DepartmentsModule | GET | /organization/departments |  |
| DepartmentsModule | GET | /organization/departments/:id | Permission.ORGANIZATION_READ |
| DepartmentsModule | POST | /organization/departments | Permission.ORGANIZATION_READ |
| DepartmentsModule | PATCH | /organization/departments/:id | Permission.ORGANIZATION_CREATE |
| DepartmentsModule | DELETE | /organization/departments/:id | Permission.ORGANIZATION_UPDATE |
| OrganizationModule | GET | /organization/branches |  |
| OrganizationModule | GET | /organization/branches/:id | Permission.ORGANIZATION_READ |
| OrganizationModule | POST | /organization/branches | Permission.ORGANIZATION_READ |
| OrganizationModule | PATCH | /organization/branches/:id | Permission.ORGANIZATION_CREATE |
| OrganizationModule | DELETE | /organization/branches/:id | Permission.ORGANIZATION_UPDATE |
| OrganizationModule | GET | /organization/companies |  |
| OrganizationModule | GET | /organization/companies/:id | Permission.ORGANIZATION_READ |
| OrganizationModule | POST | /organization/companies | Permission.ORGANIZATION_READ |
| OrganizationModule | PATCH | /organization/companies/:id | Permission.ORGANIZATION_CREATE |
| OrganizationModule | DELETE | /organization/companies/:id | Permission.ORGANIZATION_UPDATE |
| OrganizationModule | GET | /organization/cost-centers |  |
| OrganizationModule | GET | /organization/cost-centers/:id | Permission.ORGANIZATION_READ |
| OrganizationModule | POST | /organization/cost-centers | Permission.ORGANIZATION_READ |
| OrganizationModule | PATCH | /organization/cost-centers/:id | Permission.ORGANIZATION_CREATE |
| OrganizationModule | DELETE | /organization/cost-centers/:id | Permission.ORGANIZATION_UPDATE |
| OrganizationModule | GET | /organization/departments |  |
| OrganizationModule | GET | /organization/departments/:id | Permission.ORGANIZATION_READ |
| OrganizationModule | POST | /organization/departments | Permission.ORGANIZATION_READ |
| OrganizationModule | PATCH | /organization/departments/:id | Permission.ORGANIZATION_CREATE |
| OrganizationModule | DELETE | /organization/departments/:id | Permission.ORGANIZATION_UPDATE |
| OrganizationModule | GET | /organization/positions |  |
| OrganizationModule | GET | /organization/positions/:id | Permission.ORGANIZATION_READ |
| OrganizationModule | POST | /organization/positions | Permission.ORGANIZATION_READ |
| OrganizationModule | PATCH | /organization/positions/:id | Permission.ORGANIZATION_CREATE |
| OrganizationModule | DELETE | /organization/positions/:id | Permission.ORGANIZATION_UPDATE |
| PositionsModule | GET | /organization/positions |  |
| PositionsModule | GET | /organization/positions/:id | Permission.ORGANIZATION_READ |
| PositionsModule | POST | /organization/positions | Permission.ORGANIZATION_READ |
| PositionsModule | PATCH | /organization/positions/:id | Permission.ORGANIZATION_CREATE |
| PositionsModule | DELETE | /organization/positions/:id | Permission.ORGANIZATION_UPDATE |
| PayrollApprovalModule | POST | /payroll/runs/:id/review |  |
| PayrollApprovalModule | POST | /payroll/runs/:id/approve | Permission.PAYROLL_UPDATE |
| PayrollApprovalModule | POST | /payroll/runs/:id/reject | Permission.PAYROLL_UPDATE |
| PayrollApprovalModule | POST | /payroll/runs/:id/lock | Permission.PAYROLL_UPDATE |
| PayrollAttendanceModule | POST | /payroll/attendance/apply |  |
| PayrollCalculationModule | POST | /payroll/calculation/preview |  |
| PayrollCalculationModule | POST | /payroll/calculation/calculate | Permission.PAYROLL_READ |
| PayrollItemsModule | GET | /payroll/items |  |
| PayrollItemsModule | GET | /payroll/items/run/:payrollRunId | Permission.PAYROLL_READ |
| PayrollItemsModule | GET | /payroll/items/:id | Permission.PAYROLL_READ |
| PayrollItemsModule | POST | /payroll/items | Permission.PAYROLL_READ |
| PayrollItemsModule | PATCH | /payroll/items/:id | Permission.PAYROLL_CREATE |
| PayrollItemsModule | DELETE | /payroll/items/:id | Permission.PAYROLL_UPDATE |
| PayrollPeriodsModule | GET | /payroll/periods |  |
| PayrollPeriodsModule | GET | /payroll/periods/:id | Permission.PAYROLL_READ |
| PayrollPeriodsModule | POST | /payroll/periods | Permission.PAYROLL_READ |
| PayrollPeriodsModule | PATCH | /payroll/periods/:id | Permission.PAYROLL_CREATE |
| PayrollPeriodsModule | DELETE | /payroll/periods/:id | Permission.PAYROLL_UPDATE |
| PayrollProfilesModule | GET | /payroll/profiles |  |
| PayrollProfilesModule | GET | /payroll/profiles/:id | Permission.PAYROLL_READ |
| PayrollProfilesModule | POST | /payroll/profiles | Permission.PAYROLL_READ |
| PayrollProfilesModule | PATCH | /payroll/profiles/:id | Permission.PAYROLL_CREATE |
| PayrollProfilesModule | DELETE | /payroll/profiles/:id | Permission.PAYROLL_UPDATE |
| PayrollRunsModule | GET | /payroll/runs |  |
| PayrollRunsModule | GET | /payroll/runs/:id | Permission.PAYROLL_READ |
| PayrollRunsModule | POST | /payroll/runs | Permission.PAYROLL_READ |
| PayrollRunsModule | PATCH | /payroll/runs/:id | Permission.PAYROLL_CREATE |
| PayrollRunsModule | DELETE | /payroll/runs/:id | Permission.PAYROLL_UPDATE |
| PayrollModule | POST | /payroll/runs/:id/review |  |
| PayrollModule | POST | /payroll/runs/:id/approve | Permission.PAYROLL_UPDATE |
| PayrollModule | POST | /payroll/runs/:id/reject | Permission.PAYROLL_UPDATE |
| PayrollModule | POST | /payroll/runs/:id/lock | Permission.PAYROLL_UPDATE |
| PayrollModule | POST | /payroll/attendance/apply |  |
| PayrollModule | POST | /payroll/calculation/preview |  |
| PayrollModule | POST | /payroll/calculation/calculate | Permission.PAYROLL_READ |
| PayrollModule | GET | /payroll/items |  |
| PayrollModule | GET | /payroll/items/run/:payrollRunId | Permission.PAYROLL_READ |
| PayrollModule | GET | /payroll/items/:id | Permission.PAYROLL_READ |
| PayrollModule | POST | /payroll/items | Permission.PAYROLL_READ |
| PayrollModule | PATCH | /payroll/items/:id | Permission.PAYROLL_CREATE |
| PayrollModule | DELETE | /payroll/items/:id | Permission.PAYROLL_UPDATE |
| PayrollModule | GET | /payroll/periods |  |
| PayrollModule | GET | /payroll/periods/:id | Permission.PAYROLL_READ |
| PayrollModule | POST | /payroll/periods | Permission.PAYROLL_READ |
| PayrollModule | PATCH | /payroll/periods/:id | Permission.PAYROLL_CREATE |
| PayrollModule | DELETE | /payroll/periods/:id | Permission.PAYROLL_UPDATE |
| PayrollModule | GET | /payroll/profiles |  |
| PayrollModule | GET | /payroll/profiles/:id | Permission.PAYROLL_READ |
| PayrollModule | POST | /payroll/profiles | Permission.PAYROLL_READ |
| PayrollModule | PATCH | /payroll/profiles/:id | Permission.PAYROLL_CREATE |
| PayrollModule | DELETE | /payroll/profiles/:id | Permission.PAYROLL_UPDATE |
| PayrollModule | GET | /payroll/runs |  |
| PayrollModule | GET | /payroll/runs/:id | Permission.PAYROLL_READ |
| PayrollModule | POST | /payroll/runs | Permission.PAYROLL_READ |
| PayrollModule | PATCH | /payroll/runs/:id | Permission.PAYROLL_CREATE |
| PayrollModule | DELETE | /payroll/runs/:id | Permission.PAYROLL_UPDATE |
| PayrollModule | GET | /payroll/payslips |  |
| PayrollModule | GET | /payroll/payslips/employee/:employeeId | Permission.PAYROLL_READ |
| PayrollModule | GET | /payroll/payslips/:id | Permission.PAYROLL_READ |
| PayrollModule | GET | /payroll/payslips/:id/pdf-payload | Permission.PAYROLL_READ |
| PayrollModule | PATCH | /payroll/payslips/:id | Permission.PAYROLL_READ |
| PayrollModule | POST | /payroll/payslips/run/:payrollRunId/issue | Permission.PAYROLL_UPDATE |
| PayrollModule | GET | /payroll/reports/dashboard |  |
| PayrollModule | GET | /payroll/reports/salary | Permission.PAYROLL_READ |
| PayrollModule | GET | /payroll/reports/departments | Permission.PAYROLL_READ |
| PayrollModule | GET | /payroll/reports/cost-centers | Permission.PAYROLL_READ |
| PayrollModule | GET | /payroll/reports/monthly | Permission.PAYROLL_READ |
| PayrollModule | GET | /payroll/salary-components |  |
| PayrollModule | GET | /payroll/salary-components/:id | Permission.PAYROLL_READ |
| PayrollModule | POST | /payroll/salary-components | Permission.PAYROLL_READ |
| PayrollModule | PATCH | /payroll/salary-components/:id | Permission.PAYROLL_CREATE |
| PayrollModule | DELETE | /payroll/salary-components/:id | Permission.PAYROLL_UPDATE |
| PayslipsModule | GET | /payroll/payslips |  |
| PayslipsModule | GET | /payroll/payslips/employee/:employeeId | Permission.PAYROLL_READ |
| PayslipsModule | GET | /payroll/payslips/:id | Permission.PAYROLL_READ |
| PayslipsModule | GET | /payroll/payslips/:id/pdf-payload | Permission.PAYROLL_READ |
| PayslipsModule | PATCH | /payroll/payslips/:id | Permission.PAYROLL_READ |
| PayslipsModule | POST | /payroll/payslips/run/:payrollRunId/issue | Permission.PAYROLL_UPDATE |
| PayrollReportsModule | GET | /payroll/reports/dashboard |  |
| PayrollReportsModule | GET | /payroll/reports/salary | Permission.PAYROLL_READ |
| PayrollReportsModule | GET | /payroll/reports/departments | Permission.PAYROLL_READ |
| PayrollReportsModule | GET | /payroll/reports/cost-centers | Permission.PAYROLL_READ |
| PayrollReportsModule | GET | /payroll/reports/monthly | Permission.PAYROLL_READ |
| SalaryComponentsModule | GET | /payroll/salary-components |  |
| SalaryComponentsModule | GET | /payroll/salary-components/:id | Permission.PAYROLL_READ |
| SalaryComponentsModule | POST | /payroll/salary-components | Permission.PAYROLL_READ |
| SalaryComponentsModule | PATCH | /payroll/salary-components/:id | Permission.PAYROLL_CREATE |
| SalaryComponentsModule | DELETE | /payroll/salary-components/:id | Permission.PAYROLL_UPDATE |
| PerformanceCyclesModule | GET | /performance/cycles |  |
| PerformanceCyclesModule | GET | /performance/cycles/:id | Permission.PERFORMANCE_READ |
| PerformanceCyclesModule | POST | /performance/cycles | Permission.PERFORMANCE_READ |
| PerformanceCyclesModule | PATCH | /performance/cycles/:id | Permission.PERFORMANCE_CREATE |
| PerformanceCyclesModule | DELETE | /performance/cycles/:id | Permission.PERFORMANCE_UPDATE |
| PerformanceDashboardModule | GET | /performance/dashboard/summary |  |
| PerformanceGoalsModule | GET | /performance/goals |  |
| PerformanceGoalsModule | GET | /performance/goals/:id | Permission.PERFORMANCE_READ |
| PerformanceGoalsModule | POST | /performance/goals | Permission.PERFORMANCE_READ |
| PerformanceGoalsModule | PATCH | /performance/goals/:id | Permission.PERFORMANCE_CREATE |
| PerformanceGoalsModule | DELETE | /performance/goals/:id | Permission.PERFORMANCE_UPDATE |
| PerformanceModule | GET | /performance/cycles |  |
| PerformanceModule | GET | /performance/cycles/:id | Permission.PERFORMANCE_READ |
| PerformanceModule | POST | /performance/cycles | Permission.PERFORMANCE_READ |
| PerformanceModule | PATCH | /performance/cycles/:id | Permission.PERFORMANCE_CREATE |
| PerformanceModule | DELETE | /performance/cycles/:id | Permission.PERFORMANCE_UPDATE |
| PerformanceModule | GET | /performance/dashboard/summary |  |
| PerformanceModule | GET | /performance/goals |  |
| PerformanceModule | GET | /performance/goals/:id | Permission.PERFORMANCE_READ |
| PerformanceModule | POST | /performance/goals | Permission.PERFORMANCE_READ |
| PerformanceModule | PATCH | /performance/goals/:id | Permission.PERFORMANCE_CREATE |
| PerformanceModule | DELETE | /performance/goals/:id | Permission.PERFORMANCE_UPDATE |
| PerformanceModule | GET | /performance/review-items |  |
| PerformanceModule | GET | /performance/review-items/:id | Permission.PERFORMANCE_READ |
| PerformanceModule | POST | /performance/review-items | Permission.PERFORMANCE_READ |
| PerformanceModule | PATCH | /performance/review-items/:id | Permission.PERFORMANCE_CREATE |
| PerformanceModule | DELETE | /performance/review-items/:id | Permission.PERFORMANCE_UPDATE |
| PerformanceModule | GET | /performance/reviews |  |
| PerformanceModule | GET | /performance/reviews/:id | Permission.PERFORMANCE_READ |
| PerformanceModule | POST | /performance/reviews | Permission.PERFORMANCE_READ |
| PerformanceModule | PATCH | /performance/reviews/:id | Permission.PERFORMANCE_CREATE |
| PerformanceModule | DELETE | /performance/reviews/:id | Permission.PERFORMANCE_UPDATE |
| PerformanceReviewItemsModule | GET | /performance/review-items |  |
| PerformanceReviewItemsModule | GET | /performance/review-items/:id | Permission.PERFORMANCE_READ |
| PerformanceReviewItemsModule | POST | /performance/review-items | Permission.PERFORMANCE_READ |
| PerformanceReviewItemsModule | PATCH | /performance/review-items/:id | Permission.PERFORMANCE_CREATE |
| PerformanceReviewItemsModule | DELETE | /performance/review-items/:id | Permission.PERFORMANCE_UPDATE |
| PerformanceReviewsModule | GET | /performance/reviews |  |
| PerformanceReviewsModule | GET | /performance/reviews/:id | Permission.PERFORMANCE_READ |
| PerformanceReviewsModule | POST | /performance/reviews | Permission.PERFORMANCE_READ |
| PerformanceReviewsModule | PATCH | /performance/reviews/:id | Permission.PERFORMANCE_CREATE |
| PerformanceReviewsModule | DELETE | /performance/reviews/:id | Permission.PERFORMANCE_UPDATE |
| PerformanceOptimizationModule | GET | /performance-optimization/queries/recommendations |  |
| PerformanceOptimizationModule | GET | /performance-optimization/cache | Permission.PERFORMANCE_OPTIMIZATION_READ |
| PerformanceOptimizationModule | GET | /performance-optimization/cache/stats | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| PerformanceOptimizationModule | GET | /performance-optimization/cache/:key | Permission.PERFORMANCE_OPTIMIZATION_READ |
| PerformanceOptimizationModule | POST | /performance-optimization/cache | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| PerformanceOptimizationModule | POST | /performance-optimization/cache/invalidate | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| PerformanceOptimizationModule | POST | /performance-optimization/batch/plan | Permission.PERFORMANCE_OPTIMIZATION_MANAGE |
| PerformanceOptimizationModule | POST | /performance-optimization/lazy-loading/plan | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE |
| PerformanceOptimizationModule | GET | /performance-optimization/memory | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE |
| PerformanceOptimizationModule | GET | /performance-optimization/metrics | Permission.PERFORMANCE_OPTIMIZATION_READ |
| PerformanceOptimizationModule | POST | /performance-optimization/metrics | Permission.PERFORMANCE_OPTIMIZATION_METRICS |
| PermissionsModule | GET | /permissions |  |
| PermissionsModule | GET | /permissions/:id | Permission.PERMISSIONS_READ |
| PermissionsModule | POST | /permissions | Permission.PERMISSIONS_READ |
| PermissionsModule | PATCH | /permissions/:id | Permission.PERMISSIONS_CREATE |
| PermissionsModule | DELETE | /permissions/:id | Permission.PERMISSIONS_UPDATE |
| PluginsModule | GET | /plugins/manifests |  |
| PluginsModule | POST | /plugins/manifests | Permission.PLUGINS_READ |
| PluginsModule | PATCH | /plugins/manifests/:id | Permission.PLUGINS_CREATE |
| PluginsModule | DELETE | /plugins/manifests/:id | Permission.PLUGINS_UPDATE |
| PluginsModule | POST | /plugins/manifests/:id/restore | Permission.PLUGINS_DELETE |
| PluginsModule | POST | /plugins/manifests/:id/load | Permission.PLUGINS_UPDATE |
| PluginsModule | GET | /plugins/registry | Permission.PLUGINS_EXECUTE |
| PluginsModule | POST | /plugins/registry/:id/enable | Permission.PLUGINS_READ |
| PluginsModule | POST | /plugins/registry/:id/disable | Permission.PLUGINS_EXECUTE |
| PluginsModule | POST | /plugins/registry/:id/unload | Permission.PLUGINS_EXECUTE |
| PluginsModule | GET | /plugins/registry/:id/lifecycle-events | Permission.PLUGINS_EXECUTE |
| PluginsModule | GET | /plugins/sdk/event-subscriptions | Permission.PLUGINS_READ |
| PluginsModule | POST | /plugins/sdk/event-subscriptions | Permission.PLUGINS_READ |
| PluginsModule | PATCH | /plugins/sdk/event-subscriptions/:id | Permission.PLUGINS_UPDATE |
| PluginsModule | DELETE | /plugins/sdk/event-subscriptions/:id | Permission.PLUGINS_UPDATE |
| PluginsModule | GET | /plugins/sdk/hooks | Permission.PLUGINS_DELETE |
| PluginsModule | POST | /plugins/sdk/hooks | Permission.PLUGINS_READ |
| PluginsModule | PATCH | /plugins/sdk/hooks/:id | Permission.PLUGINS_UPDATE |
| PluginsModule | DELETE | /plugins/sdk/hooks/:id | Permission.PLUGINS_UPDATE |
| PluginsModule | GET | /plugins/sdk/service-bindings | Permission.PLUGINS_DELETE |
| PluginsModule | POST | /plugins/sdk/service-bindings | Permission.PLUGINS_READ |
| PluginsModule | PATCH | /plugins/sdk/service-bindings/:id | Permission.PLUGINS_UPDATE |
| PluginsModule | DELETE | /plugins/sdk/service-bindings/:id | Permission.PLUGINS_UPDATE |
| PluginsModule | GET | /plugins/sdk/permission-grants | Permission.PLUGINS_DELETE |
| PluginsModule | POST | /plugins/sdk/permission-grants | Permission.PLUGINS_READ |
| PluginsModule | DELETE | /plugins/sdk/permission-grants/:id | Permission.PLUGINS_GOVERN |
| PluginsModule | GET | /plugins/sdk/configurations | Permission.PLUGINS_GOVERN |
| PluginsModule | POST | /plugins/sdk/configurations | Permission.PLUGINS_READ |
| PluginsModule | PATCH | /plugins/sdk/configurations/:id | Permission.PLUGINS_UPDATE |
| PluginsModule | DELETE | /plugins/sdk/configurations/:id | Permission.PLUGINS_UPDATE |
| PluginsModule | POST | /plugins/sdk/events | Permission.PLUGINS_DELETE |
| PluginsModule | GET | /plugins/sdk/events | Permission.PLUGINS_EXECUTE |
| PluginsModule | GET | /plugins/marketplace/packages | Permission.PLUGINS_READ |
| PluginsModule | POST | /plugins/marketplace/packages | Permission.PLUGINS_READ |
| PluginsModule | PATCH | /plugins/marketplace/packages/:id | Permission.PLUGINS_CREATE |
| PluginsModule | GET | /plugins/marketplace/versions | Permission.PLUGINS_UPDATE |
| PluginsModule | POST | /plugins/marketplace/versions | Permission.PLUGINS_READ |
| PluginsModule | PATCH | /plugins/marketplace/versions/:id | Permission.PLUGINS_CREATE |
| PluginsModule | POST | /plugins/marketplace/versions/:id/install | Permission.PLUGINS_UPDATE |
| PluginsModule | GET | /plugins/marketplace/installations | Permission.PLUGINS_EXECUTE |
| PluginsModule | POST | /plugins/marketplace/installations/:id/enable | Permission.PLUGINS_READ |
| PluginsModule | POST | /plugins/marketplace/installations/:id/disable | Permission.PLUGINS_EXECUTE |
| PluginsModule | POST | /plugins/marketplace/installations/:id/uninstall | Permission.PLUGINS_EXECUTE |
| PluginsModule | POST | /plugins/marketplace/installations/:id/upgrade | Permission.PLUGINS_DELETE |
| PluginsModule | GET | /plugins/isolation/sandbox-policies | Permission.PLUGINS_EXECUTE |
| PluginsModule | POST | /plugins/isolation/sandbox-policies | Permission.PLUGINS_READ |
| PluginsModule | GET | /plugins/isolation/dependencies | Permission.PLUGINS_GOVERN |
| PluginsModule | POST | /plugins/isolation/dependencies | Permission.PLUGINS_READ |
| PluginsModule | PATCH | /plugins/isolation/dependencies/:id | Permission.PLUGINS_UPDATE |
| PluginsModule | POST | /plugins/isolation/registry/:id/validate-dependencies | Permission.PLUGINS_UPDATE |
| PluginsModule | GET | /plugins/isolation/capability-grants | Permission.PLUGINS_EXECUTE |
| PluginsModule | POST | /plugins/isolation/capability-grants | Permission.PLUGINS_READ |
| PluginsModule | DELETE | /plugins/isolation/capability-grants/:id | Permission.PLUGINS_GOVERN |
| PluginsModule | POST | /plugins/isolation/registry/:id/validate | Permission.PLUGINS_GOVERN |
| PluginsModule | POST | /plugins/management/upload | Permission.PLUGINS_EXECUTE |
| PluginsModule | GET | /plugins/management/registry/:id/health | Permission.PLUGINS_CREATE |
| PluginsModule | GET | /plugins/management/metrics | Permission.PLUGINS_READ |
| PublicApiModule | GET | /public-api/registry/groups |  |
| PublicApiModule | POST | /public-api/registry/groups | Permission.PUBLIC_API_READ |
| PublicApiModule | PATCH | /public-api/registry/groups/:id | Permission.PUBLIC_API_CREATE |
| PublicApiModule | DELETE | /public-api/registry/groups/:id | Permission.PUBLIC_API_UPDATE |
| PublicApiModule | GET | /public-api/registry/apis | Permission.PUBLIC_API_DELETE |
| PublicApiModule | POST | /public-api/registry/apis | Permission.PUBLIC_API_READ |
| PublicApiModule | PATCH | /public-api/registry/apis/:id | Permission.PUBLIC_API_CREATE |
| PublicApiModule | DELETE | /public-api/registry/apis/:id | Permission.PUBLIC_API_UPDATE |
| PublicApiModule | GET | /public-api/registry/versions | Permission.PUBLIC_API_DELETE |
| PublicApiModule | POST | /public-api/registry/versions | Permission.PUBLIC_API_READ |
| PublicApiModule | PATCH | /public-api/registry/versions/:id | Permission.PUBLIC_API_CREATE |
| PublicApiModule | GET | /public-api/keys | Permission.PUBLIC_API_UPDATE |
| PublicApiModule | POST | /public-api/keys | Permission.PUBLIC_API_KEYS |
| PublicApiModule | POST | /public-api/keys/:id/rotate | Permission.PUBLIC_API_KEYS |
| PublicApiModule | POST | /public-api/keys/:id/revoke | Permission.PUBLIC_API_KEYS |
| PublicApiModule | GET | /public-api/rate-limits/policies | Permission.PUBLIC_API_KEYS |
| PublicApiModule | POST | /public-api/rate-limits/policies | Permission.PUBLIC_API_ADMIN |
| PublicApiModule | PATCH | /public-api/rate-limits/policies/:id | Permission.PUBLIC_API_ADMIN |
| PublicApiModule | DELETE | /public-api/rate-limits/policies/:id | Permission.PUBLIC_API_ADMIN |
| PublicApiModule | POST | /public-api/rate-limits/evaluate | Permission.PUBLIC_API_ADMIN |
| PublicApiModule | GET | /public-api/rate-limits/usage | Permission.PUBLIC_API_ADMIN |
| PublicApiModule | GET | /public-api/developer/applications | Permission.PUBLIC_API_READ |
| PublicApiModule | POST | /public-api/developer/applications | Permission.PUBLIC_API_READ |
| PublicApiModule | PATCH | /public-api/developer/applications/:id | Permission.PUBLIC_API_CREATE |
| PublicApiModule | DELETE | /public-api/developer/applications/:id | Permission.PUBLIC_API_UPDATE |
| PublicApiModule | POST | /public-api/developer/applications/:id/keys | Permission.PUBLIC_API_DELETE |
| PublicApiModule | POST | /public-api/developer/applications/:id/keys/:keyId/revoke | Permission.PUBLIC_API_KEYS |
| PublicApiModule | GET | /public-api/developer/applications/:id/usage | Permission.PUBLIC_API_KEYS |
| PublicApiModule | POST | /public-api/security/verify-signature | Permission.PUBLIC_API_READ |
| PublicApiModule | GET | /public-api/security/request-logs | Permission.PUBLIC_API_ADMIN |
| PublicApiModule | POST | /public-api/security/request-logs | Permission.PUBLIC_API_ADMIN |
| ApplicantsModule | GET | /recruitment/applicants |  |
| ApplicantsModule | GET | /recruitment/applicants/:id | Permission.RECRUITMENT_READ |
| ApplicantsModule | POST | /recruitment/applicants | Permission.RECRUITMENT_READ |
| ApplicantsModule | PATCH | /recruitment/applicants/:id | Permission.RECRUITMENT_CREATE |
| ApplicantsModule | DELETE | /recruitment/applicants/:id | Permission.RECRUITMENT_UPDATE |
| ApplicationsModule | GET | /recruitment/applications |  |
| ApplicationsModule | GET | /recruitment/applications/:id | Permission.RECRUITMENT_READ |
| ApplicationsModule | POST | /recruitment/applications | Permission.RECRUITMENT_READ |
| ApplicationsModule | PATCH | /recruitment/applications/:id | Permission.RECRUITMENT_CREATE |
| ApplicationsModule | DELETE | /recruitment/applications/:id | Permission.RECRUITMENT_UPDATE |
| RecruitmentDashboardModule | GET | /recruitment/dashboard/summary |  |
| HiringModule | POST | /recruitment/hiring/hire |  |
| InterviewEvaluationsModule | GET | /recruitment/interview-evaluations |  |
| InterviewEvaluationsModule | GET | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_READ |
| InterviewEvaluationsModule | POST | /recruitment/interview-evaluations | Permission.RECRUITMENT_READ |
| InterviewEvaluationsModule | PATCH | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_CREATE |
| InterviewEvaluationsModule | DELETE | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_UPDATE |
| InterviewsModule | GET | /recruitment/interviews |  |
| InterviewsModule | GET | /recruitment/interviews/:id | Permission.RECRUITMENT_READ |
| InterviewsModule | POST | /recruitment/interviews | Permission.RECRUITMENT_READ |
| InterviewsModule | PATCH | /recruitment/interviews/:id | Permission.RECRUITMENT_CREATE |
| InterviewsModule | DELETE | /recruitment/interviews/:id | Permission.RECRUITMENT_UPDATE |
| JobPositionsModule | GET | /recruitment/job-positions |  |
| JobPositionsModule | GET | /recruitment/job-positions/:id | Permission.RECRUITMENT_READ |
| JobPositionsModule | POST | /recruitment/job-positions | Permission.RECRUITMENT_READ |
| JobPositionsModule | PATCH | /recruitment/job-positions/:id | Permission.RECRUITMENT_CREATE |
| JobPositionsModule | DELETE | /recruitment/job-positions/:id | Permission.RECRUITMENT_UPDATE |
| OfferLettersModule | GET | /recruitment/offer-letters |  |
| OfferLettersModule | GET | /recruitment/offer-letters/:id | Permission.RECRUITMENT_READ |
| OfferLettersModule | POST | /recruitment/offer-letters | Permission.RECRUITMENT_READ |
| OfferLettersModule | PATCH | /recruitment/offer-letters/:id | Permission.RECRUITMENT_CREATE |
| OfferLettersModule | POST | /recruitment/offer-letters/:id/send | Permission.RECRUITMENT_UPDATE |
| OfferLettersModule | POST | /recruitment/offer-letters/:id/accept | Permission.RECRUITMENT_UPDATE |
| OfferLettersModule | POST | /recruitment/offer-letters/:id/reject | Permission.RECRUITMENT_UPDATE |
| OfferLettersModule | DELETE | /recruitment/offer-letters/:id | Permission.RECRUITMENT_UPDATE |
| RecruitmentModule | GET | /recruitment/applicants |  |
| RecruitmentModule | GET | /recruitment/applicants/:id | Permission.RECRUITMENT_READ |
| RecruitmentModule | POST | /recruitment/applicants | Permission.RECRUITMENT_READ |
| RecruitmentModule | PATCH | /recruitment/applicants/:id | Permission.RECRUITMENT_CREATE |
| RecruitmentModule | DELETE | /recruitment/applicants/:id | Permission.RECRUITMENT_UPDATE |
| RecruitmentModule | GET | /recruitment/applications |  |
| RecruitmentModule | GET | /recruitment/applications/:id | Permission.RECRUITMENT_READ |
| RecruitmentModule | POST | /recruitment/applications | Permission.RECRUITMENT_READ |
| RecruitmentModule | PATCH | /recruitment/applications/:id | Permission.RECRUITMENT_CREATE |
| RecruitmentModule | DELETE | /recruitment/applications/:id | Permission.RECRUITMENT_UPDATE |
| RecruitmentModule | GET | /recruitment/dashboard/summary |  |
| RecruitmentModule | POST | /recruitment/hiring/hire |  |
| RecruitmentModule | GET | /recruitment/interview-evaluations |  |
| RecruitmentModule | GET | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_READ |
| RecruitmentModule | POST | /recruitment/interview-evaluations | Permission.RECRUITMENT_READ |
| RecruitmentModule | PATCH | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_CREATE |
| RecruitmentModule | DELETE | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_UPDATE |
| RecruitmentModule | GET | /recruitment/interviews |  |
| RecruitmentModule | GET | /recruitment/interviews/:id | Permission.RECRUITMENT_READ |
| RecruitmentModule | POST | /recruitment/interviews | Permission.RECRUITMENT_READ |
| RecruitmentModule | PATCH | /recruitment/interviews/:id | Permission.RECRUITMENT_CREATE |
| RecruitmentModule | DELETE | /recruitment/interviews/:id | Permission.RECRUITMENT_UPDATE |
| RecruitmentModule | GET | /recruitment/job-positions |  |
| RecruitmentModule | GET | /recruitment/job-positions/:id | Permission.RECRUITMENT_READ |
| RecruitmentModule | POST | /recruitment/job-positions | Permission.RECRUITMENT_READ |
| RecruitmentModule | PATCH | /recruitment/job-positions/:id | Permission.RECRUITMENT_CREATE |
| RecruitmentModule | DELETE | /recruitment/job-positions/:id | Permission.RECRUITMENT_UPDATE |
| RecruitmentModule | GET | /recruitment/offer-letters |  |
| RecruitmentModule | GET | /recruitment/offer-letters/:id | Permission.RECRUITMENT_READ |
| RecruitmentModule | POST | /recruitment/offer-letters | Permission.RECRUITMENT_READ |
| RecruitmentModule | PATCH | /recruitment/offer-letters/:id | Permission.RECRUITMENT_CREATE |
| RecruitmentModule | POST | /recruitment/offer-letters/:id/send | Permission.RECRUITMENT_UPDATE |
| RecruitmentModule | POST | /recruitment/offer-letters/:id/accept | Permission.RECRUITMENT_UPDATE |
| RecruitmentModule | POST | /recruitment/offer-letters/:id/reject | Permission.RECRUITMENT_UPDATE |
| RecruitmentModule | DELETE | /recruitment/offer-letters/:id | Permission.RECRUITMENT_UPDATE |
| RecruitmentModule | GET | /recruitment/vacancies |  |
| RecruitmentModule | GET | /recruitment/vacancies/:id | Permission.RECRUITMENT_READ |
| RecruitmentModule | POST | /recruitment/vacancies | Permission.RECRUITMENT_READ |
| RecruitmentModule | PATCH | /recruitment/vacancies/:id | Permission.RECRUITMENT_CREATE |
| RecruitmentModule | DELETE | /recruitment/vacancies/:id | Permission.RECRUITMENT_UPDATE |
| VacanciesModule | GET | /recruitment/vacancies |  |
| VacanciesModule | GET | /recruitment/vacancies/:id | Permission.RECRUITMENT_READ |
| VacanciesModule | POST | /recruitment/vacancies | Permission.RECRUITMENT_READ |
| VacanciesModule | PATCH | /recruitment/vacancies/:id | Permission.RECRUITMENT_CREATE |
| VacanciesModule | DELETE | /recruitment/vacancies/:id | Permission.RECRUITMENT_UPDATE |
| ReportingDashboardsModule | GET | /reporting/dashboards/executive |  |
| ReportingDashboardsModule | GET | /reporting/dashboards/hr | Permission.REPORTING_READ |
| ReportingDashboardsModule | GET | /reporting/dashboards/payroll | Permission.REPORTING_READ |
| ReportingDashboardsModule | GET | /reporting/dashboards/accounting | Permission.REPORTING_READ |
| ReportDefinitionsModule | GET | /reporting/categories |  |
| ReportDefinitionsModule | POST | /reporting/categories | Permission.REPORTING_READ |
| ReportDefinitionsModule | PATCH | /reporting/categories/:id | Permission.REPORTING_CREATE |
| ReportDefinitionsModule | GET | /reporting/definitions | Permission.REPORTING_UPDATE |
| ReportDefinitionsModule | GET | /reporting/definitions/:id | Permission.REPORTING_READ |
| ReportDefinitionsModule | POST | /reporting/definitions | Permission.REPORTING_READ |
| ReportDefinitionsModule | PATCH | /reporting/definitions/:id | Permission.REPORTING_CREATE |
| ReportExecutionModule | GET | /reporting/executions |  |
| ReportExecutionModule | GET | /reporting/executions/:id | Permission.REPORTING_READ |
| ReportExecutionModule | POST | /reporting/executions | Permission.REPORTING_READ |
| ReportExportModule | POST | /reporting/exports |  |
| FinanceReportsModule | GET | /reporting/finance/payroll-summary |  |
| FinanceReportsModule | GET | /reporting/finance/payslip-summary | Permission.REPORTING_READ |
| FinanceReportsModule | GET | /reporting/finance/trial-balance | Permission.REPORTING_READ |
| FinanceReportsModule | GET | /reporting/finance/general-ledger | Permission.REPORTING_READ |
| FinanceReportsModule | GET | /reporting/finance/cost-centers | Permission.REPORTING_READ |
| HrReportsModule | GET | /reporting/hr/employees |  |
| HrReportsModule | GET | /reporting/hr/attendance | Permission.REPORTING_READ |
| HrReportsModule | GET | /reporting/hr/leave | Permission.REPORTING_READ |
| HrReportsModule | GET | /reporting/hr/recruitment | Permission.REPORTING_READ |
| ReportingModule | GET | /reporting/dashboards/executive |  |
| ReportingModule | GET | /reporting/dashboards/hr | Permission.REPORTING_READ |
| ReportingModule | GET | /reporting/dashboards/payroll | Permission.REPORTING_READ |
| ReportingModule | GET | /reporting/dashboards/accounting | Permission.REPORTING_READ |
| ReportingModule | GET | /reporting/categories |  |
| ReportingModule | POST | /reporting/categories | Permission.REPORTING_READ |
| ReportingModule | PATCH | /reporting/categories/:id | Permission.REPORTING_CREATE |
| ReportingModule | GET | /reporting/definitions | Permission.REPORTING_UPDATE |
| ReportingModule | GET | /reporting/definitions/:id | Permission.REPORTING_READ |
| ReportingModule | POST | /reporting/definitions | Permission.REPORTING_READ |
| ReportingModule | PATCH | /reporting/definitions/:id | Permission.REPORTING_CREATE |
| ReportingModule | GET | /reporting/executions |  |
| ReportingModule | GET | /reporting/executions/:id | Permission.REPORTING_READ |
| ReportingModule | POST | /reporting/executions | Permission.REPORTING_READ |
| ReportingModule | POST | /reporting/exports |  |
| ReportingModule | GET | /reporting/finance/payroll-summary |  |
| ReportingModule | GET | /reporting/finance/payslip-summary | Permission.REPORTING_READ |
| ReportingModule | GET | /reporting/finance/trial-balance | Permission.REPORTING_READ |
| ReportingModule | GET | /reporting/finance/general-ledger | Permission.REPORTING_READ |
| ReportingModule | GET | /reporting/finance/cost-centers | Permission.REPORTING_READ |
| ReportingModule | GET | /reporting/hr/employees |  |
| ReportingModule | GET | /reporting/hr/attendance | Permission.REPORTING_READ |
| ReportingModule | GET | /reporting/hr/leave | Permission.REPORTING_READ |
| ReportingModule | GET | /reporting/hr/recruitment | Permission.REPORTING_READ |
| RolesModule | GET | /roles |  |
| RolesModule | GET | /roles/:id | Permission.ROLES_READ |
| RolesModule | POST | /roles | Permission.ROLES_READ |
| RolesModule | PATCH | /roles/:id | Permission.ROLES_CREATE |
| RolesModule | DELETE | /roles/:id | Permission.ROLES_UPDATE |
| SchedulerModule | GET | /scheduler/crons |  |
| SchedulerModule | POST | /scheduler/crons | Permission.SCHEDULER_READ |
| SchedulerModule | PATCH | /scheduler/crons/:id | Permission.SCHEDULER_CREATE |
| SchedulerModule | DELETE | /scheduler/crons/:id | Permission.SCHEDULER_UPDATE |
| SchedulerModule | GET | /scheduler/jobs | Permission.SCHEDULER_DELETE |
| SchedulerModule | POST | /scheduler/jobs | Permission.SCHEDULER_READ |
| SchedulerModule | PATCH | /scheduler/jobs/:id | Permission.SCHEDULER_CREATE |
| SchedulerModule | POST | /scheduler/jobs/:id/cancel | Permission.SCHEDULER_UPDATE |
| SchedulerModule | GET | /scheduler/history | Permission.SCHEDULER_EXECUTE |
| SchedulerModule | POST | /scheduler/queue/claim | Permission.SCHEDULER_READ |
| SchedulerModule | POST | /scheduler/jobs/:id/complete | Permission.SCHEDULER_EXECUTE |
| SchedulerModule | POST | /scheduler/jobs/:id/fail | Permission.SCHEDULER_EXECUTE |
| SchedulerModule | POST | /scheduler/jobs/:id/retry | Permission.SCHEDULER_EXECUTE |
| SchedulerModule | POST | /scheduler/jobs/:id/recover | Permission.SCHEDULER_EXECUTE |
| SchedulerModule | GET | /scheduler/recoveries | Permission.SCHEDULER_EXECUTE |
| SchedulerModule | GET | /scheduler/monitoring/dashboard | Permission.SCHEDULER_MONITOR |
| SchedulerModule | GET | /scheduler/monitoring/queues | Permission.SCHEDULER_MONITOR |
| SchedulerModule | GET | /scheduler/monitoring/failures | Permission.SCHEDULER_MONITOR |
| SchedulerModule | GET | /scheduler/monitoring/system-status | Permission.SCHEDULER_MONITOR |
| SearchModule | GET | /search/global |  |
| SearchModule | GET | /search/employees | Permission.SEARCH_GLOBAL |
| SearchModule | GET | /search/payroll | Permission.SEARCH_EMPLOYEES |
| SearchModule | GET | /search/documents | Permission.SEARCH_PAYROLL |
| SearchModule | GET | /search/workflows | Permission.SEARCH_DOCUMENTS |
| SearchModule | GET | /search/index | Permission.SEARCH_WORKFLOWS |
| SearchModule | POST | /search/index | Permission.SEARCH_ADMIN |
| SearchModule | POST | /search/index/rebuild | Permission.SEARCH_ADMIN |
| SearchModule | GET | /search/audit | Permission.SEARCH_ADMIN |
| TenantsModule | GET | /tenants |  |
| TenantsModule | POST | /tenants | Permission.TENANTS_READ |
| TenantsModule | PATCH | /tenants/:id | Permission.TENANTS_CREATE |
| TenantsModule | DELETE | /tenants/:id | Permission.TENANTS_UPDATE |
| TenantsModule | POST | /tenants/:id/restore | Permission.TENANTS_DELETE |
| TenantsModule | GET | /tenants/domains | Permission.TENANTS_UPDATE |
| TenantsModule | POST | /tenants/domains | Permission.TENANTS_READ |
| TenantsModule | POST | /tenants/resolve | Permission.TENANTS_UPDATE |
| TenantsModule | GET | /tenants/isolation/companies | Permission.TENANTS_READ |
| TenantsModule | POST | /tenants/isolation/companies/:companyId/assign | Permission.TENANTS_READ |
| TenantsModule | GET | /tenants/isolation/branches | Permission.TENANTS_UPDATE |
| TenantsModule | POST | /tenants/isolation/branches/:branchId/assign | Permission.TENANTS_READ |
| TenantsModule | POST | /tenants/isolation/validate | Permission.TENANTS_UPDATE |
| TenantsModule | GET | /tenants/configuration/settings | Permission.TENANTS_SECURITY |
| TenantsModule | POST | /tenants/configuration/settings | Permission.TENANTS_READ |
| TenantsModule | PATCH | /tenants/configuration/settings/:id | Permission.TENANTS_UPDATE |
| TenantsModule | DELETE | /tenants/configuration/settings/:id | Permission.TENANTS_UPDATE |
| TenantsModule | GET | /tenants/configuration/feature-flags | Permission.TENANTS_DELETE |
| TenantsModule | POST | /tenants/configuration/feature-flags | Permission.TENANTS_READ |
| TenantsModule | PATCH | /tenants/configuration/feature-flags/:id | Permission.TENANTS_UPDATE |
| TenantsModule | DELETE | /tenants/configuration/feature-flags/:id | Permission.TENANTS_UPDATE |
| TenantsModule | GET | /tenants/configuration/localizations | Permission.TENANTS_DELETE |
| TenantsModule | POST | /tenants/configuration/localizations | Permission.TENANTS_READ |
| TenantsModule | PATCH | /tenants/configuration/localizations/:id | Permission.TENANTS_UPDATE |
| TenantsModule | POST | /tenants/configuration/branding | Permission.TENANTS_UPDATE |
| TenantsModule | POST | /tenants/administration/provision | Permission.TENANTS_UPDATE |
| TenantsModule | POST | /tenants/administration/:id/activate | Permission.TENANTS_PROVISION |
| TenantsModule | POST | /tenants/administration/:id/suspend | Permission.TENANTS_PROVISION |
| TenantsModule | POST | /tenants/administration/:id/resume | Permission.TENANTS_PROVISION |
| TenantsModule | POST | /tenants/administration/:id/archive | Permission.TENANTS_PROVISION |
| TenantsModule | GET | /tenants/administration/usage-limits | Permission.TENANTS_PROVISION |
| TenantsModule | POST | /tenants/administration/usage-limits | Permission.TENANTS_READ |
| TenantsModule | PATCH | /tenants/administration/usage-limits/:id | Permission.TENANTS_UPDATE |
| TenantsModule | DELETE | /tenants/administration/usage-limits/:id | Permission.TENANTS_UPDATE |
| TenantsModule | GET | /tenants/administration/events | Permission.TENANTS_DELETE |
| TenantsModule | POST | /tenants/administration/events | Permission.TENANTS_READ |
| TenantsModule | GET | /tenants/security/permission-policies | Permission.TENANTS_PROVISION |
| TenantsModule | POST | /tenants/security/permission-policies | Permission.TENANTS_SECURITY |
| TenantsModule | PATCH | /tenants/security/permission-policies/:id | Permission.TENANTS_SECURITY |
| TenantsModule | DELETE | /tenants/security/permission-policies/:id | Permission.TENANTS_SECURITY |
| TenantsModule | POST | /tenants/security/validate | Permission.TENANTS_SECURITY |
| TenantsModule | GET | /tenants/security/audit-events | Permission.TENANTS_SECURITY |
| TenantsModule | POST | /tenants/security/audit-events | Permission.TENANTS_SECURITY |
| UsersModule | GET | /users |  |
| UsersModule | GET | /users/:id | Permission.USERS_READ |
| UsersModule | POST | /users | Permission.USERS_READ |
| UsersModule | PATCH | /users/:id | Permission.USERS_CREATE |
| UsersModule | DELETE | /users/:id | Permission.USERS_UPDATE |
| WorkflowDashboardModule | GET | /workflows/dashboard |  |
| WorkflowDefinitionsModule | GET | /workflows/definitions |  |
| WorkflowDefinitionsModule | GET | /workflows/definitions/:id | Permission.WORKFLOWS_READ |
| WorkflowDefinitionsModule | POST | /workflows/definitions | Permission.WORKFLOWS_READ |
| WorkflowDefinitionsModule | PATCH | /workflows/definitions/:id | Permission.WORKFLOWS_CREATE |
| WorkflowDefinitionsModule | POST | /workflows/definitions/:id/activate | Permission.WORKFLOWS_UPDATE |
| WorkflowDefinitionsModule | POST | /workflows/definitions/:id/archive | Permission.WORKFLOWS_UPDATE |
| WorkflowDefinitionsModule | POST | /workflows/definitions/:id/steps | Permission.WORKFLOWS_UPDATE |
| WorkflowDefinitionsModule | PATCH | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE |
| WorkflowDefinitionsModule | DELETE | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE |
| WorkflowRuntimeModule | GET | /workflows/requests |  |
| WorkflowRuntimeModule | GET | /workflows/requests/:id | Permission.WORKFLOWS_READ |
| WorkflowRuntimeModule | GET | /workflows/requests/:id/history | Permission.WORKFLOWS_READ |
| WorkflowRuntimeModule | POST | /workflows/requests | Permission.WORKFLOWS_READ |
| WorkflowRuntimeModule | POST | /workflows/requests/:id/steps/:stepId/approve | Permission.WORKFLOWS_CREATE |
| WorkflowRuntimeModule | POST | /workflows/requests/:id/steps/:stepId/reject | Permission.WORKFLOWS_UPDATE |
| WorkflowRuntimeModule | POST | /workflows/requests/:id/cancel | Permission.WORKFLOWS_UPDATE |
| WorkflowsModule | GET | /workflows/dashboard |  |
| WorkflowsModule | GET | /workflows/definitions |  |
| WorkflowsModule | GET | /workflows/definitions/:id | Permission.WORKFLOWS_READ |
| WorkflowsModule | POST | /workflows/definitions | Permission.WORKFLOWS_READ |
| WorkflowsModule | PATCH | /workflows/definitions/:id | Permission.WORKFLOWS_CREATE |
| WorkflowsModule | POST | /workflows/definitions/:id/activate | Permission.WORKFLOWS_UPDATE |
| WorkflowsModule | POST | /workflows/definitions/:id/archive | Permission.WORKFLOWS_UPDATE |
| WorkflowsModule | POST | /workflows/definitions/:id/steps | Permission.WORKFLOWS_UPDATE |
| WorkflowsModule | PATCH | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE |
| WorkflowsModule | DELETE | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE |
| WorkflowsModule | GET | /workflows/requests |  |
| WorkflowsModule | GET | /workflows/requests/:id | Permission.WORKFLOWS_READ |
| WorkflowsModule | GET | /workflows/requests/:id/history | Permission.WORKFLOWS_READ |
| WorkflowsModule | POST | /workflows/requests | Permission.WORKFLOWS_READ |
| WorkflowsModule | POST | /workflows/requests/:id/steps/:stepId/approve | Permission.WORKFLOWS_CREATE |
| WorkflowsModule | POST | /workflows/requests/:id/steps/:stepId/reject | Permission.WORKFLOWS_UPDATE |
| WorkflowsModule | POST | /workflows/requests/:id/cancel | Permission.WORKFLOWS_UPDATE |
