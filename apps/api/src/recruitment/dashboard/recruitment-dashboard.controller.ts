import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RecruitmentDashboardService } from './recruitment-dashboard.service';

@ApiTags('Recruitment / Dashboard')
@ApiBearerAuth()
@Controller('recruitment/dashboard')
export class RecruitmentDashboardController {
  constructor(private readonly service: RecruitmentDashboardService) {}

  @Get('summary')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.RECRUITMENT_READ)
  @ApiOperation({ summary: 'Get recruitment dashboard summary' })
  getSummary() {
    return this.service.getSummary();
  }
}
