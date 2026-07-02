import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  MobileDevicePlatform,
  MobileDeviceStatus,
  MobilePushProvider,
  MobilePushStatus,
  MobileSessionStatus,
  MobileSyncOperation,
  MobileSyncStatus,
} from '@prisma/client';

export class MobileDeviceEntity {
  constructor(partial: Partial<MobileDeviceEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  tenantId!: string | null;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  deviceIdentifier!: string;

  @ApiProperty({ enum: MobileDevicePlatform })
  platform!: MobileDevicePlatform;

  @ApiProperty({ enum: MobileDeviceStatus })
  status!: MobileDeviceStatus;

  @ApiProperty({ enum: MobilePushProvider })
  pushProvider!: MobilePushProvider;

  @ApiPropertyOptional({ nullable: true })
  pushToken!: string | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  lastSeenAt!: Date | null;

  @ApiProperty()
  registeredAt!: Date;
}

export class MobileSessionEntity {
  constructor(partial: Partial<MobileSessionEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiPropertyOptional({ nullable: true })
  deviceId!: string | null;

  @ApiProperty({ enum: MobileSessionStatus })
  status!: MobileSessionStatus;

  @ApiProperty()
  expiresAt!: Date;

  @ApiProperty()
  refreshExpiresAt!: Date;

  @ApiPropertyOptional({ type: Date, nullable: true })
  lastSeenAt!: Date | null;
}

export class MobileAuthResponseEntity {
  constructor(partial: Partial<MobileAuthResponseEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  success!: boolean;

  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;

  @ApiProperty({ type: MobileSessionEntity })
  session!: MobileSessionEntity;

  @ApiProperty({ type: MobileDeviceEntity })
  device!: MobileDeviceEntity;

  @ApiProperty()
  user!: Record<string, unknown>;
}

export class MobilePushNotificationEntity {
  constructor(partial: Partial<MobilePushNotificationEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  userId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  deviceId!: string | null;

  @ApiProperty({ enum: MobilePushStatus })
  status!: MobilePushStatus;

  @ApiProperty({ enum: MobilePushProvider })
  provider!: MobilePushProvider;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  message!: string;

  @ApiPropertyOptional({ type: Date, nullable: true })
  scheduledAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;
}

export class MobileSyncChangeEntity {
  constructor(partial: Partial<MobileSyncChangeEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  entityType!: string;

  @ApiProperty()
  entityId!: string;

  @ApiProperty({ enum: MobileSyncOperation })
  operation!: MobileSyncOperation;

  @ApiProperty({ enum: MobileSyncStatus })
  syncStatus!: MobileSyncStatus;

  @ApiProperty()
  version!: number;

  @ApiProperty()
  occurredAt!: Date;
}

export class MobileSyncPullResponseEntity {
  constructor(partial: Partial<MobileSyncPullResponseEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  scope!: string;

  @ApiProperty()
  cursor!: string;

  @ApiProperty()
  serverTime!: Date;

  @ApiProperty({ type: [MobileSyncChangeEntity] })
  changes!: MobileSyncChangeEntity[];
}

export class MobileBootstrapEntity {
  constructor(partial: Partial<MobileBootstrapEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  serverTime!: Date;

  @ApiProperty()
  user!: Record<string, unknown>;

  @ApiProperty()
  activeDevices!: number;

  @ApiProperty()
  activeSessions!: number;

  @ApiProperty()
  pendingPushNotifications!: number;
}
