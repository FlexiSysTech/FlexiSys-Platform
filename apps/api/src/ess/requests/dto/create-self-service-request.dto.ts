import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SelfServiceRequestType } from '@prisma/client';
import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSelfServiceRequestDto {
  @ApiProperty()
  @IsString()
  employeeId!: string;

  @ApiProperty({ enum: SelfServiceRequestType })
  @IsEnum(SelfServiceRequestType)
  type!: SelfServiceRequestType;

  @ApiProperty({ example: 'Update personal information' })
  @IsString()
  @MaxLength(200)
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;
}
