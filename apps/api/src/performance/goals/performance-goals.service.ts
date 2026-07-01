import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PerformanceGoalStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreatePerformanceGoalDto } from './dto/create-performance-goal.dto';
import { UpdatePerformanceGoalDto } from './dto/update-performance-goal.dto';
import { PerformanceGoalEntity } from './entities/performance-goal.entity';

type PerformanceGoalRecord = {
  id: string;
  cycleId: string;
  employeeId: string;
  title: string;
  description: string | null;
  weight: Decimal;
  targetValue: Decimal | null;
  actualValue: Decimal | null;
  status: PerformanceGoalStatus;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PerformanceGoalsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: PerformanceGoalRecord): PerformanceGoalEntity {
    return new PerformanceGoalEntity({
      ...item,
      weight: item.weight.toNumber(),
      targetValue: item.targetValue ? item.targetValue.toNumber() : null,
      actualValue: item.actualValue ? item.actualValue.toNumber() : null,
    });
  }

  async findAll(): Promise<PerformanceGoalEntity[]> {
    const items = await this.prisma.performanceGoal.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<PerformanceGoalEntity> {
    const item = await this.prisma.performanceGoal.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Performance goal not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreatePerformanceGoalDto): Promise<PerformanceGoalEntity> {
    await this.ensureCycleExists(dto.cycleId);
    await this.ensureEmployeeExists(dto.employeeId);

    const item = await this.prisma.performanceGoal.create({
      data: {
        cycleId: dto.cycleId,
        employeeId: dto.employeeId,
        title: dto.title,
        description: dto.description,
        weight: dto.weight ?? 0,
        targetValue: dto.targetValue,
        actualValue: dto.actualValue,
        status: dto.status ?? 'DRAFT',
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdatePerformanceGoalDto,
  ): Promise<PerformanceGoalEntity> {
    await this.findOne(id);

    if (dto.cycleId) {
      await this.ensureCycleExists(dto.cycleId);
    }

    if (dto.employeeId) {
      await this.ensureEmployeeExists(dto.employeeId);
    }

    const item = await this.prisma.performanceGoal.update({
      where: { id },
      data: {
        cycleId: dto.cycleId,
        employeeId: dto.employeeId,
        title: dto.title,
        description: dto.description,
        weight: dto.weight,
        targetValue: dto.targetValue,
        actualValue: dto.actualValue,
        status: dto.status,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.performanceGoal.delete({ where: { id } });

    return {
      success: true,
      deletedPerformanceGoal: item,
    };
  }

  private async ensureCycleExists(id: string): Promise<void> {
    const item = await this.prisma.performanceCycle.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!item) {
      throw new NotFoundException('Performance cycle not found');
    }
  }

  private async ensureEmployeeExists(id: string): Promise<void> {
    const item = await this.prisma.employee.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!item) {
      throw new NotFoundException('Employee not found');
    }
  }
}
