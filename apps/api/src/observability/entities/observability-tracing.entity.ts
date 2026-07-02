import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ObservabilitySpanType,
  ObservabilityTraceStatus,
} from '@prisma/client';

export class ObservabilityTraceEntity {
  constructor(partial: Partial<ObservabilityTraceEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  traceId!: string;

  @ApiPropertyOptional({ nullable: true })
  tenantId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  correlationId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  requestId!: string | null;

  @ApiProperty()
  rootSpanName!: string;

  @ApiProperty({ enum: ObservabilityTraceStatus })
  status!: ObservabilityTraceStatus;

  @ApiPropertyOptional({ nullable: true })
  durationMs!: number | null;

  @ApiProperty()
  startedAt!: Date;
}

export class ObservabilitySpanEntity {
  constructor(partial: Partial<ObservabilitySpanEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  traceRecordId!: string;

  @ApiPropertyOptional({ nullable: true })
  parentSpanId!: string | null;

  @ApiProperty()
  spanName!: string;

  @ApiProperty()
  moduleName!: string;

  @ApiProperty({ enum: ObservabilitySpanType })
  spanType!: ObservabilitySpanType;

  @ApiProperty({ enum: ObservabilityTraceStatus })
  status!: ObservabilityTraceStatus;

  @ApiPropertyOptional({ nullable: true })
  durationMs!: number | null;

  @ApiProperty()
  startedAt!: Date;
}
