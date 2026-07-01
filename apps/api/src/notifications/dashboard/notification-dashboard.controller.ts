import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { NotificationDashboardService } from './notification-dashboard.service';

@ApiTags('Notification Dashboard')
@ApiBearerAuth()
@Controller('notifications/dashboard')
export class NotificationDashboardController {
  constructor(private readonly service: NotificationDashboardService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.NOTIFICATIONS_READ)
  @ApiOperation({ summary: 'Get notification dashboard summary' })
  getSummary() {
    return this.service.getSummary();
  }
}
