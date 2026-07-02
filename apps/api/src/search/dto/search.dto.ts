import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SearchEntityType, SearchIndexStatus, SearchScope } from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class SearchQueryDto extends PaginationQueryDto {
  @ApiProperty()
  @IsString()
  @MaxLength(200)
  q!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiPropertyOptional({ enum: SearchEntityType, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(SearchEntityType, { each: true })
  entityTypes?: SearchEntityType[];
}

export class DomainSearchQueryDto extends SearchQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  to?: string;
}

export class SearchIndexQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ enum: SearchEntityType })
  @IsOptional()
  @IsEnum(SearchEntityType)
  entityType?: SearchEntityType;

  @ApiPropertyOptional({ enum: SearchIndexStatus })
  @IsOptional()
  @IsEnum(SearchIndexStatus)
  status?: SearchIndexStatus;
}

export class UpsertSearchIndexDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiProperty({ enum: SearchEntityType })
  @IsEnum(SearchEntityType)
  entityType!: SearchEntityType;

  @ApiProperty()
  @IsString()
  @MaxLength(180)
  entityId!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(300)
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  subtitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  keywords?: string;

  @ApiPropertyOptional({ enum: SearchIndexStatus })
  @IsOptional()
  @IsEnum(SearchIndexStatus)
  status?: SearchIndexStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  sourceUpdatedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class RebuildSearchIndexDto {
  @ApiPropertyOptional({ enum: SearchEntityType, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(SearchEntityType, { each: true })
  entityTypes?: SearchEntityType[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ minimum: 1, maximum: 1000 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  limit?: number;
}

export class SearchAuditQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: SearchScope })
  @IsOptional()
  @IsEnum(SearchScope)
  scope?: SearchScope;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId?: string;
}
