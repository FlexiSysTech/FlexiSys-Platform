import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  WorkflowRequestStatus,
  WorkflowStepStatus,
} from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { SubmitWorkflowRequestDto } from './dto/submit-workflow-request.dto';
import { WorkflowActionDto } from './dto/workflow-action.dto';
import { WorkflowRequestEntity } from './entities/workflow-request.entity';
import { WorkflowStepEntity } from './entities/workflow-step.entity';

type WorkflowRequestRecord = {
  id: string;
  workflowId: string;
  requesterId: string | null;
  entityType: string;
  entityId: string;
  title: string;
  status: WorkflowRequestStatus;
  payload: Prisma.JsonValue | null;
  submittedAt: Date;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  steps: WorkflowStepEntity[];
};

@Injectable()
export class WorkflowRuntimeService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: WorkflowRequestRecord): WorkflowRequestEntity {
    return new WorkflowRequestEntity({
      ...item,
      steps: item.steps.map((step) => new WorkflowStepEntity(step)),
    });
  }

  async findAll(): Promise<WorkflowRequestEntity[]> {
    const items = await this.prisma.workflowRequest.findMany({
      include: { steps: { orderBy: { stepOrder: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<WorkflowRequestEntity> {
    const item = await this.prisma.workflowRequest.findUnique({
      where: { id },
      include: { steps: { orderBy: { stepOrder: 'asc' } } },
    });

    if (!item) {
      throw new NotFoundException('Workflow request not found');
    }

    return this.toEntity(item);
  }

  async history(id: string): Promise<WorkflowStepEntity[]> {
    await this.findOne(id);

    const steps = await this.prisma.workflowStep.findMany({
      where: { requestId: id },
      orderBy: { stepOrder: 'asc' },
    });

    return steps.map((step) => new WorkflowStepEntity(step));
  }

  async submit(dto: SubmitWorkflowRequestDto): Promise<WorkflowRequestEntity> {
    const workflow = await this.prisma.workflowDefinition.findUnique({
      where: { id: dto.workflowId },
      include: { steps: { orderBy: { stepOrder: 'asc' } } },
    });

    if (!workflow) {
      throw new NotFoundException('Workflow definition not found');
    }

    if (workflow.status !== 'ACTIVE') {
      throw new BadRequestException('Only active workflows can receive requests');
    }

    if (workflow.entityType !== dto.entityType) {
      throw new BadRequestException('Workflow entity type does not match request');
    }

    if (!workflow.steps.length) {
      throw new BadRequestException('Workflow has no approval steps');
    }

    if (dto.requesterId) {
      await this.ensureEmployeeExists(dto.requesterId, 'Requester not found');
    }

    const item = await this.prisma.$transaction(async (tx) => {
      const request = await tx.workflowRequest.create({
        data: {
          workflowId: dto.workflowId,
          requesterId: dto.requesterId,
          entityType: dto.entityType,
          entityId: dto.entityId,
          title: dto.title,
          payload:
            dto.payload === undefined
              ? Prisma.JsonNull
              : (dto.payload as Prisma.InputJsonValue),
        },
      });

      for (const definitionStep of workflow.steps) {
        const approverId = await this.resolveApproverEmployeeId(definitionStep);

        if (definitionStep.isRequired && !approverId) {
          throw new BadRequestException(
            `Required step "${definitionStep.name}" has no resolvable approver`,
          );
        }

        await tx.workflowStep.create({
          data: {
            requestId: request.id,
            stepOrder: definitionStep.stepOrder,
            name: definitionStep.name,
            approverId,
            status: approverId ? 'PENDING' : 'SKIPPED',
            actedAt: approverId ? undefined : new Date(),
          },
        });
      }

      await this.autoProgressRequest(request.id, tx);

      return tx.workflowRequest.findUniqueOrThrow({
        where: { id: request.id },
        include: { steps: { orderBy: { stepOrder: 'asc' } } },
      });
    });

    return this.toEntity(item);
  }

  async approve(
    requestId: string,
    stepId: string,
    dto: WorkflowActionDto,
  ): Promise<WorkflowRequestEntity> {
    const request = await this.findOne(requestId);
    this.ensureRequestIsPending(request);

    const step = await this.getActionableStep(requestId, stepId);

    if (dto.approverId) {
      await this.ensureEmployeeExists(dto.approverId, 'Approver not found');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.workflowStep.update({
        where: { id: step.id },
        data: {
          approverId: dto.approverId ?? step.approverId,
          status: 'APPROVED',
          comments: dto.comments,
          actedAt: new Date(),
        },
      });

      await this.autoProgressRequest(requestId, tx);
    });

    return this.findOne(requestId);
  }

  async reject(
    requestId: string,
    stepId: string,
    dto: WorkflowActionDto,
  ): Promise<WorkflowRequestEntity> {
    const request = await this.findOne(requestId);
    this.ensureRequestIsPending(request);

    const step = await this.getActionableStep(requestId, stepId);

    if (dto.approverId) {
      await this.ensureEmployeeExists(dto.approverId, 'Approver not found');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.workflowStep.update({
        where: { id: step.id },
        data: {
          approverId: dto.approverId ?? step.approverId,
          status: 'REJECTED',
          comments: dto.comments,
          actedAt: new Date(),
        },
      });

      await tx.workflowStep.updateMany({
        where: { requestId, status: 'PENDING', id: { not: step.id } },
        data: { status: 'SKIPPED', actedAt: new Date() },
      });

      await tx.workflowRequest.update({
        where: { id: requestId },
        data: { status: 'REJECTED', completedAt: new Date() },
      });
    });

    return this.findOne(requestId);
  }

  async cancel(id: string): Promise<WorkflowRequestEntity> {
    const request = await this.findOne(id);
    this.ensureRequestIsPending(request);

    await this.prisma.workflowRequest.update({
      where: { id },
      data: { status: 'CANCELLED', completedAt: new Date() },
    });

    return this.findOne(id);
  }

  private async autoProgressRequest(
    requestId: string,
    tx: Prisma.TransactionClient,
  ): Promise<void> {
    const blockingSteps = await tx.workflowStep.count({
      where: {
        requestId,
        status: { in: ['PENDING', 'REJECTED'] },
      },
    });

    if (blockingSteps === 0) {
      await tx.workflowRequest.update({
        where: { id: requestId },
        data: { status: 'APPROVED', completedAt: new Date() },
      });
    }
  }

  private async getActionableStep(requestId: string, stepId: string) {
    const step = await this.prisma.workflowStep.findFirst({
      where: { id: stepId, requestId },
    });

    if (!step) {
      throw new NotFoundException('Workflow step not found');
    }

    if (step.status !== 'PENDING') {
      throw new BadRequestException('Only pending workflow steps can be actioned');
    }

    const firstPending = await this.prisma.workflowStep.findFirst({
      where: { requestId, status: 'PENDING' },
      orderBy: { stepOrder: 'asc' },
    });

    if (firstPending?.id !== step.id) {
      throw new BadRequestException('Earlier workflow steps must finish first');
    }

    return step;
  }

  private ensureRequestIsPending(request: WorkflowRequestEntity): void {
    if (request.status !== 'PENDING') {
      throw new BadRequestException('Workflow request is already completed');
    }
  }

  private async resolveApproverEmployeeId(step: {
    approverEmployeeId: string | null;
    approverUserId: string | null;
    approverRoleId: string | null;
  }): Promise<string | undefined> {
    if (step.approverEmployeeId) {
      return step.approverEmployeeId;
    }

    if (step.approverUserId) {
      const employee = await this.prisma.employee.findUnique({
        where: { userId: step.approverUserId },
        select: { id: true },
      });

      return employee?.id;
    }

    if (step.approverRoleId) {
      const userRole = await this.prisma.userRole.findFirst({
        where: { roleId: step.approverRoleId },
        include: { user: { select: { employee: { select: { id: true } } } } },
      });

      return userRole?.user.employee?.id;
    }

    return undefined;
  }

  private async ensureEmployeeExists(id: string, message: string): Promise<void> {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!employee) {
      throw new NotFoundException(message);
    }
  }
}
