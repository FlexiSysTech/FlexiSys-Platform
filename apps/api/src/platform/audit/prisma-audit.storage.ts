import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AuditRecord, AuditStorage } from './audit.types';

@Injectable()
export class PrismaAuditStorage implements AuditStorage {
  constructor(private readonly prisma: PrismaService) {}

  async write(record: AuditRecord): Promise<void> {
    await this.prisma.auditLog.create({
      data: {
        action: record.action,
        entity: record.entity,
        entityId: record.entityId,
        ip: record.actor?.ip,
        userAgent: record.actor?.userAgent,
        createdById: record.actor?.userId,
        payload: record.payload,
      },
    });
  }
}
