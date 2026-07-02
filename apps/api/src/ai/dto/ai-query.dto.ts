import { ApiPropertyOptional } from '@nestjs/swagger';
import { AiFeatureArea, AiProviderStatus, AiRequestStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class AiProviderQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ enum: AiProviderStatus })
  @IsOptional()
  @IsEnum(AiProviderStatus)
  status?: AiProviderStatus;
}

export class AiRequestLogQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ enum: AiFeatureArea })
  @IsOptional()
  @IsEnum(AiFeatureArea)
  feature?: AiFeatureArea;

  @ApiPropertyOptional({ enum: AiRequestStatus })
  @IsOptional()
  @IsEnum(AiRequestStatus)
  status?: AiRequestStatus;
}
