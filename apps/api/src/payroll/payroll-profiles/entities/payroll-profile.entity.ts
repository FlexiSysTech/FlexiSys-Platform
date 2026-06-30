import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PayrollProfileEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  employeeId!: string;

  @ApiProperty()
  basicSalary!: number;

  @ApiProperty()
  housingAllowance!: number;

  @ApiProperty()
  transportAllowance!: number;

  @ApiProperty()
  otherAllowance!: number;

  @ApiPropertyOptional({ nullable: true })
  bankName!: string | null;

  @ApiPropertyOptional({ nullable: true })
  bankIban!: string | null;

  @ApiProperty()
  effectiveFrom!: Date;

  @ApiPropertyOptional({ nullable: true })
  effectiveTo!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<PayrollProfileEntity>) {
    Object.assign(this, partial);
  }
}
