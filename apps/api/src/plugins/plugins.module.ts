import { Module } from '@nestjs/common';

import { BusinessRulesModule } from '../business-rules/business-rules.module';
import { PluginsController } from './plugins.controller';
import { PluginsService } from './plugins.service';

@Module({
  imports: [BusinessRulesModule],
  controllers: [PluginsController],
  providers: [PluginsService],
  exports: [PluginsService],
})
export class PluginsModule {}
