import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { AssetCategoriesController } from './asset-categories.controller';
import { AssetCategoriesService } from './asset-categories.service';

@Module({
  imports: [PrismaModule],
  controllers: [AssetCategoriesController],
  providers: [AssetCategoriesService],
  exports: [AssetCategoriesService],
})
export class AssetCategoriesModule {}
