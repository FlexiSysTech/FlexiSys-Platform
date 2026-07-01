import { Module } from '@nestjs/common';

import { AccountsModule } from './accounts/accounts.module';
import { AccountingCostCenterReportsModule } from './cost-center-reports/accounting-cost-center-reports.module';
import { JournalEntriesModule } from './journal-entries/journal-entries.module';
import { PayrollAccountingModule } from './payroll-accounting/payroll-accounting.module';
import { AccountingReportsModule } from './reports/accounting-reports.module';

@Module({
  imports: [
    AccountsModule,
    JournalEntriesModule,
    PayrollAccountingModule,
    AccountingCostCenterReportsModule,
    AccountingReportsModule,
  ],
  exports: [
    AccountsModule,
    JournalEntriesModule,
    PayrollAccountingModule,
    AccountingCostCenterReportsModule,
    AccountingReportsModule,
  ],
})
export class AccountingModule {}
