import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma';
import { PayrollCalculationController } from './payroll-calculation.controller';
import { PayrollCalculationService } from './payroll-calculation.service';

@Module({
  imports: [PrismaModule],
  controllers: [PayrollCalculationController],
  providers: [PayrollCalculationService],
  exports: [PayrollCalculationService],
})
export class PayrollCalculationModule {}
