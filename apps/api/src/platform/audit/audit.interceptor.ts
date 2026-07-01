import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Observable, tap } from 'rxjs';

import { AuditService } from './audit.service';
import { AUDIT_KEY } from './audit.decorator';
import { AuditOptions } from './audit.types';

type RequestLike = {
  params?: Record<string, string>;
  body?: unknown;
};

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly auditService: AuditService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const options = this.reflector.getAllAndOverride<AuditOptions>(AUDIT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!options) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest<RequestLike>();

    return next.handle().pipe(
      tap((response) => {
        void this.auditService.record({
          action: options.action,
          entity: options.entity,
          entityId: options.entityIdParam
            ? request.params?.[options.entityIdParam]
            : undefined,
          payload: this.buildPayload(options, request.body, response),
        });
      }),
    );
  }

  private buildPayload(
    options: AuditOptions,
    requestBody: unknown,
    response: unknown,
  ): Prisma.InputJsonValue | undefined {
    const payload: Record<string, unknown> = {};

    if (options.includeRequestBody) {
      payload.requestBody = requestBody;
    }

    if (options.includeResponse) {
      payload.response = response;
    }

    return Object.keys(payload).length > 0
      ? (payload as Prisma.InputJsonObject)
      : undefined;
  }
}
