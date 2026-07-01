import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { DocumentCategoriesController } from './document-categories.controller';
import { DocumentCategoriesService } from './document-categories.service';

@Module({
  imports: [PrismaModule],
  controllers: [DocumentCategoriesController],
  providers: [DocumentCategoriesService],
  exports: [DocumentCategoriesService],
})
export class DocumentCategoriesModule {}
