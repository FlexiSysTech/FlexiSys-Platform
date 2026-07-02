import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ObservabilityLogLevel } from '@prisma/client';

export class ObservabilityLogEntryEntity {
  constructor(partial: Partial<ObservabilityLogEntryEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  tenantId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  userId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  correlationId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  requestId!: string | null;

  @ApiProperty()
  moduleName!: string;

  @ApiProperty({ enum: ObservabilityLogLevel })
  level!: ObservabilityLogLevel;

  @ApiProperty()
  message!: string;

  @ApiPropertyOptional({ nullable: true })
  statusCode!: number | null;

  @ApiPropertyOptional({ nullable: true })
  durationMs!: number | null;

  @ApiProperty()
  createdAt!: Date;
}
