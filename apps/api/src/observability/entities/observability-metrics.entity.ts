import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ObservabilityMetricType,
  ObservabilityMetricUnit,
  ObservabilityProviderStatus,
} from '@prisma/client';

export class ObservabilityMetricDefinitionEntity {
  constructor(partial: Partial<ObservabilityMetricDefinitionEntity>) {
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

  @ApiProperty({ enum: ObservabilityMetricType })
  metricType!: ObservabilityMetricType;

  @ApiProperty({ enum: ObservabilityMetricUnit })
  unit!: ObservabilityMetricUnit;

  @ApiProperty({ enum: ObservabilityProviderStatus })
  status!: ObservabilityProviderStatus;
}

export class ObservabilityMetricSampleEntity {
  constructor(partial: Partial<ObservabilityMetricSampleEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  tenantId!: string | null;

  @ApiProperty({ enum: ObservabilityMetricType })
  metricType!: ObservabilityMetricType;

  @ApiProperty()
  moduleName!: string;

  @ApiProperty()
  metricName!: string;

  @ApiProperty()
  value!: number;

  @ApiProperty({ enum: ObservabilityMetricUnit })
  unit!: ObservabilityMetricUnit;

  @ApiPropertyOptional({ nullable: true })
  endpoint!: string | null;

  @ApiPropertyOptional({ nullable: true })
  durationMs!: number | null;

  @ApiProperty()
  recordedAt!: Date;
}

export class ObservabilityMetricSummaryEntity {
  constructor(partial: Partial<ObservabilityMetricSummaryEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ enum: ObservabilityMetricType })
  metricType!: ObservabilityMetricType;

  @ApiProperty()
  totalSamples!: number;

  @ApiProperty()
  totalValue!: number;

  @ApiProperty()
  averageValue!: number;

  @ApiPropertyOptional({ nullable: true })
  averageDurationMs!: number | null;
}
