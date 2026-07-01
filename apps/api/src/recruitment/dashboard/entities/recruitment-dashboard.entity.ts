import { ApiProperty } from '@nestjs/swagger';

export class RecruitmentDashboardEntity {
  @ApiProperty()
  jobPositions!: number;

  @ApiProperty()
  openVacancies!: number;

  @ApiProperty()
  totalVacancies!: number;

  @ApiProperty()
  applicants!: number;

  @ApiProperty()
  applications!: number;

  @ApiProperty()
  scheduledInterviews!: number;

  @ApiProperty()
  completedInterviews!: number;

  @ApiProperty()
  offersSent!: number;

  @ApiProperty()
  offersAccepted!: number;

  @ApiProperty()
  hiredCandidates!: number;

  @ApiProperty()
  rejectedApplications!: number;

  constructor(partial: Partial<RecruitmentDashboardEntity>) {
    Object.assign(this, partial);
  }
}
