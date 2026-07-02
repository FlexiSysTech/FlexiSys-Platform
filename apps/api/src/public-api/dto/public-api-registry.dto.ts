import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { PublicApiLifecycle, PublicApiStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class PublicApiRegistryQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  groupId?: string;

  @ApiPropertyOptional({ enum: PublicApiStatus })
  @IsOptional()
  @IsEnum(PublicApiStatus)
  status?: PublicApiStatus;

  @ApiPropertyOptional({ enum: PublicApiLifecycle })
  @IsOptional()
  @IsEnum(PublicApiLifecycle)
  lifecycle?: PublicApiLifecycle;
}

export class CreatePublicApiGroupDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(180)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: PublicApiStatus })
  @IsOptional()
  @IsEnum(PublicApiStatus)
  status?: PublicApiStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdatePublicApiGroupDto extends PartialType(
  CreatePublicApiGroupDto,
) {}

export class CreatePublicApiDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  groupId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(180)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  basePath!: string;

  @ApiPropertyOptional({ enum: PublicApiStatus })
  @IsOptional()
  @IsEnum(PublicApiStatus)
  status?: PublicApiStatus;

  @ApiPropertyOptional({ enum: PublicApiLifecycle })
  @IsOptional()
  @IsEnum(PublicApiLifecycle)
  lifecycle?: PublicApiLifecycle;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdatePublicApiDto extends PartialType(CreatePublicApiDto) {}

export class CreatePublicApiVersionDto {
  @ApiProperty()
  @IsString()
  apiId!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(40)
  version!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pathPrefix?: string;

  @ApiPropertyOptional({ enum: PublicApiStatus })
  @IsOptional()
  @IsEnum(PublicApiStatus)
  status?: PublicApiStatus;

  @ApiPropertyOptional({ enum: PublicApiLifecycle })
  @IsOptional()
  @IsEnum(PublicApiLifecycle)
  lifecycle?: PublicApiLifecycle;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  releasedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  deprecatedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdatePublicApiVersionDto extends PartialType(
  CreatePublicApiVersionDto,
) {}
