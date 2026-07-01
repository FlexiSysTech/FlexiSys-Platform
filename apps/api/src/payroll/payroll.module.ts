import { Module } from '@nestjs/common';

import { PayrollApprovalModule } from './approval/payroll-approval.module';
import { PayrollAttendanceModule } from './attendance/payroll-attendance.module';
import { PayrollCalculationModule } from './calculation/payroll-calculation.module';
import { PayrollItemsModule } from './payroll-items/payroll-items.module';
import { PayrollPeriodsModule } from './payroll-periods/payroll-periods.module';
import { PayrollProfilesModule } from './payroll-profiles/payroll-profiles.module';
import { PayrollRunsModule } from './payroll-runs/payroll-runs.module';
import { SalaryComponentsModule } from './salary-components/salary-components.module';

@Module({
  imports: [
    SalaryComponentsModule,
    PayrollPeriodsModule,
    PayrollProfilesModule,
    PayrollRunsModule,
    PayrollItemsModule,
    PayrollCalculationModule,
    PayrollAttendanceModule,
    PayrollApprovalModule,
  ],
  exports: [
    SalaryComponentsModule,
    PayrollPeriodsModule,
    PayrollProfilesModule,
    PayrollRunsModule,
    PayrollItemsModule,
    PayrollCalculationModule,
    PayrollAttendanceModule,
    PayrollApprovalModule,
  ],
})
export class PayrollModule {}
