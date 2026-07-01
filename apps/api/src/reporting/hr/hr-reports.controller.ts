import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { HrReportsService } from './hr-reports.service';

@ApiTags('Reporting / HR')
@ApiBearerAuth()
@Controller('reporting/hr')
export class HrReportsController {
  constructor(private readonly service: HrReportsService) {}

  @Get('employees')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.read')
  @ApiOperation({ summary: 'Get employee report' })
  employeeReport() {
    return this.service.employeeReport();
  }

  @Get('attendance')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.read')
  @ApiOperation({ summary: 'Get attendance report' })
  attendanceReport() {
    return this.service.attendanceReport();
  }

  @Get('leave')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.read')
  @ApiOperation({ summary: 'Get leave report' })
  leaveReport() {
    return this.service.leaveReport();
  }

  @Get('recruitment')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.read')
  @ApiOperation({ summary: 'Get recruitment report' })
  recruitmentReport() {
    return this.service.recruitmentReport();
  }
}
