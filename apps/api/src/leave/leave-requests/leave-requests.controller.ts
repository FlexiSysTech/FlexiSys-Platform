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
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { LeaveRequestsService } from './leave-requests.service';

@ApiTags('Leave / Requests')
@ApiBearerAuth()
@Controller('leave/requests')
export class LeaveRequestsController {
  constructor(private readonly service: LeaveRequestsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('leave.read')
  @ApiOperation({ summary: 'Get all records' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('leave.read')
  @ApiOperation({ summary: 'Get record by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('leave.create')
  @ApiOperation({ summary: 'Create record' })
  create(@Body() dto: CreateLeaveRequestDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('leave.update')
  @ApiOperation({ summary: 'Update record' })
  update(@Param('id') id: string, @Body() dto: UpdateLeaveRequestDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('leave.delete')
  @ApiOperation({ summary: 'Delete record' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
