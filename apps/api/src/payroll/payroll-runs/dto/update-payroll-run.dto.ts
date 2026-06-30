import { ApiPropertyOptional } from '@nestjs/swagger';
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

export class UpdatePayrollRunDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ example: 2026 })
  @IsOptional()
  @IsInt()
  @Min(2000)
  year?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number;

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
