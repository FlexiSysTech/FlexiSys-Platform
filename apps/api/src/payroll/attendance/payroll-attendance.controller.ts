import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApplyPayrollAttendanceDto } from './dto/apply-payroll-attendance.dto';
import { PayrollAttendanceService } from './payroll-attendance.service';

@ApiTags('Payroll / Attendance')
@ApiBearerAuth()
@Controller('payroll/attendance')
export class PayrollAttendanceController {
  constructor(private readonly service: PayrollAttendanceService) {}

  @Post('apply')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.update')
  @ApiOperation({ summary: 'Apply attendance and leave payroll impacts' })
  applyAttendanceImpacts(@Body() dto: ApplyPayrollAttendanceDto) {
    return this.service.applyAttendanceImpacts(dto.payrollRunId);
  }
}
