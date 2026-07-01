import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { AssetStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetEntity } from './entities/asset.entity';

type AssetRecord = {
  id: string;
  companyId: string;
  categoryId: string | null;
  code: string;
  name: string;
  serialNumber: string | null;
  purchaseDate: Date | null;
  purchaseCost: Decimal | null;
  currentValue: Decimal | null;
  location: string | null;
  status: AssetStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AssetsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: AssetRecord): AssetEntity {
    return new AssetEntity({
      ...item,
      purchaseCost: item.purchaseCost ? item.purchaseCost.toNumber() : null,
      currentValue: item.currentValue ? item.currentValue.toNumber() : null,
    });
  }

  async findAll(): Promise<AssetEntity[]> {
    const items = await this.prisma.asset.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<AssetEntity> {
    const item = await this.prisma.asset.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Asset not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateAssetDto): Promise<AssetEntity> {
    await this.ensureCompanyExists(dto.companyId);

    if (dto.categoryId) {
      await this.ensureCategoryExists(dto.categoryId);
    }

    await this.ensureCodeIsUnique(dto.companyId, dto.code);

    const item = await this.prisma.asset.create({
      data: {
        companyId: dto.companyId,
        categoryId: dto.categoryId,
        code: dto.code,
        name: dto.name,
        serialNumber: dto.serialNumber,
        purchaseDate: dto.purchaseDate ? new Date(dto.purchaseDate) : undefined,
        purchaseCost: dto.purchaseCost,
        currentValue: dto.currentValue,
        location: dto.location,
        status: dto.status ?? 'AVAILABLE',
        notes: dto.notes,
      },
    });

    return this.toEntity(item);
  }

  async update(id: string, dto: UpdateAssetDto): Promise<AssetEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.categoryId) {
      await this.ensureCategoryExists(dto.categoryId);
    }

    if (dto.companyId || dto.code) {
      await this.ensureCodeIsUnique(companyId, code, id);
    }

    const item = await this.prisma.asset.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        categoryId: dto.categoryId,
        code: dto.code,
        name: dto.name,
        serialNumber: dto.serialNumber,
        purchaseDate: dto.purchaseDate ? new Date(dto.purchaseDate) : undefined,
        purchaseCost: dto.purchaseCost,
        currentValue: dto.currentValue,
        location: dto.location,
        status: dto.status,
        notes: dto.notes,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.asset.delete({ where: { id } });

    return {
      success: true,
      deletedAsset: item,
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

  private async ensureCategoryExists(id: string): Promise<void> {
    const category = await this.prisma.assetCategory.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!category) {
      throw new NotFoundException('Asset category not found');
    }
  }

  private async ensureCodeIsUnique(
    companyId: string,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.asset.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (item) {
      throw new ConflictException('Asset code already exists in this company');
    }
  }
}
