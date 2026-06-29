import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrganizationStatus } from '@prisma/client';

export class BranchEntity {
  @ApiProperty({ example: 'clx123456789' })
  id!: string;

  @ApiProperty({ example: 'company_id' })
  companyId!: string;

  @ApiProperty({ example: 'MAIN' })
  code!: string;

  @ApiProperty({ example: 'Main Branch' })
  name!: string;

  @ApiPropertyOptional({ example: '+966500000000', nullable: true })
  phone!: string | null;

  @ApiPropertyOptional({ example: 'branch@flexisys.com', nullable: true })
  email!: string | null;

  @ApiPropertyOptional({ example: 'King Fahd Road', nullable: true })
  address!: string | null;

  @ApiPropertyOptional({ example: 'Al Khobar', nullable: true })
  city!: string | null;

  @ApiPropertyOptional({ example: 'Saudi Arabia', nullable: true })
  country!: string | null;

  @ApiProperty({ enum: OrganizationStatus, example: OrganizationStatus.ACTIVE })
  status!: OrganizationStatus;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<BranchEntity>) {
    Object.assign(this, partial);
  }
}
