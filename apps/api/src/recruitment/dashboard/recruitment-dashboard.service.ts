import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { RecruitmentDashboardEntity } from './entities/recruitment-dashboard.entity';

@Injectable()
export class RecruitmentDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(): Promise<RecruitmentDashboardEntity> {
    const [
      jobPositions,
      openVacancies,
      totalVacancies,
      applicants,
      applications,
      scheduledInterviews,
      completedInterviews,
      offersSent,
      offersAccepted,
      hiredCandidates,
      rejectedApplications,
    ] = await Promise.all([
      this.prisma.jobPosition.count(),
      this.prisma.vacancy.count({
        where: {
          status: 'OPEN',
        },
      }),
      this.prisma.vacancy.count(),
      this.prisma.applicant.count(),
      this.prisma.jobApplication.count(),
      this.prisma.interview.count({
        where: {
          status: 'SCHEDULED',
        },
      }),
      this.prisma.interview.count({
        where: {
          status: 'COMPLETED',
        },
      }),
      this.prisma.offerLetter.count({
        where: {
          status: 'SENT',
        },
      }),
      this.prisma.offerLetter.count({
        where: {
          status: 'ACCEPTED',
        },
      }),
      this.prisma.jobApplication.count({
        where: {
          status: 'HIRED',
        },
      }),
      this.prisma.jobApplication.count({
        where: {
          status: 'REJECTED',
        },
      }),
    ]);

    return new RecruitmentDashboardEntity({
      jobPositions,
      openVacancies,
      totalVacancies,
      applicants,
      applications,
      scheduledInterviews,
      completedInterviews,
      offersSent,
      offersAccepted,
      hiredCandidates,
      rejectedApplications,
    });
  }
}
