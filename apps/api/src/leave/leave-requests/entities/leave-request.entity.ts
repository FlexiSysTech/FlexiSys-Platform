import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LeaveRequestStatus } from '@prisma/client';

export class LeaveRequestEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  employeeId!: string;

  @ApiProperty()
  leaveTypeId!: string;

  @ApiProperty()
  startDate!: Date;

  @ApiProperty()
  endDate!: Date;

  @ApiProperty()
  totalDays!: number;

  @ApiPropertyOptional({ nullable: true })
  reason!: string | null;

  @ApiProperty({ enum: LeaveRequestStatus })
  status!: LeaveRequestStatus;

  @ApiProperty()
  submittedAt!: Date;

  @ApiPropertyOptional({ nullable: true })
  approvedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  rejectedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  cancelledAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<LeaveRequestEntity>) {
    Object.assign(this, partial);
  }
}
