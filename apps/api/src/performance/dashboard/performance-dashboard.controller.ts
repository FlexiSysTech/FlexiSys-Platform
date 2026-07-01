import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PerformanceDashboardService } from './performance-dashboard.service';

@ApiTags('Performance / Dashboard')
@ApiBearerAuth()
@Controller('performance/dashboard')
export class PerformanceDashboardController {
  constructor(private readonly service: PerformanceDashboardService) {}

  @Get('summary')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.PERFORMANCE_READ)
  @ApiOperation({ summary: 'Get performance dashboard summary' })
  getSummary() {
    return this.service.getSummary();
  }
}
