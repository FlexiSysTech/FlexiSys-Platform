import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicantStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { ApplicantEntity } from './entities/applicant.entity';

type ApplicantRecord = {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  nationalId: string | null;
  nationality: string | null;
  currentCompany: string | null;
  currentTitle: string | null;
  resumeUrl: string | null;
  status: ApplicantStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class ApplicantsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: ApplicantRecord): ApplicantEntity {
    return new ApplicantEntity(item);
  }

  private buildFullName(
    firstName: string,
    middleName: string | null | undefined,
    lastName: string,
  ): string {
    return [firstName, middleName, lastName].filter(Boolean).join(' ');
  }

  async findAll(): Promise<ApplicantEntity[]> {
    const items = await this.prisma.applicant.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<ApplicantEntity> {
    const item = await this.prisma.applicant.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Applicant not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateApplicantDto): Promise<ApplicantEntity> {
    const item = await this.prisma.applicant.create({
      data: {
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        fullName: this.buildFullName(dto.firstName, dto.middleName, dto.lastName),
        email: dto.email,
        phone: dto.phone,
        nationalId: dto.nationalId,
        nationality: dto.nationality,
        currentCompany: dto.currentCompany,
        currentTitle: dto.currentTitle,
        resumeUrl: dto.resumeUrl,
        status: dto.status ?? 'NEW',
        notes: dto.notes,
      },
    });

    return this.toEntity(item);
  }

  async update(id: string, dto: UpdateApplicantDto): Promise<ApplicantEntity> {
    const current = await this.findOne(id);
    const firstName = dto.firstName ?? current.firstName;
    const middleName =
      dto.middleName === undefined ? current.middleName : dto.middleName;
    const lastName = dto.lastName ?? current.lastName;

    const item = await this.prisma.applicant.update({
      where: { id },
      data: {
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        fullName: this.buildFullName(firstName, middleName, lastName),
        email: dto.email,
        phone: dto.phone,
        nationalId: dto.nationalId,
        nationality: dto.nationality,
        currentCompany: dto.currentCompany,
        currentTitle: dto.currentTitle,
        resumeUrl: dto.resumeUrl,
        status: dto.status,
        notes: dto.notes,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.applicant.delete({ where: { id } });

    return { success: true, deletedApplicant: item };
  }
}
