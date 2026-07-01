import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma';
import { WorkflowDefinitionsController } from './workflow-definitions.controller';
import { WorkflowDefinitionsService } from './workflow-definitions.service';

@Module({
  imports: [PrismaModule],
  controllers: [WorkflowDefinitionsController],
  providers: [WorkflowDefinitionsService],
  exports: [WorkflowDefinitionsService],
})
export class WorkflowDefinitionsModule {}
