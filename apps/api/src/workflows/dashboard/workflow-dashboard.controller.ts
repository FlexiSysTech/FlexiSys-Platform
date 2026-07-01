import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { WorkflowDashboardService } from './workflow-dashboard.service';

@ApiTags('Workflow Dashboard')
@ApiBearerAuth()
@Controller('workflows/dashboard')
export class WorkflowDashboardController {
  constructor(private readonly service: WorkflowDashboardService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @Permissions('workflows.read')
  @ApiOperation({ summary: 'Get workflow dashboard summary' })
  getSummary() {
    return this.service.getSummary();
  }
}
