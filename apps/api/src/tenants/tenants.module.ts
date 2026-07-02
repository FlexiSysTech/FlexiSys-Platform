import { Module } from '@nestjs/common';

import { TenantConfigurationService } from './tenant-configuration.service';
import { TenantIsolationService } from './tenant-isolation.service';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService, TenantIsolationService, TenantConfigurationService],
  exports: [TenantsService, TenantIsolationService, TenantConfigurationService],
})
export class TenantsModule {}
