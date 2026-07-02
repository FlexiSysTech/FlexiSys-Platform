import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { BusinessRulesService } from '../business-rules/business-rules.service';
import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { PrismaService } from '../prisma/prisma.service';
import { AiCoreService } from './ai-core.service';
import {
  DocumentAlertsQueryDto,
  EmployeeInsightQueryDto,
  LeaveAnalysisQueryDto,
  PayrollExplanationQueryDto,
} from './dto/hr-assistant-query.dto';
import { AiAssistantInsightEntity } from './entities/hr-assistant.entity';

@Injectable()
export class HrAssistantService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
    private readonly pagination: PaginationService,
    private readonly audit: AuditService,
    private readonly aiCore: AiCoreService,
    private readonly businessRules: BusinessRulesService,
  ) {}

  async getEmployeeInsights(query: EmployeeInsightQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const where: Prisma.EmployeeWhereInput = {
      ...(companyId ? { companyId } : {}),
      ...(query.departmentId ? { departmentId: query.departmentId } : {}),
    };

    const [totalEmployees, activeEmployees, byStatus, recentHires] =
      await this.prisma.$transaction([
        this.prisma.employee.count({ where }),
        this.prisma.employee.count({ where: { ...where, status: 'ACTIVE' } }),
        this.prisma.employee.groupBy({
          by: ['status'],
          where,
          _count: { status: true },
          orderBy: { status: 'asc' },
        }),
        this.prisma.employee.count({
          where: {
            ...where,
            hireDate: {
              gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            },
          },
        }),
      ]);

    const data = { companyId, totalEmployees, activeEmployees, byStatus, recentHires };
    const ai = await this.aiCore.complete({
      companyId: companyId ?? undefined,
      feature: 'HR_ASSISTANT',
      operation: 'employee-insights',
      prompt: 'Summarize employee workforce insights from the supplied HR metrics.',
      context: data,
    });

    await this.audit.record({
      action: 'AI_HR_EMPLOYEE_INSIGHTS',
      entity: 'AI',
      entityId: ai.id,
      payload: data as Prisma.InputJsonObject,
    });

    return new AiAssistantInsightEntity({
      summary: ai.responseText ?? '',
      aiRequestLogId: ai.id,
      data,
    });
  }

  async analyzeLeave(query: LeaveAnalysisQueryDto) {
    await this.ensureCompanyExists(query.companyId);
    const from = query.from ? new Date(query.from) : undefined;
    const to = query.to ? new Date(query.to) : undefined;
    const where: Prisma.LeaveRequestWhereInput = {
      employee: { companyId: query.companyId },
      ...(from || to
        ? {
            startDate: {
              ...(from ? { gte: from } : {}),
              ...(to ? { lte: to } : {}),
            },
          }
        : {}),
    };

    const [totalRequests, approvedRequests, pendingRequests, byStatus] =
      await this.prisma.$transaction([
        this.prisma.leaveRequest.count({ where }),
        this.prisma.leaveRequest.count({ where: { ...where, status: 'APPROVED' } }),
        this.prisma.leaveRequest.count({ where: { ...where, status: 'PENDING' } }),
        this.prisma.leaveRequest.groupBy({
          by: ['status'],
          where,
          _count: { status: true },
          orderBy: { status: 'asc' },
        }),
      ]);

    const data = {
      companyId: query.companyId,
      from: query.from,
      to: query.to,
      totalRequests,
      approvedRequests,
      pendingRequests,
      byStatus,
    };
    const ai = await this.aiCore.complete({
      companyId: query.companyId,
      feature: 'HR_ASSISTANT',
      operation: 'leave-analysis',
      prompt: 'Analyze leave trends, pending workload, and operational risks.',
      context: data,
    });

    await this.audit.record({
      action: 'AI_HR_LEAVE_ANALYSIS',
      entity: 'AI',
      entityId: ai.id,
      payload: data as Prisma.InputJsonObject,
    });

    return new AiAssistantInsightEntity({
      summary: ai.responseText ?? '',
      aiRequestLogId: ai.id,
      data,
    });
  }

  async explainPayroll(query: PayrollExplanationQueryDto) {
    const run = await this.prisma.payrollRun.findUnique({
      where: { id: query.payrollRunId },
      include: {
        items: true,
        period: true,
      },
    });
    if (!run) throw new NotFoundException('Payroll run not found');

    const totals = {
      grossSalary: Number(run.grossSalary),
      taxableSalary: Number(run.taxableSalary),
      totalDeductions: Number(run.totalDeductions),
      netSalary: Number(run.netSalary),
      employerCost: Number(run.employerCost),
    };
    const data = {
      payrollRunId: run.id,
      companyId: run.companyId,
      periodId: run.periodId,
      status: run.status,
      itemCount: run.items.length,
      totals,
    };

    const ai = await this.aiCore.complete({
      companyId: run.companyId,
      feature: 'HR_ASSISTANT',
      operation: 'payroll-explanation',
      prompt: 'Explain this payroll run in plain language for HR and finance review.',
      context: data,
    });

    await this.audit.record({
      action: 'AI_HR_PAYROLL_EXPLANATION',
      entity: 'PayrollRun',
      entityId: run.id,
      payload: data as Prisma.InputJsonObject,
    });

    return new AiAssistantInsightEntity({
      summary: ai.responseText ?? '',
      aiRequestLogId: ai.id,
      data,
    });
  }

  async getDocumentAlerts(query: DocumentAlertsQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const expiryLimit = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const where: Prisma.DocumentWhereInput = {
      ...(companyId ? { companyId } : {}),
      status: 'ACTIVE',
      expiryDate: { lte: expiryLimit },
    };

    const [documents, total] = await this.prisma.$transaction([
      this.prisma.document.findMany({
        where,
        orderBy: { expiryDate: 'asc' },
        select: {
          id: true,
          code: true,
          title: true,
          expiryDate: true,
          employeeId: true,
        },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.document.count({ where }),
    ]);

    const ruleResult = await this.businessRules.evaluate({
      companyId: companyId ?? undefined,
      module: 'documents',
      entity: 'document-alerts',
      trigger: 'API',
      payload: { expiringDocumentCount: total },
    });

    const data = {
      companyId,
      expiringDocumentCount: total,
      documents,
      ruleActions: ruleResult.actions,
    };
    const ai = await this.aiCore.complete({
      companyId: companyId ?? undefined,
      feature: 'HR_ASSISTANT',
      operation: 'document-alerts',
      prompt: 'Summarize document expiration alerts and recommended follow-up.',
      context: data,
    });

    await this.audit.record({
      action: 'AI_HR_DOCUMENT_ALERTS',
      entity: 'Document',
      entityId: ai.id,
      payload: { companyId, expiringDocumentCount: total },
    });

    return this.pagination.buildResponse(
      documents,
      total,
      query,
    );
  }

  private async ensureCompanyExists(companyId: string): Promise<void> {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      select: { id: true },
    });
    if (!company) throw new NotFoundException('Company not found');
  }
}
