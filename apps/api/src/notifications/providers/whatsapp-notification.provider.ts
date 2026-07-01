import { NotificationProvider } from './notification-provider.interface';

export interface WhatsAppNotificationProvider extends NotificationProvider {
  readonly channel: 'WHATSAPP';
}
