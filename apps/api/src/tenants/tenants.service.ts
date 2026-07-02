import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Tenant, TenantStatus } from '@prisma/client';

import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { StatusTransitionService } from '../platform/status-transitions';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTenantDomainDto,
  CreateTenantDto,
  ResolveTenantDto,
  TenantQueryDto,
  UpdateTenantDto,
} from './dto/tenant-core.dto';
import {
  TenantDomainEntity,
  TenantEntity,
  TenantResolutionEntity,
} from './entities/tenant-core.entity';

@Injectable()
export class TenantsService {
  private readonly tenantStatusRules = [
    {
      from: 'PROVISIONING' as TenantStatus,
      to: ['ACTIVE', 'SUSPENDED', 'ARCHIVED'] as TenantStatus[],
    },
    {
      from: 'ACTIVE' as TenantStatus,
      to: ['SUSPENDED', 'INACTIVE', 'ARCHIVED'] as TenantStatus[],
    },
    {
      from: 'SUSPENDED' as TenantStatus,
      to: ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as TenantStatus[],
    },
    {
      from: 'INACTIVE' as TenantStatus,
      to: ['ACTIVE', 'ARCHIVED'] as TenantStatus[],
    },
  ];

  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
    private readonly pagination: PaginationService,
    private readonly audit: AuditService,
    private readonly softDelete: SoftDeleteService,
    private readonly transitions: StatusTransitionService,
  ) {}

  async findTenants(query: TenantQueryDto) {
    this.pagination.assertAllowedSort(query, [
      'code',
      'name',
      'status',
      'plan',
      'createdAt',
    ]);
    const normalized = this.pagination.normalize(query);
    const where: Prisma.TenantWhereInput = this.softDelete.activeWhere({
      ...(query.status ? { status: query.status } : {}),
      ...(query.plan ? { plan: query.plan } : {}),
      ...(normalized.search
        ? {
            OR: [
              { code: { contains: normalized.search, mode: 'insensitive' } },
              { name: { contains: normalized.search, mode: 'insensitive' } },
              {
                primaryDomain: {
                  contains: normalized.search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {}),
    });

    const [items, total] = await this.prisma.$transaction([
      this.prisma.tenant.findMany({
        where,
        orderBy: query.sortBy
          ? { [query.sortBy]: normalized.sortOrder }
          : [{ code: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.tenant.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new TenantEntity(item)),
      total,
      query,
    );
  }

  async createTenant(dto: CreateTenantDto) {
    await this.ensureTenantCodeUnique(dto.code);
    if (dto.primaryDomain) await this.ensureDomainUnique(dto.primaryDomain);
    const status = dto.status ?? 'PROVISIONING';
    this.assertTenantTransition('PROVISIONING', status);

    const tenant = await this.prisma.$transaction(async (tx) => {
      const created = await tx.tenant.create({
        data: {
          code: dto.code,
          name: dto.name,
          legalName: dto.legalName,
          plan: dto.plan ?? 'STARTER',
          status,
          primaryDomain: dto.primaryDomain,
          metadata: this.toJson(dto.metadata),
          createdById: this.context.getUserId(),
        },
      });

      if (dto.primaryDomain) {
        await tx.tenantDomain.create({
          data: {
            tenantId: created.id,
            domain: dto.primaryDomain,
            isPrimary: true,
            createdById: this.context.getUserId(),
          },
        });
      }

      return created;
    });

    await this.audit.record({
      action: 'TENANT_CREATE',
      entity: 'Tenant',
      entityId: tenant.id,
      payload: { code: tenant.code, status: tenant.status, plan: tenant.plan },
    });

    return new TenantEntity(tenant);
  }

  async updateTenant(id: string, dto: UpdateTenantDto) {
    const current = await this.ensureTenantExists(id);
    if (dto.code && dto.code !== current.code) {
      await this.ensureTenantCodeUnique(dto.code, id);
    }
    if (dto.primaryDomain && dto.primaryDomain !== current.primaryDomain) {
      await this.ensureDomainUnique(dto.primaryDomain);
    }
    if (dto.status && dto.status !== current.status) {
      this.assertTenantTransition(current.status, dto.status);
    }

    const tenant = await this.prisma.tenant.update({
      where: { id },
      data: {
        code: dto.code,
        name: dto.name,
        legalName: dto.legalName,
        plan: dto.plan,
        status: dto.status,
        primaryDomain: dto.primaryDomain,
        metadata: dto.metadata === undefined ? undefined : this.toJson(dto.metadata),
        updatedById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'TENANT_UPDATE',
      entity: 'Tenant',
      entityId: tenant.id,
      payload: { before: current, after: tenant } as Prisma.InputJsonObject,
    });

    return new TenantEntity(tenant);
  }

  async removeTenant(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.tenant as never,
      id,
    );
    await this.audit.record({
      action: 'TENANT_DELETE',
      entity: 'Tenant',
      entityId: id,
      payload: { deleted: true },
    });

    return { success: true, deletedTenant: new TenantEntity(result.record) };
  }

  async restoreTenant(id: string) {
    const result = await this.softDelete.restore(this.prisma.tenant as never, id);
    await this.audit.record({
      action: 'TENANT_RESTORE',
      entity: 'Tenant',
      entityId: id,
      payload: { restored: true },
    });

    return { success: true, restoredTenant: new TenantEntity(result.record) };
  }

  async findDomains(query: TenantQueryDto) {
    const normalized = this.pagination.normalize(query);
    const where: Prisma.TenantDomainWhereInput = this.softDelete.activeWhere({
      ...(normalized.search
        ? { domain: { contains: normalized.search, mode: 'insensitive' } }
        : {}),
    });
    const [items, total] = await this.prisma.$transaction([
      this.prisma.tenantDomain.findMany({
        where,
        orderBy: [{ domain: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.tenantDomain.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new TenantDomainEntity(item)),
      total,
      query,
    );
  }

  async createDomain(dto: CreateTenantDomainDto) {
    const tenant = await this.ensureTenantExists(dto.tenantId);
    await this.ensureDomainUnique(dto.domain);
    const makePrimary = !tenant.primaryDomain;
    const domain = await this.prisma.$transaction(async (tx) => {
      const created = await tx.tenantDomain.create({
        data: {
          tenantId: dto.tenantId,
          domain: dto.domain,
          isPrimary: makePrimary,
          createdById: this.context.getUserId(),
        },
      });

      if (makePrimary) {
        await tx.tenant.update({
          where: { id: tenant.id },
          data: { primaryDomain: dto.domain, updatedById: this.context.getUserId() },
        });
      }

      return created;
    });

    await this.audit.record({
      action: 'TENANT_DOMAIN_CREATE',
      entity: 'TenantDomain',
      entityId: domain.id,
      payload: { tenantId: domain.tenantId, domain: domain.domain },
    });

    return new TenantDomainEntity(domain);
  }

  async resolveTenant(dto: ResolveTenantDto) {
    const tenantId = dto.tenantId ?? this.context.getTenantId();
    const tenantCode = dto.tenantCode ?? this.context.getTenantCode();
    let resolvedBy = '';
    let tenant: Tenant | null = null;

    if (tenantId) {
      tenant = await this.prisma.tenant.findFirst({
        where: this.softDelete.activeWhere({ id: tenantId }),
      });
      resolvedBy = 'tenantId';
    } else if (tenantCode) {
      tenant = await this.prisma.tenant.findFirst({
        where: this.softDelete.activeWhere({ code: tenantCode }),
      });
      resolvedBy = 'tenantCode';
    } else if (dto.domain) {
      const domain = await this.prisma.tenantDomain.findFirst({
        where: this.softDelete.activeWhere({ domain: dto.domain }),
        include: { tenant: true },
      });
      tenant = domain?.tenant ?? null;
      resolvedBy = 'domain';
    }

    if (!tenantId && !tenantCode && !dto.domain) {
      throw new BadRequestException('Tenant resolver input is required');
    }
    if (!tenant || tenant.deletedAt) throw new NotFoundException('Tenant not found');

    return new TenantResolutionEntity({
      tenant: new TenantEntity(tenant),
      resolvedBy,
    });
  }

  private assertTenantTransition(currentStatus: TenantStatus, nextStatus: TenantStatus) {
    if (currentStatus === nextStatus) return;
    this.transitions.assertTransition({
      entity: 'Tenant',
      currentStatus,
      nextStatus,
      rules: this.tenantStatusRules,
    });
  }

  private async ensureTenantExists(id: string) {
    const tenant = await this.prisma.tenant.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }

  private async ensureTenantCodeUnique(code: string, excludeId?: string) {
    const tenant = await this.prisma.tenant.findFirst({
      where: { code, ...(excludeId ? { id: { not: excludeId } } : {}) },
    });
    if (tenant) throw new ConflictException('Tenant code already exists');
  }

  private async ensureDomainUnique(domain: string) {
    const existing = await this.prisma.tenantDomain.findFirst({
      where: { domain },
    });
    if (existing) throw new ConflictException('Tenant domain already exists');
  }

  private toJson(value: unknown): Prisma.InputJsonValue | undefined {
    return value === undefined ? undefined : (value as Prisma.InputJsonValue);
  }
}
