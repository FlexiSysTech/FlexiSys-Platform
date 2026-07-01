import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssetMaintenanceStatus } from '@prisma/client';

export class AssetMaintenanceEntity {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  assetId!: string;
  @ApiProperty()
  title!: string;
  @ApiPropertyOptional({ nullable: true })
  description!: string | null;
  @ApiPropertyOptional({ nullable: true })
  vendorName!: string | null;
  @ApiPropertyOptional({ nullable: true })
  cost!: number | null;
  @ApiPropertyOptional({ nullable: true })
  scheduledDate!: Date | null;
  @ApiPropertyOptional({ nullable: true })
  completedDate!: Date | null;
  @ApiProperty({ enum: AssetMaintenanceStatus })
  status!: AssetMaintenanceStatus;
  @ApiProperty()
  createdAt!: Date;
  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<AssetMaintenanceEntity>) {
    Object.assign(this, partial);
  }
}
