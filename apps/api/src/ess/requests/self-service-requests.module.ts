import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { SelfServiceRequestsController } from './self-service-requests.controller';
import { SelfServiceRequestsService } from './self-service-requests.service';

@Module({
  imports: [PrismaModule],
  controllers: [SelfServiceRequestsController],
  providers: [SelfServiceRequestsService],
  exports: [SelfServiceRequestsService],
})
export class SelfServiceRequestsModule {}
