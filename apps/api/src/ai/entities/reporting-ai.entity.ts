import { ApiProperty } from '@nestjs/swagger';

export class ReportingAiResultEntity {
  constructor(partial: Partial<ReportingAiResultEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  summary!: string;

  @ApiProperty()
  aiRequestLogId!: string;

  @ApiProperty()
  data!: Record<string, unknown>;
}
