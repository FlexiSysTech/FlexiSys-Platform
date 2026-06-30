import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateAttendanceRecordDto } from './dto/create-attendance-record.dto';
import { UpdateAttendanceRecordDto } from './dto/update-attendance-record.dto';
import { AttendanceRecordEntity } from './entities/attendance-record.entity';

type AttendanceRecord = {
  id: string;
  employeeId: string;
  shiftId: string | null;
  attendanceDate: Date;
  checkInAt: Date | null;
  checkOutAt: Date | null;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY' | 'ON_LEAVE' | 'HOLIDAY';
  lateMinutes: number;
  overtimeMinutes: number;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AttendanceRecordsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(record: AttendanceRecord): AttendanceRecordEntity {
    return new AttendanceRecordEntity(record);
  }

  async findAll(): Promise<AttendanceRecordEntity[]> {
    const records = await this.prisma.attendanceRecord.findMany({
      orderBy: {
        attendanceDate: 'desc',
      },
    });

    return records.map((record) => this.toEntity(record));
  }

  async findOne(id: string): Promise<AttendanceRecordEntity> {
    const record = await this.prisma.attendanceRecord.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException('Attendance record not found');
    }

    return this.toEntity(record);
  }

  async create(dto: CreateAttendanceRecordDto): Promise<AttendanceRecordEntity> {
    await this.ensureEmployeeExists(dto.employeeId);

    if (dto.shiftId) {
      await this.ensureShiftExists(dto.shiftId);
    }

    await this.ensureAttendanceIsUnique(
      dto.employeeId,
      new Date(dto.attendanceDate),
    );

    const record = await this.prisma.attendanceRecord.create({
      data: {
        employeeId: dto.employeeId,
        shiftId: dto.shiftId,
        attendanceDate: new Date(dto.attendanceDate),
        checkInAt: dto.checkInAt ? new Date(dto.checkInAt) : undefined,
        checkOutAt: dto.checkOutAt ? new Date(dto.checkOutAt) : undefined,
        status: dto.status ?? 'PRESENT',
        lateMinutes: dto.lateMinutes ?? 0,
        overtimeMinutes: dto.overtimeMinutes ?? 0,
        notes: dto.notes,
      },
    });

    return this.toEntity(record);
  }

  async update(
    id: string,
    dto: UpdateAttendanceRecordDto,
  ): Promise<AttendanceRecordEntity> {
    const current = await this.findOne(id);
    const employeeId = dto.employeeId ?? current.employeeId;
    const attendanceDate = dto.attendanceDate
      ? new Date(dto.attendanceDate)
      : current.attendanceDate;

    if (dto.employeeId) {
      await this.ensureEmployeeExists(dto.employeeId);
    }

    if (dto.shiftId) {
      await this.ensureShiftExists(dto.shiftId);
    }

    if (dto.employeeId || dto.attendanceDate) {
      await this.ensureAttendanceIsUnique(employeeId, attendanceDate, id);
    }

    const record = await this.prisma.attendanceRecord.update({
      where: { id },
      data: {
        employeeId: dto.employeeId,
        shiftId: dto.shiftId,
        attendanceDate: dto.attendanceDate
          ? new Date(dto.attendanceDate)
          : undefined,
        checkInAt: dto.checkInAt ? new Date(dto.checkInAt) : undefined,
        checkOutAt: dto.checkOutAt ? new Date(dto.checkOutAt) : undefined,
        status: dto.status,
        lateMinutes: dto.lateMinutes,
        overtimeMinutes: dto.overtimeMinutes,
        notes: dto.notes,
      },
    });

    return this.toEntity(record);
  }

  async remove(id: string): Promise<{
    success: boolean;
    deletedAttendanceRecord: AttendanceRecordEntity;
  }> {
    const record = await this.findOne(id);

    await this.prisma.attendanceRecord.delete({ where: { id } });

    return {
      success: true,
      deletedAttendanceRecord: record,
    };
  }

  private async ensureEmployeeExists(id: string): Promise<void> {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
  }

  private async ensureShiftExists(id: string): Promise<void> {
    const shift = await this.prisma.shift.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!shift) {
      throw new NotFoundException('Shift not found');
    }
  }

  private async ensureAttendanceIsUnique(
    employeeId: string,
    attendanceDate: Date,
    excludeId?: string,
  ): Promise<void> {
    const record = await this.prisma.attendanceRecord.findFirst({
      where: {
        employeeId,
        attendanceDate,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (record) {
      throw new ConflictException(
        'Attendance record already exists for this employee and date',
      );
    }
  }
}
