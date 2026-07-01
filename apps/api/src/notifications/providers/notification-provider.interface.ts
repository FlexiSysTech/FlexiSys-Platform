import { NotificationChannel, Prisma } from '@prisma/client';

export type NotificationDelivery = {
  id: string;
  channel: NotificationChannel;
  title: string;
  message: string;
  metadata: Prisma.JsonValue | null;
};

export type NotificationDeliveryResult = {
  success: boolean;
  providerMessageId?: string;
  error?: string;
};

export interface NotificationProvider {
  readonly channel: NotificationChannel;
  send(notification: NotificationDelivery): Promise<NotificationDeliveryResult>;
}
