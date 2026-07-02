import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permission, Permissions } from '../common/decorators/permissions.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import {
  DocumentAlertsQueryDto,
  EmployeeInsightQueryDto,
  LeaveAnalysisQueryDto,
  PayrollExplanationQueryDto,
} from './dto/hr-assistant-query.dto';
import { HrAssistantService } from './hr-assistant.service';

@ApiTags('AI / HR Assistant')
@ApiBearerAuth()
@Controller('ai/hr')
export class HrAssistantController {
  constructor(private readonly service: HrAssistantService) {}

  @Get('employee-insights')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_EXECUTE)
  @ApiOperation({ summary: 'Generate employee insights' })
  getEmployeeInsights(@Query() query: EmployeeInsightQueryDto) {
    return this.service.getEmployeeInsights(query);
  }

  @Get('leave-analysis')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_EXECUTE)
  @ApiOperation({ summary: 'Analyze leave trends' })
  analyzeLeave(@Query() query: LeaveAnalysisQueryDto) {
    return this.service.analyzeLeave(query);
  }

  @Get('payroll-explanation')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_EXECUTE)
  @ApiOperation({ summary: 'Explain a payroll run' })
  explainPayroll(@Query() query: PayrollExplanationQueryDto) {
    return this.service.explainPayroll(query);
  }

  @Get('document-alerts')
  @Roles('SUPER_ADMIN')
  @Permissions(Permission.AI_EXECUTE)
  @ApiOperation({ summary: 'Generate document expiration alerts' })
  getDocumentAlerts(@Query() query: DocumentAlertsQueryDto) {
    return this.service.getDocumentAlerts(query);
  }
}
