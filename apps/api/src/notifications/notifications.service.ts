import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  NotificationChannel,
  NotificationStatus,
  Prisma,
} from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationEntity } from './entities/notification.entity';

type NotificationRecord = {
  id: string;
  companyId: string | null;
  employeeId: string | null;
  channel: NotificationChannel;
  status: NotificationStatus;
  title: string;
  message: string;
  metadata: Prisma.JsonValue | null;
  scheduledAt: Date | null;
  sentAt: Date | null;
  readAt: Date | null;
  failedAt: Date | null;
  error: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: NotificationRecord): NotificationEntity {
    return new NotificationEntity(item);
  }

  async findAll(): Promise<NotificationEntity[]> {
    const items = await this.prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findByEmployee(employeeId: string): Promise<NotificationEntity[]> {
    await this.ensureEmployeeExists(employeeId);

    const items = await this.prisma.notification.findMany({
      where: { employeeId },
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<NotificationEntity> {
    const item = await this.prisma.notification.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Notification not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateNotificationDto): Promise<NotificationEntity> {
    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.employeeId) {
      await this.ensureEmployeeExists(dto.employeeId);
    }

    const item = await this.prisma.notification.create({
      data: {
        companyId: dto.companyId,
        employeeId: dto.employeeId,
        channel: dto.channel ?? 'IN_APP',
        status: dto.status ?? 'PENDING',
        title: dto.title,
        message: dto.message,
        metadata:
          dto.metadata === undefined
            ? Prisma.JsonNull
            : (dto.metadata as Prisma.InputJsonValue),
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdateNotificationDto,
  ): Promise<NotificationEntity> {
    await this.findOne(id);

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.employeeId) {
      await this.ensureEmployeeExists(dto.employeeId);
    }

    const item = await this.prisma.notification.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        employeeId: dto.employeeId,
        channel: dto.channel,
        status: dto.status,
        title: dto.title,
        message: dto.message,
        metadata:
          dto.metadata === undefined
            ? undefined
            : (dto.metadata as Prisma.InputJsonValue),
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
      },
    });

    return this.toEntity(item);
  }

  async markAsRead(id: string): Promise<NotificationEntity> {
    const current = await this.findOne(id);

    if (current.status === 'CANCELLED') {
      throw new BadRequestException('Cancelled notifications cannot be read');
    }

    const item = await this.prisma.notification.update({
      where: { id },
      data: {
        status: 'READ',
        readAt: new Date(),
      },
    });

    return this.toEntity(item);
  }

  async markAsSent(id: string): Promise<NotificationEntity> {
    await this.findOne(id);

    const item = await this.prisma.notification.update({
      where: { id },
      data: {
        status: 'SENT',
        sentAt: new Date(),
        failedAt: null,
        error: null,
      },
    });

    return this.toEntity(item);
  }

  async markAsFailed(
    id: string,
    error: string,
  ): Promise<NotificationEntity> {
    if (!error.trim()) {
      throw new BadRequestException('Failure reason is required');
    }

    await this.findOne(id);

    const item = await this.prisma.notification.update({
      where: { id },
      data: {
        status: 'FAILED',
        failedAt: new Date(),
        error,
      },
    });

    return this.toEntity(item);
  }

  async cancel(id: string): Promise<NotificationEntity> {
    const current = await this.findOne(id);

    if (current.status === 'SENT' || current.status === 'READ') {
      throw new BadRequestException('Delivered notifications cannot be cancelled');
    }

    const item = await this.prisma.notification.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.notification.delete({ where: { id } });

    return {
      success: true,
      deletedNotification: item,
    };
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const company = await this.prisma.company.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }
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
}
