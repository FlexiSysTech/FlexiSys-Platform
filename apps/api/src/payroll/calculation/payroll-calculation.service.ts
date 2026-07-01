import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PayrollItemType,
  Prisma,
  SalaryComponent,
  SalaryComponentCategory,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/prisma.service';
import { PayrollCalculationEntity, PayrollEmployeeCalculationEntity } from './entities/payroll-calculation.entity';

type PayrollRunWithPeriod = {
  id: string;
  companyId: string;
  periodId: string | null;
  year: number;
  month: number;
  status: string;
  period: { startDate: Date; endDate: Date } | null;
};

type EmployeePayrollInput = {
  employeeId: string;
  basicSalary: number;
  housingAllowance: number;
  transportAllowance: number;
  otherAllowance: number;
};

type PayrollCalculationItem = {
  employeeId: string;
  salaryComponentId?: string;
  type: PayrollItemType;
  category: SalaryComponentCategory;
  name: string;
  amount: number;
  taxableAmount: number;
  employerCost: number;
  formula?: string;
  source: string;
  sourceRef?: string;
  isSystemGenerated: boolean;
};

@Injectable()
export class PayrollCalculationService {
  constructor(private readonly prisma: PrismaService) {}

  async preview(
    payrollRunId: string,
    employeeId?: string,
  ): Promise<PayrollCalculationEntity> {
    const run = await this.getRun(payrollRunId);
    const employees = await this.getEmployeeInputs(run, employeeId);
    const components = await this.getActiveComponents(run.companyId);
    const employeeCalculations = employees.map((employee) =>
      this.calculateEmployee(employee, components),
    );

    return this.toRunCalculation(payrollRunId, employeeCalculations);
  }

  async calculateRun(payrollRunId: string): Promise<PayrollCalculationEntity> {
    const run = await this.getRun(payrollRunId);

    if (['APPROVED', 'LOCKED', 'PAID'].includes(run.status)) {
      throw new BadRequestException('Payroll run is locked for calculation');
    }

    const employees = await this.getEmployeeInputs(run);
    const components = await this.getActiveComponents(run.companyId);
    const employeeCalculations = employees.map((employee) =>
      this.calculateEmployee(employee, components),
    );
    const summary = this.toRunCalculation(payrollRunId, employeeCalculations);

    await this.prisma.$transaction(async (tx) => {
      await tx.payrollItem.deleteMany({
        where: { payrollRunId, isSystemGenerated: true },
      });

      for (const employee of employeeCalculations) {
        await tx.payrollItem.createMany({
          data: employee.items.map((item) => ({
            payrollRunId,
            employeeId: item.employeeId,
            salaryComponentId: item.salaryComponentId,
            type: item.type,
            category: item.category,
            name: item.name,
            amount: item.amount,
            taxableAmount: item.taxableAmount,
            employerCost: item.employerCost,
            formula: item.formula,
            source: item.source,
            sourceRef: item.sourceRef,
            isSystemGenerated: item.isSystemGenerated,
          })),
        });

        await tx.payslip.upsert({
          where: {
            payrollRunId_employeeId: {
              payrollRunId,
              employeeId: employee.employeeId,
            },
          },
          update: {
            grossEarnings: employee.grossSalary,
            taxableSalary: employee.taxableSalary,
            totalDeductions: employee.totalDeductions,
            netPay: employee.netSalary,
            employerCost: employee.employerCost,
            status: 'DRAFT',
          },
          create: {
            payrollRunId,
            employeeId: employee.employeeId,
            grossEarnings: employee.grossSalary,
            taxableSalary: employee.taxableSalary,
            totalDeductions: employee.totalDeductions,
            netPay: employee.netSalary,
            employerCost: employee.employerCost,
          },
        });
      }

      await tx.payrollRun.update({
        where: { id: payrollRunId },
        data: {
          status: 'PROCESSING',
          startedAt: new Date(),
          grossSalary: summary.grossSalary,
          taxableSalary: summary.taxableSalary,
          totalDeductions: summary.totalDeductions,
          netSalary: summary.netSalary,
          employerCost: summary.employerCost,
        },
      });
    });

    return summary;
  }

  private calculateEmployee(
    employee: EmployeePayrollInput,
    components: SalaryComponent[],
  ) {
    const items: PayrollCalculationItem[] = [
      this.profileItem(employee, 'BASIC_SALARY', 'Basic Salary', employee.basicSalary, true),
      this.profileItem(employee, 'ALLOWANCE', 'Housing Allowance', employee.housingAllowance, false),
      this.profileItem(employee, 'ALLOWANCE', 'Transport Allowance', employee.transportAllowance, false),
      this.profileItem(employee, 'ALLOWANCE', 'Other Allowance', employee.otherAllowance, false),
    ].filter((item) => item.amount > 0);

    let grossSalary = this.sumItems(
      items.filter((item) => item.type === 'EARNING'),
    );
    let totalDeductions = this.sumItems(
      items.filter((item) => item.type === 'DEDUCTION'),
    );
    let taxableSalary = this.sumNumbers(
      items.map((item) => item.taxableAmount),
    );
    let employerCost = this.sumNumbers(items.map((item) => item.employerCost));

    for (const component of components) {
      const context = {
        basicSalary: employee.basicSalary,
        grossSalary,
        taxableSalary,
        totalDeductions,
        employerCost,
      };
      const amount = this.calculateComponentAmount(component, context);

      if (amount <= 0) {
        continue;
      }

      const type = component.type;
      const item: PayrollCalculationItem = {
        employeeId: employee.employeeId,
        salaryComponentId: component.id,
        type,
        category: component.category,
        name: component.name,
        amount,
        taxableAmount:
          component.isTaxable && component.affectsTaxable ? amount : 0,
        employerCost: component.employerCost ? amount : 0,
        formula: component.formula ?? undefined,
        source: 'salary-component',
        sourceRef: component.id,
        isSystemGenerated: true,
      };

      items.push(item);

      if (type === 'EARNING' && component.affectsGross) {
        grossSalary += amount;
      }

      if (type === 'DEDUCTION' && component.affectsNet) {
        totalDeductions += amount;
      }

      taxableSalary += item.taxableAmount;
      employerCost += item.employerCost;
    }

    const netSalary = grossSalary - totalDeductions;

    return {
      employeeId: employee.employeeId,
      grossSalary: this.round(grossSalary),
      taxableSalary: this.round(taxableSalary),
      totalDeductions: this.round(totalDeductions),
      netSalary: this.round(netSalary),
      employerCost: this.round(grossSalary + employerCost),
      items,
    };
  }

