import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PerformanceCycleStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreatePerformanceCycleDto } from './dto/create-performance-cycle.dto';
import { UpdatePerformanceCycleDto } from './dto/update-performance-cycle.dto';
import { PerformanceCycleEntity } from './entities/performance-cycle.entity';

type PerformanceCycleRecord = {
  id: string;
  companyId: string;
  code: string;
  name: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  status: PerformanceCycleStatus;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PerformanceCyclesService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: PerformanceCycleRecord): PerformanceCycleEntity {
    return new PerformanceCycleEntity(item);
  }

  async findAll(): Promise<PerformanceCycleEntity[]> {
    const items = await this.prisma.performanceCycle.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<PerformanceCycleEntity> {
    const item = await this.prisma.performanceCycle.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Performance cycle not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreatePerformanceCycleDto): Promise<PerformanceCycleEntity> {
    await this.ensureCompanyExists(dto.companyId);
    this.ensureDateRangeIsValid(dto.startDate, dto.endDate);
    await this.ensureCodeIsUnique(dto.companyId, dto.code);

    const item = await this.prisma.performanceCycle.create({
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        status: dto.status ?? 'DRAFT',
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdatePerformanceCycleDto,
  ): Promise<PerformanceCycleEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;
    const startDate = dto.startDate ?? current.startDate.toISOString();
    const endDate = dto.endDate ?? current.endDate.toISOString();

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    this.ensureDateRangeIsValid(startDate, endDate);

    if (dto.companyId || dto.code) {
      await this.ensureCodeIsUnique(companyId, code, id);
    }

    const item = await this.prisma.performanceCycle.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        status: dto.status,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.performanceCycle.delete({
      where: { id },
    });

    return {
      success: true,
      deletedPerformanceCycle: item,
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

  private ensureDateRangeIsValid(startDate: string, endDate: string): void {
    if (new Date(startDate) > new Date(endDate)) {
      throw new BadRequestException('Start date must be before end date');
    }
  }

  private async ensureCodeIsUnique(
    companyId: string,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.performanceCycle.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (item) {
      throw new ConflictException(
        'Performance cycle code already exists in this company',
      );
    }
  }
}
