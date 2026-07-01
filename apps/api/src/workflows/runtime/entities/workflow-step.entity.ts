import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WorkflowStepStatus } from '@prisma/client';

export class WorkflowStepEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  requestId!: string;

  @ApiProperty()
  stepOrder!: number;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  approverId!: string | null;

  @ApiProperty({ enum: WorkflowStepStatus })
  status!: WorkflowStepStatus;

  @ApiPropertyOptional({ nullable: true })
  comments!: string | null;

  @ApiPropertyOptional({ nullable: true })
  actedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<WorkflowStepEntity>) {
    Object.assign(this, partial);
  }
}
