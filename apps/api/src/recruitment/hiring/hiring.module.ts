import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { HiringController } from './hiring.controller';
import { HiringService } from './hiring.service';

@Module({
  imports: [PrismaModule],
  controllers: [HiringController],
  providers: [HiringService],
  exports: [HiringService],
})
export class HiringModule {}
