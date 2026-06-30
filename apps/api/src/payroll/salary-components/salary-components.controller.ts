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
import { CreateSalaryComponentDto } from './dto/create-salary-component.dto';
import { UpdateSalaryComponentDto } from './dto/update-salary-component.dto';
import { SalaryComponentsService } from './salary-components.service';

@ApiTags('Payroll / Salary Components')
@ApiBearerAuth()
@Controller('payroll/salary-components')
export class SalaryComponentsController {
  constructor(private readonly service: SalaryComponentsService) {}

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
  create(@Body() dto: CreateSalaryComponentDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('payroll.update')
  @ApiOperation({ summary: 'Update record' })
  update(@Param('id') id: string, @Body() dto: UpdateSalaryComponentDto) {
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
