import { Module } from '@nestjs/common';

import { PerformanceCyclesModule } from './cycles/performance-cycles.module';
import { PerformanceDashboardModule } from './dashboard/performance-dashboard.module';
import { PerformanceGoalsModule } from './goals/performance-goals.module';
import { PerformanceReviewItemsModule } from './review-items/performance-review-items.module';
import { PerformanceReviewsModule } from './reviews/performance-reviews.module';

@Module({
  imports: [
    PerformanceCyclesModule,
    PerformanceGoalsModule,
    PerformanceReviewsModule,
    PerformanceReviewItemsModule,
    PerformanceDashboardModule,
  ],
  exports: [
    PerformanceCyclesModule,
    PerformanceGoalsModule,
    PerformanceReviewsModule,
    PerformanceReviewItemsModule,
    PerformanceDashboardModule,
  ],
})
export class PerformanceModule {}
