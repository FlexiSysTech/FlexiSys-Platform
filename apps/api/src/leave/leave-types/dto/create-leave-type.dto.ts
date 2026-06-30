import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LeaveTypeStatus } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateLeaveTypeDto {
  @ApiProperty()
  @IsString()
  companyId!: string;

  @ApiProperty({ example: 'ANNUAL' })
  @IsString()
  @MaxLength(50)
  code!: string;

  @ApiProperty({ example: 'Annual Leave' })
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({ example: 21 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  annualAllowanceDays?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  requiresApproval?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isPaid?: boolean;

  @ApiPropertyOptional({ enum: LeaveTypeStatus })
  @IsOptional()
  @IsEnum(LeaveTypeStatus)
  status?: LeaveTypeStatus;
}
