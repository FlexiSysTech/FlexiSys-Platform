import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { DocumentExpirationController } from './document-expiration.controller';
import { DocumentExpirationService } from './document-expiration.service';

@Module({
  imports: [PrismaModule],
  controllers: [DocumentExpirationController],
  providers: [DocumentExpirationService],
  exports: [DocumentExpirationService],
})
export class DocumentExpirationModule {}
