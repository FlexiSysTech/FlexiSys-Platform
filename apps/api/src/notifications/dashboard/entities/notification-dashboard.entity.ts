import { ApiProperty } from '@nestjs/swagger';

export class NotificationDashboardEntity {
  @ApiProperty()
  totalNotifications!: number;

  @ApiProperty()
  pendingNotifications!: number;

  @ApiProperty()
  sentNotifications!: number;

  @ApiProperty()
  failedNotifications!: number;

  @ApiProperty()
  readNotifications!: number;

  @ApiProperty()
  cancelledNotifications!: number;

  @ApiProperty()
  scheduledNotifications!: number;

  @ApiProperty()
  inAppNotifications!: number;

  @ApiProperty()
  emailNotifications!: number;

  @ApiProperty()
  whatsappNotifications!: number;

  @ApiProperty()
  pushNotifications!: number;

  constructor(partial: Partial<NotificationDashboardEntity>) {
    Object.assign(this, partial);
  }
}
