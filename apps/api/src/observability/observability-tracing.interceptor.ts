import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { RequestContextService } from '../platform/request-context';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ObservabilityTracingInterceptor implements NestInterceptor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    if (context.getType() !== 'http') return next.handle();
    const http = context.switchToHttp();
    const request = http.getRequest<{
      method?: string;
      originalUrl?: string;
      url?: string;
    }>();
    const started = Date.now();
    const traceId = randomUUID();
    const path = request.originalUrl ?? request.url ?? 'unknown';

    return next.handle().pipe(
      tap(() => {
        void this.record(traceId, path, request.method ?? 'HTTP', started, 'SUCCESS');
      }),
      catchError((error: unknown) => {
        void this.record(traceId, path, request.method ?? 'HTTP', started, 'ERROR');
        return throwError(() => error);
      }),
    );
  }

  private async record(
    traceId: string,
    path: string,
    method: string,
    started: number,
    status: 'SUCCESS' | 'ERROR',
  ) {
    if (path.startsWith('/observability/traces')) return;
    const metadata = this.context.getMetadata();
    const durationMs = Date.now() - started;
    try {
      await this.prisma.$transaction(async (tx) => {
        const trace = await tx.observabilityTrace.create({
          data: {
            traceId,
            tenantId: this.context.getTenantId(),
            userId: this.context.getUserId(),
            correlationId: metadata?.correlationId,
            requestId: metadata?.requestId,
            rootSpanName: `${method} ${path}`,
            status,
            durationMs,
            endedAt: new Date(),
          },
        });
        await tx.observabilitySpan.create({
          data: {
            traceRecordId: trace.id,
            tenantId: trace.tenantId,
            spanName: `${method} ${path}`,
            moduleName: path.split('?')[0].split('/').filter(Boolean)[0] ?? 'api',
            spanType: 'REQUEST',
            status,
            durationMs,
            endedAt: new Date(),
          },
        });
      });
    } catch {
      // Tracing must not affect request processing.
    }
  }
}
