import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../common/decorators/permissions.decorator';
import { Roles } from '../common/decorators/roles.decorator';
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
}
