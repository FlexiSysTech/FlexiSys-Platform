import { ApiProperty } from '@nestjs/swagger';

export class WorkflowAiResultEntity {
  constructor(partial: Partial<WorkflowAiResultEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  summary!: string;

  @ApiProperty()
  aiRequestLogId!: string;

  @ApiProperty()
  data!: Record<string, unknown>;
}
