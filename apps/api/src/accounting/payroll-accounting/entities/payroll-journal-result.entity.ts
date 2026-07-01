import { ApiProperty } from '@nestjs/swagger';

export class PayrollJournalResultEntity {
  @ApiProperty()
  journalEntryId!: string;

  @ApiProperty()
  payrollRunId!: string;

  @ApiProperty()
  entryNumber!: string;

  @ApiProperty()
  totalDebit!: number;

  @ApiProperty()
  totalCredit!: number;

  @ApiProperty()
  lineCount!: number;

  constructor(partial: Partial<PayrollJournalResultEntity>) {
    Object.assign(this, partial);
  }
}
