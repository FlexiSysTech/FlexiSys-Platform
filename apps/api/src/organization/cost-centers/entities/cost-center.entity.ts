import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrganizationStatus } from '@prisma/client';

export class CostCenterEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiPropertyOptional({ nullable: true })
  branchId!: string | null;

  @ApiProperty({ example: 'CC-HR' })
  code!: string;

  @ApiProperty({ example: 'HR Cost Center' })
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty({ enum: OrganizationStatus })
  status!: OrganizationStatus;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<CostCenterEntity>) {
    Object.assign(this, partial);
  }
}
