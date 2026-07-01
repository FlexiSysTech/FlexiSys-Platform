import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportExportFormat } from '@prisma/client';

export class ExportResultEntity {
  @ApiProperty({ enum: ReportExportFormat })
  format!: ReportExportFormat;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  rowCount!: number;

  @ApiPropertyOptional()
  content?: unknown;

  constructor(partial: Partial<ExportResultEntity>) {
    Object.assign(this, partial);
  }
}
