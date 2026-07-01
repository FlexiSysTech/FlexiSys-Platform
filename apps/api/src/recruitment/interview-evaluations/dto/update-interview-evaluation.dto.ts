import { ApiPropertyOptional } from '@nestjs/swagger';
import { InterviewEvaluationRecommendation } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateInterviewEvaluationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  interviewId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  evaluatorId?: string;

  @ApiPropertyOptional({ example: 'Technical Skills' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  criteria?: string;

  @ApiPropertyOptional({ example: 85 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  score?: number;

  @ApiPropertyOptional({ enum: InterviewEvaluationRecommendation })
  @IsOptional()
  @IsEnum(InterviewEvaluationRecommendation)
  recommendation?: InterviewEvaluationRecommendation;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  comments?: string;
}
