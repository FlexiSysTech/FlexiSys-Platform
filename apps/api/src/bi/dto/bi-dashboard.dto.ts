import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BiDashboardStatus, BiDashboardWidgetType } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class BiDashboardQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  audience?: string;

  @ApiPropertyOptional({ enum: BiDashboardStatus })
  @IsOptional()
  @IsEnum(BiDashboardStatus)
  status?: BiDashboardStatus;
}

export class CreateBiDashboardDto {
  @ApiProperty()
  @IsString()
  @MaxLength(120)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  audience?: string;

  @ApiPropertyOptional({ enum: BiDashboardStatus })
  @IsOptional()
  @IsEnum(BiDashboardStatus)
  status?: BiDashboardStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  layout?: Record<string, unknown>;
}

export class CreateBiDashboardWidgetDto {
  @ApiProperty()
  @IsString()
  @MaxLength(120)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  title!: string;

  @ApiProperty({ enum: BiDashboardWidgetType })
  @IsEnum(BiDashboardWidgetType)
  widgetType!: BiDashboardWidgetType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dataSource?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  config?: Record<string, unknown>;

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  position?: number;
}
