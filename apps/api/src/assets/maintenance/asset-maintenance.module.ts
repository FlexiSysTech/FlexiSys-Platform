import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { AssetMaintenanceController } from './asset-maintenance.controller';
import { AssetMaintenanceService } from './asset-maintenance.service';

@Module({
  imports: [PrismaModule],
  controllers: [AssetMaintenanceController],
  providers: [AssetMaintenanceService],
  exports: [AssetMaintenanceService],
})
export class AssetMaintenanceModule {}
