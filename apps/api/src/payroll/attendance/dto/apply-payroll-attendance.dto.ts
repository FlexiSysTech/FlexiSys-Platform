import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ApplyPayrollAttendanceDto {
  @ApiProperty()
  @IsString()
  payrollRunId!: string;
}
