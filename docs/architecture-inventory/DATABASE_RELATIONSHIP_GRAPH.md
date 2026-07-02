# Database Relationship Graph

Date: 2026-07-02

```mermaid
erDiagram
  User ||--o{ UserRole : roles
  User ||--o{ AuditLog : createdLogs
  User ||--o{ Employee : employee
  User ||--o{ LeaveApproval : leaveApprovals
  User ||--o{ PayrollRun : reviewedPayrollRuns
  User ||--o{ PayrollRun : approvedPayrollRuns
  User ||--o{ WorkflowDefinitionStep : workflowDefinitionSteps
  User ||--o{ MobileDevice : mobileDevices
  User ||--o{ MobileSession : mobileSessions
  User ||--o{ MobilePushNotification : mobilePushNotifications
  User ||--o{ MobileSyncCursor : mobileSyncCursors
  Role ||--o{ UserRole : users
  Role ||--o{ RolePermission : permissions
  Role ||--o{ WorkflowDefinitionStep : workflowDefinitionSteps
  Permission ||--o{ RolePermission : roles
  UserRole ||--o{ User : user
  UserRole ||--o{ Role : role
  RolePermission ||--o{ Role : role
  RolePermission ||--o{ Permission : permission
  Company ||--o{ Tenant : tenant
  Company ||--o{ Branch : branches
  Company ||--o{ Department : departments
  Company ||--o{ Position : positions
  Company ||--o{ CostCenter : costCenters
  Company ||--o{ Employee : employees
  Company ||--o{ Shift : shifts
  Company ||--o{ Holiday : holidays
  Company ||--o{ LeaveType : leaveTypes
  Company ||--o{ LeaveBalance : leaveBalances
  Company ||--o{ SalaryComponent : salaryComponents
  Company ||--o{ PayrollPeriod : payrollPeriods
  Company ||--o{ PayrollRun : payrollRuns
  Company ||--o{ Account : accounts
  Company ||--o{ JournalEntry : journalEntries
  Company ||--o{ ReportCategory : reportCategories
  Company ||--o{ ReportDefinition : reportDefinitions
  Company ||--o{ ReportExecution : reportExecutions
  Company ||--o{ JobPosition : jobPositions
  Company ||--o{ Vacancy : vacancies
  Company ||--o{ PerformanceCycle : performanceCycles
  Company ||--o{ AssetCategory : assetCategories
  Company ||--o{ Asset : assets
  Company ||--o{ DocumentCategory : documentCategories
  Company ||--o{ Document : documents
  Company ||--o{ SelfServiceRequest : selfServiceRequests
  Company ||--o{ Notification : notifications
  Company ||--o{ WorkflowDefinition : workflowDefinitions
  Company ||--o{ BusinessRuleCategory : businessRuleCategories
  Company ||--o{ BusinessRule : businessRules
  Company ||--o{ BusinessRuleExecution : businessRuleExecutions
  Company ||--o{ AiProviderConfig : aiProviderConfigs
  Company ||--o{ AiRequestLog : aiRequestLogs
  Company ||--o{ AiUsageRecord : aiUsageRecords
  Company ||--o{ AiUsageLimit : aiUsageLimits
  Company ||--o{ AiSafetyPolicy : aiSafetyPolicies
  Company ||--o{ IntegrationProvider : integrationProviders
  Company ||--o{ IntegrationCredential : integrationCredentials
  Company ||--o{ IntegrationConnection : integrationConnections
  Company ||--o{ IntegrationWebhook : integrationWebhooks
  Company ||--o{ IntegrationRestConnector : integrationRestConnectors
  Company ||--o{ IntegrationRetryPolicy : integrationRetryPolicies
  Company ||--o{ IntegrationOutboundJob : integrationOutboundJobs
  Company ||--o{ IntegrationInboundEvent : integrationInboundEvents
  Company ||--o{ IntegrationExecutionHistory : integrationExecutions
  Company ||--o{ IntegrationHealthSnapshot : integrationHealthSnapshots
  Company ||--o{ PluginManifest : pluginManifests
  Company ||--o{ PluginRegistryEntry : pluginRegistryEntries
  Company ||--o{ PluginMarketplacePackage : pluginMarketplacePackages
  Company ||--o{ PluginInstallation : pluginInstallations
  Company ||--o{ MobileDevice : mobileDevices
  Company ||--o{ MobileSession : mobileSessions
  Company ||--o{ MobileSyncCursor : mobileSyncCursors
  Company ||--o{ MobileSyncChange : mobileSyncChanges
  Company ||--o{ SearchIndex : searchIndexes
  Company ||--o{ SearchQueryLog : searchQueryLogs
  Company ||--o{ BiKpiDefinition : biKpiDefinitions
  Company ||--o{ BiKpiSnapshot : biKpiSnapshots
  Company ||--o{ BiDataset : biDatasets
  Company ||--o{ BiMetricDefinition : biMetricDefinitions
  Company ||--o{ BiMetricObservation : biMetricObservations
  Company ||--o{ BiAnalyticsExecution : biAnalyticsExecutions
  Company ||--o{ BiDashboard : biDashboards
  Company ||--o{ BiPredictionModel : biPredictionModels
  Company ||--o{ BiPredictionRun : biPredictionRuns
  Tenant ||--o{ Company : companies
  Tenant ||--o{ Branch : branches
  Tenant ||--o{ TenantDomain : domains
  Tenant ||--o{ TenantSetting : settings
  Tenant ||--o{ TenantFeatureFlag : flags
  Tenant ||--o{ TenantLocalization : locales
  Tenant ||--o{ TenantBranding : branding
  Tenant ||--o{ TenantUsageLimit : limits
  Tenant ||--o{ TenantProvisioningEvent : events
  Tenant ||--o{ TenantPermissionPolicy : policies
  Tenant ||--o{ TenantAuditEvent : audits
  Tenant ||--o{ PublicApiGroup : apiGroups
  Tenant ||--o{ PublicApiRegistry : apis
  Tenant ||--o{ PublicApiApplication : apiApplications
  Tenant ||--o{ PublicApiKey : apiKeys
  Tenant ||--o{ PublicApiRateLimitPolicy : apiRateLimitPolicies
  Tenant ||--o{ PublicApiUsageCounter : apiUsageCounters
  Tenant ||--o{ PublicApiRequestLog : apiRequestLogs
  Tenant ||--o{ PublicApiSignatureNonce : apiSignatureNonces
  Tenant ||--o{ ObservabilityHealthProvider : observabilityProviders
  Tenant ||--o{ ObservabilityHealthCheckResult : observabilityChecks
  Tenant ||--o{ ObservabilityMetricDefinition : observabilityMetricDefinitions
  Tenant ||--o{ ObservabilityMetricSample : observabilityMetricSamples
  Tenant ||--o{ ObservabilityLogEntry : observabilityLogs
  Tenant ||--o{ ObservabilityTrace : observabilityTraces
  Tenant ||--o{ ObservabilitySpan : observabilitySpans
  Tenant ||--o{ SchedulerCronRegistry : schedulerCrons
  Tenant ||--o{ SchedulerScheduledJob : schedulerJobs
  Tenant ||--o{ SchedulerJobHistory : schedulerJobHistories
  Tenant ||--o{ SchedulerFailureRecovery : schedulerRecoveries
  Tenant ||--o{ MobileDevice : mobileDevices
  Tenant ||--o{ MobileSession : mobileSessions
  Tenant ||--o{ MobilePushNotification : mobilePushNotifications
  Tenant ||--o{ MobileSyncCursor : mobileSyncCursors
  Tenant ||--o{ MobileSyncChange : mobileSyncChanges
  Tenant ||--o{ SearchIndex : searchIndexes
  Tenant ||--o{ SearchQueryLog : searchQueryLogs
  Tenant ||--o{ BiKpiDefinition : biKpiDefinitions
  Tenant ||--o{ BiKpiSnapshot : biKpiSnapshots
  Tenant ||--o{ BiDataset : biDatasets
  Tenant ||--o{ BiMetricDefinition : biMetricDefinitions
  Tenant ||--o{ BiMetricObservation : biMetricObservations
  Tenant ||--o{ BiAnalyticsExecution : biAnalyticsExecutions
  Tenant ||--o{ BiDashboard : biDashboards
  Tenant ||--o{ BiPredictionModel : biPredictionModels
  Tenant ||--o{ BiPredictionRun : biPredictionRuns
  TenantDomain ||--o{ Tenant : tenant
  TenantSetting ||--o{ Tenant : tenant
  TenantFeatureFlag ||--o{ Tenant : tenant
  TenantLocalization ||--o{ Tenant : tenant
  TenantBranding ||--o{ Tenant : tenant
  TenantUsageLimit ||--o{ Tenant : tenant
  TenantProvisioningEvent ||--o{ Tenant : tenant
  TenantPermissionPolicy ||--o{ Tenant : tenant
  TenantAuditEvent ||--o{ Tenant : tenant
  PublicApiGroup ||--o{ Tenant : tenant
  PublicApiGroup ||--o{ PublicApiRegistry : apis
  PublicApiRegistry ||--o{ Tenant : tenant
  PublicApiRegistry ||--o{ PublicApiGroup : group
  PublicApiRegistry ||--o{ PublicApiVersion : versions
  PublicApiRegistry ||--o{ PublicApiRateLimitPolicy : rateLimitPolicies
  PublicApiRegistry ||--o{ PublicApiUsageCounter : usageCounters
  PublicApiRegistry ||--o{ PublicApiRequestLog : requestLogs
  PublicApiVersion ||--o{ PublicApiRegistry : api
  PublicApiApplication ||--o{ Tenant : tenant
  PublicApiApplication ||--o{ PublicApiKey : keys
  PublicApiApplication ||--o{ PublicApiRateLimitPolicy : rateLimitPolicies
  PublicApiApplication ||--o{ PublicApiUsageCounter : usageCounters
  PublicApiApplication ||--o{ PublicApiRequestLog : requestLogs
  PublicApiApplication ||--o{ PublicApiSignatureNonce : signatureNonces
  PublicApiKey ||--o{ Tenant : tenant
  PublicApiKey ||--o{ PublicApiApplication : application
  PublicApiRateLimitPolicy ||--o{ Tenant : tenant
  PublicApiRateLimitPolicy ||--o{ PublicApiApplication : application
  PublicApiRateLimitPolicy ||--o{ PublicApiRegistry : api
  PublicApiUsageCounter ||--o{ Tenant : tenant
  PublicApiUsageCounter ||--o{ PublicApiApplication : application
  PublicApiUsageCounter ||--o{ PublicApiRegistry : api
  PublicApiRequestLog ||--o{ Tenant : tenant
  PublicApiRequestLog ||--o{ PublicApiApplication : application
  PublicApiRequestLog ||--o{ PublicApiRegistry : api
  PublicApiSignatureNonce ||--o{ Tenant : tenant
  PublicApiSignatureNonce ||--o{ PublicApiApplication : application
  ObservabilityHealthProvider ||--o{ Tenant : tenant
  ObservabilityHealthProvider ||--o{ ObservabilityHealthCheckResult : results
  ObservabilityHealthCheckResult ||--o{ Tenant : tenant
  ObservabilityHealthCheckResult ||--o{ ObservabilityHealthProvider : provider
  ObservabilityMetricDefinition ||--o{ Tenant : tenant
  ObservabilityMetricDefinition ||--o{ ObservabilityMetricSample : samples
  ObservabilityMetricSample ||--o{ Tenant : tenant
  ObservabilityMetricSample ||--o{ ObservabilityMetricDefinition : definition
  ObservabilityLogEntry ||--o{ Tenant : tenant
  ObservabilityTrace ||--o{ Tenant : tenant
  ObservabilityTrace ||--o{ ObservabilitySpan : spans
  ObservabilitySpan ||--o{ ObservabilityTrace : trace
  ObservabilitySpan ||--o{ Tenant : tenant
  ObservabilitySpan ||--o{ ObservabilitySpan : parent
  ObservabilitySpan ||--o{ ObservabilitySpan : children
  SchedulerCronRegistry ||--o{ Tenant : tenant
  SchedulerCronRegistry ||--o{ SchedulerScheduledJob : jobs
  SchedulerCronRegistry ||--o{ SchedulerJobHistory : histories
  SchedulerScheduledJob ||--o{ Tenant : tenant
  SchedulerScheduledJob ||--o{ SchedulerCronRegistry : cron
  SchedulerScheduledJob ||--o{ SchedulerJobHistory : histories
  SchedulerScheduledJob ||--o{ SchedulerFailureRecovery : recoveries
  SchedulerJobHistory ||--o{ Tenant : tenant
  SchedulerJobHistory ||--o{ SchedulerScheduledJob : job
  SchedulerJobHistory ||--o{ SchedulerCronRegistry : cron
  SchedulerJobHistory ||--o{ SchedulerFailureRecovery : recoveries
  SchedulerFailureRecovery ||--o{ Tenant : tenant
  SchedulerFailureRecovery ||--o{ SchedulerScheduledJob : job
  SchedulerFailureRecovery ||--o{ SchedulerJobHistory : history
  MobileDevice ||--o{ Tenant : tenant
  MobileDevice ||--o{ User : user
  MobileDevice ||--o{ Company : company
  MobileDevice ||--o{ Branch : branch
  MobileDevice ||--o{ MobileSession : sessions
  MobileDevice ||--o{ MobilePushNotification : pushNotifications
  MobileDevice ||--o{ MobileSyncCursor : syncCursors
  MobileSession ||--o{ Tenant : tenant
  MobileSession ||--o{ User : user
  MobileSession ||--o{ MobileDevice : device
  MobileSession ||--o{ Company : company
  MobileSession ||--o{ Branch : branch
  MobilePushNotification ||--o{ Tenant : tenant
  MobilePushNotification ||--o{ User : user
  MobilePushNotification ||--o{ MobileDevice : device
  MobileSyncCursor ||--o{ Tenant : tenant
  MobileSyncCursor ||--o{ User : user
  MobileSyncCursor ||--o{ MobileDevice : device
  MobileSyncCursor ||--o{ Company : company
  MobileSyncCursor ||--o{ Branch : branch
  MobileSyncChange ||--o{ Tenant : tenant
  MobileSyncChange ||--o{ Company : company
  MobileSyncChange ||--o{ Branch : branch
  SearchIndex ||--o{ Tenant : tenant
  SearchIndex ||--o{ Company : company
  SearchIndex ||--o{ Branch : branch
  SearchQueryLog ||--o{ Tenant : tenant
  SearchQueryLog ||--o{ Company : company
  SearchQueryLog ||--o{ Branch : branch
  BiKpiDefinition ||--o{ Tenant : tenant
  BiKpiDefinition ||--o{ Company : company
  BiKpiDefinition ||--o{ Branch : branch
  BiKpiDefinition ||--o{ BiKpiSnapshot : snapshots
  BiKpiSnapshot ||--o{ Tenant : tenant
  BiKpiSnapshot ||--o{ Company : company
  BiKpiSnapshot ||--o{ Branch : branch
  BiKpiSnapshot ||--o{ BiKpiDefinition : kpi
  BiDataset ||--o{ Tenant : tenant
  BiDataset ||--o{ Company : company
  BiDataset ||--o{ Branch : branch
  BiDataset ||--o{ BiMetricDefinition : metrics
  BiDataset ||--o{ BiAnalyticsExecution : executions
  BiMetricDefinition ||--o{ Tenant : tenant
  BiMetricDefinition ||--o{ Company : company
  BiMetricDefinition ||--o{ Branch : branch
  BiMetricDefinition ||--o{ BiDataset : dataset
  BiMetricDefinition ||--o{ BiMetricObservation : observations
  BiMetricObservation ||--o{ Tenant : tenant
  BiMetricObservation ||--o{ Company : company
  BiMetricObservation ||--o{ Branch : branch
  BiMetricObservation ||--o{ BiMetricDefinition : metric
  BiAnalyticsExecution ||--o{ Tenant : tenant
  BiAnalyticsExecution ||--o{ Company : company
  BiAnalyticsExecution ||--o{ Branch : branch
  BiAnalyticsExecution ||--o{ BiDataset : dataset
  BiDashboard ||--o{ Tenant : tenant
  BiDashboard ||--o{ Company : company
  BiDashboard ||--o{ Branch : branch
  BiDashboard ||--o{ BiDashboardWidget : widgets
  BiDashboardWidget ||--o{ BiDashboard : dashboard
  BiPredictionModel ||--o{ Tenant : tenant
  BiPredictionModel ||--o{ Company : company
  BiPredictionModel ||--o{ Branch : branch
  BiPredictionModel ||--o{ BiPredictionRun : runs
  BiPredictionRun ||--o{ Tenant : tenant
  BiPredictionRun ||--o{ Company : company
  BiPredictionRun ||--o{ Branch : branch
  BiPredictionRun ||--o{ BiPredictionModel : model
  Account ||--o{ Company : company
  Account ||--o{ Account : parent
  Account ||--o{ Account : children
  Account ||--o{ JournalEntryLine : lines
  JournalEntry ||--o{ Company : company
  JournalEntry ||--o{ JournalEntryLine : lines
  JournalEntryLine ||--o{ JournalEntry : journalEntry
  JournalEntryLine ||--o{ Account : account
  JournalEntryLine ||--o{ Employee : employee
  JournalEntryLine ||--o{ Department : department
  JournalEntryLine ||--o{ Branch : branch
  JournalEntryLine ||--o{ CostCenter : costCenter
  ReportCategory ||--o{ Company : company
  ReportCategory ||--o{ ReportDefinition : definitions
  ReportDefinition ||--o{ Company : company
  ReportDefinition ||--o{ ReportCategory : category
  ReportDefinition ||--o{ ReportParameter : parameters
  ReportDefinition ||--o{ ReportExecution : executions
  ReportParameter ||--o{ ReportDefinition : report
  ReportExecution ||--o{ Company : company
  ReportExecution ||--o{ ReportDefinition : report
  Branch ||--o{ Tenant : tenant
  Branch ||--o{ Company : company
  Branch ||--o{ Department : departments
  Branch ||--o{ CostCenter : costCenters
  Branch ||--o{ Employee : employees
  Branch ||--o{ Shift : shifts
  Branch ||--o{ Holiday : holidays
  Branch ||--o{ JournalEntryLine : journalEntryLines
  Branch ||--o{ BusinessRule : businessRules
  Branch ||--o{ MobileDevice : mobileDevices
  Branch ||--o{ MobileSession : mobileSessions
  Branch ||--o{ MobileSyncCursor : mobileSyncCursors
  Branch ||--o{ MobileSyncChange : mobileSyncChanges
  Branch ||--o{ SearchIndex : searchIndexes
  Branch ||--o{ SearchQueryLog : searchQueryLogs
  Branch ||--o{ BiKpiDefinition : biKpiDefinitions
  Branch ||--o{ BiKpiSnapshot : biKpiSnapshots
  Branch ||--o{ BiDataset : biDatasets
  Branch ||--o{ BiMetricDefinition : biMetricDefinitions
  Branch ||--o{ BiMetricObservation : biMetricObservations
  Branch ||--o{ BiAnalyticsExecution : biAnalyticsExecutions
  Branch ||--o{ BiDashboard : biDashboards
  Branch ||--o{ BiPredictionModel : biPredictionModels
  Branch ||--o{ BiPredictionRun : biPredictionRuns
  Department ||--o{ Company : company
  Department ||--o{ Branch : branch
  Department ||--o{ Department : parent
  Department ||--o{ Department : children
  Department ||--o{ Position : positions
  Department ||--o{ Employee : employees
  Department ||--o{ JournalEntryLine : journalEntryLines
  Position ||--o{ Company : company
  Position ||--o{ Department : department
  Position ||--o{ Employee : employees
  CostCenter ||--o{ Company : company
  CostCenter ||--o{ Branch : branch
  CostCenter ||--o{ Employee : employees
  CostCenter ||--o{ JournalEntryLine : journalEntryLines
  Employee ||--o{ User : user
  Employee ||--o{ Company : company
  Employee ||--o{ Branch : branch
  Employee ||--o{ Department : department
  Employee ||--o{ Position : position
  Employee ||--o{ CostCenter : costCenter
  Employee ||--o{ EmployeeShiftAssignment : shiftAssignments
  Employee ||--o{ AttendanceRecord : attendanceRecords
  Employee ||--o{ LeaveBalance : leaveBalances
  Employee ||--o{ LeaveRequest : leaveRequests
  Employee ||--o{ PayrollProfile : payrollProfiles
  Employee ||--o{ PayrollItem : payrollItems
  Employee ||--o{ Payslip : payslips
  Employee ||--o{ JournalEntryLine : journalEntryLines
  Employee ||--o{ JobApplication : jobApplications
  Employee ||--o{ Interview : interviews
  Employee ||--o{ InterviewEvaluation : interviewEvaluations
  Employee ||--o{ PerformanceGoal : performanceGoals
  Employee ||--o{ PerformanceReview : performanceReviews
  Employee ||--o{ PerformanceReview : managedPerformanceReviews
  Employee ||--o{ WorkflowRequest : workflowRequests
  Employee ||--o{ WorkflowStep : workflowApprovals
  Employee ||--o{ AssetAssignment : assetAssignments
  Employee ||--o{ Document : documents
  Employee ||--o{ SelfServiceRequest : selfServiceRequests
  Employee ||--o{ Notification : notifications
  Employee ||--o{ WorkflowDefinitionStep : workflowDefinitionSteps
  Shift ||--o{ Company : company
  Shift ||--o{ Branch : branch
  Shift ||--o{ EmployeeShiftAssignment : assignments
  Shift ||--o{ AttendanceRecord : attendanceRecords
  EmployeeShiftAssignment ||--o{ Employee : employee
  EmployeeShiftAssignment ||--o{ Shift : shift
  AttendanceRecord ||--o{ Employee : employee
  AttendanceRecord ||--o{ Shift : shift
  Holiday ||--o{ Company : company
  Holiday ||--o{ Branch : branch
  LeaveType ||--o{ Company : company
  LeaveType ||--o{ LeaveBalance : balances
  LeaveType ||--o{ LeaveRequest : requests
  LeaveBalance ||--o{ Company : company
  LeaveBalance ||--o{ Employee : employee
  LeaveBalance ||--o{ LeaveType : leaveType
  LeaveRequest ||--o{ Employee : employee
  LeaveRequest ||--o{ LeaveType : leaveType
  LeaveRequest ||--o{ LeaveApproval : approvals
  LeaveApproval ||--o{ LeaveRequest : leaveRequest
  LeaveApproval ||--o{ User : approver
  SalaryComponent ||--o{ Company : company
  SalaryComponent ||--o{ PayrollItem : payrollItems
  PayrollProfile ||--o{ Employee : employee
  PayrollPeriod ||--o{ Company : company
  PayrollPeriod ||--o{ PayrollRun : runs
  PayrollRun ||--o{ Company : company
  PayrollRun ||--o{ PayrollPeriod : period
  PayrollRun ||--o{ User : reviewedBy
  PayrollRun ||--o{ User : approvedBy
  PayrollRun ||--o{ PayrollItem : items
  PayrollRun ||--o{ Payslip : payslips
  PayrollItem ||--o{ PayrollRun : payrollRun
  PayrollItem ||--o{ Employee : employee
  PayrollItem ||--o{ SalaryComponent : salaryComponent
  Payslip ||--o{ PayrollRun : payrollRun
  Payslip ||--o{ Employee : employee
  JobPosition ||--o{ Company : company
  JobPosition ||--o{ Vacancy : vacancies
  JobPosition ||--o{ PerformanceCycle : performanceCycles
  JobPosition ||--o{ AssetCategory : assetCategories
  JobPosition ||--o{ Asset : assets
  JobPosition ||--o{ DocumentCategory : documentCategories
  JobPosition ||--o{ Document : documents
  JobPosition ||--o{ SelfServiceRequest : selfServiceRequests
  JobPosition ||--o{ Notification : notifications
  Vacancy ||--o{ Company : company
  Vacancy ||--o{ JobPosition : jobPosition
  Vacancy ||--o{ JobApplication : jobApplications
  Applicant ||--o{ JobApplication : jobApplications
  JobApplication ||--o{ Vacancy : vacancy
  JobApplication ||--o{ Applicant : applicant
  JobApplication ||--o{ Employee : employee
  JobApplication ||--o{ OfferLetter : offerLetters
  JobApplication ||--o{ Interview : interviews
  Interview ||--o{ InterviewEvaluation : evaluations
  Interview ||--o{ JobApplication : application
  Interview ||--o{ Employee : interviewer
  InterviewEvaluation ||--o{ Interview : interview
  InterviewEvaluation ||--o{ Employee : evaluator
  OfferLetter ||--o{ JobApplication : application
  PerformanceCycle ||--o{ Company : company
  PerformanceCycle ||--o{ PerformanceGoal : goals
  PerformanceCycle ||--o{ PerformanceReview : reviews
  PerformanceCycle ||--o{ JobPosition : jobPosition
  PerformanceGoal ||--o{ PerformanceCycle : cycle
  PerformanceGoal ||--o{ Employee : employee
  PerformanceReview ||--o{ PerformanceCycle : cycle
  PerformanceReview ||--o{ Employee : employee
  PerformanceReview ||--o{ Employee : manager
  PerformanceReview ||--o{ PerformanceReviewItem : items
  PerformanceReviewItem ||--o{ PerformanceReview : review
  AssetCategory ||--o{ Company : company
  AssetCategory ||--o{ Asset : assets
  AssetCategory ||--o{ DocumentCategory : documentCategories
  AssetCategory ||--o{ Document : documents
  AssetCategory ||--o{ SelfServiceRequest : selfServiceRequests
  AssetCategory ||--o{ Notification : notifications
  AssetCategory ||--o{ JobPosition : jobPosition
  Asset ||--o{ Company : company
  Asset ||--o{ AssetCategory : category
  Asset ||--o{ AssetAssignment : assignments
  Asset ||--o{ AssetMaintenance : maintenances
  Asset ||--o{ JobPosition : jobPosition
  AssetAssignment ||--o{ Asset : asset
  AssetAssignment ||--o{ Employee : employee
  AssetMaintenance ||--o{ Asset : asset
  DocumentCategory ||--o{ Company : company
  DocumentCategory ||--o{ Document : documents
  DocumentCategory ||--o{ SelfServiceRequest : selfServiceRequests
  DocumentCategory ||--o{ Notification : notifications
  DocumentCategory ||--o{ JobPosition : jobPosition
  DocumentCategory ||--o{ AssetCategory : assetCategory
  Document ||--o{ Company : company
  Document ||--o{ DocumentCategory : category
  Document ||--o{ Employee : employee
  Document ||--o{ DocumentVersion : versions
  Document ||--o{ JobPosition : jobPosition
  Document ||--o{ AssetCategory : assetCategory
  DocumentVersion ||--o{ Document : document
  SelfServiceRequest ||--o{ Employee : employee
  SelfServiceRequest ||--o{ Company : company
  SelfServiceRequest ||--o{ JobPosition : jobPosition
  SelfServiceRequest ||--o{ AssetCategory : assetCategory
  SelfServiceRequest ||--o{ DocumentCategory : documentCategory
  Notification ||--o{ Company : company
  Notification ||--o{ Employee : employee
  Notification ||--o{ JobPosition : jobPosition
  Notification ||--o{ AssetCategory : assetCategory
  Notification ||--o{ DocumentCategory : documentCategory
  WorkflowDefinition ||--o{ Company : company
  WorkflowDefinition ||--o{ WorkflowDefinitionStep : steps
  WorkflowDefinition ||--o{ WorkflowRequest : requests
  WorkflowDefinitionStep ||--o{ WorkflowDefinition : workflow
  WorkflowDefinitionStep ||--o{ Role : approverRole
  WorkflowDefinitionStep ||--o{ User : approverUser
  WorkflowDefinitionStep ||--o{ Employee : approverEmployee
  WorkflowRequest ||--o{ WorkflowDefinition : workflow
  WorkflowRequest ||--o{ Employee : requester
  WorkflowRequest ||--o{ WorkflowStep : steps
  WorkflowStep ||--o{ WorkflowRequest : request
  WorkflowStep ||--o{ Employee : approver
  AuditLog ||--o{ User : createdBy
  BusinessRuleCategory ||--o{ Company : company
  BusinessRuleCategory ||--o{ BusinessRule : rules
  BusinessRule ||--o{ Company : company
  BusinessRule ||--o{ Branch : branch
  BusinessRule ||--o{ BusinessRuleCategory : category
  BusinessRule ||--o{ BusinessRuleCondition : conditions
  BusinessRule ||--o{ BusinessRuleAction : actions
  BusinessRule ||--o{ BusinessRuleExecution : executions
  BusinessRuleCondition ||--o{ BusinessRule : rule
  BusinessRuleAction ||--o{ BusinessRule : rule
  BusinessRuleExecution ||--o{ Company : company
  BusinessRuleExecution ||--o{ BusinessRule : rule
  AiProviderConfig ||--o{ Company : company
  AiProviderConfig ||--o{ AiRequestLog : requestLogs
  AiRequestLog ||--o{ Company : company
  AiRequestLog ||--o{ AiProviderConfig : provider
  AiRequestLog ||--o{ AiUsageRecord : usageRecords
  AiUsageRecord ||--o{ Company : company
  AiUsageRecord ||--o{ AiRequestLog : requestLog
  AiUsageLimit ||--o{ Company : company
  AiSafetyPolicy ||--o{ Company : company
  IntegrationProvider ||--o{ Company : company
  IntegrationProvider ||--o{ IntegrationCredential : credentials
  IntegrationProvider ||--o{ IntegrationConnection : connections
  IntegrationProvider ||--o{ IntegrationWebhook : webhooks
  IntegrationCredential ||--o{ Company : company
  IntegrationCredential ||--o{ IntegrationProvider : provider
  IntegrationCredential ||--o{ IntegrationConnection : connections
  IntegrationConnection ||--o{ Company : company
  IntegrationConnection ||--o{ IntegrationProvider : provider
  IntegrationConnection ||--o{ IntegrationCredential : credential
  IntegrationConnection ||--o{ IntegrationRestConnector : restConnectors
  IntegrationConnection ||--o{ IntegrationOutboundJob : outboundJobs
  IntegrationConnection ||--o{ IntegrationInboundEvent : inboundEvents
  IntegrationConnection ||--o{ IntegrationExecutionHistory : executions
  IntegrationConnection ||--o{ IntegrationHealthSnapshot : healthSnapshots
  IntegrationInboundEvent ||--o{ Company : company
  IntegrationInboundEvent ||--o{ IntegrationConnection : connection
  IntegrationInboundEvent ||--o{ IntegrationExecutionHistory : executions
  IntegrationExecutionHistory ||--o{ Company : company
  IntegrationExecutionHistory ||--o{ IntegrationConnection : connection
  IntegrationExecutionHistory ||--o{ IntegrationOutboundJob : outboundJob
  IntegrationExecutionHistory ||--o{ IntegrationInboundEvent : inboundEvent
  IntegrationRetryPolicy ||--o{ Company : company
  IntegrationRetryPolicy ||--o{ IntegrationWebhook : webhooks
  IntegrationRetryPolicy ||--o{ IntegrationOutboundJob : outboundJobs
  IntegrationWebhook ||--o{ Company : company
  IntegrationWebhook ||--o{ IntegrationProvider : provider
  IntegrationWebhook ||--o{ IntegrationRetryPolicy : retryPolicy
  IntegrationWebhook ||--o{ IntegrationOutboundJob : outboundJobs
  IntegrationRestConnector ||--o{ Company : company
  IntegrationRestConnector ||--o{ IntegrationConnection : connection
  IntegrationRestConnector ||--o{ IntegrationOutboundJob : outboundJobs
  IntegrationOutboundJob ||--o{ Company : company
  IntegrationOutboundJob ||--o{ IntegrationConnection : connection
  IntegrationOutboundJob ||--o{ IntegrationWebhook : webhook
  IntegrationOutboundJob ||--o{ IntegrationRestConnector : restConnector
  IntegrationOutboundJob ||--o{ IntegrationRetryPolicy : retryPolicy
  IntegrationOutboundJob ||--o{ IntegrationExecutionHistory : executions
  IntegrationOutboundJob ||--o{ IntegrationRetryHistory : retryHistory
  IntegrationRetryHistory ||--o{ IntegrationOutboundJob : outboundJob
  IntegrationHealthSnapshot ||--o{ Company : company
  IntegrationHealthSnapshot ||--o{ IntegrationConnection : connection
  PluginManifest ||--o{ Company : company
  PluginManifest ||--o{ PluginRegistryEntry : registryEntries
  PluginManifest ||--o{ PluginMarketplaceVersion : marketplaceVersions
  PluginRegistryEntry ||--o{ Company : company
  PluginRegistryEntry ||--o{ PluginManifest : manifest
  PluginRegistryEntry ||--o{ PluginLifecycleEvent : lifecycleEvents
  PluginRegistryEntry ||--o{ PluginEventSubscription : eventSubscriptions
  PluginRegistryEntry ||--o{ PluginHook : hooks
  PluginRegistryEntry ||--o{ PluginServiceBinding : serviceBindings
  PluginRegistryEntry ||--o{ PluginPermissionGrant : permissionGrants
  PluginRegistryEntry ||--o{ PluginConfiguration : configurations
  PluginRegistryEntry ||--o{ PluginEvent : events
  PluginRegistryEntry ||--o{ PluginInstallation : installations
  PluginRegistryEntry ||--o{ PluginSandboxPolicy : sandboxPolicy
  PluginRegistryEntry ||--o{ PluginDependency : dependencies
  PluginRegistryEntry ||--o{ PluginCapabilityGrant : capabilityGrants
  PluginLifecycleEvent ||--o{ PluginRegistryEntry : registryEntry
  PluginSandboxPolicy ||--o{ PluginRegistryEntry : registryEntry
  PluginDependency ||--o{ PluginRegistryEntry : registryEntry
  PluginCapabilityGrant ||--o{ PluginRegistryEntry : registryEntry
  PluginMarketplacePackage ||--o{ Company : company
  PluginMarketplacePackage ||--o{ PluginMarketplaceVersion : versions
  PluginMarketplaceVersion ||--o{ PluginMarketplacePackage : package
  PluginMarketplaceVersion ||--o{ PluginManifest : manifest
  PluginMarketplaceVersion ||--o{ PluginInstallation : installations
  PluginInstallation ||--o{ Company : company
  PluginInstallation ||--o{ PluginMarketplaceVersion : packageVersion
  PluginInstallation ||--o{ PluginRegistryEntry : registryEntry
  PluginInstallation ||--o{ PluginInstallation : upgradedFrom
  PluginInstallation ||--o{ PluginInstallation : upgrades
  PluginEventSubscription ||--o{ PluginRegistryEntry : registryEntry
  PluginHook ||--o{ PluginRegistryEntry : registryEntry
  PluginServiceBinding ||--o{ PluginRegistryEntry : registryEntry
  PluginPermissionGrant ||--o{ PluginRegistryEntry : registryEntry
  PluginConfiguration ||--o{ PluginRegistryEntry : registryEntry
  PluginEvent ||--o{ PluginRegistryEntry : registryEntry
```

