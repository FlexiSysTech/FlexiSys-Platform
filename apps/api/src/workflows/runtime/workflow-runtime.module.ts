import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma';
import { WorkflowRuntimeController } from './workflow-runtime.controller';
import { WorkflowRuntimeService } from './workflow-runtime.service';

@Module({
  imports: [PrismaModule],
  controllers: [WorkflowRuntimeController],
  providers: [WorkflowRuntimeService],
  exports: [WorkflowRuntimeService],
})
export class WorkflowRuntimeModule {}
