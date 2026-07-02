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
}
