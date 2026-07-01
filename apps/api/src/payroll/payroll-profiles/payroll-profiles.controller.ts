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

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreatePayrollProfileDto } from './dto/create-payroll-profile.dto';
import { UpdatePayrollProfileDto } from './dto/update-payroll-profile.dto';
import { PayrollProfilesService } from './payroll-profiles.service';

@ApiTags('Payroll / Profiles')
@ApiBearerAuth()
@Controller('payroll/profiles')
export class PayrollProfilesController {
  constructor(private readonly service: PayrollProfilesService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_READ)
  @ApiOperation({ summary: 'Get all records' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_READ)
  @ApiOperation({ summary: 'Get record by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_CREATE)
  @ApiOperation({ summary: 'Create record' })
  create(@Body() dto: CreatePayrollProfileDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_UPDATE)
  @ApiOperation({ summary: 'Update record' })
  update(@Param('id') id: string, @Body() dto: UpdatePayrollProfileDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PAYROLL_DELETE)
  @ApiOperation({ summary: 'Delete record' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
