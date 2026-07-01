import { ApiProperty } from '@nestjs/swagger';

export class PayrollDashboardEntity {
  @ApiProperty()
  totalRuns!: number;

  @ApiProperty()
  processingRuns!: number;

  @ApiProperty()
  approvedRuns!: number;

  @ApiProperty()
  lockedRuns!: number;

  @ApiProperty()
  paidRuns!: number;

  @ApiProperty()
  totalGrossSalary!: number;

  @ApiProperty()
  totalDeductions!: number;

  @ApiProperty()
  totalNetSalary!: number;

  @ApiProperty()
  totalEmployerCost!: number;

  constructor(partial: Partial<PayrollDashboardEntity>) {
    Object.assign(this, partial);
  }
}
