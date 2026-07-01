import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { AssetsDashboardController } from './assets-dashboard.controller';
import { AssetsDashboardService } from './assets-dashboard.service';

@Module({
  imports: [PrismaModule],
  controllers: [AssetsDashboardController],
  providers: [AssetsDashboardService],
  exports: [AssetsDashboardService],
})
export class AssetsDashboardModule {}
