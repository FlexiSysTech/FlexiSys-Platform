import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PublicApiLifecycle, PublicApiStatus } from '@prisma/client';

export class PublicApiGroupEntity {
  constructor(partial: Partial<PublicApiGroupEntity>) {
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
  description!: string | null;

  @ApiProperty({ enum: PublicApiStatus })
  status!: PublicApiStatus;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;
}

export class PublicApiEntity {
  constructor(partial: Partial<PublicApiEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  tenantId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  groupId!: string | null;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  basePath!: string;

  @ApiProperty({ enum: PublicApiStatus })
  status!: PublicApiStatus;

  @ApiProperty({ enum: PublicApiLifecycle })
  lifecycle!: PublicApiLifecycle;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;
}

export class PublicApiVersionEntity {
  constructor(partial: Partial<PublicApiVersionEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  apiId!: string;

  @ApiProperty()
  version!: string;

  @ApiPropertyOptional({ nullable: true })
  pathPrefix!: string | null;

  @ApiProperty({ enum: PublicApiStatus })
  status!: PublicApiStatus;

  @ApiProperty({ enum: PublicApiLifecycle })
  lifecycle!: PublicApiLifecycle;

  @ApiPropertyOptional({ type: Date, nullable: true })
  releasedAt!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deprecatedAt!: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;
}
