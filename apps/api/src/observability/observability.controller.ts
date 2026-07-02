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
  CreateObservabilityHealthProviderDto,
  HealthCheckResultQueryDto,
  ObservabilityHealthProviderQueryDto,
  RunHealthCheckDto,
  UpdateObservabilityHealthProviderDto,
} from './dto/observability-core.dto';
import { ObservabilityService } from './observability.service';

@ApiTags('Observability')
@ApiBearerAuth()
@Controller('observability')
export class ObservabilityController {
  constructor(private readonly service: ObservabilityService) {}

  @Get('health/providers')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get health providers' })
  findHealthProviders(@Query() query: ObservabilityHealthProviderQueryDto) {
    return this.service.findHealthProviders(query);
  }

  @Post('health/providers')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_CREATE)
  @ApiOperation({ summary: 'Create health provider' })
  createHealthProvider(@Body() dto: CreateObservabilityHealthProviderDto) {
    return this.service.createHealthProvider(dto);
  }

  @Patch('health/providers/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_UPDATE)
  @ApiOperation({ summary: 'Update health provider' })
  updateHealthProvider(
    @Param('id') id: string,
    @Body() dto: UpdateObservabilityHealthProviderDto,
  ) {
    return this.service.updateHealthProvider(id, dto);
  }

  @Delete('health/providers/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_DELETE)
  @ApiOperation({ summary: 'Soft delete health provider' })
  removeHealthProvider(@Param('id') id: string) {
    return this.service.removeHealthProvider(id);
  }

  @Post('health/providers/:id/run')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_ADMIN)
  @ApiOperation({ summary: 'Run a health provider check' })
  runProviderCheck(@Param('id') id: string) {
    return this.service.runProviderCheck(id);
  }

  @Post('health/liveness')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Run liveness checks' })
  getLiveness(@Body() dto: RunHealthCheckDto) {
    return this.service.getLiveness(dto);
  }

  @Post('health/readiness')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Run readiness checks' })
  getReadiness(@Body() dto: RunHealthCheckDto) {
    return this.service.getReadiness(dto);
  }

  @Get('health/results')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get health check results' })
  findHealthCheckResults(@Query() query: HealthCheckResultQueryDto) {
    return this.service.findHealthCheckResults(query);
  }
}
