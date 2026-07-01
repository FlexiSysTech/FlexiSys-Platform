import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { ReportingDashboardsService } from './reporting-dashboards.service';

@ApiTags('Reporting / Dashboards')
@ApiBearerAuth()
@Controller('reporting/dashboards')
export class ReportingDashboardsController {
  constructor(private readonly service: ReportingDashboardsService) {}

  @Get('executive')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.REPORTING_READ)
  @ApiOperation({ summary: 'Get executive dashboard' })
  executiveDashboard() {
    return this.service.executiveDashboard();
  }

  @Get('hr')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.REPORTING_READ)
  @ApiOperation({ summary: 'Get HR dashboard' })
  hrDashboard() {
    return this.service.hrDashboard();
  }

  @Get('payroll')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.REPORTING_READ)
  @ApiOperation({ summary: 'Get payroll dashboard' })
  payrollDashboard() {
    return this.service.payrollDashboard();
  }

  @Get('accounting')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.REPORTING_READ)
  @ApiOperation({ summary: 'Get accounting dashboard' })
  accountingDashboard() {
    return this.service.accountingDashboard();
  }
}
