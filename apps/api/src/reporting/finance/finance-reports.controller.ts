import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { FinanceReportsService } from './finance-reports.service';

@ApiTags('Reporting / Payroll & Accounting')
@ApiBearerAuth()
@Controller('reporting/finance')
export class FinanceReportsController {
  constructor(private readonly service: FinanceReportsService) {}

  @Get('payroll-summary')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.read')
  @ApiOperation({ summary: 'Get payroll summary report' })
  payrollSummary() {
    return this.service.payrollSummary();
  }

  @Get('payslip-summary')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.read')
  @ApiOperation({ summary: 'Get payslip summary report' })
  payslipSummary() {
    return this.service.payslipSummary();
  }

  @Get('trial-balance')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.read')
  @ApiOperation({ summary: 'Get accounting trial balance report' })
  trialBalance() {
    return this.service.trialBalance();
  }

  @Get('general-ledger')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.read')
  @ApiOperation({ summary: 'Get accounting general ledger report' })
  generalLedger(@Query('accountId') accountId?: string) {
    return this.service.generalLedger(accountId);
  }

  @Get('cost-centers')
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.read')
  @ApiOperation({ summary: 'Get cost center accounting report' })
  costCenterReport() {
    return this.service.costCenterReport();
  }
}
