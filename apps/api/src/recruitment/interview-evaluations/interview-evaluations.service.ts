import { Injectable, NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { InterviewEvaluationRecommendation } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateInterviewEvaluationDto } from './dto/create-interview-evaluation.dto';
import { UpdateInterviewEvaluationDto } from './dto/update-interview-evaluation.dto';
import { InterviewEvaluationEntity } from './entities/interview-evaluation.entity';

type InterviewEvaluationRecord = {
  id: string;
  interviewId: string;
  evaluatorId: string | null;
  criteria: string;
  score: Decimal;
  recommendation: InterviewEvaluationRecommendation | null;
  comments: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class InterviewEvaluationsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: InterviewEvaluationRecord): InterviewEvaluationEntity {
    return new InterviewEvaluationEntity({
      ...item,
      score: item.score.toNumber(),
    });
  }

  async findAll(): Promise<InterviewEvaluationEntity[]> {
    const items = await this.prisma.interviewEvaluation.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<InterviewEvaluationEntity> {
    const item = await this.prisma.interviewEvaluation.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Interview evaluation not found');
    }

    return this.toEntity(item);
  }

  async create(
    dto: CreateInterviewEvaluationDto,
  ): Promise<InterviewEvaluationEntity> {
    await this.ensureInterviewExists(dto.interviewId);

    if (dto.evaluatorId) {
      await this.ensureEmployeeExists(dto.evaluatorId);
    }

    const item = await this.prisma.interviewEvaluation.create({
      data: {
        interviewId: dto.interviewId,
        evaluatorId: dto.evaluatorId,
        criteria: dto.criteria,
        score: dto.score,
        recommendation: dto.recommendation,
        comments: dto.comments,
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdateInterviewEvaluationDto,
  ): Promise<InterviewEvaluationEntity> {
    await this.findOne(id);

    if (dto.interviewId) {
      await this.ensureInterviewExists(dto.interviewId);
    }

    if (dto.evaluatorId) {
      await this.ensureEmployeeExists(dto.evaluatorId);
    }

    const item = await this.prisma.interviewEvaluation.update({
      where: { id },
      data: {
        interviewId: dto.interviewId,
        evaluatorId: dto.evaluatorId,
        criteria: dto.criteria,
        score: dto.score,
        recommendation: dto.recommendation,
        comments: dto.comments,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.interviewEvaluation.delete({ where: { id } });

    return {
      success: true,
      deletedInterviewEvaluation: item,
    };
  }

  private async ensureInterviewExists(id: string): Promise<void> {
    const item = await this.prisma.interview.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Interview not found');
  }

  private async ensureEmployeeExists(id: string): Promise<void> {
    const item = await this.prisma.employee.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Evaluator employee not found');
  }
}
