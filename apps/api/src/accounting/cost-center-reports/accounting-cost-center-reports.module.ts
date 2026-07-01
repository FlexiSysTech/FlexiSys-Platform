import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma';
import { AccountingCostCenterReportsController } from './accounting-cost-center-reports.controller';
import { AccountingCostCenterReportsService } from './accounting-cost-center-reports.service';

@Module({
  imports: [PrismaModule],
  controllers: [AccountingCostCenterReportsController],
  providers: [AccountingCostCenterReportsService],
  exports: [AccountingCostCenterReportsService],
})
export class AccountingCostCenterReportsModule {}
