import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateCostCenterDto } from './dto/create-cost-center.dto';
import { UpdateCostCenterDto } from './dto/update-cost-center.dto';
import { CostCenterEntity } from './entities/cost-center.entity';

type CostCenterRecord = {
  id: string;
  companyId: string;
  branchId: string | null;
  code: string;
  name: string;
  description: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class CostCentersService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: CostCenterRecord): CostCenterEntity {
    return new CostCenterEntity(item);
  }

  async findAll(): Promise<CostCenterEntity[]> {
    const items = await this.prisma.costCenter.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<CostCenterEntity> {
    const item = await this.prisma.costCenter.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Cost center not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateCostCenterDto): Promise<CostCenterEntity> {
    await this.ensureCompanyExists(dto.companyId);

    if (dto.branchId) {
      await this.ensureBranchExists(dto.branchId);
    }

    await this.ensureCodeIsUnique(dto.companyId, dto.code);

    const item = await this.prisma.costCenter.create({
      data: {
        companyId: dto.companyId,
        branchId: dto.branchId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        status: dto.status ?? 'ACTIVE',
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdateCostCenterDto,
  ): Promise<CostCenterEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.branchId) {
      await this.ensureBranchExists(dto.branchId);
    }

    if (dto.companyId || dto.code) {
      await this.ensureCodeIsUnique(companyId, code, id);
    }

    const item = await this.prisma.costCenter.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        branchId: dto.branchId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        status: dto.status,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string): Promise<{
    success: boolean;
    deletedCostCenter: CostCenterEntity;
  }> {
    const item = await this.findOne(id);

    await this.prisma.costCenter.delete({ where: { id } });

    return {
      success: true,
      deletedCostCenter: item,
    };
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const exists = await this.prisma.company.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException('Company not found');
    }
  }

  private async ensureBranchExists(id: string): Promise<void> {
    const exists = await this.prisma.branch.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException('Branch not found');
    }
  }

  private async ensureCodeIsUnique(
    companyId: string,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.costCenter.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (item) {
      throw new ConflictException(
        'Cost center code already exists in this company',
      );
    }
  }
}
