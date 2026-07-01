import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { NotificationQueueService } from '../queue/notification-queue.service';

@Injectable()
export class NotificationJobsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queue: NotificationQueueService,
  ) {}

  runScheduledNotifications() {
    return this.queue.processDueNotifications();
  }

  retryFailedNotifications() {
    return this.queue.retryFailedNotifications();
  }

  async expireStaleWorkflowRequests(days = 30) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    const requests = await this.prisma.workflowRequest.findMany({
      where: {
        status: 'PENDING',
        submittedAt: { lt: cutoff },
      },
      select: { id: true },
    });

    for (const request of requests) {
      await this.prisma.$transaction(async (tx) => {
        await tx.workflowStep.updateMany({
          where: { requestId: request.id, status: 'PENDING' },
          data: {
            status: 'SKIPPED',
            comments: 'Automatically expired by background job',
            actedAt: new Date(),
          },
        });

        await tx.workflowRequest.update({
          where: { id: request.id },
          data: {
            status: 'CANCELLED',
            completedAt: new Date(),
          },
        });
      });
    }

    return {
      expired: requests.length,
      cutoff,
    };
  }

  async cleanupNotifications(days = 180) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    const result = await this.prisma.notification.deleteMany({
      where: {
        status: { in: ['SENT', 'READ', 'CANCELLED'] },
        updatedAt: { lt: cutoff },
      },
    });

    return {
      deleted: result.count,
      cutoff,
    };
  }

  async runMaintenance() {
    const scheduled = await this.runScheduledNotifications();
    const retry = await this.retryFailedNotifications();
    const expired = await this.expireStaleWorkflowRequests();
    const cleanup = await this.cleanupNotifications();

    return {
      scheduled,
      retry,
      expired,
      cleanup,
    };
  }
}
