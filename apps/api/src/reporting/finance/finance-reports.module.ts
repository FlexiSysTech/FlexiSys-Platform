import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma';
import { FinanceReportsController } from './finance-reports.controller';
import { FinanceReportsService } from './finance-reports.service';

@Module({
  imports: [PrismaModule],
  controllers: [FinanceReportsController],
  providers: [FinanceReportsService],
  exports: [FinanceReportsService],
})
export class FinanceReportsModule {}
