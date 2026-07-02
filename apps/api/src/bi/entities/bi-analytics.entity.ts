import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BiAggregationPeriod,
  BiDatasetStatus,
  BiExecutionStatus,
  BiMetricType,
} from '@prisma/client';

export class BiDatasetEntity {
  constructor(partial: Partial<BiDatasetEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  source!: string;

  @ApiProperty({ enum: BiDatasetStatus })
  status!: BiDatasetStatus;

  @ApiProperty()
  createdAt!: Date;
}

export class BiMetricEntity {
  constructor(partial: Partial<BiMetricEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ enum: BiMetricType })
  metricType!: BiMetricType;

  @ApiPropertyOptional({ nullable: true })
  datasetId!: string | null;
}

export class BiMetricObservationEntity {
  constructor(partial: Partial<BiMetricObservationEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  metricId!: string;

  @ApiProperty({ enum: BiAggregationPeriod })
  period!: BiAggregationPeriod;

  @ApiProperty()
  observedAt!: Date;

  @ApiProperty()
  value!: unknown;
}

export class BiAnalyticsExecutionEntity {
  constructor(partial: Partial<BiAnalyticsExecutionEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  executionType!: string;

  @ApiProperty({ enum: BiExecutionStatus })
  status!: BiExecutionStatus;

  @ApiPropertyOptional({ nullable: true })
  durationMs!: number | null;
}
