import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreatePayrollPeriodDto } from './dto/create-payroll-period.dto';
import { UpdatePayrollPeriodDto } from './dto/update-payroll-period.dto';
import { PayrollPeriodsService } from './payroll-periods.service';

@ApiTags('Payroll / Periods')
@ApiBearerAuth()
@Controller('payroll/periods')
export class PayrollPeriodsController {
  constructor(private readonly service: PayrollPeriodsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.read')
  @ApiOperation({ summary: 'Get all payroll periods' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.read')
  @ApiOperation({ summary: 'Get payroll period by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.create')
  @ApiOperation({ summary: 'Create payroll period' })
  create(@Body() dto: CreatePayrollPeriodDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.update')
  @ApiOperation({ summary: 'Update payroll period' })
  update(@Param('id') id: string, @Body() dto: UpdatePayrollPeriodDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.delete')
  @ApiOperation({ summary: 'Delete payroll period' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
