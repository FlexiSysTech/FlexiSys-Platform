import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { BusinessRulesService } from '../business-rules/business-rules.service';
import { AuditService } from '../platform/audit';
import { RequestContextService } from '../platform/request-context';
import { PrismaService } from '../prisma/prisma.service';
import { AiCoreService } from './ai-core.service';
import {
  AnomalyDetectionQueryDto,
  DashboardInsightsQueryDto,
  NaturalLanguageReportDto,
} from './dto/reporting-ai.dto';
import { ReportingAiResultEntity } from './entities/reporting-ai.entity';

@Injectable()
export class ReportingAiService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
    private readonly audit: AuditService,
    private readonly aiCore: AiCoreService,
    private readonly businessRules: BusinessRulesService,
  ) {}

  async interpretReportRequest(dto: NaturalLanguageReportDto) {
    const companyId = dto.companyId ?? this.context.getCompanyId();
    const terms = dto.request
      .toLowerCase()
      .split(/\W+/)
      .filter((term) => term.length > 2)
      .slice(0, 8);
    const definitions = await this.prisma.reportDefinition.findMany({
      where: {
        status: 'ACTIVE',
        AND: [
          ...(companyId ? [{ OR: [{ companyId }, { companyId: null }] }] : []),
          ...(terms.length
            ? [
                {
                  OR: terms.flatMap((term) => [
                    {
                      code: {
                        contains: term,
                        mode: Prisma.QueryMode.insensitive,
                      },
                    },
                    {
                      name: {
                        contains: term,
                        mode: Prisma.QueryMode.insensitive,
                      },
                    },
                    {
                      module: {
                        contains: term,
                        mode: Prisma.QueryMode.insensitive,
                      },
                    },
                  ]),
                },
              ]
            : []),
        ],
      },
      select: {
        id: true,
        code: true,
        name: true,
        module: true,
        handler: true,
      },
      take: 10,
      orderBy: { code: 'asc' },
    });
    const data = {
      companyId,
      request: dto.request,
      candidateReports: definitions,
      suggestedHandler: definitions[0]?.handler ?? null,
    };
    const ai = await this.aiCore.complete({
      companyId: companyId ?? undefined,
      feature: 'REPORTING',
      operation: 'natural-language-report',
      prompt: 'Interpret the natural language reporting request and identify likely report definitions.',
      context: data,
    });

    await this.audit.record({
      action: 'AI_REPORTING_NL_REQUEST',
      entity: 'ReportDefinition',
      entityId: definitions[0]?.id,
      payload: data as Prisma.InputJsonObject,
    });

    return new ReportingAiResultEntity({
      summary: ai.responseText ?? '',
      aiRequestLogId: ai.id,
      data,
    });
  }

  async getDashboardInsights(query: DashboardInsightsQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const [
      employees,
      openVacancies,
      pendingWorkflows,
      activeDocuments,
      payrollRuns,
      reportExecutions,
    ] = await this.prisma.$transaction([
      this.prisma.employee.count({
        where: { ...(companyId ? { companyId } : {}), status: 'ACTIVE' },
      }),
      this.prisma.vacancy.count({
        where: { ...(companyId ? { companyId } : {}), status: 'OPEN' },
      }),
      this.prisma.workflowRequest.count({
        where: {
          ...(companyId ? { workflow: { companyId } } : {}),
          status: 'PENDING',
        },
      }),
      this.prisma.document.count({
        where: { ...(companyId ? { companyId } : {}), status: 'ACTIVE' },
      }),
      this.prisma.payrollRun.count({
        where: { ...(companyId ? { companyId } : {}) },
      }),
      this.prisma.reportExecution.count({
        where: { ...(companyId ? { companyId } : {}) },
      }),
    ]);
    const data = {
      companyId,
      employees,
      openVacancies,
      pendingWorkflows,
      activeDocuments,
      payrollRuns,
      reportExecutions,
    };
    const ai = await this.aiCore.complete({
      companyId: companyId ?? undefined,
      feature: 'REPORTING',
      operation: 'dashboard-insights',
      prompt: 'Summarize dashboard metrics and highlight executive-level signals.',
      context: data,
    });

    await this.audit.record({
      action: 'AI_REPORTING_DASHBOARD_INSIGHTS',
      entity: 'ReportingDashboard',
      payload: data as Prisma.InputJsonObject,
    });

    return new ReportingAiResultEntity({
      summary: ai.responseText ?? '',
      aiRequestLogId: ai.id,
      data,
    });
  }

  async detectAnomalies(query: AnomalyDetectionQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const [failedReports, rejectedPayrollRuns, blockedRules] =
      await this.prisma.$transaction([
        this.prisma.reportExecution.count({
          where: { ...(companyId ? { companyId } : {}), status: 'FAILED' },
        }),
        this.prisma.payrollRun.count({
          where: { ...(companyId ? { companyId } : {}), status: 'REJECTED' },
        }),
        this.prisma.businessRuleExecution.count({
          where: { ...(companyId ? { companyId } : {}), status: 'BLOCKED' },
        }),
      ]);
    const anomalyScore = Math.min(
      100,
      failedReports * 20 + rejectedPayrollRuns * 25 + blockedRules * 10,
    );
    const data = {
      companyId,
      domain: query.domain ?? 'platform',
      failedReports,
      rejectedPayrollRuns,
      blockedRules,
      anomalyScore,
      anomalyLevel:
        anomalyScore >= 70 ? 'HIGH' : anomalyScore >= 35 ? 'MEDIUM' : 'LOW',
    };
    const ruleResult = await this.businessRules.evaluate({
      companyId: companyId ?? undefined,
      module: 'reporting',
      entity: 'anomaly-detection',
      trigger: 'API',
      payload: data,
    });
    const ai = await this.aiCore.complete({
      companyId: companyId ?? undefined,
      feature: 'REPORTING',
      operation: 'anomaly-detection',
      prompt: 'Explain anomaly signals and recommended investigation steps.',
      context: { ...data, ruleActions: ruleResult.actions },
    });

    await this.audit.record({
      action: 'AI_REPORTING_ANOMALY_DETECTION',
      entity: 'ReportingAnomaly',
      payload: data as Prisma.InputJsonObject,
    });

    return new ReportingAiResultEntity({
      summary: ai.responseText ?? '',
      aiRequestLogId: ai.id,
      data: { ...data, ruleActions: ruleResult.actions },
    });
  }
}
