import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma';
import { PayrollAttendanceController } from './payroll-attendance.controller';
import { PayrollAttendanceService } from './payroll-attendance.service';

@Module({
  imports: [PrismaModule],
  controllers: [PayrollAttendanceController],
  providers: [PayrollAttendanceService],
  exports: [PayrollAttendanceService],
})
export class PayrollAttendanceModule {}
