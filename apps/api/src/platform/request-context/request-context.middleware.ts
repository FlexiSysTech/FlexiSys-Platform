import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { NextFunction, Response } from 'express';

import { RequestContextService } from './request-context.service';
import {
  RequestContext,
  RequestWithContextUser,
} from './request-context.types';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly contextService: RequestContextService) {}

  use(req: RequestWithContextUser, _res: Response, next: NextFunction) {
    const requestId = this.firstHeader(req.headers['x-request-id']) ?? randomUUID();
    const correlationId =
      this.firstHeader(req.headers['x-correlation-id']) ?? requestId;

    const user = req.user?.id
      ? {
          id: req.user.id,
          username: req.user.username,
          email: req.user.email,
          fullName: req.user.fullName,
          roles: req.user.roles ?? [],
          permissions: req.user.permissions ?? [],
        }
      : undefined;

    const context: RequestContext = {
      user,
      organization: {
        companyId: this.firstHeader(req.headers['x-company-id']),
        branchId: this.firstHeader(req.headers['x-branch-id']),
      },
      metadata: {
        requestId,
        correlationId,
        ipAddress: req.ip,
        userAgent: this.firstHeader(req.headers['user-agent']),
        method: req.method,
        path: req.originalUrl ?? req.url,
      },
    };

    this.contextService.run(context, next);
  }

  private firstHeader(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
  }
}
