import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { AssetsDashboardService } from './assets-dashboard.service';

@ApiTags('Assets / Dashboard')
@ApiBearerAuth()
@Controller('assets/dashboard')
export class AssetsDashboardController {
  constructor(private readonly service: AssetsDashboardService) {}

  @Get('summary')
  @Roles('SUPER_ADMIN')
  @Permissions('assets.read')
  @ApiOperation({ summary: 'Get assets dashboard summary' })
  getSummary() {
    return this.service.getSummary();
  }
}
