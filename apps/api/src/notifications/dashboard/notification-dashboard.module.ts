import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma';
import { NotificationDashboardController } from './notification-dashboard.controller';
import { NotificationDashboardService } from './notification-dashboard.service';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationDashboardController],
  providers: [NotificationDashboardService],
  exports: [NotificationDashboardService],
})
export class NotificationDashboardModule {}
