import { Module } from '@nestjs/common';

import { TenantAdministrationService } from './tenant-administration.service';
import { TenantConfigurationService } from './tenant-configuration.service';
import { TenantIsolationService } from './tenant-isolation.service';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

@Module({
  controllers: [TenantsController],
  providers: [
    TenantsService,
    TenantIsolationService,
    TenantConfigurationService,
    TenantAdministrationService,
  ],
  exports: [
    TenantsService,
    TenantIsolationService,
    TenantConfigurationService,
    TenantAdministrationService,
  ],
})
export class TenantsModule {}
