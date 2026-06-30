import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { SalaryComponentsController } from './salary-components.controller';
import { SalaryComponentsService } from './salary-components.service';

@Module({
  imports: [PrismaModule],
  controllers: [SalaryComponentsController],
  providers: [SalaryComponentsService],
  exports: [SalaryComponentsService],
})
export class SalaryComponentsModule {}
