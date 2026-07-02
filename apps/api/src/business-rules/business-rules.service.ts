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
import { CreateBusinessRuleCategoryDto } from './dto/create-business-rule-category.dto';
import { CreateBusinessRuleDto } from './dto/create-business-rule.dto';
import { UpdateBusinessRuleCategoryDto } from './dto/update-business-rule-category.dto';
import { UpdateBusinessRuleDto } from './dto/update-business-rule.dto';
import {
  BusinessRuleCategoryEntity,
  BusinessRuleEntity,
} from './entities/business-rule.entity';

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
}
