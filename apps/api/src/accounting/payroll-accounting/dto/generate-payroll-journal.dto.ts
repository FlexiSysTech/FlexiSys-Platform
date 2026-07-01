import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GeneratePayrollJournalDto {
  @ApiProperty()
  @IsString()
  payrollRunId!: string;

  @ApiProperty()
  @IsString()
  salaryExpenseAccountId!: string;

  @ApiProperty()
  @IsString()
  employerCostExpenseAccountId!: string;

  @ApiProperty()
  @IsString()
  employerCostPayableAccountId!: string;

  @ApiProperty()
  @IsString()
  deductionsPayableAccountId!: string;

  @ApiProperty()
  @IsString()
  employeeNetPayableAccountId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  createdById?: string;
}
