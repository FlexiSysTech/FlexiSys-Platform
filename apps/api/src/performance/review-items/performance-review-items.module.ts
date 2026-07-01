import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { PerformanceReviewItemsController } from './performance-review-items.controller';
import { PerformanceReviewItemsService } from './performance-review-items.service';

@Module({
  imports: [PrismaModule],
  controllers: [PerformanceReviewItemsController],
  providers: [PerformanceReviewItemsService],
  exports: [PerformanceReviewItemsService],
})
export class PerformanceReviewItemsModule {}
