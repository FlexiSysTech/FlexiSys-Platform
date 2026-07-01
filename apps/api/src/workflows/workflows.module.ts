import { Module } from '@nestjs/common';

import { WorkflowDefinitionsModule } from './definitions/workflow-definitions.module';

@Module({
  imports: [WorkflowDefinitionsModule],
  exports: [WorkflowDefinitionsModule],
})
export class WorkflowsModule {}
