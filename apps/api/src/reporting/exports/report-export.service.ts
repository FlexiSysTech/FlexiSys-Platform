import { Injectable } from '@nestjs/common';

import { ExportReportDto } from './dto/export-report.dto';
import { ExportResultEntity } from './entities/export-result.entity';

@Injectable()
export class ReportExportService {
  export(dto: ExportReportDto): ExportResultEntity {
    if (dto.format === 'CSV') {
      return this.csv(dto);
    }

    if (dto.format === 'EXCEL') {
      return this.excel(dto);
    }

    if (dto.format === 'PDF') {
      return this.pdf(dto);
    }

    return new ExportResultEntity({
      format: 'JSON',
      title: dto.title,
      rowCount: dto.rows.length,
      content: {
        metadata: dto.metadata ?? {},
        rows: dto.rows,
      },
    });
  }

  private csv(dto: ExportReportDto): ExportResultEntity {
    const columns = this.columns(dto.rows);
    const lines = [
      columns.join(','),
      ...dto.rows.map((row) =>
        columns.map((column) => this.escapeCsv(row[column])).join(','),
      ),
    ];

    return new ExportResultEntity({
      format: 'CSV',
      title: dto.title,
      rowCount: dto.rows.length,
      content: lines.join('\n'),
    });
  }

  private excel(dto: ExportReportDto): ExportResultEntity {
    const columns = this.columns(dto.rows);

    return new ExportResultEntity({
      format: 'EXCEL',
      title: dto.title,
      rowCount: dto.rows.length,
      content: {
        workbook: {
          sheets: [
            {
              name: dto.title.slice(0, 31),
              columns,
              rows: dto.rows.map((row) =>
                columns.map((column) => row[column] ?? null),
              ),
            },
          ],
        },
      },
    });
  }

  private pdf(dto: ExportReportDto): ExportResultEntity {
    const columns = this.columns(dto.rows);

    return new ExportResultEntity({
      format: 'PDF',
      title: dto.title,
      rowCount: dto.rows.length,
      content: {
        document: {
          title: dto.title,
          subtitle: dto.subtitle,
          generatedAt: new Date().toISOString(),
          metadata: dto.metadata ?? {},
          table: {
            columns,
            rows: dto.rows.map((row) =>
              columns.map((column) => String(row[column] ?? '')),
            ),
          },
        },
      },
    });
  }

  private columns(rows: Record<string, unknown>[]): string[] {
    return [...new Set(rows.flatMap((row) => Object.keys(row)))];
  }

  private escapeCsv(value: unknown): string {
    const text = String(value ?? '');

    if (/[",\n]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }

    return text;
  }
}
