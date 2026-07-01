import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { OfferLettersController } from './offer-letters.controller';
import { OfferLettersService } from './offer-letters.service';

@Module({
  imports: [PrismaModule],
  controllers: [OfferLettersController],
  providers: [OfferLettersService],
  exports: [OfferLettersService],
})
export class OfferLettersModule {}
