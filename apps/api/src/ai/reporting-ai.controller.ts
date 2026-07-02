import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../common/decorators/permissions.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import {
  AnomalyDetectionQueryDto,
  DashboardInsightsQueryDto,
  NaturalLanguageReportDto,
} from './dto/reporting-ai.dto';
import { ReportingAiService } from './reporting-ai.service';

@ApiTags('AI / Reporting')
@ApiBearerAuth()
@Controller('ai/reporting')
export class ReportingAiController {
  constructor(private readonly service: ReportingAiService) {}

  @Post('natural-language')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_EXECUTE)
  @ApiOperation({ summary: 'Interpret a natural language report request' })
  interpretReportRequest(@Body() dto: NaturalLanguageReportDto) {
    return this.service.interpretReportRequest(dto);
  }

  @Get('dashboard-insights')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_EXECUTE)
  @ApiOperation({ summary: 'Generate dashboard insights' })
  getDashboardInsights(@Query() query: DashboardInsightsQueryDto) {
    return this.service.getDashboardInsights(query);
  }

  @Get('anomalies')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_EXECUTE)
  @ApiOperation({ summary: 'Detect platform reporting anomalies' })
  detectAnomalies(@Query() query: AnomalyDetectionQueryDto) {
    return this.service.detectAnomalies(query);
  }
}
