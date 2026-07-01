import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateAssetCategoryDto } from './dto/create-asset-category.dto';
import { UpdateAssetCategoryDto } from './dto/update-asset-category.dto';
import { AssetCategoryEntity } from './entities/asset-category.entity';

type AssetCategoryRecord = {
  id: string;
  companyId: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AssetCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: AssetCategoryRecord): AssetCategoryEntity {
    return new AssetCategoryEntity(item);
  }

  async findAll(): Promise<AssetCategoryEntity[]> {
    const items = await this.prisma.assetCategory.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<AssetCategoryEntity> {
    const item = await this.prisma.assetCategory.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Asset category not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateAssetCategoryDto): Promise<AssetCategoryEntity> {
    await this.ensureCompanyExists(dto.companyId);
    await this.ensureCodeIsUnique(dto.companyId, dto.code);

    const item = await this.prisma.assetCategory.create({
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        isActive: dto.isActive ?? true,
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdateAssetCategoryDto,
  ): Promise<AssetCategoryEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.companyId || dto.code) {
      await this.ensureCodeIsUnique(companyId, code, id);
    }

    const item = await this.prisma.assetCategory.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        isActive: dto.isActive,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.assetCategory.delete({ where: { id } });

    return {
      success: true,
      deletedAssetCategory: item,
    };
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const company = await this.prisma.company.findUnique({
      where: { id },
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
    const item = await this.prisma.assetCategory.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (item) {
      throw new ConflictException(
        'Asset category code already exists in this company',
      );
    }
  }
}
