import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PayrollItem, PayrollItemType, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/prisma.service';
import { PayrollAttendanceImpactEntity } from './entities/payroll-attendance-impact.entity';

type EmployeeRate = {
  employeeId: string;
  dailyRate: number;
  hourlyRate: number;
};

@Injectable()
export class PayrollAttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async applyAttendanceImpacts(
    payrollRunId: string,
  ): Promise<PayrollAttendanceImpactEntity> {
    const run = await this.prisma.payrollRun.findUnique({
      where: { id: payrollRunId },
      include: { period: true },
    });

    if (!run) {
      throw new NotFoundException('Payroll run not found');
    }

    if (['APPROVED', 'LOCKED', 'PAID'].includes(run.status)) {
      throw new BadRequestException('Payroll run is locked');
    }

    const periodStart =
      run.period?.startDate ?? new Date(run.year, run.month - 1, 1);
    const periodEnd = run.period?.endDate ?? new Date(run.year, run.month, 0);
    const rates = await this.getEmployeeRates(
      run.companyId,
      periodStart,
      periodEnd,
    );

    let overtimeItems = 0;
    let absenceItems = 0;
    let lateItems = 0;
    let approvedLeaveDays = 0;

    await this.prisma.$transaction(async (tx) => {
      await tx.payrollItem.deleteMany({
        where: {
          payrollRunId,
          source: { in: ['attendance', 'leave'] },
        },
      });

      for (const rate of rates) {
        const records = await tx.attendanceRecord.findMany({
          where: {
            employeeId: rate.employeeId,
            attendanceDate: { gte: periodStart, lte: periodEnd },
          },
        });
        const leaveDays = await tx.leaveRequest.findMany({
          where: {
            employeeId: rate.employeeId,
            status: 'APPROVED',
            startDate: { lte: periodEnd },
            endDate: { gte: periodStart },
          },
          select: { totalDays: true },
        });
        approvedLeaveDays += leaveDays.reduce(
          (total, leave) => total + leave.totalDays.toNumber(),
          0,
        );

        const overtimeMinutes = records.reduce(
          (total, record) => total + record.overtimeMinutes,
          0,
        );
        const lateMinutes = records.reduce(
          (total, record) => total + record.lateMinutes,
          0,
        );
        const absenceDays = records.reduce((total, record) => {
          if (record.status === 'ABSENT') return total + 1;
          if (record.status === 'HALF_DAY') return total + 0.5;
          return total;
        }, 0);

        if (overtimeMinutes > 0) {
          overtimeItems += 1;
          await tx.payrollItem.create({
            data: this.impactItem({
              payrollRunId,
              employeeId: rate.employeeId,
              type: 'EARNING',
              category: 'OVERTIME',
              name: 'Overtime',
              quantity: overtimeMinutes / 60,
              rate: rate.hourlyRate * 1.5,
              source: 'attendance',
            }),
          });
        }

        if (lateMinutes > 0) {
          lateItems += 1;
          await tx.payrollItem.create({
            data: this.impactItem({
              payrollRunId,
              employeeId: rate.employeeId,
              type: 'DEDUCTION',
              category: 'DEDUCTION',
              name: 'Late Arrival Deduction',
              quantity: lateMinutes / 60,
              rate: rate.hourlyRate,
              source: 'attendance',
            }),
          });
        }

        if (absenceDays > 0) {
          absenceItems += 1;
          await tx.payrollItem.create({
            data: this.impactItem({
              payrollRunId,
              employeeId: rate.employeeId,
              type: 'DEDUCTION',
              category: 'DEDUCTION',
              name: 'Absence Deduction',
              quantity: absenceDays,
              rate: rate.dailyRate,
              source: 'attendance',
            }),
          });
        }
      }

      await this.refreshTotals(payrollRunId, tx);
    });

    return new PayrollAttendanceImpactEntity({
      payrollRunId,
      employeesProcessed: rates.length,
      overtimeItems,
      absenceItems,
      lateItems,
      approvedLeaveDays: this.round(approvedLeaveDays),
    });
  }

  private impactItem(input: {
    payrollRunId: string;
    employeeId: string;
    type: PayrollItemType;
    category: 'OVERTIME' | 'DEDUCTION';
    name: string;
    quantity: number;
    rate: number;
    source: string;
  }) {
    const amount = this.round(input.quantity * input.rate);

    return {
      payrollRunId: input.payrollRunId,
      employeeId: input.employeeId,
      type: input.type,
      category: input.category,
      name: input.name,
      quantity: this.round(input.quantity),
      rate: this.round(input.rate),
      amount,
      taxableAmount: input.type === 'EARNING' ? amount : 0,
      employerCost: 0,
      source: input.source,
      isSystemGenerated: true,
    };
  }

  private async getEmployeeRates(
    companyId: string,
    periodStart: Date,
    periodEnd: Date,
  ): Promise<EmployeeRate[]> {
    const employees = await this.prisma.employee.findMany({
      where: { companyId, status: 'ACTIVE' },
      include: {
        payrollProfiles: {
          where: {
            effectiveFrom: { lte: periodEnd },
            OR: [{ effectiveTo: null }, { effectiveTo: { gte: periodStart } }],
          },
          orderBy: { effectiveFrom: 'desc' },
          take: 1,
        },
      },
    });

    return employees
      .filter((employee) => employee.payrollProfiles.length > 0)
      .map((employee) => {
        const profile = employee.payrollProfiles[0];
        const monthlySalary =
          this.decimalToNumber(profile.basicSalary) +
          this.decimalToNumber(profile.housingAllowance) +
          this.decimalToNumber(profile.transportAllowance) +
          this.decimalToNumber(profile.otherAllowance);
        const dailyRate = monthlySalary / 30;

        return {
          employeeId: employee.id,
          dailyRate: this.round(dailyRate),
          hourlyRate: this.round(dailyRate / 8),
        };
      });
  }

  private async refreshTotals(
    payrollRunId: string,
    tx: Prisma.TransactionClient,
  ): Promise<void> {
    const items = await tx.payrollItem.findMany({ where: { payrollRunId } });
    const employeeIds = [...new Set(items.map((item) => item.employeeId))];
    let grossSalary = 0;
    let taxableSalary = 0;
    let totalDeductions = 0;
    let netSalary = 0;
    let employerCost = 0;

    for (const employeeId of employeeIds) {
      const employeeItems = items.filter((item) => item.employeeId === employeeId);
      const employeeSummary = this.summarizeItems(employeeItems);

      grossSalary += employeeSummary.grossSalary;
      taxableSalary += employeeSummary.taxableSalary;
      totalDeductions += employeeSummary.totalDeductions;
      netSalary += employeeSummary.netSalary;
      employerCost += employeeSummary.employerCost;

      await tx.payslip.upsert({
        where: { payrollRunId_employeeId: { payrollRunId, employeeId } },
        update: {
          grossEarnings: employeeSummary.grossSalary,
          taxableSalary: employeeSummary.taxableSalary,
          totalDeductions: employeeSummary.totalDeductions,
          netPay: employeeSummary.netSalary,
          employerCost: employeeSummary.employerCost,
        },
        create: {
          payrollRunId,
          employeeId,
          grossEarnings: employeeSummary.grossSalary,
          taxableSalary: employeeSummary.taxableSalary,
          totalDeductions: employeeSummary.totalDeductions,
          netPay: employeeSummary.netSalary,
          employerCost: employeeSummary.employerCost,
        },
      });
    }

    await tx.payrollRun.update({
      where: { id: payrollRunId },
      data: {
        grossSalary: this.round(grossSalary),
        taxableSalary: this.round(taxableSalary),
        totalDeductions: this.round(totalDeductions),
        netSalary: this.round(netSalary),
        employerCost: this.round(employerCost),
      },
    });
  }

  private summarizeItems(items: PayrollItem[]) {
    const grossSalary = this.round(
      items
        .filter((item) => item.type === 'EARNING')
        .reduce((total, item) => total + this.decimalToNumber(item.amount), 0),
    );
    const taxableSalary = this.round(
      items.reduce(
        (total, item) => total + this.decimalToNumber(item.taxableAmount),
        0,
      ),
    );
    const totalDeductions = this.round(
      items
        .filter((item) => item.type === 'DEDUCTION')
        .reduce((total, item) => total + this.decimalToNumber(item.amount), 0),
    );
    const additionalEmployerCost = this.round(
      items.reduce(
        (total, item) => total + this.decimalToNumber(item.employerCost),
        0,
      ),
    );

    return {
      grossSalary,
      taxableSalary,
      totalDeductions,
      netSalary: this.round(grossSalary - totalDeductions),
      employerCost: this.round(grossSalary + additionalEmployerCost),
    };
  }

  private decimalToNumber(value: Decimal | null): number {
    return value ? value.toNumber() : 0;
  }

  private round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
