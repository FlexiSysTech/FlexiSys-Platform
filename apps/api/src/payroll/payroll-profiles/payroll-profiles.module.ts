import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { PayrollProfilesController } from './payroll-profiles.controller';
import { PayrollProfilesService } from './payroll-profiles.service';

@Module({
  imports: [PrismaModule],
  controllers: [PayrollProfilesController],
  providers: [PayrollProfilesService],
  exports: [PayrollProfilesService],
})
export class PayrollProfilesModule {}
