import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma';
import { PayrollPeriodsController } from './payroll-periods.controller';
import { PayrollPeriodsService } from './payroll-periods.service';

@Module({
  imports: [PrismaModule],
  controllers: [PayrollPeriodsController],
  providers: [PayrollPeriodsService],
  exports: [PayrollPeriodsService],
})
export class PayrollPeriodsModule {}
