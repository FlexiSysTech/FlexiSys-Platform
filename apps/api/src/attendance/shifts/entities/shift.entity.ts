import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ShiftStatus } from '@prisma/client';

export class ShiftEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiPropertyOptional({ nullable: true })
  branchId!: string | null;

  @ApiProperty({ example: 'MORNING' })
  code!: string;

  @ApiProperty({ example: 'Morning Shift' })
  name!: string;

  @ApiProperty({ example: '08:00' })
  startTime!: string;

  @ApiProperty({ example: '17:00' })
  endTime!: string;

  @ApiProperty({ example: 60 })
  breakMinutes!: number;

  @ApiProperty({ example: 10 })
  graceMinutes!: number;

  @ApiProperty({ enum: ShiftStatus })
  status!: ShiftStatus;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<ShiftEntity>) {
    Object.assign(this, partial);
  }
}
