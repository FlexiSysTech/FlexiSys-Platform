import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  SelfServiceRequestStatus,
  SelfServiceRequestType,
} from '@prisma/client';

export class SelfServiceRequestEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  employeeId!: string;

  @ApiProperty({ enum: SelfServiceRequestType })
  type!: SelfServiceRequestType;

  @ApiProperty()
  title!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty({ enum: SelfServiceRequestStatus })
  status!: SelfServiceRequestStatus;

  @ApiPropertyOptional({ nullable: true })
  payload!: unknown | null;

  @ApiPropertyOptional({ nullable: true })
  response!: string | null;

  @ApiPropertyOptional({ nullable: true })
  submittedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  reviewedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<SelfServiceRequestEntity>) {
    Object.assign(this, partial);
  }
}
