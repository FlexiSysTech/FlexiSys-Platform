import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePayrollProfileDto {
  @ApiProperty()
  @IsString()
  employeeId!: string;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  @Min(0)
  basicSalary!: number;

  @ApiPropertyOptional({ example: 1000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  housingAllowance?: number;

  @ApiPropertyOptional({ example: 500 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  transportAllowance?: number;

  @ApiPropertyOptional({ example: 250 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  otherAllowance?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  bankName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  bankIban?: string;

  @ApiProperty({ example: '2026-01-01' })
  @IsDateString()
  effectiveFrom!: string;

  @ApiPropertyOptional({ example: '2026-12-31' })
  @IsOptional()
  @IsDateString()
  effectiveTo?: string;
}
