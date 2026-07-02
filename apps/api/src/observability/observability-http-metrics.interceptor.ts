import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { RequestContextService } from '../platform/request-context';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ObservabilityHttpMetricsInterceptor implements NestInterceptor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    if (context.getType() !== 'http') return next.handle();
    const http = context.switchToHttp();
    const request = http.getRequest<{ method?: string; originalUrl?: string; url?: string }>();
    const response = http.getResponse<{ statusCode?: number }>();
    const started = Date.now();

    return next.handle().pipe(
      tap(() => {
        void this.record(request, response.statusCode ?? 200, Date.now() - started);
      }),
      catchError((error: unknown) => {
        const statusCode =
          typeof error === 'object' &&
          error !== null &&
          'status' in error &&
          typeof (error as { status?: unknown }).status === 'number'
            ? (error as { status: number }).status
            : 500;
        void this.record(request, statusCode, Date.now() - started);
        return throwError(() => error);
      }),
    );
  }

  private async record(
    request: { method?: string; originalUrl?: string; url?: string },
    statusCode: number,
    durationMs: number,
  ) {
    const endpoint = request.originalUrl ?? request.url ?? 'unknown';
    if (endpoint.startsWith('/observability')) return;
    try {
      await this.prisma.observabilityMetricSample.create({
        data: {
          tenantId: this.context.getTenantId(),
          metricType: 'HTTP',
          moduleName: 'http',
          metricName: 'request.duration',
          value: durationMs,
          unit: 'MILLISECONDS',
          endpoint,
          statusCode,
          durationMs,
          labels: {
            method: request.method ?? 'UNKNOWN',
            statusFamily: `${Math.floor(statusCode / 100)}xx`,
          },
        },
      });
    } catch {
      // Observability must not affect request processing.
    }
  }
}
