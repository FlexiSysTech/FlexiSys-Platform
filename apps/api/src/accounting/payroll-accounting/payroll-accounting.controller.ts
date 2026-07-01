import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { GeneratePayrollJournalDto } from './dto/generate-payroll-journal.dto';
import { PayrollAccountingService } from './payroll-accounting.service';

@ApiTags('Accounting / Payroll')
@ApiBearerAuth()
@Controller('accounting/payroll')
export class PayrollAccountingController {
  constructor(private readonly service: PayrollAccountingService) {}

  @Post('generate-journal')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.ACCOUNTING_CREATE)
  @ApiOperation({ summary: 'Generate journal entry from payroll run' })
  generatePayrollJournal(@Body() dto: GeneratePayrollJournalDto) {
    return this.service.generatePayrollJournal(dto);
  }
}
