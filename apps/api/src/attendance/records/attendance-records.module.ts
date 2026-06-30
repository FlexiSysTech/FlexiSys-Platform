import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { AttendanceRecordsController } from './attendance-records.controller';
import { AttendanceRecordsService } from './attendance-records.service';

@Module({
  imports: [PrismaModule],
  controllers: [AttendanceRecordsController],
  providers: [AttendanceRecordsService],
  exports: [AttendanceRecordsService],
})
export class AttendanceRecordsModule {}
