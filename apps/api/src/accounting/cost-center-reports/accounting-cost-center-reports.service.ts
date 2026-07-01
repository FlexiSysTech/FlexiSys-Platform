import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/prisma.service';
import { AccountingDimensionReportEntity } from './entities/accounting-dimension-report.entity';

type LineWithDimensions = {
  debit: Decimal;
  credit: Decimal;
  costCenterId: string | null;
  departmentId: string | null;
  branchId: string | null;
  costCenter: { name: string } | null;
  department: { name: string } | null;
  branch: { name: string } | null;
};

@Injectable()
export class AccountingCostCenterReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async byCostCenter(): Promise<AccountingDimensionReportEntity[]> {
    const lines = await this.getPostedLines();

    return this.group(lines, (line) => ({
      id: line.costCenterId ?? 'unassigned',
      name: line.costCenter?.name ?? 'Unassigned',
    }));
  }

  async byDepartment(): Promise<AccountingDimensionReportEntity[]> {
    const lines = await this.getPostedLines();

    return this.group(lines, (line) => ({
      id: line.departmentId ?? 'unassigned',
      name: line.department?.name ?? 'Unassigned',
    }));
  }

  async byBranch(): Promise<AccountingDimensionReportEntity[]> {
    const lines = await this.getPostedLines();

    return this.group(lines, (line) => ({
      id: line.branchId ?? 'unassigned',
      name: line.branch?.name ?? 'Unassigned',
    }));
  }

  private getPostedLines() {
    return this.prisma.journalEntryLine.findMany({
      where: { journalEntry: { status: 'POSTED' } },
      include: {
        costCenter: { select: { name: true } },
        department: { select: { name: true } },
        branch: { select: { name: true } },
      },
    });
  }

  private group(
    lines: LineWithDimensions[],
    keySelector: (line: LineWithDimensions) => { id: string; name: string },
  ): AccountingDimensionReportEntity[] {
    const groups = new Map<
      string,
      { id: string; name: string; debit: number; credit: number; lineCount: number }
    >();

    for (const line of lines) {
      const key = keySelector(line);
      const group =
        groups.get(key.id) ??
        {
          id: key.id,
          name: key.name,
          debit: 0,
          credit: 0,
          lineCount: 0,
        };

      group.debit += line.debit.toNumber();
      group.credit += line.credit.toNumber();
      group.lineCount += 1;
      groups.set(key.id, group);
    }

    return [...groups.values()].map(
      (group) =>
        new AccountingDimensionReportEntity({
          ...group,
          debit: this.round(group.debit),
          credit: this.round(group.credit),
          balance: this.round(group.debit - group.credit),
        }),
    );
  }

  private round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
