import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AiFeatureArea, AiGovernanceStatus, Prisma } from '@prisma/client';

import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { StatusTransitionService } from '../platform/status-transitions';
import { PrismaService } from '../prisma/prisma.service';
import {
  AiGovernanceQueryDto,
  CreateAiSafetyPolicyDto,
  CreateAiUsageLimitDto,
  UpdateAiSafetyPolicyDto,
  UpdateAiUsageLimitDto,
} from './dto/ai-governance.dto';
import {
  AiGovernanceAssessment,
  AiSafetyPolicyEntity,
  AiUsageLimitEntity,
} from './entities/ai-governance.entity';

@Injectable()
export class AiGovernanceService {
  private readonly statusRules = [
    { from: 'DRAFT' as AiGovernanceStatus, to: ['ACTIVE', 'ARCHIVED'] as AiGovernanceStatus[] },
    { from: 'ACTIVE' as AiGovernanceStatus, to: ['INACTIVE', 'ARCHIVED'] as AiGovernanceStatus[] },
    { from: 'INACTIVE' as AiGovernanceStatus, to: ['ACTIVE', 'ARCHIVED'] as AiGovernanceStatus[] },
  ];

  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
    private readonly pagination: PaginationService,
    private readonly audit: AuditService,
    private readonly softDelete: SoftDeleteService,
    private readonly transitions: StatusTransitionService,
  ) {}

  async assessRequest(input: {
    companyId: string | null;
    feature: AiFeatureArea;
    prompt: string;
  }): Promise<AiGovernanceAssessment> {
    const policies = await this.prisma.aiSafetyPolicy.findMany({
      where: this.softDelete.activeWhere({
        status: 'ACTIVE',
        OR: [{ companyId: null }, ...(input.companyId ? [{ companyId: input.companyId }] : [])],
      }),
    });
    const prompt = input.prompt.toLowerCase();

    for (const policy of policies) {
      const terms = this.getBlockedTerms(policy.blockedTerms);
      const blockedTerm = terms.find((term) => prompt.includes(term.toLowerCase()));
      if (blockedTerm) {
        return {
          allowed: false,
          reason: `Blocked by AI safety policy ${policy.code}: ${blockedTerm}`,
        };
      }
    }

    const limits = await this.prisma.aiUsageLimit.findMany({
      where: this.softDelete.activeWhere({
        status: 'ACTIVE',
        AND: [
          {
            OR: [
              { companyId: null },
              ...(input.companyId ? [{ companyId: input.companyId }] : []),
            ],
          },
          { OR: [{ feature: null }, { feature: input.feature }] },
        ],
      }),
    });
    if (limits.length === 0) return { allowed: true };

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const aggregate = await this.prisma.aiUsageRecord.aggregate({
      where: {
        ...(input.companyId ? { companyId: input.companyId } : {}),
        feature: input.feature,
        usedAt: { gte: monthStart },
      },
      _sum: { totalTokens: true, costAmount: true },
    });
    const usedTokens = aggregate._sum.totalTokens ?? 0;
    const usedCost = Number(aggregate._sum.costAmount ?? 0);

    for (const limit of limits) {
      if (limit.monthlyTokenLimit && usedTokens >= limit.monthlyTokenLimit) {
        return { allowed: false, reason: 'Monthly AI token limit reached' };
      }
      if (limit.monthlyCostLimit && usedCost >= Number(limit.monthlyCostLimit)) {
        return { allowed: false, reason: 'Monthly AI cost limit reached' };
      }
    }

    return { allowed: true };
  }

  async findLimits(query: AiGovernanceQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const where: Prisma.AiUsageLimitWhereInput = this.softDelete.activeWhere({
      ...(companyId ? { companyId } : {}),
      ...(query.status ? { status: query.status } : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.aiUsageLimit.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.aiUsageLimit.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new AiUsageLimitEntity(item)),
      total,
      query,
    );
  }

  async createLimit(dto: CreateAiUsageLimitDto) {
    const companyId = await this.resolveCompanyId(dto.companyId);
    const item = await this.prisma.aiUsageLimit.create({
      data: {
        companyId,
        feature: dto.feature,
        status: dto.status ?? 'DRAFT',
        monthlyTokenLimit: dto.monthlyTokenLimit,
        monthlyCostLimit: dto.monthlyCostLimit,
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'AI_USAGE_LIMIT_CREATE',
      entity: 'AiUsageLimit',
      entityId: item.id,
      payload: { companyId, feature: item.feature, status: item.status },
    });
    return new AiUsageLimitEntity(item);
  }

  async updateLimit(id: string, dto: UpdateAiUsageLimitDto) {
    const current = await this.ensureLimitExists(id);
    if (dto.status && dto.status !== current.status) {
      this.transitions.assertTransition({
        entity: 'AiUsageLimit',
        currentStatus: current.status,
        nextStatus: dto.status,
        rules: this.statusRules,
      });
    }
    const item = await this.prisma.aiUsageLimit.update({
      where: { id },
      data: {
        companyId: dto.companyId ? await this.resolveCompanyId(dto.companyId) : undefined,
        feature: dto.feature,
        status: dto.status,
        monthlyTokenLimit: dto.monthlyTokenLimit,
        monthlyCostLimit: dto.monthlyCostLimit,
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'AI_USAGE_LIMIT_UPDATE',
      entity: 'AiUsageLimit',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });
    return new AiUsageLimitEntity(item);
  }

  async removeLimit(id: string) {
    const result = await this.softDelete.softDelete(this.prisma.aiUsageLimit as never, id);
    await this.audit.record({
      action: 'AI_USAGE_LIMIT_DELETE',
      entity: 'AiUsageLimit',
      entityId: id,
      payload: { deleted: true },
    });
    return {
      success: true,
      deletedLimit: new AiUsageLimitEntity(result.record as AiUsageLimitEntity),
    };
  }

  async findPolicies(query: AiGovernanceQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const where: Prisma.AiSafetyPolicyWhereInput = this.softDelete.activeWhere({
      ...(companyId ? { companyId } : {}),
      ...(query.status ? { status: query.status } : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.aiSafetyPolicy.findMany({
        where,
        orderBy: { code: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.aiSafetyPolicy.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new AiSafetyPolicyEntity(item)),
      total,
      query,
    );
  }

  async createPolicy(dto: CreateAiSafetyPolicyDto) {
    const companyId = await this.resolveCompanyId(dto.companyId);
    await this.ensurePolicyCodeUnique(companyId, dto.code);
    const item = await this.prisma.aiSafetyPolicy.create({
      data: {
        companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        status: dto.status ?? 'DRAFT',
        blockedTerms: this.toJson(dto.blockedTerms ?? []),
        createdById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'AI_SAFETY_POLICY_CREATE',
      entity: 'AiSafetyPolicy',
      entityId: item.id,
      payload: { companyId, code: item.code, status: item.status },
    });
    return new AiSafetyPolicyEntity(item);
  }

  async updatePolicy(id: string, dto: UpdateAiSafetyPolicyDto) {
    const current = await this.ensurePolicyExists(id);
    const companyId = dto.companyId
      ? await this.resolveCompanyId(dto.companyId)
      : current.companyId;
    if (dto.code || dto.companyId) {
      await this.ensurePolicyCodeUnique(companyId, dto.code ?? current.code, id);
    }
    if (dto.status && dto.status !== current.status) {
      this.transitions.assertTransition({
        entity: 'AiSafetyPolicy',
        currentStatus: current.status,
        nextStatus: dto.status,
        rules: this.statusRules,
      });
    }
    const item = await this.prisma.aiSafetyPolicy.update({
      where: { id },
      data: {
        companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        status: dto.status,
        blockedTerms:
          dto.blockedTerms === undefined ? undefined : this.toJson(dto.blockedTerms),
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'AI_SAFETY_POLICY_UPDATE',
      entity: 'AiSafetyPolicy',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });
    return new AiSafetyPolicyEntity(item);
  }

  async removePolicy(id: string) {
    const result = await this.softDelete.softDelete(this.prisma.aiSafetyPolicy as never, id);
    await this.audit.record({
      action: 'AI_SAFETY_POLICY_DELETE',
      entity: 'AiSafetyPolicy',
      entityId: id,
      payload: { deleted: true },
    });
    return {
      success: true,
      deletedPolicy: new AiSafetyPolicyEntity(result.record as AiSafetyPolicyEntity),
    };
  }

  private getBlockedTerms(value: unknown): string[] {
    return Array.isArray(value) ? value.filter((item) => typeof item === 'string') : [];
  }

  private async resolveCompanyId(companyId?: string): Promise<string | null> {
    const resolved = companyId ?? this.context.getCompanyId();
    if (!resolved) return null;
    const company = await this.prisma.company.findUnique({
      where: { id: resolved },
      select: { id: true },
    });
    if (!company) throw new NotFoundException('Company not found');
    return resolved;
  }

  private async ensureLimitExists(id: string) {
    const item = await this.prisma.aiUsageLimit.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('AI usage limit not found');
    return item;
  }

  private async ensurePolicyExists(id: string) {
    const item = await this.prisma.aiSafetyPolicy.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('AI safety policy not found');
    return item;
  }

  private async ensurePolicyCodeUnique(
    companyId: string | null,
    code: string,
    excludeId?: string,
  ) {
    const item = await this.prisma.aiSafetyPolicy.findFirst({
      where: { companyId, code, ...(excludeId ? { id: { not: excludeId } } : {}) },
    });
    if (item) throw new ConflictException('AI safety policy code already exists');
  }

  private toJson(value: unknown): Prisma.InputJsonValue {
    return value as Prisma.InputJsonValue;
  }
}
