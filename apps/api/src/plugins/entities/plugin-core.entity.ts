import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  PluginLifecycleAction,
  PluginLifecycleState,
  PluginSource,
  PluginStatus,
} from '@prisma/client';

export class PluginManifestEntity {
  constructor(partial: Partial<PluginManifestEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiProperty()
  pluginKey!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  version!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiPropertyOptional({ nullable: true })
  publisher!: string | null;

  @ApiProperty({ enum: PluginSource })
  source!: PluginSource;

  @ApiProperty({ enum: PluginStatus })
  status!: PluginStatus;

  @ApiPropertyOptional({ nullable: true })
  entryPoint!: string | null;

  @ApiPropertyOptional({ nullable: true })
  checksum!: string | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class PluginRegistryEntryEntity {
  constructor(partial: Partial<PluginRegistryEntryEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiProperty()
  manifestId!: string;

  @ApiProperty({ enum: PluginStatus })
  status!: PluginStatus;

  @ApiProperty({ enum: PluginLifecycleState })
  lifecycle!: PluginLifecycleState;

  @ApiPropertyOptional({ type: Date, nullable: true })
  loadedAt!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  enabledAt!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  disabledAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  lastError!: string | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class PluginLifecycleEventEntity {
  constructor(partial: Partial<PluginLifecycleEventEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  registryEntryId!: string;

  @ApiProperty({ enum: PluginLifecycleAction })
  action!: PluginLifecycleAction;

  @ApiPropertyOptional({ enum: PluginLifecycleState, nullable: true })
  fromState!: PluginLifecycleState | null;

  @ApiPropertyOptional({ enum: PluginLifecycleState, nullable: true })
  toState!: PluginLifecycleState | null;

  @ApiProperty()
  success!: boolean;

  @ApiPropertyOptional({ nullable: true })
  message!: string | null;

  @ApiProperty()
  createdAt!: Date;
}
