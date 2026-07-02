import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../common/decorators/permissions.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import {
  CreateCronRegistryDto,
  ScheduleJobDto,
  SchedulerQueryDto,
  UpdateCronRegistryDto,
  UpdateScheduledJobDto,
} from './dto/scheduler-core.dto';
import { SchedulerMonitoringQueryDto } from './dto/scheduler-monitoring.dto';
import {
  ClaimSchedulerJobsDto,
  CompleteSchedulerJobDto,
  FailSchedulerJobDto,
  RecoverSchedulerJobDto,
  SchedulerRecoveryQueryDto,
} from './dto/scheduler-retry.dto';
import { SchedulerService } from './scheduler.service';

@ApiTags('Scheduler')
@ApiBearerAuth()
@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly service: SchedulerService) {}

  @Get('crons')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_READ)
  @ApiOperation({ summary: 'Get cron registry entries' })
  findCrons(@Query() query: SchedulerQueryDto) {
    return this.service.findCrons(query);
  }

  @Post('crons')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_CREATE)
  @ApiOperation({ summary: 'Create cron registry entry' })
  createCron(@Body() dto: CreateCronRegistryDto) {
    return this.service.createCron(dto);
  }

  @Patch('crons/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_UPDATE)
  @ApiOperation({ summary: 'Update cron registry entry' })
  updateCron(@Param('id') id: string, @Body() dto: UpdateCronRegistryDto) {
    return this.service.updateCron(id, dto);
  }

  @Delete('crons/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_DELETE)
  @ApiOperation({ summary: 'Soft delete cron registry entry' })
  removeCron(@Param('id') id: string) {
    return this.service.removeCron(id);
  }

  @Get('jobs')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_READ)
  @ApiOperation({ summary: 'Get scheduled jobs' })
  findJobs(@Query() query: SchedulerQueryDto) {
    return this.service.findJobs(query);
  }

  @Post('jobs')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_CREATE)
  @ApiOperation({ summary: 'Schedule background job' })
  scheduleJob(@Body() dto: ScheduleJobDto) {
    return this.service.scheduleJob(dto);
  }

  @Patch('jobs/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_UPDATE)
  @ApiOperation({ summary: 'Update scheduled job' })
  updateJob(@Param('id') id: string, @Body() dto: UpdateScheduledJobDto) {
    return this.service.updateJob(id, dto);
  }

  @Post('jobs/:id/cancel')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_EXECUTE)
  @ApiOperation({ summary: 'Cancel scheduled job' })
  cancelJob(@Param('id') id: string) {
    return this.service.cancelJob(id);
  }

  @Get('history')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_READ)
  @ApiOperation({ summary: 'Get scheduler job history' })
  findHistory(@Query() query: SchedulerQueryDto) {
    return this.service.findHistory(query);
  }

  @Post('queue/claim')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_EXECUTE)
  @ApiOperation({ summary: 'Claim due scheduler jobs for a worker' })
  claimDueJobs(@Body() dto: ClaimSchedulerJobsDto) {
    return this.service.claimDueJobs(dto);
  }

  @Post('jobs/:id/complete')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_EXECUTE)
  @ApiOperation({ summary: 'Complete a running scheduler job' })
  completeJob(
    @Param('id') id: string,
    @Body() dto: CompleteSchedulerJobDto,
  ) {
    return this.service.completeJob(id, dto);
  }

  @Post('jobs/:id/fail')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_EXECUTE)
  @ApiOperation({ summary: 'Fail a running scheduler job and apply retry policy' })
  failJob(@Param('id') id: string, @Body() dto: FailSchedulerJobDto) {
    return this.service.failJob(id, dto);
  }

  @Post('jobs/:id/retry')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_EXECUTE)
  @ApiOperation({ summary: 'Retry a failed or dead-letter scheduler job' })
  retryJob(@Param('id') id: string) {
    return this.service.retryJob(id);
  }

  @Post('jobs/:id/recover')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_EXECUTE)
  @ApiOperation({ summary: 'Apply failure recovery action to a scheduler job' })
  recoverJob(@Param('id') id: string, @Body() dto: RecoverSchedulerJobDto) {
    return this.service.recoverJob(id, dto);
  }

  @Get('recoveries')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_MONITOR)
  @ApiOperation({ summary: 'Get scheduler failure recovery records' })
  findRecoveries(@Query() query: SchedulerRecoveryQueryDto) {
    return this.service.findRecoveries(query);
  }

  @Get('monitoring/dashboard')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_MONITOR)
  @ApiOperation({ summary: 'Get scheduler dashboard metrics' })
  getDashboard(@Query() query: SchedulerMonitoringQueryDto) {
    return this.service.getDashboard(query);
  }

  @Get('monitoring/queues')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_MONITOR)
  @ApiOperation({ summary: 'Get scheduler queue status' })
  getQueueStatus(@Query() query: SchedulerMonitoringQueryDto) {
    return this.service.getQueueStatus(query);
  }

  @Get('monitoring/failures')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_MONITOR)
  @ApiOperation({ summary: 'Get scheduler failure report' })
  getFailureReport(@Query() query: SchedulerMonitoringQueryDto) {
    return this.service.getFailureReport(query);
  }

  @Get('monitoring/system-status')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.SCHEDULER_MONITOR)
  @ApiOperation({ summary: 'Get scheduler system status' })
  getSystemStatus(@Query() query: SchedulerMonitoringQueryDto) {
    return this.service.getSystemStatus(query);
  }
}
