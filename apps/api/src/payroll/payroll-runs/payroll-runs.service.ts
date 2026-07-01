import {
  PayrollRunStatus,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreatePayrollRunDto } from './dto/create-payroll-run.dto';
import { UpdatePayrollRunDto } from './dto/update-payroll-run.dto';
import { PayrollRunEntity } from './entities/payroll-run.entity';

type PayrollRunRecord = {
  id: string;
  companyId: string;
  periodId: string | null;
  year: number;
  month: number;
  status: PayrollRunStatus;
  grossSalary: Decimal;
  taxableSalary: Decimal;
  totalDeductions: Decimal;
  netSalary: Decimal;
  employerCost: Decimal;
  startedAt: Date | null;
  reviewedAt: Date | null;
  reviewedById: string | null;
  approvedAt: Date | null;
  approvedById: string | null;
  rejectedAt: Date | null;
  rejectedReason: string | null;
  lockedAt: Date | null;
  paidAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PayrollRunsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: PayrollRunRecord): PayrollRunEntity {
    return new PayrollRunEntity({
      ...item,
      grossSalary: item.grossSalary.toNumber(),
      taxableSalary: item.taxableSalary.toNumber(),
      totalDeductions: item.totalDeductions.toNumber(),
      netSalary: item.netSalary.toNumber(),
      employerCost: item.employerCost.toNumber(),
    });
  }

  async findAll(): Promise<PayrollRunEntity[]> {
    const items = await this.prisma.payrollRun.findMany({
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<PayrollRunEntity> {
    const item = await this.prisma.payrollRun.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Payroll run not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreatePayrollRunDto): Promise<PayrollRunEntity> {
    await this.ensureCompanyExists(dto.companyId);

    const exists = await this.prisma.payrollRun.findFirst({
      where: {
        companyId: dto.companyId,
        year: dto.year,
        month: dto.month,
      },
    });

    if (exists) {
      throw new ConflictException('Payroll run already exists');
    }

    if (dto.periodId) {
      await this.ensurePayrollPeriodExists(dto.periodId, dto.companyId);
    }

    const item = await this.prisma.payrollRun.create({
      data: {
        companyId: dto.companyId,
        periodId: dto.periodId,
        year: dto.year,
        month: dto.month,
        status: dto.status ?? 'DRAFT',
        notes: dto.notes,
        startedAt: dto.status === 'PROCESSING' ? new Date() : undefined,
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdatePayrollRunDto,
  ): Promise<PayrollRunEntity> {
    await this.findOne(id);

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.periodId) {
      await this.ensurePayrollPeriodExists(dto.periodId, dto.companyId);
    }

    if (dto.reviewedById) {
      await this.ensureUserExists(dto.reviewedById, 'Reviewer not found');
    }

    if (dto.approvedById) {
      await this.ensureUserExists(dto.approvedById, 'Approver not found');
    }

    const item = await this.prisma.payrollRun.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        periodId: dto.periodId,
        year: dto.year,
        month: dto.month,
        status: dto.status,
        notes: dto.notes,
        reviewedAt: dto.status === 'IN_REVIEW' ? new Date() : undefined,
        reviewedById: dto.reviewedById,
        approvedAt: dto.status === 'APPROVED' ? new Date() : undefined,
        approvedById: dto.approvedById,
        rejectedAt: dto.status === 'REJECTED' ? new Date() : undefined,
        rejectedReason: dto.rejectedReason,
        lockedAt: dto.status === 'LOCKED' ? new Date() : undefined,
        paidAt: dto.status === 'PAID' ? new Date() : undefined,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.payrollRun.delete({ where: { id } });

    return {
      success: true,
      deletedPayrollRun: item,
    };
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');
  }

  private async ensurePayrollPeriodExists(
    id: string,
    companyId?: string,
  ): Promise<void> {
    const period = await this.prisma.payrollPeriod.findUnique({
      where: { id },
      select: { id: true, companyId: true },
    });

    if (!period) {
      throw new NotFoundException('Payroll period not found');
    }

    if (companyId && period.companyId !== companyId) {
      throw new ConflictException('Payroll period belongs to another company');
    }
  }

  private async ensureUserExists(id: string, message: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException(message);
    }
  }
}
