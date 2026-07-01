import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { RecruitmentDashboardController } from './recruitment-dashboard.controller';
import { RecruitmentDashboardService } from './recruitment-dashboard.service';

@Module({
  imports: [PrismaModule],
  controllers: [RecruitmentDashboardController],
  providers: [RecruitmentDashboardService],
  exports: [RecruitmentDashboardService],
})
export class RecruitmentDashboardModule {}
