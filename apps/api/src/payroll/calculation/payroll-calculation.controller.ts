import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PayrollPreviewDto } from './dto/payroll-preview.dto';
import { PayrollCalculationService } from './payroll-calculation.service';

@ApiTags('Payroll / Calculation')
@ApiBearerAuth()
@Controller('payroll/calculation')
export class PayrollCalculationController {
  constructor(private readonly service: PayrollCalculationService) {}

  @Post('preview')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_READ)
  @ApiOperation({ summary: 'Preview payroll calculations' })
  preview(@Body() dto: PayrollPreviewDto) {
    return this.service.preview(dto.payrollRunId, dto.employeeId);
  }

  @Post('calculate')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_UPDATE)
  @ApiOperation({ summary: 'Calculate and persist payroll run' })
  calculate(@Body() dto: PayrollPreviewDto) {
    return this.service.calculateRun(dto.payrollRunId);
  }
}
