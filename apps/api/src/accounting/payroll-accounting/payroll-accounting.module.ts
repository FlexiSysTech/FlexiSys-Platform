import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma';
import { PayrollAccountingController } from './payroll-accounting.controller';
import { PayrollAccountingService } from './payroll-accounting.service';

@Module({
  imports: [PrismaModule],
  controllers: [PayrollAccountingController],
  providers: [PayrollAccountingService],
  exports: [PayrollAccountingService],
})
export class PayrollAccountingModule {}
