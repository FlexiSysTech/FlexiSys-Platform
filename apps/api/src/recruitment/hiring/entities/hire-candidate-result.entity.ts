import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HireCandidateResultEntity {
  @ApiProperty()
  success!: boolean;

  @ApiProperty()
  employeeId!: string;

  @ApiPropertyOptional({ nullable: true })
  userId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  payrollProfileId!: string | null;

  @ApiProperty()
  applicationId!: string;

  @ApiProperty()
  applicantId!: string;

  constructor(partial: Partial<HireCandidateResultEntity>) {
    Object.assign(this, partial);
  }
}
