import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { InterviewEvaluationsController } from './interview-evaluations.controller';
import { InterviewEvaluationsService } from './interview-evaluations.service';

@Module({
  imports: [PrismaModule],
  controllers: [InterviewEvaluationsController],
  providers: [InterviewEvaluationsService],
  exports: [InterviewEvaluationsService],
})
export class InterviewEvaluationsModule {}
