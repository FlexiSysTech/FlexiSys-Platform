import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JournalEntrySource, JournalEntryStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { CreateJournalEntryLineDto } from './create-journal-entry-line.dto';

export class CreateJournalEntryDto {
  @ApiProperty()
  @IsString()
  companyId!: string;

  @ApiProperty({ example: 'JE-2026-0001' })
  @IsString()
  @MaxLength(50)
  entryNumber!: string;

  @ApiProperty({ example: '2026-07-01' })
  @IsDateString()
  entryDate!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({ enum: JournalEntryStatus })
  @IsOptional()
  @IsEnum(JournalEntryStatus)
  status?: JournalEntryStatus;

  @ApiPropertyOptional({ enum: JournalEntrySource })
  @IsOptional()
  @IsEnum(JournalEntrySource)
  source?: JournalEntrySource;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sourceRef?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  createdById?: string;

  @ApiProperty({ type: [CreateJournalEntryLineDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJournalEntryLineDto)
  lines!: CreateJournalEntryLineDto[];
}
