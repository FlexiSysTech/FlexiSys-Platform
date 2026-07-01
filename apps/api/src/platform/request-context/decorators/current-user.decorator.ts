import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { RequestWithContextUser } from '../request-context.types';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithContextUser>();

    return request.user;
  },
);
