import { Module } from '@nestjs/common';

import { TenantIsolationService } from './tenant-isolation.service';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService, TenantIsolationService],
  exports: [TenantsService, TenantIsolationService],
})
export class TenantsModule {}
