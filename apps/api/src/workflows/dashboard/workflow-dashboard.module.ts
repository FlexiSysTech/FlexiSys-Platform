import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma';
import { WorkflowDashboardController } from './workflow-dashboard.controller';
import { WorkflowDashboardService } from './workflow-dashboard.service';

@Module({
  imports: [PrismaModule],
  controllers: [WorkflowDashboardController],
  providers: [WorkflowDashboardService],
  exports: [WorkflowDashboardService],
})
export class WorkflowDashboardModule {}
