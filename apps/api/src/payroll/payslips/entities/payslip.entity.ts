import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PayslipStatus, Prisma } from '@prisma/client';

export class PayslipEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  payrollRunId!: string;

  @ApiProperty()
  employeeId!: string;

  @ApiProperty()
  grossEarnings!: number;

  @ApiProperty()
  taxableSalary!: number;

  @ApiProperty()
  totalDeductions!: number;

  @ApiProperty()
  netPay!: number;

  @ApiProperty()
  employerCost!: number;

  @ApiProperty()
  currency!: string;

  @ApiPropertyOptional({ nullable: true })
  pdfPayload!: Prisma.JsonValue | null;

  @ApiProperty()
  employeeVisible!: boolean;

  @ApiProperty({ enum: PayslipStatus })
  status!: PayslipStatus;

  @ApiPropertyOptional({ nullable: true })
  issuedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  paidAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<PayslipEntity>) {
    Object.assign(this, partial);
  }
}
