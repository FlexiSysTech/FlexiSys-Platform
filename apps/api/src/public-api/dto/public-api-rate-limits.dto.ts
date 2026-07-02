import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { PublicApiRateLimitWindow, PublicApiStatus } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class PublicApiRateLimitQueryDto extends PaginationQueryDto {
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
  endpoint?: string;
}

export class CreatePublicApiRateLimitPolicyDto {
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
  endpoint?: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ minimum: 1 })
  @IsInt()
  @Min(1)
  limitValue!: number;

  @ApiPropertyOptional({ enum: PublicApiRateLimitWindow })
  @IsOptional()
  @IsEnum(PublicApiRateLimitWindow)
  window?: PublicApiRateLimitWindow;

  @ApiPropertyOptional({ enum: PublicApiStatus })
  @IsOptional()
  @IsEnum(PublicApiStatus)
  status?: PublicApiStatus;
}

export class UpdatePublicApiRateLimitPolicyDto extends PartialType(
  CreatePublicApiRateLimitPolicyDto,
) {}

export class EvaluatePublicApiRateLimitDto {
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
  endpoint?: string;

  @ApiPropertyOptional({ minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  requestCount?: number;
}
