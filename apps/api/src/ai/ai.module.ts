import { Module } from '@nestjs/common';

import { BusinessRulesModule } from '../business-rules/business-rules.module';
import { AiCoreController } from './ai-core.controller';
import { AiCoreService } from './ai-core.service';
import { HrAssistantController } from './hr-assistant.controller';
import { HrAssistantService } from './hr-assistant.service';
import { InternalAiProvider } from './providers/internal-ai.provider';
import { WorkflowAiController } from './workflow-ai.controller';
import { WorkflowAiService } from './workflow-ai.service';

@Module({
  imports: [BusinessRulesModule],
  controllers: [AiCoreController, HrAssistantController, WorkflowAiController],
  providers: [
    AiCoreService,
    HrAssistantService,
    WorkflowAiService,
    InternalAiProvider,
  ],
  exports: [AiCoreService, HrAssistantService, WorkflowAiService],
})
export class AiModule {}
