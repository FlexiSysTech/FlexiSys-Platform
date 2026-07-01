import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma';
import { ReportExecutionController } from './report-execution.controller';
import { ReportExecutionService } from './report-execution.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReportExecutionController],
  providers: [ReportExecutionService],
  exports: [ReportExecutionService],
})
export class ReportExecutionModule {}
