import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PayrollApprovalActionDto } from './dto/payroll-approval-action.dto';
import { PayrollApprovalService } from './payroll-approval.service';

@ApiTags('Payroll / Approval')
@ApiBearerAuth()
@Controller('payroll/runs/:id')
export class PayrollApprovalController {
  constructor(private readonly service: PayrollApprovalService) {}

  @Post('review')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.update')
  @ApiOperation({ summary: 'Submit payroll run for review' })
  review(@Param('id') id: string, @Body() dto: PayrollApprovalActionDto) {
    return this.service.submitForReview(id, dto);
  }

  @Post('approve')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.update')
  @ApiOperation({ summary: 'Approve payroll run' })
  approve(@Param('id') id: string, @Body() dto: PayrollApprovalActionDto) {
    return this.service.approve(id, dto);
  }

  @Post('reject')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.update')
  @ApiOperation({ summary: 'Reject payroll run' })
  reject(@Param('id') id: string, @Body() dto: PayrollApprovalActionDto) {
    return this.service.reject(id, dto);
  }

  @Post('lock')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.update')
  @ApiOperation({ summary: 'Lock payroll run' })
  lock(@Param('id') id: string, @Body() dto: PayrollApprovalActionDto) {
    return this.service.lock(id, dto);
  }
}
