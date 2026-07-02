import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AiFeatureArea } from '@prisma/client';
import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class AiCompletionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  providerCode?: string;

  @ApiPropertyOptional({ enum: AiFeatureArea, default: AiFeatureArea.CORE })
  @IsOptional()
  @IsEnum(AiFeatureArea)
  feature?: AiFeatureArea;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  operation!: string;

  @ApiProperty()
  @IsString()
  prompt!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  systemPrompt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  context?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
