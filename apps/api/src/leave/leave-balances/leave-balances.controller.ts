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
import { CreateLeaveBalanceDto } from './dto/create-leave-balance.dto';
import { UpdateLeaveBalanceDto } from './dto/update-leave-balance.dto';
import { LeaveBalancesService } from './leave-balances.service';

@ApiTags('Leave / Balances')
@ApiBearerAuth()
@Controller('leave/balances')
export class LeaveBalancesController {
  constructor(private readonly service: LeaveBalancesService) {}

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
  create(@Body() dto: CreateLeaveBalanceDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('leave.update')
  @ApiOperation({ summary: 'Update record' })
  update(@Param('id') id: string, @Body() dto: UpdateLeaveBalanceDto) {
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
