import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { PublicApiStatus } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class PublicApiApplicationQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional({ enum: PublicApiStatus })
  @IsOptional()
  @IsEnum(PublicApiStatus)
  status?: PublicApiStatus;
}

export class CreatePublicApiApplicationDto {
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
  ownerUserId?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  callbackUrls?: string[];

  @ApiPropertyOptional({ enum: PublicApiStatus })
  @IsOptional()
  @IsEnum(PublicApiStatus)
  status?: PublicApiStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdatePublicApiApplicationDto extends PartialType(
  CreatePublicApiApplicationDto,
) {}
