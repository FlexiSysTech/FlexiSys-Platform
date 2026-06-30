import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { LeaveBalancesController } from './leave-balances.controller';
import { LeaveBalancesService } from './leave-balances.service';

@Module({
  imports: [PrismaModule],
  controllers: [LeaveBalancesController],
  providers: [LeaveBalancesService],
  exports: [LeaveBalancesService],
})
export class LeaveBalancesModule {}
