import { Module } from '@nestjs/common';

import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { OrganizationModule } from './organization/organization.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PrismaModule } from './prisma';
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
  ],
})
export class AppModule {}
