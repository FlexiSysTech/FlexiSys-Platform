import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../common/decorators/permissions.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import {
  BiDatasetQueryDto,
  BiMetricQueryDto,
  CreateBiDatasetDto,
  CreateBiMetricDto,
  RecordBiMetricObservationDto,
  UpdateBiDatasetDto,
  UpdateBiMetricDto,
} from './dto/bi-analytics.dto';
import {
  BiDashboardQueryDto,
  CreateBiDashboardDto,
  CreateBiDashboardWidgetDto,
} from './dto/bi-dashboard.dto';
import {
  BiPredictionModelQueryDto,
  CreateBiPredictionModelDto,
} from './dto/bi-prediction.dto';
import { BiTrendQueryDto } from './dto/bi-trend.dto';
import {
  BiKpiQueryDto,
  BiKpiSnapshotQueryDto,
  CreateBiKpiDto,
  RecordBiKpiSnapshotDto,
  UpdateBiKpiDto,
} from './dto/bi-kpi.dto';
import { BiService } from './bi.service';

@ApiTags('BI & Analytics')
@ApiBearerAuth()
@Controller('bi')
export class BiController {
  constructor(private readonly service: BiService) {}

  @Get('kpis')
  @Permissions(Permission.BI_READ)
  @ApiOperation({ summary: 'List KPI definitions' })
  findKpis(@Query() query: BiKpiQueryDto) {
    return this.service.findKpis(query);
  }

  @Post('kpis')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BI_MANAGE)
  @ApiOperation({ summary: 'Create KPI definition' })
  createKpi(@Body() dto: CreateBiKpiDto) {
    return this.service.createKpi(dto);
  }

  @Patch('kpis/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BI_MANAGE)
  @ApiOperation({ summary: 'Update KPI definition' })
  updateKpi(@Param('id') id: string, @Body() dto: UpdateBiKpiDto) {
    return this.service.updateKpi(id, dto);
  }

  @Post('kpis/:id/archive')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BI_MANAGE)
  @ApiOperation({ summary: 'Archive KPI definition' })
  archiveKpi(@Param('id') id: string) {
    return this.service.archiveKpi(id);
  }

  @Post('kpis/:id/snapshots')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BI_EXECUTE)
  @ApiOperation({ summary: 'Record KPI snapshot' })
  recordSnapshot(
    @Param('id') id: string,
    @Body() dto: RecordBiKpiSnapshotDto,
  ) {
    return this.service.recordSnapshot(id, dto);
  }

  @Get('kpis/:id/snapshots')
  @Permissions(Permission.BI_READ)
  @ApiOperation({ summary: 'List KPI snapshots' })
  findSnapshots(@Param('id') id: string, @Query() query: BiKpiSnapshotQueryDto) {
    return this.service.findSnapshots(id, query);
  }

  @Get('datasets')
  @Permissions(Permission.BI_READ)
  @ApiOperation({ summary: 'List analytics datasets' })
  findDatasets(@Query() query: BiDatasetQueryDto) {
    return this.service.findDatasets(query);
  }

  @Post('datasets')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BI_MANAGE)
  @ApiOperation({ summary: 'Create analytics dataset' })
  createDataset(@Body() dto: CreateBiDatasetDto) {
    return this.service.createDataset(dto);
  }

  @Patch('datasets/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BI_MANAGE)
  @ApiOperation({ summary: 'Update analytics dataset' })
  updateDataset(@Param('id') id: string, @Body() dto: UpdateBiDatasetDto) {
    return this.service.updateDataset(id, dto);
  }

  @Post('datasets/:id/run')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BI_EXECUTE)
  @ApiOperation({ summary: 'Run analytics dataset execution' })
  runDatasetExecution(@Param('id') id: string) {
    return this.service.runDatasetExecution(id);
  }

  @Get('metrics')
  @Permissions(Permission.BI_READ)
  @ApiOperation({ summary: 'List analytics metrics' })
  findMetrics(@Query() query: BiMetricQueryDto) {
    return this.service.findMetrics(query);
  }

  @Post('metrics')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BI_MANAGE)
  @ApiOperation({ summary: 'Create analytics metric' })
  createMetric(@Body() dto: CreateBiMetricDto) {
    return this.service.createMetric(dto);
  }

  @Patch('metrics/:id')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BI_MANAGE)
  @ApiOperation({ summary: 'Update analytics metric' })
  updateMetric(@Param('id') id: string, @Body() dto: UpdateBiMetricDto) {
    return this.service.updateMetric(id, dto);
  }

  @Post('metrics/:id/observations')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BI_EXECUTE)
  @ApiOperation({ summary: 'Record analytics metric observation' })
  recordMetricObservation(
    @Param('id') id: string,
    @Body() dto: RecordBiMetricObservationDto,
  ) {
    return this.service.recordMetricObservation(id, dto);
  }

  @Get('dashboards')
  @Permissions(Permission.BI_DASHBOARD)
  @ApiOperation({ summary: 'List BI dashboards' })
  findDashboards(@Query() query: BiDashboardQueryDto) {
    return this.service.findDashboards(query);
  }

  @Post('dashboards')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BI_MANAGE)
  @ApiOperation({ summary: 'Create BI dashboard' })
  createDashboard(@Body() dto: CreateBiDashboardDto) {
    return this.service.createDashboard(dto);
  }

  @Post('dashboards/:id/widgets')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BI_MANAGE)
  @ApiOperation({ summary: 'Add BI dashboard widget' })
  addDashboardWidget(
    @Param('id') id: string,
    @Body() dto: CreateBiDashboardWidgetDto,
  ) {
    return this.service.addDashboardWidget(id, dto);
  }

  @Get('dashboards/executive/summary')
  @Permissions(Permission.BI_DASHBOARD)
  @ApiOperation({ summary: 'Get executive dashboard summary' })
  getExecutiveDashboard() {
    return this.service.getExecutiveDashboard();
  }

  @Get('kpis/:id/trend')
  @Permissions(Permission.BI_READ)
  @ApiOperation({ summary: 'Get KPI trend analysis' })
  getKpiTrend(@Param('id') id: string, @Query() query: BiTrendQueryDto) {
    return this.service.getKpiTrend(id, query);
  }

  @Get('metrics/:id/trend')
  @Permissions(Permission.BI_READ)
  @ApiOperation({ summary: 'Get metric trend analysis' })
  getMetricTrend(@Param('id') id: string, @Query() query: BiTrendQueryDto) {
    return this.service.getMetricTrend(id, query);
  }

  @Get('predictions/models')
  @Permissions(Permission.BI_PREDICT)
  @ApiOperation({ summary: 'List BI prediction models' })
  findPredictionModels(@Query() query: BiPredictionModelQueryDto) {
    return this.service.findPredictionModels(query);
  }

  @Post('predictions/models')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BI_PREDICT)
  @ApiOperation({ summary: 'Create BI prediction model' })
  createPredictionModel(@Body() dto: CreateBiPredictionModelDto) {
    return this.service.createPredictionModel(dto);
  }

  @Post('predictions/models/:id/run')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.BI_PREDICT)
  @ApiOperation({ summary: 'Run BI prediction model' })
  runPrediction(@Param('id') id: string) {
    return this.service.runPrediction(id);
  }
}
