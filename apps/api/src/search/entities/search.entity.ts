import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SearchEntityType, SearchIndexStatus, SearchScope } from '@prisma/client';

export class SearchResultEntity {
  constructor(partial: Partial<SearchResultEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty({ enum: SearchEntityType })
  entityType!: SearchEntityType;

  @ApiProperty()
  entityId!: string;

  @ApiProperty()
  title!: string;

  @ApiPropertyOptional({ nullable: true })
  subtitle!: string | null;

  @ApiPropertyOptional({ nullable: true })
  snippet!: string | null;

  @ApiProperty()
  score!: number;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  branchId!: string | null;

  @ApiPropertyOptional({ type: Object, nullable: true })
  metadata!: Record<string, unknown> | null;
}

export class SearchIndexEntity {
  constructor(partial: Partial<SearchIndexEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty({ enum: SearchEntityType })
  entityType!: SearchEntityType;

  @ApiProperty()
  entityId!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty({ enum: SearchIndexStatus })
  status!: SearchIndexStatus;

  @ApiProperty()
  lastIndexedAt!: Date;
}

export class SearchAuditEntity {
  constructor(partial: Partial<SearchAuditEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty({ enum: SearchScope })
  scope!: SearchScope;

  @ApiProperty()
  query!: string;

  @ApiProperty()
  resultCount!: number;

  @ApiProperty()
  durationMs!: number;

  @ApiProperty()
  createdAt!: Date;
}

export class SearchRebuildResultEntity {
  constructor(partial: Partial<SearchRebuildResultEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  indexed!: number;

  @ApiProperty()
  skipped!: number;

  @ApiProperty({ enum: SearchEntityType, isArray: true })
  entityTypes!: SearchEntityType[];
}
