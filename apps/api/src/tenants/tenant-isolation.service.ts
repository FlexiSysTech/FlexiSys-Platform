import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { PrismaService } from '../prisma/prisma.service';
import {
  AssignTenantScopeDto,
  TenantIsolationQueryDto,
  ValidateTenantScopeDto,
} from './dto/tenant-isolation.dto';
import {
  TenantBranchScopeEntity,
  TenantCompanyScopeEntity,
  TenantIsolationValidationEntity,
} from './entities/tenant-isolation.entity';

@Injectable()
export class TenantIsolationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
    private readonly pagination: PaginationService,
    private readonly audit: AuditService,
    private readonly softDelete: SoftDeleteService,
  ) {}

  tenantWhere<TWhere extends Record<string, unknown>>(where?: TWhere) {
    const tenantId = this.context.getTenantId();
    return {
      ...(where ?? {}),
      ...(tenantId ? { tenantId } : {}),
    };
  }

  async findCompanyScopes(query: TenantIsolationQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.CompanyWhereInput = {
      ...(tenantId ? { tenantId } : {}),
      ...(query.companyId ? { id: query.companyId } : {}),
      ...(normalized.search
        ? {
            OR: [
              { code: { contains: normalized.search, mode: 'insensitive' } },
              { name: { contains: normalized.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.company.findMany({
        where,
        orderBy: { code: 'asc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.company.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new TenantCompanyScopeEntity(item)),
      total,
      query,
    );
  }

  async findBranchScopes(query: TenantIsolationQueryDto) {
    const tenantId = query.tenantId ?? this.context.getTenantId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.BranchWhereInput = {
      ...(tenantId ? { tenantId } : {}),
      ...(query.companyId ? { companyId: query.companyId } : {}),
      ...(query.branchId ? { id: query.branchId } : {}),
      ...(normalized.search
        ? {
            OR: [
              { code: { contains: normalized.search, mode: 'insensitive' } },
              { name: { contains: normalized.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.branch.findMany({
        where,
        orderBy: [{ companyId: 'asc' }, { code: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.branch.count({ where }),
    ]);
    return this.pagination.buildResponse(
      items.map((item) => new TenantBranchScopeEntity(item)),
      total,
      query,
    );
  }

  async assignCompanyTenant(companyId: string, dto: AssignTenantScopeDto) {
    await this.ensureTenantExists(dto.tenantId);
    const company = await this.prisma.company.findUnique({ where: { id: companyId } });
    if (!company) throw new NotFoundException('Company not found');

    const updated = await this.prisma.company.update({
      where: { id: companyId },
      data: { tenantId: dto.tenantId },
    });

    await this.audit.record({
      action: 'TENANT_COMPANY_ASSIGN',
      entity: 'Company',
      entityId: companyId,
      payload: { beforeTenantId: company.tenantId, tenantId: dto.tenantId },
    });

    return new TenantCompanyScopeEntity(updated);
  }

  async assignBranchTenant(branchId: string, dto: AssignTenantScopeDto) {
    await this.ensureTenantExists(dto.tenantId);
    const branch = await this.prisma.branch.findUnique({
      where: { id: branchId },
      include: { company: true },
    });
    if (!branch) throw new NotFoundException('Branch not found');
    if (branch.company.tenantId && branch.company.tenantId !== dto.tenantId) {
      throw new BadRequestException('Branch tenant must match company tenant');
    }

    const updated = await this.prisma.branch.update({
      where: { id: branchId },
      data: { tenantId: dto.tenantId },
    });

    await this.audit.record({
      action: 'TENANT_BRANCH_ASSIGN',
      entity: 'Branch',
      entityId: branchId,
      payload: { beforeTenantId: branch.tenantId, tenantId: dto.tenantId },
    });

    return new TenantBranchScopeEntity(updated);
  }

  async validateScope(dto: ValidateTenantScopeDto) {
    const tenantId = dto.tenantId ?? this.context.getTenantId();
    if (!tenantId) {
      throw new BadRequestException('Tenant context is required for validation');
    }
    await this.ensureTenantExists(tenantId);

    if (dto.companyId) {
      await this.assertCompanyAccess(dto.companyId, tenantId);
    }
    if (dto.branchId) {
      await this.assertBranchAccess(dto.branchId, tenantId);
    }

    return new TenantIsolationValidationEntity({
      allowed: true,
      tenantId,
      companyId: dto.companyId ?? null,
      branchId: dto.branchId ?? null,
      reason: null,
    });
  }

  async assertCompanyAccess(companyId: string, tenantId = this.context.getTenantId()) {
    if (!tenantId) return;
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      select: { id: true, tenantId: true },
    });
    if (!company) throw new NotFoundException('Company not found');
    if (company.tenantId !== tenantId) {
      throw new BadRequestException('Company is outside the current tenant');
    }
  }

  async assertBranchAccess(branchId: string, tenantId = this.context.getTenantId()) {
    if (!tenantId) return;
    const branch = await this.prisma.branch.findUnique({
      where: { id: branchId },
      select: {
        id: true,
        tenantId: true,
        company: { select: { tenantId: true } },
      },
    });
    if (!branch) throw new NotFoundException('Branch not found');
    const resolvedTenantId = branch.tenantId ?? branch.company.tenantId;
    if (resolvedTenantId !== tenantId) {
      throw new BadRequestException('Branch is outside the current tenant');
    }
  }

  private async ensureTenantExists(id: string) {
    const tenant = await this.prisma.tenant.findFirst({
      where: this.softDelete.activeWhere({ id }),
      select: { id: true },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');
  }
}
