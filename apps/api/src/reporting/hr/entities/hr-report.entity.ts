import { ApiProperty } from '@nestjs/swagger';

export class ReportMetricEntity {
  @ApiProperty()
  label!: string;

  @ApiProperty()
  value!: number;

  constructor(partial: Partial<ReportMetricEntity>) {
    Object.assign(this, partial);
  }
}
