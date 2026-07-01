import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RecruitmentStatus } from '@prisma/client';

export class JobPositionEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  title!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty({ enum: RecruitmentStatus })
  status!: RecruitmentStatus;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<JobPositionEntity>) {
    Object.assign(this, partial);
  }
}
