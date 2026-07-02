import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class WorkflowAiRequestDto {
  @ApiProperty()
  @IsString()
  workflowRequestId!: string;
}

export class WorkflowRuleSuggestionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiProperty()
  @IsString()
  entityType!: string;
}
