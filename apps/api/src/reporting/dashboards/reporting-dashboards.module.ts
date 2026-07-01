import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma';
import { ReportingDashboardsController } from './reporting-dashboards.controller';
import { ReportingDashboardsService } from './reporting-dashboards.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReportingDashboardsController],
  providers: [ReportingDashboardsService],
  exports: [ReportingDashboardsService],
})
export class ReportingDashboardsModule {}
