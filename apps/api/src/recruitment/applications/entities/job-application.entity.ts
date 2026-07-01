import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobApplicationStatus } from '@prisma/client';

export class JobApplicationEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  vacancyId!: string;

  @ApiProperty()
  applicantId!: string;

  @ApiPropertyOptional({ nullable: true })
  employeeId!: string | null;

  @ApiProperty({ enum: JobApplicationStatus })
  status!: JobApplicationStatus;

  @ApiPropertyOptional({ nullable: true })
  source!: string | null;

  @ApiProperty()
  appliedAt!: Date;

  @ApiPropertyOptional({ nullable: true })
  hiredAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  rejectedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  notes!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<JobApplicationEntity>) {
    Object.assign(this, partial);
  }
}
