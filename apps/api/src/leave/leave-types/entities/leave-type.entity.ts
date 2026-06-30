import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LeaveTypeStatus } from '@prisma/client';

export class LeaveTypeEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiPropertyOptional({ nullable: true })
  annualAllowanceDays!: number | null;

  @ApiProperty()
  requiresApproval!: boolean;

  @ApiProperty()
  isPaid!: boolean;

  @ApiProperty({ enum: LeaveTypeStatus })
  status!: LeaveTypeStatus;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<LeaveTypeEntity>) {
    Object.assign(this, partial);
  }
}
