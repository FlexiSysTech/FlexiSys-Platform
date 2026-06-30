import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PayrollRunStatus } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePayrollRunDto {
  @ApiProperty()
  @IsString()
  companyId!: string;

  @ApiProperty({ example: 2026 })
  @IsInt()
  @Min(2000)
  year!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @Max(12)
  month!: number;

  @ApiPropertyOptional({ enum: PayrollRunStatus })
  @IsOptional()
  @IsEnum(PayrollRunStatus)
  status?: PayrollRunStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
