import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AiProviderStatus, AiProviderType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAiProviderConfigDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(160)
  name!: string;

  @ApiPropertyOptional({ enum: AiProviderType })
  @IsOptional()
  @IsEnum(AiProviderType)
  type?: AiProviderType;

  @ApiPropertyOptional({ enum: AiProviderStatus })
  @IsOptional()
  @IsEnum(AiProviderStatus)
  status?: AiProviderStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  endpoint?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  settings?: Record<string, unknown>;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
