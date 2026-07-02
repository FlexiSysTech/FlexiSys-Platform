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
import {
  CreateMetricDefinitionDto,
  ObservabilityMetricQueryDto,
  RecordMetricSampleDto,
  UpdateMetricDefinitionDto,
} from './dto/observability-metrics.dto';
import {
  ObservabilityLogQueryDto,
  RecordLogEntryDto,
} from './dto/observability-logging.dto';
import { ObservabilityManagementQueryDto } from './dto/observability-management.dto';
import {
  ObservabilityTraceQueryDto,
  RecordSpanDto,
  StartTraceDto,
} from './dto/observability-tracing.dto';
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

  @Get('metrics/definitions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get metric definitions' })
  findMetricDefinitions(@Query() query: ObservabilityMetricQueryDto) {
    return this.service.findMetricDefinitions(query);
  }

  @Post('metrics/definitions')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_CREATE)
  @ApiOperation({ summary: 'Create metric definition' })
  createMetricDefinition(@Body() dto: CreateMetricDefinitionDto) {
    return this.service.createMetricDefinition(dto);
  }

  @Patch('metrics/definitions/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_UPDATE)
  @ApiOperation({ summary: 'Update metric definition' })
  updateMetricDefinition(
    @Param('id') id: string,
    @Body() dto: UpdateMetricDefinitionDto,
  ) {
    return this.service.updateMetricDefinition(id, dto);
  }

  @Delete('metrics/definitions/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_DELETE)
  @ApiOperation({ summary: 'Soft delete metric definition' })
  removeMetricDefinition(@Param('id') id: string) {
    return this.service.removeMetricDefinition(id);
  }

  @Get('metrics/samples')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get metric samples' })
  findMetricSamples(@Query() query: ObservabilityMetricQueryDto) {
    return this.service.findMetricSamples(query);
  }

  @Post('metrics/samples')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_CREATE)
  @ApiOperation({ summary: 'Record metric sample' })
  recordMetricSample(@Body() dto: RecordMetricSampleDto) {
    return this.service.recordMetricSample(dto);
  }

  @Get('metrics/http')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get HTTP metrics summary' })
  getHttpMetrics(@Query() query: ObservabilityMetricQueryDto) {
    return this.service.getHttpMetrics(query);
  }

  @Get('metrics/database')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get database metrics summary' })
  getDatabaseMetrics(@Query() query: ObservabilityMetricQueryDto) {
    return this.service.getDatabaseMetrics(query);
  }

  @Get('metrics/workflow')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get workflow metrics summary' })
  getWorkflowMetrics(@Query() query: ObservabilityMetricQueryDto) {
    return this.service.getWorkflowMetrics(query);
  }

  @Get('metrics/payroll')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get payroll metrics summary' })
  getPayrollMetrics(@Query() query: ObservabilityMetricQueryDto) {
    return this.service.getPayrollMetrics(query);
  }

  @Get('metrics/business-rules')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get business rules metrics summary' })
  getBusinessRulesMetrics(@Query() query: ObservabilityMetricQueryDto) {
    return this.service.getBusinessRulesMetrics(query);
  }

  @Get('logs')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get structured log entries' })
  findLogEntries(@Query() query: ObservabilityLogQueryDto) {
    return this.service.findLogEntries(query);
  }

  @Post('logs')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_CREATE)
  @ApiOperation({ summary: 'Record structured log entry' })
  recordLogEntry(@Body() dto: RecordLogEntryDto) {
    return this.service.recordLogEntry(dto);
  }

  @Get('logs/summary')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get log level summary' })
  getLogLevelSummary(@Query() query: ObservabilityLogQueryDto) {
    return this.service.getLogLevelSummary(query);
  }

  @Get('traces')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get distributed traces' })
  findTraces(@Query() query: ObservabilityTraceQueryDto) {
    return this.service.findTraces(query);
  }

  @Post('traces')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_CREATE)
  @ApiOperation({ summary: 'Start distributed trace' })
  startTrace(@Body() dto: StartTraceDto) {
    return this.service.startTrace(dto);
  }

  @Get('traces/spans')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get distributed trace spans' })
  findSpans(@Query() query: ObservabilityTraceQueryDto) {
    return this.service.findSpans(query);
  }

  @Post('traces/spans')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_CREATE)
  @ApiOperation({ summary: 'Record distributed trace span' })
  recordSpan(@Body() dto: RecordSpanDto) {
    return this.service.recordSpan(dto);
  }

  @Get('traces/requests')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get request tracing summary' })
  getRequestTraceSummary(@Query() query: ObservabilityTraceQueryDto) {
    return this.service.getRequestTraceSummary(query);
  }

  @Get('traces/services')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get service tracing summary' })
  getServiceTraceSummary(@Query() query: ObservabilityTraceQueryDto) {
    return this.service.getServiceTraceSummary(query);
  }

  @Get('traces/database')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get database timing summary' })
  getDatabaseTraceSummary(@Query() query: ObservabilityTraceQueryDto) {
    return this.service.getDatabaseTraceSummary(query);
  }

  @Get('traces/external-providers')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_READ)
  @ApiOperation({ summary: 'Get external provider timing summary' })
  getExternalProviderTraceSummary(@Query() query: ObservabilityTraceQueryDto) {
    return this.service.getExternalProviderTraceSummary(query);
  }

  @Get('management/status')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_ADMIN)
  @ApiOperation({ summary: 'Get system observability status' })
  getSystemStatus(@Query() query: ObservabilityManagementQueryDto) {
    return this.service.getSystemStatus(query);
  }

  @Get('management/diagnostics')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_ADMIN)
  @ApiOperation({ summary: 'Get system diagnostics' })
  getDiagnostics(@Query() query: ObservabilityManagementQueryDto) {
    return this.service.getDiagnostics(query);
  }

  @Get('management/metrics')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_ADMIN)
  @ApiOperation({ summary: 'Get management metrics overview' })
  getMetricsOverview(@Query() query: ObservabilityManagementQueryDto) {
    return this.service.getMetricsOverview(query);
  }

  @Get('management/health')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.OBSERVABILITY_ADMIN)
  @ApiOperation({ summary: 'Get management readiness health' })
  getManagementHealth(@Query() query: ObservabilityManagementQueryDto) {
    return this.service.getReadiness(query);
  }
}
