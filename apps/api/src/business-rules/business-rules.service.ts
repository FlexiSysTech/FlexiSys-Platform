import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BusinessRuleStatus, Prisma } from '@prisma/client';

import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { StatusTransitionService } from '../platform/status-transitions';
import { PrismaService } from '../prisma/prisma.service';
import { BusinessRuleQueryDto } from './dto/business-rule-query.dto';
import { CreateBusinessRuleActionDto } from './dto/create-business-rule-action.dto';
import { CreateBusinessRuleCategoryDto } from './dto/create-business-rule-category.dto';
import { CreateBusinessRuleConditionDto } from './dto/create-business-rule-condition.dto';
import { CreateBusinessRuleDto } from './dto/create-business-rule.dto';
import { EvaluateBusinessRulesDto } from './dto/evaluate-business-rules.dto';
import { UpdateBusinessRuleActionDto } from './dto/update-business-rule-action.dto';
import { UpdateBusinessRuleCategoryDto } from './dto/update-business-rule-category.dto';
import { UpdateBusinessRuleConditionDto } from './dto/update-business-rule-condition.dto';
import { UpdateBusinessRuleDto } from './dto/update-business-rule.dto';
import {
  BusinessRuleActionEntity,
  BusinessRuleConditionEntity,
} from './entities/business-rule-component.entity';
import {
  BusinessRuleCategoryEntity,
  BusinessRuleEntity,
} from './entities/business-rule.entity';
import {
  BusinessRuleEvaluationActionEntity,
  BusinessRuleEvaluationEntity,
} from './entities/business-rule-evaluation.entity';

