import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeaveBalanceDto } from './dto/create-leave-balance.dto';
import { UpdateLeaveBalanceDto } from './dto/update-leave-balance.dto';
import { LeaveBalanceEntity } from './entities/leave-balance.entity';

type LeaveBalanceRecord = {
  id: string;
  companyId: string;
  employeeId: string;
  leaveTypeId: string;
  year: number;
  openingBalance: Decimal;
  accrued: Decimal;
  used: Decimal;
  adjusted: Decimal;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class LeaveBalancesService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: LeaveBalanceRecord): LeaveBalanceEntity {
    const openingBalance = item.openingBalance.toNumber();
    const accrued = item.accrued.toNumber();
    const used = item.used.toNumber();
    const adjusted = item.adjusted.toNumber();

    return new LeaveBalanceEntity({
      id: item.id,
      companyId: item.companyId,
      employeeId: item.employeeId,
      leaveTypeId: item.leaveTypeId,
      year: item.year,
      openingBalance,
      accrued,
      used,
      adjusted,
      available: openingBalance + accrued + adjusted - used,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  async findAll(): Promise<LeaveBalanceEntity[]> {
    const items = await this.prisma.leaveBalance.findMany({
      orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<LeaveBalanceEntity> {
    const item = await this.prisma.leaveBalance.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Leave balance not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateLeaveBalanceDto): Promise<LeaveBalanceEntity> {
    await this.ensureCompanyExists(dto.companyId);
    await this.ensureEmployeeExists(dto.employeeId);
    await this.ensureLeaveTypeExists(dto.leaveTypeId);

    const exists = await this.prisma.leaveBalance.findFirst({
      where: {
        employeeId: dto.employeeId,
        leaveTypeId: dto.leaveTypeId,
        year: dto.year,
      },
    });

    if (exists) {
      throw new ConflictException('Leave balance already exists');
    }

    const item = await this.prisma.leaveBalance.create({
      data: {
        companyId: dto.companyId,
        employeeId: dto.employeeId,
        leaveTypeId: dto.leaveTypeId,
        year: dto.year,
        openingBalance: dto.openingBalance ?? 0,
        accrued: dto.accrued ?? 0,
        used: dto.used ?? 0,
        adjusted: dto.adjusted ?? 0,
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdateLeaveBalanceDto,
  ): Promise<LeaveBalanceEntity> {
    await this.findOne(id);

    if (dto.companyId) await this.ensureCompanyExists(dto.companyId);
    if (dto.employeeId) await this.ensureEmployeeExists(dto.employeeId);
    if (dto.leaveTypeId) await this.ensureLeaveTypeExists(dto.leaveTypeId);

    const item = await this.prisma.leaveBalance.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        employeeId: dto.employeeId,
        leaveTypeId: dto.leaveTypeId,
        year: dto.year,
        openingBalance: dto.openingBalance,
        accrued: dto.accrued,
        used: dto.used,
        adjusted: dto.adjusted,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.leaveBalance.delete({ where: { id } });

    return {
      success: true,
      deletedLeaveBalance: item,
    };
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');
  }

  private async ensureEmployeeExists(id: string): Promise<void> {
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    if (!employee) throw new NotFoundException('Employee not found');
  }

  private async ensureLeaveTypeExists(id: string): Promise<void> {
    const leaveType = await this.prisma.leaveType.findUnique({ where: { id } });
    if (!leaveType) throw new NotFoundException('Leave type not found');
  }
}
