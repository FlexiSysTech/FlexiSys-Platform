import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountType, Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { GeneratePayrollJournalDto } from './dto/generate-payroll-journal.dto';
import { PayrollJournalResultEntity } from './entities/payroll-journal-result.entity';

type JournalLineInput = {
  accountId: string;
  debit: number;
  credit: number;
  description: string;
  employeeId?: string;
  departmentId?: string | null;
  branchId?: string | null;
  costCenterId?: string | null;
};

@Injectable()
export class PayrollAccountingService {
  constructor(private readonly prisma: PrismaService) {}

  async generatePayrollJournal(
    dto: GeneratePayrollJournalDto,
  ): Promise<PayrollJournalResultEntity> {
    const run = await this.prisma.payrollRun.findUnique({
      where: { id: dto.payrollRunId },
      include: {
        payslips: {
          include: {
            employee: {
              select: {
                id: true,
                departmentId: true,
                branchId: true,
                costCenterId: true,
              },
            },
          },
        },
      },
    });

    if (!run) {
      throw new NotFoundException('Payroll run not found');
    }

    if (!['APPROVED', 'LOCKED', 'PAID'].includes(run.status)) {
      throw new BadRequestException(
        'Only approved, locked, or paid payroll runs can be posted',
      );
    }

    if (!run.payslips.length) {
      throw new BadRequestException('Payroll run has no payslips to post');
    }

    if (dto.createdById) {
      await this.ensureUserExists(dto.createdById);
    }

    await this.ensureAccounts(run.companyId, [
      { id: dto.salaryExpenseAccountId, type: 'EXPENSE' },
      { id: dto.employerCostExpenseAccountId, type: 'EXPENSE' },
      { id: dto.employerCostPayableAccountId, type: 'LIABILITY' },
      { id: dto.deductionsPayableAccountId, type: 'LIABILITY' },
      { id: dto.employeeNetPayableAccountId, type: 'LIABILITY' },
    ]);

    const existing = await this.prisma.journalEntry.findFirst({
      where: { source: 'PAYROLL', sourceRef: run.id, status: { not: 'VOID' } },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException('Payroll run is already posted to accounting');
    }

    const lines = run.payslips.flatMap((payslip): JournalLineInput[] => {
      const gross = payslip.grossEarnings.toNumber();
      const deductions = payslip.totalDeductions.toNumber();
      const netPay = payslip.netPay.toNumber();
      const additionalEmployerCost = Math.max(
        payslip.employerCost.toNumber() - gross,
        0,
      );
      const dimension = {
        employeeId: payslip.employeeId,
        departmentId: payslip.employee.departmentId,
        branchId: payslip.employee.branchId,
        costCenterId: payslip.employee.costCenterId,
      };

      return [
        this.line(dto.salaryExpenseAccountId, gross, 0, 'Salary expense', dimension),
        this.line(
          dto.employerCostExpenseAccountId,
          additionalEmployerCost,
          0,
          'Employer payroll cost',
          dimension,
        ),
        this.line(
          dto.deductionsPayableAccountId,
          0,
          deductions,
          'Payroll deductions payable',
          dimension,
        ),
        this.line(
          dto.employeeNetPayableAccountId,
          0,
          netPay,
          'Employee net salary payable',
          dimension,
        ),
        this.line(
          dto.employerCostPayableAccountId,
          0,
          additionalEmployerCost,
          'Employer payroll cost payable',
          dimension,
        ),
      ].filter((line) => line.debit > 0 || line.credit > 0);
    });

    const totals = this.calculateTotals(lines);

    if (totals.debit !== totals.credit) {
      throw new BadRequestException('Generated payroll journal is not balanced');
    }

    const entryNumber = `PAY-${run.year}-${String(run.month).padStart(2, '0')}-${run.id.slice(-6).toUpperCase()}`;

    const journal = await this.prisma.$transaction(async (tx) => {
      const item = await tx.journalEntry.create({
        data: {
          companyId: run.companyId,
          entryNumber,
          entryDate: run.paidAt ?? run.approvedAt ?? new Date(),
          description: `Payroll accounting for ${run.year}-${String(run.month).padStart(2, '0')}`,
          status: 'POSTED',
          source: 'PAYROLL',
          sourceRef: run.id,
          totalDebit: totals.debit,
          totalCredit: totals.credit,
          postedAt: new Date(),
          createdById: dto.createdById,
          lines: {
            create: lines.map((line) => ({
              accountId: line.accountId,
              debit: line.debit,
              credit: line.credit,
              description: line.description,
              employeeId: line.employeeId,
              departmentId: line.departmentId,
              branchId: line.branchId,
              costCenterId: line.costCenterId,
            })),
          },
        },
        include: { lines: true },
      });

      await tx.auditLog.create({
        data: {
          action: 'PAYROLL_ACCOUNTING_POST',
          entity: 'PayrollRun',
          entityId: run.id,
          createdById: dto.createdById,
          payload: {
            journalEntryId: item.id,
            entryNumber,
            totalDebit: totals.debit,
            totalCredit: totals.credit,
          } as Prisma.InputJsonValue,
        },
      });

      return item;
    });

    return new PayrollJournalResultEntity({
      journalEntryId: journal.id,
      payrollRunId: run.id,
      entryNumber: journal.entryNumber,
      totalDebit: journal.totalDebit.toNumber(),
      totalCredit: journal.totalCredit.toNumber(),
      lineCount: journal.lines.length,
    });
  }

  private line(
    accountId: string,
    debit: number,
    credit: number,
    description: string,
    dimension: Omit<JournalLineInput, 'accountId' | 'debit' | 'credit' | 'description'>,
  ): JournalLineInput {
    return {
      accountId,
      debit: this.round(debit),
      credit: this.round(credit),
      description,
      ...dimension,
    };
  }

  private calculateTotals(lines: JournalLineInput[]) {
    return lines.reduce(
      (totals, line) => ({
        debit: this.round(totals.debit + line.debit),
        credit: this.round(totals.credit + line.credit),
      }),
      { debit: 0, credit: 0 },
    );
  }

  private async ensureAccounts(
    companyId: string,
    accounts: Array<{ id: string; type: AccountType }>,
  ): Promise<void> {
    for (const expected of accounts) {
      const account = await this.prisma.account.findUnique({
        where: { id: expected.id },
        select: { id: true, companyId: true, type: true, status: true },
      });

      if (!account) {
        throw new NotFoundException('Accounting account not found');
      }

      if (account.companyId !== companyId) {
        throw new BadRequestException('Accounting account belongs to another company');
      }

      if (account.status !== 'ACTIVE') {
        throw new BadRequestException('Inactive accounting accounts cannot be used');
      }

      if (account.type !== expected.type) {
        throw new BadRequestException(
          `Account ${account.id} must be ${expected.type}`,
        );
      }
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

  private round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
