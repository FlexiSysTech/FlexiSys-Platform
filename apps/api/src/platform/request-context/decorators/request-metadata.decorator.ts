import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { RequestWithContextUser } from '../request-context.types';

export const RequestMetadataContext = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithContextUser>();

    return {
      requestId: Array.isArray(request.headers['x-request-id'])
        ? request.headers['x-request-id'][0]
        : request.headers['x-request-id'],
      correlationId: Array.isArray(request.headers['x-correlation-id'])
        ? request.headers['x-correlation-id'][0]
        : request.headers['x-correlation-id'],
      ipAddress: request.ip,
      userAgent: Array.isArray(request.headers['user-agent'])
        ? request.headers['user-agent'][0]
        : request.headers['user-agent'],
      method: request.method,
      path: request.originalUrl ?? request.url,
    };
  },
);
