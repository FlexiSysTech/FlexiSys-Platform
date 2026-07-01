import { Module } from '@nestjs/common';

import { AssetAssignmentsModule } from './assignments/asset-assignments.module';
import { AssetItemsModule } from './assets/assets.module';
import { AssetCategoriesModule } from './categories/asset-categories.module';
import { AssetsDashboardModule } from './dashboard/assets-dashboard.module';
import { AssetMaintenanceModule } from './maintenance/asset-maintenance.module';

@Module({
  imports: [
    AssetCategoriesModule,
    AssetItemsModule,
    AssetAssignmentsModule,
    AssetMaintenanceModule,
    AssetsDashboardModule,
  ],
  exports: [
    AssetCategoriesModule,
    AssetItemsModule,
    AssetAssignmentsModule,
    AssetMaintenanceModule,
    AssetsDashboardModule,
  ],
})
export class AssetsModule {}
