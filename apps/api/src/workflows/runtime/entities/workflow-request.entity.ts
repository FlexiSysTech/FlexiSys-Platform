import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma, WorkflowRequestStatus } from '@prisma/client';

import { WorkflowStepEntity } from './workflow-step.entity';

export class WorkflowRequestEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  workflowId!: string;

  @ApiPropertyOptional({ nullable: true })
  requesterId!: string | null;

  @ApiProperty()
  entityType!: string;

  @ApiProperty()
  entityId!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty({ enum: WorkflowRequestStatus })
  status!: WorkflowRequestStatus;

  @ApiPropertyOptional({ nullable: true })
  payload!: Prisma.JsonValue | null;

  @ApiProperty()
  submittedAt!: Date;

  @ApiPropertyOptional({ nullable: true })
  completedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty({ type: [WorkflowStepEntity] })
  steps!: WorkflowStepEntity[];

  constructor(partial: Partial<WorkflowRequestEntity>) {
    Object.assign(this, partial);
  }
}
