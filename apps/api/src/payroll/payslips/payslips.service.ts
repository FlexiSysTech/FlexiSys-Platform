import { Injectable, NotFoundException } from '@nestjs/common';
import { PayslipStatus, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/prisma.service';
import { UpdatePayslipDto } from './dto/update-payslip.dto';
import { PayslipEntity } from './entities/payslip.entity';

type PayslipRecord = {
  id: string;
  payrollRunId: string;
  employeeId: string;
  grossEarnings: Decimal;
  taxableSalary: Decimal;
  totalDeductions: Decimal;
  netPay: Decimal;
  employerCost: Decimal;
  currency: string;
  pdfPayload: Prisma.JsonValue | null;
  employeeVisible: boolean;
  status: PayslipStatus;
  issuedAt: Date | null;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PayslipsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: PayslipRecord): PayslipEntity {
    return new PayslipEntity({
      ...item,
      grossEarnings: item.grossEarnings.toNumber(),
      taxableSalary: item.taxableSalary.toNumber(),
      totalDeductions: item.totalDeductions.toNumber(),
      netPay: item.netPay.toNumber(),
      employerCost: item.employerCost.toNumber(),
    });
  }

  async findAll(): Promise<PayslipEntity[]> {
    const items = await this.prisma.payslip.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<PayslipEntity> {
    const item = await this.prisma.payslip.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Payslip not found');
    }

    return this.toEntity(item);
  }

  async findByEmployee(employeeId: string): Promise<PayslipEntity[]> {
    await this.ensureEmployeeExists(employeeId);

    const items = await this.prisma.payslip.findMany({
      where: { employeeId, employeeVisible: true },
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async update(id: string, dto: UpdatePayslipDto): Promise<PayslipEntity> {
    await this.findOne(id);

    const item = await this.prisma.payslip.update({
      where: { id },
      data: {
        status: dto.status,
        currency: dto.currency,
        employeeVisible: dto.employeeVisible,
        issuedAt: dto.status === 'ISSUED' ? new Date() : undefined,
        paidAt: dto.status === 'PAID' ? new Date() : undefined,
      },
    });

    return this.toEntity(item);
  }

  async issueForRun(payrollRunId: string): Promise<PayslipEntity[]> {
    await this.ensurePayrollRunExists(payrollRunId);

    const payslips = await this.prisma.payslip.findMany({
      where: { payrollRunId },
    });

    const issued: PayslipEntity[] = [];

    for (const payslip of payslips) {
      const pdfPayload = await this.buildPdfPayload(payslip.id);
      const item = await this.prisma.payslip.update({
        where: { id: payslip.id },
        data: {
          status: 'ISSUED',
          employeeVisible: true,
          issuedAt: new Date(),
          pdfPayload: pdfPayload as Prisma.InputJsonValue,
        },
      });
      issued.push(this.toEntity(item));
    }

    return issued;
  }

  async getPdfPayload(id: string) {
    const payslip = await this.findOne(id);

    if (payslip.pdfPayload) {
      return payslip.pdfPayload;
    }

    return this.buildPdfPayload(id);
  }

  private async buildPdfPayload(id: string) {
    const payslip = await this.prisma.payslip.findUnique({
      where: { id },
      include: {
        employee: {
          include: {
            company: true,
            department: true,
            position: true,
          },
        },
        payrollRun: { include: { period: true } },
      },
    });

    if (!payslip) {
      throw new NotFoundException('Payslip not found');
    }

    const items = await this.prisma.payrollItem.findMany({
      where: {
        payrollRunId: payslip.payrollRunId,
        employeeId: payslip.employeeId,
      },
      orderBy: [{ type: 'asc' }, { name: 'asc' }],
    });

    return {
      title: 'Payslip',
      company: {
        name: payslip.employee.company.name,
        code: payslip.employee.company.code,
      },
      employee: {
        employeeNumber: payslip.employee.employeeNumber,
        fullName: payslip.employee.fullName,
        department: payslip.employee.department?.name ?? null,
        position: payslip.employee.position?.title ?? null,
      },
      period: {
        year: payslip.payrollRun.year,
        month: payslip.payrollRun.month,
        startDate: payslip.payrollRun.period?.startDate ?? null,
        endDate: payslip.payrollRun.period?.endDate ?? null,
      },
      earnings: items
        .filter((item) => item.type === 'EARNING')
        .map((item) => ({
          name: item.name,
          category: item.category,
          amount: item.amount.toNumber(),
        })),
      deductions: items
        .filter((item) => item.type === 'DEDUCTION')
        .map((item) => ({
          name: item.name,
          category: item.category,
          amount: item.amount.toNumber(),
        })),
      totals: {
        grossEarnings: payslip.grossEarnings.toNumber(),
        taxableSalary: payslip.taxableSalary.toNumber(),
        totalDeductions: payslip.totalDeductions.toNumber(),
        netPay: payslip.netPay.toNumber(),
        employerCost: payslip.employerCost.toNumber(),
        currency: payslip.currency,
      },
      generatedAt: new Date().toISOString(),
    };
  }

  private async ensureEmployeeExists(id: string): Promise<void> {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
  }

  private async ensurePayrollRunExists(id: string): Promise<void> {
    const run = await this.prisma.payrollRun.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!run) {
      throw new NotFoundException('Payroll run not found');
    }
  }
}
