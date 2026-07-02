import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ObservabilityController } from './observability.controller';
import { ObservabilityHttpMetricsInterceptor } from './observability-http-metrics.interceptor';
import { ObservabilityLoggingInterceptor } from './observability-logging.interceptor';
import { ObservabilityService } from './observability.service';

@Module({
  controllers: [ObservabilityController],
  providers: [
    ObservabilityService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ObservabilityHttpMetricsInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ObservabilityLoggingInterceptor,
    },
  ],
  exports: [ObservabilityService],
})
export class ObservabilityModule {}
