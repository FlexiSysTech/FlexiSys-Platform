import { Module } from '@nestjs/common';

import { ApplicantsModule } from './applicants/applicants.module';
import { ApplicationsModule } from './applications/applications.module';
import { HiringModule } from './hiring/hiring.module';
import { InterviewsModule } from './interviews/interviews.module';
import { JobPositionsModule } from './job-positions/job-positions.module';
import { OfferLettersModule } from './offer-letters/offer-letters.module';
import { RecruitmentDashboardModule } from './dashboard/recruitment-dashboard.module';
import { VacanciesModule } from './vacancies/vacancies.module';

@Module({
  imports: [
    JobPositionsModule,
    ApplicantsModule,
    VacanciesModule,
    ApplicationsModule,
    InterviewsModule,
    HiringModule,
    OfferLettersModule,
    RecruitmentDashboardModule,
  ],
  exports: [
    JobPositionsModule,
    ApplicantsModule,
    VacanciesModule,
    ApplicationsModule,
    InterviewsModule,
    HiringModule,
    OfferLettersModule,
    RecruitmentDashboardModule,
  ],
})
export class RecruitmentModule {}
