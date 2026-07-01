import { SetMetadata } from '@nestjs/common';

import { AuditOptions } from './audit.types';

export const AUDIT_KEY = 'platform:audit';

export const Audit = (options: AuditOptions) => SetMetadata(AUDIT_KEY, options);
