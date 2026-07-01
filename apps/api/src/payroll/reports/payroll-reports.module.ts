import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma';
import { PayrollReportsController } from './payroll-reports.controller';
import { PayrollReportsService } from './payroll-reports.service';

@Module({
  imports: [PrismaModule],
  controllers: [PayrollReportsController],
  providers: [PayrollReportsService],
  exports: [PayrollReportsService],
})
export class PayrollReportsModule {}
