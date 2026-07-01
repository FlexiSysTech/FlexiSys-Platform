import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  NotificationChannel,
  NotificationStatus,
  Prisma,
} from '@prisma/client';

export class NotificationEntity {
  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  employeeId!: string | null;

  @ApiProperty({ enum: NotificationChannel })
  channel!: NotificationChannel;

  @ApiProperty({ enum: NotificationStatus })
  status!: NotificationStatus;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  message!: string;

  @ApiPropertyOptional({ nullable: true })
  metadata!: Prisma.JsonValue | null;

  @ApiPropertyOptional({ nullable: true })
  scheduledAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  sentAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  readAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  failedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  error!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<NotificationEntity>) {
    Object.assign(this, partial);
  }
}
