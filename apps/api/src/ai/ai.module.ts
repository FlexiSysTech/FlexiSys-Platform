import { Module } from '@nestjs/common';

import { AiCoreController } from './ai-core.controller';
import { AiCoreService } from './ai-core.service';
import { InternalAiProvider } from './providers/internal-ai.provider';

@Module({
  controllers: [AiCoreController],
  providers: [AiCoreService, InternalAiProvider],
  exports: [AiCoreService],
})
export class AiModule {}
