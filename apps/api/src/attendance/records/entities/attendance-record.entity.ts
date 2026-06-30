import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttendanceStatus } from '@prisma/client';

export class AttendanceRecordEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  employeeId!: string;

  @ApiPropertyOptional({ nullable: true })
  shiftId!: string | null;

  @ApiProperty()
  attendanceDate!: Date;

  @ApiPropertyOptional({ nullable: true })
  checkInAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  checkOutAt!: Date | null;

  @ApiProperty({ enum: AttendanceStatus })
  status!: AttendanceStatus;

  @ApiProperty()
  lateMinutes!: number;

  @ApiProperty()
  overtimeMinutes!: number;

  @ApiPropertyOptional({ nullable: true })
  notes!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<AttendanceRecordEntity>) {
    Object.assign(this, partial);
  }
}
