import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WorkflowStepDefinitionEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  workflowId!: string;

  @ApiProperty()
  stepOrder!: number;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  approverRoleId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  approverUserId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  approverEmployeeId!: string | null;

  @ApiProperty()
  isRequired!: boolean;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<WorkflowStepDefinitionEntity>) {
    Object.assign(this, partial);
  }
}
