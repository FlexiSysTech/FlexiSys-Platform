import { ApiProperty } from '@nestjs/swagger';
import { PayrollPeriodStatus } from '@prisma/client';

export class PayrollPeriodEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  startDate!: Date;

  @ApiProperty()
  endDate!: Date;

  @ApiProperty({ enum: PayrollPeriodStatus })
  status!: PayrollPeriodStatus;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<PayrollPeriodEntity>) {
    Object.assign(this, partial);
  }
}
