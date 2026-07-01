import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { AssetAssignmentsController } from './asset-assignments.controller';
import { AssetAssignmentsService } from './asset-assignments.service';

@Module({
  imports: [PrismaModule],
  controllers: [AssetAssignmentsController],
  providers: [AssetAssignmentsService],
  exports: [AssetAssignmentsService],
})
export class AssetAssignmentsModule {}
