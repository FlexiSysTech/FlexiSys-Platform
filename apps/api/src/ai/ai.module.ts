import { Module } from '@nestjs/common';

import { BusinessRulesModule } from '../business-rules/business-rules.module';
import { AiCoreController } from './ai-core.controller';
import { AiCoreService } from './ai-core.service';
import { HrAssistantController } from './hr-assistant.controller';
import { HrAssistantService } from './hr-assistant.service';
import { InternalAiProvider } from './providers/internal-ai.provider';
import { ReportingAiController } from './reporting-ai.controller';
import { ReportingAiService } from './reporting-ai.service';
import { WorkflowAiController } from './workflow-ai.controller';
import { WorkflowAiService } from './workflow-ai.service';

@Module({
  imports: [BusinessRulesModule],
  controllers: [
    AiCoreController,
    HrAssistantController,
    WorkflowAiController,
    ReportingAiController,
  ],
  providers: [
    AiCoreService,
    HrAssistantService,
    WorkflowAiService,
    ReportingAiService,
    InternalAiProvider,
  ],
  exports: [
    AiCoreService,
    HrAssistantService,
    WorkflowAiService,
    ReportingAiService,
  ],
})
export class AiModule {}
