import { Injectable, NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { InterviewStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { InterviewEntity } from './entities/interview.entity';

type InterviewRecord = {
  id: string;
  applicationId: string;
  interviewerId: string | null;
  scheduledAt: Date;
  location: string | null;
  meetingUrl: string | null;
  status: InterviewStatus;
  score: Decimal | null;
  feedback: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class InterviewsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: InterviewRecord): InterviewEntity {
    return new InterviewEntity({
      ...item,
      score: item.score ? item.score.toNumber() : null,
    });
  }

  async findAll(): Promise<InterviewEntity[]> {
    const items = await this.prisma.interview.findMany({
      orderBy: { scheduledAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<InterviewEntity> {
    const item = await this.prisma.interview.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Interview not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateInterviewDto): Promise<InterviewEntity> {
    await this.ensureApplicationExists(dto.applicationId);

    if (dto.interviewerId) {
      await this.ensureEmployeeExists(dto.interviewerId);
    }

    const item = await this.prisma.interview.create({
      data: {
        applicationId: dto.applicationId,
        interviewerId: dto.interviewerId,
        scheduledAt: new Date(dto.scheduledAt),
        location: dto.location,
        meetingUrl: dto.meetingUrl,
        status: dto.status ?? 'SCHEDULED',
        score: dto.score,
        feedback: dto.feedback,
      },
    });

    return this.toEntity(item);
  }

  async update(id: string, dto: UpdateInterviewDto): Promise<InterviewEntity> {
    await this.findOne(id);

    if (dto.applicationId) {
      await this.ensureApplicationExists(dto.applicationId);
    }

    if (dto.interviewerId) {
      await this.ensureEmployeeExists(dto.interviewerId);
    }

    const item = await this.prisma.interview.update({
      where: { id },
      data: {
        applicationId: dto.applicationId,
        interviewerId: dto.interviewerId,
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
        location: dto.location,
        meetingUrl: dto.meetingUrl,
        status: dto.status,
        score: dto.score,
        feedback: dto.feedback,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.interview.delete({ where: { id } });

    return {
      success: true,
      deletedInterview: item,
    };
  }

  private async ensureApplicationExists(id: string): Promise<void> {
    const item = await this.prisma.jobApplication.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException('Application not found');
    }
  }

  private async ensureEmployeeExists(id: string): Promise<void> {
    const item = await this.prisma.employee.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException('Interviewer employee not found');
    }
  }
}
