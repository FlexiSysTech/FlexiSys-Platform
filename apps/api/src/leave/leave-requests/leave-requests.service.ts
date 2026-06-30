import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { LeaveRequestEntity } from './entities/leave-request.entity';

type LeaveRequestRecord = {
  id: string;
  employeeId: string;
  leaveTypeId: string;
  startDate: Date;
  endDate: Date;
  totalDays: Decimal;
  reason: string | null;
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  submittedAt: Date;
  approvedAt: Date | null;
  rejectedAt: Date | null;
  cancelledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class LeaveRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: LeaveRequestRecord): LeaveRequestEntity {
    return new LeaveRequestEntity({
      ...item,
      totalDays: item.totalDays.toNumber(),
    });
  }

  async findAll(): Promise<LeaveRequestEntity[]> {
    const items = await this.prisma.leaveRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<LeaveRequestEntity> {
    const item = await this.prisma.leaveRequest.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Leave request not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateLeaveRequestDto): Promise<LeaveRequestEntity> {
    await this.ensureEmployeeExists(dto.employeeId);
    await this.ensureLeaveTypeExists(dto.leaveTypeId);
    this.ensureDateRangeIsValid(dto.startDate, dto.endDate);

    const item = await this.prisma.leaveRequest.create({
      data: {
        employeeId: dto.employeeId,
        leaveTypeId: dto.leaveTypeId,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        totalDays: dto.totalDays,
        reason: dto.reason,
        status: dto.status ?? 'PENDING',
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdateLeaveRequestDto,
  ): Promise<LeaveRequestEntity> {
    const current = await this.findOne(id);

    if (dto.employeeId) await this.ensureEmployeeExists(dto.employeeId);
    if (dto.leaveTypeId) await this.ensureLeaveTypeExists(dto.leaveTypeId);

    const startDate = dto.startDate ?? current.startDate.toISOString();
    const endDate = dto.endDate ?? current.endDate.toISOString();
    this.ensureDateRangeIsValid(startDate, endDate);

    const item = await this.prisma.leaveRequest.update({
      where: { id },
      data: {
        employeeId: dto.employeeId,
        leaveTypeId: dto.leaveTypeId,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        totalDays: dto.totalDays,
        reason: dto.reason,
        status: dto.status,
        approvedAt: dto.status === 'APPROVED' ? new Date() : undefined,
        rejectedAt: dto.status === 'REJECTED' ? new Date() : undefined,
        cancelledAt: dto.status === 'CANCELLED' ? new Date() : undefined,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.leaveRequest.delete({ where: { id } });

    return {
      success: true,
      deletedLeaveRequest: item,
    };
  }

  private async ensureEmployeeExists(id: string): Promise<void> {
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    if (!employee) throw new NotFoundException('Employee not found');
  }

  private async ensureLeaveTypeExists(id: string): Promise<void> {
    const leaveType = await this.prisma.leaveType.findUnique({ where: { id } });
    if (!leaveType) throw new NotFoundException('Leave type not found');
  }

  private ensureDateRangeIsValid(startDate: string, endDate: string): void {
    if (new Date(startDate) > new Date(endDate)) {
      throw new BadRequestException('Start date must be before end date');
    }
  }
}
