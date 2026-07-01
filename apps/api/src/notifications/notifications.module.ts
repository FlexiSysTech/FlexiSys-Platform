import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma';
import { NotificationDashboardModule } from './dashboard/notification-dashboard.module';
import { NotificationJobsController } from './jobs/notification-jobs.controller';
import { NotificationJobsService } from './jobs/notification-jobs.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { EmailNotificationProvider } from './providers/email-notification.provider';
import { InAppNotificationProvider } from './providers/in-app-notification.provider';
import { PushNotificationProvider } from './providers/push-notification.provider';
import { NotificationQueueService } from './queue/notification-queue.service';

@Module({
  imports: [PrismaModule, NotificationDashboardModule],
  controllers: [NotificationsController, NotificationJobsController],
  providers: [
    NotificationsService,
    NotificationQueueService,
    NotificationJobsService,
    InAppNotificationProvider,
    EmailNotificationProvider,
    PushNotificationProvider,
  ],
  exports: [
    NotificationsService,
    NotificationQueueService,
    NotificationJobsService,
    NotificationDashboardModule,
  ],
})
export class NotificationsModule {}
