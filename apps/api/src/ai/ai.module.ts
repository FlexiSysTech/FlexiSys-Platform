import { Module } from '@nestjs/common';

import { BusinessRulesModule } from '../business-rules/business-rules.module';
import { AiCoreController } from './ai-core.controller';
import { AiCoreService } from './ai-core.service';
import { AiGovernanceController } from './ai-governance.controller';
import { AiGovernanceService } from './ai-governance.service';
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
    AiGovernanceController,
  ],
  providers: [
    AiCoreService,
    AiGovernanceService,
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
    AiGovernanceService,
  ],
})
export class AiModule {}
