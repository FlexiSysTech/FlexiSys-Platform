import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { DocumentVersionsController } from './document-versions.controller';
import { DocumentVersionsService } from './document-versions.service';

@Module({
  imports: [PrismaModule],
  controllers: [DocumentVersionsController],
  providers: [DocumentVersionsService],
  exports: [DocumentVersionsService],
})
export class DocumentVersionsModule {}
