import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RecruitmentStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { UpdateJobPositionDto } from './dto/update-job-position.dto';
import { JobPositionEntity } from './entities/job-position.entity';

type JobPositionRecord = {
  id: string;
  companyId: string;
  code: string;
  title: string;
  description: string | null;
  status: RecruitmentStatus;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class JobPositionsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: JobPositionRecord): JobPositionEntity {
    return new JobPositionEntity(item);
  }

  async findAll(): Promise<JobPositionEntity[]> {
    const items = await this.prisma.jobPosition.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<JobPositionEntity> {
    const item = await this.prisma.jobPosition.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Job position not found');
    return this.toEntity(item);
  }

  async create(dto: CreateJobPositionDto): Promise<JobPositionEntity> {
    await this.ensureCompanyExists(dto.companyId);
    await this.ensureCodeIsUnique(dto.companyId, dto.code);

    const item = await this.prisma.jobPosition.create({
      data: {
        companyId: dto.companyId,
        code: dto.code,
        title: dto.title,
        description: dto.description,
        status: dto.status ?? 'ACTIVE',
      },
    });
    return this.toEntity(item);
  }

  async update(id: string, dto: UpdateJobPositionDto): Promise<JobPositionEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId) await this.ensureCompanyExists(dto.companyId);
    if (dto.companyId || dto.code) await this.ensureCodeIsUnique(companyId, code, id);

    const item = await this.prisma.jobPosition.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        code: dto.code,
        title: dto.title,
        description: dto.description,
        status: dto.status,
      },
    });
    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.prisma.jobPosition.delete({ where: { id } });
    return { success: true, deletedJobPosition: item };
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');
  }

  private async ensureCodeIsUnique(companyId: string, code: string, excludeId?: string): Promise<void> {
    const item = await this.prisma.jobPosition.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    if (item) throw new ConflictException('Job position code already exists in this company');
  }
}
