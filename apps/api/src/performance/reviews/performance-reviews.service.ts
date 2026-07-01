import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import {
  PerformanceRating,
  PerformanceReviewStatus,
} from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreatePerformanceReviewDto } from './dto/create-performance-review.dto';
import { UpdatePerformanceReviewDto } from './dto/update-performance-review.dto';
import { PerformanceReviewEntity } from './entities/performance-review.entity';

type PerformanceReviewRecord = {
  id: string;
  cycleId: string;
  employeeId: string;
  managerId: string | null;
  status: PerformanceReviewStatus;
  selfScore: Decimal | null;
  managerScore: Decimal | null;
  finalScore: Decimal | null;
  finalRating: PerformanceRating | null;
  selfComments: string | null;
  managerComments: string | null;
  hrComments: string | null;
  submittedAt: Date | null;
  approvedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PerformanceReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: PerformanceReviewRecord): PerformanceReviewEntity {
    return new PerformanceReviewEntity({
      ...item,
      selfScore: item.selfScore ? item.selfScore.toNumber() : null,
      managerScore: item.managerScore ? item.managerScore.toNumber() : null,
      finalScore: item.finalScore ? item.finalScore.toNumber() : null,
    });
  }

  async findAll(): Promise<PerformanceReviewEntity[]> {
    const items = await this.prisma.performanceReview.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<PerformanceReviewEntity> {
    const item = await this.prisma.performanceReview.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Performance review not found');
    }

    return this.toEntity(item);
  }

  async create(
    dto: CreatePerformanceReviewDto,
  ): Promise<PerformanceReviewEntity> {
    await this.ensureCycleExists(dto.cycleId);
    await this.ensureEmployeeExists(dto.employeeId);

    if (dto.managerId) {
      await this.ensureEmployeeExists(dto.managerId);
    }

    const exists = await this.prisma.performanceReview.findFirst({
      where: {
        cycleId: dto.cycleId,
        employeeId: dto.employeeId,
      },
    });

    if (exists) {
      throw new ConflictException(
        'Performance review already exists for this cycle and employee',
      );
    }

    const item = await this.prisma.performanceReview.create({
      data: {
        cycleId: dto.cycleId,
        employeeId: dto.employeeId,
        managerId: dto.managerId,
        status: dto.status ?? 'DRAFT',
        selfScore: dto.selfScore,
        managerScore: dto.managerScore,
        finalScore: dto.finalScore,
        finalRating: dto.finalRating,
        selfComments: dto.selfComments,
        managerComments: dto.managerComments,
        hrComments: dto.hrComments,
        submittedAt: dto.status === 'MANAGER_REVIEW' ? new Date() : undefined,
        approvedAt: dto.status === 'APPROVED' ? new Date() : undefined,
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdatePerformanceReviewDto,
  ): Promise<PerformanceReviewEntity> {
    await this.findOne(id);

    if (dto.cycleId) {
      await this.ensureCycleExists(dto.cycleId);
    }

    if (dto.employeeId) {
      await this.ensureEmployeeExists(dto.employeeId);
    }

    if (dto.managerId) {
      await this.ensureEmployeeExists(dto.managerId);
    }

    const item = await this.prisma.performanceReview.update({
      where: { id },
      data: {
        cycleId: dto.cycleId,
        employeeId: dto.employeeId,
        managerId: dto.managerId,
        status: dto.status,
        selfScore: dto.selfScore,
        managerScore: dto.managerScore,
        finalScore: dto.finalScore,
        finalRating: dto.finalRating,
        selfComments: dto.selfComments,
        managerComments: dto.managerComments,
        hrComments: dto.hrComments,
        submittedAt: dto.status === 'MANAGER_REVIEW' ? new Date() : undefined,
        approvedAt: dto.status === 'APPROVED' ? new Date() : undefined,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.performanceReview.delete({
      where: { id },
    });

    return {
      success: true,
      deletedPerformanceReview: item,
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
