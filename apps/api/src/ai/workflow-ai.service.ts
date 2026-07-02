import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { BusinessRulesService } from '../business-rules/business-rules.service';
import { AuditService } from '../platform/audit';
import { RequestContextService } from '../platform/request-context';
import { StatusTransitionService } from '../platform/status-transitions';
import { PrismaService } from '../prisma/prisma.service';
import { AiCoreService } from './ai-core.service';
import {
  WorkflowAiRequestDto,
  WorkflowRuleSuggestionDto,
} from './dto/workflow-ai.dto';
import { WorkflowAiResultEntity } from './entities/workflow-ai.entity';

@Injectable()
export class WorkflowAiService {
  private readonly requestTransitions = [
    { from: 'PENDING', to: ['APPROVED', 'REJECTED', 'CANCELLED'] },
  ];

  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
    private readonly audit: AuditService,
    private readonly aiCore: AiCoreService,
    private readonly businessRules: BusinessRulesService,
    private readonly transitions: StatusTransitionService,
  ) {}

  async recommendApproval(dto: WorkflowAiRequestDto) {
    const request = await this.getWorkflowRequest(dto.workflowRequestId);
    const canApprove = this.transitions.canTransition({
      entity: 'WorkflowRequest',
      currentStatus: request.status,
      nextStatus: 'APPROVED',
      rules: this.requestTransitions,
    });
    const canReject = this.transitions.canTransition({
      entity: 'WorkflowRequest',
      currentStatus: request.status,
      nextStatus: 'REJECTED',
      rules: this.requestTransitions,
    });
    const ruleResult = await this.businessRules.evaluate({
      companyId: request.workflow.companyId,
      module: 'workflows',
      entity: request.entityType,
      trigger: 'API',
      payload: {
        workflowRequestId: request.id,
        status: request.status,
        stepCount: request.steps.length,
        pendingSteps: request.steps.filter((step) => step.status === 'PENDING').length,
      },
    });
    const data = {
      workflowRequestId: request.id,
      status: request.status,
      canApprove: canApprove.allowed,
      canReject: canReject.allowed,
      ruleActions: ruleResult.actions,
      pendingSteps: request.steps.filter((step) => step.status === 'PENDING').length,
    };
    const ai = await this.aiCore.complete({
      companyId: request.workflow.companyId,
      feature: 'WORKFLOW',
      operation: 'approval-recommendation',
      prompt: 'Recommend whether this workflow request should be approved, rejected, or reviewed.',
      context: data,
    });

    await this.audit.record({
      action: 'AI_WORKFLOW_APPROVAL_RECOMMENDATION',
      entity: 'WorkflowRequest',
      entityId: request.id,
      payload: data as unknown as Prisma.InputJsonObject,
    });

    return new WorkflowAiResultEntity({
      summary: ai.responseText ?? '',
      aiRequestLogId: ai.id,
      data,
    });
  }

  async scoreRisk(dto: WorkflowAiRequestDto) {
    const request = await this.getWorkflowRequest(dto.workflowRequestId);
    const pendingSteps = request.steps.filter((step) => step.status === 'PENDING').length;
    const rejectedSteps = request.steps.filter((step) => step.status === 'REJECTED').length;
    const ageHours = Math.round(
      (Date.now() - request.submittedAt.getTime()) / (60 * 60 * 1000),
    );
    const riskScore = Math.min(100, pendingSteps * 15 + rejectedSteps * 35 + ageHours);
    const data = {
      workflowRequestId: request.id,
      status: request.status,
      pendingSteps,
      rejectedSteps,
      ageHours,
      riskScore,
      riskLevel: riskScore >= 70 ? 'HIGH' : riskScore >= 35 ? 'MEDIUM' : 'LOW',
    };
    const ai = await this.aiCore.complete({
      companyId: request.workflow.companyId,
      feature: 'WORKFLOW',
      operation: 'risk-scoring',
      prompt: 'Explain workflow risk level and recommended mitigation.',
      context: data,
    });

    await this.audit.record({
      action: 'AI_WORKFLOW_RISK_SCORE',
      entity: 'WorkflowRequest',
      entityId: request.id,
      payload: data as Prisma.InputJsonObject,
    });

    return new WorkflowAiResultEntity({
      summary: ai.responseText ?? '',
      aiRequestLogId: ai.id,
      data,
    });
  }

  async suggestRules(dto: WorkflowRuleSuggestionDto) {
    const companyId = dto.companyId ?? this.context.getCompanyId();
    const [definitionCount, pendingRequests, rejectedRequests] =
      await this.prisma.$transaction([
        this.prisma.workflowDefinition.count({
          where: { ...(companyId ? { companyId } : {}), entityType: dto.entityType },
        }),
        this.prisma.workflowRequest.count({
          where: {
            workflow: { ...(companyId ? { companyId } : {}), entityType: dto.entityType },
            status: 'PENDING',
          },
        }),
        this.prisma.workflowRequest.count({
          where: {
            workflow: { ...(companyId ? { companyId } : {}), entityType: dto.entityType },
            status: 'REJECTED',
          },
        }),
      ]);
    const data = {
      companyId,
      entityType: dto.entityType,
      definitionCount,
      pendingRequests,
      rejectedRequests,
      suggestedRules: [
        'Escalate pending approvals after threshold hours',
        'Require additional review for high-risk entities',
        'Notify approver when rejection rate increases',
      ],
    };
    const ai = await this.aiCore.complete({
      companyId: companyId ?? undefined,
      feature: 'WORKFLOW',
      operation: 'rule-suggestions',
      prompt: 'Suggest business rules that would improve workflow governance.',
      context: data,
    });

    await this.audit.record({
      action: 'AI_WORKFLOW_RULE_SUGGESTIONS',
      entity: 'WorkflowDefinition',
      payload: data as Prisma.InputJsonObject,
    });

    return new WorkflowAiResultEntity({
      summary: ai.responseText ?? '',
      aiRequestLogId: ai.id,
      data,
    });
  }

  private async getWorkflowRequest(id: string) {
    const request = await this.prisma.workflowRequest.findUnique({
      where: { id },
      include: {
        workflow: true,
        steps: true,
      },
    });
    if (!request) throw new NotFoundException('Workflow request not found');
    return request;
  }
}
