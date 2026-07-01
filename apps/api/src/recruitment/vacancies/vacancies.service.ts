import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VacancyStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { VacancyEntity } from './entities/vacancy.entity';

type VacancyRecord = {
  id: string;
  companyId: string;
  jobPositionId: string;
  code: string;
  title: string;
  description: string | null;
  openings: number;
  status: VacancyStatus;
  openedAt: Date | null;
  closedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class VacanciesService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: VacancyRecord): VacancyEntity {
    return new VacancyEntity(item);
  }

  async findAll(): Promise<VacancyEntity[]> {
    const items = await this.prisma.vacancy.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<VacancyEntity> {
    const item = await this.prisma.vacancy.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Vacancy not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateVacancyDto): Promise<VacancyEntity> {
    await this.ensureCompanyExists(dto.companyId);
    await this.ensureJobPositionExists(dto.jobPositionId);
    await this.ensureCodeIsUnique(dto.companyId, dto.code);

    const item = await this.prisma.vacancy.create({
      data: {
        companyId: dto.companyId,
        jobPositionId: dto.jobPositionId,
        code: dto.code,
        title: dto.title,
        description: dto.description,
        openings: dto.openings ?? 1,
        status: dto.status ?? 'DRAFT',
        openedAt: dto.openedAt ? new Date(dto.openedAt) : undefined,
        closedAt: dto.closedAt ? new Date(dto.closedAt) : undefined,
      },
    });

    return this.toEntity(item);
  }

  async update(id: string, dto: UpdateVacancyDto): Promise<VacancyEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId) await this.ensureCompanyExists(dto.companyId);
    if (dto.jobPositionId) await this.ensureJobPositionExists(dto.jobPositionId);
    if (dto.companyId || dto.code) await this.ensureCodeIsUnique(companyId, code, id);

    const item = await this.prisma.vacancy.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        jobPositionId: dto.jobPositionId,
        code: dto.code,
        title: dto.title,
        description: dto.description,
        openings: dto.openings,
        status: dto.status,
        openedAt: dto.openedAt ? new Date(dto.openedAt) : undefined,
        closedAt: dto.closedAt ? new Date(dto.closedAt) : undefined,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.vacancy.delete({ where: { id } });

    return { success: true, deletedVacancy: item };
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');
  }

  private async ensureJobPositionExists(id: string): Promise<void> {
    const jobPosition = await this.prisma.jobPosition.findUnique({ where: { id } });
    if (!jobPosition) throw new NotFoundException('Job position not found');
  }

  private async ensureCodeIsUnique(companyId: string, code: string, excludeId?: string): Promise<void> {
    const item = await this.prisma.vacancy.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    if (item) throw new ConflictException('Vacancy code already exists in this company');
  }
}
