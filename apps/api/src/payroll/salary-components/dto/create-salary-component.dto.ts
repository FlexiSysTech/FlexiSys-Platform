import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  SalaryComponentCalculationType,
  SalaryComponentCategory,
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

export class CreateSalaryComponentDto {
  @ApiProperty()
  @IsString()
  companyId!: string;

  @ApiProperty({ example: 'BASIC' })
  @IsString()
  @MaxLength(50)
  code!: string;

  @ApiProperty({ example: 'Basic Salary' })
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ enum: SalaryComponentType })
  @IsEnum(SalaryComponentType)
  type!: SalaryComponentType;

  @ApiPropertyOptional({ enum: SalaryComponentCategory })
  @IsOptional()
  @IsEnum(SalaryComponentCategory)
  category?: SalaryComponentCategory;

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

  @ApiPropertyOptional({ example: 'basicSalary * 0.1' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  formula?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isTaxable?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  affectsGross?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  affectsTaxable?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  affectsNet?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  employerCost?: boolean;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  displayOrder?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
