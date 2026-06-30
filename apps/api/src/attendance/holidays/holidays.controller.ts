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
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { HolidaysService } from './holidays.service';

@ApiTags('Attendance / Holidays')
@ApiBearerAuth()
@Controller('attendance/holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('attendance.read')
  @ApiOperation({ summary: 'Get all holidays' })
  findAll() {
    return this.holidaysService.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('attendance.read')
  @ApiOperation({ summary: 'Get holiday by id' })
  findOne(@Param('id') id: string) {
    return this.holidaysService.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('attendance.create')
  @ApiOperation({ summary: 'Create holiday' })
  create(@Body() dto: CreateHolidayDto) {
    return this.holidaysService.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('attendance.update')
  @ApiOperation({ summary: 'Update holiday' })
  update(@Param('id') id: string, @Body() dto: UpdateHolidayDto) {
    return this.holidaysService.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('attendance.delete')
  @ApiOperation({ summary: 'Delete holiday' })
  remove(@Param('id') id: string) {
    return this.holidaysService.remove(id);
  }
}
