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
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { ShiftsService } from './shifts.service';

@ApiTags('Attendance / Shifts')
@ApiBearerAuth()
@Controller('attendance/shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('attendance.read')
  @ApiOperation({ summary: 'Get all shifts' })
  findAll() {
    return this.shiftsService.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('attendance.read')
  @ApiOperation({ summary: 'Get shift by id' })
  findOne(@Param('id') id: string) {
    return this.shiftsService.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('attendance.create')
  @ApiOperation({ summary: 'Create shift' })
  create(@Body() dto: CreateShiftDto) {
    return this.shiftsService.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('attendance.update')
  @ApiOperation({ summary: 'Update shift' })
  update(@Param('id') id: string, @Body() dto: UpdateShiftDto) {
    return this.shiftsService.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('attendance.delete')
  @ApiOperation({ summary: 'Delete shift' })
  remove(@Param('id') id: string) {
    return this.shiftsService.remove(id);
  }
}
