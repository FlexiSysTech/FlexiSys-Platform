import { ApiProperty } from '@nestjs/swagger';

export class LeaveBalanceEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiProperty()
  employeeId!: string;

  @ApiProperty()
  leaveTypeId!: string;

  @ApiProperty()
  year!: number;

  @ApiProperty()
  openingBalance!: number;

  @ApiProperty()
  accrued!: number;

  @ApiProperty()
  used!: number;

  @ApiProperty()
  adjusted!: number;

  @ApiProperty()
  available!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<LeaveBalanceEntity>) {
    Object.assign(this, partial);
  }
}
