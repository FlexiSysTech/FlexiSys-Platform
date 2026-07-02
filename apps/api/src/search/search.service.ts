import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, SearchEntityType, SearchScope } from '@prisma/client';

import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { PrismaService } from '../prisma/prisma.service';
import {
  DomainSearchQueryDto,
  RebuildSearchIndexDto,
  SearchAuditQueryDto,
  SearchIndexQueryDto,
  SearchQueryDto,
  UpsertSearchIndexDto,
} from './dto/search.dto';
import {
  SearchAuditEntity,
  SearchIndexEntity,
  SearchRebuildResultEntity,
  SearchResultEntity,
} from './entities/search.entity';

type SearchableRecord = {
  tenantId?: string | null;
  companyId?: string | null;
  branchId?: string | null;
  entityType: SearchEntityType;
  entityId: string;
  title: string;
  subtitle?: string | null;
  content?: string | null;
  keywords?: string | null;
  sourceUpdatedAt?: Date | null;
  metadata?: Record<string, unknown>;
};

@Injectable()
export class SearchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagination: PaginationService,
    private readonly context: RequestContextService,
    private readonly audit: AuditService,
    private readonly softDelete: SoftDeleteService,
  ) {}

  async globalSearch(query: SearchQueryDto) {
    this.assertQuery(query.q);
    const startedAt = Date.now();
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.SearchIndexWhereInput = this.softDelete.activeWhere({
      ...(tenantId ? { tenantId } : {}),
      ...(query.companyId ? { companyId: query.companyId } : {}),
      ...(query.branchId ? { branchId: query.branchId } : {}),
      ...(query.entityTypes?.length ? { entityType: { in: query.entityTypes } } : {}),
      status: 'ACTIVE',
      OR: this.searchTextWhere(query.q),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.searchIndex.findMany({
        where,
        orderBy: [{ lastIndexedAt: 'desc' }, { title: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.searchIndex.count({ where }),
    ]);
    const results = items
      .map((item) => this.fromIndex(item, query.q))
      .sort((a, b) => b.score - a.score);
    await this.logSearch('GLOBAL', query.q, total, Date.now() - startedAt, {
      entityTypes: query.entityTypes,
      companyId: query.companyId,
      branchId: query.branchId,
    });
    return this.pagination.buildResponse(results, total, query);
  }

  async searchEmployees(query: DomainSearchQueryDto) {
    this.assertQuery(query.q);
    const startedAt = Date.now();
    const where: Prisma.EmployeeWhereInput = {
      ...(query.companyId ?? this.context.getCompanyId()
        ? { companyId: query.companyId ?? this.context.getCompanyId() }
        : {}),
      ...(query.branchId ? { branchId: query.branchId } : {}),
      ...(query.status ? { status: query.status as never } : {}),
      OR: [
        { employeeNumber: { contains: query.q, mode: 'insensitive' } },
        { fullName: { contains: query.q, mode: 'insensitive' } },
        { firstName: { contains: query.q, mode: 'insensitive' } },
        { lastName: { contains: query.q, mode: 'insensitive' } },
        { email: { contains: query.q, mode: 'insensitive' } },
        { phone: { contains: query.q, mode: 'insensitive' } },
      ],
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.employee.findMany({
        where,
        select: {
          id: true,
          employeeNumber: true,
          fullName: true,
          email: true,
          phone: true,
          companyId: true,
          branchId: true,
          department: { select: { name: true } },
          status: true,
          updatedAt: true,
        },
        orderBy: { fullName: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.employee.count({ where }),
    ]);
    const results = items.map(
      (item) =>
        new SearchResultEntity({
          id: `employee:${item.id}`,
          entityType: 'EMPLOYEE',
          entityId: item.id,
          title: item.fullName,
          subtitle: item.employeeNumber,
          snippet: [item.email, item.phone, item.department?.name]
            .filter(Boolean)
            .join(' | '),
          score: this.score(query.q, [item.fullName, item.employeeNumber, item.email]),
          companyId: item.companyId,
          branchId: item.branchId,
          metadata: { status: item.status },
        }),
    );
    await this.logSearch('EMPLOYEE', query.q, total, Date.now() - startedAt, {
      companyId: query.companyId,
      branchId: query.branchId,
      status: query.status,
    });
    return this.pagination.buildResponse(results, total, query);
  }

  async searchPayroll(query: DomainSearchQueryDto) {
    this.assertQuery(query.q);
    const startedAt = Date.now();
    const companyId = query.companyId ?? this.context.getCompanyId();
    const runWhere: Prisma.PayrollRunWhereInput = {
      ...(companyId ? { companyId } : {}),
      ...(query.status ? { status: query.status as never } : {}),
      OR: [
        { notes: { contains: query.q, mode: 'insensitive' } },
        ...(Number.isFinite(Number(query.q)) ? [{ year: Number(query.q) }] : []),
      ],
    };
    const itemWhere: Prisma.PayrollItemWhereInput = {
      ...(companyId ? { payrollRun: { companyId } } : {}),
      OR: [
        { name: { contains: query.q, mode: 'insensitive' } },
        { source: { contains: query.q, mode: 'insensitive' } },
        { sourceRef: { contains: query.q, mode: 'insensitive' } },
        { employee: { fullName: { contains: query.q, mode: 'insensitive' } } },
        { employee: { employeeNumber: { contains: query.q, mode: 'insensitive' } } },
      ],
    };
    const take = this.pagination.normalize(query).limit;
    const [runs, items, runTotal, itemTotal] = await this.prisma.$transaction([
      this.prisma.payrollRun.findMany({
        where: runWhere,
        select: {
          id: true,
          companyId: true,
          year: true,
          month: true,
          status: true,
          netSalary: true,
          grossSalary: true,
          updatedAt: true,
        },
        orderBy: [{ year: 'desc' }, { month: 'desc' }],
        take,
      }),
      this.prisma.payrollItem.findMany({
        where: itemWhere,
        select: {
          id: true,
          name: true,
          amount: true,
          category: true,
          type: true,
          employee: { select: { id: true, fullName: true, employeeNumber: true } },
          payrollRun: { select: { companyId: true, year: true, month: true } },
        },
        orderBy: { createdAt: 'desc' },
        take,
      }),
      this.prisma.payrollRun.count({ where: runWhere }),
      this.prisma.payrollItem.count({ where: itemWhere }),
    ]);
    const results = [
      ...runs.map(
        (item) =>
          new SearchResultEntity({
            id: `payroll-run:${item.id}`,
            entityType: 'PAYROLL_RUN',
            entityId: item.id,
            title: `Payroll ${item.year}-${String(item.month).padStart(2, '0')}`,
            subtitle: item.status,
            snippet: `Gross ${item.grossSalary.toString()} | Net ${item.netSalary.toString()}`,
            score: this.score(query.q, [String(item.year), String(item.month), item.status]),
            companyId: item.companyId,
            branchId: null,
            metadata: { year: item.year, month: item.month, status: item.status },
          }),
      ),
      ...items.map(
        (item) =>
          new SearchResultEntity({
            id: `payroll-item:${item.id}`,
            entityType: 'PAYROLL_ITEM',
            entityId: item.id,
            title: item.name,
            subtitle: item.employee.fullName,
            snippet: `${item.type} | ${item.category} | ${item.amount.toString()}`,
            score: this.score(query.q, [
              item.name,
              item.employee.fullName,
              item.employee.employeeNumber,
            ]),
            companyId: item.payrollRun.companyId,
            branchId: null,
            metadata: {
              employeeId: item.employee.id,
              year: item.payrollRun.year,
              month: item.payrollRun.month,
            },
          }),
      ),
    ].sort((a, b) => b.score - a.score);
    const total = runTotal + itemTotal;
    await this.logSearch('PAYROLL', query.q, total, Date.now() - startedAt, {
      companyId,
      status: query.status,
    });
    return this.pagination.buildResponse(results.slice(0, take), total, query);
  }

  async searchDocuments(query: DomainSearchQueryDto) {
    this.assertQuery(query.q);
    const startedAt = Date.now();
    const where: Prisma.DocumentWhereInput = {
      ...(query.companyId ?? this.context.getCompanyId()
        ? { companyId: query.companyId ?? this.context.getCompanyId() }
        : {}),
      ...(query.status ? { status: query.status as never } : {}),
      OR: [
        { code: { contains: query.q, mode: 'insensitive' } },
        { title: { contains: query.q, mode: 'insensitive' } },
        { description: { contains: query.q, mode: 'insensitive' } },
        { fileName: { contains: query.q, mode: 'insensitive' } },
        { tags: { contains: query.q, mode: 'insensitive' } },
        { employee: { fullName: { contains: query.q, mode: 'insensitive' } } },
      ],
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.document.findMany({
        where,
        select: {
          id: true,
          companyId: true,
          code: true,
          title: true,
          description: true,
          status: true,
          visibility: true,
          ownerType: true,
          employee: { select: { fullName: true } },
          category: { select: { name: true } },
        },
        orderBy: { updatedAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.document.count({ where }),
    ]);
    const results = items.map(
      (item) =>
        new SearchResultEntity({
          id: `document:${item.id}`,
          entityType: 'DOCUMENT',
          entityId: item.id,
          title: item.title,
          subtitle: item.code,
          snippet: [item.description, item.category?.name, item.employee?.fullName]
            .filter(Boolean)
            .join(' | '),
          score: this.score(query.q, [item.title, item.code, item.description]),
          companyId: item.companyId,
          branchId: null,
          metadata: {
            status: item.status,
            visibility: item.visibility,
            ownerType: item.ownerType,
          },
        }),
    );
    await this.logSearch('DOCUMENT', query.q, total, Date.now() - startedAt, {
      companyId: query.companyId,
      status: query.status,
    });
    return this.pagination.buildResponse(results, total, query);
  }

  async searchWorkflows(query: DomainSearchQueryDto) {
    this.assertQuery(query.q);
    const startedAt = Date.now();
    const companyId = query.companyId ?? this.context.getCompanyId();
    const definitionWhere: Prisma.WorkflowDefinitionWhereInput = {
      ...(companyId ? { companyId } : {}),
      ...(query.status ? { status: query.status as never } : {}),
      OR: [
        { code: { contains: query.q, mode: 'insensitive' } },
        { name: { contains: query.q, mode: 'insensitive' } },
        { description: { contains: query.q, mode: 'insensitive' } },
        { entityType: { contains: query.q, mode: 'insensitive' } },
      ],
    };
    const requestWhere: Prisma.WorkflowRequestWhereInput = {
      ...(companyId ? { workflow: { companyId } } : {}),
      ...(query.status ? { status: query.status as never } : {}),
      OR: [
        { title: { contains: query.q, mode: 'insensitive' } },
        { entityType: { contains: query.q, mode: 'insensitive' } },
        { entityId: { contains: query.q, mode: 'insensitive' } },
        { requester: { fullName: { contains: query.q, mode: 'insensitive' } } },
      ],
    };
    const take = this.pagination.normalize(query).limit;
    const [definitions, requests, definitionTotal, requestTotal] =
      await this.prisma.$transaction([
        this.prisma.workflowDefinition.findMany({
          where: definitionWhere,
          select: {
            id: true,
            companyId: true,
            code: true,
            name: true,
            description: true,
            entityType: true,
            status: true,
          },
          orderBy: { updatedAt: 'desc' },
          take,
        }),
        this.prisma.workflowRequest.findMany({
          where: requestWhere,
          select: {
            id: true,
            title: true,
            entityType: true,
            entityId: true,
            status: true,
            requester: { select: { fullName: true } },
            workflow: { select: { companyId: true, code: true, name: true } },
          },
          orderBy: { updatedAt: 'desc' },
          take,
        }),
        this.prisma.workflowDefinition.count({ where: definitionWhere }),
        this.prisma.workflowRequest.count({ where: requestWhere }),
      ]);
    const results = [
      ...definitions.map(
        (item) =>
          new SearchResultEntity({
            id: `workflow-definition:${item.id}`,
            entityType: 'WORKFLOW_DEFINITION',
            entityId: item.id,
            title: item.name,
            subtitle: item.code,
            snippet: [item.entityType, item.description].filter(Boolean).join(' | '),
            score: this.score(query.q, [item.name, item.code, item.entityType]),
            companyId: item.companyId,
            branchId: null,
            metadata: { status: item.status },
          }),
      ),
      ...requests.map(
        (item) =>
          new SearchResultEntity({
            id: `workflow-request:${item.id}`,
            entityType: 'WORKFLOW_REQUEST',
            entityId: item.id,
            title: item.title,
            subtitle: item.workflow.name,
            snippet: [item.entityType, item.entityId, item.requester?.fullName]
              .filter(Boolean)
              .join(' | '),
            score: this.score(query.q, [
              item.title,
              item.entityType,
              item.entityId,
              item.requester?.fullName,
            ]),
            companyId: item.workflow.companyId,
            branchId: null,
            metadata: { status: item.status, workflowCode: item.workflow.code },
          }),
      ),
    ].sort((a, b) => b.score - a.score);
    const total = definitionTotal + requestTotal;
    await this.logSearch('WORKFLOW', query.q, total, Date.now() - startedAt, {
      companyId,
      status: query.status,
    });
    return this.pagination.buildResponse(results.slice(0, take), total, query);
  }

  async findIndexes(query: SearchIndexQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const where: Prisma.SearchIndexWhereInput = this.softDelete.activeWhere({
      ...(tenantId ? { tenantId } : {}),
      ...(query.companyId ? { companyId: query.companyId } : {}),
      ...(query.entityType ? { entityType: query.entityType } : {}),
      ...(query.status ? { status: query.status } : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.searchIndex.findMany({
        where,
        orderBy: { lastIndexedAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.searchIndex.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new SearchIndexEntity(item)),
      total,
      query,
    );
  }

  async upsertIndex(dto: UpsertSearchIndexDto) {
    const searchableText = this.normalizeSearchText([
      dto.title,
      dto.subtitle,
      dto.content,
      dto.keywords,
    ]);
    const item = await this.prisma.searchIndex.upsert({
      where: {
        entityType_entityId: {
          entityType: dto.entityType,
          entityId: dto.entityId,
        },
      },
      create: {
        tenantId: dto.tenantId ?? this.context.getTenantId(),
        companyId: dto.companyId ?? this.context.getCompanyId(),
        branchId: dto.branchId ?? this.context.getBranchId(),
        entityType: dto.entityType,
        entityId: dto.entityId,
        title: dto.title,
        subtitle: dto.subtitle,
        content: dto.content,
        keywords: dto.keywords,
        searchableText,
        status: dto.status ?? 'ACTIVE',
        sourceUpdatedAt: dto.sourceUpdatedAt ? new Date(dto.sourceUpdatedAt) : undefined,
        metadata: dto.metadata === undefined ? Prisma.JsonNull : this.toJson(dto.metadata),
        createdById: this.context.getUserId(),
      },
      update: {
        tenantId: dto.tenantId ?? this.context.getTenantId(),
        companyId: dto.companyId ?? this.context.getCompanyId(),
        branchId: dto.branchId ?? this.context.getBranchId(),
        title: dto.title,
        subtitle: dto.subtitle,
        content: dto.content,
        keywords: dto.keywords,
        searchableText,
        status: dto.status ?? 'ACTIVE',
        sourceUpdatedAt: dto.sourceUpdatedAt ? new Date(dto.sourceUpdatedAt) : undefined,
        lastIndexedAt: new Date(),
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        updatedById: this.context.getUserId(),
      },
    });
    await this.audit.record({
      action: 'SEARCH_INDEX_UPSERT',
      entity: 'SearchIndex',
      entityId: item.id,
      payload: { entityType: item.entityType, entityId: item.entityId },
    });
    return new SearchIndexEntity(item);
  }

  async rebuildIndex(dto: RebuildSearchIndexDto) {
    const entityTypes = dto.entityTypes?.length
      ? dto.entityTypes
      : ([
          'EMPLOYEE',
          'PAYROLL_RUN',
          'PAYROLL_ITEM',
          'DOCUMENT',
          'WORKFLOW_DEFINITION',
          'WORKFLOW_REQUEST',
        ] as SearchEntityType[]);
    const records = await this.collectIndexRecords(entityTypes, dto);
    const operations = records.map((record) =>
      this.prisma.searchIndex.upsert({
        where: {
          entityType_entityId: {
            entityType: record.entityType,
            entityId: record.entityId,
          },
        },
        create: this.toIndexCreate(record),
        update: {
          ...this.toIndexUpdate(record),
          lastIndexedAt: new Date(),
          updatedById: this.context.getUserId(),
        },
      }),
    );
    if (operations.length) {
      await this.prisma.$transaction(operations);
    }
    await this.audit.record({
      action: 'SEARCH_INDEX_REBUILD',
      entity: 'SearchIndex',
      entityId: 'bulk',
      payload: { entityTypes, indexed: operations.length },
    });
    return new SearchRebuildResultEntity({
      indexed: operations.length,
      skipped: 0,
      entityTypes,
    });
  }

  async findAuditLogs(query: SearchAuditQueryDto) {
    const tenantId = this.context.getTenantId();
    const where: Prisma.SearchQueryLogWhereInput = {
      ...(tenantId ? { tenantId } : {}),
      ...(query.scope ? { scope: query.scope } : {}),
      ...(query.userId ? { userId: query.userId } : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.searchQueryLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.searchQueryLog.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new SearchAuditEntity(item)),
      total,
      query,
    );
  }

  private async collectIndexRecords(
    entityTypes: SearchEntityType[],
    dto: RebuildSearchIndexDto,
  ): Promise<SearchableRecord[]> {
    const limit = dto.limit ?? 100;
    const records: SearchableRecord[] = [];
    if (entityTypes.includes('EMPLOYEE')) {
      const items = await this.prisma.employee.findMany({
        where: dto.companyId ? { companyId: dto.companyId } : undefined,
        include: {
          company: { select: { tenantId: true } },
          department: { select: { name: true } },
        },
        take: limit,
        orderBy: { updatedAt: 'desc' },
      });
      records.push(
        ...items.map((item) => ({
          tenantId: item.company.tenantId,
          companyId: item.companyId,
          branchId: item.branchId,
          entityType: 'EMPLOYEE' as SearchEntityType,
          entityId: item.id,
          title: item.fullName,
          subtitle: item.employeeNumber,
          content: [item.email, item.phone, item.department?.name]
            .filter(Boolean)
            .join(' '),
          keywords: [item.nationality, item.status].filter(Boolean).join(' '),
          sourceUpdatedAt: item.updatedAt,
          metadata: { status: item.status },
        })),
      );
    }
    if (entityTypes.includes('PAYROLL_RUN')) {
      const items = await this.prisma.payrollRun.findMany({
        where: dto.companyId ? { companyId: dto.companyId } : undefined,
        include: { company: { select: { tenantId: true } } },
        take: limit,
        orderBy: { updatedAt: 'desc' },
      });
      records.push(
        ...items.map((item) => ({
          tenantId: item.company.tenantId,
          companyId: item.companyId,
          entityType: 'PAYROLL_RUN' as SearchEntityType,
          entityId: item.id,
          title: `Payroll ${item.year}-${String(item.month).padStart(2, '0')}`,
          subtitle: item.status,
          content: item.notes,
          keywords: [String(item.year), String(item.month), item.status].join(' '),
          sourceUpdatedAt: item.updatedAt,
          metadata: { year: item.year, month: item.month },
        })),
      );
    }
    if (entityTypes.includes('PAYROLL_ITEM')) {
      const items = await this.prisma.payrollItem.findMany({
        where: dto.companyId ? { payrollRun: { companyId: dto.companyId } } : undefined,
        include: {
          employee: { select: { fullName: true, employeeNumber: true } },
          payrollRun: { include: { company: { select: { tenantId: true } } } },
        },
        take: limit,
        orderBy: { updatedAt: 'desc' },
      });
      records.push(
        ...items.map((item) => ({
          tenantId: item.payrollRun.company.tenantId,
          companyId: item.payrollRun.companyId,
          entityType: 'PAYROLL_ITEM' as SearchEntityType,
          entityId: item.id,
          title: item.name,
          subtitle: item.employee.fullName,
          content: [item.source, item.sourceRef, item.notes].filter(Boolean).join(' '),
          keywords: [
            item.type,
            item.category,
            item.employee.employeeNumber,
            String(item.payrollRun.year),
            String(item.payrollRun.month),
          ].join(' '),
          sourceUpdatedAt: item.updatedAt,
          metadata: { employeeId: item.employeeId, payrollRunId: item.payrollRunId },
        })),
      );
    }
    if (entityTypes.includes('DOCUMENT')) {
      const items = await this.prisma.document.findMany({
        where: dto.companyId ? { companyId: dto.companyId } : undefined,
        include: {
          company: { select: { tenantId: true } },
          category: { select: { name: true } },
          employee: { select: { fullName: true } },
        },
        take: limit,
        orderBy: { updatedAt: 'desc' },
      });
      records.push(
        ...items.map((item) => ({
          tenantId: item.company.tenantId,
          companyId: item.companyId,
          entityType: 'DOCUMENT' as SearchEntityType,
          entityId: item.id,
          title: item.title,
          subtitle: item.code,
          content: [item.description, item.fileName, item.category?.name, item.employee?.fullName]
            .filter(Boolean)
            .join(' '),
          keywords: [item.tags, item.status, item.visibility, item.ownerType]
            .filter(Boolean)
            .join(' '),
          sourceUpdatedAt: item.updatedAt,
          metadata: { visibility: item.visibility, status: item.status },
        })),
      );
    }
    if (entityTypes.includes('WORKFLOW_DEFINITION')) {
      const items = await this.prisma.workflowDefinition.findMany({
        where: dto.companyId ? { companyId: dto.companyId } : undefined,
        include: { company: { select: { tenantId: true } } },
        take: limit,
        orderBy: { updatedAt: 'desc' },
      });
      records.push(
        ...items.map((item) => ({
          tenantId: item.company.tenantId,
          companyId: item.companyId,
          entityType: 'WORKFLOW_DEFINITION' as SearchEntityType,
          entityId: item.id,
          title: item.name,
          subtitle: item.code,
          content: item.description,
          keywords: [item.entityType, item.status].join(' '),
          sourceUpdatedAt: item.updatedAt,
          metadata: { status: item.status },
        })),
      );
    }
    if (entityTypes.includes('WORKFLOW_REQUEST')) {
      const items = await this.prisma.workflowRequest.findMany({
        where: dto.companyId ? { workflow: { companyId: dto.companyId } } : undefined,
        include: {
          requester: { select: { fullName: true } },
          workflow: { include: { company: { select: { tenantId: true } } } },
        },
        take: limit,
        orderBy: { updatedAt: 'desc' },
      });
      records.push(
        ...items.map((item) => ({
          tenantId: item.workflow.company.tenantId,
          companyId: item.workflow.companyId,
          entityType: 'WORKFLOW_REQUEST' as SearchEntityType,
          entityId: item.id,
          title: item.title,
          subtitle: item.workflow.name,
          content: [item.entityType, item.entityId, item.requester?.fullName]
            .filter(Boolean)
            .join(' '),
          keywords: item.status,
          sourceUpdatedAt: item.updatedAt,
          metadata: { status: item.status, workflowId: item.workflowId },
        })),
      );
    }
    return records;
  }

  private toIndexCreate(record: SearchableRecord): Prisma.SearchIndexCreateInput {
    return {
      tenant: record.tenantId ? { connect: { id: record.tenantId } } : undefined,
      company: record.companyId ? { connect: { id: record.companyId } } : undefined,
      branch: record.branchId ? { connect: { id: record.branchId } } : undefined,
      entityType: record.entityType,
      entityId: record.entityId,
      title: record.title,
      subtitle: record.subtitle,
      content: record.content,
      keywords: record.keywords,
      searchableText: this.normalizeSearchText([
        record.title,
        record.subtitle,
        record.content,
        record.keywords,
      ]),
      sourceUpdatedAt: record.sourceUpdatedAt,
      metadata: record.metadata ? this.toJson(record.metadata) : Prisma.JsonNull,
      createdById: this.context.getUserId(),
    };
  }

  private toIndexUpdate(record: SearchableRecord): Prisma.SearchIndexUpdateInput {
    return {
      tenant: record.tenantId ? { connect: { id: record.tenantId } } : { disconnect: true },
      company: record.companyId ? { connect: { id: record.companyId } } : { disconnect: true },
      branch: record.branchId ? { connect: { id: record.branchId } } : { disconnect: true },
      title: record.title,
      subtitle: record.subtitle,
      content: record.content,
      keywords: record.keywords,
      searchableText: this.normalizeSearchText([
        record.title,
        record.subtitle,
        record.content,
        record.keywords,
      ]),
      status: 'ACTIVE',
      sourceUpdatedAt: record.sourceUpdatedAt,
      metadata: record.metadata ? this.toJson(record.metadata) : Prisma.JsonNull,
    };
  }

  private fromIndex(
    item: {
      id: string;
      entityType: SearchEntityType;
      entityId: string;
      title: string;
      subtitle: string | null;
      content: string | null;
      keywords: string | null;
      companyId: string | null;
      branchId: string | null;
      metadata: Prisma.JsonValue | null;
    },
    query: string,
  ) {
    return new SearchResultEntity({
      id: item.id,
      entityType: item.entityType,
      entityId: item.entityId,
      title: item.title,
      subtitle: item.subtitle,
      snippet: this.snippet(item.content ?? item.keywords, query),
      score: this.score(query, [item.title, item.subtitle, item.content, item.keywords]),
      companyId: item.companyId,
      branchId: item.branchId,
      metadata: item.metadata as Record<string, unknown> | null,
    });
  }

  private async logSearch(
    scope: SearchScope,
    query: string,
    resultCount: number,
    durationMs: number,
    filters?: Record<string, unknown>,
  ) {
    const tenantId = this.context.getTenantId();
    const companyId = this.context.getCompanyId();
    const branchId = this.context.getBranchId();
    await this.prisma.searchQueryLog.create({
      data: {
        tenantId,
        companyId,
        branchId,
        userId: this.context.getUserId(),
        scope,
        query,
        filters: filters ? this.toJson(filters) : Prisma.JsonNull,
        resultCount,
        durationMs,
        ipAddress: this.context.getMetadata()?.ipAddress,
        userAgent: this.context.getMetadata()?.userAgent,
      },
    });
    await this.audit.record({
      action: 'SEARCH_QUERY',
      entity: 'SearchQueryLog',
      entityId: scope,
      payload: { scope, query, resultCount, durationMs },
    });
  }

  private searchTextWhere(query: string): Prisma.SearchIndexWhereInput[] {
    return [
      { title: { contains: query, mode: 'insensitive' } },
      { subtitle: { contains: query, mode: 'insensitive' } },
      { content: { contains: query, mode: 'insensitive' } },
      { keywords: { contains: query, mode: 'insensitive' } },
      { searchableText: { contains: query, mode: 'insensitive' } },
    ];
  }

  private normalizeSearchText(values: Array<string | null | undefined>) {
    return values
      .filter((value): value is string => Boolean(value?.trim()))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  private score(query: string, values: Array<string | null | undefined>) {
    const normalizedQuery = query.trim().toLowerCase();
    let score = 0;
    for (const value of values) {
      const normalizedValue = value?.toLowerCase() ?? '';
      if (!normalizedValue) continue;
      if (normalizedValue === normalizedQuery) score += 100;
      if (normalizedValue.startsWith(normalizedQuery)) score += 50;
      if (normalizedValue.includes(normalizedQuery)) score += 20;
    }
    return score || 1;
  }

  private snippet(value: string | null | undefined, query: string) {
    if (!value) return null;
    const index = value.toLowerCase().indexOf(query.toLowerCase());
    if (index < 0) return value.slice(0, 180);
    return value.slice(Math.max(0, index - 60), index + query.length + 120);
  }

  private assertQuery(query: string) {
    if (!query?.trim() || query.trim().length < 2) {
      throw new BadRequestException('Search query must contain at least 2 characters');
    }
  }

  private toJson(
    value: unknown,
  ): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput {
    if (value === null) return Prisma.JsonNull;
    return value as Prisma.InputJsonValue;
  }
}
