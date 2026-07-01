import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VacancyStatus } from '@prisma/client';

export class VacancyEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiProperty()
  jobPositionId!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  title!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty()
  openings!: number;

  @ApiProperty({ enum: VacancyStatus })
  status!: VacancyStatus;

  @ApiPropertyOptional({ nullable: true })
  openedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  closedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<VacancyEntity>) {
    Object.assign(this, partial);
  }
}
