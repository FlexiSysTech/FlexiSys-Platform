import { ApiProperty } from '@nestjs/swagger';

export class PayrollAttendanceImpactEntity {
  @ApiProperty()
  payrollRunId!: string;

  @ApiProperty()
  employeesProcessed!: number;

  @ApiProperty()
  overtimeItems!: number;

  @ApiProperty()
  absenceItems!: number;

  @ApiProperty()
  lateItems!: number;

  @ApiProperty()
  approvedLeaveDays!: number;

  constructor(partial: Partial<PayrollAttendanceImpactEntity>) {
    Object.assign(this, partial);
  }
}
