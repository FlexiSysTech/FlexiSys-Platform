import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionEntity } from './entities/position.entity';

type PositionRecord = {
  id: string;
  companyId: string;
  departmentId: string | null;
  code: string;
  title: string;
  description: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PositionsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: PositionRecord): PositionEntity {
    return new PositionEntity(item);
  }

  async findAll(): Promise<PositionEntity[]> {
    const items = await this.prisma.position.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<PositionEntity> {
    const item = await this.prisma.position.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Position not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreatePositionDto): Promise<PositionEntity> {
    await this.ensureCompanyExists(dto.companyId);

    if (dto.departmentId) {
      await this.ensureDepartmentExists(dto.departmentId);
    }

    await this.ensureCodeIsUnique(dto.companyId, dto.code);

    const item = await this.prisma.position.create({
      data: {
        companyId: dto.companyId,
        departmentId: dto.departmentId,
        code: dto.code,
        title: dto.title,
        description: dto.description,
        status: dto.status ?? 'ACTIVE',
      },
    });

    return this.toEntity(item);
  }

  async update(id: string, dto: UpdatePositionDto): Promise<PositionEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.departmentId) {
      await this.ensureDepartmentExists(dto.departmentId);
    }

    if (dto.companyId || dto.code) {
      await this.ensureCodeIsUnique(companyId, code, id);
    }

    const item = await this.prisma.position.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        departmentId: dto.departmentId,
        code: dto.code,
        title: dto.title,
        description: dto.description,
        status: dto.status,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string): Promise<{
    success: boolean;
    deletedPosition: PositionEntity;
  }> {
    const item = await this.findOne(id);

    await this.prisma.position.delete({ where: { id } });

    return {
      success: true,
      deletedPosition: item,
    };
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const exists = await this.prisma.company.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException('Company not found');
    }
  }

  private async ensureDepartmentExists(id: string): Promise<void> {
    const exists = await this.prisma.department.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException('Department not found');
    }
  }

  private async ensureCodeIsUnique(
    companyId: string,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.position.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (item) {
      throw new ConflictException(
        'Position code already exists in this company',
      );
    }
  }
}
