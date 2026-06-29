import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrganizationStatus } from '@prisma/client';

export class PositionEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiPropertyOptional({ nullable: true })
  departmentId!: string | null;

  @ApiProperty({ example: 'HR_MANAGER' })
  code!: string;

  @ApiProperty({ example: 'HR Manager' })
  title!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty({ enum: OrganizationStatus })
  status!: OrganizationStatus;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<PositionEntity>) {
    Object.assign(this, partial);
  }
}
