import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WorkflowStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateWorkflowDefinitionDto } from './dto/create-workflow-definition.dto';
import { CreateWorkflowStepDto } from './dto/create-workflow-step.dto';
import { UpdateWorkflowDefinitionDto } from './dto/update-workflow-definition.dto';
import { UpdateWorkflowStepDto } from './dto/update-workflow-step.dto';
import { WorkflowDefinitionEntity } from './entities/workflow-definition.entity';
import { WorkflowStepDefinitionEntity } from './entities/workflow-step-definition.entity';

type WorkflowDefinitionRecord = {
  id: string;
  companyId: string;
  code: string;
  name: string;
  description: string | null;
  entityType: string;
  status: WorkflowStatus;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  steps: WorkflowStepDefinitionEntity[];
};

type WorkflowStepRule = {
  stepOrder: number;
  name: string;
  approverRoleId?: string | null;
  approverUserId?: string | null;
  approverEmployeeId?: string | null;
  isRequired?: boolean;
};

@Injectable()
export class WorkflowDefinitionsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: WorkflowDefinitionRecord): WorkflowDefinitionEntity {
    return new WorkflowDefinitionEntity({
      ...item,
      steps: item.steps.map((step) => new WorkflowStepDefinitionEntity(step)),
    });
  }

  async findAll(): Promise<WorkflowDefinitionEntity[]> {
    const items = await this.prisma.workflowDefinition.findMany({
      include: { steps: { orderBy: { stepOrder: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<WorkflowDefinitionEntity> {
    const item = await this.prisma.workflowDefinition.findUnique({
      where: { id },
      include: { steps: { orderBy: { stepOrder: 'asc' } } },
    });

    if (!item) {
      throw new NotFoundException('Workflow definition not found');
    }

    return this.toEntity(item);
  }

  async create(
    dto: CreateWorkflowDefinitionDto,
  ): Promise<WorkflowDefinitionEntity> {
    await this.ensureCompanyExists(dto.companyId);
    await this.ensureCodeIsUnique(dto.companyId, dto.code);
    await this.validateSteps(dto.steps ?? []);

    const item = await this.prisma.$transaction(async (tx) => {
      if (dto.isDefault) {
        await tx.workflowDefinition.updateMany({
          where: { companyId: dto.companyId, entityType: dto.entityType },
          data: { isDefault: false },
        });
      }

      return tx.workflowDefinition.create({
        data: {
          companyId: dto.companyId,
          code: dto.code,
          name: dto.name,
          description: dto.description,
          entityType: dto.entityType,
          status: dto.status ?? 'DRAFT',
          isDefault: dto.isDefault ?? false,
          steps: {
            create: (dto.steps ?? []).map((step) => this.toStepData(step)),
          },
        },
        include: { steps: { orderBy: { stepOrder: 'asc' } } },
      });
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdateWorkflowDefinitionDto,
  ): Promise<WorkflowDefinitionEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;
    const entityType = dto.entityType ?? current.entityType;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.companyId || dto.code) {
      await this.ensureCodeIsUnique(companyId, code, id);
    }

    if (dto.steps) {
      await this.validateSteps(dto.steps);
    }

    const item = await this.prisma.$transaction(async (tx) => {
      if (dto.isDefault) {
        await tx.workflowDefinition.updateMany({
          where: { companyId, entityType, id: { not: id } },
          data: { isDefault: false },
        });
      }

      if (dto.steps) {
        await tx.workflowDefinitionStep.deleteMany({ where: { workflowId: id } });
      }

      return tx.workflowDefinition.update({
        where: { id },
        data: {
          companyId: dto.companyId,
          code: dto.code,
          name: dto.name,
          description: dto.description,
          entityType: dto.entityType,
          status: dto.status,
          isDefault: dto.isDefault,
          steps: dto.steps
            ? { create: dto.steps.map((step) => this.toStepData(step)) }
            : undefined,
        },
        include: { steps: { orderBy: { stepOrder: 'asc' } } },
      });
    });

    return this.toEntity(item);
  }

  async activate(id: string): Promise<WorkflowDefinitionEntity> {
    const current = await this.findOne(id);

    if (!current.steps.length) {
      throw new BadRequestException('Workflow requires at least one step');
    }

    const item = await this.prisma.workflowDefinition.update({
      where: { id },
      data: { status: 'ACTIVE' },
      include: { steps: { orderBy: { stepOrder: 'asc' } } },
    });

    return this.toEntity(item);
  }

  async archive(id: string): Promise<WorkflowDefinitionEntity> {
    await this.findOne(id);

    const item = await this.prisma.workflowDefinition.update({
      where: { id },
      data: { status: 'ARCHIVED', isDefault: false },
      include: { steps: { orderBy: { stepOrder: 'asc' } } },
    });

    return this.toEntity(item);
  }

  async addStep(
    workflowId: string,
    dto: CreateWorkflowStepDto,
  ): Promise<WorkflowDefinitionEntity> {
    await this.findOne(workflowId);
    await this.validateSteps([dto]);

    const existing = await this.prisma.workflowDefinitionStep.findFirst({
      where: { workflowId, stepOrder: dto.stepOrder },
    });

    if (existing) {
      throw new ConflictException('Workflow step order already exists');
    }

    await this.prisma.workflowDefinitionStep.create({
      data: {
        workflowId,
        ...this.toStepData(dto),
      },
    });

    return this.findOne(workflowId);
  }

  async updateStep(
    workflowId: string,
    stepId: string,
    dto: UpdateWorkflowStepDto,
  ): Promise<WorkflowDefinitionEntity> {
    await this.findOne(workflowId);

    const current = await this.prisma.workflowDefinitionStep.findFirst({
      where: { id: stepId, workflowId },
    });

    if (!current) {
      throw new NotFoundException('Workflow step not found');
    }

    const merged = { ...current, ...dto };
    await this.validateSteps([merged]);

    if (dto.stepOrder && dto.stepOrder !== current.stepOrder) {
      const existing = await this.prisma.workflowDefinitionStep.findFirst({
        where: { workflowId, stepOrder: dto.stepOrder, id: { not: stepId } },
      });

      if (existing) {
        throw new ConflictException('Workflow step order already exists');
      }
    }

    await this.prisma.workflowDefinitionStep.update({
      where: { id: stepId },
      data: {
        stepOrder: dto.stepOrder,
        name: dto.name,
        approverRoleId: dto.approverRoleId,
        approverUserId: dto.approverUserId,
        approverEmployeeId: dto.approverEmployeeId,
        isRequired: dto.isRequired,
      },
    });

    return this.findOne(workflowId);
  }

  async removeStep(workflowId: string, stepId: string): Promise<WorkflowDefinitionEntity> {
    await this.findOne(workflowId);

    const current = await this.prisma.workflowDefinitionStep.findFirst({
      where: { id: stepId, workflowId },
    });

    if (!current) {
      throw new NotFoundException('Workflow step not found');
    }

    await this.prisma.workflowDefinitionStep.delete({ where: { id: stepId } });

    return this.findOne(workflowId);
  }

  private toStepData(step: CreateWorkflowStepDto) {
    return {
      stepOrder: step.stepOrder,
      name: step.name,
      approverRoleId: step.approverRoleId,
      approverUserId: step.approverUserId,
      approverEmployeeId: step.approverEmployeeId,
      isRequired: step.isRequired ?? true,
    };
  }

  private async validateSteps(steps: WorkflowStepRule[]): Promise<void> {
    const seenOrders = new Set<number>();

    for (const step of steps) {
      if (seenOrders.has(step.stepOrder)) {
        throw new BadRequestException('Workflow step order must be unique');
      }

      seenOrders.add(step.stepOrder);

      const approverCount = [
        step.approverRoleId,
        step.approverUserId,
        step.approverEmployeeId,
      ].filter(Boolean).length;

      if ((step.isRequired ?? true) && approverCount === 0) {
        throw new BadRequestException('Required workflow steps need an approver');
      }

      if (step.approverRoleId) {
        await this.ensureRoleExists(step.approverRoleId);
      }

      if (step.approverUserId) {
        await this.ensureUserExists(step.approverUserId);
      }

      if (step.approverEmployeeId) {
        await this.ensureEmployeeExists(step.approverEmployeeId);
      }
    }
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const company = await this.prisma.company.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }
  }

  private async ensureRoleExists(id: string): Promise<void> {
    const role = await this.prisma.role.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!role) {
      throw new NotFoundException('Approver role not found');
    }
  }

  private async ensureUserExists(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('Approver user not found');
    }
  }

  private async ensureEmployeeExists(id: string): Promise<void> {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!employee) {
      throw new NotFoundException('Approver employee not found');
    }
  }

  private async ensureCodeIsUnique(
    companyId: string,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.workflowDefinition.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (item) {
      throw new ConflictException(
        'Workflow definition code already exists in this company',
      );
    }
  }
}
