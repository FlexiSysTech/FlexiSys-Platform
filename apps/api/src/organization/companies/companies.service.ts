import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from './entities/company.entity';

type CompanyRecord = {
  id: string;
  code: string;
  name: string;
  legalName: string | null;
  commercialRegistration: string | null;
  taxNumber: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(company: CompanyRecord): CompanyEntity {
    return new CompanyEntity({
      id: company.id,
      code: company.code,
      name: company.name,
      legalName: company.legalName,
      commercialRegistration: company.commercialRegistration,
      taxNumber: company.taxNumber,
      phone: company.phone,
      email: company.email,
      website: company.website,
      address: company.address,
      city: company.city,
      country: company.country,
      status: company.status,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    });
  }

  async findAll(): Promise<CompanyEntity[]> {
    const companies = await this.prisma.company.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return companies.map((company) => this.toEntity(company));
  }

  async findOne(id: string): Promise<CompanyEntity> {
    const company = await this.prisma.company.findUnique({
      where: {
        id,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.toEntity(company);
  }

  async create(dto: CreateCompanyDto): Promise<CompanyEntity> {
    const existingCompany = await this.prisma.company.findUnique({
      where: {
        code: dto.code,
      },
    });

    if (existingCompany) {
      throw new ConflictException('Company code already exists');
    }

    const company = await this.prisma.company.create({
      data: {
        code: dto.code,
        name: dto.name,
        legalName: dto.legalName,
        commercialRegistration: dto.commercialRegistration,
        taxNumber: dto.taxNumber,
        phone: dto.phone,
        email: dto.email,
        website: dto.website,
        address: dto.address,
        city: dto.city,
        country: dto.country,
        status: dto.status ?? 'ACTIVE',
      },
    });

    return this.toEntity(company);
  }

  async update(
    id: string,
    dto: UpdateCompanyDto,
  ): Promise<CompanyEntity> {
    await this.findOne(id);

    if (dto.code) {
      const existingCompany = await this.prisma.company.findFirst({
        where: {
          id: {
            not: id,
          },
          code: dto.code,
        },
      });

      if (existingCompany) {
        throw new ConflictException('Company code already exists');
      }
    }

    const company = await this.prisma.company.update({
      where: {
        id,
      },
      data: {
        code: dto.code,
        name: dto.name,
        legalName: dto.legalName,
        commercialRegistration: dto.commercialRegistration,
        taxNumber: dto.taxNumber,
        phone: dto.phone,
        email: dto.email,
        website: dto.website,
        address: dto.address,
        city: dto.city,
        country: dto.country,
        status: dto.status,
      },
    });

    return this.toEntity(company);
  }

  async remove(id: string): Promise<{
    success: boolean;
    deletedCompany: CompanyEntity;
  }> {
    const company = await this.findOne(id);

    await this.prisma.company.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      deletedCompany: company,
    };
  }
}
