import { ApiProperty } from '@nestjs/swagger';

export class PerformanceDashboardEntity {
  @ApiProperty()
  cycles!: number;

  @ApiProperty()
  activeCycles!: number;

  @ApiProperty()
  goals!: number;

  @ApiProperty()
  activeGoals!: number;

  @ApiProperty()
  completedGoals!: number;

  @ApiProperty()
  reviews!: number;

  @ApiProperty()
  approvedReviews!: number;

  @ApiProperty()
  pendingReviews!: number;

  @ApiProperty()
  averageFinalScore!: number;

  @ApiProperty()
  outstandingReviews!: number;

  @ApiProperty()
  improvementRequiredReviews!: number;

  constructor(partial: Partial<PerformanceDashboardEntity>) {
    Object.assign(this, partial);
  }
}
