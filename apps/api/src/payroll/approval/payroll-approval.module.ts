import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma';
import { PayrollApprovalController } from './payroll-approval.controller';
import { PayrollApprovalService } from './payroll-approval.service';

@Module({
  imports: [PrismaModule],
  controllers: [PayrollApprovalController],
  providers: [PayrollApprovalService],
  exports: [PayrollApprovalService],
})
export class PayrollApprovalModule {}
