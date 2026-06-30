import { Injectable, NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/prisma.service';
import { CreatePayrollProfileDto } from './dto/create-payroll-profile.dto';
import { UpdatePayrollProfileDto } from './dto/update-payroll-profile.dto';
import { PayrollProfileEntity } from './entities/payroll-profile.entity';

type PayrollProfileRecord = {
  id: string;
  employeeId: string;
  basicSalary: Decimal;
  housingAllowance: Decimal;
  transportAllowance: Decimal;
  otherAllowance: Decimal;
  bankName: string | null;
  bankIban: string | null;
  effectiveFrom: Date;
  effectiveTo: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PayrollProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: PayrollProfileRecord): PayrollProfileEntity {
    return new PayrollProfileEntity({
      ...item,
      basicSalary: item.basicSalary.toNumber(),
      housingAllowance: item.housingAllowance.toNumber(),
      transportAllowance: item.transportAllowance.toNumber(),
      otherAllowance: item.otherAllowance.toNumber(),
    });
  }

  async findAll(): Promise<PayrollProfileEntity[]> {
    const items = await this.prisma.payrollProfile.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<PayrollProfileEntity> {
    const item = await this.prisma.payrollProfile.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Payroll profile not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreatePayrollProfileDto): Promise<PayrollProfileEntity> {
    await this.ensureEmployeeExists(dto.employeeId);

    const item = await this.prisma.payrollProfile.create({
      data: {
        employeeId: dto.employeeId,
        basicSalary: dto.basicSalary,
        housingAllowance: dto.housingAllowance ?? 0,
        transportAllowance: dto.transportAllowance ?? 0,
        otherAllowance: dto.otherAllowance ?? 0,
        bankName: dto.bankName,
        bankIban: dto.bankIban,
        effectiveFrom: new Date(dto.effectiveFrom),
        effectiveTo: dto.effectiveTo ? new Date(dto.effectiveTo) : undefined,
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdatePayrollProfileDto,
  ): Promise<PayrollProfileEntity> {
    await this.findOne(id);

    if (dto.employeeId) {
      await this.ensureEmployeeExists(dto.employeeId);
    }

    const item = await this.prisma.payrollProfile.update({
      where: { id },
      data: {
        employeeId: dto.employeeId,
        basicSalary: dto.basicSalary,
        housingAllowance: dto.housingAllowance,
        transportAllowance: dto.transportAllowance,
        otherAllowance: dto.otherAllowance,
        bankName: dto.bankName,
        bankIban: dto.bankIban,
        effectiveFrom: dto.effectiveFrom
          ? new Date(dto.effectiveFrom)
          : undefined,
        effectiveTo: dto.effectiveTo ? new Date(dto.effectiveTo) : undefined,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.payrollProfile.delete({ where: { id } });

    return {
      success: true,
      deletedPayrollProfile: item,
    };
  }

  private async ensureEmployeeExists(id: string): Promise<void> {
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    if (!employee) throw new NotFoundException('Employee not found');
  }
}
