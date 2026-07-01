import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InterviewEvaluationRecommendation } from '@prisma/client';

export class InterviewEvaluationEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  interviewId!: string;

  @ApiPropertyOptional({ nullable: true })
  evaluatorId!: string | null;

  @ApiProperty()
  criteria!: string;

  @ApiProperty()
  score!: number;

  @ApiPropertyOptional({
    enum: InterviewEvaluationRecommendation,
    nullable: true,
  })
  recommendation!: InterviewEvaluationRecommendation | null;

  @ApiPropertyOptional({ nullable: true })
  comments!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<InterviewEvaluationEntity>) {
    Object.assign(this, partial);
  }
}
