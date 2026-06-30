import { Module } from '@nestjs/common';

import { AttendanceRecordsModule } from './records/attendance-records.module';
import { HolidaysModule } from './holidays/holidays.module';
import { ShiftsModule } from './shifts/shifts.module';

@Module({
  imports: [
    ShiftsModule,
    AttendanceRecordsModule,
    HolidaysModule,
  ],
  exports: [
    ShiftsModule,
    AttendanceRecordsModule,
    HolidaysModule,
  ],
})
export class AttendanceModule {}
