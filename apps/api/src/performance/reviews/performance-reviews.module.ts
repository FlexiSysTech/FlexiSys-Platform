import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { PerformanceReviewsController } from './performance-reviews.controller';
import { PerformanceReviewsService } from './performance-reviews.service';

@Module({
  imports: [PrismaModule],
  controllers: [PerformanceReviewsController],
  providers: [PerformanceReviewsService],
  exports: [PerformanceReviewsService],
})
export class PerformanceReviewsModule {}
