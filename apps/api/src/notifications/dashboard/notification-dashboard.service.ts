import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { NotificationDashboardEntity } from './entities/notification-dashboard.entity';

@Injectable()
export class NotificationDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(): Promise<NotificationDashboardEntity> {
    const now = new Date();

    const [
      totalNotifications,
      pendingNotifications,
      sentNotifications,
      failedNotifications,
      readNotifications,
      cancelledNotifications,
      scheduledNotifications,
      inAppNotifications,
      emailNotifications,
      whatsappNotifications,
      pushNotifications,
    ] = await Promise.all([
      this.prisma.notification.count(),
      this.prisma.notification.count({ where: { status: 'PENDING' } }),
      this.prisma.notification.count({ where: { status: 'SENT' } }),
      this.prisma.notification.count({ where: { status: 'FAILED' } }),
      this.prisma.notification.count({ where: { status: 'READ' } }),
      this.prisma.notification.count({ where: { status: 'CANCELLED' } }),
      this.prisma.notification.count({
        where: { status: 'PENDING', scheduledAt: { gt: now } },
      }),
      this.prisma.notification.count({ where: { channel: 'IN_APP' } }),
      this.prisma.notification.count({ where: { channel: 'EMAIL' } }),
      this.prisma.notification.count({ where: { channel: 'WHATSAPP' } }),
      this.prisma.notification.count({ where: { channel: 'PUSH' } }),
    ]);

    return new NotificationDashboardEntity({
      totalNotifications,
      pendingNotifications,
      sentNotifications,
      failedNotifications,
      readNotifications,
      cancelledNotifications,
      scheduledNotifications,
      inAppNotifications,
      emailNotifications,
      whatsappNotifications,
      pushNotifications,
    });
  }
}
