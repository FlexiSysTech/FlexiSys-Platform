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

import { Permissions } from '../common/decorators/permissions.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('notifications.read')
  @ApiOperation({ summary: 'Get all notifications' })
  findAll() {
    return this.service.findAll();
  }

  @Get('employee/:employeeId')
  @Roles('SUPER_ADMIN')
  @Permissions('notifications.read')
  @ApiOperation({ summary: 'Get notifications by employee' })
  findByEmployee(@Param('employeeId') employeeId: string) {
    return this.service.findByEmployee(employeeId);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('notifications.read')
  @ApiOperation({ summary: 'Get notification by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('notifications.create')
  @ApiOperation({ summary: 'Create notification' })
  create(@Body() dto: CreateNotificationDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('notifications.update')
  @ApiOperation({ summary: 'Update notification' })
  update(@Param('id') id: string, @Body() dto: UpdateNotificationDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/read')
  @Roles('SUPER_ADMIN')
  @Permissions('notifications.update')
  @ApiOperation({ summary: 'Mark notification as read' })
  markAsRead(@Param('id') id: string) {
    return this.service.markAsRead(id);
  }

  @Post(':id/sent')
  @Roles('SUPER_ADMIN')
  @Permissions('notifications.update')
  @ApiOperation({ summary: 'Mark notification as sent' })
  markAsSent(@Param('id') id: string) {
    return this.service.markAsSent(id);
  }

  @Post(':id/cancel')
  @Roles('SUPER_ADMIN')
  @Permissions('notifications.update')
  @ApiOperation({ summary: 'Cancel notification' })
  cancel(@Param('id') id: string) {
    return this.service.cancel(id);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @Permissions('notifications.delete')
  @ApiOperation({ summary: 'Delete notification' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
