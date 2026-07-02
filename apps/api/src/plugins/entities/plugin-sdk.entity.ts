import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  PluginEventStatus,
  PluginHookType,
  PluginServiceType,
  PluginStatus,
} from '@prisma/client';

export class PluginEventSubscriptionEntity {
  constructor(partial: Partial<PluginEventSubscriptionEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  registryEntryId!: string;

  @ApiProperty()
  eventName!: string;

  @ApiProperty({ enum: PluginStatus })
  status!: PluginStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;
}

export class PluginHookEntity {
  constructor(partial: Partial<PluginHookEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  registryEntryId!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  hookPoint!: string;

  @ApiProperty({ enum: PluginHookType })
  type!: PluginHookType;

  @ApiProperty()
  priority!: number;

  @ApiProperty({ enum: PluginStatus })
  status!: PluginStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;
}

export class PluginServiceBindingEntity {
  constructor(partial: Partial<PluginServiceBindingEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  registryEntryId!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty({ enum: PluginServiceType })
  serviceType!: PluginServiceType;

  @ApiPropertyOptional({ nullable: true })
  endpoint!: string | null;

  @ApiProperty({ enum: PluginStatus })
  status!: PluginStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;
}

export class PluginPermissionGrantEntity {
  constructor(partial: Partial<PluginPermissionGrantEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  registryEntryId!: string;

  @ApiProperty()
  permissionCode!: string;

  @ApiProperty({ enum: PluginStatus })
  status!: PluginStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;
}

export class PluginConfigurationEntity {
  constructor(partial: Partial<PluginConfigurationEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  registryEntryId!: string;

  @ApiProperty()
  key!: string;

  @ApiProperty()
  isSecret!: boolean;

  @ApiPropertyOptional({ nullable: true })
  secretRef!: string | null;

  @ApiProperty({ enum: PluginStatus })
  status!: PluginStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;
}

export class PluginEventEntity {
  constructor(partial: Partial<PluginEventEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  registryEntryId!: string | null;

  @ApiProperty()
  eventName!: string;

  @ApiProperty({ enum: PluginEventStatus })
  status!: PluginEventStatus;

  @ApiPropertyOptional({ nullable: true })
  error!: string | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  dispatchedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;
}
