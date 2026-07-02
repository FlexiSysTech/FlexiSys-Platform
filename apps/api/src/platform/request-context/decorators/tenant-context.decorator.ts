import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { RequestWithContextUser } from '../request-context.types';

export const TenantContext = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithContextUser>();
    const tenantId = request.headers['x-tenant-id'];
    const tenantCode = request.headers['x-tenant-code'];

    return {
      tenantId: Array.isArray(tenantId) ? tenantId[0] : tenantId,
      tenantCode: Array.isArray(tenantCode) ? tenantCode[0] : tenantCode,
    };
  },
);
