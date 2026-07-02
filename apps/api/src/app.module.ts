import { Module } from '@nestjs/common';

import { AccountingModule } from './accounting/accounting.module';
import { AiModule } from './ai/ai.module';
import { AssetsModule } from './assets/assets.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { BusinessRulesModule } from './business-rules/business-rules.module';
import { DocumentsModule } from './documents/documents.module';
import { EmployeesModule } from './employees/employees.module';
import { EssModule } from './ess/ess.module';
import { LeaveModule } from './leave/leave.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrganizationModule } from './organization/organization.module';
import { PayrollModule } from './payroll/payroll.module';
import { PerformanceModule } from './performance/performance.module';
import { PlatformModule } from './platform/platform.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PrismaModule } from './prisma';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { ReportingModule } from './reporting/reporting.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { WorkflowsModule } from './workflows/workflows.module';

@Module({
  imports: [
    PlatformModule,
    PrismaModule,
    AiModule,
    AccountingModule,
    AuthModule,
    UsersModule,
    PermissionsModule,
    RolesModule,
    OrganizationModule,
    EmployeesModule,
    AttendanceModule,
    LeaveModule,
    PayrollModule,
    RecruitmentModule,
    ReportingModule,
    BusinessRulesModule,
    PerformanceModule,
    AssetsModule,
    DocumentsModule,
    EssModule,
    NotificationsModule,
    WorkflowsModule,
  ],
})
export class AppModule {}
