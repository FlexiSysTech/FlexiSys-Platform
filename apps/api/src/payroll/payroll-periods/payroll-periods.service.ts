import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PayrollPeriodStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreatePayrollPeriodDto } from './dto/create-payroll-period.dto';
import { UpdatePayrollPeriodDto } from './dto/update-payroll-period.dto';
import { PayrollPeriodEntity } from './entities/payroll-period.entity';

type PayrollPeriodRecord = {
  id: string;
  companyId: string;
  code: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: PayrollPeriodStatus;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PayrollPeriodsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: PayrollPeriodRecord): PayrollPeriodEntity {
    return new PayrollPeriodEntity(item);
  }

  async findAll(): Promise<PayrollPeriodEntity[]> {
    const items = await this.prisma.payrollPeriod.findMany({
      orderBy: { startDate: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<PayrollPeriodEntity> {
    const item = await this.prisma.payrollPeriod.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Payroll period not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreatePayrollPeriodDto): Promise<PayrollPeriodEntity> {
    await this.ensureCompanyExists(dto.companyId);
    this.ensureDateRangeIsValid(dto.startDate, dto.endDate);
    await this.ensureCodeIsUnique(dto.companyId, dto.code);
    await this.ensureDateRangeIsUnique(
      dto.companyId,
      new Date(dto.startDate),
      new Date(dto.endDate),
    );

    const item = await this.prisma.payrollPeriod.create({
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        status: dto.status ?? 'OPEN',
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdatePayrollPeriodDto,
  ): Promise<PayrollPeriodEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;
    const startDate = dto.startDate
      ? new Date(dto.startDate)
      : current.startDate;
    const endDate = dto.endDate ? new Date(dto.endDate) : current.endDate;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    this.ensureDateRangeIsValid(startDate.toISOString(), endDate.toISOString());

    if (dto.companyId || dto.code) {
      await this.ensureCodeIsUnique(companyId, code, id);
    }

    if (dto.companyId || dto.startDate || dto.endDate) {
      await this.ensureDateRangeIsUnique(companyId, startDate, endDate, id);
    }

    const item = await this.prisma.payrollPeriod.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        status: dto.status,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    const runs = await this.prisma.payrollRun.count({
      where: { periodId: id },
    });

    if (runs > 0) {
      throw new BadRequestException('Payroll period is used by payroll runs');
    }

    await this.prisma.payrollPeriod.delete({ where: { id } });

    return {
      success: true,
      deletedPayrollPeriod: item,
    };
  }

  private ensureDateRangeIsValid(startDate: string, endDate: string): void {
    if (new Date(startDate) > new Date(endDate)) {
      throw new BadRequestException('Start date must be before end date');
    }
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const company = await this.prisma.company.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }
  }

  private async ensureCodeIsUnique(
    companyId: string,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.payrollPeriod.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (item) {
      throw new ConflictException(
        'Payroll period code already exists in this company',
      );
    }
  }

  private async ensureDateRangeIsUnique(
    companyId: string,
    startDate: Date,
    endDate: Date,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.payrollPeriod.findFirst({
      where: {
        companyId,
        startDate,
        endDate,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (item) {
      throw new ConflictException(
        'Payroll period already exists for this date range',
      );
    }
  }
}
