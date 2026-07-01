import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { DocumentsDashboardController } from './documents-dashboard.controller';
import { DocumentsDashboardService } from './documents-dashboard.service';

@Module({
  imports: [PrismaModule],
  controllers: [DocumentsDashboardController],
  providers: [DocumentsDashboardService],
  exports: [DocumentsDashboardService],
})
export class DocumentsDashboardModule {}
