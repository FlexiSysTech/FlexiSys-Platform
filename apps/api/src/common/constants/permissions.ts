export const Permission = {
  USERS_READ: 'users.read',
  USERS_VIEW: 'users.view',
  USERS_CREATE: 'users.create',
  USERS_UPDATE: 'users.update',
  USERS_DELETE: 'users.delete',

  PERMISSIONS_READ: 'permissions.read',
  PERMISSIONS_CREATE: 'permissions.create',
  PERMISSIONS_UPDATE: 'permissions.update',
  PERMISSIONS_DELETE: 'permissions.delete',

  ROLES_READ: 'roles.read',
  ROLES_VIEW: 'roles.view',
  ROLES_CREATE: 'roles.create',
  ROLES_UPDATE: 'roles.update',
  ROLES_DELETE: 'roles.delete',

  ORGANIZATION_READ: 'organization.read',
  ORGANIZATION_CREATE: 'organization.create',
  ORGANIZATION_UPDATE: 'organization.update',
  ORGANIZATION_DELETE: 'organization.delete',

  EMPLOYEES_READ: 'employees.read',
  EMPLOYEES_VIEW: 'employees.view',
  EMPLOYEES_CREATE: 'employees.create',
  EMPLOYEES_UPDATE: 'employees.update',
  EMPLOYEES_DELETE: 'employees.delete',

  ATTENDANCE_READ: 'attendance.read',
  ATTENDANCE_VIEW: 'attendance.view',
  ATTENDANCE_CREATE: 'attendance.create',
  ATTENDANCE_UPDATE: 'attendance.update',
  ATTENDANCE_DELETE: 'attendance.delete',

  LEAVE_READ: 'leave.read',
  LEAVE_CREATE: 'leave.create',
  LEAVE_UPDATE: 'leave.update',
  LEAVE_DELETE: 'leave.delete',

  RECRUITMENT_READ: 'recruitment.read',
  RECRUITMENT_CREATE: 'recruitment.create',
  RECRUITMENT_UPDATE: 'recruitment.update',
  RECRUITMENT_DELETE: 'recruitment.delete',

  PERFORMANCE_READ: 'performance.read',
  PERFORMANCE_CREATE: 'performance.create',
  PERFORMANCE_UPDATE: 'performance.update',
  PERFORMANCE_DELETE: 'performance.delete',

  ASSETS_READ: 'assets.read',
  ASSETS_CREATE: 'assets.create',
  ASSETS_UPDATE: 'assets.update',
  ASSETS_DELETE: 'assets.delete',

  DOCUMENTS_READ: 'documents.read',
  DOCUMENTS_CREATE: 'documents.create',
  DOCUMENTS_UPDATE: 'documents.update',
  DOCUMENTS_DELETE: 'documents.delete',

  ESS_READ: 'ess.read',
  ESS_CREATE: 'ess.create',
  ESS_UPDATE: 'ess.update',
  ESS_DELETE: 'ess.delete',

  NOTIFICATIONS_READ: 'notifications.read',
  NOTIFICATIONS_CREATE: 'notifications.create',
  NOTIFICATIONS_UPDATE: 'notifications.update',
  NOTIFICATIONS_DELETE: 'notifications.delete',

  WORKFLOWS_READ: 'workflows.read',
  WORKFLOWS_CREATE: 'workflows.create',
  WORKFLOWS_UPDATE: 'workflows.update',
  WORKFLOWS_DELETE: 'workflows.delete',

  PAYROLL_READ: 'payroll.read',
  PAYROLL_VIEW: 'payroll.view',
  PAYROLL_CREATE: 'payroll.create',
  PAYROLL_UPDATE: 'payroll.update',
  PAYROLL_DELETE: 'payroll.delete',

  ACCOUNTING_READ: 'accounting.read',
  ACCOUNTING_CREATE: 'accounting.create',
  ACCOUNTING_UPDATE: 'accounting.update',
  ACCOUNTING_DELETE: 'accounting.delete',

  REPORTING_READ: 'reporting.read',
  REPORTING_CREATE: 'reporting.create',
  REPORTING_UPDATE: 'reporting.update',
  REPORTING_DELETE: 'reporting.delete',
  REPORTING_EXECUTE: 'reporting.execute',
  REPORTING_EXPORT: 'reporting.export',

  BUSINESS_RULES_READ: 'business-rules.read',
  BUSINESS_RULES_CREATE: 'business-rules.create',
  BUSINESS_RULES_UPDATE: 'business-rules.update',
  BUSINESS_RULES_DELETE: 'business-rules.delete',
  BUSINESS_RULES_EXECUTE: 'business-rules.execute',

  AI_READ: 'ai.read',
  AI_CREATE: 'ai.create',
  AI_UPDATE: 'ai.update',
  AI_DELETE: 'ai.delete',
  AI_EXECUTE: 'ai.execute',
  AI_GOVERN: 'ai.govern',
} as const;

export type PermissionCode = (typeof Permission)[keyof typeof Permission];

export const Permissions = Permission;
