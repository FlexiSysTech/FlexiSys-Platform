import { Injectable, NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { AssetMaintenanceStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateAssetMaintenanceDto } from './dto/create-asset-maintenance.dto';
import { UpdateAssetMaintenanceDto } from './dto/update-asset-maintenance.dto';
import { AssetMaintenanceEntity } from './entities/asset-maintenance.entity';

type AssetMaintenanceRecord = {
  id: string;
  assetId: string;
  title: string;
  description: string | null;
  vendorName: string | null;
  cost: Decimal | null;
  scheduledDate: Date | null;
  completedDate: Date | null;
  status: AssetMaintenanceStatus;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AssetMaintenanceService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: AssetMaintenanceRecord): AssetMaintenanceEntity {
    return new AssetMaintenanceEntity({
      ...item,
      cost: item.cost ? item.cost.toNumber() : null,
    });
  }

  async findAll(): Promise<AssetMaintenanceEntity[]> {
    const items = await this.prisma.assetMaintenance.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<AssetMaintenanceEntity> {
    const item = await this.prisma.assetMaintenance.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Asset maintenance record not found');
    return this.toEntity(item);
  }

  async create(dto: CreateAssetMaintenanceDto): Promise<AssetMaintenanceEntity> {
    await this.ensureAssetExists(dto.assetId);

    const item = await this.prisma.$transaction(async (tx) => {
      const maintenance = await tx.assetMaintenance.create({
        data: {
          assetId: dto.assetId,
          title: dto.title,
          description: dto.description,
          vendorName: dto.vendorName,
          cost: dto.cost,
          scheduledDate: dto.scheduledDate ? new Date(dto.scheduledDate) : undefined,
          status: dto.status ?? 'SCHEDULED',
        },
      });

      if ((dto.status ?? 'SCHEDULED') === 'IN_PROGRESS') {
        await tx.asset.update({
          where: { id: dto.assetId },
          data: { status: 'MAINTENANCE' },
        });
      }

      return maintenance;
    });

    return this.toEntity(item);
  }

  async update(id: string, dto: UpdateAssetMaintenanceDto): Promise<AssetMaintenanceEntity> {
    const current = await this.findOne(id);
    if (dto.assetId) await this.ensureAssetExists(dto.assetId);

    const assetId = dto.assetId ?? current.assetId;

    const item = await this.prisma.$transaction(async (tx) => {
      const maintenance = await tx.assetMaintenance.update({
        where: { id },
        data: {
          assetId: dto.assetId,
          title: dto.title,
          description: dto.description,
          vendorName: dto.vendorName,
          cost: dto.cost,
          scheduledDate: dto.scheduledDate ? new Date(dto.scheduledDate) : undefined,
          completedDate: dto.completedDate ? new Date(dto.completedDate) : undefined,
          status: dto.status,
        },
      });

      if (dto.status === 'IN_PROGRESS') {
        await tx.asset.update({ where: { id: assetId }, data: { status: 'MAINTENANCE' } });
      }

      if (dto.status === 'COMPLETED') {
        await tx.asset.update({ where: { id: assetId }, data: { status: 'AVAILABLE' } });
      }

      return maintenance;
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.prisma.assetMaintenance.delete({ where: { id } });
    return { success: true, deletedAssetMaintenance: item };
  }

  private async ensureAssetExists(id: string): Promise<void> {
    const item = await this.prisma.asset.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!item) throw new NotFoundException('Asset not found');
  }
}
