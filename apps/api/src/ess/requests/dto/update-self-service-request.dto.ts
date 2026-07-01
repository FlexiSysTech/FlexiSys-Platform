import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  SelfServiceRequestStatus,
  SelfServiceRequestType,
} from '@prisma/client';
import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateSelfServiceRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  employeeId?: string;

  @ApiPropertyOptional({ enum: SelfServiceRequestType })
  @IsOptional()
  @IsEnum(SelfServiceRequestType)
  type?: SelfServiceRequestType;

  @ApiPropertyOptional({ example: 'Update personal information' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({ enum: SelfServiceRequestStatus })
  @IsOptional()
  @IsEnum(SelfServiceRequestStatus)
  status?: SelfServiceRequestStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  response?: string;
}
