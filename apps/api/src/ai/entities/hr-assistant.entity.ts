import { ApiProperty } from '@nestjs/swagger';

export class AiAssistantInsightEntity {
  constructor(partial: Partial<AiAssistantInsightEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  summary!: string;

  @ApiProperty()
  aiRequestLogId!: string;

  @ApiProperty()
  data!: Record<string, unknown>;
}
