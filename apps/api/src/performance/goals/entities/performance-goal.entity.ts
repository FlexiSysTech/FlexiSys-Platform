import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PerformanceGoalStatus } from '@prisma/client';

export class PerformanceGoalEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  cycleId!: string;

  @ApiProperty()
  employeeId!: string;

  @ApiProperty()
  title!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty()
  weight!: number;

  @ApiPropertyOptional({ nullable: true })
  targetValue!: number | null;

  @ApiPropertyOptional({ nullable: true })
  actualValue!: number | null;

  @ApiProperty({ enum: PerformanceGoalStatus })
  status!: PerformanceGoalStatus;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<PerformanceGoalEntity>) {
    Object.assign(this, partial);
  }
}
