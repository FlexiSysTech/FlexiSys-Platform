import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PayrollRunStatus, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/prisma.service';
import { PayrollApprovalActionDto } from './dto/payroll-approval-action.dto';

type PayrollRunRecord = {
  id: string;
  companyId: string;
  periodId: string | null;
  year: number;
  month: number;
  status: PayrollRunStatus;
  grossSalary: Decimal;
  taxableSalary: Decimal;
  totalDeductions: Decimal;
  netSalary: Decimal;
  employerCost: Decimal;
  startedAt: Date | null;
  reviewedAt: Date | null;
  reviewedById: string | null;
  approvedAt: Date | null;
  approvedById: string | null;
  rejectedAt: Date | null;
  rejectedReason: string | null;
  lockedAt: Date | null;
  paidAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PayrollApprovalService {
  constructor(private readonly prisma: PrismaService) {}

  async submitForReview(id: string, dto: PayrollApprovalActionDto) {
    const run = await this.ensureRun(id);
    this.ensureStatus(run.status, ['DRAFT', 'PROCESSING', 'REJECTED']);

    if (dto.userId) {
      await this.ensureUserExists(dto.userId);
    }

    const updated = await this.prisma.payrollRun.update({
      where: { id },
      data: {
        status: 'IN_REVIEW',
        reviewedAt: new Date(),
        reviewedById: dto.userId,
        notes: dto.comments ?? run.notes,
      },
    });

    await this.audit('PAYROLL_REVIEW', id, dto.userId, dto.comments);

    return updated;
  }

  async approve(id: string, dto: PayrollApprovalActionDto) {
    const run = await this.ensureRun(id);
    this.ensureStatus(run.status, ['IN_REVIEW', 'PROCESSING']);

    if (dto.userId) {
      await this.ensureUserExists(dto.userId);
    }

    const updated = await this.prisma.payrollRun.update({
      where: { id },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
        approvedById: dto.userId,
        rejectedAt: null,
        rejectedReason: null,
      },
    });

    await this.audit('PAYROLL_APPROVE', id, dto.userId, dto.comments);

    return updated;
  }

  async reject(id: string, dto: PayrollApprovalActionDto) {
    const run = await this.ensureRun(id);
    this.ensureStatus(run.status, ['IN_REVIEW', 'PROCESSING']);

    if (dto.userId) {
      await this.ensureUserExists(dto.userId);
    }

    const updated = await this.prisma.payrollRun.update({
      where: { id },
      data: {
        status: 'REJECTED',
        rejectedAt: new Date(),
        rejectedReason: dto.comments,
      },
    });

    await this.audit('PAYROLL_REJECT', id, dto.userId, dto.comments);

    return updated;
  }

  async lock(id: string, dto: PayrollApprovalActionDto) {
    const run = await this.ensureRun(id);
    this.ensureStatus(run.status, ['APPROVED']);

    if (dto.userId) {
      await this.ensureUserExists(dto.userId);
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      const result = await tx.payrollRun.update({
        where: { id },
        data: {
          status: 'LOCKED',
          lockedAt: new Date(),
        },
      });

      if (run.periodId) {
        await tx.payrollPeriod.update({
          where: { id: run.periodId },
          data: { status: 'LOCKED' },
        });
      }

      return result;
    });

    await this.audit('PAYROLL_LOCK', id, dto.userId, dto.comments);

    return updated;
  }

  private async ensureRun(id: string): Promise<PayrollRunRecord> {
    const run = await this.prisma.payrollRun.findUnique({ where: { id } });

    if (!run) {
      throw new NotFoundException('Payroll run not found');
    }

    return run;
  }

  private ensureStatus(
    current: PayrollRunStatus,
    allowed: PayrollRunStatus[],
  ): void {
    if (!allowed.includes(current)) {
      throw new BadRequestException(
        `Payroll run status ${current} cannot perform this action`,
      );
    }
  }

  private async ensureUserExists(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  private async audit(
    action: string,
    entityId: string,
    userId?: string,
    comments?: string,
  ): Promise<void> {
    await this.prisma.auditLog.create({
      data: {
        action,
        entity: 'PayrollRun',
        entityId,
        createdById: userId,
        payload:
          comments === undefined
            ? Prisma.JsonNull
            : ({ comments } as Prisma.InputJsonValue),
      },
    });
  }
}
