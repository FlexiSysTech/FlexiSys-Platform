import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FinanceReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async payrollSummary() {
    const [runs, totals] = await Promise.all([
      this.prisma.payrollRun.findMany({
        orderBy: [{ year: 'desc' }, { month: 'desc' }],
        take: 24,
      }),
      this.prisma.payrollRun.aggregate({
        _sum: {
          grossSalary: true,
          taxableSalary: true,
          totalDeductions: true,
          netSalary: true,
          employerCost: true,
        },
      }),
    ]);

    return {
      totals: {
        grossSalary: totals._sum.grossSalary?.toNumber() ?? 0,
        taxableSalary: totals._sum.taxableSalary?.toNumber() ?? 0,
        totalDeductions: totals._sum.totalDeductions?.toNumber() ?? 0,
        netSalary: totals._sum.netSalary?.toNumber() ?? 0,
        employerCost: totals._sum.employerCost?.toNumber() ?? 0,
      },
      recentRuns: runs.map((run) => ({
        id: run.id,
        year: run.year,
        month: run.month,
        status: run.status,
        grossSalary: run.grossSalary.toNumber(),
        netSalary: run.netSalary.toNumber(),
        employerCost: run.employerCost.toNumber(),
      })),
    };
  }

  async payslipSummary() {
    const [totalPayslips, byStatus, totals] = await Promise.all([
      this.prisma.payslip.count(),
      this.prisma.payslip.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      this.prisma.payslip.aggregate({
        _sum: {
          grossEarnings: true,
          taxableSalary: true,
          totalDeductions: true,
          netPay: true,
          employerCost: true,
        },
      }),
    ]);

    return {
      totalPayslips,
      byStatus: byStatus.map((item) => ({
        status: item.status,
        count: item._count._all,
      })),
      totals: {
        grossEarnings: totals._sum.grossEarnings?.toNumber() ?? 0,
        taxableSalary: totals._sum.taxableSalary?.toNumber() ?? 0,
        totalDeductions: totals._sum.totalDeductions?.toNumber() ?? 0,
        netPay: totals._sum.netPay?.toNumber() ?? 0,
        employerCost: totals._sum.employerCost?.toNumber() ?? 0,
      },
    };
  }

  async trialBalance() {
    const accounts = await this.prisma.account.findMany({
      include: { lines: { where: { journalEntry: { status: 'POSTED' } } } },
      orderBy: { code: 'asc' },
    });

    return accounts.map((account) => {
      const debit = this.round(
        account.lines.reduce((total, line) => total + line.debit.toNumber(), 0),
      );
      const credit = this.round(
        account.lines.reduce((total, line) => total + line.credit.toNumber(), 0),
      );
      return {
        accountId: account.id,
        accountCode: account.code,
        accountName: account.name,
        accountType: account.type,
        debit,
        credit,
        balance: this.round(debit - credit),
      };
    });
  }

  async generalLedger(accountId?: string) {
    const lines = await this.prisma.journalEntryLine.findMany({
      where: {
        ...(accountId ? { accountId } : {}),
        journalEntry: { status: 'POSTED' },
      },
      include: {
        account: { select: { code: true, name: true } },
        journalEntry: {
          select: { id: true, entryNumber: true, entryDate: true },
        },
      },
      orderBy: [{ journalEntry: { entryDate: 'asc' } }, { createdAt: 'asc' }],
    });

    return lines.map((line) => ({
      journalEntryId: line.journalEntry.id,
      entryNumber: line.journalEntry.entryNumber,
      entryDate: line.journalEntry.entryDate,
      accountId: line.accountId,
      accountCode: line.account.code,
      accountName: line.account.name,
      debit: line.debit.toNumber(),
      credit: line.credit.toNumber(),
      description: line.description,
    }));
  }

  async costCenterReport() {
    const lines = await this.prisma.journalEntryLine.findMany({
      where: { journalEntry: { status: 'POSTED' } },
      include: { costCenter: { select: { id: true, code: true, name: true } } },
    });
    const groups = new Map<
      string,
      { id: string; code: string; name: string; debit: number; credit: number; lines: number }
    >();

    for (const line of lines) {
      const id = line.costCenter?.id ?? 'unassigned';
      const group =
        groups.get(id) ??
        {
          id,
          code: line.costCenter?.code ?? 'UNASSIGNED',
          name: line.costCenter?.name ?? 'Unassigned',
          debit: 0,
          credit: 0,
          lines: 0,
        };
      group.debit += line.debit.toNumber();
      group.credit += line.credit.toNumber();
      group.lines += 1;
      groups.set(id, group);
    }

    return [...groups.values()].map((group) => ({
      ...group,
      debit: this.round(group.debit),
      credit: this.round(group.credit),
      balance: this.round(group.debit - group.credit),
    }));
  }

  private round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
