import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  PayrollItemType,
  SalaryComponentCategory,
} from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePayrollItemDto {
  @ApiProperty()
  @IsString()
  payrollRunId!: string;

  @ApiProperty()
  @IsString()
  employeeId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  salaryComponentId?: string;

  @ApiProperty({ enum: PayrollItemType })
  @IsEnum(PayrollItemType)
  type!: PayrollItemType;

  @ApiPropertyOptional({ enum: SalaryComponentCategory })
  @IsOptional()
  @IsEnum(SalaryComponentCategory)
  category?: SalaryComponentCategory;

  @ApiProperty({ example: 'Housing Allowance' })
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @ApiPropertyOptional({ example: 250 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  rate?: number;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  amount!: number;

  @ApiPropertyOptional({ example: 1000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  taxableAmount?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  employerCost?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  formula?: string;

  @ApiPropertyOptional({ example: 'attendance' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  source?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  sourceRef?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isSystemGenerated?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
