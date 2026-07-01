import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { UpdatePayslipDto } from './dto/update-payslip.dto';
import { PayslipsService } from './payslips.service';

@ApiTags('Payroll / Payslips')
@ApiBearerAuth()
@Controller('payroll/payslips')
export class PayslipsController {
  constructor(private readonly service: PayslipsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_READ)
  @ApiOperation({ summary: 'Get all payslips' })
  findAll() {
    return this.service.findAll();
  }

  @Get('employee/:employeeId')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_READ)
  @ApiOperation({ summary: 'Get employee-visible payslips' })
  findByEmployee(@Param('employeeId') employeeId: string) {
    return this.service.findByEmployee(employeeId);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_READ)
  @ApiOperation({ summary: 'Get payslip by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get(':id/pdf-payload')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_READ)
  @ApiOperation({ summary: 'Get PDF-ready payslip payload' })
  getPdfPayload(@Param('id') id: string) {
    return this.service.getPdfPayload(id);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_UPDATE)
  @ApiOperation({ summary: 'Update payslip' })
  update(@Param('id') id: string, @Body() dto: UpdatePayslipDto) {
    return this.service.update(id, dto);
  }

  @Post('run/:payrollRunId/issue')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_UPDATE)
  @ApiOperation({ summary: 'Issue all payslips for a payroll run' })
  issueForRun(@Param('payrollRunId') payrollRunId: string) {
    return this.service.issueForRun(payrollRunId);
  }
}
