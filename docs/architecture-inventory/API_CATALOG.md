# API Catalog

Date: 2026-07-02

| Module | Method | Path | Permission | Controller | Summary |
| --- | --- | --- | --- | --- | --- |
| AccountingModule | GET | /accounting/accounts |  | AccountsController |  |
| AccountingModule | GET | /accounting/accounts/:id | Permission.ACCOUNTING_READ | AccountsController | Get chart of accounts |
| AccountingModule | POST | /accounting/accounts | Permission.ACCOUNTING_READ | AccountsController | Get account by id |
| AccountingModule | PATCH | /accounting/accounts/:id | Permission.ACCOUNTING_CREATE | AccountsController | Create account |
| AccountingModule | DELETE | /accounting/accounts/:id | Permission.ACCOUNTING_UPDATE | AccountsController | Update account |
| AccountingModule | GET | /accounting/dimensions/cost-centers |  | AccountingCostCenterReportsController |  |
| AccountingModule | GET | /accounting/dimensions/departments | Permission.ACCOUNTING_READ | AccountingCostCenterReportsController | Get accounting balances by cost center |
| AccountingModule | GET | /accounting/dimensions/branches | Permission.ACCOUNTING_READ | AccountingCostCenterReportsController | Get accounting balances by department |
| AccountingModule | GET | /accounting/journal-entries |  | JournalEntriesController |  |
| AccountingModule | GET | /accounting/journal-entries/:id | Permission.ACCOUNTING_READ | JournalEntriesController | Get journal entries |
| AccountingModule | POST | /accounting/journal-entries | Permission.ACCOUNTING_READ | JournalEntriesController | Get journal entry by id |
| AccountingModule | PATCH | /accounting/journal-entries/:id | Permission.ACCOUNTING_CREATE | JournalEntriesController | Create balanced journal entry |
| AccountingModule | POST | /accounting/journal-entries/:id/post | Permission.ACCOUNTING_UPDATE | JournalEntriesController | Update draft journal entry |
| AccountingModule | POST | /accounting/journal-entries/:id/void | Permission.ACCOUNTING_UPDATE | JournalEntriesController | Post journal entry |
| AccountingModule | POST | /accounting/payroll/generate-journal |  | PayrollAccountingController |  |
| AccountingModule | GET | /accounting/reports/trial-balance |  | AccountingReportsController |  |
| AccountingModule | GET | /accounting/reports/general-ledger | Permission.ACCOUNTING_READ | AccountingReportsController | Get trial balance |
| AccountingModule | GET | /accounting/reports/payroll | Permission.ACCOUNTING_READ | AccountingReportsController | Get general ledger |
| AccountingModule | GET | /accounting/reports/cost-centers | Permission.ACCOUNTING_READ | AccountingReportsController | Get payroll accounting report |
| AccountsModule | GET | /accounting/accounts |  | AccountsController |  |
| AccountsModule | GET | /accounting/accounts/:id | Permission.ACCOUNTING_READ | AccountsController | Get chart of accounts |
| AccountsModule | POST | /accounting/accounts | Permission.ACCOUNTING_READ | AccountsController | Get account by id |
| AccountsModule | PATCH | /accounting/accounts/:id | Permission.ACCOUNTING_CREATE | AccountsController | Create account |
| AccountsModule | DELETE | /accounting/accounts/:id | Permission.ACCOUNTING_UPDATE | AccountsController | Update account |
| AccountingCostCenterReportsModule | GET | /accounting/dimensions/cost-centers |  | AccountingCostCenterReportsController |  |
| AccountingCostCenterReportsModule | GET | /accounting/dimensions/departments | Permission.ACCOUNTING_READ | AccountingCostCenterReportsController | Get accounting balances by cost center |
| AccountingCostCenterReportsModule | GET | /accounting/dimensions/branches | Permission.ACCOUNTING_READ | AccountingCostCenterReportsController | Get accounting balances by department |
| JournalEntriesModule | GET | /accounting/journal-entries |  | JournalEntriesController |  |
| JournalEntriesModule | GET | /accounting/journal-entries/:id | Permission.ACCOUNTING_READ | JournalEntriesController | Get journal entries |
| JournalEntriesModule | POST | /accounting/journal-entries | Permission.ACCOUNTING_READ | JournalEntriesController | Get journal entry by id |
| JournalEntriesModule | PATCH | /accounting/journal-entries/:id | Permission.ACCOUNTING_CREATE | JournalEntriesController | Create balanced journal entry |
| JournalEntriesModule | POST | /accounting/journal-entries/:id/post | Permission.ACCOUNTING_UPDATE | JournalEntriesController | Update draft journal entry |
| JournalEntriesModule | POST | /accounting/journal-entries/:id/void | Permission.ACCOUNTING_UPDATE | JournalEntriesController | Post journal entry |
| PayrollAccountingModule | POST | /accounting/payroll/generate-journal |  | PayrollAccountingController |  |
| AccountingReportsModule | GET | /accounting/reports/trial-balance |  | AccountingReportsController |  |
| AccountingReportsModule | GET | /accounting/reports/general-ledger | Permission.ACCOUNTING_READ | AccountingReportsController | Get trial balance |
| AccountingReportsModule | GET | /accounting/reports/payroll | Permission.ACCOUNTING_READ | AccountingReportsController | Get general ledger |
| AccountingReportsModule | GET | /accounting/reports/cost-centers | Permission.ACCOUNTING_READ | AccountingReportsController | Get payroll accounting report |
| AiModule | GET | /ai/providers |  | AiCoreController |  |
| AiModule | POST | /ai/providers | Permission.AI_READ | AiCoreController | Get AI provider configurations |
| AiModule | PATCH | /ai/providers/:id | Permission.AI_CREATE | AiCoreController | Create AI provider configuration |
| AiModule | DELETE | /ai/providers/:id | Permission.AI_UPDATE | AiCoreController | Update AI provider configuration |
| AiModule | POST | /ai/complete | Permission.AI_DELETE | AiCoreController | Soft delete AI provider configuration |
| AiModule | GET | /ai/requests | Permission.AI_EXECUTE | AiCoreController | Run an AI completion request |
| AiModule | GET | /ai/usage | Permission.AI_READ | AiCoreController | Get AI request logs |
| AiModule | GET | /ai/governance/limits |  | AiGovernanceController |  |
| AiModule | POST | /ai/governance/limits | Permission.AI_GOVERN | AiGovernanceController | Get AI usage limits |
| AiModule | PATCH | /ai/governance/limits/:id | Permission.AI_GOVERN | AiGovernanceController | Create AI usage limit |
| AiModule | DELETE | /ai/governance/limits/:id | Permission.AI_GOVERN | AiGovernanceController | Update AI usage limit |
| AiModule | GET | /ai/governance/policies | Permission.AI_GOVERN | AiGovernanceController | Soft delete AI usage limit |
| AiModule | POST | /ai/governance/policies | Permission.AI_GOVERN | AiGovernanceController | Get AI safety policies |
| AiModule | PATCH | /ai/governance/policies/:id | Permission.AI_GOVERN | AiGovernanceController | Create AI safety policy |
| AiModule | DELETE | /ai/governance/policies/:id | Permission.AI_GOVERN | AiGovernanceController | Update AI safety policy |
| AiModule | GET | /ai/hr/employee-insights |  | HrAssistantController |  |
| AiModule | GET | /ai/hr/leave-analysis | Permission.AI_EXECUTE | HrAssistantController | Generate employee insights |
| AiModule | GET | /ai/hr/payroll-explanation | Permission.AI_EXECUTE | HrAssistantController | Analyze leave trends |
| AiModule | GET | /ai/hr/document-alerts | Permission.AI_EXECUTE | HrAssistantController | Explain a payroll run |
| AiModule | POST | /ai/reporting/natural-language |  | ReportingAiController |  |
| AiModule | GET | /ai/reporting/dashboard-insights | Permission.AI_EXECUTE | ReportingAiController | Interpret a natural language report request |
| AiModule | GET | /ai/reporting/anomalies | Permission.AI_EXECUTE | ReportingAiController | Generate dashboard insights |
| AiModule | POST | /ai/workflow/approval-recommendation |  | WorkflowAiController |  |
| AiModule | POST | /ai/workflow/risk-score | Permission.AI_EXECUTE | WorkflowAiController | Generate workflow approval recommendation |
| AiModule | POST | /ai/workflow/rule-suggestions | Permission.AI_EXECUTE | WorkflowAiController | Score workflow approval risk |
| AppModule | GET | /accounting/accounts |  | AccountsController |  |
| AppModule | GET | /accounting/accounts/:id | Permission.ACCOUNTING_READ | AccountsController | Get chart of accounts |
| AppModule | POST | /accounting/accounts | Permission.ACCOUNTING_READ | AccountsController | Get account by id |
| AppModule | PATCH | /accounting/accounts/:id | Permission.ACCOUNTING_CREATE | AccountsController | Create account |
| AppModule | DELETE | /accounting/accounts/:id | Permission.ACCOUNTING_UPDATE | AccountsController | Update account |
| AppModule | GET | /accounting/dimensions/cost-centers |  | AccountingCostCenterReportsController |  |
| AppModule | GET | /accounting/dimensions/departments | Permission.ACCOUNTING_READ | AccountingCostCenterReportsController | Get accounting balances by cost center |
| AppModule | GET | /accounting/dimensions/branches | Permission.ACCOUNTING_READ | AccountingCostCenterReportsController | Get accounting balances by department |
| AppModule | GET | /accounting/journal-entries |  | JournalEntriesController |  |
| AppModule | GET | /accounting/journal-entries/:id | Permission.ACCOUNTING_READ | JournalEntriesController | Get journal entries |
| AppModule | POST | /accounting/journal-entries | Permission.ACCOUNTING_READ | JournalEntriesController | Get journal entry by id |
| AppModule | PATCH | /accounting/journal-entries/:id | Permission.ACCOUNTING_CREATE | JournalEntriesController | Create balanced journal entry |
| AppModule | POST | /accounting/journal-entries/:id/post | Permission.ACCOUNTING_UPDATE | JournalEntriesController | Update draft journal entry |
| AppModule | POST | /accounting/journal-entries/:id/void | Permission.ACCOUNTING_UPDATE | JournalEntriesController | Post journal entry |
| AppModule | POST | /accounting/payroll/generate-journal |  | PayrollAccountingController |  |
| AppModule | GET | /accounting/reports/trial-balance |  | AccountingReportsController |  |
| AppModule | GET | /accounting/reports/general-ledger | Permission.ACCOUNTING_READ | AccountingReportsController | Get trial balance |
| AppModule | GET | /accounting/reports/payroll | Permission.ACCOUNTING_READ | AccountingReportsController | Get general ledger |
| AppModule | GET | /accounting/reports/cost-centers | Permission.ACCOUNTING_READ | AccountingReportsController | Get payroll accounting report |
| AppModule | GET | /ai/providers |  | AiCoreController |  |
| AppModule | POST | /ai/providers | Permission.AI_READ | AiCoreController | Get AI provider configurations |
| AppModule | PATCH | /ai/providers/:id | Permission.AI_CREATE | AiCoreController | Create AI provider configuration |
| AppModule | DELETE | /ai/providers/:id | Permission.AI_UPDATE | AiCoreController | Update AI provider configuration |
| AppModule | POST | /ai/complete | Permission.AI_DELETE | AiCoreController | Soft delete AI provider configuration |
| AppModule | GET | /ai/requests | Permission.AI_EXECUTE | AiCoreController | Run an AI completion request |
| AppModule | GET | /ai/usage | Permission.AI_READ | AiCoreController | Get AI request logs |
| AppModule | GET | /ai/governance/limits |  | AiGovernanceController |  |
| AppModule | POST | /ai/governance/limits | Permission.AI_GOVERN | AiGovernanceController | Get AI usage limits |
| AppModule | PATCH | /ai/governance/limits/:id | Permission.AI_GOVERN | AiGovernanceController | Create AI usage limit |
| AppModule | DELETE | /ai/governance/limits/:id | Permission.AI_GOVERN | AiGovernanceController | Update AI usage limit |
| AppModule | GET | /ai/governance/policies | Permission.AI_GOVERN | AiGovernanceController | Soft delete AI usage limit |
| AppModule | POST | /ai/governance/policies | Permission.AI_GOVERN | AiGovernanceController | Get AI safety policies |
| AppModule | PATCH | /ai/governance/policies/:id | Permission.AI_GOVERN | AiGovernanceController | Create AI safety policy |
| AppModule | DELETE | /ai/governance/policies/:id | Permission.AI_GOVERN | AiGovernanceController | Update AI safety policy |
| AppModule | GET | /ai/hr/employee-insights |  | HrAssistantController |  |
| AppModule | GET | /ai/hr/leave-analysis | Permission.AI_EXECUTE | HrAssistantController | Generate employee insights |
| AppModule | GET | /ai/hr/payroll-explanation | Permission.AI_EXECUTE | HrAssistantController | Analyze leave trends |
| AppModule | GET | /ai/hr/document-alerts | Permission.AI_EXECUTE | HrAssistantController | Explain a payroll run |
| AppModule | POST | /ai/reporting/natural-language |  | ReportingAiController |  |
| AppModule | GET | /ai/reporting/dashboard-insights | Permission.AI_EXECUTE | ReportingAiController | Interpret a natural language report request |
| AppModule | GET | /ai/reporting/anomalies | Permission.AI_EXECUTE | ReportingAiController | Generate dashboard insights |
| AppModule | POST | /ai/workflow/approval-recommendation |  | WorkflowAiController |  |
| AppModule | POST | /ai/workflow/risk-score | Permission.AI_EXECUTE | WorkflowAiController | Generate workflow approval recommendation |
| AppModule | POST | /ai/workflow/rule-suggestions | Permission.AI_EXECUTE | WorkflowAiController | Score workflow approval risk |
| AppModule | GET | / |  | AppController |  |
| AppModule | GET | /assets |  | AssetsController |  |
| AppModule | GET | /assets/:id | Permission.ASSETS_READ | AssetsController | Get all assets |
| AppModule | POST | /assets | Permission.ASSETS_READ | AssetsController | Get asset by id |
| AppModule | PATCH | /assets/:id | Permission.ASSETS_CREATE | AssetsController | Create asset |
| AppModule | DELETE | /assets/:id | Permission.ASSETS_UPDATE | AssetsController | Update asset |
| AppModule | GET | /assets/assignments |  | AssetAssignmentsController |  |
| AppModule | GET | /assets/assignments/:id | Permission.ASSETS_READ | AssetAssignmentsController | Get all asset assignments |
| AppModule | POST | /assets/assignments | Permission.ASSETS_READ | AssetAssignmentsController | Get asset assignment by id |
| AppModule | POST | /assets/assignments/:id/return | Permission.ASSETS_CREATE | AssetAssignmentsController | Assign asset to employee |
| AppModule | POST | /assets/assignments/:id/lost | Permission.ASSETS_UPDATE | AssetAssignmentsController | Return assigned asset |
| AppModule | DELETE | /assets/assignments/:id | Permission.ASSETS_UPDATE | AssetAssignmentsController | Mark assigned asset as lost |
| AppModule | GET | /assets/categories |  | AssetCategoriesController |  |
| AppModule | GET | /assets/categories/:id | Permission.ASSETS_READ | AssetCategoriesController | Get all asset categories |
| AppModule | POST | /assets/categories | Permission.ASSETS_READ | AssetCategoriesController | Get asset category by id |
| AppModule | PATCH | /assets/categories/:id | Permission.ASSETS_CREATE | AssetCategoriesController | Create asset category |
| AppModule | DELETE | /assets/categories/:id | Permission.ASSETS_UPDATE | AssetCategoriesController | Update asset category |
| AppModule | GET | /assets/dashboard/summary |  | AssetsDashboardController |  |
| AppModule | GET | /assets/maintenance |  | AssetMaintenanceController |  |
| AppModule | GET | /assets/maintenance/:id | Permission.ASSETS_READ | AssetMaintenanceController | Get all asset maintenance records |
| AppModule | POST | /assets/maintenance | Permission.ASSETS_READ | AssetMaintenanceController | Get asset maintenance by id |
| AppModule | PATCH | /assets/maintenance/:id | Permission.ASSETS_CREATE | AssetMaintenanceController | Create asset maintenance record |
| AppModule | DELETE | /assets/maintenance/:id | Permission.ASSETS_UPDATE | AssetMaintenanceController | Update asset maintenance record |
| AppModule | GET | /attendance/holidays |  | HolidaysController |  |
| AppModule | GET | /attendance/holidays/:id | Permission.ATTENDANCE_READ | HolidaysController | Get all holidays |
| AppModule | POST | /attendance/holidays | Permission.ATTENDANCE_READ | HolidaysController | Get holiday by id |
| AppModule | PATCH | /attendance/holidays/:id | Permission.ATTENDANCE_CREATE | HolidaysController | Create holiday |
| AppModule | DELETE | /attendance/holidays/:id | Permission.ATTENDANCE_UPDATE | HolidaysController | Update holiday |
| AppModule | GET | /attendance/records |  | AttendanceRecordsController |  |
| AppModule | GET | /attendance/records/:id | Permission.ATTENDANCE_READ | AttendanceRecordsController | Get all attendance records |
| AppModule | POST | /attendance/records | Permission.ATTENDANCE_READ | AttendanceRecordsController | Get attendance record by id |
| AppModule | PATCH | /attendance/records/:id | Permission.ATTENDANCE_CREATE | AttendanceRecordsController | Create attendance record |
| AppModule | DELETE | /attendance/records/:id | Permission.ATTENDANCE_UPDATE | AttendanceRecordsController | Update attendance record |
| AppModule | GET | /attendance/shifts |  | ShiftsController |  |
| AppModule | GET | /attendance/shifts/:id | Permission.ATTENDANCE_READ | ShiftsController | Get all shifts |
| AppModule | POST | /attendance/shifts | Permission.ATTENDANCE_READ | ShiftsController | Get shift by id |
| AppModule | PATCH | /attendance/shifts/:id | Permission.ATTENDANCE_CREATE | ShiftsController | Create shift |
| AppModule | DELETE | /attendance/shifts/:id | Permission.ATTENDANCE_UPDATE | ShiftsController | Update shift |
| AppModule | POST | /auth/login |  | AuthController |  |
| AppModule | GET | /bi/kpis |  | BiController |  |
| AppModule | POST | /bi/kpis | Permission.BI_READ | BiController | List KPI definitions |
| AppModule | PATCH | /bi/kpis/:id | Permission.BI_MANAGE | BiController | Create KPI definition |
| AppModule | POST | /bi/kpis/:id/archive | Permission.BI_MANAGE | BiController | Update KPI definition |
| AppModule | POST | /bi/kpis/:id/snapshots | Permission.BI_MANAGE | BiController | Archive KPI definition |
| AppModule | GET | /bi/kpis/:id/snapshots | Permission.BI_EXECUTE | BiController | Record KPI snapshot |
| AppModule | GET | /bi/datasets | Permission.BI_READ | BiController | List KPI snapshots |
| AppModule | POST | /bi/datasets | Permission.BI_READ | BiController | List analytics datasets |
| AppModule | PATCH | /bi/datasets/:id | Permission.BI_MANAGE | BiController | Create analytics dataset |
| AppModule | POST | /bi/datasets/:id/run | Permission.BI_MANAGE | BiController | Update analytics dataset |
| AppModule | GET | /bi/metrics | Permission.BI_EXECUTE | BiController | Run analytics dataset execution |
| AppModule | POST | /bi/metrics | Permission.BI_READ | BiController | List analytics metrics |
| AppModule | PATCH | /bi/metrics/:id | Permission.BI_MANAGE | BiController | Create analytics metric |
| AppModule | POST | /bi/metrics/:id/observations | Permission.BI_MANAGE | BiController | Update analytics metric |
| AppModule | GET | /bi/dashboards | Permission.BI_EXECUTE | BiController | Record analytics metric observation |
| AppModule | POST | /bi/dashboards | Permission.BI_DASHBOARD | BiController | List BI dashboards |
| AppModule | POST | /bi/dashboards/:id/widgets | Permission.BI_MANAGE | BiController | Create BI dashboard |
| AppModule | GET | /bi/dashboards/executive/summary | Permission.BI_MANAGE | BiController | Add BI dashboard widget |
| AppModule | GET | /bi/kpis/:id/trend | Permission.BI_DASHBOARD | BiController | Get executive dashboard summary |
| AppModule | GET | /bi/metrics/:id/trend | Permission.BI_READ | BiController | Get KPI trend analysis |
| AppModule | GET | /bi/predictions/models | Permission.BI_READ | BiController | Get metric trend analysis |
| AppModule | POST | /bi/predictions/models | Permission.BI_PREDICT | BiController | List BI prediction models |
| AppModule | POST | /bi/predictions/models/:id/run | Permission.BI_PREDICT | BiController | Create BI prediction model |
| AppModule | GET | /business-rules/categories |  | BusinessRulesController |  |
| AppModule | POST | /business-rules/categories | Permission.BUSINESS_RULES_READ | BusinessRulesController | Get business rule categories |
| AppModule | PATCH | /business-rules/categories/:id | Permission.BUSINESS_RULES_CREATE | BusinessRulesController | Create business rule category |
| AppModule | DELETE | /business-rules/categories/:id | Permission.BUSINESS_RULES_UPDATE | BusinessRulesController | Update business rule category |
| AppModule | POST | /business-rules/categories/:id/restore | Permission.BUSINESS_RULES_DELETE | BusinessRulesController | Soft delete business rule category |
| AppModule | GET | /business-rules/executions | Permission.BUSINESS_RULES_UPDATE | BusinessRulesController | Restore business rule category |
| AppModule | GET | /business-rules/dashboard | Permission.BUSINESS_RULES_READ | BusinessRulesController | Get business rule execution history |
| AppModule | GET | /business-rules | Permission.BUSINESS_RULES_READ | BusinessRulesController | Get business rules dashboard |
| AppModule | POST | /business-rules/evaluate | Permission.BUSINESS_RULES_READ | BusinessRulesController | Get business rules |
| AppModule | GET | /business-rules/:id/conditions | Permission.BUSINESS_RULES_EXECUTE | BusinessRulesController | Evaluate active business rules |
| AppModule | POST | /business-rules/:id/conditions | Permission.BUSINESS_RULES_READ | BusinessRulesController | Get business rule conditions |
| AppModule | PATCH | /business-rules/:id/conditions/:conditionId | Permission.BUSINESS_RULES_UPDATE | BusinessRulesController | Create business rule condition |
| AppModule | DELETE | /business-rules/:id/conditions/:conditionId | Permission.BUSINESS_RULES_UPDATE | BusinessRulesController | Update business rule condition |
| AppModule | GET | /business-rules/:id/actions | Permission.BUSINESS_RULES_DELETE | BusinessRulesController | Soft delete business rule condition |
| AppModule | POST | /business-rules/:id/actions | Permission.BUSINESS_RULES_READ | BusinessRulesController | Get business rule actions |
| AppModule | PATCH | /business-rules/:id/actions/:actionId | Permission.BUSINESS_RULES_UPDATE | BusinessRulesController | Create business rule action |
| AppModule | DELETE | /business-rules/:id/actions/:actionId | Permission.BUSINESS_RULES_UPDATE | BusinessRulesController | Update business rule action |
| AppModule | GET | /business-rules/:id | Permission.BUSINESS_RULES_DELETE | BusinessRulesController | Soft delete business rule action |
| AppModule | POST | /business-rules | Permission.BUSINESS_RULES_READ | BusinessRulesController | Get business rule by id |
| AppModule | PATCH | /business-rules/:id | Permission.BUSINESS_RULES_CREATE | BusinessRulesController | Create business rule |
| AppModule | DELETE | /business-rules/:id | Permission.BUSINESS_RULES_UPDATE | BusinessRulesController | Update business rule |
| AppModule | POST | /business-rules/:id/restore | Permission.BUSINESS_RULES_DELETE | BusinessRulesController | Soft delete business rule |
| AppModule | GET | /documents/categories |  | DocumentCategoriesController |  |
| AppModule | GET | /documents/categories/:id | Permission.DOCUMENTS_READ | DocumentCategoriesController | Get all document categories |
| AppModule | POST | /documents/categories | Permission.DOCUMENTS_READ | DocumentCategoriesController | Get document category by id |
| AppModule | PATCH | /documents/categories/:id | Permission.DOCUMENTS_CREATE | DocumentCategoriesController | Create document category |
| AppModule | DELETE | /documents/categories/:id | Permission.DOCUMENTS_UPDATE | DocumentCategoriesController | Update document category |
| AppModule | GET | /documents/dashboard/summary |  | DocumentsDashboardController |  |
| AppModule | GET | /documents |  | DocumentsController |  |
| AppModule | GET | /documents/:id | Permission.DOCUMENTS_READ | DocumentsController | Get all documents |
| AppModule | POST | /documents | Permission.DOCUMENTS_READ | DocumentsController | Get document by id |
| AppModule | PATCH | /documents/:id | Permission.DOCUMENTS_CREATE | DocumentsController | Create document |
| AppModule | POST | /documents/:id/archive | Permission.DOCUMENTS_UPDATE | DocumentsController | Update document |
| AppModule | DELETE | /documents/:id | Permission.DOCUMENTS_UPDATE | DocumentsController | Archive document |
| AppModule | POST | /documents/expiration/mark-expired |  | DocumentExpirationController |  |
| AppModule | GET | /documents/expiration/expired | Permission.DOCUMENTS_UPDATE | DocumentExpirationController | Mark expired documents |
| AppModule | GET | /documents/expiration/soon/:days | Permission.DOCUMENTS_READ | DocumentExpirationController | Get expired documents |
| AppModule | GET | /documents/versions |  | DocumentVersionsController |  |
| AppModule | GET | /documents/versions/document/:documentId | Permission.DOCUMENTS_READ | DocumentVersionsController | Get all document versions |
| AppModule | GET | /documents/versions/:id | Permission.DOCUMENTS_READ | DocumentVersionsController | Get versions by document |
| AppModule | POST | /documents/versions | Permission.DOCUMENTS_READ | DocumentVersionsController | Get document version by id |
| AppModule | DELETE | /documents/versions/:id | Permission.DOCUMENTS_CREATE | DocumentVersionsController | Create document version |
| AppModule | GET | /employees |  | EmployeesController |  |
| AppModule | GET | /employees/:id | Permission.EMPLOYEES_READ | EmployeesController | Get all employees |
| AppModule | POST | /employees | Permission.EMPLOYEES_READ | EmployeesController | Get employee by id |
| AppModule | PATCH | /employees/:id | Permission.EMPLOYEES_CREATE | EmployeesController | Create employee |
| AppModule | DELETE | /employees/:id | Permission.EMPLOYEES_UPDATE | EmployeesController | Update employee |
| AppModule | GET | /ess/requests |  | SelfServiceRequestsController |  |
| AppModule | GET | /ess/requests/employee/:employeeId | Permission.ESS_READ | SelfServiceRequestsController | Get all self-service requests |
| AppModule | GET | /ess/requests/:id | Permission.ESS_READ | SelfServiceRequestsController | Get requests by employee |
| AppModule | POST | /ess/requests | Permission.ESS_READ | SelfServiceRequestsController | Get self-service request by id |
| AppModule | PATCH | /ess/requests/:id | Permission.ESS_CREATE | SelfServiceRequestsController | Create self-service request |
| AppModule | POST | /ess/requests/:id/submit | Permission.ESS_UPDATE | SelfServiceRequestsController | Update draft self-service request |
| AppModule | POST | /ess/requests/:id/review | Permission.ESS_UPDATE | SelfServiceRequestsController | Submit self-service request |
| AppModule | DELETE | /ess/requests/:id | Permission.ESS_UPDATE | SelfServiceRequestsController | Review self-service request |
| AppModule | GET | /integrations/providers |  | IntegrationsController |  |
| AppModule | POST | /integrations/providers | Permission.INTEGRATIONS_READ | IntegrationsController | Get integration providers |
| AppModule | PATCH | /integrations/providers/:id | Permission.INTEGRATIONS_CREATE | IntegrationsController | Create integration provider |
| AppModule | DELETE | /integrations/providers/:id | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Update integration provider |
| AppModule | POST | /integrations/providers/:id/restore | Permission.INTEGRATIONS_DELETE | IntegrationsController | Soft delete integration provider |
| AppModule | POST | /integrations/providers/:id/enable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Restore integration provider |
| AppModule | POST | /integrations/providers/:id/disable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Enable integration provider |
| AppModule | GET | /integrations/credentials | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Disable integration provider |
| AppModule | POST | /integrations/credentials | Permission.INTEGRATIONS_READ | IntegrationsController | Get integration credentials |
| AppModule | PATCH | /integrations/credentials/:id | Permission.INTEGRATIONS_CREATE | IntegrationsController | Create integration credential |
| AppModule | DELETE | /integrations/credentials/:id | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Update integration credential |
| AppModule | POST | /integrations/credentials/:id/restore | Permission.INTEGRATIONS_DELETE | IntegrationsController | Soft delete integration credential |
| AppModule | POST | /integrations/credentials/:id/enable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Restore integration credential |
| AppModule | POST | /integrations/credentials/:id/disable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Enable integration credential |
| AppModule | GET | /integrations/connections | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Disable integration credential |
| AppModule | POST | /integrations/connections | Permission.INTEGRATIONS_READ | IntegrationsController | Get integration connections |
| AppModule | PATCH | /integrations/connections/:id | Permission.INTEGRATIONS_CREATE | IntegrationsController | Create integration connection |
| AppModule | DELETE | /integrations/connections/:id | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Update integration connection |
| AppModule | POST | /integrations/connections/:id/restore | Permission.INTEGRATIONS_DELETE | IntegrationsController | Soft delete integration connection |
| AppModule | POST | /integrations/connections/:id/test | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Restore integration connection |
| AppModule | POST | /integrations/connections/:id/connect | Permission.INTEGRATIONS_EXECUTE | IntegrationsController | Test integration connection |
| AppModule | POST | /integrations/connections/:id/disconnect | Permission.INTEGRATIONS_EXECUTE | IntegrationsController | Connect integration connection |
| AppModule | POST | /integrations/connections/:id/enable | Permission.INTEGRATIONS_EXECUTE | IntegrationsController | Disconnect integration connection |
| AppModule | POST | /integrations/connections/:id/disable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Enable integration connection |
| AppModule | GET | /integrations/retry-policies | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Disable integration connection |
| AppModule | POST | /integrations/retry-policies | Permission.INTEGRATIONS_READ | IntegrationsController | Get integration retry policies |
| AppModule | PATCH | /integrations/retry-policies/:id | Permission.INTEGRATIONS_CREATE | IntegrationsController | Create integration retry policy |
| AppModule | DELETE | /integrations/retry-policies/:id | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Update integration retry policy |
| AppModule | POST | /integrations/retry-policies/:id/restore | Permission.INTEGRATIONS_DELETE | IntegrationsController | Soft delete integration retry policy |
| AppModule | POST | /integrations/retry-policies/:id/enable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Restore integration retry policy |
| AppModule | POST | /integrations/retry-policies/:id/disable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Enable integration retry policy |
| AppModule | GET | /integrations/webhooks | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Disable integration retry policy |
| AppModule | POST | /integrations/webhooks | Permission.INTEGRATIONS_READ | IntegrationsController | Get outbound webhooks |
| AppModule | PATCH | /integrations/webhooks/:id | Permission.INTEGRATIONS_CREATE | IntegrationsController | Create outbound webhook |
| AppModule | DELETE | /integrations/webhooks/:id | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Update outbound webhook |
| AppModule | POST | /integrations/webhooks/:id/restore | Permission.INTEGRATIONS_DELETE | IntegrationsController | Soft delete outbound webhook |
| AppModule | POST | /integrations/webhooks/:id/enable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Restore outbound webhook |
| AppModule | POST | /integrations/webhooks/:id/disable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Enable outbound webhook |
| AppModule | GET | /integrations/rest-connectors | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Disable outbound webhook |
| AppModule | POST | /integrations/rest-connectors | Permission.INTEGRATIONS_READ | IntegrationsController | Get REST connectors |
| AppModule | PATCH | /integrations/rest-connectors/:id | Permission.INTEGRATIONS_CREATE | IntegrationsController | Create REST connector |
| AppModule | DELETE | /integrations/rest-connectors/:id | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Update REST connector |
| AppModule | POST | /integrations/rest-connectors/:id/restore | Permission.INTEGRATIONS_DELETE | IntegrationsController | Soft delete REST connector |
| AppModule | POST | /integrations/rest-connectors/:id/enable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Restore REST connector |
| AppModule | POST | /integrations/rest-connectors/:id/disable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Enable REST connector |
| AppModule | GET | /integrations/outbound-jobs | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Disable REST connector |
| AppModule | POST | /integrations/outbound-jobs | Permission.INTEGRATIONS_MONITOR | IntegrationsController | Get outbound integration jobs |
| AppModule | POST | /integrations/outbound-jobs/process-due | Permission.INTEGRATIONS_EXECUTE | IntegrationsController | Queue outbound integration job |
| AppModule | POST | /integrations/outbound-jobs/:id/execute | Permission.INTEGRATIONS_EXECUTE | IntegrationsController | Process due outbound integration jobs |
| AppModule | POST | /integrations/outbound-jobs/:id/retry | Permission.INTEGRATIONS_EXECUTE | IntegrationsController | Execute outbound integration job |
| AppModule | POST | /integrations/outbound-jobs/:id/cancel | Permission.INTEGRATIONS_EXECUTE | IntegrationsController | Retry failed outbound integration job |
| AppModule | POST | /integrations/inbound/:connectionId/webhook | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Cancel outbound integration job |
| AppModule | GET | /integrations/inbound-events | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Receive inbound integration webhook |
| AppModule | GET | /integrations/executions | Permission.INTEGRATIONS_MONITOR | IntegrationsController | Get inbound integration events |
| AppModule | GET | /integrations/dashboard | Permission.INTEGRATIONS_MONITOR | IntegrationsController | Get integration execution history |
| AppModule | GET | /integrations/retry-history | Permission.INTEGRATIONS_MONITOR | IntegrationsController | Get integration monitoring dashboard |
| AppModule | GET | /integrations/health | Permission.INTEGRATIONS_MONITOR | IntegrationsController | Get integration retry history |
| AppModule | POST | /integrations/connections/:id/health-check | Permission.INTEGRATIONS_MONITOR | IntegrationsController | Get integration health snapshots |
| AppModule | GET | /leave/balances |  | LeaveBalancesController |  |
| AppModule | GET | /leave/balances/:id | Permission.LEAVE_READ | LeaveBalancesController | Get all records |
| AppModule | POST | /leave/balances | Permission.LEAVE_READ | LeaveBalancesController | Get record by id |
| AppModule | PATCH | /leave/balances/:id | Permission.LEAVE_CREATE | LeaveBalancesController | Create record |
| AppModule | DELETE | /leave/balances/:id | Permission.LEAVE_UPDATE | LeaveBalancesController | Update record |
| AppModule | GET | /leave/requests |  | LeaveRequestsController |  |
| AppModule | GET | /leave/requests/:id | Permission.LEAVE_READ | LeaveRequestsController | Get all records |
| AppModule | POST | /leave/requests | Permission.LEAVE_READ | LeaveRequestsController | Get record by id |
| AppModule | PATCH | /leave/requests/:id | Permission.LEAVE_CREATE | LeaveRequestsController | Create record |
| AppModule | DELETE | /leave/requests/:id | Permission.LEAVE_UPDATE | LeaveRequestsController | Update record |
| AppModule | GET | /leave/types |  | LeaveTypesController |  |
| AppModule | GET | /leave/types/:id | Permission.LEAVE_READ | LeaveTypesController | Get all records |
| AppModule | POST | /leave/types | Permission.LEAVE_READ | LeaveTypesController | Get record by id |
| AppModule | PATCH | /leave/types/:id | Permission.LEAVE_CREATE | LeaveTypesController | Create record |
| AppModule | DELETE | /leave/types/:id | Permission.LEAVE_UPDATE | LeaveTypesController | Update record |
| AppModule | POST | /mobile/auth/login |  | MobileController |  |
| AppModule | POST | /mobile/auth/refresh |  | MobileController | Authenticate mobile user and create session |
| AppModule | POST | /mobile/auth/logout |  | MobileController | Refresh mobile access token |
| AppModule | GET | /mobile/bootstrap | Permission.MOBILE_ACCESS | MobileController | Logout mobile session |
| AppModule | POST | /mobile/devices/register | Permission.MOBILE_ACCESS | MobileController | Get mobile bootstrap payload |
| AppModule | GET | /mobile/devices | Permission.MOBILE_ACCESS | MobileController | Register or update current mobile device |
| AppModule | PATCH | /mobile/devices/:id | Permission.MOBILE_READ | MobileController | List registered mobile devices |
| AppModule | POST | /mobile/devices/:id/revoke | Permission.MOBILE_MANAGE | MobileController | Update mobile device |
| AppModule | GET | /mobile/sessions | Permission.MOBILE_MANAGE | MobileController | Revoke mobile device and active sessions |
| AppModule | POST | /mobile/sessions/:id/revoke | Permission.MOBILE_SESSIONS | MobileController | List mobile sessions |
| AppModule | POST | /mobile/push/notifications | Permission.MOBILE_SESSIONS | MobileController | Revoke mobile session |
| AppModule | GET | /mobile/push/notifications | Permission.MOBILE_PUSH | MobileController | Create mobile push notification outbox record |
| AppModule | PATCH | /mobile/push/notifications/:id | Permission.MOBILE_PUSH | MobileController | List mobile push notifications |
| AppModule | POST | /mobile/sync/pull | Permission.MOBILE_PUSH | MobileController | Update mobile push notification status |
| AppModule | POST | /mobile/sync/changes | Permission.MOBILE_SYNC | MobileController | Pull offline sync changes |
| AppModule | GET | /mobile/sync/changes | Permission.MOBILE_SYNC | MobileController | Create mobile sync change record |
| AppModule | GET | /notifications/dashboard |  | NotificationDashboardController |  |
| AppModule | POST | /notifications/jobs/scheduled |  | NotificationJobsController |  |
| AppModule | POST | /notifications/jobs/retry-failed | Permission.NOTIFICATIONS_UPDATE | NotificationJobsController | Run scheduled notification delivery job |
| AppModule | POST | /notifications/jobs/expire-workflows | Permission.NOTIFICATIONS_UPDATE | NotificationJobsController | Run failed notification retry job |
| AppModule | POST | /notifications/jobs/cleanup | Permission.WORKFLOWS_UPDATE | NotificationJobsController | Expire stale workflow requests |
| AppModule | POST | /notifications/jobs/maintenance | Permission.NOTIFICATIONS_DELETE | NotificationJobsController | Cleanup old delivered notifications |
| AppModule | GET | /notifications |  | NotificationsController |  |
| AppModule | GET | /notifications/employee/:employeeId | Permission.NOTIFICATIONS_READ | NotificationsController | Get all notifications |
| AppModule | GET | /notifications/:id | Permission.NOTIFICATIONS_READ | NotificationsController | Get notifications by employee |
| AppModule | POST | /notifications | Permission.NOTIFICATIONS_READ | NotificationsController | Get notification by id |
| AppModule | PATCH | /notifications/:id | Permission.NOTIFICATIONS_CREATE | NotificationsController | Create notification |
| AppModule | POST | /notifications/:id/read | Permission.NOTIFICATIONS_UPDATE | NotificationsController | Update notification |
| AppModule | POST | /notifications/:id/sent | Permission.NOTIFICATIONS_UPDATE | NotificationsController | Mark notification as read |
| AppModule | POST | /notifications/:id/cancel | Permission.NOTIFICATIONS_UPDATE | NotificationsController | Mark notification as sent |
| AppModule | POST | /notifications/queue/process | Permission.NOTIFICATIONS_UPDATE | NotificationsController | Cancel notification |
| AppModule | POST | /notifications/queue/retry-failed | Permission.NOTIFICATIONS_UPDATE | NotificationsController | Process queued notifications |
| AppModule | DELETE | /notifications/:id | Permission.NOTIFICATIONS_UPDATE | NotificationsController | Retry failed notifications |
| AppModule | GET | /observability/health/providers |  | ObservabilityController |  |
| AppModule | POST | /observability/health/providers | Permission.OBSERVABILITY_READ | ObservabilityController | Get health providers |
| AppModule | PATCH | /observability/health/providers/:id | Permission.OBSERVABILITY_CREATE | ObservabilityController | Create health provider |
| AppModule | DELETE | /observability/health/providers/:id | Permission.OBSERVABILITY_UPDATE | ObservabilityController | Update health provider |
| AppModule | POST | /observability/health/providers/:id/run | Permission.OBSERVABILITY_DELETE | ObservabilityController | Soft delete health provider |
| AppModule | POST | /observability/health/liveness | Permission.OBSERVABILITY_ADMIN | ObservabilityController | Run a health provider check |
| AppModule | POST | /observability/health/readiness | Permission.OBSERVABILITY_READ | ObservabilityController | Run liveness checks |
| AppModule | GET | /observability/health/results | Permission.OBSERVABILITY_READ | ObservabilityController | Run readiness checks |
| AppModule | GET | /observability/metrics/definitions | Permission.OBSERVABILITY_READ | ObservabilityController | Get health check results |
| AppModule | POST | /observability/metrics/definitions | Permission.OBSERVABILITY_READ | ObservabilityController | Get metric definitions |
| AppModule | PATCH | /observability/metrics/definitions/:id | Permission.OBSERVABILITY_CREATE | ObservabilityController | Create metric definition |
| AppModule | DELETE | /observability/metrics/definitions/:id | Permission.OBSERVABILITY_UPDATE | ObservabilityController | Update metric definition |
| AppModule | GET | /observability/metrics/samples | Permission.OBSERVABILITY_DELETE | ObservabilityController | Soft delete metric definition |
| AppModule | POST | /observability/metrics/samples | Permission.OBSERVABILITY_READ | ObservabilityController | Get metric samples |
| AppModule | GET | /observability/metrics/http | Permission.OBSERVABILITY_CREATE | ObservabilityController | Record metric sample |
| AppModule | GET | /observability/metrics/database | Permission.OBSERVABILITY_READ | ObservabilityController | Get HTTP metrics summary |
| AppModule | GET | /observability/metrics/workflow | Permission.OBSERVABILITY_READ | ObservabilityController | Get database metrics summary |
| AppModule | GET | /observability/metrics/payroll | Permission.OBSERVABILITY_READ | ObservabilityController | Get workflow metrics summary |
| AppModule | GET | /observability/metrics/business-rules | Permission.OBSERVABILITY_READ | ObservabilityController | Get payroll metrics summary |
| AppModule | GET | /observability/logs | Permission.OBSERVABILITY_READ | ObservabilityController | Get business rules metrics summary |
| AppModule | POST | /observability/logs | Permission.OBSERVABILITY_READ | ObservabilityController | Get structured log entries |
| AppModule | GET | /observability/logs/summary | Permission.OBSERVABILITY_CREATE | ObservabilityController | Record structured log entry |
| AppModule | GET | /observability/traces | Permission.OBSERVABILITY_READ | ObservabilityController | Get log level summary |
| AppModule | POST | /observability/traces | Permission.OBSERVABILITY_READ | ObservabilityController | Get distributed traces |
| AppModule | GET | /observability/traces/spans | Permission.OBSERVABILITY_CREATE | ObservabilityController | Start distributed trace |
| AppModule | POST | /observability/traces/spans | Permission.OBSERVABILITY_READ | ObservabilityController | Get distributed trace spans |
| AppModule | GET | /observability/traces/requests | Permission.OBSERVABILITY_CREATE | ObservabilityController | Record distributed trace span |
| AppModule | GET | /observability/traces/services | Permission.OBSERVABILITY_READ | ObservabilityController | Get request tracing summary |
| AppModule | GET | /observability/traces/database | Permission.OBSERVABILITY_READ | ObservabilityController | Get service tracing summary |
| AppModule | GET | /observability/traces/external-providers | Permission.OBSERVABILITY_READ | ObservabilityController | Get database timing summary |
| AppModule | GET | /observability/management/status | Permission.OBSERVABILITY_READ | ObservabilityController | Get external provider timing summary |
| AppModule | GET | /observability/management/diagnostics | Permission.OBSERVABILITY_ADMIN | ObservabilityController | Get system observability status |
| AppModule | GET | /observability/management/metrics | Permission.OBSERVABILITY_ADMIN | ObservabilityController | Get system diagnostics |
| AppModule | GET | /observability/management/health | Permission.OBSERVABILITY_ADMIN | ObservabilityController | Get management metrics overview |
| AppModule | GET | /organization/branches |  | BranchesController |  |
| AppModule | GET | /organization/branches/:id | Permission.ORGANIZATION_READ | BranchesController | Get all branches |
| AppModule | POST | /organization/branches | Permission.ORGANIZATION_READ | BranchesController | Get branches by id |
| AppModule | PATCH | /organization/branches/:id | Permission.ORGANIZATION_CREATE | BranchesController | Create branches |
| AppModule | DELETE | /organization/branches/:id | Permission.ORGANIZATION_UPDATE | BranchesController | Update branches |
| AppModule | GET | /organization/companies |  | CompaniesController |  |
| AppModule | GET | /organization/companies/:id | Permission.ORGANIZATION_READ | CompaniesController | Get all companies |
| AppModule | POST | /organization/companies | Permission.ORGANIZATION_READ | CompaniesController | Get company by id |
| AppModule | PATCH | /organization/companies/:id | Permission.ORGANIZATION_CREATE | CompaniesController | Create company |
| AppModule | DELETE | /organization/companies/:id | Permission.ORGANIZATION_UPDATE | CompaniesController | Update company |
| AppModule | GET | /organization/cost-centers |  | CostCentersController |  |
| AppModule | GET | /organization/cost-centers/:id | Permission.ORGANIZATION_READ | CostCentersController | Get all cost centers |
| AppModule | POST | /organization/cost-centers | Permission.ORGANIZATION_READ | CostCentersController | Get cost centers by id |
| AppModule | PATCH | /organization/cost-centers/:id | Permission.ORGANIZATION_CREATE | CostCentersController | Create cost centers |
| AppModule | DELETE | /organization/cost-centers/:id | Permission.ORGANIZATION_UPDATE | CostCentersController | Update cost centers |
| AppModule | GET | /organization/departments |  | DepartmentsController |  |
| AppModule | GET | /organization/departments/:id | Permission.ORGANIZATION_READ | DepartmentsController | Get all departments |
| AppModule | POST | /organization/departments | Permission.ORGANIZATION_READ | DepartmentsController | Get departments by id |
| AppModule | PATCH | /organization/departments/:id | Permission.ORGANIZATION_CREATE | DepartmentsController | Create departments |
| AppModule | DELETE | /organization/departments/:id | Permission.ORGANIZATION_UPDATE | DepartmentsController | Update departments |
| AppModule | GET | /organization/positions |  | PositionsController |  |
| AppModule | GET | /organization/positions/:id | Permission.ORGANIZATION_READ | PositionsController | Get all positions |
| AppModule | POST | /organization/positions | Permission.ORGANIZATION_READ | PositionsController | Get positions by id |
| AppModule | PATCH | /organization/positions/:id | Permission.ORGANIZATION_CREATE | PositionsController | Create positions |
| AppModule | DELETE | /organization/positions/:id | Permission.ORGANIZATION_UPDATE | PositionsController | Update positions |
| AppModule | POST | /payroll/runs/:id/review |  | PayrollApprovalController |  |
| AppModule | POST | /payroll/runs/:id/approve | Permission.PAYROLL_UPDATE | PayrollApprovalController | Submit payroll run for review |
| AppModule | POST | /payroll/runs/:id/reject | Permission.PAYROLL_UPDATE | PayrollApprovalController | Approve payroll run |
| AppModule | POST | /payroll/runs/:id/lock | Permission.PAYROLL_UPDATE | PayrollApprovalController | Reject payroll run |
| AppModule | POST | /payroll/attendance/apply |  | PayrollAttendanceController |  |
| AppModule | POST | /payroll/calculation/preview |  | PayrollCalculationController |  |
| AppModule | POST | /payroll/calculation/calculate | Permission.PAYROLL_READ | PayrollCalculationController | Preview payroll calculations |
| AppModule | GET | /payroll/items |  | PayrollItemsController |  |
| AppModule | GET | /payroll/items/run/:payrollRunId | Permission.PAYROLL_READ | PayrollItemsController | Get all payroll items |
| AppModule | GET | /payroll/items/:id | Permission.PAYROLL_READ | PayrollItemsController | Get payroll items by run |
| AppModule | POST | /payroll/items | Permission.PAYROLL_READ | PayrollItemsController | Get payroll item by id |
| AppModule | PATCH | /payroll/items/:id | Permission.PAYROLL_CREATE | PayrollItemsController | Create payroll item |
| AppModule | DELETE | /payroll/items/:id | Permission.PAYROLL_UPDATE | PayrollItemsController | Update payroll item |
| AppModule | GET | /payroll/periods |  | PayrollPeriodsController |  |
| AppModule | GET | /payroll/periods/:id | Permission.PAYROLL_READ | PayrollPeriodsController | Get all payroll periods |
| AppModule | POST | /payroll/periods | Permission.PAYROLL_READ | PayrollPeriodsController | Get payroll period by id |
| AppModule | PATCH | /payroll/periods/:id | Permission.PAYROLL_CREATE | PayrollPeriodsController | Create payroll period |
| AppModule | DELETE | /payroll/periods/:id | Permission.PAYROLL_UPDATE | PayrollPeriodsController | Update payroll period |
| AppModule | GET | /payroll/profiles |  | PayrollProfilesController |  |
| AppModule | GET | /payroll/profiles/:id | Permission.PAYROLL_READ | PayrollProfilesController | Get all records |
| AppModule | POST | /payroll/profiles | Permission.PAYROLL_READ | PayrollProfilesController | Get record by id |
| AppModule | PATCH | /payroll/profiles/:id | Permission.PAYROLL_CREATE | PayrollProfilesController | Create record |
| AppModule | DELETE | /payroll/profiles/:id | Permission.PAYROLL_UPDATE | PayrollProfilesController | Update record |
| AppModule | GET | /payroll/runs |  | PayrollRunsController |  |
| AppModule | GET | /payroll/runs/:id | Permission.PAYROLL_READ | PayrollRunsController | Get all records |
| AppModule | POST | /payroll/runs | Permission.PAYROLL_READ | PayrollRunsController | Get record by id |
| AppModule | PATCH | /payroll/runs/:id | Permission.PAYROLL_CREATE | PayrollRunsController | Create record |
| AppModule | DELETE | /payroll/runs/:id | Permission.PAYROLL_UPDATE | PayrollRunsController | Update record |
| AppModule | GET | /payroll/payslips |  | PayslipsController |  |
| AppModule | GET | /payroll/payslips/employee/:employeeId | Permission.PAYROLL_READ | PayslipsController | Get all payslips |
| AppModule | GET | /payroll/payslips/:id | Permission.PAYROLL_READ | PayslipsController | Get employee-visible payslips |
| AppModule | GET | /payroll/payslips/:id/pdf-payload | Permission.PAYROLL_READ | PayslipsController | Get payslip by id |
| AppModule | PATCH | /payroll/payslips/:id | Permission.PAYROLL_READ | PayslipsController | Get PDF-ready payslip payload |
| AppModule | POST | /payroll/payslips/run/:payrollRunId/issue | Permission.PAYROLL_UPDATE | PayslipsController | Update payslip |
| AppModule | GET | /payroll/reports/dashboard |  | PayrollReportsController |  |
| AppModule | GET | /payroll/reports/salary | Permission.PAYROLL_READ | PayrollReportsController | Get payroll dashboard |
| AppModule | GET | /payroll/reports/departments | Permission.PAYROLL_READ | PayrollReportsController | Get salary report |
| AppModule | GET | /payroll/reports/cost-centers | Permission.PAYROLL_READ | PayrollReportsController | Get department payroll report |
| AppModule | GET | /payroll/reports/monthly | Permission.PAYROLL_READ | PayrollReportsController | Get cost center payroll report |
| AppModule | GET | /payroll/salary-components |  | SalaryComponentsController |  |
| AppModule | GET | /payroll/salary-components/:id | Permission.PAYROLL_READ | SalaryComponentsController | Get all records |
| AppModule | POST | /payroll/salary-components | Permission.PAYROLL_READ | SalaryComponentsController | Get record by id |
| AppModule | PATCH | /payroll/salary-components/:id | Permission.PAYROLL_CREATE | SalaryComponentsController | Create record |
| AppModule | DELETE | /payroll/salary-components/:id | Permission.PAYROLL_UPDATE | SalaryComponentsController | Update record |
| AppModule | GET | /performance/cycles |  | PerformanceCyclesController |  |
| AppModule | GET | /performance/cycles/:id | Permission.PERFORMANCE_READ | PerformanceCyclesController | Get all performance cycles |
| AppModule | POST | /performance/cycles | Permission.PERFORMANCE_READ | PerformanceCyclesController | Get performance cycle by id |
| AppModule | PATCH | /performance/cycles/:id | Permission.PERFORMANCE_CREATE | PerformanceCyclesController | Create performance cycle |
| AppModule | DELETE | /performance/cycles/:id | Permission.PERFORMANCE_UPDATE | PerformanceCyclesController | Update performance cycle |
| AppModule | GET | /performance/dashboard/summary |  | PerformanceDashboardController |  |
| AppModule | GET | /performance/goals |  | PerformanceGoalsController |  |
| AppModule | GET | /performance/goals/:id | Permission.PERFORMANCE_READ | PerformanceGoalsController | Get all performance goals |
| AppModule | POST | /performance/goals | Permission.PERFORMANCE_READ | PerformanceGoalsController | Get performance goal by id |
| AppModule | PATCH | /performance/goals/:id | Permission.PERFORMANCE_CREATE | PerformanceGoalsController | Create performance goal |
| AppModule | DELETE | /performance/goals/:id | Permission.PERFORMANCE_UPDATE | PerformanceGoalsController | Update performance goal |
| AppModule | GET | /performance/review-items |  | PerformanceReviewItemsController |  |
| AppModule | GET | /performance/review-items/:id | Permission.PERFORMANCE_READ | PerformanceReviewItemsController | Get all performance review items |
| AppModule | POST | /performance/review-items | Permission.PERFORMANCE_READ | PerformanceReviewItemsController | Get performance review item by id |
| AppModule | PATCH | /performance/review-items/:id | Permission.PERFORMANCE_CREATE | PerformanceReviewItemsController | Create performance review item |
| AppModule | DELETE | /performance/review-items/:id | Permission.PERFORMANCE_UPDATE | PerformanceReviewItemsController | Update performance review item |
| AppModule | GET | /performance/reviews |  | PerformanceReviewsController |  |
| AppModule | GET | /performance/reviews/:id | Permission.PERFORMANCE_READ | PerformanceReviewsController | Get all performance reviews |
| AppModule | POST | /performance/reviews | Permission.PERFORMANCE_READ | PerformanceReviewsController | Get performance review by id |
| AppModule | PATCH | /performance/reviews/:id | Permission.PERFORMANCE_CREATE | PerformanceReviewsController | Create performance review |
| AppModule | DELETE | /performance/reviews/:id | Permission.PERFORMANCE_UPDATE | PerformanceReviewsController | Update performance review |
| AppModule | GET | /performance-optimization/queries/recommendations |  | PerformanceOptimizationController |  |
| AppModule | GET | /performance-optimization/cache | Permission.PERFORMANCE_OPTIMIZATION_READ | PerformanceOptimizationController | Get query optimization recommendations |
| AppModule | GET | /performance-optimization/cache/stats | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | PerformanceOptimizationController | List cache entries |
| AppModule | GET | /performance-optimization/cache/:key | Permission.PERFORMANCE_OPTIMIZATION_READ | PerformanceOptimizationController | Get cache statistics |
| AppModule | POST | /performance-optimization/cache | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | PerformanceOptimizationController | Read cache entry |
| AppModule | POST | /performance-optimization/cache/invalidate | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | PerformanceOptimizationController | Set cache entry |
| AppModule | POST | /performance-optimization/batch/plan | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | PerformanceOptimizationController | Invalidate cache entries |
| AppModule | POST | /performance-optimization/lazy-loading/plan | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE | PerformanceOptimizationController | Create batch operation plan |
| AppModule | GET | /performance-optimization/memory | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE | PerformanceOptimizationController | Create lazy-loading plan |
| AppModule | GET | /performance-optimization/metrics | Permission.PERFORMANCE_OPTIMIZATION_READ | PerformanceOptimizationController | Get memory statistics |
| AppModule | POST | /performance-optimization/metrics | Permission.PERFORMANCE_OPTIMIZATION_METRICS | PerformanceOptimizationController | List performance metrics |
| AppModule | GET | /permissions |  | PermissionsController |  |
| AppModule | GET | /permissions/:id | Permission.PERMISSIONS_READ | PermissionsController | Get all permissions |
| AppModule | POST | /permissions | Permission.PERMISSIONS_READ | PermissionsController | Get permission by id |
| AppModule | PATCH | /permissions/:id | Permission.PERMISSIONS_CREATE | PermissionsController | Create permission |
| AppModule | DELETE | /permissions/:id | Permission.PERMISSIONS_UPDATE | PermissionsController | Update permission |
| AppModule | GET | /plugins/manifests |  | PluginsController |  |
| AppModule | POST | /plugins/manifests | Permission.PLUGINS_READ | PluginsController | Get plugin manifests |
| AppModule | PATCH | /plugins/manifests/:id | Permission.PLUGINS_CREATE | PluginsController | Create plugin manifest |
| AppModule | DELETE | /plugins/manifests/:id | Permission.PLUGINS_UPDATE | PluginsController | Update plugin manifest |
| AppModule | POST | /plugins/manifests/:id/restore | Permission.PLUGINS_DELETE | PluginsController | Soft delete plugin manifest |
| AppModule | POST | /plugins/manifests/:id/load | Permission.PLUGINS_UPDATE | PluginsController | Restore plugin manifest |
| AppModule | GET | /plugins/registry | Permission.PLUGINS_EXECUTE | PluginsController | Load plugin manifest into registry |
| AppModule | POST | /plugins/registry/:id/enable | Permission.PLUGINS_READ | PluginsController | Get plugin registry entries |
| AppModule | POST | /plugins/registry/:id/disable | Permission.PLUGINS_EXECUTE | PluginsController | Enable loaded plugin |
| AppModule | POST | /plugins/registry/:id/unload | Permission.PLUGINS_EXECUTE | PluginsController | Disable loaded plugin |
| AppModule | GET | /plugins/registry/:id/lifecycle-events | Permission.PLUGINS_EXECUTE | PluginsController | Unload plugin from registry |
| AppModule | GET | /plugins/sdk/event-subscriptions | Permission.PLUGINS_READ | PluginsController | Get plugin lifecycle events |
| AppModule | POST | /plugins/sdk/event-subscriptions | Permission.PLUGINS_READ | PluginsController | Get plugin event subscriptions |
| AppModule | PATCH | /plugins/sdk/event-subscriptions/:id | Permission.PLUGINS_UPDATE | PluginsController | Create plugin event subscription |
| AppModule | DELETE | /plugins/sdk/event-subscriptions/:id | Permission.PLUGINS_UPDATE | PluginsController | Update plugin event subscription |
| AppModule | GET | /plugins/sdk/hooks | Permission.PLUGINS_DELETE | PluginsController | Soft delete plugin event subscription |
| AppModule | POST | /plugins/sdk/hooks | Permission.PLUGINS_READ | PluginsController | Get plugin hooks |
| AppModule | PATCH | /plugins/sdk/hooks/:id | Permission.PLUGINS_UPDATE | PluginsController | Create plugin hook |
| AppModule | DELETE | /plugins/sdk/hooks/:id | Permission.PLUGINS_UPDATE | PluginsController | Update plugin hook |
| AppModule | GET | /plugins/sdk/service-bindings | Permission.PLUGINS_DELETE | PluginsController | Soft delete plugin hook |
| AppModule | POST | /plugins/sdk/service-bindings | Permission.PLUGINS_READ | PluginsController | Get plugin service bindings |
| AppModule | PATCH | /plugins/sdk/service-bindings/:id | Permission.PLUGINS_UPDATE | PluginsController | Create plugin service binding |
| AppModule | DELETE | /plugins/sdk/service-bindings/:id | Permission.PLUGINS_UPDATE | PluginsController | Update plugin service binding |
| AppModule | GET | /plugins/sdk/permission-grants | Permission.PLUGINS_DELETE | PluginsController | Soft delete plugin service binding |
| AppModule | POST | /plugins/sdk/permission-grants | Permission.PLUGINS_READ | PluginsController | Get plugin permission grants |
| AppModule | DELETE | /plugins/sdk/permission-grants/:id | Permission.PLUGINS_GOVERN | PluginsController | Grant permission to plugin |
| AppModule | GET | /plugins/sdk/configurations | Permission.PLUGINS_GOVERN | PluginsController | Revoke plugin permission grant |
| AppModule | POST | /plugins/sdk/configurations | Permission.PLUGINS_READ | PluginsController | Get plugin configurations |
| AppModule | PATCH | /plugins/sdk/configurations/:id | Permission.PLUGINS_UPDATE | PluginsController | Create plugin configuration |
| AppModule | DELETE | /plugins/sdk/configurations/:id | Permission.PLUGINS_UPDATE | PluginsController | Update plugin configuration |
| AppModule | POST | /plugins/sdk/events | Permission.PLUGINS_DELETE | PluginsController | Soft delete plugin configuration |
| AppModule | GET | /plugins/sdk/events | Permission.PLUGINS_EXECUTE | PluginsController | Emit plugin SDK event |
| AppModule | GET | /plugins/marketplace/packages | Permission.PLUGINS_READ | PluginsController | Get plugin SDK event history |
| AppModule | POST | /plugins/marketplace/packages | Permission.PLUGINS_READ | PluginsController | Get marketplace packages |
| AppModule | PATCH | /plugins/marketplace/packages/:id | Permission.PLUGINS_CREATE | PluginsController | Create marketplace package |
| AppModule | GET | /plugins/marketplace/versions | Permission.PLUGINS_UPDATE | PluginsController | Update marketplace package |
| AppModule | POST | /plugins/marketplace/versions | Permission.PLUGINS_READ | PluginsController | Get marketplace package versions |
| AppModule | PATCH | /plugins/marketplace/versions/:id | Permission.PLUGINS_CREATE | PluginsController | Create marketplace package version |
| AppModule | POST | /plugins/marketplace/versions/:id/install | Permission.PLUGINS_UPDATE | PluginsController | Update marketplace package version |
| AppModule | GET | /plugins/marketplace/installations | Permission.PLUGINS_EXECUTE | PluginsController | Install marketplace package version |
| AppModule | POST | /plugins/marketplace/installations/:id/enable | Permission.PLUGINS_READ | PluginsController | Get plugin installations |
| AppModule | POST | /plugins/marketplace/installations/:id/disable | Permission.PLUGINS_EXECUTE | PluginsController | Enable plugin installation |
| AppModule | POST | /plugins/marketplace/installations/:id/uninstall | Permission.PLUGINS_EXECUTE | PluginsController | Disable plugin installation |
| AppModule | POST | /plugins/marketplace/installations/:id/upgrade | Permission.PLUGINS_DELETE | PluginsController | Uninstall plugin installation |
| AppModule | GET | /plugins/isolation/sandbox-policies | Permission.PLUGINS_EXECUTE | PluginsController | Upgrade plugin installation |
| AppModule | POST | /plugins/isolation/sandbox-policies | Permission.PLUGINS_READ | PluginsController | Get plugin sandbox policies |
| AppModule | GET | /plugins/isolation/dependencies | Permission.PLUGINS_GOVERN | PluginsController | Create or update plugin sandbox policy |
| AppModule | POST | /plugins/isolation/dependencies | Permission.PLUGINS_READ | PluginsController | Get plugin dependencies |
| AppModule | PATCH | /plugins/isolation/dependencies/:id | Permission.PLUGINS_UPDATE | PluginsController | Create plugin dependency |
| AppModule | POST | /plugins/isolation/registry/:id/validate-dependencies | Permission.PLUGINS_UPDATE | PluginsController | Update plugin dependency |
| AppModule | GET | /plugins/isolation/capability-grants | Permission.PLUGINS_EXECUTE | PluginsController | Validate plugin dependencies |
| AppModule | POST | /plugins/isolation/capability-grants | Permission.PLUGINS_READ | PluginsController | Get plugin capability grants |
| AppModule | DELETE | /plugins/isolation/capability-grants/:id | Permission.PLUGINS_GOVERN | PluginsController | Grant plugin capability |
| AppModule | POST | /plugins/isolation/registry/:id/validate | Permission.PLUGINS_GOVERN | PluginsController | Revoke plugin capability |
| AppModule | POST | /plugins/management/upload | Permission.PLUGINS_EXECUTE | PluginsController | Validate plugin isolation posture |
| AppModule | GET | /plugins/management/registry/:id/health | Permission.PLUGINS_CREATE | PluginsController | Upload plugin manifest package metadata |
| AppModule | GET | /plugins/management/metrics | Permission.PLUGINS_READ | PluginsController | Get plugin health |
| AppModule | GET | /public-api/registry/groups |  | PublicApiController |  |
| AppModule | POST | /public-api/registry/groups | Permission.PUBLIC_API_READ | PublicApiController | Get public API groups |
| AppModule | PATCH | /public-api/registry/groups/:id | Permission.PUBLIC_API_CREATE | PublicApiController | Create public API group |
| AppModule | DELETE | /public-api/registry/groups/:id | Permission.PUBLIC_API_UPDATE | PublicApiController | Update public API group |
| AppModule | GET | /public-api/registry/apis | Permission.PUBLIC_API_DELETE | PublicApiController | Soft delete public API group |
| AppModule | POST | /public-api/registry/apis | Permission.PUBLIC_API_READ | PublicApiController | Get public APIs |
| AppModule | PATCH | /public-api/registry/apis/:id | Permission.PUBLIC_API_CREATE | PublicApiController | Create public API metadata |
| AppModule | DELETE | /public-api/registry/apis/:id | Permission.PUBLIC_API_UPDATE | PublicApiController | Update public API metadata |
| AppModule | GET | /public-api/registry/versions | Permission.PUBLIC_API_DELETE | PublicApiController | Soft delete public API metadata |
| AppModule | POST | /public-api/registry/versions | Permission.PUBLIC_API_READ | PublicApiController | Get public API versions |
| AppModule | PATCH | /public-api/registry/versions/:id | Permission.PUBLIC_API_CREATE | PublicApiController | Create public API version |
| AppModule | GET | /public-api/keys | Permission.PUBLIC_API_UPDATE | PublicApiController | Update public API version |
| AppModule | POST | /public-api/keys | Permission.PUBLIC_API_KEYS | PublicApiController | Get public API keys |
| AppModule | POST | /public-api/keys/:id/rotate | Permission.PUBLIC_API_KEYS | PublicApiController | Create public API key |
| AppModule | POST | /public-api/keys/:id/revoke | Permission.PUBLIC_API_KEYS | PublicApiController | Rotate public API key |
| AppModule | GET | /public-api/rate-limits/policies | Permission.PUBLIC_API_KEYS | PublicApiController | Revoke public API key |
| AppModule | POST | /public-api/rate-limits/policies | Permission.PUBLIC_API_ADMIN | PublicApiController | Get public API rate limit policies |
| AppModule | PATCH | /public-api/rate-limits/policies/:id | Permission.PUBLIC_API_ADMIN | PublicApiController | Create public API rate limit policy |
| AppModule | DELETE | /public-api/rate-limits/policies/:id | Permission.PUBLIC_API_ADMIN | PublicApiController | Update public API rate limit policy |
| AppModule | POST | /public-api/rate-limits/evaluate | Permission.PUBLIC_API_ADMIN | PublicApiController | Soft delete public API rate limit policy |
| AppModule | GET | /public-api/rate-limits/usage | Permission.PUBLIC_API_ADMIN | PublicApiController | Evaluate and record public API rate limit usage |
| AppModule | GET | /public-api/developer/applications | Permission.PUBLIC_API_READ | PublicApiController | Get public API usage counters |
| AppModule | POST | /public-api/developer/applications | Permission.PUBLIC_API_READ | PublicApiController | Get developer applications |
| AppModule | PATCH | /public-api/developer/applications/:id | Permission.PUBLIC_API_CREATE | PublicApiController | Register developer application |
| AppModule | DELETE | /public-api/developer/applications/:id | Permission.PUBLIC_API_UPDATE | PublicApiController | Update developer application |
| AppModule | POST | /public-api/developer/applications/:id/keys | Permission.PUBLIC_API_DELETE | PublicApiController | Soft delete developer application |
| AppModule | POST | /public-api/developer/applications/:id/keys/:keyId/revoke | Permission.PUBLIC_API_KEYS | PublicApiController | Generate developer application key |
| AppModule | GET | /public-api/developer/applications/:id/usage | Permission.PUBLIC_API_KEYS | PublicApiController | Revoke developer application key |
| AppModule | POST | /public-api/security/verify-signature | Permission.PUBLIC_API_READ | PublicApiController | Get developer application usage statistics |
| AppModule | GET | /public-api/security/request-logs | Permission.PUBLIC_API_ADMIN | PublicApiController | Verify signed public API request |
| AppModule | POST | /public-api/security/request-logs | Permission.PUBLIC_API_ADMIN | PublicApiController | Get public API request logs |
| AppModule | GET | /recruitment/applicants |  | ApplicantsController |  |
| AppModule | GET | /recruitment/applicants/:id | Permission.RECRUITMENT_READ | ApplicantsController | Get all records |
| AppModule | POST | /recruitment/applicants | Permission.RECRUITMENT_READ | ApplicantsController | Get record by id |
| AppModule | PATCH | /recruitment/applicants/:id | Permission.RECRUITMENT_CREATE | ApplicantsController | Create record |
| AppModule | DELETE | /recruitment/applicants/:id | Permission.RECRUITMENT_UPDATE | ApplicantsController | Update record |
| AppModule | GET | /recruitment/applications |  | ApplicationsController |  |
| AppModule | GET | /recruitment/applications/:id | Permission.RECRUITMENT_READ | ApplicationsController | Get all applications |
| AppModule | POST | /recruitment/applications | Permission.RECRUITMENT_READ | ApplicationsController | Get application by id |
| AppModule | PATCH | /recruitment/applications/:id | Permission.RECRUITMENT_CREATE | ApplicationsController | Create application |
| AppModule | DELETE | /recruitment/applications/:id | Permission.RECRUITMENT_UPDATE | ApplicationsController | Update application |
| AppModule | GET | /recruitment/dashboard/summary |  | RecruitmentDashboardController |  |
| AppModule | POST | /recruitment/hiring/hire |  | HiringController |  |
| AppModule | GET | /recruitment/interview-evaluations |  | InterviewEvaluationsController |  |
| AppModule | GET | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_READ | InterviewEvaluationsController | Get all interview evaluations |
| AppModule | POST | /recruitment/interview-evaluations | Permission.RECRUITMENT_READ | InterviewEvaluationsController | Get interview evaluation by id |
| AppModule | PATCH | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_CREATE | InterviewEvaluationsController | Create interview evaluation |
| AppModule | DELETE | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_UPDATE | InterviewEvaluationsController | Update interview evaluation |
| AppModule | GET | /recruitment/interviews |  | InterviewsController |  |
| AppModule | GET | /recruitment/interviews/:id | Permission.RECRUITMENT_READ | InterviewsController | Get all interviews |
| AppModule | POST | /recruitment/interviews | Permission.RECRUITMENT_READ | InterviewsController | Get interview by id |
| AppModule | PATCH | /recruitment/interviews/:id | Permission.RECRUITMENT_CREATE | InterviewsController | Create interview |
| AppModule | DELETE | /recruitment/interviews/:id | Permission.RECRUITMENT_UPDATE | InterviewsController | Update interview |
| AppModule | GET | /recruitment/job-positions |  | JobPositionsController |  |
| AppModule | GET | /recruitment/job-positions/:id | Permission.RECRUITMENT_READ | JobPositionsController | Get all job positions |
| AppModule | POST | /recruitment/job-positions | Permission.RECRUITMENT_READ | JobPositionsController | Get job position by id |
| AppModule | PATCH | /recruitment/job-positions/:id | Permission.RECRUITMENT_CREATE | JobPositionsController | Create job position |
| AppModule | DELETE | /recruitment/job-positions/:id | Permission.RECRUITMENT_UPDATE | JobPositionsController | Update job position |
| AppModule | GET | /recruitment/offer-letters |  | OfferLettersController |  |
| AppModule | GET | /recruitment/offer-letters/:id | Permission.RECRUITMENT_READ | OfferLettersController | Get all offer letters |
| AppModule | POST | /recruitment/offer-letters | Permission.RECRUITMENT_READ | OfferLettersController | Get offer letter by id |
| AppModule | PATCH | /recruitment/offer-letters/:id | Permission.RECRUITMENT_CREATE | OfferLettersController | Create offer letter |
| AppModule | POST | /recruitment/offer-letters/:id/send | Permission.RECRUITMENT_UPDATE | OfferLettersController | Update offer letter |
| AppModule | POST | /recruitment/offer-letters/:id/accept | Permission.RECRUITMENT_UPDATE | OfferLettersController | Send offer letter |
| AppModule | POST | /recruitment/offer-letters/:id/reject | Permission.RECRUITMENT_UPDATE | OfferLettersController | Accept offer letter |
| AppModule | DELETE | /recruitment/offer-letters/:id | Permission.RECRUITMENT_UPDATE | OfferLettersController | Reject offer letter |
| AppModule | GET | /recruitment/vacancies |  | VacanciesController |  |
| AppModule | GET | /recruitment/vacancies/:id | Permission.RECRUITMENT_READ | VacanciesController | Get all records |
| AppModule | POST | /recruitment/vacancies | Permission.RECRUITMENT_READ | VacanciesController | Get record by id |
| AppModule | PATCH | /recruitment/vacancies/:id | Permission.RECRUITMENT_CREATE | VacanciesController | Create record |
| AppModule | DELETE | /recruitment/vacancies/:id | Permission.RECRUITMENT_UPDATE | VacanciesController | Update record |
| AppModule | GET | /reporting/dashboards/executive |  | ReportingDashboardsController |  |
| AppModule | GET | /reporting/dashboards/hr | Permission.REPORTING_READ | ReportingDashboardsController | Get executive dashboard |
| AppModule | GET | /reporting/dashboards/payroll | Permission.REPORTING_READ | ReportingDashboardsController | Get HR dashboard |
| AppModule | GET | /reporting/dashboards/accounting | Permission.REPORTING_READ | ReportingDashboardsController | Get payroll dashboard |
| AppModule | GET | /reporting/categories |  | ReportDefinitionsController |  |
| AppModule | POST | /reporting/categories | Permission.REPORTING_READ | ReportDefinitionsController | Get report categories |
| AppModule | PATCH | /reporting/categories/:id | Permission.REPORTING_CREATE | ReportDefinitionsController | Create report category |
| AppModule | GET | /reporting/definitions | Permission.REPORTING_UPDATE | ReportDefinitionsController | Update report category |
| AppModule | GET | /reporting/definitions/:id | Permission.REPORTING_READ | ReportDefinitionsController | Get report definitions |
| AppModule | POST | /reporting/definitions | Permission.REPORTING_READ | ReportDefinitionsController | Get report definition by id |
| AppModule | PATCH | /reporting/definitions/:id | Permission.REPORTING_CREATE | ReportDefinitionsController | Create report definition |
| AppModule | GET | /reporting/executions |  | ReportExecutionController |  |
| AppModule | GET | /reporting/executions/:id | Permission.REPORTING_READ | ReportExecutionController | Get report execution history |
| AppModule | POST | /reporting/executions | Permission.REPORTING_READ | ReportExecutionController | Get report execution by id |
| AppModule | POST | /reporting/exports |  | ReportExportController |  |
| AppModule | GET | /reporting/finance/payroll-summary |  | FinanceReportsController |  |
| AppModule | GET | /reporting/finance/payslip-summary | Permission.REPORTING_READ | FinanceReportsController | Get payroll summary report |
| AppModule | GET | /reporting/finance/trial-balance | Permission.REPORTING_READ | FinanceReportsController | Get payslip summary report |
| AppModule | GET | /reporting/finance/general-ledger | Permission.REPORTING_READ | FinanceReportsController | Get accounting trial balance report |
| AppModule | GET | /reporting/finance/cost-centers | Permission.REPORTING_READ | FinanceReportsController | Get accounting general ledger report |
| AppModule | GET | /reporting/hr/employees |  | HrReportsController |  |
| AppModule | GET | /reporting/hr/attendance | Permission.REPORTING_READ | HrReportsController | Get employee report |
| AppModule | GET | /reporting/hr/leave | Permission.REPORTING_READ | HrReportsController | Get attendance report |
| AppModule | GET | /reporting/hr/recruitment | Permission.REPORTING_READ | HrReportsController | Get leave report |
| AppModule | GET | /roles |  | RolesController |  |
| AppModule | GET | /roles/:id | Permission.ROLES_READ | RolesController | Get all roles |
| AppModule | POST | /roles | Permission.ROLES_READ | RolesController | Get role by id |
| AppModule | PATCH | /roles/:id | Permission.ROLES_CREATE | RolesController | Create role |
| AppModule | DELETE | /roles/:id | Permission.ROLES_UPDATE | RolesController | Update role |
| AppModule | GET | /scheduler/crons |  | SchedulerController |  |
| AppModule | POST | /scheduler/crons | Permission.SCHEDULER_READ | SchedulerController | Get cron registry entries |
| AppModule | PATCH | /scheduler/crons/:id | Permission.SCHEDULER_CREATE | SchedulerController | Create cron registry entry |
| AppModule | DELETE | /scheduler/crons/:id | Permission.SCHEDULER_UPDATE | SchedulerController | Update cron registry entry |
| AppModule | GET | /scheduler/jobs | Permission.SCHEDULER_DELETE | SchedulerController | Soft delete cron registry entry |
| AppModule | POST | /scheduler/jobs | Permission.SCHEDULER_READ | SchedulerController | Get scheduled jobs |
| AppModule | PATCH | /scheduler/jobs/:id | Permission.SCHEDULER_CREATE | SchedulerController | Schedule background job |
| AppModule | POST | /scheduler/jobs/:id/cancel | Permission.SCHEDULER_UPDATE | SchedulerController | Update scheduled job |
| AppModule | GET | /scheduler/history | Permission.SCHEDULER_EXECUTE | SchedulerController | Cancel scheduled job |
| AppModule | POST | /scheduler/queue/claim | Permission.SCHEDULER_READ | SchedulerController | Get scheduler job history |
| AppModule | POST | /scheduler/jobs/:id/complete | Permission.SCHEDULER_EXECUTE | SchedulerController | Claim due scheduler jobs for a worker |
| AppModule | POST | /scheduler/jobs/:id/fail | Permission.SCHEDULER_EXECUTE | SchedulerController | Complete a running scheduler job |
| AppModule | POST | /scheduler/jobs/:id/retry | Permission.SCHEDULER_EXECUTE | SchedulerController | Fail a running scheduler job and apply retry policy |
| AppModule | POST | /scheduler/jobs/:id/recover | Permission.SCHEDULER_EXECUTE | SchedulerController | Retry a failed or dead-letter scheduler job |
| AppModule | GET | /scheduler/recoveries | Permission.SCHEDULER_EXECUTE | SchedulerController | Apply failure recovery action to a scheduler job |
| AppModule | GET | /scheduler/monitoring/dashboard | Permission.SCHEDULER_MONITOR | SchedulerController | Get scheduler failure recovery records |
| AppModule | GET | /scheduler/monitoring/queues | Permission.SCHEDULER_MONITOR | SchedulerController | Get scheduler dashboard metrics |
| AppModule | GET | /scheduler/monitoring/failures | Permission.SCHEDULER_MONITOR | SchedulerController | Get scheduler queue status |
| AppModule | GET | /scheduler/monitoring/system-status | Permission.SCHEDULER_MONITOR | SchedulerController | Get scheduler failure report |
| AppModule | GET | /search/global |  | SearchController |  |
| AppModule | GET | /search/employees | Permission.SEARCH_GLOBAL | SearchController | Run global enterprise search |
| AppModule | GET | /search/payroll | Permission.SEARCH_EMPLOYEES | SearchController | Search employees |
| AppModule | GET | /search/documents | Permission.SEARCH_PAYROLL | SearchController | Search payroll records |
| AppModule | GET | /search/workflows | Permission.SEARCH_DOCUMENTS | SearchController | Search documents |
| AppModule | GET | /search/index | Permission.SEARCH_WORKFLOWS | SearchController | Search workflows |
| AppModule | POST | /search/index | Permission.SEARCH_ADMIN | SearchController | List search index records |
| AppModule | POST | /search/index/rebuild | Permission.SEARCH_ADMIN | SearchController | Create or update search index record |
| AppModule | GET | /search/audit | Permission.SEARCH_ADMIN | SearchController | Rebuild search index from supported domains |
| AppModule | GET | /tenants |  | TenantsController |  |
| AppModule | POST | /tenants | Permission.TENANTS_READ | TenantsController | Get tenant registry |
| AppModule | PATCH | /tenants/:id | Permission.TENANTS_CREATE | TenantsController | Create tenant |
| AppModule | DELETE | /tenants/:id | Permission.TENANTS_UPDATE | TenantsController | Update tenant |
| AppModule | POST | /tenants/:id/restore | Permission.TENANTS_DELETE | TenantsController | Soft delete tenant |
| AppModule | GET | /tenants/domains | Permission.TENANTS_UPDATE | TenantsController | Restore tenant |
| AppModule | POST | /tenants/domains | Permission.TENANTS_READ | TenantsController | Get tenant domains |
| AppModule | POST | /tenants/resolve | Permission.TENANTS_UPDATE | TenantsController | Create tenant domain |
| AppModule | GET | /tenants/isolation/companies | Permission.TENANTS_READ | TenantsController | Resolve tenant from context, code, or domain |
| AppModule | POST | /tenants/isolation/companies/:companyId/assign | Permission.TENANTS_READ | TenantsController | Get tenant-scoped companies |
| AppModule | GET | /tenants/isolation/branches | Permission.TENANTS_UPDATE | TenantsController | Assign company to tenant |
| AppModule | POST | /tenants/isolation/branches/:branchId/assign | Permission.TENANTS_READ | TenantsController | Get tenant-scoped branches |
| AppModule | POST | /tenants/isolation/validate | Permission.TENANTS_UPDATE | TenantsController | Assign branch to tenant |
| AppModule | GET | /tenants/configuration/settings | Permission.TENANTS_SECURITY | TenantsController | Validate tenant data isolation scope |
| AppModule | POST | /tenants/configuration/settings | Permission.TENANTS_READ | TenantsController | Get tenant settings |
| AppModule | PATCH | /tenants/configuration/settings/:id | Permission.TENANTS_UPDATE | TenantsController | Create tenant setting |
| AppModule | DELETE | /tenants/configuration/settings/:id | Permission.TENANTS_UPDATE | TenantsController | Update tenant setting |
| AppModule | GET | /tenants/configuration/feature-flags | Permission.TENANTS_DELETE | TenantsController | Soft delete tenant setting |
| AppModule | POST | /tenants/configuration/feature-flags | Permission.TENANTS_READ | TenantsController | Get tenant feature flags |
| AppModule | PATCH | /tenants/configuration/feature-flags/:id | Permission.TENANTS_UPDATE | TenantsController | Create tenant feature flag |
| AppModule | DELETE | /tenants/configuration/feature-flags/:id | Permission.TENANTS_UPDATE | TenantsController | Update tenant feature flag |
| AppModule | GET | /tenants/configuration/localizations | Permission.TENANTS_DELETE | TenantsController | Soft delete tenant feature flag |
| AppModule | POST | /tenants/configuration/localizations | Permission.TENANTS_READ | TenantsController | Get tenant localization profiles |
| AppModule | PATCH | /tenants/configuration/localizations/:id | Permission.TENANTS_UPDATE | TenantsController | Create tenant localization profile |
| AppModule | POST | /tenants/configuration/branding | Permission.TENANTS_UPDATE | TenantsController | Update tenant localization profile |
| AppModule | POST | /tenants/administration/provision | Permission.TENANTS_UPDATE | TenantsController | Create or update tenant branding |
| AppModule | POST | /tenants/administration/:id/activate | Permission.TENANTS_PROVISION | TenantsController | Provision tenant |
| AppModule | POST | /tenants/administration/:id/suspend | Permission.TENANTS_PROVISION | TenantsController | Activate tenant |
| AppModule | POST | /tenants/administration/:id/resume | Permission.TENANTS_PROVISION | TenantsController | Suspend tenant |
| AppModule | POST | /tenants/administration/:id/archive | Permission.TENANTS_PROVISION | TenantsController | Resume tenant |
| AppModule | GET | /tenants/administration/usage-limits | Permission.TENANTS_PROVISION | TenantsController | Archive tenant |
| AppModule | POST | /tenants/administration/usage-limits | Permission.TENANTS_READ | TenantsController | Get tenant usage limits |
| AppModule | PATCH | /tenants/administration/usage-limits/:id | Permission.TENANTS_UPDATE | TenantsController | Create tenant usage limit |
| AppModule | DELETE | /tenants/administration/usage-limits/:id | Permission.TENANTS_UPDATE | TenantsController | Update tenant usage limit |
| AppModule | GET | /tenants/administration/events | Permission.TENANTS_DELETE | TenantsController | Soft delete tenant usage limit |
| AppModule | POST | /tenants/administration/events | Permission.TENANTS_READ | TenantsController | Get tenant provisioning events |
| AppModule | GET | /tenants/security/permission-policies | Permission.TENANTS_PROVISION | TenantsController | Record tenant provisioning event |
| AppModule | POST | /tenants/security/permission-policies | Permission.TENANTS_SECURITY | TenantsController | Get tenant permission policies |
| AppModule | PATCH | /tenants/security/permission-policies/:id | Permission.TENANTS_SECURITY | TenantsController | Create tenant permission policy |
| AppModule | DELETE | /tenants/security/permission-policies/:id | Permission.TENANTS_SECURITY | TenantsController | Update tenant permission policy |
| AppModule | POST | /tenants/security/validate | Permission.TENANTS_SECURITY | TenantsController | Soft delete tenant permission policy |
| AppModule | GET | /tenants/security/audit-events | Permission.TENANTS_SECURITY | TenantsController | Validate tenant security boundary |
| AppModule | POST | /tenants/security/audit-events | Permission.TENANTS_SECURITY | TenantsController | Get tenant audit events |
| AppModule | GET | /users |  | UsersController |  |
| AppModule | GET | /users/:id | Permission.USERS_READ | UsersController | Get all users |
| AppModule | POST | /users | Permission.USERS_READ | UsersController | Get user by id |
| AppModule | PATCH | /users/:id | Permission.USERS_CREATE | UsersController | Create user |
| AppModule | DELETE | /users/:id | Permission.USERS_UPDATE | UsersController | Update user |
| AppModule | GET | /workflows/dashboard |  | WorkflowDashboardController |  |
| AppModule | GET | /workflows/definitions |  | WorkflowDefinitionsController |  |
| AppModule | GET | /workflows/definitions/:id | Permission.WORKFLOWS_READ | WorkflowDefinitionsController | Get all workflow definitions |
| AppModule | POST | /workflows/definitions | Permission.WORKFLOWS_READ | WorkflowDefinitionsController | Get workflow definition by id |
| AppModule | PATCH | /workflows/definitions/:id | Permission.WORKFLOWS_CREATE | WorkflowDefinitionsController | Create workflow definition |
| AppModule | POST | /workflows/definitions/:id/activate | Permission.WORKFLOWS_UPDATE | WorkflowDefinitionsController | Update workflow definition |
| AppModule | POST | /workflows/definitions/:id/archive | Permission.WORKFLOWS_UPDATE | WorkflowDefinitionsController | Activate workflow definition |
| AppModule | POST | /workflows/definitions/:id/steps | Permission.WORKFLOWS_UPDATE | WorkflowDefinitionsController | Archive workflow definition |
| AppModule | PATCH | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE | WorkflowDefinitionsController | Add workflow definition step |
| AppModule | DELETE | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE | WorkflowDefinitionsController | Update workflow definition step |
| AppModule | GET | /workflows/requests |  | WorkflowRuntimeController |  |
| AppModule | GET | /workflows/requests/:id | Permission.WORKFLOWS_READ | WorkflowRuntimeController | Get all workflow requests |
| AppModule | GET | /workflows/requests/:id/history | Permission.WORKFLOWS_READ | WorkflowRuntimeController | Get workflow request by id |
| AppModule | POST | /workflows/requests | Permission.WORKFLOWS_READ | WorkflowRuntimeController | Get workflow request history |
| AppModule | POST | /workflows/requests/:id/steps/:stepId/approve | Permission.WORKFLOWS_CREATE | WorkflowRuntimeController | Submit workflow request |
| AppModule | POST | /workflows/requests/:id/steps/:stepId/reject | Permission.WORKFLOWS_UPDATE | WorkflowRuntimeController | Approve workflow step |
| AppModule | POST | /workflows/requests/:id/cancel | Permission.WORKFLOWS_UPDATE | WorkflowRuntimeController | Reject workflow step |
| AssetItemsModule | GET | /assets |  | AssetsController |  |
| AssetItemsModule | GET | /assets/:id | Permission.ASSETS_READ | AssetsController | Get all assets |
| AssetItemsModule | POST | /assets | Permission.ASSETS_READ | AssetsController | Get asset by id |
| AssetItemsModule | PATCH | /assets/:id | Permission.ASSETS_CREATE | AssetsController | Create asset |
| AssetItemsModule | DELETE | /assets/:id | Permission.ASSETS_UPDATE | AssetsController | Update asset |
| AssetsModule | GET | /assets |  | AssetsController |  |
| AssetsModule | GET | /assets/:id | Permission.ASSETS_READ | AssetsController | Get all assets |
| AssetsModule | POST | /assets | Permission.ASSETS_READ | AssetsController | Get asset by id |
| AssetsModule | PATCH | /assets/:id | Permission.ASSETS_CREATE | AssetsController | Create asset |
| AssetsModule | DELETE | /assets/:id | Permission.ASSETS_UPDATE | AssetsController | Update asset |
| AssetsModule | GET | /assets/assignments |  | AssetAssignmentsController |  |
| AssetsModule | GET | /assets/assignments/:id | Permission.ASSETS_READ | AssetAssignmentsController | Get all asset assignments |
| AssetsModule | POST | /assets/assignments | Permission.ASSETS_READ | AssetAssignmentsController | Get asset assignment by id |
| AssetsModule | POST | /assets/assignments/:id/return | Permission.ASSETS_CREATE | AssetAssignmentsController | Assign asset to employee |
| AssetsModule | POST | /assets/assignments/:id/lost | Permission.ASSETS_UPDATE | AssetAssignmentsController | Return assigned asset |
| AssetsModule | DELETE | /assets/assignments/:id | Permission.ASSETS_UPDATE | AssetAssignmentsController | Mark assigned asset as lost |
| AssetsModule | GET | /assets/categories |  | AssetCategoriesController |  |
| AssetsModule | GET | /assets/categories/:id | Permission.ASSETS_READ | AssetCategoriesController | Get all asset categories |
| AssetsModule | POST | /assets/categories | Permission.ASSETS_READ | AssetCategoriesController | Get asset category by id |
| AssetsModule | PATCH | /assets/categories/:id | Permission.ASSETS_CREATE | AssetCategoriesController | Create asset category |
| AssetsModule | DELETE | /assets/categories/:id | Permission.ASSETS_UPDATE | AssetCategoriesController | Update asset category |
| AssetsModule | GET | /assets/dashboard/summary |  | AssetsDashboardController |  |
| AssetsModule | GET | /assets/maintenance |  | AssetMaintenanceController |  |
| AssetsModule | GET | /assets/maintenance/:id | Permission.ASSETS_READ | AssetMaintenanceController | Get all asset maintenance records |
| AssetsModule | POST | /assets/maintenance | Permission.ASSETS_READ | AssetMaintenanceController | Get asset maintenance by id |
| AssetsModule | PATCH | /assets/maintenance/:id | Permission.ASSETS_CREATE | AssetMaintenanceController | Create asset maintenance record |
| AssetsModule | DELETE | /assets/maintenance/:id | Permission.ASSETS_UPDATE | AssetMaintenanceController | Update asset maintenance record |
| AssetAssignmentsModule | GET | /assets/assignments |  | AssetAssignmentsController |  |
| AssetAssignmentsModule | GET | /assets/assignments/:id | Permission.ASSETS_READ | AssetAssignmentsController | Get all asset assignments |
| AssetAssignmentsModule | POST | /assets/assignments | Permission.ASSETS_READ | AssetAssignmentsController | Get asset assignment by id |
| AssetAssignmentsModule | POST | /assets/assignments/:id/return | Permission.ASSETS_CREATE | AssetAssignmentsController | Assign asset to employee |
| AssetAssignmentsModule | POST | /assets/assignments/:id/lost | Permission.ASSETS_UPDATE | AssetAssignmentsController | Return assigned asset |
| AssetAssignmentsModule | DELETE | /assets/assignments/:id | Permission.ASSETS_UPDATE | AssetAssignmentsController | Mark assigned asset as lost |
| AssetCategoriesModule | GET | /assets/categories |  | AssetCategoriesController |  |
| AssetCategoriesModule | GET | /assets/categories/:id | Permission.ASSETS_READ | AssetCategoriesController | Get all asset categories |
| AssetCategoriesModule | POST | /assets/categories | Permission.ASSETS_READ | AssetCategoriesController | Get asset category by id |
| AssetCategoriesModule | PATCH | /assets/categories/:id | Permission.ASSETS_CREATE | AssetCategoriesController | Create asset category |
| AssetCategoriesModule | DELETE | /assets/categories/:id | Permission.ASSETS_UPDATE | AssetCategoriesController | Update asset category |
| AssetsDashboardModule | GET | /assets/dashboard/summary |  | AssetsDashboardController |  |
| AssetMaintenanceModule | GET | /assets/maintenance |  | AssetMaintenanceController |  |
| AssetMaintenanceModule | GET | /assets/maintenance/:id | Permission.ASSETS_READ | AssetMaintenanceController | Get all asset maintenance records |
| AssetMaintenanceModule | POST | /assets/maintenance | Permission.ASSETS_READ | AssetMaintenanceController | Get asset maintenance by id |
| AssetMaintenanceModule | PATCH | /assets/maintenance/:id | Permission.ASSETS_CREATE | AssetMaintenanceController | Create asset maintenance record |
| AssetMaintenanceModule | DELETE | /assets/maintenance/:id | Permission.ASSETS_UPDATE | AssetMaintenanceController | Update asset maintenance record |
| AttendanceModule | GET | /attendance/holidays |  | HolidaysController |  |
| AttendanceModule | GET | /attendance/holidays/:id | Permission.ATTENDANCE_READ | HolidaysController | Get all holidays |
| AttendanceModule | POST | /attendance/holidays | Permission.ATTENDANCE_READ | HolidaysController | Get holiday by id |
| AttendanceModule | PATCH | /attendance/holidays/:id | Permission.ATTENDANCE_CREATE | HolidaysController | Create holiday |
| AttendanceModule | DELETE | /attendance/holidays/:id | Permission.ATTENDANCE_UPDATE | HolidaysController | Update holiday |
| AttendanceModule | GET | /attendance/records |  | AttendanceRecordsController |  |
| AttendanceModule | GET | /attendance/records/:id | Permission.ATTENDANCE_READ | AttendanceRecordsController | Get all attendance records |
| AttendanceModule | POST | /attendance/records | Permission.ATTENDANCE_READ | AttendanceRecordsController | Get attendance record by id |
| AttendanceModule | PATCH | /attendance/records/:id | Permission.ATTENDANCE_CREATE | AttendanceRecordsController | Create attendance record |
| AttendanceModule | DELETE | /attendance/records/:id | Permission.ATTENDANCE_UPDATE | AttendanceRecordsController | Update attendance record |
| AttendanceModule | GET | /attendance/shifts |  | ShiftsController |  |
| AttendanceModule | GET | /attendance/shifts/:id | Permission.ATTENDANCE_READ | ShiftsController | Get all shifts |
| AttendanceModule | POST | /attendance/shifts | Permission.ATTENDANCE_READ | ShiftsController | Get shift by id |
| AttendanceModule | PATCH | /attendance/shifts/:id | Permission.ATTENDANCE_CREATE | ShiftsController | Create shift |
| AttendanceModule | DELETE | /attendance/shifts/:id | Permission.ATTENDANCE_UPDATE | ShiftsController | Update shift |
| HolidaysModule | GET | /attendance/holidays |  | HolidaysController |  |
| HolidaysModule | GET | /attendance/holidays/:id | Permission.ATTENDANCE_READ | HolidaysController | Get all holidays |
| HolidaysModule | POST | /attendance/holidays | Permission.ATTENDANCE_READ | HolidaysController | Get holiday by id |
| HolidaysModule | PATCH | /attendance/holidays/:id | Permission.ATTENDANCE_CREATE | HolidaysController | Create holiday |
| HolidaysModule | DELETE | /attendance/holidays/:id | Permission.ATTENDANCE_UPDATE | HolidaysController | Update holiday |
| AttendanceRecordsModule | GET | /attendance/records |  | AttendanceRecordsController |  |
| AttendanceRecordsModule | GET | /attendance/records/:id | Permission.ATTENDANCE_READ | AttendanceRecordsController | Get all attendance records |
| AttendanceRecordsModule | POST | /attendance/records | Permission.ATTENDANCE_READ | AttendanceRecordsController | Get attendance record by id |
| AttendanceRecordsModule | PATCH | /attendance/records/:id | Permission.ATTENDANCE_CREATE | AttendanceRecordsController | Create attendance record |
| AttendanceRecordsModule | DELETE | /attendance/records/:id | Permission.ATTENDANCE_UPDATE | AttendanceRecordsController | Update attendance record |
| ShiftsModule | GET | /attendance/shifts |  | ShiftsController |  |
| ShiftsModule | GET | /attendance/shifts/:id | Permission.ATTENDANCE_READ | ShiftsController | Get all shifts |
| ShiftsModule | POST | /attendance/shifts | Permission.ATTENDANCE_READ | ShiftsController | Get shift by id |
| ShiftsModule | PATCH | /attendance/shifts/:id | Permission.ATTENDANCE_CREATE | ShiftsController | Create shift |
| ShiftsModule | DELETE | /attendance/shifts/:id | Permission.ATTENDANCE_UPDATE | ShiftsController | Update shift |
| AuthModule | POST | /auth/login |  | AuthController |  |
| BiModule | GET | /bi/kpis |  | BiController |  |
| BiModule | POST | /bi/kpis | Permission.BI_READ | BiController | List KPI definitions |
| BiModule | PATCH | /bi/kpis/:id | Permission.BI_MANAGE | BiController | Create KPI definition |
| BiModule | POST | /bi/kpis/:id/archive | Permission.BI_MANAGE | BiController | Update KPI definition |
| BiModule | POST | /bi/kpis/:id/snapshots | Permission.BI_MANAGE | BiController | Archive KPI definition |
| BiModule | GET | /bi/kpis/:id/snapshots | Permission.BI_EXECUTE | BiController | Record KPI snapshot |
| BiModule | GET | /bi/datasets | Permission.BI_READ | BiController | List KPI snapshots |
| BiModule | POST | /bi/datasets | Permission.BI_READ | BiController | List analytics datasets |
| BiModule | PATCH | /bi/datasets/:id | Permission.BI_MANAGE | BiController | Create analytics dataset |
| BiModule | POST | /bi/datasets/:id/run | Permission.BI_MANAGE | BiController | Update analytics dataset |
| BiModule | GET | /bi/metrics | Permission.BI_EXECUTE | BiController | Run analytics dataset execution |
| BiModule | POST | /bi/metrics | Permission.BI_READ | BiController | List analytics metrics |
| BiModule | PATCH | /bi/metrics/:id | Permission.BI_MANAGE | BiController | Create analytics metric |
| BiModule | POST | /bi/metrics/:id/observations | Permission.BI_MANAGE | BiController | Update analytics metric |
| BiModule | GET | /bi/dashboards | Permission.BI_EXECUTE | BiController | Record analytics metric observation |
| BiModule | POST | /bi/dashboards | Permission.BI_DASHBOARD | BiController | List BI dashboards |
| BiModule | POST | /bi/dashboards/:id/widgets | Permission.BI_MANAGE | BiController | Create BI dashboard |
| BiModule | GET | /bi/dashboards/executive/summary | Permission.BI_MANAGE | BiController | Add BI dashboard widget |
| BiModule | GET | /bi/kpis/:id/trend | Permission.BI_DASHBOARD | BiController | Get executive dashboard summary |
| BiModule | GET | /bi/metrics/:id/trend | Permission.BI_READ | BiController | Get KPI trend analysis |
| BiModule | GET | /bi/predictions/models | Permission.BI_READ | BiController | Get metric trend analysis |
| BiModule | POST | /bi/predictions/models | Permission.BI_PREDICT | BiController | List BI prediction models |
| BiModule | POST | /bi/predictions/models/:id/run | Permission.BI_PREDICT | BiController | Create BI prediction model |
| BusinessRulesModule | GET | /business-rules/categories |  | BusinessRulesController |  |
| BusinessRulesModule | POST | /business-rules/categories | Permission.BUSINESS_RULES_READ | BusinessRulesController | Get business rule categories |
| BusinessRulesModule | PATCH | /business-rules/categories/:id | Permission.BUSINESS_RULES_CREATE | BusinessRulesController | Create business rule category |
| BusinessRulesModule | DELETE | /business-rules/categories/:id | Permission.BUSINESS_RULES_UPDATE | BusinessRulesController | Update business rule category |
| BusinessRulesModule | POST | /business-rules/categories/:id/restore | Permission.BUSINESS_RULES_DELETE | BusinessRulesController | Soft delete business rule category |
| BusinessRulesModule | GET | /business-rules/executions | Permission.BUSINESS_RULES_UPDATE | BusinessRulesController | Restore business rule category |
| BusinessRulesModule | GET | /business-rules/dashboard | Permission.BUSINESS_RULES_READ | BusinessRulesController | Get business rule execution history |
| BusinessRulesModule | GET | /business-rules | Permission.BUSINESS_RULES_READ | BusinessRulesController | Get business rules dashboard |
| BusinessRulesModule | POST | /business-rules/evaluate | Permission.BUSINESS_RULES_READ | BusinessRulesController | Get business rules |
| BusinessRulesModule | GET | /business-rules/:id/conditions | Permission.BUSINESS_RULES_EXECUTE | BusinessRulesController | Evaluate active business rules |
| BusinessRulesModule | POST | /business-rules/:id/conditions | Permission.BUSINESS_RULES_READ | BusinessRulesController | Get business rule conditions |
| BusinessRulesModule | PATCH | /business-rules/:id/conditions/:conditionId | Permission.BUSINESS_RULES_UPDATE | BusinessRulesController | Create business rule condition |
| BusinessRulesModule | DELETE | /business-rules/:id/conditions/:conditionId | Permission.BUSINESS_RULES_UPDATE | BusinessRulesController | Update business rule condition |
| BusinessRulesModule | GET | /business-rules/:id/actions | Permission.BUSINESS_RULES_DELETE | BusinessRulesController | Soft delete business rule condition |
| BusinessRulesModule | POST | /business-rules/:id/actions | Permission.BUSINESS_RULES_READ | BusinessRulesController | Get business rule actions |
| BusinessRulesModule | PATCH | /business-rules/:id/actions/:actionId | Permission.BUSINESS_RULES_UPDATE | BusinessRulesController | Create business rule action |
| BusinessRulesModule | DELETE | /business-rules/:id/actions/:actionId | Permission.BUSINESS_RULES_UPDATE | BusinessRulesController | Update business rule action |
| BusinessRulesModule | GET | /business-rules/:id | Permission.BUSINESS_RULES_DELETE | BusinessRulesController | Soft delete business rule action |
| BusinessRulesModule | POST | /business-rules | Permission.BUSINESS_RULES_READ | BusinessRulesController | Get business rule by id |
| BusinessRulesModule | PATCH | /business-rules/:id | Permission.BUSINESS_RULES_CREATE | BusinessRulesController | Create business rule |
| BusinessRulesModule | DELETE | /business-rules/:id | Permission.BUSINESS_RULES_UPDATE | BusinessRulesController | Update business rule |
| BusinessRulesModule | POST | /business-rules/:id/restore | Permission.BUSINESS_RULES_DELETE | BusinessRulesController | Soft delete business rule |
| DocumentCategoriesModule | GET | /documents/categories |  | DocumentCategoriesController |  |
| DocumentCategoriesModule | GET | /documents/categories/:id | Permission.DOCUMENTS_READ | DocumentCategoriesController | Get all document categories |
| DocumentCategoriesModule | POST | /documents/categories | Permission.DOCUMENTS_READ | DocumentCategoriesController | Get document category by id |
| DocumentCategoriesModule | PATCH | /documents/categories/:id | Permission.DOCUMENTS_CREATE | DocumentCategoriesController | Create document category |
| DocumentCategoriesModule | DELETE | /documents/categories/:id | Permission.DOCUMENTS_UPDATE | DocumentCategoriesController | Update document category |
| DocumentsDashboardModule | GET | /documents/dashboard/summary |  | DocumentsDashboardController |  |
| DocumentItemsModule | GET | /documents |  | DocumentsController |  |
| DocumentItemsModule | GET | /documents/:id | Permission.DOCUMENTS_READ | DocumentsController | Get all documents |
| DocumentItemsModule | POST | /documents | Permission.DOCUMENTS_READ | DocumentsController | Get document by id |
| DocumentItemsModule | PATCH | /documents/:id | Permission.DOCUMENTS_CREATE | DocumentsController | Create document |
| DocumentItemsModule | POST | /documents/:id/archive | Permission.DOCUMENTS_UPDATE | DocumentsController | Update document |
| DocumentItemsModule | DELETE | /documents/:id | Permission.DOCUMENTS_UPDATE | DocumentsController | Archive document |
| DocumentsModule | GET | /documents/categories |  | DocumentCategoriesController |  |
| DocumentsModule | GET | /documents/categories/:id | Permission.DOCUMENTS_READ | DocumentCategoriesController | Get all document categories |
| DocumentsModule | POST | /documents/categories | Permission.DOCUMENTS_READ | DocumentCategoriesController | Get document category by id |
| DocumentsModule | PATCH | /documents/categories/:id | Permission.DOCUMENTS_CREATE | DocumentCategoriesController | Create document category |
| DocumentsModule | DELETE | /documents/categories/:id | Permission.DOCUMENTS_UPDATE | DocumentCategoriesController | Update document category |
| DocumentsModule | GET | /documents/dashboard/summary |  | DocumentsDashboardController |  |
| DocumentsModule | GET | /documents |  | DocumentsController |  |
| DocumentsModule | GET | /documents/:id | Permission.DOCUMENTS_READ | DocumentsController | Get all documents |
| DocumentsModule | POST | /documents | Permission.DOCUMENTS_READ | DocumentsController | Get document by id |
| DocumentsModule | PATCH | /documents/:id | Permission.DOCUMENTS_CREATE | DocumentsController | Create document |
| DocumentsModule | POST | /documents/:id/archive | Permission.DOCUMENTS_UPDATE | DocumentsController | Update document |
| DocumentsModule | DELETE | /documents/:id | Permission.DOCUMENTS_UPDATE | DocumentsController | Archive document |
| DocumentsModule | POST | /documents/expiration/mark-expired |  | DocumentExpirationController |  |
| DocumentsModule | GET | /documents/expiration/expired | Permission.DOCUMENTS_UPDATE | DocumentExpirationController | Mark expired documents |
| DocumentsModule | GET | /documents/expiration/soon/:days | Permission.DOCUMENTS_READ | DocumentExpirationController | Get expired documents |
| DocumentsModule | GET | /documents/versions |  | DocumentVersionsController |  |
| DocumentsModule | GET | /documents/versions/document/:documentId | Permission.DOCUMENTS_READ | DocumentVersionsController | Get all document versions |
| DocumentsModule | GET | /documents/versions/:id | Permission.DOCUMENTS_READ | DocumentVersionsController | Get versions by document |
| DocumentsModule | POST | /documents/versions | Permission.DOCUMENTS_READ | DocumentVersionsController | Get document version by id |
| DocumentsModule | DELETE | /documents/versions/:id | Permission.DOCUMENTS_CREATE | DocumentVersionsController | Create document version |
| DocumentExpirationModule | POST | /documents/expiration/mark-expired |  | DocumentExpirationController |  |
| DocumentExpirationModule | GET | /documents/expiration/expired | Permission.DOCUMENTS_UPDATE | DocumentExpirationController | Mark expired documents |
| DocumentExpirationModule | GET | /documents/expiration/soon/:days | Permission.DOCUMENTS_READ | DocumentExpirationController | Get expired documents |
| DocumentVersionsModule | GET | /documents/versions |  | DocumentVersionsController |  |
| DocumentVersionsModule | GET | /documents/versions/document/:documentId | Permission.DOCUMENTS_READ | DocumentVersionsController | Get all document versions |
| DocumentVersionsModule | GET | /documents/versions/:id | Permission.DOCUMENTS_READ | DocumentVersionsController | Get versions by document |
| DocumentVersionsModule | POST | /documents/versions | Permission.DOCUMENTS_READ | DocumentVersionsController | Get document version by id |
| DocumentVersionsModule | DELETE | /documents/versions/:id | Permission.DOCUMENTS_CREATE | DocumentVersionsController | Create document version |
| EmployeesModule | GET | /employees |  | EmployeesController |  |
| EmployeesModule | GET | /employees/:id | Permission.EMPLOYEES_READ | EmployeesController | Get all employees |
| EmployeesModule | POST | /employees | Permission.EMPLOYEES_READ | EmployeesController | Get employee by id |
| EmployeesModule | PATCH | /employees/:id | Permission.EMPLOYEES_CREATE | EmployeesController | Create employee |
| EmployeesModule | DELETE | /employees/:id | Permission.EMPLOYEES_UPDATE | EmployeesController | Update employee |
| EssModule | GET | /ess/requests |  | SelfServiceRequestsController |  |
| EssModule | GET | /ess/requests/employee/:employeeId | Permission.ESS_READ | SelfServiceRequestsController | Get all self-service requests |
| EssModule | GET | /ess/requests/:id | Permission.ESS_READ | SelfServiceRequestsController | Get requests by employee |
| EssModule | POST | /ess/requests | Permission.ESS_READ | SelfServiceRequestsController | Get self-service request by id |
| EssModule | PATCH | /ess/requests/:id | Permission.ESS_CREATE | SelfServiceRequestsController | Create self-service request |
| EssModule | POST | /ess/requests/:id/submit | Permission.ESS_UPDATE | SelfServiceRequestsController | Update draft self-service request |
| EssModule | POST | /ess/requests/:id/review | Permission.ESS_UPDATE | SelfServiceRequestsController | Submit self-service request |
| EssModule | DELETE | /ess/requests/:id | Permission.ESS_UPDATE | SelfServiceRequestsController | Review self-service request |
| SelfServiceRequestsModule | GET | /ess/requests |  | SelfServiceRequestsController |  |
| SelfServiceRequestsModule | GET | /ess/requests/employee/:employeeId | Permission.ESS_READ | SelfServiceRequestsController | Get all self-service requests |
| SelfServiceRequestsModule | GET | /ess/requests/:id | Permission.ESS_READ | SelfServiceRequestsController | Get requests by employee |
| SelfServiceRequestsModule | POST | /ess/requests | Permission.ESS_READ | SelfServiceRequestsController | Get self-service request by id |
| SelfServiceRequestsModule | PATCH | /ess/requests/:id | Permission.ESS_CREATE | SelfServiceRequestsController | Create self-service request |
| SelfServiceRequestsModule | POST | /ess/requests/:id/submit | Permission.ESS_UPDATE | SelfServiceRequestsController | Update draft self-service request |
| SelfServiceRequestsModule | POST | /ess/requests/:id/review | Permission.ESS_UPDATE | SelfServiceRequestsController | Submit self-service request |
| SelfServiceRequestsModule | DELETE | /ess/requests/:id | Permission.ESS_UPDATE | SelfServiceRequestsController | Review self-service request |
| IntegrationsModule | GET | /integrations/providers |  | IntegrationsController |  |
| IntegrationsModule | POST | /integrations/providers | Permission.INTEGRATIONS_READ | IntegrationsController | Get integration providers |
| IntegrationsModule | PATCH | /integrations/providers/:id | Permission.INTEGRATIONS_CREATE | IntegrationsController | Create integration provider |
| IntegrationsModule | DELETE | /integrations/providers/:id | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Update integration provider |
| IntegrationsModule | POST | /integrations/providers/:id/restore | Permission.INTEGRATIONS_DELETE | IntegrationsController | Soft delete integration provider |
| IntegrationsModule | POST | /integrations/providers/:id/enable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Restore integration provider |
| IntegrationsModule | POST | /integrations/providers/:id/disable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Enable integration provider |
| IntegrationsModule | GET | /integrations/credentials | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Disable integration provider |
| IntegrationsModule | POST | /integrations/credentials | Permission.INTEGRATIONS_READ | IntegrationsController | Get integration credentials |
| IntegrationsModule | PATCH | /integrations/credentials/:id | Permission.INTEGRATIONS_CREATE | IntegrationsController | Create integration credential |
| IntegrationsModule | DELETE | /integrations/credentials/:id | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Update integration credential |
| IntegrationsModule | POST | /integrations/credentials/:id/restore | Permission.INTEGRATIONS_DELETE | IntegrationsController | Soft delete integration credential |
| IntegrationsModule | POST | /integrations/credentials/:id/enable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Restore integration credential |
| IntegrationsModule | POST | /integrations/credentials/:id/disable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Enable integration credential |
| IntegrationsModule | GET | /integrations/connections | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Disable integration credential |
| IntegrationsModule | POST | /integrations/connections | Permission.INTEGRATIONS_READ | IntegrationsController | Get integration connections |
| IntegrationsModule | PATCH | /integrations/connections/:id | Permission.INTEGRATIONS_CREATE | IntegrationsController | Create integration connection |
| IntegrationsModule | DELETE | /integrations/connections/:id | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Update integration connection |
| IntegrationsModule | POST | /integrations/connections/:id/restore | Permission.INTEGRATIONS_DELETE | IntegrationsController | Soft delete integration connection |
| IntegrationsModule | POST | /integrations/connections/:id/test | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Restore integration connection |
| IntegrationsModule | POST | /integrations/connections/:id/connect | Permission.INTEGRATIONS_EXECUTE | IntegrationsController | Test integration connection |
| IntegrationsModule | POST | /integrations/connections/:id/disconnect | Permission.INTEGRATIONS_EXECUTE | IntegrationsController | Connect integration connection |
| IntegrationsModule | POST | /integrations/connections/:id/enable | Permission.INTEGRATIONS_EXECUTE | IntegrationsController | Disconnect integration connection |
| IntegrationsModule | POST | /integrations/connections/:id/disable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Enable integration connection |
| IntegrationsModule | GET | /integrations/retry-policies | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Disable integration connection |
| IntegrationsModule | POST | /integrations/retry-policies | Permission.INTEGRATIONS_READ | IntegrationsController | Get integration retry policies |
| IntegrationsModule | PATCH | /integrations/retry-policies/:id | Permission.INTEGRATIONS_CREATE | IntegrationsController | Create integration retry policy |
| IntegrationsModule | DELETE | /integrations/retry-policies/:id | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Update integration retry policy |
| IntegrationsModule | POST | /integrations/retry-policies/:id/restore | Permission.INTEGRATIONS_DELETE | IntegrationsController | Soft delete integration retry policy |
| IntegrationsModule | POST | /integrations/retry-policies/:id/enable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Restore integration retry policy |
| IntegrationsModule | POST | /integrations/retry-policies/:id/disable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Enable integration retry policy |
| IntegrationsModule | GET | /integrations/webhooks | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Disable integration retry policy |
| IntegrationsModule | POST | /integrations/webhooks | Permission.INTEGRATIONS_READ | IntegrationsController | Get outbound webhooks |
| IntegrationsModule | PATCH | /integrations/webhooks/:id | Permission.INTEGRATIONS_CREATE | IntegrationsController | Create outbound webhook |
| IntegrationsModule | DELETE | /integrations/webhooks/:id | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Update outbound webhook |
| IntegrationsModule | POST | /integrations/webhooks/:id/restore | Permission.INTEGRATIONS_DELETE | IntegrationsController | Soft delete outbound webhook |
| IntegrationsModule | POST | /integrations/webhooks/:id/enable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Restore outbound webhook |
| IntegrationsModule | POST | /integrations/webhooks/:id/disable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Enable outbound webhook |
| IntegrationsModule | GET | /integrations/rest-connectors | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Disable outbound webhook |
| IntegrationsModule | POST | /integrations/rest-connectors | Permission.INTEGRATIONS_READ | IntegrationsController | Get REST connectors |
| IntegrationsModule | PATCH | /integrations/rest-connectors/:id | Permission.INTEGRATIONS_CREATE | IntegrationsController | Create REST connector |
| IntegrationsModule | DELETE | /integrations/rest-connectors/:id | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Update REST connector |
| IntegrationsModule | POST | /integrations/rest-connectors/:id/restore | Permission.INTEGRATIONS_DELETE | IntegrationsController | Soft delete REST connector |
| IntegrationsModule | POST | /integrations/rest-connectors/:id/enable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Restore REST connector |
| IntegrationsModule | POST | /integrations/rest-connectors/:id/disable | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Enable REST connector |
| IntegrationsModule | GET | /integrations/outbound-jobs | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Disable REST connector |
| IntegrationsModule | POST | /integrations/outbound-jobs | Permission.INTEGRATIONS_MONITOR | IntegrationsController | Get outbound integration jobs |
| IntegrationsModule | POST | /integrations/outbound-jobs/process-due | Permission.INTEGRATIONS_EXECUTE | IntegrationsController | Queue outbound integration job |
| IntegrationsModule | POST | /integrations/outbound-jobs/:id/execute | Permission.INTEGRATIONS_EXECUTE | IntegrationsController | Process due outbound integration jobs |
| IntegrationsModule | POST | /integrations/outbound-jobs/:id/retry | Permission.INTEGRATIONS_EXECUTE | IntegrationsController | Execute outbound integration job |
| IntegrationsModule | POST | /integrations/outbound-jobs/:id/cancel | Permission.INTEGRATIONS_EXECUTE | IntegrationsController | Retry failed outbound integration job |
| IntegrationsModule | POST | /integrations/inbound/:connectionId/webhook | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Cancel outbound integration job |
| IntegrationsModule | GET | /integrations/inbound-events | Permission.INTEGRATIONS_UPDATE | IntegrationsController | Receive inbound integration webhook |
| IntegrationsModule | GET | /integrations/executions | Permission.INTEGRATIONS_MONITOR | IntegrationsController | Get inbound integration events |
| IntegrationsModule | GET | /integrations/dashboard | Permission.INTEGRATIONS_MONITOR | IntegrationsController | Get integration execution history |
| IntegrationsModule | GET | /integrations/retry-history | Permission.INTEGRATIONS_MONITOR | IntegrationsController | Get integration monitoring dashboard |
| IntegrationsModule | GET | /integrations/health | Permission.INTEGRATIONS_MONITOR | IntegrationsController | Get integration retry history |
| IntegrationsModule | POST | /integrations/connections/:id/health-check | Permission.INTEGRATIONS_MONITOR | IntegrationsController | Get integration health snapshots |
| LeaveBalancesModule | GET | /leave/balances |  | LeaveBalancesController |  |
| LeaveBalancesModule | GET | /leave/balances/:id | Permission.LEAVE_READ | LeaveBalancesController | Get all records |
| LeaveBalancesModule | POST | /leave/balances | Permission.LEAVE_READ | LeaveBalancesController | Get record by id |
| LeaveBalancesModule | PATCH | /leave/balances/:id | Permission.LEAVE_CREATE | LeaveBalancesController | Create record |
| LeaveBalancesModule | DELETE | /leave/balances/:id | Permission.LEAVE_UPDATE | LeaveBalancesController | Update record |
| LeaveRequestsModule | GET | /leave/requests |  | LeaveRequestsController |  |
| LeaveRequestsModule | GET | /leave/requests/:id | Permission.LEAVE_READ | LeaveRequestsController | Get all records |
| LeaveRequestsModule | POST | /leave/requests | Permission.LEAVE_READ | LeaveRequestsController | Get record by id |
| LeaveRequestsModule | PATCH | /leave/requests/:id | Permission.LEAVE_CREATE | LeaveRequestsController | Create record |
| LeaveRequestsModule | DELETE | /leave/requests/:id | Permission.LEAVE_UPDATE | LeaveRequestsController | Update record |
| LeaveTypesModule | GET | /leave/types |  | LeaveTypesController |  |
| LeaveTypesModule | GET | /leave/types/:id | Permission.LEAVE_READ | LeaveTypesController | Get all records |
| LeaveTypesModule | POST | /leave/types | Permission.LEAVE_READ | LeaveTypesController | Get record by id |
| LeaveTypesModule | PATCH | /leave/types/:id | Permission.LEAVE_CREATE | LeaveTypesController | Create record |
| LeaveTypesModule | DELETE | /leave/types/:id | Permission.LEAVE_UPDATE | LeaveTypesController | Update record |
| LeaveModule | GET | /leave/balances |  | LeaveBalancesController |  |
| LeaveModule | GET | /leave/balances/:id | Permission.LEAVE_READ | LeaveBalancesController | Get all records |
| LeaveModule | POST | /leave/balances | Permission.LEAVE_READ | LeaveBalancesController | Get record by id |
| LeaveModule | PATCH | /leave/balances/:id | Permission.LEAVE_CREATE | LeaveBalancesController | Create record |
| LeaveModule | DELETE | /leave/balances/:id | Permission.LEAVE_UPDATE | LeaveBalancesController | Update record |
| LeaveModule | GET | /leave/requests |  | LeaveRequestsController |  |
| LeaveModule | GET | /leave/requests/:id | Permission.LEAVE_READ | LeaveRequestsController | Get all records |
| LeaveModule | POST | /leave/requests | Permission.LEAVE_READ | LeaveRequestsController | Get record by id |
| LeaveModule | PATCH | /leave/requests/:id | Permission.LEAVE_CREATE | LeaveRequestsController | Create record |
| LeaveModule | DELETE | /leave/requests/:id | Permission.LEAVE_UPDATE | LeaveRequestsController | Update record |
| LeaveModule | GET | /leave/types |  | LeaveTypesController |  |
| LeaveModule | GET | /leave/types/:id | Permission.LEAVE_READ | LeaveTypesController | Get all records |
| LeaveModule | POST | /leave/types | Permission.LEAVE_READ | LeaveTypesController | Get record by id |
| LeaveModule | PATCH | /leave/types/:id | Permission.LEAVE_CREATE | LeaveTypesController | Create record |
| LeaveModule | DELETE | /leave/types/:id | Permission.LEAVE_UPDATE | LeaveTypesController | Update record |
| MobileModule | POST | /mobile/auth/login |  | MobileController |  |
| MobileModule | POST | /mobile/auth/refresh |  | MobileController | Authenticate mobile user and create session |
| MobileModule | POST | /mobile/auth/logout |  | MobileController | Refresh mobile access token |
| MobileModule | GET | /mobile/bootstrap | Permission.MOBILE_ACCESS | MobileController | Logout mobile session |
| MobileModule | POST | /mobile/devices/register | Permission.MOBILE_ACCESS | MobileController | Get mobile bootstrap payload |
| MobileModule | GET | /mobile/devices | Permission.MOBILE_ACCESS | MobileController | Register or update current mobile device |
| MobileModule | PATCH | /mobile/devices/:id | Permission.MOBILE_READ | MobileController | List registered mobile devices |
| MobileModule | POST | /mobile/devices/:id/revoke | Permission.MOBILE_MANAGE | MobileController | Update mobile device |
| MobileModule | GET | /mobile/sessions | Permission.MOBILE_MANAGE | MobileController | Revoke mobile device and active sessions |
| MobileModule | POST | /mobile/sessions/:id/revoke | Permission.MOBILE_SESSIONS | MobileController | List mobile sessions |
| MobileModule | POST | /mobile/push/notifications | Permission.MOBILE_SESSIONS | MobileController | Revoke mobile session |
| MobileModule | GET | /mobile/push/notifications | Permission.MOBILE_PUSH | MobileController | Create mobile push notification outbox record |
| MobileModule | PATCH | /mobile/push/notifications/:id | Permission.MOBILE_PUSH | MobileController | List mobile push notifications |
| MobileModule | POST | /mobile/sync/pull | Permission.MOBILE_PUSH | MobileController | Update mobile push notification status |
| MobileModule | POST | /mobile/sync/changes | Permission.MOBILE_SYNC | MobileController | Pull offline sync changes |
| MobileModule | GET | /mobile/sync/changes | Permission.MOBILE_SYNC | MobileController | Create mobile sync change record |
| NotificationDashboardModule | GET | /notifications/dashboard |  | NotificationDashboardController |  |
| NotificationsModule | GET | /notifications/dashboard |  | NotificationDashboardController |  |
| NotificationsModule | POST | /notifications/jobs/scheduled |  | NotificationJobsController |  |
| NotificationsModule | POST | /notifications/jobs/retry-failed | Permission.NOTIFICATIONS_UPDATE | NotificationJobsController | Run scheduled notification delivery job |
| NotificationsModule | POST | /notifications/jobs/expire-workflows | Permission.NOTIFICATIONS_UPDATE | NotificationJobsController | Run failed notification retry job |
| NotificationsModule | POST | /notifications/jobs/cleanup | Permission.WORKFLOWS_UPDATE | NotificationJobsController | Expire stale workflow requests |
| NotificationsModule | POST | /notifications/jobs/maintenance | Permission.NOTIFICATIONS_DELETE | NotificationJobsController | Cleanup old delivered notifications |
| NotificationsModule | GET | /notifications |  | NotificationsController |  |
| NotificationsModule | GET | /notifications/employee/:employeeId | Permission.NOTIFICATIONS_READ | NotificationsController | Get all notifications |
| NotificationsModule | GET | /notifications/:id | Permission.NOTIFICATIONS_READ | NotificationsController | Get notifications by employee |
| NotificationsModule | POST | /notifications | Permission.NOTIFICATIONS_READ | NotificationsController | Get notification by id |
| NotificationsModule | PATCH | /notifications/:id | Permission.NOTIFICATIONS_CREATE | NotificationsController | Create notification |
| NotificationsModule | POST | /notifications/:id/read | Permission.NOTIFICATIONS_UPDATE | NotificationsController | Update notification |
| NotificationsModule | POST | /notifications/:id/sent | Permission.NOTIFICATIONS_UPDATE | NotificationsController | Mark notification as read |
| NotificationsModule | POST | /notifications/:id/cancel | Permission.NOTIFICATIONS_UPDATE | NotificationsController | Mark notification as sent |
| NotificationsModule | POST | /notifications/queue/process | Permission.NOTIFICATIONS_UPDATE | NotificationsController | Cancel notification |
| NotificationsModule | POST | /notifications/queue/retry-failed | Permission.NOTIFICATIONS_UPDATE | NotificationsController | Process queued notifications |
| NotificationsModule | DELETE | /notifications/:id | Permission.NOTIFICATIONS_UPDATE | NotificationsController | Retry failed notifications |
| ObservabilityModule | GET | /observability/health/providers |  | ObservabilityController |  |
| ObservabilityModule | POST | /observability/health/providers | Permission.OBSERVABILITY_READ | ObservabilityController | Get health providers |
| ObservabilityModule | PATCH | /observability/health/providers/:id | Permission.OBSERVABILITY_CREATE | ObservabilityController | Create health provider |
| ObservabilityModule | DELETE | /observability/health/providers/:id | Permission.OBSERVABILITY_UPDATE | ObservabilityController | Update health provider |
| ObservabilityModule | POST | /observability/health/providers/:id/run | Permission.OBSERVABILITY_DELETE | ObservabilityController | Soft delete health provider |
| ObservabilityModule | POST | /observability/health/liveness | Permission.OBSERVABILITY_ADMIN | ObservabilityController | Run a health provider check |
| ObservabilityModule | POST | /observability/health/readiness | Permission.OBSERVABILITY_READ | ObservabilityController | Run liveness checks |
| ObservabilityModule | GET | /observability/health/results | Permission.OBSERVABILITY_READ | ObservabilityController | Run readiness checks |
| ObservabilityModule | GET | /observability/metrics/definitions | Permission.OBSERVABILITY_READ | ObservabilityController | Get health check results |
| ObservabilityModule | POST | /observability/metrics/definitions | Permission.OBSERVABILITY_READ | ObservabilityController | Get metric definitions |
| ObservabilityModule | PATCH | /observability/metrics/definitions/:id | Permission.OBSERVABILITY_CREATE | ObservabilityController | Create metric definition |
| ObservabilityModule | DELETE | /observability/metrics/definitions/:id | Permission.OBSERVABILITY_UPDATE | ObservabilityController | Update metric definition |
| ObservabilityModule | GET | /observability/metrics/samples | Permission.OBSERVABILITY_DELETE | ObservabilityController | Soft delete metric definition |
| ObservabilityModule | POST | /observability/metrics/samples | Permission.OBSERVABILITY_READ | ObservabilityController | Get metric samples |
| ObservabilityModule | GET | /observability/metrics/http | Permission.OBSERVABILITY_CREATE | ObservabilityController | Record metric sample |
| ObservabilityModule | GET | /observability/metrics/database | Permission.OBSERVABILITY_READ | ObservabilityController | Get HTTP metrics summary |
| ObservabilityModule | GET | /observability/metrics/workflow | Permission.OBSERVABILITY_READ | ObservabilityController | Get database metrics summary |
| ObservabilityModule | GET | /observability/metrics/payroll | Permission.OBSERVABILITY_READ | ObservabilityController | Get workflow metrics summary |
| ObservabilityModule | GET | /observability/metrics/business-rules | Permission.OBSERVABILITY_READ | ObservabilityController | Get payroll metrics summary |
| ObservabilityModule | GET | /observability/logs | Permission.OBSERVABILITY_READ | ObservabilityController | Get business rules metrics summary |
| ObservabilityModule | POST | /observability/logs | Permission.OBSERVABILITY_READ | ObservabilityController | Get structured log entries |
| ObservabilityModule | GET | /observability/logs/summary | Permission.OBSERVABILITY_CREATE | ObservabilityController | Record structured log entry |
| ObservabilityModule | GET | /observability/traces | Permission.OBSERVABILITY_READ | ObservabilityController | Get log level summary |
| ObservabilityModule | POST | /observability/traces | Permission.OBSERVABILITY_READ | ObservabilityController | Get distributed traces |
| ObservabilityModule | GET | /observability/traces/spans | Permission.OBSERVABILITY_CREATE | ObservabilityController | Start distributed trace |
| ObservabilityModule | POST | /observability/traces/spans | Permission.OBSERVABILITY_READ | ObservabilityController | Get distributed trace spans |
| ObservabilityModule | GET | /observability/traces/requests | Permission.OBSERVABILITY_CREATE | ObservabilityController | Record distributed trace span |
| ObservabilityModule | GET | /observability/traces/services | Permission.OBSERVABILITY_READ | ObservabilityController | Get request tracing summary |
| ObservabilityModule | GET | /observability/traces/database | Permission.OBSERVABILITY_READ | ObservabilityController | Get service tracing summary |
| ObservabilityModule | GET | /observability/traces/external-providers | Permission.OBSERVABILITY_READ | ObservabilityController | Get database timing summary |
| ObservabilityModule | GET | /observability/management/status | Permission.OBSERVABILITY_READ | ObservabilityController | Get external provider timing summary |
| ObservabilityModule | GET | /observability/management/diagnostics | Permission.OBSERVABILITY_ADMIN | ObservabilityController | Get system observability status |
| ObservabilityModule | GET | /observability/management/metrics | Permission.OBSERVABILITY_ADMIN | ObservabilityController | Get system diagnostics |
| ObservabilityModule | GET | /observability/management/health | Permission.OBSERVABILITY_ADMIN | ObservabilityController | Get management metrics overview |
| BranchesModule | GET | /organization/branches |  | BranchesController |  |
| BranchesModule | GET | /organization/branches/:id | Permission.ORGANIZATION_READ | BranchesController | Get all branches |
| BranchesModule | POST | /organization/branches | Permission.ORGANIZATION_READ | BranchesController | Get branches by id |
| BranchesModule | PATCH | /organization/branches/:id | Permission.ORGANIZATION_CREATE | BranchesController | Create branches |
| BranchesModule | DELETE | /organization/branches/:id | Permission.ORGANIZATION_UPDATE | BranchesController | Update branches |
| CompaniesModule | GET | /organization/companies |  | CompaniesController |  |
| CompaniesModule | GET | /organization/companies/:id | Permission.ORGANIZATION_READ | CompaniesController | Get all companies |
| CompaniesModule | POST | /organization/companies | Permission.ORGANIZATION_READ | CompaniesController | Get company by id |
| CompaniesModule | PATCH | /organization/companies/:id | Permission.ORGANIZATION_CREATE | CompaniesController | Create company |
| CompaniesModule | DELETE | /organization/companies/:id | Permission.ORGANIZATION_UPDATE | CompaniesController | Update company |
| CostCentersModule | GET | /organization/cost-centers |  | CostCentersController |  |
| CostCentersModule | GET | /organization/cost-centers/:id | Permission.ORGANIZATION_READ | CostCentersController | Get all cost centers |
| CostCentersModule | POST | /organization/cost-centers | Permission.ORGANIZATION_READ | CostCentersController | Get cost centers by id |
| CostCentersModule | PATCH | /organization/cost-centers/:id | Permission.ORGANIZATION_CREATE | CostCentersController | Create cost centers |
| CostCentersModule | DELETE | /organization/cost-centers/:id | Permission.ORGANIZATION_UPDATE | CostCentersController | Update cost centers |
| DepartmentsModule | GET | /organization/departments |  | DepartmentsController |  |
| DepartmentsModule | GET | /organization/departments/:id | Permission.ORGANIZATION_READ | DepartmentsController | Get all departments |
| DepartmentsModule | POST | /organization/departments | Permission.ORGANIZATION_READ | DepartmentsController | Get departments by id |
| DepartmentsModule | PATCH | /organization/departments/:id | Permission.ORGANIZATION_CREATE | DepartmentsController | Create departments |
| DepartmentsModule | DELETE | /organization/departments/:id | Permission.ORGANIZATION_UPDATE | DepartmentsController | Update departments |
| OrganizationModule | GET | /organization/branches |  | BranchesController |  |
| OrganizationModule | GET | /organization/branches/:id | Permission.ORGANIZATION_READ | BranchesController | Get all branches |
| OrganizationModule | POST | /organization/branches | Permission.ORGANIZATION_READ | BranchesController | Get branches by id |
| OrganizationModule | PATCH | /organization/branches/:id | Permission.ORGANIZATION_CREATE | BranchesController | Create branches |
| OrganizationModule | DELETE | /organization/branches/:id | Permission.ORGANIZATION_UPDATE | BranchesController | Update branches |
| OrganizationModule | GET | /organization/companies |  | CompaniesController |  |
| OrganizationModule | GET | /organization/companies/:id | Permission.ORGANIZATION_READ | CompaniesController | Get all companies |
| OrganizationModule | POST | /organization/companies | Permission.ORGANIZATION_READ | CompaniesController | Get company by id |
| OrganizationModule | PATCH | /organization/companies/:id | Permission.ORGANIZATION_CREATE | CompaniesController | Create company |
| OrganizationModule | DELETE | /organization/companies/:id | Permission.ORGANIZATION_UPDATE | CompaniesController | Update company |
| OrganizationModule | GET | /organization/cost-centers |  | CostCentersController |  |
| OrganizationModule | GET | /organization/cost-centers/:id | Permission.ORGANIZATION_READ | CostCentersController | Get all cost centers |
| OrganizationModule | POST | /organization/cost-centers | Permission.ORGANIZATION_READ | CostCentersController | Get cost centers by id |
| OrganizationModule | PATCH | /organization/cost-centers/:id | Permission.ORGANIZATION_CREATE | CostCentersController | Create cost centers |
| OrganizationModule | DELETE | /organization/cost-centers/:id | Permission.ORGANIZATION_UPDATE | CostCentersController | Update cost centers |
| OrganizationModule | GET | /organization/departments |  | DepartmentsController |  |
| OrganizationModule | GET | /organization/departments/:id | Permission.ORGANIZATION_READ | DepartmentsController | Get all departments |
| OrganizationModule | POST | /organization/departments | Permission.ORGANIZATION_READ | DepartmentsController | Get departments by id |
| OrganizationModule | PATCH | /organization/departments/:id | Permission.ORGANIZATION_CREATE | DepartmentsController | Create departments |
| OrganizationModule | DELETE | /organization/departments/:id | Permission.ORGANIZATION_UPDATE | DepartmentsController | Update departments |
| OrganizationModule | GET | /organization/positions |  | PositionsController |  |
| OrganizationModule | GET | /organization/positions/:id | Permission.ORGANIZATION_READ | PositionsController | Get all positions |
| OrganizationModule | POST | /organization/positions | Permission.ORGANIZATION_READ | PositionsController | Get positions by id |
| OrganizationModule | PATCH | /organization/positions/:id | Permission.ORGANIZATION_CREATE | PositionsController | Create positions |
| OrganizationModule | DELETE | /organization/positions/:id | Permission.ORGANIZATION_UPDATE | PositionsController | Update positions |
| PositionsModule | GET | /organization/positions |  | PositionsController |  |
| PositionsModule | GET | /organization/positions/:id | Permission.ORGANIZATION_READ | PositionsController | Get all positions |
| PositionsModule | POST | /organization/positions | Permission.ORGANIZATION_READ | PositionsController | Get positions by id |
| PositionsModule | PATCH | /organization/positions/:id | Permission.ORGANIZATION_CREATE | PositionsController | Create positions |
| PositionsModule | DELETE | /organization/positions/:id | Permission.ORGANIZATION_UPDATE | PositionsController | Update positions |
| PayrollApprovalModule | POST | /payroll/runs/:id/review |  | PayrollApprovalController |  |
| PayrollApprovalModule | POST | /payroll/runs/:id/approve | Permission.PAYROLL_UPDATE | PayrollApprovalController | Submit payroll run for review |
| PayrollApprovalModule | POST | /payroll/runs/:id/reject | Permission.PAYROLL_UPDATE | PayrollApprovalController | Approve payroll run |
| PayrollApprovalModule | POST | /payroll/runs/:id/lock | Permission.PAYROLL_UPDATE | PayrollApprovalController | Reject payroll run |
| PayrollAttendanceModule | POST | /payroll/attendance/apply |  | PayrollAttendanceController |  |
| PayrollCalculationModule | POST | /payroll/calculation/preview |  | PayrollCalculationController |  |
| PayrollCalculationModule | POST | /payroll/calculation/calculate | Permission.PAYROLL_READ | PayrollCalculationController | Preview payroll calculations |
| PayrollItemsModule | GET | /payroll/items |  | PayrollItemsController |  |
| PayrollItemsModule | GET | /payroll/items/run/:payrollRunId | Permission.PAYROLL_READ | PayrollItemsController | Get all payroll items |
| PayrollItemsModule | GET | /payroll/items/:id | Permission.PAYROLL_READ | PayrollItemsController | Get payroll items by run |
| PayrollItemsModule | POST | /payroll/items | Permission.PAYROLL_READ | PayrollItemsController | Get payroll item by id |
| PayrollItemsModule | PATCH | /payroll/items/:id | Permission.PAYROLL_CREATE | PayrollItemsController | Create payroll item |
| PayrollItemsModule | DELETE | /payroll/items/:id | Permission.PAYROLL_UPDATE | PayrollItemsController | Update payroll item |
| PayrollPeriodsModule | GET | /payroll/periods |  | PayrollPeriodsController |  |
| PayrollPeriodsModule | GET | /payroll/periods/:id | Permission.PAYROLL_READ | PayrollPeriodsController | Get all payroll periods |
| PayrollPeriodsModule | POST | /payroll/periods | Permission.PAYROLL_READ | PayrollPeriodsController | Get payroll period by id |
| PayrollPeriodsModule | PATCH | /payroll/periods/:id | Permission.PAYROLL_CREATE | PayrollPeriodsController | Create payroll period |
| PayrollPeriodsModule | DELETE | /payroll/periods/:id | Permission.PAYROLL_UPDATE | PayrollPeriodsController | Update payroll period |
| PayrollProfilesModule | GET | /payroll/profiles |  | PayrollProfilesController |  |
| PayrollProfilesModule | GET | /payroll/profiles/:id | Permission.PAYROLL_READ | PayrollProfilesController | Get all records |
| PayrollProfilesModule | POST | /payroll/profiles | Permission.PAYROLL_READ | PayrollProfilesController | Get record by id |
| PayrollProfilesModule | PATCH | /payroll/profiles/:id | Permission.PAYROLL_CREATE | PayrollProfilesController | Create record |
| PayrollProfilesModule | DELETE | /payroll/profiles/:id | Permission.PAYROLL_UPDATE | PayrollProfilesController | Update record |
| PayrollRunsModule | GET | /payroll/runs |  | PayrollRunsController |  |
| PayrollRunsModule | GET | /payroll/runs/:id | Permission.PAYROLL_READ | PayrollRunsController | Get all records |
| PayrollRunsModule | POST | /payroll/runs | Permission.PAYROLL_READ | PayrollRunsController | Get record by id |
| PayrollRunsModule | PATCH | /payroll/runs/:id | Permission.PAYROLL_CREATE | PayrollRunsController | Create record |
| PayrollRunsModule | DELETE | /payroll/runs/:id | Permission.PAYROLL_UPDATE | PayrollRunsController | Update record |
| PayrollModule | POST | /payroll/runs/:id/review |  | PayrollApprovalController |  |
| PayrollModule | POST | /payroll/runs/:id/approve | Permission.PAYROLL_UPDATE | PayrollApprovalController | Submit payroll run for review |
| PayrollModule | POST | /payroll/runs/:id/reject | Permission.PAYROLL_UPDATE | PayrollApprovalController | Approve payroll run |
| PayrollModule | POST | /payroll/runs/:id/lock | Permission.PAYROLL_UPDATE | PayrollApprovalController | Reject payroll run |
| PayrollModule | POST | /payroll/attendance/apply |  | PayrollAttendanceController |  |
| PayrollModule | POST | /payroll/calculation/preview |  | PayrollCalculationController |  |
| PayrollModule | POST | /payroll/calculation/calculate | Permission.PAYROLL_READ | PayrollCalculationController | Preview payroll calculations |
| PayrollModule | GET | /payroll/items |  | PayrollItemsController |  |
| PayrollModule | GET | /payroll/items/run/:payrollRunId | Permission.PAYROLL_READ | PayrollItemsController | Get all payroll items |
| PayrollModule | GET | /payroll/items/:id | Permission.PAYROLL_READ | PayrollItemsController | Get payroll items by run |
| PayrollModule | POST | /payroll/items | Permission.PAYROLL_READ | PayrollItemsController | Get payroll item by id |
| PayrollModule | PATCH | /payroll/items/:id | Permission.PAYROLL_CREATE | PayrollItemsController | Create payroll item |
| PayrollModule | DELETE | /payroll/items/:id | Permission.PAYROLL_UPDATE | PayrollItemsController | Update payroll item |
| PayrollModule | GET | /payroll/periods |  | PayrollPeriodsController |  |
| PayrollModule | GET | /payroll/periods/:id | Permission.PAYROLL_READ | PayrollPeriodsController | Get all payroll periods |
| PayrollModule | POST | /payroll/periods | Permission.PAYROLL_READ | PayrollPeriodsController | Get payroll period by id |
| PayrollModule | PATCH | /payroll/periods/:id | Permission.PAYROLL_CREATE | PayrollPeriodsController | Create payroll period |
| PayrollModule | DELETE | /payroll/periods/:id | Permission.PAYROLL_UPDATE | PayrollPeriodsController | Update payroll period |
| PayrollModule | GET | /payroll/profiles |  | PayrollProfilesController |  |
| PayrollModule | GET | /payroll/profiles/:id | Permission.PAYROLL_READ | PayrollProfilesController | Get all records |
| PayrollModule | POST | /payroll/profiles | Permission.PAYROLL_READ | PayrollProfilesController | Get record by id |
| PayrollModule | PATCH | /payroll/profiles/:id | Permission.PAYROLL_CREATE | PayrollProfilesController | Create record |
| PayrollModule | DELETE | /payroll/profiles/:id | Permission.PAYROLL_UPDATE | PayrollProfilesController | Update record |
| PayrollModule | GET | /payroll/runs |  | PayrollRunsController |  |
| PayrollModule | GET | /payroll/runs/:id | Permission.PAYROLL_READ | PayrollRunsController | Get all records |
| PayrollModule | POST | /payroll/runs | Permission.PAYROLL_READ | PayrollRunsController | Get record by id |
| PayrollModule | PATCH | /payroll/runs/:id | Permission.PAYROLL_CREATE | PayrollRunsController | Create record |
| PayrollModule | DELETE | /payroll/runs/:id | Permission.PAYROLL_UPDATE | PayrollRunsController | Update record |
| PayrollModule | GET | /payroll/payslips |  | PayslipsController |  |
| PayrollModule | GET | /payroll/payslips/employee/:employeeId | Permission.PAYROLL_READ | PayslipsController | Get all payslips |
| PayrollModule | GET | /payroll/payslips/:id | Permission.PAYROLL_READ | PayslipsController | Get employee-visible payslips |
| PayrollModule | GET | /payroll/payslips/:id/pdf-payload | Permission.PAYROLL_READ | PayslipsController | Get payslip by id |
| PayrollModule | PATCH | /payroll/payslips/:id | Permission.PAYROLL_READ | PayslipsController | Get PDF-ready payslip payload |
| PayrollModule | POST | /payroll/payslips/run/:payrollRunId/issue | Permission.PAYROLL_UPDATE | PayslipsController | Update payslip |
| PayrollModule | GET | /payroll/reports/dashboard |  | PayrollReportsController |  |
| PayrollModule | GET | /payroll/reports/salary | Permission.PAYROLL_READ | PayrollReportsController | Get payroll dashboard |
| PayrollModule | GET | /payroll/reports/departments | Permission.PAYROLL_READ | PayrollReportsController | Get salary report |
| PayrollModule | GET | /payroll/reports/cost-centers | Permission.PAYROLL_READ | PayrollReportsController | Get department payroll report |
| PayrollModule | GET | /payroll/reports/monthly | Permission.PAYROLL_READ | PayrollReportsController | Get cost center payroll report |
| PayrollModule | GET | /payroll/salary-components |  | SalaryComponentsController |  |
| PayrollModule | GET | /payroll/salary-components/:id | Permission.PAYROLL_READ | SalaryComponentsController | Get all records |
| PayrollModule | POST | /payroll/salary-components | Permission.PAYROLL_READ | SalaryComponentsController | Get record by id |
| PayrollModule | PATCH | /payroll/salary-components/:id | Permission.PAYROLL_CREATE | SalaryComponentsController | Create record |
| PayrollModule | DELETE | /payroll/salary-components/:id | Permission.PAYROLL_UPDATE | SalaryComponentsController | Update record |
| PayslipsModule | GET | /payroll/payslips |  | PayslipsController |  |
| PayslipsModule | GET | /payroll/payslips/employee/:employeeId | Permission.PAYROLL_READ | PayslipsController | Get all payslips |
| PayslipsModule | GET | /payroll/payslips/:id | Permission.PAYROLL_READ | PayslipsController | Get employee-visible payslips |
| PayslipsModule | GET | /payroll/payslips/:id/pdf-payload | Permission.PAYROLL_READ | PayslipsController | Get payslip by id |
| PayslipsModule | PATCH | /payroll/payslips/:id | Permission.PAYROLL_READ | PayslipsController | Get PDF-ready payslip payload |
| PayslipsModule | POST | /payroll/payslips/run/:payrollRunId/issue | Permission.PAYROLL_UPDATE | PayslipsController | Update payslip |
| PayrollReportsModule | GET | /payroll/reports/dashboard |  | PayrollReportsController |  |
| PayrollReportsModule | GET | /payroll/reports/salary | Permission.PAYROLL_READ | PayrollReportsController | Get payroll dashboard |
| PayrollReportsModule | GET | /payroll/reports/departments | Permission.PAYROLL_READ | PayrollReportsController | Get salary report |
| PayrollReportsModule | GET | /payroll/reports/cost-centers | Permission.PAYROLL_READ | PayrollReportsController | Get department payroll report |
| PayrollReportsModule | GET | /payroll/reports/monthly | Permission.PAYROLL_READ | PayrollReportsController | Get cost center payroll report |
| SalaryComponentsModule | GET | /payroll/salary-components |  | SalaryComponentsController |  |
| SalaryComponentsModule | GET | /payroll/salary-components/:id | Permission.PAYROLL_READ | SalaryComponentsController | Get all records |
| SalaryComponentsModule | POST | /payroll/salary-components | Permission.PAYROLL_READ | SalaryComponentsController | Get record by id |
| SalaryComponentsModule | PATCH | /payroll/salary-components/:id | Permission.PAYROLL_CREATE | SalaryComponentsController | Create record |
| SalaryComponentsModule | DELETE | /payroll/salary-components/:id | Permission.PAYROLL_UPDATE | SalaryComponentsController | Update record |
| PerformanceCyclesModule | GET | /performance/cycles |  | PerformanceCyclesController |  |
| PerformanceCyclesModule | GET | /performance/cycles/:id | Permission.PERFORMANCE_READ | PerformanceCyclesController | Get all performance cycles |
| PerformanceCyclesModule | POST | /performance/cycles | Permission.PERFORMANCE_READ | PerformanceCyclesController | Get performance cycle by id |
| PerformanceCyclesModule | PATCH | /performance/cycles/:id | Permission.PERFORMANCE_CREATE | PerformanceCyclesController | Create performance cycle |
| PerformanceCyclesModule | DELETE | /performance/cycles/:id | Permission.PERFORMANCE_UPDATE | PerformanceCyclesController | Update performance cycle |
| PerformanceDashboardModule | GET | /performance/dashboard/summary |  | PerformanceDashboardController |  |
| PerformanceGoalsModule | GET | /performance/goals |  | PerformanceGoalsController |  |
| PerformanceGoalsModule | GET | /performance/goals/:id | Permission.PERFORMANCE_READ | PerformanceGoalsController | Get all performance goals |
| PerformanceGoalsModule | POST | /performance/goals | Permission.PERFORMANCE_READ | PerformanceGoalsController | Get performance goal by id |
| PerformanceGoalsModule | PATCH | /performance/goals/:id | Permission.PERFORMANCE_CREATE | PerformanceGoalsController | Create performance goal |
| PerformanceGoalsModule | DELETE | /performance/goals/:id | Permission.PERFORMANCE_UPDATE | PerformanceGoalsController | Update performance goal |
| PerformanceModule | GET | /performance/cycles |  | PerformanceCyclesController |  |
| PerformanceModule | GET | /performance/cycles/:id | Permission.PERFORMANCE_READ | PerformanceCyclesController | Get all performance cycles |
| PerformanceModule | POST | /performance/cycles | Permission.PERFORMANCE_READ | PerformanceCyclesController | Get performance cycle by id |
| PerformanceModule | PATCH | /performance/cycles/:id | Permission.PERFORMANCE_CREATE | PerformanceCyclesController | Create performance cycle |
| PerformanceModule | DELETE | /performance/cycles/:id | Permission.PERFORMANCE_UPDATE | PerformanceCyclesController | Update performance cycle |
| PerformanceModule | GET | /performance/dashboard/summary |  | PerformanceDashboardController |  |
| PerformanceModule | GET | /performance/goals |  | PerformanceGoalsController |  |
| PerformanceModule | GET | /performance/goals/:id | Permission.PERFORMANCE_READ | PerformanceGoalsController | Get all performance goals |
| PerformanceModule | POST | /performance/goals | Permission.PERFORMANCE_READ | PerformanceGoalsController | Get performance goal by id |
| PerformanceModule | PATCH | /performance/goals/:id | Permission.PERFORMANCE_CREATE | PerformanceGoalsController | Create performance goal |
| PerformanceModule | DELETE | /performance/goals/:id | Permission.PERFORMANCE_UPDATE | PerformanceGoalsController | Update performance goal |
| PerformanceModule | GET | /performance/review-items |  | PerformanceReviewItemsController |  |
| PerformanceModule | GET | /performance/review-items/:id | Permission.PERFORMANCE_READ | PerformanceReviewItemsController | Get all performance review items |
| PerformanceModule | POST | /performance/review-items | Permission.PERFORMANCE_READ | PerformanceReviewItemsController | Get performance review item by id |
| PerformanceModule | PATCH | /performance/review-items/:id | Permission.PERFORMANCE_CREATE | PerformanceReviewItemsController | Create performance review item |
| PerformanceModule | DELETE | /performance/review-items/:id | Permission.PERFORMANCE_UPDATE | PerformanceReviewItemsController | Update performance review item |
| PerformanceModule | GET | /performance/reviews |  | PerformanceReviewsController |  |
| PerformanceModule | GET | /performance/reviews/:id | Permission.PERFORMANCE_READ | PerformanceReviewsController | Get all performance reviews |
| PerformanceModule | POST | /performance/reviews | Permission.PERFORMANCE_READ | PerformanceReviewsController | Get performance review by id |
| PerformanceModule | PATCH | /performance/reviews/:id | Permission.PERFORMANCE_CREATE | PerformanceReviewsController | Create performance review |
| PerformanceModule | DELETE | /performance/reviews/:id | Permission.PERFORMANCE_UPDATE | PerformanceReviewsController | Update performance review |
| PerformanceReviewItemsModule | GET | /performance/review-items |  | PerformanceReviewItemsController |  |
| PerformanceReviewItemsModule | GET | /performance/review-items/:id | Permission.PERFORMANCE_READ | PerformanceReviewItemsController | Get all performance review items |
| PerformanceReviewItemsModule | POST | /performance/review-items | Permission.PERFORMANCE_READ | PerformanceReviewItemsController | Get performance review item by id |
| PerformanceReviewItemsModule | PATCH | /performance/review-items/:id | Permission.PERFORMANCE_CREATE | PerformanceReviewItemsController | Create performance review item |
| PerformanceReviewItemsModule | DELETE | /performance/review-items/:id | Permission.PERFORMANCE_UPDATE | PerformanceReviewItemsController | Update performance review item |
| PerformanceReviewsModule | GET | /performance/reviews |  | PerformanceReviewsController |  |
| PerformanceReviewsModule | GET | /performance/reviews/:id | Permission.PERFORMANCE_READ | PerformanceReviewsController | Get all performance reviews |
| PerformanceReviewsModule | POST | /performance/reviews | Permission.PERFORMANCE_READ | PerformanceReviewsController | Get performance review by id |
| PerformanceReviewsModule | PATCH | /performance/reviews/:id | Permission.PERFORMANCE_CREATE | PerformanceReviewsController | Create performance review |
| PerformanceReviewsModule | DELETE | /performance/reviews/:id | Permission.PERFORMANCE_UPDATE | PerformanceReviewsController | Update performance review |
| PerformanceOptimizationModule | GET | /performance-optimization/queries/recommendations |  | PerformanceOptimizationController |  |
| PerformanceOptimizationModule | GET | /performance-optimization/cache | Permission.PERFORMANCE_OPTIMIZATION_READ | PerformanceOptimizationController | Get query optimization recommendations |
| PerformanceOptimizationModule | GET | /performance-optimization/cache/stats | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | PerformanceOptimizationController | List cache entries |
| PerformanceOptimizationModule | GET | /performance-optimization/cache/:key | Permission.PERFORMANCE_OPTIMIZATION_READ | PerformanceOptimizationController | Get cache statistics |
| PerformanceOptimizationModule | POST | /performance-optimization/cache | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | PerformanceOptimizationController | Read cache entry |
| PerformanceOptimizationModule | POST | /performance-optimization/cache/invalidate | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | PerformanceOptimizationController | Set cache entry |
| PerformanceOptimizationModule | POST | /performance-optimization/batch/plan | Permission.PERFORMANCE_OPTIMIZATION_MANAGE | PerformanceOptimizationController | Invalidate cache entries |
| PerformanceOptimizationModule | POST | /performance-optimization/lazy-loading/plan | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE | PerformanceOptimizationController | Create batch operation plan |
| PerformanceOptimizationModule | GET | /performance-optimization/memory | Permission.PERFORMANCE_OPTIMIZATION_EXECUTE | PerformanceOptimizationController | Create lazy-loading plan |
| PerformanceOptimizationModule | GET | /performance-optimization/metrics | Permission.PERFORMANCE_OPTIMIZATION_READ | PerformanceOptimizationController | Get memory statistics |
| PerformanceOptimizationModule | POST | /performance-optimization/metrics | Permission.PERFORMANCE_OPTIMIZATION_METRICS | PerformanceOptimizationController | List performance metrics |
| PermissionsModule | GET | /permissions |  | PermissionsController |  |
| PermissionsModule | GET | /permissions/:id | Permission.PERMISSIONS_READ | PermissionsController | Get all permissions |
| PermissionsModule | POST | /permissions | Permission.PERMISSIONS_READ | PermissionsController | Get permission by id |
| PermissionsModule | PATCH | /permissions/:id | Permission.PERMISSIONS_CREATE | PermissionsController | Create permission |
| PermissionsModule | DELETE | /permissions/:id | Permission.PERMISSIONS_UPDATE | PermissionsController | Update permission |
| PluginsModule | GET | /plugins/manifests |  | PluginsController |  |
| PluginsModule | POST | /plugins/manifests | Permission.PLUGINS_READ | PluginsController | Get plugin manifests |
| PluginsModule | PATCH | /plugins/manifests/:id | Permission.PLUGINS_CREATE | PluginsController | Create plugin manifest |
| PluginsModule | DELETE | /plugins/manifests/:id | Permission.PLUGINS_UPDATE | PluginsController | Update plugin manifest |
| PluginsModule | POST | /plugins/manifests/:id/restore | Permission.PLUGINS_DELETE | PluginsController | Soft delete plugin manifest |
| PluginsModule | POST | /plugins/manifests/:id/load | Permission.PLUGINS_UPDATE | PluginsController | Restore plugin manifest |
| PluginsModule | GET | /plugins/registry | Permission.PLUGINS_EXECUTE | PluginsController | Load plugin manifest into registry |
| PluginsModule | POST | /plugins/registry/:id/enable | Permission.PLUGINS_READ | PluginsController | Get plugin registry entries |
| PluginsModule | POST | /plugins/registry/:id/disable | Permission.PLUGINS_EXECUTE | PluginsController | Enable loaded plugin |
| PluginsModule | POST | /plugins/registry/:id/unload | Permission.PLUGINS_EXECUTE | PluginsController | Disable loaded plugin |
| PluginsModule | GET | /plugins/registry/:id/lifecycle-events | Permission.PLUGINS_EXECUTE | PluginsController | Unload plugin from registry |
| PluginsModule | GET | /plugins/sdk/event-subscriptions | Permission.PLUGINS_READ | PluginsController | Get plugin lifecycle events |
| PluginsModule | POST | /plugins/sdk/event-subscriptions | Permission.PLUGINS_READ | PluginsController | Get plugin event subscriptions |
| PluginsModule | PATCH | /plugins/sdk/event-subscriptions/:id | Permission.PLUGINS_UPDATE | PluginsController | Create plugin event subscription |
| PluginsModule | DELETE | /plugins/sdk/event-subscriptions/:id | Permission.PLUGINS_UPDATE | PluginsController | Update plugin event subscription |
| PluginsModule | GET | /plugins/sdk/hooks | Permission.PLUGINS_DELETE | PluginsController | Soft delete plugin event subscription |
| PluginsModule | POST | /plugins/sdk/hooks | Permission.PLUGINS_READ | PluginsController | Get plugin hooks |
| PluginsModule | PATCH | /plugins/sdk/hooks/:id | Permission.PLUGINS_UPDATE | PluginsController | Create plugin hook |
| PluginsModule | DELETE | /plugins/sdk/hooks/:id | Permission.PLUGINS_UPDATE | PluginsController | Update plugin hook |
| PluginsModule | GET | /plugins/sdk/service-bindings | Permission.PLUGINS_DELETE | PluginsController | Soft delete plugin hook |
| PluginsModule | POST | /plugins/sdk/service-bindings | Permission.PLUGINS_READ | PluginsController | Get plugin service bindings |
| PluginsModule | PATCH | /plugins/sdk/service-bindings/:id | Permission.PLUGINS_UPDATE | PluginsController | Create plugin service binding |
| PluginsModule | DELETE | /plugins/sdk/service-bindings/:id | Permission.PLUGINS_UPDATE | PluginsController | Update plugin service binding |
| PluginsModule | GET | /plugins/sdk/permission-grants | Permission.PLUGINS_DELETE | PluginsController | Soft delete plugin service binding |
| PluginsModule | POST | /plugins/sdk/permission-grants | Permission.PLUGINS_READ | PluginsController | Get plugin permission grants |
| PluginsModule | DELETE | /plugins/sdk/permission-grants/:id | Permission.PLUGINS_GOVERN | PluginsController | Grant permission to plugin |
| PluginsModule | GET | /plugins/sdk/configurations | Permission.PLUGINS_GOVERN | PluginsController | Revoke plugin permission grant |
| PluginsModule | POST | /plugins/sdk/configurations | Permission.PLUGINS_READ | PluginsController | Get plugin configurations |
| PluginsModule | PATCH | /plugins/sdk/configurations/:id | Permission.PLUGINS_UPDATE | PluginsController | Create plugin configuration |
| PluginsModule | DELETE | /plugins/sdk/configurations/:id | Permission.PLUGINS_UPDATE | PluginsController | Update plugin configuration |
| PluginsModule | POST | /plugins/sdk/events | Permission.PLUGINS_DELETE | PluginsController | Soft delete plugin configuration |
| PluginsModule | GET | /plugins/sdk/events | Permission.PLUGINS_EXECUTE | PluginsController | Emit plugin SDK event |
| PluginsModule | GET | /plugins/marketplace/packages | Permission.PLUGINS_READ | PluginsController | Get plugin SDK event history |
| PluginsModule | POST | /plugins/marketplace/packages | Permission.PLUGINS_READ | PluginsController | Get marketplace packages |
| PluginsModule | PATCH | /plugins/marketplace/packages/:id | Permission.PLUGINS_CREATE | PluginsController | Create marketplace package |
| PluginsModule | GET | /plugins/marketplace/versions | Permission.PLUGINS_UPDATE | PluginsController | Update marketplace package |
| PluginsModule | POST | /plugins/marketplace/versions | Permission.PLUGINS_READ | PluginsController | Get marketplace package versions |
| PluginsModule | PATCH | /plugins/marketplace/versions/:id | Permission.PLUGINS_CREATE | PluginsController | Create marketplace package version |
| PluginsModule | POST | /plugins/marketplace/versions/:id/install | Permission.PLUGINS_UPDATE | PluginsController | Update marketplace package version |
| PluginsModule | GET | /plugins/marketplace/installations | Permission.PLUGINS_EXECUTE | PluginsController | Install marketplace package version |
| PluginsModule | POST | /plugins/marketplace/installations/:id/enable | Permission.PLUGINS_READ | PluginsController | Get plugin installations |
| PluginsModule | POST | /plugins/marketplace/installations/:id/disable | Permission.PLUGINS_EXECUTE | PluginsController | Enable plugin installation |
| PluginsModule | POST | /plugins/marketplace/installations/:id/uninstall | Permission.PLUGINS_EXECUTE | PluginsController | Disable plugin installation |
| PluginsModule | POST | /plugins/marketplace/installations/:id/upgrade | Permission.PLUGINS_DELETE | PluginsController | Uninstall plugin installation |
| PluginsModule | GET | /plugins/isolation/sandbox-policies | Permission.PLUGINS_EXECUTE | PluginsController | Upgrade plugin installation |
| PluginsModule | POST | /plugins/isolation/sandbox-policies | Permission.PLUGINS_READ | PluginsController | Get plugin sandbox policies |
| PluginsModule | GET | /plugins/isolation/dependencies | Permission.PLUGINS_GOVERN | PluginsController | Create or update plugin sandbox policy |
| PluginsModule | POST | /plugins/isolation/dependencies | Permission.PLUGINS_READ | PluginsController | Get plugin dependencies |
| PluginsModule | PATCH | /plugins/isolation/dependencies/:id | Permission.PLUGINS_UPDATE | PluginsController | Create plugin dependency |
| PluginsModule | POST | /plugins/isolation/registry/:id/validate-dependencies | Permission.PLUGINS_UPDATE | PluginsController | Update plugin dependency |
| PluginsModule | GET | /plugins/isolation/capability-grants | Permission.PLUGINS_EXECUTE | PluginsController | Validate plugin dependencies |
| PluginsModule | POST | /plugins/isolation/capability-grants | Permission.PLUGINS_READ | PluginsController | Get plugin capability grants |
| PluginsModule | DELETE | /plugins/isolation/capability-grants/:id | Permission.PLUGINS_GOVERN | PluginsController | Grant plugin capability |
| PluginsModule | POST | /plugins/isolation/registry/:id/validate | Permission.PLUGINS_GOVERN | PluginsController | Revoke plugin capability |
| PluginsModule | POST | /plugins/management/upload | Permission.PLUGINS_EXECUTE | PluginsController | Validate plugin isolation posture |
| PluginsModule | GET | /plugins/management/registry/:id/health | Permission.PLUGINS_CREATE | PluginsController | Upload plugin manifest package metadata |
| PluginsModule | GET | /plugins/management/metrics | Permission.PLUGINS_READ | PluginsController | Get plugin health |
| PublicApiModule | GET | /public-api/registry/groups |  | PublicApiController |  |
| PublicApiModule | POST | /public-api/registry/groups | Permission.PUBLIC_API_READ | PublicApiController | Get public API groups |
| PublicApiModule | PATCH | /public-api/registry/groups/:id | Permission.PUBLIC_API_CREATE | PublicApiController | Create public API group |
| PublicApiModule | DELETE | /public-api/registry/groups/:id | Permission.PUBLIC_API_UPDATE | PublicApiController | Update public API group |
| PublicApiModule | GET | /public-api/registry/apis | Permission.PUBLIC_API_DELETE | PublicApiController | Soft delete public API group |
| PublicApiModule | POST | /public-api/registry/apis | Permission.PUBLIC_API_READ | PublicApiController | Get public APIs |
| PublicApiModule | PATCH | /public-api/registry/apis/:id | Permission.PUBLIC_API_CREATE | PublicApiController | Create public API metadata |
| PublicApiModule | DELETE | /public-api/registry/apis/:id | Permission.PUBLIC_API_UPDATE | PublicApiController | Update public API metadata |
| PublicApiModule | GET | /public-api/registry/versions | Permission.PUBLIC_API_DELETE | PublicApiController | Soft delete public API metadata |
| PublicApiModule | POST | /public-api/registry/versions | Permission.PUBLIC_API_READ | PublicApiController | Get public API versions |
| PublicApiModule | PATCH | /public-api/registry/versions/:id | Permission.PUBLIC_API_CREATE | PublicApiController | Create public API version |
| PublicApiModule | GET | /public-api/keys | Permission.PUBLIC_API_UPDATE | PublicApiController | Update public API version |
| PublicApiModule | POST | /public-api/keys | Permission.PUBLIC_API_KEYS | PublicApiController | Get public API keys |
| PublicApiModule | POST | /public-api/keys/:id/rotate | Permission.PUBLIC_API_KEYS | PublicApiController | Create public API key |
| PublicApiModule | POST | /public-api/keys/:id/revoke | Permission.PUBLIC_API_KEYS | PublicApiController | Rotate public API key |
| PublicApiModule | GET | /public-api/rate-limits/policies | Permission.PUBLIC_API_KEYS | PublicApiController | Revoke public API key |
| PublicApiModule | POST | /public-api/rate-limits/policies | Permission.PUBLIC_API_ADMIN | PublicApiController | Get public API rate limit policies |
| PublicApiModule | PATCH | /public-api/rate-limits/policies/:id | Permission.PUBLIC_API_ADMIN | PublicApiController | Create public API rate limit policy |
| PublicApiModule | DELETE | /public-api/rate-limits/policies/:id | Permission.PUBLIC_API_ADMIN | PublicApiController | Update public API rate limit policy |
| PublicApiModule | POST | /public-api/rate-limits/evaluate | Permission.PUBLIC_API_ADMIN | PublicApiController | Soft delete public API rate limit policy |
| PublicApiModule | GET | /public-api/rate-limits/usage | Permission.PUBLIC_API_ADMIN | PublicApiController | Evaluate and record public API rate limit usage |
| PublicApiModule | GET | /public-api/developer/applications | Permission.PUBLIC_API_READ | PublicApiController | Get public API usage counters |
| PublicApiModule | POST | /public-api/developer/applications | Permission.PUBLIC_API_READ | PublicApiController | Get developer applications |
| PublicApiModule | PATCH | /public-api/developer/applications/:id | Permission.PUBLIC_API_CREATE | PublicApiController | Register developer application |
| PublicApiModule | DELETE | /public-api/developer/applications/:id | Permission.PUBLIC_API_UPDATE | PublicApiController | Update developer application |
| PublicApiModule | POST | /public-api/developer/applications/:id/keys | Permission.PUBLIC_API_DELETE | PublicApiController | Soft delete developer application |
| PublicApiModule | POST | /public-api/developer/applications/:id/keys/:keyId/revoke | Permission.PUBLIC_API_KEYS | PublicApiController | Generate developer application key |
| PublicApiModule | GET | /public-api/developer/applications/:id/usage | Permission.PUBLIC_API_KEYS | PublicApiController | Revoke developer application key |
| PublicApiModule | POST | /public-api/security/verify-signature | Permission.PUBLIC_API_READ | PublicApiController | Get developer application usage statistics |
| PublicApiModule | GET | /public-api/security/request-logs | Permission.PUBLIC_API_ADMIN | PublicApiController | Verify signed public API request |
| PublicApiModule | POST | /public-api/security/request-logs | Permission.PUBLIC_API_ADMIN | PublicApiController | Get public API request logs |
| ApplicantsModule | GET | /recruitment/applicants |  | ApplicantsController |  |
| ApplicantsModule | GET | /recruitment/applicants/:id | Permission.RECRUITMENT_READ | ApplicantsController | Get all records |
| ApplicantsModule | POST | /recruitment/applicants | Permission.RECRUITMENT_READ | ApplicantsController | Get record by id |
| ApplicantsModule | PATCH | /recruitment/applicants/:id | Permission.RECRUITMENT_CREATE | ApplicantsController | Create record |
| ApplicantsModule | DELETE | /recruitment/applicants/:id | Permission.RECRUITMENT_UPDATE | ApplicantsController | Update record |
| ApplicationsModule | GET | /recruitment/applications |  | ApplicationsController |  |
| ApplicationsModule | GET | /recruitment/applications/:id | Permission.RECRUITMENT_READ | ApplicationsController | Get all applications |
| ApplicationsModule | POST | /recruitment/applications | Permission.RECRUITMENT_READ | ApplicationsController | Get application by id |
| ApplicationsModule | PATCH | /recruitment/applications/:id | Permission.RECRUITMENT_CREATE | ApplicationsController | Create application |
| ApplicationsModule | DELETE | /recruitment/applications/:id | Permission.RECRUITMENT_UPDATE | ApplicationsController | Update application |
| RecruitmentDashboardModule | GET | /recruitment/dashboard/summary |  | RecruitmentDashboardController |  |
| HiringModule | POST | /recruitment/hiring/hire |  | HiringController |  |
| InterviewEvaluationsModule | GET | /recruitment/interview-evaluations |  | InterviewEvaluationsController |  |
| InterviewEvaluationsModule | GET | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_READ | InterviewEvaluationsController | Get all interview evaluations |
| InterviewEvaluationsModule | POST | /recruitment/interview-evaluations | Permission.RECRUITMENT_READ | InterviewEvaluationsController | Get interview evaluation by id |
| InterviewEvaluationsModule | PATCH | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_CREATE | InterviewEvaluationsController | Create interview evaluation |
| InterviewEvaluationsModule | DELETE | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_UPDATE | InterviewEvaluationsController | Update interview evaluation |
| InterviewsModule | GET | /recruitment/interviews |  | InterviewsController |  |
| InterviewsModule | GET | /recruitment/interviews/:id | Permission.RECRUITMENT_READ | InterviewsController | Get all interviews |
| InterviewsModule | POST | /recruitment/interviews | Permission.RECRUITMENT_READ | InterviewsController | Get interview by id |
| InterviewsModule | PATCH | /recruitment/interviews/:id | Permission.RECRUITMENT_CREATE | InterviewsController | Create interview |
| InterviewsModule | DELETE | /recruitment/interviews/:id | Permission.RECRUITMENT_UPDATE | InterviewsController | Update interview |
| JobPositionsModule | GET | /recruitment/job-positions |  | JobPositionsController |  |
| JobPositionsModule | GET | /recruitment/job-positions/:id | Permission.RECRUITMENT_READ | JobPositionsController | Get all job positions |
| JobPositionsModule | POST | /recruitment/job-positions | Permission.RECRUITMENT_READ | JobPositionsController | Get job position by id |
| JobPositionsModule | PATCH | /recruitment/job-positions/:id | Permission.RECRUITMENT_CREATE | JobPositionsController | Create job position |
| JobPositionsModule | DELETE | /recruitment/job-positions/:id | Permission.RECRUITMENT_UPDATE | JobPositionsController | Update job position |
| OfferLettersModule | GET | /recruitment/offer-letters |  | OfferLettersController |  |
| OfferLettersModule | GET | /recruitment/offer-letters/:id | Permission.RECRUITMENT_READ | OfferLettersController | Get all offer letters |
| OfferLettersModule | POST | /recruitment/offer-letters | Permission.RECRUITMENT_READ | OfferLettersController | Get offer letter by id |
| OfferLettersModule | PATCH | /recruitment/offer-letters/:id | Permission.RECRUITMENT_CREATE | OfferLettersController | Create offer letter |
| OfferLettersModule | POST | /recruitment/offer-letters/:id/send | Permission.RECRUITMENT_UPDATE | OfferLettersController | Update offer letter |
| OfferLettersModule | POST | /recruitment/offer-letters/:id/accept | Permission.RECRUITMENT_UPDATE | OfferLettersController | Send offer letter |
| OfferLettersModule | POST | /recruitment/offer-letters/:id/reject | Permission.RECRUITMENT_UPDATE | OfferLettersController | Accept offer letter |
| OfferLettersModule | DELETE | /recruitment/offer-letters/:id | Permission.RECRUITMENT_UPDATE | OfferLettersController | Reject offer letter |
| RecruitmentModule | GET | /recruitment/applicants |  | ApplicantsController |  |
| RecruitmentModule | GET | /recruitment/applicants/:id | Permission.RECRUITMENT_READ | ApplicantsController | Get all records |
| RecruitmentModule | POST | /recruitment/applicants | Permission.RECRUITMENT_READ | ApplicantsController | Get record by id |
| RecruitmentModule | PATCH | /recruitment/applicants/:id | Permission.RECRUITMENT_CREATE | ApplicantsController | Create record |
| RecruitmentModule | DELETE | /recruitment/applicants/:id | Permission.RECRUITMENT_UPDATE | ApplicantsController | Update record |
| RecruitmentModule | GET | /recruitment/applications |  | ApplicationsController |  |
| RecruitmentModule | GET | /recruitment/applications/:id | Permission.RECRUITMENT_READ | ApplicationsController | Get all applications |
| RecruitmentModule | POST | /recruitment/applications | Permission.RECRUITMENT_READ | ApplicationsController | Get application by id |
| RecruitmentModule | PATCH | /recruitment/applications/:id | Permission.RECRUITMENT_CREATE | ApplicationsController | Create application |
| RecruitmentModule | DELETE | /recruitment/applications/:id | Permission.RECRUITMENT_UPDATE | ApplicationsController | Update application |
| RecruitmentModule | GET | /recruitment/dashboard/summary |  | RecruitmentDashboardController |  |
| RecruitmentModule | POST | /recruitment/hiring/hire |  | HiringController |  |
| RecruitmentModule | GET | /recruitment/interview-evaluations |  | InterviewEvaluationsController |  |
| RecruitmentModule | GET | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_READ | InterviewEvaluationsController | Get all interview evaluations |
| RecruitmentModule | POST | /recruitment/interview-evaluations | Permission.RECRUITMENT_READ | InterviewEvaluationsController | Get interview evaluation by id |
| RecruitmentModule | PATCH | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_CREATE | InterviewEvaluationsController | Create interview evaluation |
| RecruitmentModule | DELETE | /recruitment/interview-evaluations/:id | Permission.RECRUITMENT_UPDATE | InterviewEvaluationsController | Update interview evaluation |
| RecruitmentModule | GET | /recruitment/interviews |  | InterviewsController |  |
| RecruitmentModule | GET | /recruitment/interviews/:id | Permission.RECRUITMENT_READ | InterviewsController | Get all interviews |
| RecruitmentModule | POST | /recruitment/interviews | Permission.RECRUITMENT_READ | InterviewsController | Get interview by id |
| RecruitmentModule | PATCH | /recruitment/interviews/:id | Permission.RECRUITMENT_CREATE | InterviewsController | Create interview |
| RecruitmentModule | DELETE | /recruitment/interviews/:id | Permission.RECRUITMENT_UPDATE | InterviewsController | Update interview |
| RecruitmentModule | GET | /recruitment/job-positions |  | JobPositionsController |  |
| RecruitmentModule | GET | /recruitment/job-positions/:id | Permission.RECRUITMENT_READ | JobPositionsController | Get all job positions |
| RecruitmentModule | POST | /recruitment/job-positions | Permission.RECRUITMENT_READ | JobPositionsController | Get job position by id |
| RecruitmentModule | PATCH | /recruitment/job-positions/:id | Permission.RECRUITMENT_CREATE | JobPositionsController | Create job position |
| RecruitmentModule | DELETE | /recruitment/job-positions/:id | Permission.RECRUITMENT_UPDATE | JobPositionsController | Update job position |
| RecruitmentModule | GET | /recruitment/offer-letters |  | OfferLettersController |  |
| RecruitmentModule | GET | /recruitment/offer-letters/:id | Permission.RECRUITMENT_READ | OfferLettersController | Get all offer letters |
| RecruitmentModule | POST | /recruitment/offer-letters | Permission.RECRUITMENT_READ | OfferLettersController | Get offer letter by id |
| RecruitmentModule | PATCH | /recruitment/offer-letters/:id | Permission.RECRUITMENT_CREATE | OfferLettersController | Create offer letter |
| RecruitmentModule | POST | /recruitment/offer-letters/:id/send | Permission.RECRUITMENT_UPDATE | OfferLettersController | Update offer letter |
| RecruitmentModule | POST | /recruitment/offer-letters/:id/accept | Permission.RECRUITMENT_UPDATE | OfferLettersController | Send offer letter |
| RecruitmentModule | POST | /recruitment/offer-letters/:id/reject | Permission.RECRUITMENT_UPDATE | OfferLettersController | Accept offer letter |
| RecruitmentModule | DELETE | /recruitment/offer-letters/:id | Permission.RECRUITMENT_UPDATE | OfferLettersController | Reject offer letter |
| RecruitmentModule | GET | /recruitment/vacancies |  | VacanciesController |  |
| RecruitmentModule | GET | /recruitment/vacancies/:id | Permission.RECRUITMENT_READ | VacanciesController | Get all records |
| RecruitmentModule | POST | /recruitment/vacancies | Permission.RECRUITMENT_READ | VacanciesController | Get record by id |
| RecruitmentModule | PATCH | /recruitment/vacancies/:id | Permission.RECRUITMENT_CREATE | VacanciesController | Create record |
| RecruitmentModule | DELETE | /recruitment/vacancies/:id | Permission.RECRUITMENT_UPDATE | VacanciesController | Update record |
| VacanciesModule | GET | /recruitment/vacancies |  | VacanciesController |  |
| VacanciesModule | GET | /recruitment/vacancies/:id | Permission.RECRUITMENT_READ | VacanciesController | Get all records |
| VacanciesModule | POST | /recruitment/vacancies | Permission.RECRUITMENT_READ | VacanciesController | Get record by id |
| VacanciesModule | PATCH | /recruitment/vacancies/:id | Permission.RECRUITMENT_CREATE | VacanciesController | Create record |
| VacanciesModule | DELETE | /recruitment/vacancies/:id | Permission.RECRUITMENT_UPDATE | VacanciesController | Update record |
| ReportingDashboardsModule | GET | /reporting/dashboards/executive |  | ReportingDashboardsController |  |
| ReportingDashboardsModule | GET | /reporting/dashboards/hr | Permission.REPORTING_READ | ReportingDashboardsController | Get executive dashboard |
| ReportingDashboardsModule | GET | /reporting/dashboards/payroll | Permission.REPORTING_READ | ReportingDashboardsController | Get HR dashboard |
| ReportingDashboardsModule | GET | /reporting/dashboards/accounting | Permission.REPORTING_READ | ReportingDashboardsController | Get payroll dashboard |
| ReportDefinitionsModule | GET | /reporting/categories |  | ReportDefinitionsController |  |
| ReportDefinitionsModule | POST | /reporting/categories | Permission.REPORTING_READ | ReportDefinitionsController | Get report categories |
| ReportDefinitionsModule | PATCH | /reporting/categories/:id | Permission.REPORTING_CREATE | ReportDefinitionsController | Create report category |
| ReportDefinitionsModule | GET | /reporting/definitions | Permission.REPORTING_UPDATE | ReportDefinitionsController | Update report category |
| ReportDefinitionsModule | GET | /reporting/definitions/:id | Permission.REPORTING_READ | ReportDefinitionsController | Get report definitions |
| ReportDefinitionsModule | POST | /reporting/definitions | Permission.REPORTING_READ | ReportDefinitionsController | Get report definition by id |
| ReportDefinitionsModule | PATCH | /reporting/definitions/:id | Permission.REPORTING_CREATE | ReportDefinitionsController | Create report definition |
| ReportExecutionModule | GET | /reporting/executions |  | ReportExecutionController |  |
| ReportExecutionModule | GET | /reporting/executions/:id | Permission.REPORTING_READ | ReportExecutionController | Get report execution history |
| ReportExecutionModule | POST | /reporting/executions | Permission.REPORTING_READ | ReportExecutionController | Get report execution by id |
| ReportExportModule | POST | /reporting/exports |  | ReportExportController |  |
| FinanceReportsModule | GET | /reporting/finance/payroll-summary |  | FinanceReportsController |  |
| FinanceReportsModule | GET | /reporting/finance/payslip-summary | Permission.REPORTING_READ | FinanceReportsController | Get payroll summary report |
| FinanceReportsModule | GET | /reporting/finance/trial-balance | Permission.REPORTING_READ | FinanceReportsController | Get payslip summary report |
| FinanceReportsModule | GET | /reporting/finance/general-ledger | Permission.REPORTING_READ | FinanceReportsController | Get accounting trial balance report |
| FinanceReportsModule | GET | /reporting/finance/cost-centers | Permission.REPORTING_READ | FinanceReportsController | Get accounting general ledger report |
| HrReportsModule | GET | /reporting/hr/employees |  | HrReportsController |  |
| HrReportsModule | GET | /reporting/hr/attendance | Permission.REPORTING_READ | HrReportsController | Get employee report |
| HrReportsModule | GET | /reporting/hr/leave | Permission.REPORTING_READ | HrReportsController | Get attendance report |
| HrReportsModule | GET | /reporting/hr/recruitment | Permission.REPORTING_READ | HrReportsController | Get leave report |
| ReportingModule | GET | /reporting/dashboards/executive |  | ReportingDashboardsController |  |
| ReportingModule | GET | /reporting/dashboards/hr | Permission.REPORTING_READ | ReportingDashboardsController | Get executive dashboard |
| ReportingModule | GET | /reporting/dashboards/payroll | Permission.REPORTING_READ | ReportingDashboardsController | Get HR dashboard |
| ReportingModule | GET | /reporting/dashboards/accounting | Permission.REPORTING_READ | ReportingDashboardsController | Get payroll dashboard |
| ReportingModule | GET | /reporting/categories |  | ReportDefinitionsController |  |
| ReportingModule | POST | /reporting/categories | Permission.REPORTING_READ | ReportDefinitionsController | Get report categories |
| ReportingModule | PATCH | /reporting/categories/:id | Permission.REPORTING_CREATE | ReportDefinitionsController | Create report category |
| ReportingModule | GET | /reporting/definitions | Permission.REPORTING_UPDATE | ReportDefinitionsController | Update report category |
| ReportingModule | GET | /reporting/definitions/:id | Permission.REPORTING_READ | ReportDefinitionsController | Get report definitions |
| ReportingModule | POST | /reporting/definitions | Permission.REPORTING_READ | ReportDefinitionsController | Get report definition by id |
| ReportingModule | PATCH | /reporting/definitions/:id | Permission.REPORTING_CREATE | ReportDefinitionsController | Create report definition |
| ReportingModule | GET | /reporting/executions |  | ReportExecutionController |  |
| ReportingModule | GET | /reporting/executions/:id | Permission.REPORTING_READ | ReportExecutionController | Get report execution history |
| ReportingModule | POST | /reporting/executions | Permission.REPORTING_READ | ReportExecutionController | Get report execution by id |
| ReportingModule | POST | /reporting/exports |  | ReportExportController |  |
| ReportingModule | GET | /reporting/finance/payroll-summary |  | FinanceReportsController |  |
| ReportingModule | GET | /reporting/finance/payslip-summary | Permission.REPORTING_READ | FinanceReportsController | Get payroll summary report |
| ReportingModule | GET | /reporting/finance/trial-balance | Permission.REPORTING_READ | FinanceReportsController | Get payslip summary report |
| ReportingModule | GET | /reporting/finance/general-ledger | Permission.REPORTING_READ | FinanceReportsController | Get accounting trial balance report |
| ReportingModule | GET | /reporting/finance/cost-centers | Permission.REPORTING_READ | FinanceReportsController | Get accounting general ledger report |
| ReportingModule | GET | /reporting/hr/employees |  | HrReportsController |  |
| ReportingModule | GET | /reporting/hr/attendance | Permission.REPORTING_READ | HrReportsController | Get employee report |
| ReportingModule | GET | /reporting/hr/leave | Permission.REPORTING_READ | HrReportsController | Get attendance report |
| ReportingModule | GET | /reporting/hr/recruitment | Permission.REPORTING_READ | HrReportsController | Get leave report |
| RolesModule | GET | /roles |  | RolesController |  |
| RolesModule | GET | /roles/:id | Permission.ROLES_READ | RolesController | Get all roles |
| RolesModule | POST | /roles | Permission.ROLES_READ | RolesController | Get role by id |
| RolesModule | PATCH | /roles/:id | Permission.ROLES_CREATE | RolesController | Create role |
| RolesModule | DELETE | /roles/:id | Permission.ROLES_UPDATE | RolesController | Update role |
| SchedulerModule | GET | /scheduler/crons |  | SchedulerController |  |
| SchedulerModule | POST | /scheduler/crons | Permission.SCHEDULER_READ | SchedulerController | Get cron registry entries |
| SchedulerModule | PATCH | /scheduler/crons/:id | Permission.SCHEDULER_CREATE | SchedulerController | Create cron registry entry |
| SchedulerModule | DELETE | /scheduler/crons/:id | Permission.SCHEDULER_UPDATE | SchedulerController | Update cron registry entry |
| SchedulerModule | GET | /scheduler/jobs | Permission.SCHEDULER_DELETE | SchedulerController | Soft delete cron registry entry |
| SchedulerModule | POST | /scheduler/jobs | Permission.SCHEDULER_READ | SchedulerController | Get scheduled jobs |
| SchedulerModule | PATCH | /scheduler/jobs/:id | Permission.SCHEDULER_CREATE | SchedulerController | Schedule background job |
| SchedulerModule | POST | /scheduler/jobs/:id/cancel | Permission.SCHEDULER_UPDATE | SchedulerController | Update scheduled job |
| SchedulerModule | GET | /scheduler/history | Permission.SCHEDULER_EXECUTE | SchedulerController | Cancel scheduled job |
| SchedulerModule | POST | /scheduler/queue/claim | Permission.SCHEDULER_READ | SchedulerController | Get scheduler job history |
| SchedulerModule | POST | /scheduler/jobs/:id/complete | Permission.SCHEDULER_EXECUTE | SchedulerController | Claim due scheduler jobs for a worker |
| SchedulerModule | POST | /scheduler/jobs/:id/fail | Permission.SCHEDULER_EXECUTE | SchedulerController | Complete a running scheduler job |
| SchedulerModule | POST | /scheduler/jobs/:id/retry | Permission.SCHEDULER_EXECUTE | SchedulerController | Fail a running scheduler job and apply retry policy |
| SchedulerModule | POST | /scheduler/jobs/:id/recover | Permission.SCHEDULER_EXECUTE | SchedulerController | Retry a failed or dead-letter scheduler job |
| SchedulerModule | GET | /scheduler/recoveries | Permission.SCHEDULER_EXECUTE | SchedulerController | Apply failure recovery action to a scheduler job |
| SchedulerModule | GET | /scheduler/monitoring/dashboard | Permission.SCHEDULER_MONITOR | SchedulerController | Get scheduler failure recovery records |
| SchedulerModule | GET | /scheduler/monitoring/queues | Permission.SCHEDULER_MONITOR | SchedulerController | Get scheduler dashboard metrics |
| SchedulerModule | GET | /scheduler/monitoring/failures | Permission.SCHEDULER_MONITOR | SchedulerController | Get scheduler queue status |
| SchedulerModule | GET | /scheduler/monitoring/system-status | Permission.SCHEDULER_MONITOR | SchedulerController | Get scheduler failure report |
| SearchModule | GET | /search/global |  | SearchController |  |
| SearchModule | GET | /search/employees | Permission.SEARCH_GLOBAL | SearchController | Run global enterprise search |
| SearchModule | GET | /search/payroll | Permission.SEARCH_EMPLOYEES | SearchController | Search employees |
| SearchModule | GET | /search/documents | Permission.SEARCH_PAYROLL | SearchController | Search payroll records |
| SearchModule | GET | /search/workflows | Permission.SEARCH_DOCUMENTS | SearchController | Search documents |
| SearchModule | GET | /search/index | Permission.SEARCH_WORKFLOWS | SearchController | Search workflows |
| SearchModule | POST | /search/index | Permission.SEARCH_ADMIN | SearchController | List search index records |
| SearchModule | POST | /search/index/rebuild | Permission.SEARCH_ADMIN | SearchController | Create or update search index record |
| SearchModule | GET | /search/audit | Permission.SEARCH_ADMIN | SearchController | Rebuild search index from supported domains |
| TenantsModule | GET | /tenants |  | TenantsController |  |
| TenantsModule | POST | /tenants | Permission.TENANTS_READ | TenantsController | Get tenant registry |
| TenantsModule | PATCH | /tenants/:id | Permission.TENANTS_CREATE | TenantsController | Create tenant |
| TenantsModule | DELETE | /tenants/:id | Permission.TENANTS_UPDATE | TenantsController | Update tenant |
| TenantsModule | POST | /tenants/:id/restore | Permission.TENANTS_DELETE | TenantsController | Soft delete tenant |
| TenantsModule | GET | /tenants/domains | Permission.TENANTS_UPDATE | TenantsController | Restore tenant |
| TenantsModule | POST | /tenants/domains | Permission.TENANTS_READ | TenantsController | Get tenant domains |
| TenantsModule | POST | /tenants/resolve | Permission.TENANTS_UPDATE | TenantsController | Create tenant domain |
| TenantsModule | GET | /tenants/isolation/companies | Permission.TENANTS_READ | TenantsController | Resolve tenant from context, code, or domain |
| TenantsModule | POST | /tenants/isolation/companies/:companyId/assign | Permission.TENANTS_READ | TenantsController | Get tenant-scoped companies |
| TenantsModule | GET | /tenants/isolation/branches | Permission.TENANTS_UPDATE | TenantsController | Assign company to tenant |
| TenantsModule | POST | /tenants/isolation/branches/:branchId/assign | Permission.TENANTS_READ | TenantsController | Get tenant-scoped branches |
| TenantsModule | POST | /tenants/isolation/validate | Permission.TENANTS_UPDATE | TenantsController | Assign branch to tenant |
| TenantsModule | GET | /tenants/configuration/settings | Permission.TENANTS_SECURITY | TenantsController | Validate tenant data isolation scope |
| TenantsModule | POST | /tenants/configuration/settings | Permission.TENANTS_READ | TenantsController | Get tenant settings |
| TenantsModule | PATCH | /tenants/configuration/settings/:id | Permission.TENANTS_UPDATE | TenantsController | Create tenant setting |
| TenantsModule | DELETE | /tenants/configuration/settings/:id | Permission.TENANTS_UPDATE | TenantsController | Update tenant setting |
| TenantsModule | GET | /tenants/configuration/feature-flags | Permission.TENANTS_DELETE | TenantsController | Soft delete tenant setting |
| TenantsModule | POST | /tenants/configuration/feature-flags | Permission.TENANTS_READ | TenantsController | Get tenant feature flags |
| TenantsModule | PATCH | /tenants/configuration/feature-flags/:id | Permission.TENANTS_UPDATE | TenantsController | Create tenant feature flag |
| TenantsModule | DELETE | /tenants/configuration/feature-flags/:id | Permission.TENANTS_UPDATE | TenantsController | Update tenant feature flag |
| TenantsModule | GET | /tenants/configuration/localizations | Permission.TENANTS_DELETE | TenantsController | Soft delete tenant feature flag |
| TenantsModule | POST | /tenants/configuration/localizations | Permission.TENANTS_READ | TenantsController | Get tenant localization profiles |
| TenantsModule | PATCH | /tenants/configuration/localizations/:id | Permission.TENANTS_UPDATE | TenantsController | Create tenant localization profile |
| TenantsModule | POST | /tenants/configuration/branding | Permission.TENANTS_UPDATE | TenantsController | Update tenant localization profile |
| TenantsModule | POST | /tenants/administration/provision | Permission.TENANTS_UPDATE | TenantsController | Create or update tenant branding |
| TenantsModule | POST | /tenants/administration/:id/activate | Permission.TENANTS_PROVISION | TenantsController | Provision tenant |
| TenantsModule | POST | /tenants/administration/:id/suspend | Permission.TENANTS_PROVISION | TenantsController | Activate tenant |
| TenantsModule | POST | /tenants/administration/:id/resume | Permission.TENANTS_PROVISION | TenantsController | Suspend tenant |
| TenantsModule | POST | /tenants/administration/:id/archive | Permission.TENANTS_PROVISION | TenantsController | Resume tenant |
| TenantsModule | GET | /tenants/administration/usage-limits | Permission.TENANTS_PROVISION | TenantsController | Archive tenant |
| TenantsModule | POST | /tenants/administration/usage-limits | Permission.TENANTS_READ | TenantsController | Get tenant usage limits |
| TenantsModule | PATCH | /tenants/administration/usage-limits/:id | Permission.TENANTS_UPDATE | TenantsController | Create tenant usage limit |
| TenantsModule | DELETE | /tenants/administration/usage-limits/:id | Permission.TENANTS_UPDATE | TenantsController | Update tenant usage limit |
| TenantsModule | GET | /tenants/administration/events | Permission.TENANTS_DELETE | TenantsController | Soft delete tenant usage limit |
| TenantsModule | POST | /tenants/administration/events | Permission.TENANTS_READ | TenantsController | Get tenant provisioning events |
| TenantsModule | GET | /tenants/security/permission-policies | Permission.TENANTS_PROVISION | TenantsController | Record tenant provisioning event |
| TenantsModule | POST | /tenants/security/permission-policies | Permission.TENANTS_SECURITY | TenantsController | Get tenant permission policies |
| TenantsModule | PATCH | /tenants/security/permission-policies/:id | Permission.TENANTS_SECURITY | TenantsController | Create tenant permission policy |
| TenantsModule | DELETE | /tenants/security/permission-policies/:id | Permission.TENANTS_SECURITY | TenantsController | Update tenant permission policy |
| TenantsModule | POST | /tenants/security/validate | Permission.TENANTS_SECURITY | TenantsController | Soft delete tenant permission policy |
| TenantsModule | GET | /tenants/security/audit-events | Permission.TENANTS_SECURITY | TenantsController | Validate tenant security boundary |
| TenantsModule | POST | /tenants/security/audit-events | Permission.TENANTS_SECURITY | TenantsController | Get tenant audit events |
| UsersModule | GET | /users |  | UsersController |  |
| UsersModule | GET | /users/:id | Permission.USERS_READ | UsersController | Get all users |
| UsersModule | POST | /users | Permission.USERS_READ | UsersController | Get user by id |
| UsersModule | PATCH | /users/:id | Permission.USERS_CREATE | UsersController | Create user |
| UsersModule | DELETE | /users/:id | Permission.USERS_UPDATE | UsersController | Update user |
| WorkflowDashboardModule | GET | /workflows/dashboard |  | WorkflowDashboardController |  |
| WorkflowDefinitionsModule | GET | /workflows/definitions |  | WorkflowDefinitionsController |  |
| WorkflowDefinitionsModule | GET | /workflows/definitions/:id | Permission.WORKFLOWS_READ | WorkflowDefinitionsController | Get all workflow definitions |
| WorkflowDefinitionsModule | POST | /workflows/definitions | Permission.WORKFLOWS_READ | WorkflowDefinitionsController | Get workflow definition by id |
| WorkflowDefinitionsModule | PATCH | /workflows/definitions/:id | Permission.WORKFLOWS_CREATE | WorkflowDefinitionsController | Create workflow definition |
| WorkflowDefinitionsModule | POST | /workflows/definitions/:id/activate | Permission.WORKFLOWS_UPDATE | WorkflowDefinitionsController | Update workflow definition |
| WorkflowDefinitionsModule | POST | /workflows/definitions/:id/archive | Permission.WORKFLOWS_UPDATE | WorkflowDefinitionsController | Activate workflow definition |
| WorkflowDefinitionsModule | POST | /workflows/definitions/:id/steps | Permission.WORKFLOWS_UPDATE | WorkflowDefinitionsController | Archive workflow definition |
| WorkflowDefinitionsModule | PATCH | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE | WorkflowDefinitionsController | Add workflow definition step |
| WorkflowDefinitionsModule | DELETE | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE | WorkflowDefinitionsController | Update workflow definition step |
| WorkflowRuntimeModule | GET | /workflows/requests |  | WorkflowRuntimeController |  |
| WorkflowRuntimeModule | GET | /workflows/requests/:id | Permission.WORKFLOWS_READ | WorkflowRuntimeController | Get all workflow requests |
| WorkflowRuntimeModule | GET | /workflows/requests/:id/history | Permission.WORKFLOWS_READ | WorkflowRuntimeController | Get workflow request by id |
| WorkflowRuntimeModule | POST | /workflows/requests | Permission.WORKFLOWS_READ | WorkflowRuntimeController | Get workflow request history |
| WorkflowRuntimeModule | POST | /workflows/requests/:id/steps/:stepId/approve | Permission.WORKFLOWS_CREATE | WorkflowRuntimeController | Submit workflow request |
| WorkflowRuntimeModule | POST | /workflows/requests/:id/steps/:stepId/reject | Permission.WORKFLOWS_UPDATE | WorkflowRuntimeController | Approve workflow step |
| WorkflowRuntimeModule | POST | /workflows/requests/:id/cancel | Permission.WORKFLOWS_UPDATE | WorkflowRuntimeController | Reject workflow step |
| WorkflowsModule | GET | /workflows/dashboard |  | WorkflowDashboardController |  |
| WorkflowsModule | GET | /workflows/definitions |  | WorkflowDefinitionsController |  |
| WorkflowsModule | GET | /workflows/definitions/:id | Permission.WORKFLOWS_READ | WorkflowDefinitionsController | Get all workflow definitions |
| WorkflowsModule | POST | /workflows/definitions | Permission.WORKFLOWS_READ | WorkflowDefinitionsController | Get workflow definition by id |
| WorkflowsModule | PATCH | /workflows/definitions/:id | Permission.WORKFLOWS_CREATE | WorkflowDefinitionsController | Create workflow definition |
| WorkflowsModule | POST | /workflows/definitions/:id/activate | Permission.WORKFLOWS_UPDATE | WorkflowDefinitionsController | Update workflow definition |
| WorkflowsModule | POST | /workflows/definitions/:id/archive | Permission.WORKFLOWS_UPDATE | WorkflowDefinitionsController | Activate workflow definition |
| WorkflowsModule | POST | /workflows/definitions/:id/steps | Permission.WORKFLOWS_UPDATE | WorkflowDefinitionsController | Archive workflow definition |
| WorkflowsModule | PATCH | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE | WorkflowDefinitionsController | Add workflow definition step |
| WorkflowsModule | DELETE | /workflows/definitions/:id/steps/:stepId | Permission.WORKFLOWS_UPDATE | WorkflowDefinitionsController | Update workflow definition step |
| WorkflowsModule | GET | /workflows/requests |  | WorkflowRuntimeController |  |
| WorkflowsModule | GET | /workflows/requests/:id | Permission.WORKFLOWS_READ | WorkflowRuntimeController | Get all workflow requests |
| WorkflowsModule | GET | /workflows/requests/:id/history | Permission.WORKFLOWS_READ | WorkflowRuntimeController | Get workflow request by id |
| WorkflowsModule | POST | /workflows/requests | Permission.WORKFLOWS_READ | WorkflowRuntimeController | Get workflow request history |
| WorkflowsModule | POST | /workflows/requests/:id/steps/:stepId/approve | Permission.WORKFLOWS_CREATE | WorkflowRuntimeController | Submit workflow request |
| WorkflowsModule | POST | /workflows/requests/:id/steps/:stepId/reject | Permission.WORKFLOWS_UPDATE | WorkflowRuntimeController | Approve workflow step |
| WorkflowsModule | POST | /workflows/requests/:id/cancel | Permission.WORKFLOWS_UPDATE | WorkflowRuntimeController | Reject workflow step |
