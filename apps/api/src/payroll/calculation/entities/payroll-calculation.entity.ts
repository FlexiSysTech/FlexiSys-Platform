import { ApiProperty } from '@nestjs/swagger';

export class PayrollEmployeeCalculationEntity {
  @ApiProperty()
  employeeId!: string;

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

  @ApiProperty()
  itemCount!: number;

  constructor(partial: Partial<PayrollEmployeeCalculationEntity>) {
    Object.assign(this, partial);
  }
}

export class PayrollCalculationEntity {
  @ApiProperty()
  payrollRunId!: string;

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

  @ApiProperty({ type: [PayrollEmployeeCalculationEntity] })
  employees!: PayrollEmployeeCalculationEntity[];

  constructor(partial: Partial<PayrollCalculationEntity>) {
    Object.assign(this, partial);
  }
}
