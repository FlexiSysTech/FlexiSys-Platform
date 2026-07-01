import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PerformanceCycleStatus } from '@prisma/client';

export class PerformanceCycleEntity {
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

  @ApiProperty()
  startDate!: Date;

  @ApiProperty()
  endDate!: Date;

  @ApiProperty({ enum: PerformanceCycleStatus })
  status!: PerformanceCycleStatus;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<PerformanceCycleEntity>) {
    Object.assign(this, partial);
  }
}
