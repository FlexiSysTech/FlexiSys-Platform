# Prisma Model Catalog

Date: 2026-07-02

| Model | Table | Fields | Indexes | Relationships |
| --- | --- | --- | --- | --- |
| User | User | 23 | 0 | 4 |
| Role | Role | 10 | 0 | 0 |
| Permission | Permission | 6 | 0 | 0 |
| UserRole | UserRole | 5 | 1 | 2 |
| RolePermission | RolePermission | 4 | 1 | 2 |
| Company | Company | 81 | 2 | 1 |
| Tenant | Tenant | 60 | 5 | 0 |
| TenantDomain | TenantDomain | 12 | 4 | 1 |
| TenantSetting | TenantSetting | 14 | 5 | 1 |
| TenantFeatureFlag | TenantFeatureFlag | 13 | 6 | 1 |
| TenantLocalization | TenantLocalization | 15 | 5 | 1 |
| TenantBranding | TenantBranding | 17 | 3 | 1 |
| TenantUsageLimit | TenantUsageLimit | 14 | 6 | 1 |
| TenantProvisioningEvent | TenantProvisioningEvent | 9 | 4 | 1 |
| TenantPermissionPolicy | TenantPermissionPolicy | 13 | 6 | 1 |
| TenantAuditEvent | TenantAuditEvent | 11 | 5 | 1 |
| PublicApiGroup | PublicApiGroup | 15 | 5 | 1 |
| PublicApiRegistry | PublicApiRegistry | 22 | 8 | 2 |
| PublicApiVersion | PublicApiVersion | 16 | 8 | 1 |
| PublicApiApplication | PublicApiApplication | 20 | 6 | 1 |
| PublicApiKey | PublicApiKey | 20 | 7 | 2 |
| PublicApiRateLimitPolicy | PublicApiRateLimitPolicy | 18 | 7 | 3 |
| PublicApiUsageCounter | PublicApiUsageCounter | 15 | 7 | 3 |
| PublicApiRequestLog | PublicApiRequestLog | 17 | 8 | 3 |
| PublicApiSignatureNonce | PublicApiSignatureNonce | 10 | 5 | 2 |
| ObservabilityHealthProvider | ObservabilityHealthProvider | 18 | 7 | 1 |
| ObservabilityHealthCheckResult | ObservabilityHealthCheckResult | 13 | 6 | 2 |
| ObservabilityMetricDefinition | ObservabilityMetricDefinition | 17 | 7 | 1 |
| ObservabilityMetricSample | ObservabilityMetricSample | 16 | 8 | 2 |
| ObservabilityLogEntry | ObservabilityLogEntry | 15 | 8 | 1 |
| ObservabilityTrace | ObservabilityTrace | 16 | 7 | 1 |
| ObservabilitySpan | ObservabilitySpan | 17 | 8 | 4 |
| SchedulerCronRegistry | SchedulerCronRegistry | 28 | 8 | 1 |
| SchedulerScheduledJob | SchedulerScheduledJob | 33 | 11 | 2 |
| SchedulerJobHistory | SchedulerJobHistory | 22 | 9 | 3 |
| SchedulerFailureRecovery | SchedulerFailureRecovery | 17 | 7 | 3 |
| MobileDevice | MobileDevice | 31 | 10 | 4 |
| MobileSession | MobileSession | 24 | 9 | 5 |
| MobilePushNotification | MobilePushNotification | 21 | 7 | 3 |
| MobileSyncCursor | MobileSyncCursor | 21 | 9 | 5 |
| MobileSyncChange | MobileSyncChange | 16 | 9 | 3 |
| SearchIndex | SearchIndex | 24 | 9 | 3 |
| SearchQueryLog | SearchQueryLog | 16 | 6 | 3 |
| BiKpiDefinition | BiKpiDefinition | 26 | 7 | 3 |
| BiKpiSnapshot | BiKpiSnapshot | 20 | 9 | 4 |
| BiDataset | BiDataset | 23 | 8 | 3 |
| BiMetricDefinition | BiMetricDefinition | 24 | 8 | 4 |
| BiMetricObservation | BiMetricObservation | 16 | 6 | 4 |
| BiAnalyticsExecution | BiAnalyticsExecution | 18 | 8 | 4 |
| BiDashboard | BiDashboard | 21 | 7 | 3 |
| BiDashboardWidget | BiDashboardWidget | 11 | 4 | 1 |
| BiPredictionModel | BiPredictionModel | 24 | 9 | 3 |
| BiPredictionRun | BiPredictionRun | 21 | 8 | 4 |
| Account | Account | 14 | 5 | 3 |
| JournalEntry | JournalEntry | 17 | 6 | 1 |
| JournalEntryLine | JournalEntryLine | 18 | 6 | 6 |
| ReportCategory | ReportCategory | 10 | 3 | 1 |
| ReportDefinition | ReportDefinition | 16 | 6 | 2 |
| ReportParameter | ReportParameter | 12 | 3 | 1 |
| ReportExecution | ReportExecution | 16 | 6 | 2 |
| Branch | Branch | 37 | 4 | 2 |
| Department | Department | 17 | 5 | 4 |
| Position | Position | 12 | 4 | 2 |
| CostCenter | CostCenter | 13 | 4 | 2 |
| Employee | Employee | 59 | 7 | 9 |
| Shift | Shift | 16 | 4 | 2 |
| EmployeeShiftAssignment | EmployeeShiftAssignment | 10 | 4 | 2 |
| AttendanceRecord | AttendanceRecord | 14 | 5 | 2 |
| Holiday | Holiday | 10 | 4 | 2 |
| LeaveType | LeaveType | 14 | 3 | 1 |
| LeaveBalance | LeaveBalance | 14 | 5 | 3 |
| LeaveRequest | LeaveRequest | 17 | 5 | 2 |
| LeaveApproval | LeaveApproval | 11 | 4 | 2 |
| SalaryComponent | SalaryComponent | 22 | 5 | 1 |
| PayrollProfile | PayrollProfile | 13 | 3 | 1 |
| PayrollPeriod | PayrollPeriod | 11 | 6 | 1 |
| PayrollRun | PayrollRun | 29 | 8 | 4 |
| PayrollItem | PayrollItem | 22 | 6 | 3 |
| Payslip | Payslip | 18 | 4 | 2 |
| JobPosition | JobPosition | 17 | 3 | 1 |
| Vacancy | Vacancy | 15 | 4 | 2 |
| Applicant | Applicant | 17 | 3 | 0 |
| JobApplication | JobApplication | 17 | 5 | 3 |
| Interview | Interview | 14 | 4 | 2 |
| InterviewEvaluation | InterviewEvaluation | 11 | 3 | 2 |
| OfferLetter | OfferLetter | 14 | 2 | 1 |
| PerformanceCycle | PerformanceCycle | 15 | 5 | 2 |
| PerformanceGoal | PerformanceGoal | 13 | 3 | 2 |
| PerformanceReview | PerformanceReview | 20 | 5 | 3 |
| PerformanceReviewItem | PerformanceReviewItem | 11 | 2 | 1 |
| AssetCategory | AssetCategory | 16 | 3 | 2 |
| Asset | Asset | 20 | 4 | 3 |
| AssetAssignment | AssetAssignment | 13 | 3 | 2 |
| AssetMaintenance | AssetMaintenance | 12 | 3 | 1 |
| DocumentCategory | DocumentCategory | 16 | 3 | 3 |
| Document | Document | 29 | 8 | 5 |
| DocumentVersion | DocumentVersion | 10 | 2 | 1 |
| SelfServiceRequest | SelfServiceRequest | 21 | 4 | 5 |
| Notification | Notification | 23 | 5 | 5 |
| WorkflowDefinition | WorkflowDefinition | 13 | 4 | 1 |
| WorkflowDefinitionStep | WorkflowDefinitionStep | 14 | 5 | 4 |
| WorkflowRequest | WorkflowRequest | 15 | 5 | 2 |
| WorkflowStep | WorkflowStep | 12 | 4 | 2 |
| AuditLog | AuditLog | 10 | 0 | 1 |
| BusinessRuleCategory | BusinessRuleCategory | 14 | 4 | 1 |
| BusinessRule | BusinessRule | 29 | 10 | 3 |
| BusinessRuleCondition | BusinessRuleCondition | 13 | 5 | 1 |
| BusinessRuleAction | BusinessRuleAction | 12 | 4 | 1 |
| BusinessRuleExecution | BusinessRuleExecution | 15 | 7 | 2 |
| AiProviderConfig | AiProviderConfig | 18 | 7 | 1 |
| AiRequestLog | AiRequestLog | 27 | 8 | 2 |
| AiUsageRecord | AiUsageRecord | 15 | 6 | 2 |
| AiUsageLimit | AiUsageLimit | 14 | 4 | 1 |
| AiSafetyPolicy | AiSafetyPolicy | 14 | 5 | 1 |
| IntegrationProvider | IntegrationProvider | 19 | 6 | 1 |
| IntegrationCredential | IntegrationCredential | 18 | 5 | 2 |
| IntegrationConnection | IntegrationConnection | 24 | 5 | 3 |
| IntegrationInboundEvent | IntegrationInboundEvent | 20 | 6 | 2 |
| IntegrationExecutionHistory | IntegrationExecutionHistory | 19 | 8 | 4 |
| IntegrationRetryPolicy | IntegrationRetryPolicy | 17 | 5 | 1 |
| IntegrationWebhook | IntegrationWebhook | 22 | 7 | 3 |
| IntegrationRestConnector | IntegrationRestConnector | 19 | 5 | 2 |
| IntegrationOutboundJob | IntegrationOutboundJob | 31 | 9 | 5 |
| IntegrationRetryHistory | IntegrationRetryHistory | 9 | 4 | 1 |
| IntegrationHealthSnapshot | IntegrationHealthSnapshot | 10 | 4 | 2 |
| PluginManifest | PluginManifest | 22 | 7 | 1 |
| PluginRegistryEntry | PluginRegistryEntry | 29 | 6 | 2 |
| PluginLifecycleEvent | PluginLifecycleEvent | 11 | 4 | 1 |
| PluginSandboxPolicy | PluginSandboxPolicy | 14 | 3 | 1 |
| PluginDependency | PluginDependency | 13 | 5 | 1 |
| PluginCapabilityGrant | PluginCapabilityGrant | 12 | 5 | 1 |
| PluginMarketplacePackage | PluginMarketplacePackage | 17 | 6 | 1 |
| PluginMarketplaceVersion | PluginMarketplaceVersion | 16 | 5 | 2 |
| PluginInstallation | PluginInstallation | 20 | 6 | 5 |
| PluginEventSubscription | PluginEventSubscription | 12 | 5 | 1 |
| PluginHook | PluginHook | 15 | 7 | 1 |
| PluginServiceBinding | PluginServiceBinding | 14 | 5 | 1 |
| PluginPermissionGrant | PluginPermissionGrant | 12 | 5 | 1 |
| PluginConfiguration | PluginConfiguration | 14 | 6 | 1 |
| PluginEvent | PluginEvent | 11 | 4 | 1 |

