import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  SalaryComponentCalculationType,
  SalaryComponentType,
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

export class UpdateSalaryComponentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ example: 'BASIC' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  code?: string;

  @ApiPropertyOptional({ example: 'Basic Salary' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({ enum: SalaryComponentType })
  @IsOptional()
  @IsEnum(SalaryComponentType)
  type?: SalaryComponentType;

  @ApiPropertyOptional({ enum: SalaryComponentCalculationType })
  @IsOptional()
  @IsEnum(SalaryComponentCalculationType)
  calculationType?: SalaryComponentCalculationType;

  @ApiPropertyOptional({ example: 1000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  defaultAmount?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  defaultPercent?: number;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isTaxable?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
