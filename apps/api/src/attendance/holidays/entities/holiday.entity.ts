import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HolidayEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiPropertyOptional({ nullable: true })
  branchId!: string | null;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  holidayDate!: Date;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<HolidayEntity>) {
    Object.assign(this, partial);
  }
}