  private profileItem(
    employee: EmployeePayrollInput,
    category: SalaryComponentCategory,
    name: string,
    amount: number,
    isTaxable: boolean,
  ): PayrollCalculationItem {
    return {
      employeeId: employee.employeeId,
      type: 'EARNING',
      category,
      name,
      amount: this.round(amount),
      taxableAmount: isTaxable ? this.round(amount) : 0,
      employerCost: 0,
      source: 'payroll-profile',
      isSystemGenerated: true,
    };
  }

  private calculateComponentAmount(
    component: SalaryComponent,
    context: Record<string, number>,
  ): number {
    if (component.calculationType === 'FIXED') {
      return this.decimalToNumber(component.defaultAmount);
    }

    if (component.calculationType === 'PERCENTAGE') {
      return this.round(
        context.basicSalary *
          (this.decimalToNumber(component.defaultPercent) / 100),
      );
    }

    if (!component.formula) {
      return 0;
    }

    return this.evaluateFormula(component.formula, context);
  }

  private evaluateFormula(
    formula: string,
    context: Record<string, number>,
  ): number {
    const expression = formula.replace(/[A-Za-z_][A-Za-z0-9_]*/g, (name) => {
      if (!(name in context)) {
        throw new BadRequestException(`Unsupported formula variable: ${name}`);
      }

      return String(context[name]);
    });

    if (!/^[\d+\-*/().\s]+$/.test(expression)) {
      throw new BadRequestException('Formula contains unsupported characters');
    }

    try {
      const result = Function(`"use strict"; return (${expression});`)();
      return Number.isFinite(result) ? this.round(Number(result)) : 0;
    } catch {
      throw new BadRequestException('Invalid salary component formula');
    }
  }

  private toRunCalculation(
    payrollRunId: string,
    employees: Array<ReturnType<PayrollCalculationService['calculateEmployee']>>,
  ): PayrollCalculationEntity {
    return new PayrollCalculationEntity({
      payrollRunId,
      grossSalary: this.round(
        this.sumNumbers(employees.map((item) => item.grossSalary)),
      ),
      taxableSalary: this.round(
        this.sumNumbers(employees.map((item) => item.taxableSalary)),
      ),
      totalDeductions: this.round(
        this.sumNumbers(employees.map((item) => item.totalDeductions)),
      ),
      netSalary: this.round(
        this.sumNumbers(employees.map((item) => item.netSalary)),
      ),
      employerCost: this.round(
        this.sumNumbers(employees.map((item) => item.employerCost)),
      ),
      employees: employees.map(
        (item) =>
          new PayrollEmployeeCalculationEntity({
            employeeId: item.employeeId,
            grossSalary: item.grossSalary,
            taxableSalary: item.taxableSalary,
            totalDeductions: item.totalDeductions,
            netSalary: item.netSalary,
            employerCost: item.employerCost,
            itemCount: item.items.length,
          }),
      ),
    });
  }

  private async getRun(id: string): Promise<PayrollRunWithPeriod> {
    const run = await this.prisma.payrollRun.findUnique({
      where: { id },
      include: { period: { select: { startDate: true, endDate: true } } },
    });

    if (!run) {
      throw new NotFoundException('Payroll run not found');
    }

    return run;
  }

  private async getEmployeeInputs(
    run: PayrollRunWithPeriod,
    employeeId?: string,
  ): Promise<EmployeePayrollInput[]> {
    const periodStart = run.period?.startDate ?? new Date(run.year, run.month - 1, 1);
    const periodEnd = run.period?.endDate ?? new Date(run.year, run.month, 0);
    const employees = await this.prisma.employee.findMany({
      where: {
        companyId: run.companyId,
        status: 'ACTIVE',
        ...(employeeId ? { id: employeeId } : {}),
      },
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
      orderBy: { employeeNumber: 'asc' },
    });

    return employees
      .filter((employee) => employee.payrollProfiles.length > 0)
      .map((employee) => {
        const profile = employee.payrollProfiles[0];

        return {
          employeeId: employee.id,
          basicSalary: this.decimalToNumber(profile.basicSalary),
          housingAllowance: this.decimalToNumber(profile.housingAllowance),
          transportAllowance: this.decimalToNumber(profile.transportAllowance),
          otherAllowance: this.decimalToNumber(profile.otherAllowance),
        };
      });
  }

  private getActiveComponents(companyId: string) {
    return this.prisma.salaryComponent.findMany({
      where: { companyId, isActive: true },
      orderBy: [{ displayOrder: 'asc' }, { code: 'asc' }],
    });
  }

  private decimalToNumber(value: Decimal | null): number {
    return value ? value.toNumber() : 0;
  }

  private sumNumbers(values: number[]): number {
    return values.reduce((total, value) => total + value, 0);
  }

  private sumItems(items: PayrollCalculationItem[]): number {
    return items.reduce((total, item) => total + item.amount, 0);
  }

  private round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
