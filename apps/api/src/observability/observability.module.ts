import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ObservabilityController } from './observability.controller';
import { ObservabilityHttpMetricsInterceptor } from './observability-http-metrics.interceptor';
import { ObservabilityService } from './observability.service';

@Module({
  controllers: [ObservabilityController],
  providers: [
    ObservabilityService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ObservabilityHttpMetricsInterceptor,
    },
  ],
  exports: [ObservabilityService],
})
export class ObservabilityModule {}
