import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../../common/decorators/permissions.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { ExportReportDto } from './dto/export-report.dto';
import { ReportExportService } from './report-export.service';

@ApiTags('Reporting / Exports')
@ApiBearerAuth()
@Controller('reporting/exports')
export class ReportExportController {
  constructor(private readonly service: ReportExportService) {}

  @Post()
  @Roles('SUPER_ADMIN')
  @Permissions('reporting.export')
  @ApiOperation({ summary: 'Export report rows' })
  export(@Body() dto: ExportReportDto) {
    return this.service.export(dto);
  }
}
