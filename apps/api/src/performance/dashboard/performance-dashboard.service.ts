import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { PerformanceDashboardEntity } from './entities/performance-dashboard.entity';

@Injectable()
export class PerformanceDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(): Promise<PerformanceDashboardEntity> {
    const [
      cycles,
      activeCycles,
      goals,
      activeGoals,
      completedGoals,
      reviews,
      approvedReviews,
      pendingReviews,
      outstandingReviews,
      improvementRequiredReviews,
      reviewScores,
    ] = await Promise.all([
      this.prisma.performanceCycle.count(),
      this.prisma.performanceCycle.count({
        where: { status: 'ACTIVE' },
      }),
      this.prisma.performanceGoal.count(),
      this.prisma.performanceGoal.count({
        where: { status: 'ACTIVE' },
      }),
      this.prisma.performanceGoal.count({
        where: { status: 'COMPLETED' },
      }),
      this.prisma.performanceReview.count(),
      this.prisma.performanceReview.count({
        where: { status: 'APPROVED' },
      }),
      this.prisma.performanceReview.count({
        where: {
          status: {
            in: ['DRAFT', 'SELF_REVIEW', 'MANAGER_REVIEW', 'HR_REVIEW'],
          },
        },
      }),
      this.prisma.performanceReview.count({
        where: { finalRating: 'OUTSTANDING' },
      }),
      this.prisma.performanceReview.count({
        where: {
          finalRating: {
            in: ['NEEDS_IMPROVEMENT', 'UNSATISFACTORY'],
          },
        },
      }),
      this.prisma.performanceReview.findMany({
        where: {
          finalScore: {
            not: null,
          },
        },
        select: {
          finalScore: true,
        },
      }),
    ]);

    const totalScore = reviewScores.reduce(
      (sum, review) => sum + (review.finalScore?.toNumber() ?? 0),
      0,
    );

    const averageFinalScore =
      reviewScores.length > 0
        ? Number((totalScore / reviewScores.length).toFixed(2))
        : 0;

    return new PerformanceDashboardEntity({
      cycles,
      activeCycles,
      goals,
      activeGoals,
      completedGoals,
      reviews,
      approvedReviews,
      pendingReviews,
      averageFinalScore,
      outstandingReviews,
      improvementRequiredReviews,
    });
  }
}
