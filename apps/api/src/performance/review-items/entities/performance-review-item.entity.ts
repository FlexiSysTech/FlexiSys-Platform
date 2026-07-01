import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PerformanceRating } from '@prisma/client';

export class PerformanceReviewItemEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  reviewId!: string;

  @ApiProperty()
  title!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty()
  weight!: number;

  @ApiPropertyOptional({ nullable: true })
  score!: number | null;

  @ApiPropertyOptional({ enum: PerformanceRating, nullable: true })
  rating!: PerformanceRating | null;

  @ApiPropertyOptional({ nullable: true })
  comments!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<PerformanceReviewItemEntity>) {
    Object.assign(this, partial);
  }
}
