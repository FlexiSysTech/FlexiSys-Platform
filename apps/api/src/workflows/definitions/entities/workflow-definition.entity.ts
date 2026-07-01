import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WorkflowStatus } from '@prisma/client';

import { WorkflowStepDefinitionEntity } from './workflow-step-definition.entity';

export class WorkflowDefinitionEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  companyId!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty()
  entityType!: string;

  @ApiProperty({ enum: WorkflowStatus })
  status!: WorkflowStatus;

  @ApiProperty()
  isDefault!: boolean;

  @ApiProperty({ type: [WorkflowStepDefinitionEntity] })
  steps!: WorkflowStepDefinitionEntity[];

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<WorkflowDefinitionEntity>) {
    Object.assign(this, partial);
  }
}
