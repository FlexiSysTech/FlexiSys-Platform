import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PayrollRunStatus } from '@prisma/client';

export class PayrollRunEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiProperty()
  year!: number;

  @ApiProperty()
  month!: number;

  @ApiProperty({ enum: PayrollRunStatus })
  status!: PayrollRunStatus;

  @ApiPropertyOptional({ nullable: true })
  startedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  approvedAt!: Date | null;

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
