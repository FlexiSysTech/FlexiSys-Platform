import { Module } from '@nestjs/common';

import { PayrollProfilesModule } from './payroll-profiles/payroll-profiles.module';
import { PayrollRunsModule } from './payroll-runs/payroll-runs.module';
import { SalaryComponentsModule } from './salary-components/salary-components.module';

@Module({
  imports: [
    SalaryComponentsModule,
    PayrollProfilesModule,
    PayrollRunsModule,
  ],
  exports: [
    SalaryComponentsModule,
    PayrollProfilesModule,
    PayrollRunsModule,
  ],
})
export class PayrollModule {}
