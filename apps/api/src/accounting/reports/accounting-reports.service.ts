import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import {
  GeneralLedgerLineEntity,
  TrialBalanceLineEntity,
} from './entities/accounting-report.entity';

@Injectable()
export class AccountingReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async trialBalance(): Promise<TrialBalanceLineEntity[]> {
    const accounts = await this.prisma.account.findMany({
      include: {
        lines: {
          where: { journalEntry: { status: 'POSTED' } },
        },
      },
      orderBy: { code: 'asc' },
    });

    return accounts.map((account) => {
      const debit = this.round(
        account.lines.reduce((total, line) => total + line.debit.toNumber(), 0),
      );
      const credit = this.round(
        account.lines.reduce((total, line) => total + line.credit.toNumber(), 0),
      );

      return new TrialBalanceLineEntity({
        accountId: account.id,
        accountCode: account.code,
        accountName: account.name,
        accountType: account.type,
        debit,
        credit,
        balance: this.round(debit - credit),
      });
    });
  }

  async generalLedger(accountId?: string): Promise<GeneralLedgerLineEntity[]> {
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

    return lines.map(
      (line) =>
        new GeneralLedgerLineEntity({
          journalEntryId: line.journalEntry.id,
          entryNumber: line.journalEntry.entryNumber,
          entryDate: line.journalEntry.entryDate,
          accountCode: line.account.code,
          accountName: line.account.name,
          debit: line.debit.toNumber(),
          credit: line.credit.toNumber(),
          description: line.description,
        }),
    );
  }

  async payrollAccountingReport() {
    const entries = await this.prisma.journalEntry.findMany({
      where: { source: 'PAYROLL' },
      include: { lines: { include: { account: true } } },
      orderBy: { entryDate: 'desc' },
    });

    return entries.map((entry) => ({
      journalEntryId: entry.id,
      entryNumber: entry.entryNumber,
      entryDate: entry.entryDate,
      sourceRef: entry.sourceRef,
      status: entry.status,
      totalDebit: entry.totalDebit.toNumber(),
      totalCredit: entry.totalCredit.toNumber(),
      lines: entry.lines.map((line) => ({
        accountCode: line.account.code,
        accountName: line.account.name,
        debit: line.debit.toNumber(),
        credit: line.credit.toNumber(),
        employeeId: line.employeeId,
        departmentId: line.departmentId,
        branchId: line.branchId,
        costCenterId: line.costCenterId,
      })),
    }));
  }

  async costCenterAccountingReport() {
    const lines = await this.prisma.journalEntryLine.findMany({
      where: { journalEntry: { status: 'POSTED' } },
      include: {
        costCenter: { select: { id: true, code: true, name: true } },
        account: { select: { code: true, name: true, type: true } },
      },
    });
    const groups = new Map<
      string,
      {
        costCenterId: string;
        costCenterCode: string;
        costCenterName: string;
        debit: number;
        credit: number;
      }
    >();

    for (const line of lines) {
      const id = line.costCenter?.id ?? 'unassigned';
      const group =
        groups.get(id) ??
        {
          costCenterId: id,
          costCenterCode: line.costCenter?.code ?? 'UNASSIGNED',
          costCenterName: line.costCenter?.name ?? 'Unassigned',
          debit: 0,
          credit: 0,
        };

      group.debit += line.debit.toNumber();
      group.credit += line.credit.toNumber();
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
