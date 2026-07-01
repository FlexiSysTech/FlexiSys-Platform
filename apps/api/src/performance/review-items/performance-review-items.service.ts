import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PerformanceRating } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreatePerformanceReviewItemDto } from './dto/create-performance-review-item.dto';
import { UpdatePerformanceReviewItemDto } from './dto/update-performance-review-item.dto';
import { PerformanceReviewItemEntity } from './entities/performance-review-item.entity';

type PerformanceReviewItemRecord = {
  id: string;
  reviewId: string;
  title: string;
  description: string | null;
  weight: Decimal;
  score: Decimal | null;
  rating: PerformanceRating | null;
  comments: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PerformanceReviewItemsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: PerformanceReviewItemRecord): PerformanceReviewItemEntity {
    return new PerformanceReviewItemEntity({
      ...item,
      weight: item.weight.toNumber(),
      score: item.score ? item.score.toNumber() : null,
    });
  }

  async findAll(): Promise<PerformanceReviewItemEntity[]> {
    const items = await this.prisma.performanceReviewItem.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<PerformanceReviewItemEntity> {
    const item = await this.prisma.performanceReviewItem.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Performance review item not found');
    }

    return this.toEntity(item);
  }

  async create(
    dto: CreatePerformanceReviewItemDto,
  ): Promise<PerformanceReviewItemEntity> {
    await this.ensureReviewExists(dto.reviewId);

    const item = await this.prisma.performanceReviewItem.create({
      data: {
        reviewId: dto.reviewId,
        title: dto.title,
        description: dto.description,
        weight: dto.weight ?? 0,
        score: dto.score,
        rating: dto.rating,
        comments: dto.comments,
      },
    });

    await this.recalculateReviewScore(dto.reviewId);

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdatePerformanceReviewItemDto,
  ): Promise<PerformanceReviewItemEntity> {
    const current = await this.findOne(id);

    if (dto.reviewId) {
      await this.ensureReviewExists(dto.reviewId);
    }

    const item = await this.prisma.performanceReviewItem.update({
      where: { id },
      data: {
        reviewId: dto.reviewId,
        title: dto.title,
        description: dto.description,
        weight: dto.weight,
        score: dto.score,
        rating: dto.rating,
        comments: dto.comments,
      },
    });

    await this.recalculateReviewScore(dto.reviewId ?? current.reviewId);

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.performanceReviewItem.delete({
      where: { id },
    });

    await this.recalculateReviewScore(item.reviewId);

    return {
      success: true,
      deletedPerformanceReviewItem: item,
    };
  }

  private async ensureReviewExists(id: string): Promise<void> {
    const item = await this.prisma.performanceReview.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!item) {
      throw new NotFoundException('Performance review not found');
    }
  }

  private async recalculateReviewScore(reviewId: string): Promise<void> {
    const items = await this.prisma.performanceReviewItem.findMany({
      where: { reviewId },
    });

    const totalWeight = items.reduce(
      (sum, item) => sum + item.weight.toNumber(),
      0,
    );

    const weightedScore = items.reduce((sum, item) => {
      if (!item.score) return sum;
      return sum + item.score.toNumber() * item.weight.toNumber();
    }, 0);

    const finalScore =
      totalWeight > 0 ? Number((weightedScore / totalWeight).toFixed(2)) : null;

    await this.prisma.performanceReview.update({
      where: { id: reviewId },
      data: {
        finalScore,
        finalRating: finalScore === null
          ? undefined
          : this.resolveRating(finalScore),
      },
    });
  }

  private resolveRating(score: number): PerformanceRating {
    if (score >= 90) return 'OUTSTANDING';
    if (score >= 80) return 'EXCEEDS_EXPECTATIONS';
    if (score >= 70) return 'MEETS_EXPECTATIONS';
    if (score >= 60) return 'NEEDS_IMPROVEMENT';
    return 'UNSATISFACTORY';
  }
}
