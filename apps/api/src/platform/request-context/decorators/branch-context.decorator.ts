import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { RequestWithContextUser } from '../request-context.types';

export const BranchContext = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithContextUser>();
    const value = request.headers['x-branch-id'];

    return Array.isArray(value) ? value[0] : value;
  },
);
