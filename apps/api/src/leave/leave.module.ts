import { Module } from '@nestjs/common';

import { LeaveBalancesModule } from './leave-balances/leave-balances.module';
import { LeaveRequestsModule } from './leave-requests/leave-requests.module';
import { LeaveTypesModule } from './leave-types/leave-types.module';

@Module({
  imports: [
    LeaveTypesModule,
    LeaveBalancesModule,
    LeaveRequestsModule,
  ],
  exports: [
    LeaveTypesModule,
    LeaveBalancesModule,
    LeaveRequestsModule,
  ],
})
export class LeaveModule {}
