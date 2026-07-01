import { ApiProperty } from '@nestjs/swagger';

export class WorkflowDashboardEntity {
  @ApiProperty()
  totalDefinitions!: number;

  @ApiProperty()
  activeDefinitions!: number;

  @ApiProperty()
  draftDefinitions!: number;

  @ApiProperty()
  archivedDefinitions!: number;

  @ApiProperty()
  totalRequests!: number;

  @ApiProperty()
  pendingRequests!: number;

  @ApiProperty()
  approvedRequests!: number;

  @ApiProperty()
  rejectedRequests!: number;

  @ApiProperty()
  cancelledRequests!: number;

  @ApiProperty()
  pendingSteps!: number;

  @ApiProperty()
  approvedSteps!: number;

  @ApiProperty()
  rejectedSteps!: number;

  constructor(partial: Partial<WorkflowDashboardEntity>) {
    Object.assign(this, partial);
  }
}
