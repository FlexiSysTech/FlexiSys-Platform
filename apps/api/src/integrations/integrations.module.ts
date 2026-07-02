import { Module } from '@nestjs/common';

import { BusinessRulesModule } from '../business-rules/business-rules.module';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { RestIntegrationProvider } from './providers/rest-integration.provider';

@Module({
  imports: [BusinessRulesModule],
  controllers: [IntegrationsController],
  providers: [IntegrationsService, RestIntegrationProvider],
  exports: [IntegrationsService],
})
export class IntegrationsModule {}
