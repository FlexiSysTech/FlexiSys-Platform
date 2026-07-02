import { Module } from '@nestjs/common';

import { BusinessRulesModule } from '../business-rules/business-rules.module';
import { AiCoreController } from './ai-core.controller';
import { AiCoreService } from './ai-core.service';
import { HrAssistantController } from './hr-assistant.controller';
import { HrAssistantService } from './hr-assistant.service';
import { InternalAiProvider } from './providers/internal-ai.provider';

@Module({
  imports: [BusinessRulesModule],
  controllers: [AiCoreController, HrAssistantController],
  providers: [AiCoreService, HrAssistantService, InternalAiProvider],
  exports: [AiCoreService, HrAssistantService],
})
export class AiModule {}
