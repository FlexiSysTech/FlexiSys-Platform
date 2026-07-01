import { Module } from '@nestjs/common';

import { WorkflowDefinitionsModule } from './definitions/workflow-definitions.module';
import { WorkflowRuntimeModule } from './runtime/workflow-runtime.module';

@Module({
  imports: [WorkflowDefinitionsModule, WorkflowRuntimeModule],
  exports: [WorkflowDefinitionsModule, WorkflowRuntimeModule],
})
export class WorkflowsModule {}
