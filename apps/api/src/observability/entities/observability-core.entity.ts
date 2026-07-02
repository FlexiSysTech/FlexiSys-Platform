import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ObservabilityCheckType,
  ObservabilityHealthStatus,
  ObservabilityProviderStatus,
} from '@prisma/client';

export class ObservabilityHealthProviderEntity {
  constructor(partial: Partial<ObservabilityHealthProviderEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  tenantId!: string | null;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  moduleName!: string;

  @ApiProperty({ enum: ObservabilityCheckType })
  checkType!: ObservabilityCheckType;

  @ApiProperty({ enum: ObservabilityProviderStatus })
  status!: ObservabilityProviderStatus;

  @ApiProperty()
  timeoutMs!: number;

  @ApiProperty()
  intervalSeconds!: number;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;
}

export class ObservabilityHealthCheckResultEntity {
  constructor(partial: Partial<ObservabilityHealthCheckResultEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  tenantId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  providerId!: string | null;

  @ApiProperty({ enum: ObservabilityCheckType })
  checkType!: ObservabilityCheckType;

  @ApiProperty()
  moduleName!: string;

  @ApiProperty({ enum: ObservabilityHealthStatus })
  status!: ObservabilityHealthStatus;

  @ApiPropertyOptional({ nullable: true })
  message!: string | null;

  @ApiPropertyOptional({ nullable: true })
  latencyMs!: number | null;

  @ApiProperty()
  checkedAt!: Date;
}

export class ObservabilitySystemHealthEntity {
  constructor(partial: Partial<ObservabilitySystemHealthEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ enum: ObservabilityHealthStatus })
  status!: ObservabilityHealthStatus;

  @ApiProperty()
  checkedAt!: Date;

  @ApiProperty({ type: [ObservabilityHealthCheckResultEntity] })
  checks!: ObservabilityHealthCheckResultEntity[];
}
