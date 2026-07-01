import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApplicantStatus } from '@prisma/client';

export class ApplicantEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  firstName!: string;

  @ApiPropertyOptional({ nullable: true })
  middleName!: string | null;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  fullName!: string;

  @ApiPropertyOptional({ nullable: true })
  email!: string | null;

  @ApiPropertyOptional({ nullable: true })
  phone!: string | null;

  @ApiPropertyOptional({ nullable: true })
  nationalId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  nationality!: string | null;

  @ApiPropertyOptional({ nullable: true })
  currentCompany!: string | null;

  @ApiPropertyOptional({ nullable: true })
  currentTitle!: string | null;

  @ApiPropertyOptional({ nullable: true })
  resumeUrl!: string | null;

  @ApiProperty({ enum: ApplicantStatus })
  status!: ApplicantStatus;

  @ApiPropertyOptional({ nullable: true })
  notes!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<ApplicantEntity>) {
    Object.assign(this, partial);
  }
}
