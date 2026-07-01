import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { AccountingCostCenterReportsService } from './accounting-cost-center-reports.service';

@ApiTags('Accounting / Cost Centers')
@ApiBearerAuth()
@Controller('accounting/dimensions')
export class AccountingCostCenterReportsController {
  constructor(private readonly service: AccountingCostCenterReportsService) {}

  @Get('cost-centers')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ACCOUNTING_READ)
  @ApiOperation({ summary: 'Get accounting balances by cost center' })
  byCostCenter() {
    return this.service.byCostCenter();
  }

  @Get('departments')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ACCOUNTING_READ)
  @ApiOperation({ summary: 'Get accounting balances by department' })
  byDepartment() {
    return this.service.byDepartment();
  }

  @Get('branches')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ACCOUNTING_READ)
  @ApiOperation({ summary: 'Get accounting balances by branch' })
  byBranch() {
    return this.service.byBranch();
  }
}
