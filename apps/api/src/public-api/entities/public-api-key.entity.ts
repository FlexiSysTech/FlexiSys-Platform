import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PublicApiKeyStatus } from '@prisma/client';

export class PublicApiKeyEntity {
  constructor(partial: Partial<PublicApiKeyEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  tenantId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  applicationId!: string | null;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  keyId!: string;

  @ApiProperty({ enum: PublicApiKeyStatus })
  status!: PublicApiKeyStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  expiresAt!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  rotatedAt!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  revokedAt!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  lastUsedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;
}

export class PublicApiKeyCreatedEntity extends PublicApiKeyEntity {
  constructor(partial: Partial<PublicApiKeyCreatedEntity>) {
    super(partial);
    Object.assign(this, partial);
  }

  @ApiProperty()
  secret!: string;
}
