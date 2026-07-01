import { Injectable } from '@nestjs/common';

import {
  NotificationDelivery,
  NotificationDeliveryResult,
  NotificationProvider,
} from './notification-provider.interface';

@Injectable()
export class EmailNotificationProvider implements NotificationProvider {
  readonly channel = 'EMAIL' as const;

  async send(
    notification: NotificationDelivery,
  ): Promise<NotificationDeliveryResult> {
    return {
      success: true,
      providerMessageId: `email:${notification.id}`,
    };
  }
}
