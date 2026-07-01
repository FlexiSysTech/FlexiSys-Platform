import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PayrollRunStatus } from '@prisma/client';

export class PayrollRunEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiPropertyOptional({ nullable: true })
  periodId!: string | null;

  @ApiProperty()
  year!: number;

  @ApiProperty()
  month!: number;

  @ApiProperty({ enum: PayrollRunStatus })
  status!: PayrollRunStatus;

  @ApiProperty()
  grossSalary!: number;

  @ApiProperty()
  taxableSalary!: number;

  @ApiProperty()
  totalDeductions!: number;

  @ApiProperty()
  netSalary!: number;

  @ApiProperty()
  employerCost!: number;

  @ApiPropertyOptional({ nullable: true })
  startedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  reviewedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  reviewedById!: string | null;

  @ApiPropertyOptional({ nullable: true })
  approvedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  approvedById!: string | null;

  @ApiPropertyOptional({ nullable: true })
  rejectedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  rejectedReason!: string | null;

  @ApiPropertyOptional({ nullable: true })
  lockedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  paidAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  notes!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<PayrollRunEntity>) {
    Object.assign(this, partial);
  }
}
