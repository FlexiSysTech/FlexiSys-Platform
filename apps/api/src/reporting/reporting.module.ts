import { Module } from '@nestjs/common';

import { ReportDefinitionsModule } from './definitions/report-definitions.module';
import { ReportExecutionModule } from './execution/report-execution.module';
import { HrReportsModule } from './hr/hr-reports.module';

@Module({
  imports: [ReportDefinitionsModule, ReportExecutionModule, HrReportsModule],
  exports: [ReportDefinitionsModule, ReportExecutionModule, HrReportsModule],
})
export class ReportingModule {}
