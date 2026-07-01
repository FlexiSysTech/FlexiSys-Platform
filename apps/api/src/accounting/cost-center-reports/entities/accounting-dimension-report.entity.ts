import { ApiProperty } from '@nestjs/swagger';

export class AccountingDimensionReportEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  debit!: number;

  @ApiProperty()
  credit!: number;

  @ApiProperty()
  balance!: number;

  @ApiProperty()
  lineCount!: number;

  constructor(partial: Partial<AccountingDimensionReportEntity>) {
    Object.assign(this, partial);
  }
}
