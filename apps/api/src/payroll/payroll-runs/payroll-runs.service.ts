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
  year: number;
  month: number;
  status: 'DRAFT' | 'PROCESSING' | 'APPROVED' | 'PAID' | 'CANCELLED';
  startedAt: Date | null;
  approvedAt: Date | null;
  paidAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PayrollRunsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: PayrollRunRecord): PayrollRunEntity {
    return new PayrollRunEntity(item);
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

    const item = await this.prisma.payrollRun.create({
      data: {
        companyId: dto.companyId,
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

    const item = await this.prisma.payrollRun.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        year: dto.year,
        month: dto.month,
        status: dto.status,
        notes: dto.notes,
        approvedAt: dto.status === 'APPROVED' ? new Date() : undefined,
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
}
