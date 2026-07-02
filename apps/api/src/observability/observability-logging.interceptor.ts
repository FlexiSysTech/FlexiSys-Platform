import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { RequestContextService } from '../platform/request-context';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ObservabilityLoggingInterceptor implements NestInterceptor {
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
        void this.record(request, statusCode, Date.now() - started, error);
        return throwError(() => error);
      }),
    );
  }

  private async record(
    request: { method?: string; originalUrl?: string; url?: string },
    statusCode: number,
    durationMs: number,
    error?: unknown,
  ) {
    const path = request.originalUrl ?? request.url ?? 'unknown';
    if (path.startsWith('/observability/logs')) return;
    const metadata = this.context.getMetadata();
    try {
      await this.prisma.observabilityLogEntry.create({
        data: {
          tenantId: this.context.getTenantId(),
          userId: this.context.getUserId(),
          correlationId: metadata?.correlationId,
          requestId: metadata?.requestId,
          moduleName: this.resolveModuleName(path),
          level: statusCode >= 500 ? 'ERROR' : statusCode >= 400 ? 'WARN' : 'INFO',
          message: `${request.method ?? 'HTTP'} ${path} completed with ${statusCode}`,
          method: request.method,
          path,
          statusCode,
          durationMs,
          context: {
            error: error instanceof Error ? error.message : undefined,
          },
        },
      });
    } catch {
      // Structured logging must not affect request processing.
    }
  }

  private resolveModuleName(path: string) {
    const segment = path.split('?')[0].split('/').filter(Boolean)[0];
    return segment || 'api';
  }
}
