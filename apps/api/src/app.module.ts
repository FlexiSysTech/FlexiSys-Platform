import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
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
  ],
})
export class AppModule {}
