import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { WorkflowDashboardEntity } from './entities/workflow-dashboard.entity';

@Injectable()
export class WorkflowDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(): Promise<WorkflowDashboardEntity> {
    const [
      totalDefinitions,
      activeDefinitions,
      draftDefinitions,
      archivedDefinitions,
      totalRequests,
      pendingRequests,
      approvedRequests,
      rejectedRequests,
      cancelledRequests,
      pendingSteps,
      approvedSteps,
      rejectedSteps,
    ] = await Promise.all([
      this.prisma.workflowDefinition.count(),
      this.prisma.workflowDefinition.count({ where: { status: 'ACTIVE' } }),
      this.prisma.workflowDefinition.count({ where: { status: 'DRAFT' } }),
      this.prisma.workflowDefinition.count({ where: { status: 'ARCHIVED' } }),
      this.prisma.workflowRequest.count(),
      this.prisma.workflowRequest.count({ where: { status: 'PENDING' } }),
      this.prisma.workflowRequest.count({ where: { status: 'APPROVED' } }),
      this.prisma.workflowRequest.count({ where: { status: 'REJECTED' } }),
      this.prisma.workflowRequest.count({ where: { status: 'CANCELLED' } }),
      this.prisma.workflowStep.count({ where: { status: 'PENDING' } }),
      this.prisma.workflowStep.count({ where: { status: 'APPROVED' } }),
      this.prisma.workflowStep.count({ where: { status: 'REJECTED' } }),
    ]);

    return new WorkflowDashboardEntity({
      totalDefinitions,
      activeDefinitions,
      draftDefinitions,
      archivedDefinitions,
      totalRequests,
      pendingRequests,
      approvedRequests,
      rejectedRequests,
      cancelledRequests,
      pendingSteps,
      approvedSteps,
      rejectedSteps,
    });
  }
}
