import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class CreateInterviewEvaluationDto {
  @ApiProperty()
  @IsString()
  interviewId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  evaluatorId?: string;

  @ApiProperty({ example: 'Technical Skills' })
  @IsString()
  @MaxLength(200)
  criteria!: string;

  @ApiProperty({ example: 85 })
  @IsNumber()
  @Min(0)
  @Max(100)
  score!: number;

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
