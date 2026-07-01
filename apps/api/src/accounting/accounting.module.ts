import { Module } from '@nestjs/common';

import { AccountsModule } from './accounts/accounts.module';
import { JournalEntriesModule } from './journal-entries/journal-entries.module';

@Module({
  imports: [AccountsModule, JournalEntriesModule],
  exports: [AccountsModule, JournalEntriesModule],
})
export class AccountingModule {}
