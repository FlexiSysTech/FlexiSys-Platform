import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { BranchEntity } from './entities/branch.entity';

type BranchRecord = {
  id: string;
  companyId: string;
  code: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(branch: BranchRecord): BranchEntity {
    return new BranchEntity(branch);
  }

  async findAll(): Promise<BranchEntity[]> {
    const branches = await this.prisma.branch.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return branches.map((branch) => this.toEntity(branch));
  }

  async findOne(id: string): Promise<BranchEntity> {
    const branch = await this.prisma.branch.findUnique({ where: { id } });

    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    return this.toEntity(branch);
  }

  async create(dto: CreateBranchDto): Promise<BranchEntity> {
    await this.ensureCompanyExists(dto.companyId);
    await this.ensureCodeIsUnique(dto.companyId, dto.code);

    const branch = await this.prisma.branch.create({
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        address: dto.address,
        city: dto.city,
        country: dto.country,
        status: dto.status ?? 'ACTIVE',
      },
    });

    return this.toEntity(branch);
  }

  async update(id: string, dto: UpdateBranchDto): Promise<BranchEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.companyId || dto.code) {
      await this.ensureCodeIsUnique(companyId, code, id);
    }

    const branch = await this.prisma.branch.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        address: dto.address,
        city: dto.city,
        country: dto.country,
        status: dto.status,
      },
    });

    return this.toEntity(branch);
  }

  async remove(id: string): Promise<{
    success: boolean;
    deletedBranch: BranchEntity;
  }> {
    const branch = await this.findOne(id);

    await this.prisma.branch.delete({ where: { id } });

    return {
      success: true,
      deletedBranch: branch,
    };
  }

  private async ensureCompanyExists(companyId: string): Promise<void> {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      select: { id: true },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }
  }

  private async ensureCodeIsUnique(
    companyId: string,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const branch = await this.prisma.branch.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (branch) {
      throw new ConflictException('Branch code already exists in this company');
    }
  }
}
