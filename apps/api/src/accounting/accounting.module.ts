import { Module } from '@nestjs/common';

import { AccountsModule } from './accounts/accounts.module';
import { JournalEntriesModule } from './journal-entries/journal-entries.module';
import { PayrollAccountingModule } from './payroll-accounting/payroll-accounting.module';

@Module({
  imports: [AccountsModule, JournalEntriesModule, PayrollAccountingModule],
  exports: [AccountsModule, JournalEntriesModule, PayrollAccountingModule],
})
export class AccountingModule {}
