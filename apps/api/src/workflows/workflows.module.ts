import { Module } from '@nestjs/common';

import { WorkflowDashboardModule } from './dashboard/workflow-dashboard.module';
import { WorkflowDefinitionsModule } from './definitions/workflow-definitions.module';
import { WorkflowRuntimeModule } from './runtime/workflow-runtime.module';

@Module({
  imports: [
    WorkflowDefinitionsModule,
    WorkflowRuntimeModule,
    WorkflowDashboardModule,
  ],
  exports: [
    WorkflowDefinitionsModule,
    WorkflowRuntimeModule,
    WorkflowDashboardModule,
  ],
})
export class WorkflowsModule {}
