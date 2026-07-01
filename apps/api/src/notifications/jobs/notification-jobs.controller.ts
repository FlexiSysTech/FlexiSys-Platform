import { Controller, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { NotificationJobsService } from './notification-jobs.service';

@ApiTags('Notification Jobs')
@ApiBearerAuth()
@Controller('notifications/jobs')
export class NotificationJobsController {
  constructor(private readonly service: NotificationJobsService) {}

  @Post('scheduled')
  @Roles('SUPER_ADMIN')
  @Permissions('notifications.update')
  @ApiOperation({ summary: 'Run scheduled notification delivery job' })
  runScheduledNotifications() {
    return this.service.runScheduledNotifications();
  }

  @Post('retry-failed')
  @Roles('SUPER_ADMIN')
  @Permissions('notifications.update')
  @ApiOperation({ summary: 'Run failed notification retry job' })
  retryFailedNotifications() {
    return this.service.retryFailedNotifications();
  }

  @Post('expire-workflows')
  @Roles('SUPER_ADMIN')
  @Permissions('workflows.update')
  @ApiOperation({ summary: 'Expire stale workflow requests' })
  expireStaleWorkflowRequests(@Query('days') days?: string) {
    return this.service.expireStaleWorkflowRequests(this.toPositiveNumber(days, 30));
  }

  @Post('cleanup')
  @Roles('SUPER_ADMIN')
  @Permissions('notifications.delete')
  @ApiOperation({ summary: 'Cleanup old delivered notifications' })
  cleanupNotifications(@Query('days') days?: string) {
    return this.service.cleanupNotifications(this.toPositiveNumber(days, 180));
  }

  @Post('maintenance')
  @Roles('SUPER_ADMIN')
  @Permissions('notifications.update')
  @ApiOperation({ summary: 'Run notification and workflow maintenance jobs' })
  runMaintenance() {
    return this.service.runMaintenance();
  }

  private toPositiveNumber(value: string | undefined, fallback: number): number {
    const parsed = Number(value);

    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
  }
}
