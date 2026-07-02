import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ObservabilityHealthStatus } from '@prisma/client';

export class ObservabilitySystemStatusEntity {
  constructor(partial: Partial<ObservabilitySystemStatusEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ enum: ObservabilityHealthStatus })
  status!: ObservabilityHealthStatus;

  @ApiProperty()
  activeHealthProviders!: number;

  @ApiProperty()
  unhealthyChecks!: number;

  @ApiProperty()
  errorLogsLastHour!: number;

  @ApiProperty()
  failedTracesLastHour!: number;

  @ApiProperty()
  metricSamplesLastHour!: number;

  @ApiProperty()
  checkedAt!: Date;
}

export class ObservabilityDiagnosticsEntity {
  constructor(partial: Partial<ObservabilityDiagnosticsEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  databaseLatencyMs!: number;

  @ApiProperty()
  recentHealthFailures!: number;

  @ApiProperty()
  slowHttpEndpoints!: Array<{
    endpoint: string;
    averageDurationMs: number;
    samples: number;
  }>;

  @ApiPropertyOptional({ nullable: true })
  recommendation!: string | null;
}

export class ObservabilityMetricsOverviewEntity {
  constructor(partial: Partial<ObservabilityMetricsOverviewEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  httpSamples!: number;

  @ApiProperty()
  databaseSamples!: number;

  @ApiProperty()
  workflowSamples!: number;

  @ApiProperty()
  payrollSamples!: number;

  @ApiProperty()
  businessRuleSamples!: number;
}
