import { Module } from '@nestjs/common';

import { ReportDefinitionsModule } from './definitions/report-definitions.module';
import { ReportExecutionModule } from './execution/report-execution.module';
import { ReportExportModule } from './exports/report-export.module';
import { FinanceReportsModule } from './finance/finance-reports.module';
import { HrReportsModule } from './hr/hr-reports.module';

@Module({
  imports: [
    ReportDefinitionsModule,
    ReportExecutionModule,
    ReportExportModule,
    HrReportsModule,
    FinanceReportsModule,
  ],
  exports: [
    ReportDefinitionsModule,
    ReportExecutionModule,
    ReportExportModule,
    HrReportsModule,
    FinanceReportsModule,
  ],
})
export class ReportingModule {}
