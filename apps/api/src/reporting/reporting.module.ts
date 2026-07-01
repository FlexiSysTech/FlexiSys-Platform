import { Module } from '@nestjs/common';

import { ReportDefinitionsModule } from './definitions/report-definitions.module';
import { ReportExecutionModule } from './execution/report-execution.module';

@Module({
  imports: [ReportDefinitionsModule, ReportExecutionModule],
  exports: [ReportDefinitionsModule, ReportExecutionModule],
})
export class ReportingModule {}
