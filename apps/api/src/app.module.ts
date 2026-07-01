import { Module } from '@nestjs/common';

import { AssetsModule } from './assets/assets.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { DocumentsModule } from './documents/documents.module';
import { EmployeesModule } from './employees/employees.module';
import { LeaveModule } from './leave/leave.module';
import { OrganizationModule } from './organization/organization.module';
import { PayrollModule } from './payroll/payroll.module';
import { PerformanceModule } from './performance/performance.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PrismaModule } from './prisma';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule,
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
    PerformanceModule,
    AssetsModule,
    DocumentsModule,
  ],
})
export class AppModule {}
