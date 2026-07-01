import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PayrollPeriodStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePayrollPeriodDto {
  @ApiProperty()
  @IsString()
  companyId!: string;

  @ApiProperty({ example: '2026-01' })
  @IsString()
  @MaxLength(50)
  code!: string;

  @ApiProperty({ example: 'January 2026 Payroll' })
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiProperty({ example: '2026-01-01' })
  @IsDateString()
  startDate!: string;

  @ApiProperty({ example: '2026-01-31' })
  @IsDateString()
  endDate!: string;

  @ApiPropertyOptional({ enum: PayrollPeriodStatus })
  @IsOptional()
  @IsEnum(PayrollPeriodStatus)
  status?: PayrollPeriodStatus;
}
