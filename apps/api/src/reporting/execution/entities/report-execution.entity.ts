import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Prisma,
  ReportExecutionStatus,
  ReportExportFormat,
} from '@prisma/client';

export class ReportExecutionEntity {
  @ApiProperty()
  id!: string;

  @ApiPropertyOptional({ nullable: true })
  companyId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  reportId!: string | null;

  @ApiProperty()
  handler!: string;

  @ApiProperty({ enum: ReportExecutionStatus })
  status!: ReportExecutionStatus;

  @ApiProperty({ enum: ReportExportFormat })
  format!: ReportExportFormat;

  @ApiPropertyOptional({ nullable: true })
  parameters!: Prisma.JsonValue | null;

  @ApiProperty()
  rowCount!: number;

  @ApiPropertyOptional({ nullable: true })
  startedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  completedAt!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  error!: string | null;

  @ApiPropertyOptional({ nullable: true })
  executedById!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<ReportExecutionEntity>) {
    Object.assign(this, partial);
  }
}
