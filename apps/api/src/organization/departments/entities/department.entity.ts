import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrganizationStatus } from '@prisma/client';

export class DepartmentEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiPropertyOptional({ nullable: true })
  branchId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  parentId!: string | null;

  @ApiProperty({ example: 'HR' })
  code!: string;

  @ApiProperty({ example: 'Human Resources' })
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty({ enum: OrganizationStatus })
  status!: OrganizationStatus;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<DepartmentEntity>) {
    Object.assign(this, partial);
  }
}
