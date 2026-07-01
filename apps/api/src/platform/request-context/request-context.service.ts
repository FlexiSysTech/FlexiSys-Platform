import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';

import { RequestContext } from './request-context.types';

@Injectable()
export class RequestContextService {
  private readonly storage = new AsyncLocalStorage<RequestContext>();

  run<T>(context: RequestContext, callback: () => T): T {
    return this.storage.run(context, callback);
  }

  getContext(): RequestContext | undefined {
    return this.storage.getStore();
  }

  getUser() {
    return this.getContext()?.user;
  }

  getUserId(): string | undefined {
    return this.getUser()?.id;
  }

  getCompanyId(): string | undefined {
    return this.getContext()?.organization.companyId;
  }

  getBranchId(): string | undefined {
    return this.getContext()?.organization.branchId;
  }

  getMetadata() {
    return this.getContext()?.metadata;
  }
}
