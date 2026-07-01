import { ApiProperty } from '@nestjs/swagger';

export class AssetsDashboardEntity {
  @ApiProperty()
  totalAssets!: number;
  @ApiProperty()
  availableAssets!: number;
  @ApiProperty()
  assignedAssets!: number;
  @ApiProperty()
  maintenanceAssets!: number;
  @ApiProperty()
  retiredAssets!: number;
  @ApiProperty()
  lostAssets!: number;
  @ApiProperty()
  totalPurchaseCost!: number;
  @ApiProperty()
  totalCurrentValue!: number;
  @ApiProperty()
  maintenanceCost!: number;

  constructor(partial: Partial<AssetsDashboardEntity>) {
    Object.assign(this, partial);
  }
}
