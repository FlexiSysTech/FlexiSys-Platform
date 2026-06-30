import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
