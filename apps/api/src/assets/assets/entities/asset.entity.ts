import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssetStatus } from '@prisma/client';

export class AssetEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiPropertyOptional({ nullable: true })
  categoryId!: string | null;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  serialNumber!: string | null;

  @ApiPropertyOptional({ nullable: true })
  purchaseDate!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  purchaseCost!: number | null;

  @ApiPropertyOptional({ nullable: true })
  currentValue!: number | null;

  @ApiPropertyOptional({ nullable: true })
  location!: string | null;

  @ApiProperty({ enum: AssetStatus })
  status!: AssetStatus;

  @ApiPropertyOptional({ nullable: true })
  notes!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<AssetEntity>) {
    Object.assign(this, partial);
  }
}
