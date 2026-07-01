import { Prisma } from '@prisma/client';

export interface AuditActor {
  userId?: string;
  ip?: string;
  userAgent?: string;
}

export interface AuditRecord {
  action: string;
  entity: string;
  entityId?: string;
  actor?: AuditActor;
  payload?: Prisma.InputJsonValue;
}

export interface AuditOptions {
  action: string;
  entity: string;
  entityIdParam?: string;
  includeRequestBody?: boolean;
  includeResponse?: boolean;
}

export interface AuditStorage {
  write(record: AuditRecord): Promise<void>;
}
