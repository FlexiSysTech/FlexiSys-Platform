import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PayrollReportsService } from './payroll-reports.service';

@ApiTags('Payroll / Reports')
@ApiBearerAuth()
@Controller('payroll/reports')
export class PayrollReportsController {
  constructor(private readonly service: PayrollReportsService) {}

  @Get('dashboard')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_READ)
  @ApiOperation({ summary: 'Get payroll dashboard' })
  dashboard() {
    return this.service.dashboard();
  }

  @Get('salary')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_READ)
  @ApiOperation({ summary: 'Get salary report' })
  salaryReport(@Query('payrollRunId') payrollRunId?: string) {
    return this.service.salaryReport(payrollRunId);
  }

  @Get('departments')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_READ)
  @ApiOperation({ summary: 'Get department payroll report' })
  departmentReport(@Query('payrollRunId') payrollRunId?: string) {
    return this.service.departmentReport(payrollRunId);
  }

  @Get('cost-centers')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_READ)
  @ApiOperation({ summary: 'Get cost center payroll report' })
  costCenterReport(@Query('payrollRunId') payrollRunId?: string) {
    return this.service.costCenterReport(payrollRunId);
  }

  @Get('monthly')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_READ)
  @ApiOperation({ summary: 'Get monthly payroll summaries' })
  monthlySummary(@Query('year') year?: string) {
    const parsedYear = year ? Number(year) : undefined;

    return this.service.monthlySummary(
      Number.isFinite(parsedYear) ? parsedYear : undefined,
    );
  }
}
