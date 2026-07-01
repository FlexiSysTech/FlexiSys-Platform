import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PayrollItemType,
  PayrollRunStatus,
  SalaryComponentCategory,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/prisma.service';
import { CreatePayrollItemDto } from './dto/create-payroll-item.dto';
import { UpdatePayrollItemDto } from './dto/update-payroll-item.dto';
import { PayrollItemEntity } from './entities/payroll-item.entity';

type PayrollItemRecord = {
  id: string;
  payrollRunId: string;
  employeeId: string;
  salaryComponentId: string | null;
  type: PayrollItemType;
  category: SalaryComponentCategory;
  name: string;
  quantity: Decimal | null;
  rate: Decimal | null;
  amount: Decimal;
  taxableAmount: Decimal;
  employerCost: Decimal;
  formula: string | null;
  source: string | null;
  sourceRef: string | null;
  isSystemGenerated: boolean;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PayrollItemsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: PayrollItemRecord): PayrollItemEntity {
    return new PayrollItemEntity({
      ...item,
      quantity: item.quantity ? item.quantity.toNumber() : null,
      rate: item.rate ? item.rate.toNumber() : null,
      amount: item.amount.toNumber(),
      taxableAmount: item.taxableAmount.toNumber(),
      employerCost: item.employerCost.toNumber(),
    });
  }

  async findAll(): Promise<PayrollItemEntity[]> {
    const items = await this.prisma.payrollItem.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findByRun(payrollRunId: string): Promise<PayrollItemEntity[]> {
    await this.ensurePayrollRunExists(payrollRunId);

    const items = await this.prisma.payrollItem.findMany({
      where: { payrollRunId },
      orderBy: [{ employeeId: 'asc' }, { createdAt: 'asc' }],
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<PayrollItemEntity> {
    const item = await this.prisma.payrollItem.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Payroll item not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreatePayrollItemDto): Promise<PayrollItemEntity> {
    await this.ensurePayrollRunIsEditable(dto.payrollRunId);
    await this.ensureEmployeeExists(dto.employeeId);

    if (dto.salaryComponentId) {
      await this.ensureSalaryComponentExists(dto.salaryComponentId);
    }

    const item = await this.prisma.payrollItem.create({
      data: {
        payrollRunId: dto.payrollRunId,
        employeeId: dto.employeeId,
        salaryComponentId: dto.salaryComponentId,
        type: dto.type,
        category: dto.category ?? 'OTHER',
        name: dto.name,
        quantity: dto.quantity,
        rate: dto.rate,
        amount: dto.amount,
        taxableAmount: dto.taxableAmount ?? 0,
        employerCost: dto.employerCost ?? 0,
        formula: dto.formula,
        source: dto.source,
        sourceRef: dto.sourceRef,
        isSystemGenerated: dto.isSystemGenerated ?? false,
        notes: dto.notes,
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdatePayrollItemDto,
  ): Promise<PayrollItemEntity> {
    const current = await this.findOne(id);
    await this.ensurePayrollRunIsEditable(dto.payrollRunId ?? current.payrollRunId);

    if (dto.employeeId) {
      await this.ensureEmployeeExists(dto.employeeId);
    }

    if (dto.salaryComponentId) {
      await this.ensureSalaryComponentExists(dto.salaryComponentId);
    }

    const item = await this.prisma.payrollItem.update({
      where: { id },
      data: {
        payrollRunId: dto.payrollRunId,
        employeeId: dto.employeeId,
        salaryComponentId: dto.salaryComponentId,
        type: dto.type,
        category: dto.category,
        name: dto.name,
        quantity: dto.quantity,
        rate: dto.rate,
        amount: dto.amount,
        taxableAmount: dto.taxableAmount,
        employerCost: dto.employerCost,
        formula: dto.formula,
        source: dto.source,
        sourceRef: dto.sourceRef,
        isSystemGenerated: dto.isSystemGenerated,
        notes: dto.notes,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.ensurePayrollRunIsEditable(item.payrollRunId);

    await this.prisma.payrollItem.delete({ where: { id } });

    return {
      success: true,
      deletedPayrollItem: item,
    };
  }

  private async ensurePayrollRunIsEditable(id: string): Promise<void> {
    const run = await this.ensurePayrollRunExists(id);

    const lockedStatuses: PayrollRunStatus[] = ['APPROVED', 'LOCKED', 'PAID'];

    if (lockedStatuses.includes(run.status)) {
      throw new BadRequestException('Payroll run is not editable');
    }
  }

  private async ensurePayrollRunExists(id: string): Promise<{
    id: string;
    status: PayrollRunStatus;
  }> {
    const run = await this.prisma.payrollRun.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    if (!run) {
      throw new NotFoundException('Payroll run not found');
    }

    return run;
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

  private async ensureSalaryComponentExists(id: string): Promise<void> {
    const component = await this.prisma.salaryComponent.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!component) {
      throw new NotFoundException('Salary component not found');
    }
  }
}
