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
import { CreatePayrollItemDto } from './dto/create-payroll-item.dto';
import { UpdatePayrollItemDto } from './dto/update-payroll-item.dto';
import { PayrollItemsService } from './payroll-items.service';

@ApiTags('Payroll / Items')
@ApiBearerAuth()
@Controller('payroll/items')
export class PayrollItemsController {
  constructor(private readonly service: PayrollItemsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.read')
  @ApiOperation({ summary: 'Get all payroll items' })
  findAll() {
    return this.service.findAll();
  }

  @Get('run/:payrollRunId')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.read')
  @ApiOperation({ summary: 'Get payroll items by run' })
  findByRun(@Param('payrollRunId') payrollRunId: string) {
    return this.service.findByRun(payrollRunId);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.read')
  @ApiOperation({ summary: 'Get payroll item by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.create')
  @ApiOperation({ summary: 'Create payroll item' })
  create(@Body() dto: CreatePayrollItemDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.update')
  @ApiOperation({ summary: 'Update payroll item' })
  update(@Param('id') id: string, @Body() dto: UpdatePayrollItemDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.delete')
  @ApiOperation({ summary: 'Delete payroll item' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
