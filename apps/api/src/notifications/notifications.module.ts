import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { EmailNotificationProvider } from './providers/email-notification.provider';
import { InAppNotificationProvider } from './providers/in-app-notification.provider';
import { PushNotificationProvider } from './providers/push-notification.provider';
import { NotificationQueueService } from './queue/notification-queue.service';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationQueueService,
    InAppNotificationProvider,
    EmailNotificationProvider,
    PushNotificationProvider,
  ],
  exports: [NotificationsService, NotificationQueueService],
})
export class NotificationsModule {}
