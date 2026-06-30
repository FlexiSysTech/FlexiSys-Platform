import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { HolidayEntity } from './entities/holiday.entity';

type HolidayRecord = {
  id: string;
  companyId: string;
  branchId: string | null;
  name: string;
  holidayDate: Date;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class HolidaysService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(holiday: HolidayRecord): HolidayEntity {
    return new HolidayEntity(holiday);
  }

  async findAll(): Promise<HolidayEntity[]> {
    const holidays = await this.prisma.holiday.findMany({
      orderBy: {
        holidayDate: 'desc',
      },
    });

    return holidays.map((holiday) => this.toEntity(holiday));
  }

  async findOne(id: string): Promise<HolidayEntity> {
    const holiday = await this.prisma.holiday.findUnique({
      where: { id },
    });

    if (!holiday) {
      throw new NotFoundException('Holiday not found');
    }

    return this.toEntity(holiday);
  }

  async create(dto: CreateHolidayDto): Promise<HolidayEntity> {
    await this.ensureCompanyExists(dto.companyId);

    if (dto.branchId) {
      await this.ensureBranchExists(dto.branchId);
    }

    await this.ensureHolidayIsUnique(
      dto.companyId,
      dto.branchId ?? null,
      new Date(dto.holidayDate),
    );

    const holiday = await this.prisma.holiday.create({
      data: {
        companyId: dto.companyId,
        branchId: dto.branchId,
        name: dto.name,
        holidayDate: new Date(dto.holidayDate),
        description: dto.description,
      },
    });

    return this.toEntity(holiday);
  }

  async update(id: string, dto: UpdateHolidayDto): Promise<HolidayEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const branchId =
      dto.branchId === undefined ? current.branchId : dto.branchId;
    const holidayDate = dto.holidayDate
      ? new Date(dto.holidayDate)
      : current.holidayDate;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.branchId) {
      await this.ensureBranchExists(dto.branchId);
    }

    if (dto.companyId || dto.branchId || dto.holidayDate) {
      await this.ensureHolidayIsUnique(
        companyId,
        branchId ?? null,
        holidayDate,
        id,
      );
    }

    const holiday = await this.prisma.holiday.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        branchId: dto.branchId,
        name: dto.name,
        holidayDate: dto.holidayDate
          ? new Date(dto.holidayDate)
          : undefined,
        description: dto.description,
      },
    });

    return this.toEntity(holiday);
  }

  async remove(id: string): Promise<{
    success: boolean;
    deletedHoliday: HolidayEntity;
  }> {
    const holiday = await this.findOne(id);

    await this.prisma.holiday.delete({ where: { id } });

    return {
      success: true,
      deletedHoliday: holiday,
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

  private async ensureHolidayIsUnique(
    companyId: string,
    branchId: string | null,
    holidayDate: Date,
    excludeId?: string,
  ): Promise<void> {
    const holiday = await this.prisma.holiday.findFirst({
      where: {
        companyId,
        branchId,
        holidayDate,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (holiday) {
      throw new ConflictException('Holiday already exists for this date');
    }
  }
}
