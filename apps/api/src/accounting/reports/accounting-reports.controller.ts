import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { AccountingReportsService } from './accounting-reports.service';

@ApiTags('Accounting / Reports')
@ApiBearerAuth()
@Controller('accounting/reports')
export class AccountingReportsController {
  constructor(private readonly service: AccountingReportsService) {}

  @Get('trial-balance')
  @Roles('SUPER_ADMIN')
  @Permissions('accounting.read')
  @ApiOperation({ summary: 'Get trial balance' })
  trialBalance() {
    return this.service.trialBalance();
  }

  @Get('general-ledger')
  @Roles('SUPER_ADMIN')
  @Permissions('accounting.read')
  @ApiOperation({ summary: 'Get general ledger' })
  generalLedger(@Query('accountId') accountId?: string) {
    return this.service.generalLedger(accountId);
  }

  @Get('payroll')
  @Roles('SUPER_ADMIN')
  @Permissions('accounting.read')
  @ApiOperation({ summary: 'Get payroll accounting report' })
  payrollAccountingReport() {
    return this.service.payrollAccountingReport();
  }

  @Get('cost-centers')
  @Roles('SUPER_ADMIN')
  @Permissions('accounting.read')
  @ApiOperation({ summary: 'Get cost center accounting report' })
  costCenterAccountingReport() {
    return this.service.costCenterAccountingReport();
  }
}
