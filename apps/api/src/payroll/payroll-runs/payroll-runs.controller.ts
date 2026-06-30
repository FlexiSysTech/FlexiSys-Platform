import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreatePayrollRunDto } from './dto/create-payroll-run.dto';
import { UpdatePayrollRunDto } from './dto/update-payroll-run.dto';
import { PayrollRunsService } from './payroll-runs.service';

@ApiTags('Payroll / Runs')
@ApiBearerAuth()
@Controller('payroll/runs')
export class PayrollRunsController {
  constructor(private readonly service: PayrollRunsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.read')
  @ApiOperation({ summary: 'Get all records' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.read')
  @ApiOperation({ summary: 'Get record by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.create')
  @ApiOperation({ summary: 'Create record' })
  create(@Body() dto: CreatePayrollRunDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.update')
  @ApiOperation({ summary: 'Update record' })
  update(@Param('id') id: string, @Body() dto: UpdatePayrollRunDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.delete')
  @ApiOperation({ summary: 'Delete record' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
