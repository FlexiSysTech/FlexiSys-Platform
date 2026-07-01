import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InterviewStatus } from '@prisma/client';

export class InterviewEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  applicationId!: string;

  @ApiPropertyOptional({ nullable: true })
  interviewerId!: string | null;

  @ApiProperty()
  scheduledAt!: Date;

  @ApiPropertyOptional({ nullable: true })
  location!: string | null;

  @ApiPropertyOptional({ nullable: true })
  meetingUrl!: string | null;

  @ApiProperty({ enum: InterviewStatus })
  status!: InterviewStatus;

  @ApiPropertyOptional({ nullable: true })
  score!: number | null;

  @ApiPropertyOptional({ nullable: true })
  feedback!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<InterviewEntity>) {
    Object.assign(this, partial);
  }
}