## Enums

| Enum | Values |
| --- | --- |
| UserStatus | ACTIVE, INACTIVE, SUSPENDED |
| OrganizationStatus | ACTIVE, INACTIVE, ARCHIVED |
| EmployeeStatus | ACTIVE, INACTIVE, TERMINATED, ON_LEAVE |
| EmploymentType | FULL_TIME, PART_TIME, CONTRACT, TEMPORARY, INTERN |
| Gender | MALE, FEMALE, OTHER |
| AttendanceStatus | PRESENT, ABSENT, LATE, HALF_DAY, ON_LEAVE, HOLIDAY |
| ShiftStatus | ACTIVE, INACTIVE, ARCHIVED |
| WeekDay | SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY |
| LeaveTypeStatus | ACTIVE, INACTIVE, ARCHIVED |
| LeaveRequestStatus | DRAFT, PENDING, APPROVED, REJECTED, CANCELLED |
| LeaveApprovalStatus | PENDING, APPROVED, REJECTED |
| SalaryComponentType | EARNING, DEDUCTION |
| SalaryComponentCategory | BASIC_SALARY, ALLOWANCE, DEDUCTION, BONUS, COMMISSION, OVERTIME, LOAN, ADVANCE_SALARY, OTHER |
| SalaryComponentCalculationType | FIXED, PERCENTAGE, FORMULA |
| PayrollPeriodStatus | OPEN, LOCKED, CLOSED |
| PayrollRunStatus | DRAFT, PROCESSING, IN_REVIEW, APPROVED, REJECTED, LOCKED, PAID, CANCELLED |
| PayrollItemType | EARNING, DEDUCTION |
| PayslipStatus | DRAFT, ISSUED, PAID, CANCELLED |
| AccountType | ASSET, LIABILITY, EQUITY, REVENUE, EXPENSE |
| AccountStatus | ACTIVE, INACTIVE |
| JournalEntryStatus | DRAFT, POSTED, VOID |
| JournalEntrySource | MANUAL, PAYROLL, SYSTEM |
| ReportDefinitionStatus | ACTIVE, INACTIVE, ARCHIVED |
| ReportParameterType | STRING, NUMBER, DATE, BOOLEAN, ENUM |
| ReportExecutionStatus | PENDING, RUNNING, COMPLETED, FAILED |
| ReportExportFormat | JSON, CSV, EXCEL, PDF |
| BusinessRuleStatus | DRAFT, ACTIVE, INACTIVE, ARCHIVED |
| BusinessRuleScope | GLOBAL, COMPANY, BRANCH |
| BusinessRuleTrigger | MANUAL, API, EVENT, SCHEDULED |
| BusinessRuleConditionOperator | EQUALS, NOT_EQUALS, GREATER_THAN, GREATER_THAN_OR_EQUALS, LESS_THAN, LESS_THAN_OR_EQUALS, CONTAINS, NOT_CONTAINS, IN, NOT_IN, EXISTS, NOT_EXISTS |
| BusinessRuleLogicalOperator | AND, OR |
| BusinessRuleActionType | VALIDATION_ERROR, SET_FIELD, ADD_TAG, AUDIT_EVENT, NOTIFICATION, WORKFLOW |
| BusinessRuleExecutionStatus | MATCHED, NOT_MATCHED, BLOCKED, ERROR |
| AiProviderType | INTERNAL, OPENAI, AZURE_OPENAI, CUSTOM |
| AiProviderStatus | ACTIVE, INACTIVE, ARCHIVED |
| AiRequestStatus | PENDING, COMPLETED, FAILED, BLOCKED |
| AiFeatureArea | CORE, HR_ASSISTANT, WORKFLOW, REPORTING, GOVERNANCE |
| AiGovernanceStatus | DRAFT, ACTIVE, INACTIVE, ARCHIVED |
| IntegrationProviderType | REST, WEBHOOK, FILE, DATABASE, CUSTOM |
| IntegrationStatus | DRAFT, ACTIVE, INACTIVE, ARCHIVED |
| IntegrationCredentialType | API_KEY, BASIC_AUTH, BEARER_TOKEN, OAUTH2, CUSTOM |
| IntegrationConnectionStatus | DISCONNECTED, CONNECTING, CONNECTED, FAILED, DISABLED |
| IntegrationHttpMethod | GET, POST, PUT, PATCH, DELETE |
| IntegrationOutboundStatus | PENDING, QUEUED, PROCESSING, DELIVERED, FAILED, CANCELLED |
| IntegrationInboundStatus | RECEIVED, VALIDATED, NORMALIZED, REJECTED, PROCESSED, FAILED |
| IntegrationDirection | INBOUND, OUTBOUND |
| IntegrationExecutionStatus | STARTED, SUCCESS, FAILED, SKIPPED |
| IntegrationHealthStatus | HEALTHY, DEGRADED, DOWN, UNKNOWN |
| PluginSource | SYSTEM, LOCAL, UPLOAD, MARKETPLACE |
| PluginStatus | DRAFT, ACTIVE, INACTIVE, ARCHIVED |
| PluginLifecycleState | REGISTERED, LOADED, ENABLED, DISABLED, ERROR, UNINSTALLED |
| PluginLifecycleAction | REGISTER, LOAD, ENABLE, DISABLE, RELOAD, UNLOAD, UNINSTALL, HEALTH_CHECK |
| PluginHookType | BEFORE, AFTER, VALIDATION, ENRICHMENT |
| PluginServiceType | INTERNAL_API, INTEGRATION, AI, REPORTING, CUSTOM |
| PluginEventStatus | PENDING, DISPATCHED, FAILED |
| PluginInstallationStatus | INSTALLED, ENABLED, DISABLED, UPGRADED, UNINSTALLED |
| PluginSandboxLevel | TRUSTED, RESTRICTED, ISOLATED |
| PluginCapabilityType | EVENTS, HOOKS, SERVICES, CONFIGURATION, PERMISSIONS, INTEGRATIONS, AI, NETWORK, FILESYSTEM |
| PluginDependencyStatus | SATISFIED, MISSING, INCOMPATIBLE |
| TenantStatus | PROVISIONING, ACTIVE, SUSPENDED, INACTIVE, ARCHIVED |
| TenantPlan | STARTER, PROFESSIONAL, ENTERPRISE, CUSTOM |
| TenantConfigurationStatus | ACTIVE, INACTIVE, ARCHIVED |
| TenantProvisioningAction | PROVISION, ACTIVATE, SUSPEND, RESUME, ARCHIVE |
| TenantProvisioningStatus | PENDING, SUCCESS, FAILED |
| TenantUsagePeriod | DAILY, MONTHLY, YEARLY, LIFETIME |
| PublicApiStatus | DRAFT, ACTIVE, DEPRECATED, RETIRED, ARCHIVED |
| PublicApiLifecycle | DESIGN, REVIEW, PUBLISHED, DEPRECATED, RETIRED |
| PublicApiKeyStatus | ACTIVE, EXPIRED, REVOKED, ROTATED |
| PublicApiRateLimitWindow | MINUTE, HOUR, DAY, MONTH |
| ObservabilityHealthStatus | HEALTHY, DEGRADED, DOWN, UNKNOWN |
| ObservabilityCheckType | LIVENESS, READINESS, DATABASE, MODULE, EXTERNAL_PROVIDER, CUSTOM |
| ObservabilityProviderStatus | ACTIVE, INACTIVE, ARCHIVED |
| ObservabilityMetricType | HTTP, DATABASE, WORKFLOW, PAYROLL, BUSINESS_RULES, CUSTOM |
| ObservabilityMetricUnit | COUNT, MILLISECONDS, PERCENT, BYTES, VALUE |
| ObservabilityLogLevel | DEBUG, INFO, WARN, ERROR, FATAL |
| ObservabilityTraceStatus | STARTED, SUCCESS, ERROR |
| ObservabilitySpanType | REQUEST, SERVICE, DATABASE, EXTERNAL_PROVIDER, CUSTOM |
| SchedulerJobStatus | ACTIVE, PAUSED, ARCHIVED |
| SchedulerTaskType | CRON, BACKGROUND, QUEUE |
| SchedulerPriority | LOW, NORMAL, HIGH, CRITICAL |
| SchedulerRunStatus | PENDING, QUEUED, RUNNING, SUCCEEDED, FAILED, CANCELLED, RETRY_SCHEDULED, DEAD_LETTER |
| SchedulerRetryStrategy | NONE, FIXED, EXPONENTIAL |
| SchedulerRecoveryAction | RETRY, REQUEUE, CANCEL, MARK_RESOLVED, DEAD_LETTER |
| SchedulerRecoveryStatus | PENDING, APPLIED, FAILED |
| MobileDevicePlatform | IOS, ANDROID, WEB, OTHER |
| MobileDeviceStatus | ACTIVE, INACTIVE, REVOKED, LOST |
| MobileSessionStatus | ACTIVE, EXPIRED, REVOKED |
| MobilePushProvider | FCM, APNS, EXPO, WEB_PUSH, NONE |
| MobilePushStatus | PENDING, SENT, FAILED, READ, CANCELLED |
| MobileSyncOperation | CREATE, UPDATE, DELETE |
| MobileSyncStatus | PENDING, SYNCED, CONFLICT, FAILED |
| SearchEntityType | EMPLOYEE, PAYROLL_RUN, PAYROLL_ITEM, DOCUMENT, WORKFLOW_DEFINITION, WORKFLOW_REQUEST |
| SearchIndexStatus | ACTIVE, STALE, ARCHIVED |
| SearchScope | GLOBAL, EMPLOYEE, PAYROLL, DOCUMENT, WORKFLOW |
| BiKpiValueType | NUMBER, CURRENCY, PERCENTAGE, RATIO |
| BiKpiStatus | ACTIVE, INACTIVE, ARCHIVED |
| BiAggregationPeriod | DAILY, WEEKLY, MONTHLY, QUARTERLY, YEARLY |
| BiDatasetStatus | ACTIVE, INACTIVE, ARCHIVED |
| BiMetricType | COUNT, SUM, AVERAGE, MIN, MAX, CUSTOM |
| BiExecutionStatus | PENDING, RUNNING, SUCCEEDED, FAILED |
| BiDashboardStatus | DRAFT, ACTIVE, ARCHIVED |
| BiDashboardWidgetType | KPI, CHART, TABLE, TREND, FORECAST |
| BiPredictionModelType | LINEAR_TREND, MOVING_AVERAGE, SEASONAL_BASELINE, CUSTOM |
| BiPredictionStatus | DRAFT, ACTIVE, RETIRED |
| BiPredictionRunStatus | PENDING, SUCCEEDED, FAILED |
| RecruitmentStatus | ACTIVE, INACTIVE, ARCHIVED |
| VacancyStatus | DRAFT, OPEN, CLOSED, CANCELLED |
| ApplicantStatus | NEW, SCREENING, INTERVIEW, OFFER, HIRED, REJECTED |
| JobApplicationStatus | APPLIED, SCREENING, SHORTLISTED, INTERVIEW, OFFER, HIRED, REJECTED, WITHDRAWN |
| InterviewStatus | SCHEDULED, COMPLETED, CANCELLED, NO_SHOW |
| OfferStatus | DRAFT, SENT, ACCEPTED, REJECTED, EXPIRED, CANCELLED |
| PerformanceCycleStatus | DRAFT, ACTIVE, CLOSED, ARCHIVED |
| PerformanceReviewStatus | DRAFT, SELF_REVIEW, MANAGER_REVIEW, HR_REVIEW, APPROVED, REJECTED, CLOSED |
| PerformanceGoalStatus | DRAFT, ACTIVE, COMPLETED, CANCELLED |
| PerformanceRating | OUTSTANDING, EXCEEDS_EXPECTATIONS, MEETS_EXPECTATIONS, NEEDS_IMPROVEMENT, UNSATISFACTORY |
| AssetStatus | AVAILABLE, ASSIGNED, MAINTENANCE, RETIRED, LOST |
| AssetAssignmentStatus | ASSIGNED, RETURNED, LOST, DAMAGED |
| AssetMaintenanceStatus | SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED |
| DocumentStatus | ACTIVE, EXPIRED, ARCHIVED, DELETED |
| DocumentVisibility | PRIVATE, HR_ONLY, MANAGER, EMPLOYEE, PUBLIC |
| DocumentOwnerType | COMPANY, EMPLOYEE, ASSET, RECRUITMENT, OTHER |
| SelfServiceRequestType | PROFILE_UPDATE, DOCUMENT_REQUEST, ASSET_REQUEST, PAYSLIP_REQUEST, GENERAL |
| SelfServiceRequestStatus | DRAFT, SUBMITTED, IN_REVIEW, APPROVED, REJECTED, CANCELLED |
| NotificationChannel | IN_APP, EMAIL, WHATSAPP, PUSH, SMS |
| NotificationStatus | PENDING, SENT, FAILED, READ, CANCELLED |
| WorkflowStatus | DRAFT, ACTIVE, INACTIVE, ARCHIVED |
| WorkflowRequestStatus | PENDING, APPROVED, REJECTED, CANCELLED |
| WorkflowStepStatus | PENDING, APPROVED, REJECTED, SKIPPED |
| InterviewEvaluationRecommendation | HIRE, HOLD, REJECT |
