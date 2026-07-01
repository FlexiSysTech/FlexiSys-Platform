import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class SubmitWorkflowRequestDto {
  @ApiProperty()
  @IsString()
  workflowId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  requesterId?: string;

  @ApiProperty({ example: 'leave-request' })
  @IsString()
  @MaxLength(100)
  entityType!: string;

  @ApiProperty()
  @IsString()
  entityId!: string;

  @ApiProperty({ example: 'Annual leave request approval' })
  @IsString()
  @MaxLength(200)
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;
}
