import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class PublicApiRequestLogQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  applicationId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  keyId?: string;
}

export class VerifyPublicApiRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  applicationId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  apiId?: string;

  @ApiProperty()
  @IsString()
  keyId!: string;

  @ApiProperty()
  @IsString()
  method!: string;

  @ApiProperty()
  @IsString()
  endpoint!: string;

  @ApiProperty()
  @IsDateString()
  timestamp!: string;

  @ApiProperty()
  @IsString()
  nonce!: string;

  @ApiProperty()
  @IsString()
  signature!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  requestHash?: string;
}

export class RecordPublicApiRequestLogDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  applicationId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  apiId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  keyId?: string;

  @ApiProperty()
  @IsString()
  method!: string;

  @ApiProperty()
  @IsString()
  endpoint!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  signatureValid?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  statusCode?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  requestHash?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  error?: string;
}
