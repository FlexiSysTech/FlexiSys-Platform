import { Inject, Injectable } from '@nestjs/common';

import { RequestContextService } from '../request-context';
import { AUDIT_STORAGE } from './audit-storage.token';
import { AuditRecord } from './audit.types';
import type { AuditStorage } from './audit.types';

@Injectable()
export class AuditService {
  constructor(
    @Inject(AUDIT_STORAGE) private readonly storage: AuditStorage,
    private readonly contextService: RequestContextService,
  ) {}

  async record(record: AuditRecord): Promise<void> {
    const context = this.contextService.getContext();

    await this.storage.write({
      ...record,
      actor: {
        userId: record.actor?.userId ?? context?.user?.id,
        ip: record.actor?.ip ?? context?.metadata.ipAddress,
        userAgent: record.actor?.userAgent ?? context?.metadata.userAgent,
      },
    });
  }
}
