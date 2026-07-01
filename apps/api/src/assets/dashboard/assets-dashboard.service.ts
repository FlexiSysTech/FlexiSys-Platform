import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AssetsDashboardEntity } from './entities/assets-dashboard.entity';

@Injectable()
export class AssetsDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(): Promise<AssetsDashboardEntity> {
    const [
      totalAssets,
      availableAssets,
      assignedAssets,
      maintenanceAssets,
      retiredAssets,
      lostAssets,
      assets,
      maintenances,
    ] = await Promise.all([
      this.prisma.asset.count(),
      this.prisma.asset.count({ where: { status: 'AVAILABLE' } }),
      this.prisma.asset.count({ where: { status: 'ASSIGNED' } }),
      this.prisma.asset.count({ where: { status: 'MAINTENANCE' } }),
      this.prisma.asset.count({ where: { status: 'RETIRED' } }),
      this.prisma.asset.count({ where: { status: 'LOST' } }),
      this.prisma.asset.findMany({ select: { purchaseCost: true, currentValue: true } }),
      this.prisma.assetMaintenance.findMany({ select: { cost: true } }),
    ]);

    const totalPurchaseCost = assets.reduce(
      (sum, asset) => sum + (asset.purchaseCost?.toNumber() ?? 0),
      0,
    );

    const totalCurrentValue = assets.reduce(
      (sum, asset) => sum + (asset.currentValue?.toNumber() ?? 0),
      0,
    );

    const maintenanceCost = maintenances.reduce(
      (sum, record) => sum + (record.cost?.toNumber() ?? 0),
      0,
    );

    return new AssetsDashboardEntity({
      totalAssets,
      availableAssets,
      assignedAssets,
      maintenanceAssets,
      retiredAssets,
      lostAssets,
      totalPurchaseCost,
      totalCurrentValue,
      maintenanceCost,
    });
  }
}
