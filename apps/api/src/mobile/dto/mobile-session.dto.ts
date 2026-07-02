import { ApiPropertyOptional } from '@nestjs/swagger';
import { MobileSessionStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class MobileSessionQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  deviceId?: string;

  @ApiPropertyOptional({ enum: MobileSessionStatus })
  @IsOptional()
  @IsEnum(MobileSessionStatus)
  status?: MobileSessionStatus;
}
