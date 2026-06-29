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
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentsService } from './departments.service';

@ApiTags('Organization / Departments')
@ApiBearerAuth()
@Controller('organization/departments')
export class DepartmentsController {
  constructor(private readonly service: DepartmentsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('organization.read')
  @ApiOperation({ summary: 'Get all departments' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('organization.read')
  @ApiOperation({ summary: 'Get departments by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('organization.create')
  @ApiOperation({ summary: 'Create departments' })
  create(@Body() dto: CreateDepartmentDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('organization.update')
  @ApiOperation({ summary: 'Update departments' })
  update(@Param('id') id: string, @Body() dto: UpdateDepartmentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('organization.delete')
  @ApiOperation({ summary: 'Delete departments' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
