import { Injectable } from '@nestjs/common';

import {
  NotificationDelivery,
  NotificationDeliveryResult,
  NotificationProvider,
} from './notification-provider.interface';

@Injectable()
export class PushNotificationProvider implements NotificationProvider {
  readonly channel = 'PUSH' as const;

  async send(
    notification: NotificationDelivery,
  ): Promise<NotificationDeliveryResult> {
    return {
      success: true,
      providerMessageId: `push:${notification.id}`,
    };
  }
}