@Injectable()
export class BusinessRulesService {
  private readonly statusRules = [
    { from: 'DRAFT' as BusinessRuleStatus, to: ['ACTIVE', 'ARCHIVED'] as BusinessRuleStatus[] },
    { from: 'ACTIVE' as BusinessRuleStatus, to: ['INACTIVE', 'ARCHIVED'] as BusinessRuleStatus[] },
    { from: 'INACTIVE' as BusinessRuleStatus, to: ['ACTIVE', 'ARCHIVED'] as BusinessRuleStatus[] },
  ];

  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
    private readonly pagination: PaginationService,
    private readonly audit: AuditService,
    private readonly softDelete: SoftDeleteService,
    private readonly transitions: StatusTransitionService,
  ) {}

  async findCategories(query: BusinessRuleQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.BusinessRuleCategoryWhereInput = this.softDelete.activeWhere({
      ...(companyId ? { companyId } : {}),
      ...(normalized.search
        ? {
            OR: [
              { code: { contains: normalized.search, mode: 'insensitive' } },
              { name: { contains: normalized.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    });

    const [items, total] = await this.prisma.$transaction([
      this.prisma.businessRuleCategory.findMany({
        where,
        orderBy: { code: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.businessRuleCategory.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new BusinessRuleCategoryEntity(item)),
      total,
      query,
    );
  }

  async createCategory(dto: CreateBusinessRuleCategoryDto) {
    const companyId = await this.resolveCompanyId(dto.companyId);
    await this.ensureCategoryCodeUnique(companyId, dto.code);

    const item = await this.prisma.businessRuleCategory.create({
      data: {
        companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        isSystem: dto.isSystem ?? false,
        createdById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'BUSINESS_RULE_CATEGORY_CREATE',
      entity: 'BusinessRuleCategory',
      entityId: item.id,
      payload: { code: item.code, companyId: item.companyId },
    });

    return new BusinessRuleCategoryEntity(item);
  }

  async updateCategory(id: string, dto: UpdateBusinessRuleCategoryDto) {
    const current = await this.ensureCategoryExists(id);
    const companyId = dto.companyId
      ? await this.resolveCompanyId(dto.companyId)
      : current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId || dto.code) {
      await this.ensureCategoryCodeUnique(companyId, code, id);
    }

    const item = await this.prisma.businessRuleCategory.update({
      where: { id },
      data: {
        companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        isSystem: dto.isSystem,
        updatedById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'BUSINESS_RULE_CATEGORY_UPDATE',
      entity: 'BusinessRuleCategory',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });

    return new BusinessRuleCategoryEntity(item);
  }

  async removeCategory(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.businessRuleCategory as never,
      id,
    );

    await this.audit.record({
      action: 'BUSINESS_RULE_CATEGORY_DELETE',
      entity: 'BusinessRuleCategory',
      entityId: id,
      payload: { deleted: true },
    });

    return {
      success: true,
      deletedCategory: new BusinessRuleCategoryEntity(result.record),
    };
  }

  async findRules(query: BusinessRuleQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.BusinessRuleWhereInput = this.softDelete.activeWhere({
      ...(companyId ? { companyId } : {}),
      ...(query.branchId ? { branchId: query.branchId } : {}),
      ...(query.module ? { module: query.module } : {}),
      ...(query.entity ? { entity: query.entity } : {}),
      ...(query.trigger ? { trigger: query.trigger } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(normalized.search
        ? {
            OR: [
              { code: { contains: normalized.search, mode: 'insensitive' } },
              { name: { contains: normalized.search, mode: 'insensitive' } },
              { module: { contains: normalized.search, mode: 'insensitive' } },
              { entity: { contains: normalized.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    });

    const [items, total] = await this.prisma.$transaction([
      this.prisma.businessRule.findMany({
        where,
        orderBy: [{ priority: 'asc' }, { code: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.businessRule.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new BusinessRuleEntity(item)),
      total,
      query,
    );
  }

  async findRule(id: string) {
    const item = await this.prisma.businessRule.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });

    if (!item) {
      throw new NotFoundException('Business rule not found');
    }

    return new BusinessRuleEntity(item);
  }

  async createRule(dto: CreateBusinessRuleDto) {
    const companyId = await this.resolveCompanyId(dto.companyId);
    await this.ensureRuleDependencies(companyId, dto.branchId, dto.categoryId);
    await this.ensureRuleCodeUnique(companyId, dto.code);

    const status = dto.status ?? 'DRAFT';
    if (status !== 'DRAFT') {
      this.transitions.assertTransition({
        entity: 'BusinessRule',
        currentStatus: 'DRAFT',
        nextStatus: status,
        rules: this.statusRules,
      });
    }

    const item = await this.prisma.businessRule.create({
      data: {
        companyId,
        branchId: dto.branchId,
        categoryId: dto.categoryId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        module: dto.module,
        entity: dto.entity,
        trigger: dto.trigger ?? 'API',
        scope: dto.scope ?? 'COMPANY',
        status,
        priority: dto.priority ?? 100,
        effectiveFrom: dto.effectiveFrom,
        effectiveTo: dto.effectiveTo,
        stopProcessing: dto.stopProcessing ?? false,
        metadata: this.toJson(dto.metadata),
        createdById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'BUSINESS_RULE_CREATE',
      entity: 'BusinessRule',
      entityId: item.id,
      payload: { code: item.code, status: item.status, companyId: item.companyId },
    });

    return new BusinessRuleEntity(item);
  }

  async updateRule(id: string, dto: UpdateBusinessRuleDto) {
    const current = await this.prisma.businessRule.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!current) throw new NotFoundException('Business rule not found');

    const companyId = dto.companyId
      ? await this.resolveCompanyId(dto.companyId)
      : current.companyId;
    if (dto.companyId || dto.branchId || dto.categoryId) {
      await this.ensureRuleDependencies(
        companyId,
        dto.branchId ?? current.branchId ?? undefined,
        dto.categoryId ?? current.categoryId ?? undefined,
      );
    }
    if (dto.companyId || dto.code) {
      await this.ensureRuleCodeUnique(companyId, dto.code ?? current.code, id);
    }
    if (dto.status && dto.status !== current.status) {
      this.transitions.assertTransition({
        entity: 'BusinessRule',
        currentStatus: current.status,
        nextStatus: dto.status,
        rules: this.statusRules,
      });
    }
    if (dto.effectiveFrom && dto.effectiveTo && dto.effectiveFrom > dto.effectiveTo) {
      throw new BadRequestException('Effective from must be before effective to');
    }

    const item = await this.prisma.businessRule.update({
      where: { id },
      data: {
        companyId,
        branchId: dto.branchId,
        categoryId: dto.categoryId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        module: dto.module,
        entity: dto.entity,
        trigger: dto.trigger,
        scope: dto.scope,
        status: dto.status,
        priority: dto.priority,
        effectiveFrom: dto.effectiveFrom,
        effectiveTo: dto.effectiveTo,
        stopProcessing: dto.stopProcessing,
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        updatedById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'BUSINESS_RULE_UPDATE',
      entity: 'BusinessRule',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });

    return new BusinessRuleEntity(item);
  }

  async removeRule(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.businessRule as never,
      id,
    );

    await this.audit.record({
      action: 'BUSINESS_RULE_DELETE',
      entity: 'BusinessRule',
      entityId: id,
      payload: { deleted: true },
    });

    return { success: true, deletedRule: new BusinessRuleEntity(result.record) };
  }

  async findConditions(ruleId: string, query: BusinessRuleQueryDto) {
    await this.ensureRuleExists(ruleId);
    const where: Prisma.BusinessRuleConditionWhereInput =
      this.softDelete.activeWhere({ ruleId });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.businessRuleCondition.findMany({
        where,
        orderBy: [{ displayOrder: 'asc' }, { field: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.businessRuleCondition.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new BusinessRuleConditionEntity(item)),
      total,
      query,
    );
  }

  async createCondition(ruleId: string, dto: CreateBusinessRuleConditionDto) {
    await this.ensureRuleExists(ruleId);
    const item = await this.prisma.businessRuleCondition.create({
      data: {
        ruleId,
        field: dto.field,
        operator: dto.operator,
        value: this.toJson(dto.value),
        logicalOperator: dto.logicalOperator ?? 'AND',
        groupKey: dto.groupKey,
        displayOrder: dto.displayOrder ?? 0,
      },
    });

    await this.audit.record({
      action: 'BUSINESS_RULE_CONDITION_CREATE',
      entity: 'BusinessRuleCondition',
      entityId: item.id,
      payload: { ruleId, field: item.field, operator: item.operator },
    });

    return new BusinessRuleConditionEntity(item);
  }

  async updateCondition(
    ruleId: string,
    conditionId: string,
    dto: UpdateBusinessRuleConditionDto,
  ) {
    await this.ensureRuleExists(ruleId);
    const current = await this.ensureConditionExists(ruleId, conditionId);
    const item = await this.prisma.businessRuleCondition.update({
      where: { id: conditionId },
      data: {
        field: dto.field,
        operator: dto.operator,
        value: dto.value === undefined ? undefined : this.toJson(dto.value),
        logicalOperator: dto.logicalOperator,
        groupKey: dto.groupKey,
        displayOrder: dto.displayOrder,
      },
    });

    await this.audit.record({
      action: 'BUSINESS_RULE_CONDITION_UPDATE',
      entity: 'BusinessRuleCondition',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });

    return new BusinessRuleConditionEntity(item);
  }

  async removeCondition(ruleId: string, conditionId: string) {
    await this.ensureRuleExists(ruleId);
    await this.ensureConditionExists(ruleId, conditionId);
    const result = await this.softDelete.softDelete(
      this.prisma.businessRuleCondition as never,
      conditionId,
    );

    await this.audit.record({
      action: 'BUSINESS_RULE_CONDITION_DELETE',
      entity: 'BusinessRuleCondition',
      entityId: conditionId,
      payload: { ruleId, deleted: true },
    });

    return {
      success: true,
      deletedCondition: new BusinessRuleConditionEntity(result.record),
    };
  }

  async findActions(ruleId: string, query: BusinessRuleQueryDto) {
    await this.ensureRuleExists(ruleId);
    const where: Prisma.BusinessRuleActionWhereInput =
      this.softDelete.activeWhere({ ruleId });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.businessRuleAction.findMany({
        where,
        orderBy: [{ displayOrder: 'asc' }, { type: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.businessRuleAction.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new BusinessRuleActionEntity(item)),
      total,
      query,
    );
  }

  async createAction(ruleId: string, dto: CreateBusinessRuleActionDto) {
    await this.ensureRuleExists(ruleId);
    const item = await this.prisma.businessRuleAction.create({
      data: {
        ruleId,
        type: dto.type,
        target: dto.target,
        value: this.toJson(dto.value),
        message: dto.message,
        displayOrder: dto.displayOrder ?? 0,
      },
    });

    await this.audit.record({
      action: 'BUSINESS_RULE_ACTION_CREATE',
      entity: 'BusinessRuleAction',
      entityId: item.id,
      payload: { ruleId, type: item.type, target: item.target },
    });

    return new BusinessRuleActionEntity(item);
  }

  async updateAction(
    ruleId: string,
    actionId: string,
    dto: UpdateBusinessRuleActionDto,
  ) {
    await this.ensureRuleExists(ruleId);
    const current = await this.ensureActionExists(ruleId, actionId);
    const item = await this.prisma.businessRuleAction.update({
      where: { id: actionId },
      data: {
        type: dto.type,
        target: dto.target,
        value: dto.value === undefined ? undefined : this.toJson(dto.value),
        message: dto.message,
        displayOrder: dto.displayOrder,
      },
    });

    await this.audit.record({
      action: 'BUSINESS_RULE_ACTION_UPDATE',
      entity: 'BusinessRuleAction',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });

    return new BusinessRuleActionEntity(item);
  }

  async removeAction(ruleId: string, actionId: string) {
    await this.ensureRuleExists(ruleId);
    await this.ensureActionExists(ruleId, actionId);
    const result = await this.softDelete.softDelete(
      this.prisma.businessRuleAction as never,
      actionId,
    );

    await this.audit.record({
      action: 'BUSINESS_RULE_ACTION_DELETE',
      entity: 'BusinessRuleAction',
      entityId: actionId,
      payload: { ruleId, deleted: true },
    });

    return {
      success: true,
      deletedAction: new BusinessRuleActionEntity(result.record),
    };
  }

  async evaluate(dto: EvaluateBusinessRulesDto) {
    const companyId = await this.resolveCompanyId(dto.companyId);
    const branchId = dto.branchId ?? this.context.getBranchId();
    const trigger = dto.trigger ?? 'API';
    const now = new Date();

    const rules = await this.prisma.businessRule.findMany({
      where: this.softDelete.activeWhere({
        module: dto.module,
        entity: dto.entity,
        trigger,
        status: 'ACTIVE',
        AND: [
          { OR: [{ companyId: null }, ...(companyId ? [{ companyId }] : [])] },
          ...(branchId ? [{ OR: [{ branchId: null }, { branchId }] }] : []),
          { OR: [{ effectiveFrom: null }, { effectiveFrom: { lte: now } }] },
          { OR: [{ effectiveTo: null }, { effectiveTo: { gte: now } }] },
        ],
      }),
      include: {
        conditions: {
          where: { deletedAt: null },
          orderBy: [{ displayOrder: 'asc' }, { field: 'asc' }],
        },
        actions: {
          where: { deletedAt: null },
          orderBy: [{ displayOrder: 'asc' }, { type: 'asc' }],
        },
      },
      orderBy: [{ priority: 'asc' }, { code: 'asc' }],
    });

    const matchedRuleIds: string[] = [];
    const actions: BusinessRuleEvaluationActionEntity[] = [];
    let blocked = false;

    for (const rule of rules) {
      const matched = this.evaluateConditions(rule.conditions, dto.payload);
      const status = matched
        ? rule.actions.some((action) => action.type === 'VALIDATION_ERROR')
          ? 'BLOCKED'
          : 'MATCHED'
        : 'NOT_MATCHED';

      await this.prisma.businessRuleExecution.create({
        data: {
          companyId,
          ruleId: rule.id,
          module: dto.module,
          entity: dto.entity,
          trigger,
          status,
          input: this.toJson(dto.payload),
          result: this.toJson({ matched, actionCount: rule.actions.length }),
          executedById: this.context.getUserId(),
        },
      });

      if (!matched) continue;
      matchedRuleIds.push(rule.id);

      for (const action of rule.actions) {
        actions.push(
          new BusinessRuleEvaluationActionEntity({
            ruleId: rule.id,
            ruleCode: rule.code,
            type: action.type,
            target: action.target,
            value: action.value,
            message: action.message,
          }),
        );
        if (action.type === 'VALIDATION_ERROR') blocked = true;
      }

      if (rule.stopProcessing) break;
    }

    const result = new BusinessRuleEvaluationEntity({
      matched: matchedRuleIds.length > 0,
      blocked,
      evaluatedRuleCount: rules.length,
      matchedRuleCount: matchedRuleIds.length,
      matchedRuleIds,
      actions,
    });

    await this.audit.record({
      action: 'BUSINESS_RULE_EVALUATE',
      entity: 'BusinessRule',
      payload: {
        module: dto.module,
        entity: dto.entity,
        trigger,
        matchedRuleIds,
        blocked,
      },
    });

    return result;
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

  private async ensureRuleDependencies(
    companyId: string | null,
    branchId?: string,
    categoryId?: string,
  ): Promise<void> {
    if (branchId) {
      const branch = await this.prisma.branch.findUnique({
        where: { id: branchId },
        select: { id: true, companyId: true },
      });
      if (!branch) throw new NotFoundException('Branch not found');
      if (companyId && branch.companyId !== companyId) {
        throw new BadRequestException('Branch belongs to another company');
      }
    }
    if (categoryId) {
      const category = await this.ensureCategoryExists(categoryId);
      if (companyId && category.companyId && category.companyId !== companyId) {
        throw new BadRequestException('Category belongs to another company');
      }
    }
  }

  private async ensureCategoryExists(id: string) {
    const category = await this.prisma.businessRuleCategory.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!category) throw new NotFoundException('Business rule category not found');
    return category;
  }

  private async ensureRuleExists(id: string) {
    const rule = await this.prisma.businessRule.findFirst({
      where: this.softDelete.activeWhere({ id }),
      select: { id: true },
    });
    if (!rule) throw new NotFoundException('Business rule not found');
    return rule;
  }

  private async ensureConditionExists(ruleId: string, id: string) {
    const condition = await this.prisma.businessRuleCondition.findFirst({
      where: this.softDelete.activeWhere({ id, ruleId }),
    });
    if (!condition) throw new NotFoundException('Business rule condition not found');
    return condition;
  }

  private async ensureActionExists(ruleId: string, id: string) {
    const action = await this.prisma.businessRuleAction.findFirst({
      where: this.softDelete.activeWhere({ id, ruleId }),
    });
    if (!action) throw new NotFoundException('Business rule action not found');
    return action;
  }

  private async ensureCategoryCodeUnique(
    companyId: string | null,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.businessRuleCategory.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    if (item) throw new ConflictException('Business rule category code exists');
  }

  private async ensureRuleCodeUnique(
    companyId: string | null,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.businessRule.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    if (item) throw new ConflictException('Business rule code exists');
  }

  private toJson(value: unknown): Prisma.InputJsonValue | undefined {
    return value === undefined ? undefined : (value as Prisma.InputJsonValue);
  }

  private evaluateConditions(
    conditions: Array<{
      field: string;
      operator: string;
      value: unknown;
      logicalOperator: string;
    }>,
    payload: Record<string, unknown>,
  ): boolean {
    if (conditions.length === 0) return true;

    return conditions.reduce((result, condition, index) => {
      const passed = this.evaluateCondition(condition, payload);
      if (index === 0) return passed;
      return condition.logicalOperator === 'OR' ? result || passed : result && passed;
    }, true);
  }

  private evaluateCondition(
    condition: { field: string; operator: string; value: unknown },
    payload: Record<string, unknown>,
  ): boolean {
    const actual = this.getPathValue(payload, condition.field);
    const expected = this.unwrapExpectedValue(condition.value);

    switch (condition.operator) {
      case 'EQUALS':
        return actual === expected;
      case 'NOT_EQUALS':
        return actual !== expected;
      case 'GREATER_THAN':
        return Number(actual) > Number(expected);
      case 'GREATER_THAN_OR_EQUALS':
        return Number(actual) >= Number(expected);
      case 'LESS_THAN':
        return Number(actual) < Number(expected);
      case 'LESS_THAN_OR_EQUALS':
        return Number(actual) <= Number(expected);
      case 'CONTAINS':
        return String(actual ?? '').includes(String(expected ?? ''));
      case 'NOT_CONTAINS':
        return !String(actual ?? '').includes(String(expected ?? ''));
      case 'IN':
        return Array.isArray(expected) && expected.includes(actual);
      case 'NOT_IN':
        return Array.isArray(expected) && !expected.includes(actual);
      case 'EXISTS':
        return actual !== undefined && actual !== null;
      case 'NOT_EXISTS':
        return actual === undefined || actual === null;
      default:
        return false;
    }
  }

  private getPathValue(payload: Record<string, unknown>, path: string): unknown {
    return path.split('.').reduce<unknown>((current, part) => {
      if (current && typeof current === 'object' && part in current) {
        return (current as Record<string, unknown>)[part];
      }
      return undefined;
    }, payload);
  }

  private unwrapExpectedValue(value: unknown): unknown {
    if (value && typeof value === 'object' && 'value' in value) {
      return (value as Record<string, unknown>).value;
    }
    if (value && typeof value === 'object' && 'values' in value) {
      return (value as Record<string, unknown>).values;
    }
    return value;
  }
}
