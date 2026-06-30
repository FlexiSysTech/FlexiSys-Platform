import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ShiftStatus } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateShiftDto {
  @ApiProperty()
  @IsString()
  companyId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiProperty({ example: 'MORNING' })
  @IsString()
  @MaxLength(50)
  code!: string;

  @ApiProperty({ example: 'Morning Shift' })
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiProperty({ example: '08:00' })
  @IsString()
  @MaxLength(10)
  startTime!: string;

  @ApiProperty({ example: '17:00' })
  @IsString()
  @MaxLength(10)
  endTime!: string;

  @ApiPropertyOptional({ example: 60 })
  @IsOptional()
  @IsInt()
  @Min(0)
  breakMinutes?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  graceMinutes?: number;

  @ApiPropertyOptional({ enum: ShiftStatus })
  @IsOptional()
  @IsEnum(ShiftStatus)
  status?: ShiftStatus;
}
