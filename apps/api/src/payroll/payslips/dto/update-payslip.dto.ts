import { ApiPropertyOptional } from '@nestjs/swagger';
import { PayslipStatus } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdatePayslipDto {
  @ApiPropertyOptional({ enum: PayslipStatus })
  @IsOptional()
  @IsEnum(PayslipStatus)
  status?: PayslipStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  employeeVisible?: boolean;
}
