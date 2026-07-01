import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssetAssignmentStatus } from '@prisma/client';

export class AssetAssignmentEntity {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  assetId!: string;
  @ApiProperty()
  employeeId!: string;
  @ApiProperty()
  assignedAt!: Date;
  @ApiPropertyOptional({ nullable: true })
  returnedAt!: Date | null;
  @ApiProperty({ enum: AssetAssignmentStatus })
  status!: AssetAssignmentStatus;
  @ApiPropertyOptional({ nullable: true })
  conditionOut!: string | null;
  @ApiPropertyOptional({ nullable: true })
  conditionIn!: string | null;
  @ApiPropertyOptional({ nullable: true })
  notes!: string | null;
  @ApiProperty()
  createdAt!: Date;
  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<AssetAssignmentEntity>) {
    Object.assign(this, partial);
  }
}
