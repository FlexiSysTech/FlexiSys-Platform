import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { LeaveTypeEntity } from './entities/leave-type.entity';

type LeaveTypeRecord = {
  id: string;
  companyId: string;
  code: string;
  name: string;
  description: string | null;
  annualAllowanceDays: Decimal | null;
  requiresApproval: boolean;
  isPaid: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class LeaveTypesService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: LeaveTypeRecord): LeaveTypeEntity {
    return new LeaveTypeEntity({
      ...item,
      annualAllowanceDays: item.annualAllowanceDays
        ? item.annualAllowanceDays.toNumber()
        : null,
    });
  }

  async findAll(): Promise<LeaveTypeEntity[]> {
    const items = await this.prisma.leaveType.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<LeaveTypeEntity> {
    const item = await this.prisma.leaveType.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Leave type not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateLeaveTypeDto): Promise<LeaveTypeEntity> {
    await this.ensureCompanyExists(dto.companyId);
    await this.ensureCodeIsUnique(dto.companyId, dto.code);

    const item = await this.prisma.leaveType.create({
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        annualAllowanceDays: dto.annualAllowanceDays,
        requiresApproval: dto.requiresApproval ?? true,
        isPaid: dto.isPaid ?? true,
        status: dto.status ?? 'ACTIVE',
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdateLeaveTypeDto,
  ): Promise<LeaveTypeEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.companyId || dto.code) {
      await this.ensureCodeIsUnique(companyId, code, id);
    }

    const item = await this.prisma.leaveType.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        annualAllowanceDays: dto.annualAllowanceDays,
        requiresApproval: dto.requiresApproval,
        isPaid: dto.isPaid,
        status: dto.status,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.leaveType.delete({ where: { id } });

    return {
      success: true,
      deletedLeaveType: item,
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

  private async ensureCodeIsUnique(
    companyId: string,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.leaveType.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (item) {
      throw new ConflictException(
        'Leave type code already exists in this company',
      );
    }
  }
}
