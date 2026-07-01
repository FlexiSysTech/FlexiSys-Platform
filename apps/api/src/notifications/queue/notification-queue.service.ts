import { Injectable } from '@nestjs/common';
import { NotificationChannel } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { EmailNotificationProvider } from '../providers/email-notification.provider';
import { InAppNotificationProvider } from '../providers/in-app-notification.provider';
import { NotificationProvider } from '../providers/notification-provider.interface';
import { PushNotificationProvider } from '../providers/push-notification.provider';

@Injectable()
export class NotificationQueueService {
  private readonly providers: Partial<
    Record<NotificationChannel, NotificationProvider>
  >;

  constructor(
    private readonly prisma: PrismaService,
    inAppProvider: InAppNotificationProvider,
    emailProvider: EmailNotificationProvider,
    pushProvider: PushNotificationProvider,
  ) {
    this.providers = {
      IN_APP: inAppProvider,
      EMAIL: emailProvider,
      PUSH: pushProvider,
    };
  }

  async processDueNotifications(limit = 50) {
    const now = new Date();
    const notifications = await this.prisma.notification.findMany({
      where: {
        status: 'PENDING',
        OR: [{ scheduledAt: null }, { scheduledAt: { lte: now } }],
      },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });

    let sent = 0;
    let failed = 0;

    for (const notification of notifications) {
      const provider = this.providers[notification.channel];

      if (!provider) {
        await this.markFailed(
          notification.id,
          `${notification.channel} provider is not configured`,
        );
        failed += 1;
        continue;
      }

      const result = await provider.send(notification);

      if (result.success) {
        await this.prisma.notification.update({
          where: { id: notification.id },
          data: {
            status: 'SENT',
            sentAt: new Date(),
            failedAt: null,
            error: null,
          },
        });
        sent += 1;
      } else {
        await this.markFailed(
          notification.id,
          result.error ?? 'Notification provider failed',
        );
        failed += 1;
      }
    }

    return {
      processed: notifications.length,
      sent,
      failed,
    };
  }

  async retryFailedNotifications(limit = 50) {
    await this.prisma.notification.updateMany({
      where: { status: 'FAILED' },
      data: { status: 'PENDING', error: null, failedAt: null },
    });

    return this.processDueNotifications(limit);
  }

  private async markFailed(id: string, error: string): Promise<void> {
    await this.prisma.notification.update({
      where: { id },
      data: {
        status: 'FAILED',
        failedAt: new Date(),
        error,
      },
    });
  }
}
