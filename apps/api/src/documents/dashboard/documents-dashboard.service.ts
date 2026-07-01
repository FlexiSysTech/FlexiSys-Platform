import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { DocumentsDashboardEntity } from './entities/documents-dashboard.entity';

@Injectable()
export class DocumentsDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(): Promise<DocumentsDashboardEntity> {
    const now = new Date();
    const inDays = (days: number) => {
      const date = new Date(now);
      date.setDate(date.getDate() + days);
      return date;
    };

    const [
      totalDocuments,
      activeDocuments,
      expiredDocuments,
      archivedDocuments,
      deletedDocuments,
      expiringIn90Days,
      expiringIn60Days,
      expiringIn30Days,
      expiringIn7Days,
      employeeDocuments,
    ] = await Promise.all([
      this.prisma.document.count(),
      this.prisma.document.count({ where: { status: 'ACTIVE' } }),
      this.prisma.document.count({ where: { status: 'EXPIRED' } }),
      this.prisma.document.count({ where: { status: 'ARCHIVED' } }),
      this.prisma.document.count({ where: { status: 'DELETED' } }),
      this.countExpiringBetween(now, inDays(90)),
      this.countExpiringBetween(now, inDays(60)),
      this.countExpiringBetween(now, inDays(30)),
      this.countExpiringBetween(now, inDays(7)),
      this.prisma.document.count({ where: { ownerType: 'EMPLOYEE' } }),
    ]);

    return new DocumentsDashboardEntity({
      totalDocuments,
      activeDocuments,
      expiredDocuments,
      archivedDocuments,
      deletedDocuments,
      expiringIn90Days,
      expiringIn60Days,
      expiringIn30Days,
      expiringIn7Days,
      employeeDocuments,
    });
  }

  private countExpiringBetween(from: Date, to: Date) {
    return this.prisma.document.count({
      where: {
        status: 'ACTIVE',
        expiryDate: {
          gte: from,
          lte: to,
        },
      },
    });
  }
}
