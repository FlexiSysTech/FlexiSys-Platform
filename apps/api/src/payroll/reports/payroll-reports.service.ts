import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { PayrollDashboardEntity } from './entities/payroll-dashboard.entity';

@Injectable()
export class PayrollReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async dashboard(): Promise<PayrollDashboardEntity> {
    const [
      totalRuns,
      processingRuns,
      approvedRuns,
      lockedRuns,
      paidRuns,
      totals,
    ] = await Promise.all([
      this.prisma.payrollRun.count(),
      this.prisma.payrollRun.count({ where: { status: 'PROCESSING' } }),
      this.prisma.payrollRun.count({ where: { status: 'APPROVED' } }),
      this.prisma.payrollRun.count({ where: { status: 'LOCKED' } }),
      this.prisma.payrollRun.count({ where: { status: 'PAID' } }),
      this.prisma.payrollRun.aggregate({
        _sum: {
          grossSalary: true,
          totalDeductions: true,
          netSalary: true,
          employerCost: true,
        },
      }),
    ]);

    return new PayrollDashboardEntity({
      totalRuns,
      processingRuns,
      approvedRuns,
      lockedRuns,
      paidRuns,
      totalGrossSalary: totals._sum.grossSalary?.toNumber() ?? 0,
      totalDeductions: totals._sum.totalDeductions?.toNumber() ?? 0,
      totalNetSalary: totals._sum.netSalary?.toNumber() ?? 0,
      totalEmployerCost: totals._sum.employerCost?.toNumber() ?? 0,
    });
  }

  async salaryReport(payrollRunId?: string) {
    const payslips = await this.prisma.payslip.findMany({
      where: payrollRunId ? { payrollRunId } : undefined,
      include: { employee: true, payrollRun: true },
      orderBy: { createdAt: 'desc' },
    });

    return payslips.map((payslip) => ({
      payrollRunId: payslip.payrollRunId,
      year: payslip.payrollRun.year,
      month: payslip.payrollRun.month,
      employeeId: payslip.employeeId,
      employeeNumber: payslip.employee.employeeNumber,
      employeeName: payslip.employee.fullName,
      grossEarnings: payslip.grossEarnings.toNumber(),
      taxableSalary: payslip.taxableSalary.toNumber(),
      totalDeductions: payslip.totalDeductions.toNumber(),
      netPay: payslip.netPay.toNumber(),
      employerCost: payslip.employerCost.toNumber(),
    }));
  }

  async departmentReport(payrollRunId?: string) {
    const payslips = await this.prisma.payslip.findMany({
      where: payrollRunId ? { payrollRunId } : undefined,
      include: { employee: { include: { department: true } } },
    });

    return this.groupPayslips(payslips, (payslip) => ({
      id: payslip.employee.departmentId ?? 'unassigned',
      name: payslip.employee.department?.name ?? 'Unassigned',
    }));
  }

  async costCenterReport(payrollRunId?: string) {
    const payslips = await this.prisma.payslip.findMany({
      where: payrollRunId ? { payrollRunId } : undefined,
      include: { employee: { include: { costCenter: true } } },
    });

    return this.groupPayslips(payslips, (payslip) => ({
      id: payslip.employee.costCenterId ?? 'unassigned',
      name: payslip.employee.costCenter?.name ?? 'Unassigned',
    }));
  }

  async monthlySummary(year?: number) {
    const runs = await this.prisma.payrollRun.findMany({
      where: year ? { year } : undefined,
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });

    return runs.map((run) => ({
      payrollRunId: run.id,
      year: run.year,
      month: run.month,
      status: run.status,
      grossSalary: run.grossSalary.toNumber(),
      taxableSalary: run.taxableSalary.toNumber(),
      totalDeductions: run.totalDeductions.toNumber(),
      netSalary: run.netSalary.toNumber(),
      employerCost: run.employerCost.toNumber(),
    }));
  }

  private groupPayslips<T extends {
    grossEarnings: { toNumber(): number };
    taxableSalary: { toNumber(): number };
    totalDeductions: { toNumber(): number };
    netPay: { toNumber(): number };
    employerCost: { toNumber(): number };
  }>(
    payslips: T[],
    keySelector: (payslip: T) => { id: string; name: string },
  ) {
    const groups = new Map<
      string,
      {
        id: string;
        name: string;
        employees: number;
        grossEarnings: number;
        taxableSalary: number;
        totalDeductions: number;
        netPay: number;
        employerCost: number;
      }
    >();

    for (const payslip of payslips) {
      const key = keySelector(payslip);
      const group =
        groups.get(key.id) ??
        {
          id: key.id,
          name: key.name,
          employees: 0,
          grossEarnings: 0,
          taxableSalary: 0,
          totalDeductions: 0,
          netPay: 0,
          employerCost: 0,
        };

      group.employees += 1;
      group.grossEarnings += payslip.grossEarnings.toNumber();
      group.taxableSalary += payslip.taxableSalary.toNumber();
      group.totalDeductions += payslip.totalDeductions.toNumber();
      group.netPay += payslip.netPay.toNumber();
      group.employerCost += payslip.employerCost.toNumber();
      groups.set(key.id, group);
    }

    return [...groups.values()].map((group) => ({
      ...group,
      grossEarnings: this.round(group.grossEarnings),
      taxableSalary: this.round(group.taxableSalary),
      totalDeductions: this.round(group.totalDeductions),
      netPay: this.round(group.netPay),
      employerCost: this.round(group.employerCost),
    }));
  }

  private round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