## Relationship Edges

| From | To | Field |
| --- | --- | --- |
| User | UserRole | roles |
| User | AuditLog | createdLogs |
| User | Employee | employee |
| User | LeaveApproval | leaveApprovals |
| User | PayrollRun | reviewedPayrollRuns |
| User | PayrollRun | approvedPayrollRuns |
| User | WorkflowDefinitionStep | workflowDefinitionSteps |
| User | MobileDevice | mobileDevices |
| User | MobileSession | mobileSessions |
| User | MobilePushNotification | mobilePushNotifications |
| User | MobileSyncCursor | mobileSyncCursors |
| Role | UserRole | users |
| Role | RolePermission | permissions |
| Role | WorkflowDefinitionStep | workflowDefinitionSteps |
| Permission | RolePermission | roles |
| UserRole | User | user |
| UserRole | Role | role |
| RolePermission | Role | role |
| RolePermission | Permission | permission |
| Company | Tenant | tenant |
| Company | Branch | branches |
| Company | Department | departments |
| Company | Position | positions |
| Company | CostCenter | costCenters |
| Company | Employee | employees |
| Company | Shift | shifts |
| Company | Holiday | holidays |
| Company | LeaveType | leaveTypes |
| Company | LeaveBalance | leaveBalances |
| Company | SalaryComponent | salaryComponents |
| Company | PayrollPeriod | payrollPeriods |
| Company | PayrollRun | payrollRuns |
| Company | Account | accounts |
| Company | JournalEntry | journalEntries |
| Company | ReportCategory | reportCategories |
| Company | ReportDefinition | reportDefinitions |
| Company | ReportExecution | reportExecutions |
| Company | JobPosition | jobPositions |
| Company | Vacancy | vacancies |
| Company | PerformanceCycle | performanceCycles |
| Company | AssetCategory | assetCategories |
| Company | Asset | assets |
| Company | DocumentCategory | documentCategories |
| Company | Document | documents |
| Company | SelfServiceRequest | selfServiceRequests |
| Company | Notification | notifications |
| Company | WorkflowDefinition | workflowDefinitions |
| Company | BusinessRuleCategory | businessRuleCategories |
| Company | BusinessRule | businessRules |
| Company | BusinessRuleExecution | businessRuleExecutions |
| Company | AiProviderConfig | aiProviderConfigs |
| Company | AiRequestLog | aiRequestLogs |
| Company | AiUsageRecord | aiUsageRecords |
| Company | AiUsageLimit | aiUsageLimits |
| Company | AiSafetyPolicy | aiSafetyPolicies |
| Company | IntegrationProvider | integrationProviders |
| Company | IntegrationCredential | integrationCredentials |
| Company | IntegrationConnection | integrationConnections |
| Company | IntegrationWebhook | integrationWebhooks |
| Company | IntegrationRestConnector | integrationRestConnectors |
| Company | IntegrationRetryPolicy | integrationRetryPolicies |
| Company | IntegrationOutboundJob | integrationOutboundJobs |
| Company | IntegrationInboundEvent | integrationInboundEvents |
| Company | IntegrationExecutionHistory | integrationExecutions |
| Company | IntegrationHealthSnapshot | integrationHealthSnapshots |
| Company | PluginManifest | pluginManifests |
| Company | PluginRegistryEntry | pluginRegistryEntries |
| Company | PluginMarketplacePackage | pluginMarketplacePackages |
| Company | PluginInstallation | pluginInstallations |
| Company | MobileDevice | mobileDevices |
| Company | MobileSession | mobileSessions |
| Company | MobileSyncCursor | mobileSyncCursors |
| Company | MobileSyncChange | mobileSyncChanges |
| Company | SearchIndex | searchIndexes |
| Company | SearchQueryLog | searchQueryLogs |
| Company | BiKpiDefinition | biKpiDefinitions |
| Company | BiKpiSnapshot | biKpiSnapshots |
| Company | BiDataset | biDatasets |
| Company | BiMetricDefinition | biMetricDefinitions |
| Company | BiMetricObservation | biMetricObservations |
| Company | BiAnalyticsExecution | biAnalyticsExecutions |
| Company | BiDashboard | biDashboards |
| Company | BiPredictionModel | biPredictionModels |
| Company | BiPredictionRun | biPredictionRuns |
| Tenant | Company | companies |
| Tenant | Branch | branches |
| Tenant | TenantDomain | domains |
| Tenant | TenantSetting | settings |
| Tenant | TenantFeatureFlag | flags |
| Tenant | TenantLocalization | locales |
| Tenant | TenantBranding | branding |
| Tenant | TenantUsageLimit | limits |
| Tenant | TenantProvisioningEvent | events |
| Tenant | TenantPermissionPolicy | policies |
| Tenant | TenantAuditEvent | audits |
| Tenant | PublicApiGroup | apiGroups |
| Tenant | PublicApiRegistry | apis |
| Tenant | PublicApiApplication | apiApplications |
| Tenant | PublicApiKey | apiKeys |
| Tenant | PublicApiRateLimitPolicy | apiRateLimitPolicies |
| Tenant | PublicApiUsageCounter | apiUsageCounters |
| Tenant | PublicApiRequestLog | apiRequestLogs |
| Tenant | PublicApiSignatureNonce | apiSignatureNonces |
| Tenant | ObservabilityHealthProvider | observabilityProviders |
| Tenant | ObservabilityHealthCheckResult | observabilityChecks |
| Tenant | ObservabilityMetricDefinition | observabilityMetricDefinitions |
| Tenant | ObservabilityMetricSample | observabilityMetricSamples |
| Tenant | ObservabilityLogEntry | observabilityLogs |
| Tenant | ObservabilityTrace | observabilityTraces |
| Tenant | ObservabilitySpan | observabilitySpans |
| Tenant | SchedulerCronRegistry | schedulerCrons |
| Tenant | SchedulerScheduledJob | schedulerJobs |
| Tenant | SchedulerJobHistory | schedulerJobHistories |
| Tenant | SchedulerFailureRecovery | schedulerRecoveries |
| Tenant | MobileDevice | mobileDevices |
| Tenant | MobileSession | mobileSessions |
| Tenant | MobilePushNotification | mobilePushNotifications |
| Tenant | MobileSyncCursor | mobileSyncCursors |
| Tenant | MobileSyncChange | mobileSyncChanges |
| Tenant | SearchIndex | searchIndexes |
| Tenant | SearchQueryLog | searchQueryLogs |
| Tenant | BiKpiDefinition | biKpiDefinitions |
| Tenant | BiKpiSnapshot | biKpiSnapshots |
| Tenant | BiDataset | biDatasets |
| Tenant | BiMetricDefinition | biMetricDefinitions |
| Tenant | BiMetricObservation | biMetricObservations |
| Tenant | BiAnalyticsExecution | biAnalyticsExecutions |
| Tenant | BiDashboard | biDashboards |
| Tenant | BiPredictionModel | biPredictionModels |
| Tenant | BiPredictionRun | biPredictionRuns |
| TenantDomain | Tenant | tenant |
| TenantSetting | Tenant | tenant |
| TenantFeatureFlag | Tenant | tenant |
| TenantLocalization | Tenant | tenant |
| TenantBranding | Tenant | tenant |
| TenantUsageLimit | Tenant | tenant |
| TenantProvisioningEvent | Tenant | tenant |
| TenantPermissionPolicy | Tenant | tenant |
| TenantAuditEvent | Tenant | tenant |
| PublicApiGroup | Tenant | tenant |
| PublicApiGroup | PublicApiRegistry | apis |
| PublicApiRegistry | Tenant | tenant |
| PublicApiRegistry | PublicApiGroup | group |
| PublicApiRegistry | PublicApiVersion | versions |
| PublicApiRegistry | PublicApiRateLimitPolicy | rateLimitPolicies |
| PublicApiRegistry | PublicApiUsageCounter | usageCounters |
| PublicApiRegistry | PublicApiRequestLog | requestLogs |
| PublicApiVersion | PublicApiRegistry | api |
| PublicApiApplication | Tenant | tenant |
| PublicApiApplication | PublicApiKey | keys |
| PublicApiApplication | PublicApiRateLimitPolicy | rateLimitPolicies |
| PublicApiApplication | PublicApiUsageCounter | usageCounters |
| PublicApiApplication | PublicApiRequestLog | requestLogs |
| PublicApiApplication | PublicApiSignatureNonce | signatureNonces |
| PublicApiKey | Tenant | tenant |
| PublicApiKey | PublicApiApplication | application |
| PublicApiRateLimitPolicy | Tenant | tenant |
| PublicApiRateLimitPolicy | PublicApiApplication | application |
| PublicApiRateLimitPolicy | PublicApiRegistry | api |
| PublicApiUsageCounter | Tenant | tenant |
| PublicApiUsageCounter | PublicApiApplication | application |
| PublicApiUsageCounter | PublicApiRegistry | api |
| PublicApiRequestLog | Tenant | tenant |
| PublicApiRequestLog | PublicApiApplication | application |
| PublicApiRequestLog | PublicApiRegistry | api |
| PublicApiSignatureNonce | Tenant | tenant |
| PublicApiSignatureNonce | PublicApiApplication | application |
| ObservabilityHealthProvider | Tenant | tenant |
| ObservabilityHealthProvider | ObservabilityHealthCheckResult | results |
| ObservabilityHealthCheckResult | Tenant | tenant |
| ObservabilityHealthCheckResult | ObservabilityHealthProvider | provider |
| ObservabilityMetricDefinition | Tenant | tenant |
| ObservabilityMetricDefinition | ObservabilityMetricSample | samples |
| ObservabilityMetricSample | Tenant | tenant |
| ObservabilityMetricSample | ObservabilityMetricDefinition | definition |
| ObservabilityLogEntry | Tenant | tenant |
| ObservabilityTrace | Tenant | tenant |
| ObservabilityTrace | ObservabilitySpan | spans |
| ObservabilitySpan | ObservabilityTrace | trace |
| ObservabilitySpan | Tenant | tenant |
| ObservabilitySpan | ObservabilitySpan | parent |
| ObservabilitySpan | ObservabilitySpan | children |
| SchedulerCronRegistry | Tenant | tenant |
| SchedulerCronRegistry | SchedulerScheduledJob | jobs |
| SchedulerCronRegistry | SchedulerJobHistory | histories |
| SchedulerScheduledJob | Tenant | tenant |
| SchedulerScheduledJob | SchedulerCronRegistry | cron |
| SchedulerScheduledJob | SchedulerJobHistory | histories |
| SchedulerScheduledJob | SchedulerFailureRecovery | recoveries |
| SchedulerJobHistory | Tenant | tenant |
| SchedulerJobHistory | SchedulerScheduledJob | job |
| SchedulerJobHistory | SchedulerCronRegistry | cron |
| SchedulerJobHistory | SchedulerFailureRecovery | recoveries |
| SchedulerFailureRecovery | Tenant | tenant |
| SchedulerFailureRecovery | SchedulerScheduledJob | job |
| SchedulerFailureRecovery | SchedulerJobHistory | history |
| MobileDevice | Tenant | tenant |
| MobileDevice | User | user |
| MobileDevice | Company | company |
| MobileDevice | Branch | branch |
| MobileDevice | MobileSession | sessions |
| MobileDevice | MobilePushNotification | pushNotifications |
| MobileDevice | MobileSyncCursor | syncCursors |
| MobileSession | Tenant | tenant |
| MobileSession | User | user |
| MobileSession | MobileDevice | device |
| MobileSession | Company | company |
| MobileSession | Branch | branch |
| MobilePushNotification | Tenant | tenant |
| MobilePushNotification | User | user |
| MobilePushNotification | MobileDevice | device |
| MobileSyncCursor | Tenant | tenant |
| MobileSyncCursor | User | user |
| MobileSyncCursor | MobileDevice | device |
| MobileSyncCursor | Company | company |
| MobileSyncCursor | Branch | branch |
| MobileSyncChange | Tenant | tenant |
| MobileSyncChange | Company | company |
| MobileSyncChange | Branch | branch |
| SearchIndex | Tenant | tenant |
| SearchIndex | Company | company |
| SearchIndex | Branch | branch |
| SearchQueryLog | Tenant | tenant |
| SearchQueryLog | Company | company |
| SearchQueryLog | Branch | branch |
| BiKpiDefinition | Tenant | tenant |
| BiKpiDefinition | Company | company |
| BiKpiDefinition | Branch | branch |
| BiKpiDefinition | BiKpiSnapshot | snapshots |
| BiKpiSnapshot | Tenant | tenant |
| BiKpiSnapshot | Company | company |
| BiKpiSnapshot | Branch | branch |
| BiKpiSnapshot | BiKpiDefinition | kpi |
| BiDataset | Tenant | tenant |
| BiDataset | Company | company |
| BiDataset | Branch | branch |
| BiDataset | BiMetricDefinition | metrics |
| BiDataset | BiAnalyticsExecution | executions |
| BiMetricDefinition | Tenant | tenant |
| BiMetricDefinition | Company | company |
| BiMetricDefinition | Branch | branch |
| BiMetricDefinition | BiDataset | dataset |
| BiMetricDefinition | BiMetricObservation | observations |
| BiMetricObservation | Tenant | tenant |
| BiMetricObservation | Company | company |
| BiMetricObservation | Branch | branch |
| BiMetricObservation | BiMetricDefinition | metric |
| BiAnalyticsExecution | Tenant | tenant |
| BiAnalyticsExecution | Company | company |
| BiAnalyticsExecution | Branch | branch |
| BiAnalyticsExecution | BiDataset | dataset |
| BiDashboard | Tenant | tenant |
| BiDashboard | Company | company |
| BiDashboard | Branch | branch |
| BiDashboard | BiDashboardWidget | widgets |
| BiDashboardWidget | BiDashboard | dashboard |
| BiPredictionModel | Tenant | tenant |
| BiPredictionModel | Company | company |
| BiPredictionModel | Branch | branch |
| BiPredictionModel | BiPredictionRun | runs |
| BiPredictionRun | Tenant | tenant |
| BiPredictionRun | Company | company |
| BiPredictionRun | Branch | branch |
| BiPredictionRun | BiPredictionModel | model |
| Account | Company | company |
| Account | Account | parent |
| Account | Account | children |
| Account | JournalEntryLine | lines |
| JournalEntry | Company | company |
| JournalEntry | JournalEntryLine | lines |
| JournalEntryLine | JournalEntry | journalEntry |
| JournalEntryLine | Account | account |
| JournalEntryLine | Employee | employee |
| JournalEntryLine | Department | department |
| JournalEntryLine | Branch | branch |
| JournalEntryLine | CostCenter | costCenter |
| ReportCategory | Company | company |
| ReportCategory | ReportDefinition | definitions |
| ReportDefinition | Company | company |
| ReportDefinition | ReportCategory | category |
| ReportDefinition | ReportParameter | parameters |
| ReportDefinition | ReportExecution | executions |
| ReportParameter | ReportDefinition | report |
| ReportExecution | Company | company |
| ReportExecution | ReportDefinition | report |
| Branch | Tenant | tenant |
| Branch | Company | company |
| Branch | Department | departments |
| Branch | CostCenter | costCenters |
| Branch | Employee | employees |
| Branch | Shift | shifts |
| Branch | Holiday | holidays |
| Branch | JournalEntryLine | journalEntryLines |
| Branch | BusinessRule | businessRules |
| Branch | MobileDevice | mobileDevices |
| Branch | MobileSession | mobileSessions |
| Branch | MobileSyncCursor | mobileSyncCursors |
| Branch | MobileSyncChange | mobileSyncChanges |
| Branch | SearchIndex | searchIndexes |
| Branch | SearchQueryLog | searchQueryLogs |
| Branch | BiKpiDefinition | biKpiDefinitions |
| Branch | BiKpiSnapshot | biKpiSnapshots |
| Branch | BiDataset | biDatasets |
| Branch | BiMetricDefinition | biMetricDefinitions |
| Branch | BiMetricObservation | biMetricObservations |
| Branch | BiAnalyticsExecution | biAnalyticsExecutions |
| Branch | BiDashboard | biDashboards |
| Branch | BiPredictionModel | biPredictionModels |
| Branch | BiPredictionRun | biPredictionRuns |
| Department | Company | company |
| Department | Branch | branch |
| Department | Department | parent |
| Department | Department | children |
| Department | Position | positions |
| Department | Employee | employees |
| Department | JournalEntryLine | journalEntryLines |
| Position | Company | company |
| Position | Department | department |
| Position | Employee | employees |
| CostCenter | Company | company |
| CostCenter | Branch | branch |
| CostCenter | Employee | employees |
| CostCenter | JournalEntryLine | journalEntryLines |
| Employee | User | user |
| Employee | Company | company |
| Employee | Branch | branch |
| Employee | Department | department |
| Employee | Position | position |
| Employee | CostCenter | costCenter |
| Employee | EmployeeShiftAssignment | shiftAssignments |
| Employee | AttendanceRecord | attendanceRecords |
| Employee | LeaveBalance | leaveBalances |
| Employee | LeaveRequest | leaveRequests |
| Employee | PayrollProfile | payrollProfiles |
| Employee | PayrollItem | payrollItems |
| Employee | Payslip | payslips |
| Employee | JournalEntryLine | journalEntryLines |
| Employee | JobApplication | jobApplications |
| Employee | Interview | interviews |
| Employee | InterviewEvaluation | interviewEvaluations |
| Employee | PerformanceGoal | performanceGoals |
| Employee | PerformanceReview | performanceReviews |
| Employee | PerformanceReview | managedPerformanceReviews |
| Employee | WorkflowRequest | workflowRequests |
| Employee | WorkflowStep | workflowApprovals |
| Employee | AssetAssignment | assetAssignments |
| Employee | Document | documents |
| Employee | SelfServiceRequest | selfServiceRequests |
| Employee | Notification | notifications |
| Employee | WorkflowDefinitionStep | workflowDefinitionSteps |
| Shift | Company | company |
| Shift | Branch | branch |
| Shift | EmployeeShiftAssignment | assignments |
| Shift | AttendanceRecord | attendanceRecords |
| EmployeeShiftAssignment | Employee | employee |
| EmployeeShiftAssignment | Shift | shift |
| AttendanceRecord | Employee | employee |
| AttendanceRecord | Shift | shift |
| Holiday | Company | company |
| Holiday | Branch | branch |
| LeaveType | Company | company |
| LeaveType | LeaveBalance | balances |
| LeaveType | LeaveRequest | requests |
| LeaveBalance | Company | company |
| LeaveBalance | Employee | employee |
| LeaveBalance | LeaveType | leaveType |
| LeaveRequest | Employee | employee |
| LeaveRequest | LeaveType | leaveType |
| LeaveRequest | LeaveApproval | approvals |
| LeaveApproval | LeaveRequest | leaveRequest |
| LeaveApproval | User | approver |
| SalaryComponent | Company | company |
| SalaryComponent | PayrollItem | payrollItems |
| PayrollProfile | Employee | employee |
| PayrollPeriod | Company | company |
| PayrollPeriod | PayrollRun | runs |
| PayrollRun | Company | company |
| PayrollRun | PayrollPeriod | period |
| PayrollRun | User | reviewedBy |
| PayrollRun | User | approvedBy |
| PayrollRun | PayrollItem | items |
| PayrollRun | Payslip | payslips |
| PayrollItem | PayrollRun | payrollRun |
| PayrollItem | Employee | employee |
| PayrollItem | SalaryComponent | salaryComponent |
| Payslip | PayrollRun | payrollRun |
| Payslip | Employee | employee |
| JobPosition | Company | company |
| JobPosition | Vacancy | vacancies |
| JobPosition | PerformanceCycle | performanceCycles |
| JobPosition | AssetCategory | assetCategories |
| JobPosition | Asset | assets |
| JobPosition | DocumentCategory | documentCategories |
| JobPosition | Document | documents |
| JobPosition | SelfServiceRequest | selfServiceRequests |
| JobPosition | Notification | notifications |
| Vacancy | Company | company |
| Vacancy | JobPosition | jobPosition |
| Vacancy | JobApplication | jobApplications |
| Applicant | JobApplication | jobApplications |
| JobApplication | Vacancy | vacancy |
| JobApplication | Applicant | applicant |
| JobApplication | Employee | employee |
| JobApplication | OfferLetter | offerLetters |
| JobApplication | Interview | interviews |
| Interview | InterviewEvaluation | evaluations |
| Interview | JobApplication | application |
| Interview | Employee | interviewer |
| InterviewEvaluation | Interview | interview |
| InterviewEvaluation | Employee | evaluator |
| OfferLetter | JobApplication | application |
| PerformanceCycle | Company | company |
| PerformanceCycle | PerformanceGoal | goals |
| PerformanceCycle | PerformanceReview | reviews |
| PerformanceCycle | JobPosition | jobPosition |
| PerformanceGoal | PerformanceCycle | cycle |
| PerformanceGoal | Employee | employee |
| PerformanceReview | PerformanceCycle | cycle |
| PerformanceReview | Employee | employee |
| PerformanceReview | Employee | manager |
| PerformanceReview | PerformanceReviewItem | items |
| PerformanceReviewItem | PerformanceReview | review |
| AssetCategory | Company | company |
| AssetCategory | Asset | assets |
| AssetCategory | DocumentCategory | documentCategories |
| AssetCategory | Document | documents |
| AssetCategory | SelfServiceRequest | selfServiceRequests |
| AssetCategory | Notification | notifications |
| AssetCategory | JobPosition | jobPosition |
| Asset | Company | company |
| Asset | AssetCategory | category |
| Asset | AssetAssignment | assignments |
| Asset | AssetMaintenance | maintenances |
| Asset | JobPosition | jobPosition |
| AssetAssignment | Asset | asset |
| AssetAssignment | Employee | employee |
| AssetMaintenance | Asset | asset |
| DocumentCategory | Company | company |
| DocumentCategory | Document | documents |
| DocumentCategory | SelfServiceRequest | selfServiceRequests |
| DocumentCategory | Notification | notifications |
| DocumentCategory | JobPosition | jobPosition |
| DocumentCategory | AssetCategory | assetCategory |
| Document | Company | company |
| Document | DocumentCategory | category |
| Document | Employee | employee |
| Document | DocumentVersion | versions |
| Document | JobPosition | jobPosition |
| Document | AssetCategory | assetCategory |
| DocumentVersion | Document | document |
| SelfServiceRequest | Employee | employee |
| SelfServiceRequest | Company | company |
| SelfServiceRequest | JobPosition | jobPosition |
| SelfServiceRequest | AssetCategory | assetCategory |
| SelfServiceRequest | DocumentCategory | documentCategory |
| Notification | Company | company |
| Notification | Employee | employee |
| Notification | JobPosition | jobPosition |
| Notification | AssetCategory | assetCategory |
| Notification | DocumentCategory | documentCategory |
| WorkflowDefinition | Company | company |
| WorkflowDefinition | WorkflowDefinitionStep | steps |
| WorkflowDefinition | WorkflowRequest | requests |
| WorkflowDefinitionStep | WorkflowDefinition | workflow |
| WorkflowDefinitionStep | Role | approverRole |
| WorkflowDefinitionStep | User | approverUser |
| WorkflowDefinitionStep | Employee | approverEmployee |
| WorkflowRequest | WorkflowDefinition | workflow |
| WorkflowRequest | Employee | requester |
| WorkflowRequest | WorkflowStep | steps |
| WorkflowStep | WorkflowRequest | request |
| WorkflowStep | Employee | approver |
| AuditLog | User | createdBy |
| BusinessRuleCategory | Company | company |
| BusinessRuleCategory | BusinessRule | rules |
| BusinessRule | Company | company |
| BusinessRule | Branch | branch |
| BusinessRule | BusinessRuleCategory | category |
| BusinessRule | BusinessRuleCondition | conditions |
| BusinessRule | BusinessRuleAction | actions |
| BusinessRule | BusinessRuleExecution | executions |
| BusinessRuleCondition | BusinessRule | rule |
| BusinessRuleAction | BusinessRule | rule |
| BusinessRuleExecution | Company | company |
| BusinessRuleExecution | BusinessRule | rule |
| AiProviderConfig | Company | company |
| AiProviderConfig | AiRequestLog | requestLogs |
| AiRequestLog | Company | company |
| AiRequestLog | AiProviderConfig | provider |
| AiRequestLog | AiUsageRecord | usageRecords |
| AiUsageRecord | Company | company |
| AiUsageRecord | AiRequestLog | requestLog |
| AiUsageLimit | Company | company |
| AiSafetyPolicy | Company | company |
| IntegrationProvider | Company | company |
| IntegrationProvider | IntegrationCredential | credentials |
| IntegrationProvider | IntegrationConnection | connections |
| IntegrationProvider | IntegrationWebhook | webhooks |
| IntegrationCredential | Company | company |
| IntegrationCredential | IntegrationProvider | provider |
| IntegrationCredential | IntegrationConnection | connections |
| IntegrationConnection | Company | company |
| IntegrationConnection | IntegrationProvider | provider |
| IntegrationConnection | IntegrationCredential | credential |
| IntegrationConnection | IntegrationRestConnector | restConnectors |
| IntegrationConnection | IntegrationOutboundJob | outboundJobs |
| IntegrationConnection | IntegrationInboundEvent | inboundEvents |
| IntegrationConnection | IntegrationExecutionHistory | executions |
| IntegrationConnection | IntegrationHealthSnapshot | healthSnapshots |
| IntegrationInboundEvent | Company | company |
| IntegrationInboundEvent | IntegrationConnection | connection |
| IntegrationInboundEvent | IntegrationExecutionHistory | executions |
| IntegrationExecutionHistory | Company | company |
| IntegrationExecutionHistory | IntegrationConnection | connection |
| IntegrationExecutionHistory | IntegrationOutboundJob | outboundJob |
| IntegrationExecutionHistory | IntegrationInboundEvent | inboundEvent |
| IntegrationRetryPolicy | Company | company |
| IntegrationRetryPolicy | IntegrationWebhook | webhooks |
| IntegrationRetryPolicy | IntegrationOutboundJob | outboundJobs |
| IntegrationWebhook | Company | company |
| IntegrationWebhook | IntegrationProvider | provider |
| IntegrationWebhook | IntegrationRetryPolicy | retryPolicy |
| IntegrationWebhook | IntegrationOutboundJob | outboundJobs |
| IntegrationRestConnector | Company | company |
| IntegrationRestConnector | IntegrationConnection | connection |
| IntegrationRestConnector | IntegrationOutboundJob | outboundJobs |
| IntegrationOutboundJob | Company | company |
| IntegrationOutboundJob | IntegrationConnection | connection |
| IntegrationOutboundJob | IntegrationWebhook | webhook |
| IntegrationOutboundJob | IntegrationRestConnector | restConnector |
| IntegrationOutboundJob | IntegrationRetryPolicy | retryPolicy |
| IntegrationOutboundJob | IntegrationExecutionHistory | executions |
| IntegrationOutboundJob | IntegrationRetryHistory | retryHistory |
| IntegrationRetryHistory | IntegrationOutboundJob | outboundJob |
| IntegrationHealthSnapshot | Company | company |
| IntegrationHealthSnapshot | IntegrationConnection | connection |
| PluginManifest | Company | company |
| PluginManifest | PluginRegistryEntry | registryEntries |
| PluginManifest | PluginMarketplaceVersion | marketplaceVersions |
| PluginRegistryEntry | Company | company |
| PluginRegistryEntry | PluginManifest | manifest |
| PluginRegistryEntry | PluginLifecycleEvent | lifecycleEvents |
| PluginRegistryEntry | PluginEventSubscription | eventSubscriptions |
| PluginRegistryEntry | PluginHook | hooks |
| PluginRegistryEntry | PluginServiceBinding | serviceBindings |
| PluginRegistryEntry | PluginPermissionGrant | permissionGrants |
| PluginRegistryEntry | PluginConfiguration | configurations |
| PluginRegistryEntry | PluginEvent | events |
| PluginRegistryEntry | PluginInstallation | installations |
| PluginRegistryEntry | PluginSandboxPolicy | sandboxPolicy |
| PluginRegistryEntry | PluginDependency | dependencies |
| PluginRegistryEntry | PluginCapabilityGrant | capabilityGrants |
| PluginLifecycleEvent | PluginRegistryEntry | registryEntry |
| PluginSandboxPolicy | PluginRegistryEntry | registryEntry |
| PluginDependency | PluginRegistryEntry | registryEntry |
| PluginCapabilityGrant | PluginRegistryEntry | registryEntry |
| PluginMarketplacePackage | Company | company |
| PluginMarketplacePackage | PluginMarketplaceVersion | versions |
| PluginMarketplaceVersion | PluginMarketplacePackage | package |
| PluginMarketplaceVersion | PluginManifest | manifest |
| PluginMarketplaceVersion | PluginInstallation | installations |
| PluginInstallation | Company | company |
| PluginInstallation | PluginMarketplaceVersion | packageVersion |
| PluginInstallation | PluginRegistryEntry | registryEntry |
| PluginInstallation | PluginInstallation | upgradedFrom |
| PluginInstallation | PluginInstallation | upgrades |
| PluginEventSubscription | PluginRegistryEntry | registryEntry |
| PluginHook | PluginRegistryEntry | registryEntry |
| PluginServiceBinding | PluginRegistryEntry | registryEntry |
| PluginPermissionGrant | PluginRegistryEntry | registryEntry |
| PluginConfiguration | PluginRegistryEntry | registryEntry |
| PluginEvent | PluginRegistryEntry | registryEntry |
