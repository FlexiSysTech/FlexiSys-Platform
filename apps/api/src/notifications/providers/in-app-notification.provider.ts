import { Injectable } from '@nestjs/common';

import {
  NotificationDelivery,
  NotificationDeliveryResult,
  NotificationProvider,
} from './notification-provider.interface';

@Injectable()
export class InAppNotificationProvider implements NotificationProvider {
  readonly channel = 'IN_APP' as const;

  async send(
    notification: NotificationDelivery,
  ): Promise<NotificationDeliveryResult> {
    return {
      success: true,
      providerMessageId: `in-app:${notification.id}`,
    };
  }
}
