import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma';
import { ReportDefinitionsController } from './report-definitions.controller';
import { ReportDefinitionsService } from './report-definitions.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReportDefinitionsController],
  providers: [ReportDefinitionsService],
  exports: [ReportDefinitionsService],
})
export class ReportDefinitionsModule {}
