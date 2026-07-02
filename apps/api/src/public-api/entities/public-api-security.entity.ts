import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PublicApiRequestLogEntity {
  constructor(partial: Partial<PublicApiRequestLogEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  tenantId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  applicationId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  keyId!: string | null;

  @ApiProperty()
  method!: string;

  @ApiProperty()
  endpoint!: string;

  @ApiProperty()
  signatureValid!: boolean;

  @ApiPropertyOptional({ nullable: true })
  statusCode!: number | null;

  @ApiPropertyOptional({ nullable: true })
  error!: string | null;

  @ApiProperty()
  createdAt!: Date;
}

export class PublicApiSignatureVerificationEntity {
  constructor(partial: Partial<PublicApiSignatureVerificationEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  valid!: boolean;

  @ApiPropertyOptional({ nullable: true })
  reason!: string | null;

  @ApiPropertyOptional({ nullable: true })
  keyId!: string | null;
}
