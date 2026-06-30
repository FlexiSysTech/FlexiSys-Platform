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
import { AttendanceRecordsService } from './attendance-records.service';
import { CreateAttendanceRecordDto } from './dto/create-attendance-record.dto';
import { UpdateAttendanceRecordDto } from './dto/update-attendance-record.dto';

@ApiTags('Attendance / Records')
@ApiBearerAuth()
@Controller('attendance/records')
export class AttendanceRecordsController {
  constructor(
    private readonly attendanceRecordsService: AttendanceRecordsService,
  ) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('attendance.read')
  @ApiOperation({ summary: 'Get all attendance records' })
  findAll() {
    return this.attendanceRecordsService.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('attendance.read')
  @ApiOperation({ summary: 'Get attendance record by id' })
  findOne(@Param('id') id: string) {
    return this.attendanceRecordsService.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('attendance.create')
  @ApiOperation({ summary: 'Create attendance record' })
  create(@Body() dto: CreateAttendanceRecordDto) {
    return this.attendanceRecordsService.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('attendance.update')
  @ApiOperation({ summary: 'Update attendance record' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAttendanceRecordDto,
  ) {
    return this.attendanceRecordsService.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('attendance.delete')
  @ApiOperation({ summary: 'Delete attendance record' })
  remove(@Param('id') id: string) {
    return this.attendanceRecordsService.remove(id);
  }
}
