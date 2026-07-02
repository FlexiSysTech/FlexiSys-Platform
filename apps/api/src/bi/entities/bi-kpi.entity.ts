import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BiAggregationPeriod,
  BiKpiStatus,
  BiKpiValueType,
} from '@prisma/client';

export class BiKpiEntity {
  constructor(partial: Partial<BiKpiEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  category!: string;

  @ApiProperty({ enum: BiKpiValueType })
  valueType!: BiKpiValueType;

  @ApiProperty({ enum: BiKpiStatus })
  status!: BiKpiStatus;

  @ApiPropertyOptional({ nullable: true })
  targetValue!: unknown;

  @ApiProperty()
  createdAt!: Date;
}

export class BiKpiSnapshotEntity {
  constructor(partial: Partial<BiKpiSnapshotEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  kpiId!: string;

  @ApiProperty({ enum: BiAggregationPeriod })
  period!: BiAggregationPeriod;

  @ApiProperty()
  periodStart!: Date;

  @ApiProperty()
  periodEnd!: Date;

  @ApiProperty()
  value!: unknown;

  @ApiPropertyOptional({ nullable: true })
  variance!: unknown;

  @ApiProperty()
  calculatedAt!: Date;
}
