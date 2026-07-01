import { ApiProperty } from '@nestjs/swagger';

export class TrialBalanceLineEntity {
  @ApiProperty()
  accountId!: string;

  @ApiProperty()
  accountCode!: string;

  @ApiProperty()
  accountName!: string;

  @ApiProperty()
  accountType!: string;

  @ApiProperty()
  debit!: number;

  @ApiProperty()
  credit!: number;

  @ApiProperty()
  balance!: number;

  constructor(partial: Partial<TrialBalanceLineEntity>) {
    Object.assign(this, partial);
  }
}

export class GeneralLedgerLineEntity {
  @ApiProperty()
  journalEntryId!: string;

  @ApiProperty()
  entryNumber!: string;

  @ApiProperty()
  entryDate!: Date;

  @ApiProperty()
  accountCode!: string;

  @ApiProperty()
  accountName!: string;

  @ApiProperty()
  debit!: number;

  @ApiProperty()
  credit!: number;

  @ApiProperty()
  description!: string | null;

  constructor(partial: Partial<GeneralLedgerLineEntity>) {
    Object.assign(this, partial);
  }
}
