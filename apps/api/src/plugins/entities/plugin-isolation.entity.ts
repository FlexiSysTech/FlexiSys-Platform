import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  PluginCapabilityType,
  PluginDependencyStatus,
  PluginSandboxLevel,
  PluginStatus,
} from '@prisma/client';

export class PluginSandboxPolicyEntity {
  constructor(partial: Partial<PluginSandboxPolicyEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  registryEntryId!: string;

  @ApiProperty({ enum: PluginSandboxLevel })
  level!: PluginSandboxLevel;

  @ApiProperty({ enum: PluginStatus })
  status!: PluginStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;
}

export class PluginDependencyEntity {
  constructor(partial: Partial<PluginDependencyEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  registryEntryId!: string;

  @ApiProperty()
  dependencyKey!: string;

  @ApiPropertyOptional({ nullable: true })
  requiredVersion!: string | null;

  @ApiProperty()
  optional!: boolean;

  @ApiProperty({ enum: PluginDependencyStatus })
  status!: PluginDependencyStatus;

  @ApiPropertyOptional({ nullable: true })
  resolvedVersion!: string | null;

  @ApiPropertyOptional({ nullable: true })
  message!: string | null;
}

export class PluginCapabilityGrantEntity {
  constructor(partial: Partial<PluginCapabilityGrantEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  registryEntryId!: string;

  @ApiProperty({ enum: PluginCapabilityType })
  capability!: PluginCapabilityType;

  @ApiProperty({ enum: PluginStatus })
  status!: PluginStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;
}

export class PluginIsolationValidationEntity {
  constructor(partial: Partial<PluginIsolationValidationEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  registryEntryId!: string;

  @ApiProperty()
  allowed!: boolean;

  @ApiProperty()
  missingRequiredDependencies!: number;

  @ApiProperty()
  activeCapabilities!: number;

  @ApiPropertyOptional({ nullable: true })
  reason?: string | null;
}
