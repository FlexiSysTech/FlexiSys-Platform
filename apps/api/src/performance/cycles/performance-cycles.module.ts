import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { PerformanceCyclesController } from './performance-cycles.controller';
import { PerformanceCyclesService } from './performance-cycles.service';

@Module({
  imports: [PrismaModule],
  controllers: [PerformanceCyclesController],
  providers: [PerformanceCyclesService],
  exports: [PerformanceCyclesService],
})
export class PerformanceCyclesModule {}
