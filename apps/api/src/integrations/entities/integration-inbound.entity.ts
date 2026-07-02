import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IntegrationInboundStatus } from '@prisma/client';

export class IntegrationInboundEventEntity {
  constructor(partial: Partial<IntegrationInboundEventEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  connectionId!: string | null;

  @ApiProperty()
  eventType!: string;

  @ApiPropertyOptional({ nullable: true })
  source!: string | null;

  @ApiProperty()
  signatureValid!: boolean;

  @ApiProperty({ enum: IntegrationInboundStatus })
  status!: IntegrationInboundStatus;

  @ApiPropertyOptional({ nullable: true })
  error!: string | null;

  @ApiProperty()
  receivedAt!: Date;

  @ApiPropertyOptional({ type: Date, nullable: true })
  processedAt!: Date | null;
}
