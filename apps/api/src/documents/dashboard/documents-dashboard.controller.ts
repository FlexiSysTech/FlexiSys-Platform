import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Permission, Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { DocumentsDashboardService } from './documents-dashboard.service';

@ApiTags('Documents / Dashboard')
@ApiBearerAuth()
@Controller('documents/dashboard')
export class DocumentsDashboardController {
  constructor(private readonly service: DocumentsDashboardService) {}

  @Get('summary')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.DOCUMENTS_READ)
  @ApiOperation({ summary: 'Get documents dashboard summary' })
  getSummary() {
    return this.service.getSummary();
  }
}
