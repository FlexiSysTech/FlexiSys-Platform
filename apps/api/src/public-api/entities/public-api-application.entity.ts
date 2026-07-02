import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PublicApiStatus } from '@prisma/client';

export class PublicApiApplicationEntity {
  constructor(partial: Partial<PublicApiApplicationEntity>) {
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

  @ApiPropertyOptional({ nullable: true })
  ownerUserId!: string | null;

  @ApiProperty({ enum: PublicApiStatus })
  status!: PublicApiStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;
}

export class PublicApiApplicationUsageEntity {
  constructor(partial: Partial<PublicApiApplicationUsageEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  applicationId!: string;

  @ApiProperty()
  activeKeys!: number;

  @ApiProperty()
  revokedKeys!: number;

  @ApiProperty()
  totalRequests!: number;
}
