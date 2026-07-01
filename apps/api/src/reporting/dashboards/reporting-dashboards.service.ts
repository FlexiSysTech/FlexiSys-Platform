import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportingDashboardsService {
  constructor(private readonly prisma: PrismaService) {}

  async executiveDashboard() {
    const [employees, payroll, accounting, openVacancies, pendingWorkflows] =
      await Promise.all([
        this.prisma.employee.count({ where: { status: 'ACTIVE' } }),
        this.prisma.payrollRun.aggregate({
          _sum: { netSalary: true, employerCost: true },
        }),
        this.prisma.journalEntry.aggregate({
          where: { status: 'POSTED' },
          _sum: { totalDebit: true, totalCredit: true },
        }),
        this.prisma.vacancy.count({ where: { status: 'OPEN' } }),
        this.prisma.workflowRequest.count({ where: { status: 'PENDING' } }),
      ]);

    return {
      activeEmployees: employees,
      openVacancies,
      pendingWorkflows,
      payrollNetSalary: payroll._sum.netSalary?.toNumber() ?? 0,
      payrollEmployerCost: payroll._sum.employerCost?.toNumber() ?? 0,
      accountingDebit: accounting._sum.totalDebit?.toNumber() ?? 0,
      accountingCredit: accounting._sum.totalCredit?.toNumber() ?? 0,
    };
  }

  async hrDashboard() {
    const [employees, attendanceByStatus, leaveByStatus, applicantsByStatus] =
      await Promise.all([
        this.prisma.employee.groupBy({
          by: ['status'],
          _count: { _all: true },
        }),
        this.prisma.attendanceRecord.groupBy({
          by: ['status'],
          _count: { _all: true },
        }),
        this.prisma.leaveRequest.groupBy({
          by: ['status'],
          _count: { _all: true },
        }),
        this.prisma.applicant.groupBy({
          by: ['status'],
          _count: { _all: true },
        }),
      ]);

    return {
      employees: this.toStatusCounts(employees),
      attendance: this.toStatusCounts(attendanceByStatus),
      leave: this.toStatusCounts(leaveByStatus),
      applicants: this.toStatusCounts(applicantsByStatus),
    };
  }

  async payrollDashboard() {
    const [runsByStatus, payslipsByStatus, totals] = await Promise.all([
      this.prisma.payrollRun.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      this.prisma.payslip.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      this.prisma.payrollRun.aggregate({
        _sum: {
          grossSalary: true,
          totalDeductions: true,
          netSalary: true,
          employerCost: true,
        },
      }),
    ]);

    return {
      runs: this.toStatusCounts(runsByStatus),
      payslips: this.toStatusCounts(payslipsByStatus),
      totals: {
        grossSalary: totals._sum.grossSalary?.toNumber() ?? 0,
        totalDeductions: totals._sum.totalDeductions?.toNumber() ?? 0,
        netSalary: totals._sum.netSalary?.toNumber() ?? 0,
        employerCost: totals._sum.employerCost?.toNumber() ?? 0,
      },
    };
  }

  async accountingDashboard() {
    const [accountsByType, journalsByStatus, totals] = await Promise.all([
      this.prisma.account.groupBy({
        by: ['type'],
        _count: { _all: true },
      }),
      this.prisma.journalEntry.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      this.prisma.journalEntry.aggregate({
        where: { status: 'POSTED' },
        _sum: { totalDebit: true, totalCredit: true },
      }),
    ]);

    return {
      accounts: accountsByType.map((item) => ({
        type: item.type,
        count: item._count._all,
      })),
      journals: this.toStatusCounts(journalsByStatus),
      totals: {
        debit: totals._sum.totalDebit?.toNumber() ?? 0,
        credit: totals._sum.totalCredit?.toNumber() ?? 0,
      },
    };
  }

  private toStatusCounts<T extends { _count: { _all: number } }>(
    items: Array<T & Record<string, unknown>>,
  ) {
    return items.map((item) => {
      const [key] = Object.keys(item).filter((name) => name !== '_count');

      return {
        status: item[key],
        count: item._count._all,
      };
    });
  }
}
