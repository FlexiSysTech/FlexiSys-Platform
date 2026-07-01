import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JournalEntrySource, JournalEntryStatus } from '@prisma/client';

export class JournalEntryLineEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  journalEntryId!: string;

  @ApiProperty()
  accountId!: string;

  @ApiProperty()
  debit!: number;

  @ApiProperty()
  credit!: number;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiPropertyOptional({ nullable: true })
  employeeId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  departmentId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  branchId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  costCenterId!: string | null;

  constructor(partial: Partial<JournalEntryLineEntity>) {
    Object.assign(this, partial);
  }
}

export class JournalEntryEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiProperty()
  entryNumber!: string;

  @ApiProperty()
  entryDate!: Date;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty({ enum: JournalEntryStatus })
  status!: JournalEntryStatus;

  @ApiProperty({ enum: JournalEntrySource })
  source!: JournalEntrySource;

  @ApiPropertyOptional({ nullable: true })
  sourceRef!: string | null;

  @ApiProperty()
  totalDebit!: number;

  @ApiProperty()
  totalCredit!: number;

  @ApiPropertyOptional({ nullable: true })
  postedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  voidedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  createdById!: string | null;

  @ApiProperty({ type: [JournalEntryLineEntity] })
  lines!: JournalEntryLineEntity[];

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<JournalEntryEntity>) {
    Object.assign(this, partial);
  }
}
