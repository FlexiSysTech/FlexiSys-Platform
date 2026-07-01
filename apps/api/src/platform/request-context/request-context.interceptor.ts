import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { RequestContextService } from './request-context.service';
import { RequestWithContextUser } from './request-context.types';

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
  constructor(private readonly contextService: RequestContextService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<RequestWithContextUser>();
    const store = this.contextService.getContext();

    if (store && request.user?.id) {
      store.user = {
        id: request.user.id,
        username: request.user.username,
        email: request.user.email,
        fullName: request.user.fullName,
        roles: request.user.roles ?? [],
        permissions: request.user.permissions ?? [],
      };
    }

    return next.handle();
  }
}
