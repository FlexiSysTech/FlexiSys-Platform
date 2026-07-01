import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  PerformanceRating,
  PerformanceReviewStatus,
} from '@prisma/client';

export class PerformanceReviewEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  cycleId!: string;

  @ApiProperty()
  employeeId!: string;

  @ApiPropertyOptional({ nullable: true })
  managerId!: string | null;

  @ApiProperty({ enum: PerformanceReviewStatus })
  status!: PerformanceReviewStatus;

  @ApiPropertyOptional({ nullable: true })
  selfScore!: number | null;

  @ApiPropertyOptional({ nullable: true })
  managerScore!: number | null;

  @ApiPropertyOptional({ nullable: true })
  finalScore!: number | null;

  @ApiPropertyOptional({ enum: PerformanceRating, nullable: true })
  finalRating!: PerformanceRating | null;

  @ApiPropertyOptional({ nullable: true })
  selfComments!: string | null;

  @ApiPropertyOptional({ nullable: true })
  managerComments!: string | null;

  @ApiPropertyOptional({ nullable: true })
  hrComments!: string | null;

  @ApiPropertyOptional({ nullable: true })
  submittedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  approvedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<PerformanceReviewEntity>) {
    Object.assign(this, partial);
  }
}
