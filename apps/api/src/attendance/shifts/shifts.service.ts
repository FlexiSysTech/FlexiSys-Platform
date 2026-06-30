import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { ShiftEntity } from './entities/shift.entity';

type ShiftRecord = {
  id: string;
  companyId: string;
  branchId: string | null;
  code: string;
  name: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  graceMinutes: number;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class ShiftsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(shift: ShiftRecord): ShiftEntity {
    return new ShiftEntity(shift);
  }

  async findAll(): Promise<ShiftEntity[]> {
    const shifts = await this.prisma.shift.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return shifts.map((shift) => this.toEntity(shift));
  }

  async findOne(id: string): Promise<ShiftEntity> {
    const shift = await this.prisma.shift.findUnique({ where: { id } });

    if (!shift) {
      throw new NotFoundException('Shift not found');
    }

    return this.toEntity(shift);
  }

  async create(dto: CreateShiftDto): Promise<ShiftEntity> {
    await this.ensureCompanyExists(dto.companyId);

    if (dto.branchId) {
      await this.ensureBranchExists(dto.branchId);
    }

    await this.ensureCodeIsUnique(dto.companyId, dto.code);

    const shift = await this.prisma.shift.create({
      data: {
        companyId: dto.companyId,
        branchId: dto.branchId,
        code: dto.code,
        name: dto.name,
        startTime: dto.startTime,
        endTime: dto.endTime,
        breakMinutes: dto.breakMinutes ?? 0,
        graceMinutes: dto.graceMinutes ?? 0,
        status: dto.status ?? 'ACTIVE',
      },
    });

    return this.toEntity(shift);
  }

  async update(id: string, dto: UpdateShiftDto): Promise<ShiftEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.branchId) {
      await this.ensureBranchExists(dto.branchId);
    }

    if (dto.companyId || dto.code) {
      await this.ensureCodeIsUnique(companyId, code, id);
    }

    const shift = await this.prisma.shift.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        branchId: dto.branchId,
        code: dto.code,
        name: dto.name,
        startTime: dto.startTime,
        endTime: dto.endTime,
        breakMinutes: dto.breakMinutes,
        graceMinutes: dto.graceMinutes,
        status: dto.status,
      },
    });

    return this.toEntity(shift);
  }

  async remove(id: string): Promise<{
    success: boolean;
    deletedShift: ShiftEntity;
  }> {
    const shift = await this.findOne(id);

    await this.prisma.shift.delete({ where: { id } });

    return {
      success: true,
      deletedShift: shift,
    };
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

  private async ensureBranchExists(id: string): Promise<void> {
    const branch = await this.prisma.branch.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
  }

  private async ensureCodeIsUnique(
    companyId: string,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const shift = await this.prisma.shift.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (shift) {
      throw new ConflictException('Shift code already exists in this company');
    }
  }
}
