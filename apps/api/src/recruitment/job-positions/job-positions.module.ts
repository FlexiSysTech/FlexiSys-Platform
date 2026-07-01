import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { JobPositionsController } from './job-positions.controller';
import { JobPositionsService } from './job-positions.service';

@Module({
  imports: [PrismaModule],
  controllers: [JobPositionsController],
  providers: [JobPositionsService],
  exports: [JobPositionsService],
})
export class JobPositionsModule {}
