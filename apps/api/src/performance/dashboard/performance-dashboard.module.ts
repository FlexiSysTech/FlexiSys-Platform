import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { PerformanceDashboardController } from './performance-dashboard.controller';
import { PerformanceDashboardService } from './performance-dashboard.service';

@Module({
  imports: [PrismaModule],
  controllers: [PerformanceDashboardController],
  providers: [PerformanceDashboardService],
  exports: [PerformanceDashboardService],
})
export class PerformanceDashboardModule {}
