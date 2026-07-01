import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JobApplicationStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplicationEntity } from './entities/job-application.entity';

type JobApplicationRecord = {
  id: string;
  vacancyId: string;
  applicantId: string;
  employeeId: string | null;
  status: JobApplicationStatus;
  source: string | null;
  appliedAt: Date;
  hiredAt: Date | null;
  rejectedAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: JobApplicationRecord): JobApplicationEntity {
    return new JobApplicationEntity(item);
  }

  async findAll(): Promise<JobApplicationEntity[]> {
    const items = await this.prisma.jobApplication.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<JobApplicationEntity> {
    const item = await this.prisma.jobApplication.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Job application not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateJobApplicationDto): Promise<JobApplicationEntity> {
    await this.ensureVacancyExists(dto.vacancyId);
    await this.ensureApplicantExists(dto.applicantId);

    if (dto.employeeId) {
      await this.ensureEmployeeExists(dto.employeeId);
    }

    const exists = await this.prisma.jobApplication.findFirst({
      where: {
        vacancyId: dto.vacancyId,
        applicantId: dto.applicantId,
      },
    });

    if (exists) {
      throw new ConflictException(
        'Applicant already applied to this vacancy',
      );
    }

    const item = await this.prisma.jobApplication.create({
      data: {
        vacancyId: dto.vacancyId,
        applicantId: dto.applicantId,
        employeeId: dto.employeeId,
        status: dto.status ?? 'APPLIED',
        source: dto.source,
        notes: dto.notes,
        hiredAt: dto.status === 'HIRED' ? new Date() : undefined,
        rejectedAt: dto.status === 'REJECTED' ? new Date() : undefined,
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdateJobApplicationDto,
  ): Promise<JobApplicationEntity> {
    await this.findOne(id);

    if (dto.vacancyId) {
      await this.ensureVacancyExists(dto.vacancyId);
    }

    if (dto.applicantId) {
      await this.ensureApplicantExists(dto.applicantId);
    }

    if (dto.employeeId) {
      await this.ensureEmployeeExists(dto.employeeId);
    }

    const item = await this.prisma.jobApplication.update({
      where: { id },
      data: {
        vacancyId: dto.vacancyId,
        applicantId: dto.applicantId,
        employeeId: dto.employeeId,
        status: dto.status,
        source: dto.source,
        notes: dto.notes,
        hiredAt: dto.status === 'HIRED' ? new Date() : undefined,
        rejectedAt: dto.status === 'REJECTED' ? new Date() : undefined,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.jobApplication.delete({ where: { id } });

    return {
      success: true,
      deletedApplication: item,
    };
  }

  private async ensureVacancyExists(id: string): Promise<void> {
    const item = await this.prisma.vacancy.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Vacancy not found');
  }

  private async ensureApplicantExists(id: string): Promise<void> {
    const item = await this.prisma.applicant.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Applicant not found');
  }

  private async ensureEmployeeExists(id: string): Promise<void> {
    const item = await this.prisma.employee.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Employee not found');
  }
}
