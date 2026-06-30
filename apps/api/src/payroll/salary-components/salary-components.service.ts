import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import {
  SalaryComponentCalculationType,
  SalaryComponentType,
} from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateSalaryComponentDto } from './dto/create-salary-component.dto';
import { UpdateSalaryComponentDto } from './dto/update-salary-component.dto';
import { SalaryComponentEntity } from './entities/salary-component.entity';

type SalaryComponentRecord = {
  id: string;
  companyId: string;
  code: string;
  name: string;
  description: string | null;
  type: SalaryComponentType;
  calculationType: SalaryComponentCalculationType;
  defaultAmount: Decimal | null;
  defaultPercent: Decimal | null;
  isTaxable: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class SalaryComponentsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: SalaryComponentRecord): SalaryComponentEntity {
    return new SalaryComponentEntity({
      ...item,
      defaultAmount: item.defaultAmount ? item.defaultAmount.toNumber() : null,
      defaultPercent: item.defaultPercent ? item.defaultPercent.toNumber() : null,
    });
  }

  async findAll(): Promise<SalaryComponentEntity[]> {
    const items = await this.prisma.salaryComponent.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<SalaryComponentEntity> {
    const item = await this.prisma.salaryComponent.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Salary component not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateSalaryComponentDto): Promise<SalaryComponentEntity> {
    await this.ensureCompanyExists(dto.companyId);
    await this.ensureCodeIsUnique(dto.companyId, dto.code);

    const item = await this.prisma.salaryComponent.create({
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        type: dto.type,
        calculationType: dto.calculationType ?? 'FIXED',
        defaultAmount: dto.defaultAmount,
        defaultPercent: dto.defaultPercent,
        isTaxable: dto.isTaxable ?? false,
        isActive: dto.isActive ?? true,
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdateSalaryComponentDto,
  ): Promise<SalaryComponentEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.companyId || dto.code) {
      await this.ensureCodeIsUnique(companyId, code, id);
    }

    const item = await this.prisma.salaryComponent.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        type: dto.type,
        calculationType: dto.calculationType,
        defaultAmount: dto.defaultAmount,
        defaultPercent: dto.defaultPercent,
        isTaxable: dto.isTaxable,
        isActive: dto.isActive,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.salaryComponent.delete({ where: { id } });

    return {
      success: true,
      deletedSalaryComponent: item,
    };
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');
  }

  private async ensureCodeIsUnique(
    companyId: string,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.salaryComponent.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (item) {
      throw new ConflictException(
        'Salary component code already exists in this company',
      );
    }
  }
}
