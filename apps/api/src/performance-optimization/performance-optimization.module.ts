import { Module } from '@nestjs/common';

import { PerformanceOptimizationController } from './performance-optimization.controller';
import { PerformanceOptimizationService } from './performance-optimization.service';

@Module({
  controllers: [PerformanceOptimizationController],
  providers: [PerformanceOptimizationService],
  exports: [PerformanceOptimizationService],
})
export class PerformanceOptimizationModule {}
