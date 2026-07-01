import { Module } from '@nestjs/common';

import { ReportingDashboardsModule } from './dashboards/reporting-dashboards.module';
import { ReportDefinitionsModule } from './definitions/report-definitions.module';
import { ReportExecutionModule } from './execution/report-execution.module';
import { ReportExportModule } from './exports/report-export.module';
import { FinanceReportsModule } from './finance/finance-reports.module';
import { HrReportsModule } from './hr/hr-reports.module';

@Module({
  imports: [
    ReportDefinitionsModule,
    ReportingDashboardsModule,
    ReportExecutionModule,
    ReportExportModule,
    HrReportsModule,
    FinanceReportsModule,
  ],
  exports: [
    ReportDefinitionsModule,
    ReportingDashboardsModule,
    ReportExecutionModule,
    ReportExportModule,
    HrReportsModule,
    FinanceReportsModule,
  ],
})
export class ReportingModule {}
