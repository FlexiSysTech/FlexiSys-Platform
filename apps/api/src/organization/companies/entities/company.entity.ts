import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrganizationStatus } from '@prisma/client';

export class CompanyEntity {
  @ApiProperty({
    example: 'clx123456789',
  })
  id!: string;

  @ApiProperty({
    example: 'FANATK',
  })
  code!: string;

  @ApiProperty({
    example: 'Fanatk Chocolate',
  })
  name!: string;

  @ApiPropertyOptional({
    example: 'Fanatk Chocolate Trading Company',
    nullable: true,
  })
  legalName!: string | null;

  @ApiPropertyOptional({
    example: '1010123456',
    nullable: true,
  })
  commercialRegistration!: string | null;

  @ApiPropertyOptional({
    example: '300123456700003',
    nullable: true,
  })
  taxNumber!: string | null;

  @ApiPropertyOptional({
    example: '+966500000000',
    nullable: true,
  })
  phone!: string | null;

  @ApiPropertyOptional({
    example: 'info@fanatk.com',
    nullable: true,
  })
  email!: string | null;

  @ApiPropertyOptional({
    example: 'https://fanatk.com',
    nullable: true,
  })
  website!: string | null;

  @ApiPropertyOptional({
    example: 'King Fahd Road',
    nullable: true,
  })
  address!: string | null;

  @ApiPropertyOptional({
    example: 'Al Khobar',
    nullable: true,
  })
  city!: string | null;

  @ApiPropertyOptional({
    example: 'Saudi Arabia',
    nullable: true,
  })
  country!: string | null;

  @ApiProperty({
    enum: OrganizationStatus,
    example: OrganizationStatus.ACTIVE,
  })
  status!: OrganizationStatus;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<CompanyEntity>) {
    Object.assign(this, partial);
  }
}
