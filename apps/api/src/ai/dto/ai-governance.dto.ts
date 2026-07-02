import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AiFeatureArea, AiGovernanceStatus } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { PaginationQueryDto } from '../../platform/pagination';

export class AiGovernanceQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ enum: AiGovernanceStatus })
  @IsOptional()
  @IsEnum(AiGovernanceStatus)
  status?: AiGovernanceStatus;
}

export class CreateAiUsageLimitDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ enum: AiFeatureArea })
  @IsOptional()
  @IsEnum(AiFeatureArea)
  feature?: AiFeatureArea;

  @ApiPropertyOptional({ enum: AiGovernanceStatus })
  @IsOptional()
  @IsEnum(AiGovernanceStatus)
  status?: AiGovernanceStatus;

  @ApiPropertyOptional({ minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  monthlyTokenLimit?: number;

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyCostLimit?: number;
}

export class UpdateAiUsageLimitDto extends CreateAiUsageLimitDto {}

export class CreateAiSafetyPolicyDto {
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: AiGovernanceStatus })
  @IsOptional()
  @IsEnum(AiGovernanceStatus)
  status?: AiGovernanceStatus;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  blockedTerms?: string[];
}

export class UpdateAiSafetyPolicyDto extends CreateAiSafetyPolicyDto {}
