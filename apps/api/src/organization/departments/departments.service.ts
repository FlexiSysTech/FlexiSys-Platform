import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentEntity } from './entities/department.entity';

type DepartmentRecord = {
  id: string;
  companyId: string;
  branchId: string | null;
  parentId: string | null;
  code: string;
  name: string;
  description: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: DepartmentRecord): DepartmentEntity {
    return new DepartmentEntity(item);
  }

  async findAll(): Promise<DepartmentEntity[]> {
    const items = await this.prisma.department.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<DepartmentEntity> {
    const item = await this.prisma.department.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Department not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateDepartmentDto): Promise<DepartmentEntity> {
    await this.ensureCompanyExists(dto.companyId);

    if (dto.branchId) {
      await this.ensureBranchExists(dto.branchId);
    }

    if (dto.parentId) {
      await this.ensureDepartmentExists(dto.parentId);
    }

    await this.ensureCodeIsUnique(dto.companyId, dto.code);

    const item = await this.prisma.department.create({
      data: {
        companyId: dto.companyId,
        branchId: dto.branchId,
        parentId: dto.parentId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        status: dto.status ?? 'ACTIVE',
      },
    });

    return this.toEntity(item);
  }

  async update(id: string, dto: UpdateDepartmentDto): Promise<DepartmentEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.branchId) {
      await this.ensureBranchExists(dto.branchId);
    }

    if (dto.parentId) {
      if (dto.parentId === id) {
        throw new ConflictException('Department cannot be parent of itself');
      }

      await this.ensureDepartmentExists(dto.parentId);
    }

    if (dto.companyId || dto.code) {
      await this.ensureCodeIsUnique(companyId, code, id);
    }

    const item = await this.prisma.department.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        branchId: dto.branchId,
        parentId: dto.parentId,
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
    deletedDepartment: DepartmentEntity;
  }> {
    const item = await this.findOne(id);

    await this.prisma.department.delete({ where: { id } });

    return {
      success: true,
      deletedDepartment: item,
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

  private async ensureDepartmentExists(id: string): Promise<void> {
    const exists = await this.prisma.department.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException('Parent department not found');
    }
  }

  private async ensureCodeIsUnique(
    companyId: string,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.department.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (item) {
      throw new ConflictException(
        'Department code already exists in this company',
      );
    }
  }
}
