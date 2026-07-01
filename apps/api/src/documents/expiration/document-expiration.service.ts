import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DocumentExpirationService {
  constructor(private readonly prisma: PrismaService) {}

  async markExpired() {
    const now = new Date();

    const result = await this.prisma.document.updateMany({
      where: {
        status: 'ACTIVE',
        expiryDate: {
          lt: now,
        },
      },
      data: {
        status: 'EXPIRED',
      },
    });

    return {
      success: true,
      updatedCount: result.count,
    };
  }

  async getExpiringSoon(days = 30) {
    const now = new Date();
    const until = new Date(now);
    until.setDate(until.getDate() + days);

    return this.prisma.document.findMany({
      where: {
        status: 'ACTIVE',
        expiryDate: {
          gte: now,
          lte: until,
        },
      },
      orderBy: {
        expiryDate: 'asc',
      },
    });
  }

  async getExpired() {
    return this.prisma.document.findMany({
      where: {
        OR: [
          { status: 'EXPIRED' },
          {
            status: 'ACTIVE',
            expiryDate: {
              lt: new Date(),
            },
          },
        ],
      },
      orderBy: {
        expiryDate: 'asc',
      },
    });
  }
}
