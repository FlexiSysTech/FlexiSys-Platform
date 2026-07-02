import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AiFeatureArea, Prisma } from '@prisma/client';

import { AuditService } from '../platform/audit';
import { PaginationService } from '../platform/pagination';
import { RequestContextService } from '../platform/request-context';
import { SoftDeleteService } from '../platform/soft-delete';
import { PrismaService } from '../prisma/prisma.service';
import { AiCompletionDto } from './dto/ai-completion.dto';
import { AiProviderQueryDto, AiRequestLogQueryDto } from './dto/ai-query.dto';
import { CreateAiProviderConfigDto } from './dto/create-ai-provider-config.dto';
import { UpdateAiProviderConfigDto } from './dto/update-ai-provider-config.dto';
import {
  AiProviderConfigEntity,
  AiRequestLogEntity,
  AiUsageRecordEntity,
} from './entities/ai-core.entity';
import { AiProvider } from './providers/ai-provider.interface';
import { InternalAiProvider } from './providers/internal-ai.provider';

@Injectable()
export class AiCoreService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
    private readonly pagination: PaginationService,
    private readonly audit: AuditService,
    private readonly softDelete: SoftDeleteService,
    private readonly internalProvider: InternalAiProvider,
  ) {}

  async findProviders(query: AiProviderQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const normalized = this.pagination.normalize(query);
    const where: Prisma.AiProviderConfigWhereInput =
      this.softDelete.activeWhere({
        ...(companyId ? { companyId } : {}),
        ...(query.status ? { status: query.status } : {}),
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
      this.prisma.aiProviderConfig.findMany({
        where,
        orderBy: [{ isDefault: 'desc' }, { code: 'asc' }],
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.aiProviderConfig.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new AiProviderConfigEntity(item)),
      total,
      query,
    );
  }

  async createProvider(dto: CreateAiProviderConfigDto) {
    const companyId = await this.resolveCompanyId(dto.companyId);
    await this.ensureProviderCodeUnique(companyId, dto.code);

    const item = await this.prisma.aiProviderConfig.create({
      data: {
        companyId,
        code: dto.code,
        name: dto.name,
        type: dto.type ?? 'INTERNAL',
        status: dto.status ?? 'ACTIVE',
        model: dto.model,
        endpoint: dto.endpoint,
        settings: this.toJson(dto.settings),
        isDefault: dto.isDefault ?? false,
        createdById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'AI_PROVIDER_CREATE',
      entity: 'AiProviderConfig',
      entityId: item.id,
      payload: { code: item.code, companyId: item.companyId },
    });

    return new AiProviderConfigEntity(item);
  }

  async updateProvider(id: string, dto: UpdateAiProviderConfigDto) {
    const current = await this.ensureProviderExists(id);
    const companyId = dto.companyId
      ? await this.resolveCompanyId(dto.companyId)
      : current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId || dto.code) {
      await this.ensureProviderCodeUnique(companyId, code, id);
    }

    const item = await this.prisma.aiProviderConfig.update({
      where: { id },
      data: {
        companyId,
        code: dto.code,
        name: dto.name,
        type: dto.type,
        status: dto.status,
        model: dto.model,
        endpoint: dto.endpoint,
        settings: dto.settings === undefined ? undefined : this.toJson(dto.settings),
        isDefault: dto.isDefault,
        updatedById: this.context.getUserId(),
      },
    });

    await this.audit.record({
      action: 'AI_PROVIDER_UPDATE',
      entity: 'AiProviderConfig',
      entityId: item.id,
      payload: { before: current, after: item } as Prisma.InputJsonObject,
    });

    return new AiProviderConfigEntity(item);
  }

  async removeProvider(id: string) {
    const result = await this.softDelete.softDelete(
      this.prisma.aiProviderConfig as never,
      id,
    );

    await this.audit.record({
      action: 'AI_PROVIDER_DELETE',
      entity: 'AiProviderConfig',
      entityId: id,
      payload: { deleted: true },
    });

    return {
      success: true,
      deletedProvider: new AiProviderConfigEntity(result.record),
    };
  }

  async complete(dto: AiCompletionDto) {
    const companyId = await this.resolveCompanyId(dto.companyId);
    const providerConfig = await this.resolveProvider(companyId, dto.providerCode);
    const provider = this.getProvider(providerConfig.code);
    const feature = dto.feature ?? AiFeatureArea.CORE;

    const log = await this.prisma.aiRequestLog.create({
      data: {
        companyId,
        providerId: providerConfig.id,
        feature,
        operation: dto.operation,
        status: 'PENDING',
        prompt: dto.prompt,
        requestPayload: this.toJson({
          systemPrompt: dto.systemPrompt,
          context: dto.context,
        }),
        requestedById: this.context.getUserId(),
        metadata: this.toJson(dto.metadata),
      },
    });

    try {
      const response = await provider.complete({
        prompt: dto.prompt,
        systemPrompt: dto.systemPrompt,
        context: dto.context,
        metadata: dto.metadata,
      });

      const updated = await this.prisma.$transaction(async (tx) => {
        const completed = await tx.aiRequestLog.update({
          where: { id: log.id },
          data: {
            status: 'COMPLETED',
            responseText: response.text,
            responsePayload: this.toJson(response.payload),
            promptTokens: response.promptTokens,
            completionTokens: response.completionTokens,
            totalTokens: response.totalTokens,
            costAmount: response.costAmount,
            currency: response.currency,
            completedAt: new Date(),
          },
        });

        await tx.aiUsageRecord.create({
          data: {
            companyId,
            requestLogId: log.id,
            feature,
            operation: dto.operation,
            promptTokens: response.promptTokens,
            completionTokens: response.completionTokens,
            totalTokens: response.totalTokens,
            costAmount: response.costAmount,
            currency: response.currency,
            usedById: this.context.getUserId(),
          },
        });

        return completed;
      });

      await this.audit.record({
        action: 'AI_REQUEST_COMPLETE',
        entity: 'AiRequestLog',
        entityId: updated.id,
        payload: {
          feature,
          operation: dto.operation,
          totalTokens: updated.totalTokens,
        },
      });

      return new AiRequestLogEntity(updated);
    } catch (error) {
      const failed = await this.prisma.aiRequestLog.update({
        where: { id: log.id },
        data: {
          status: 'FAILED',
          error: error instanceof Error ? error.message : 'AI request failed',
          completedAt: new Date(),
        },
      });

      await this.audit.record({
        action: 'AI_REQUEST_FAILED',
        entity: 'AiRequestLog',
        entityId: failed.id,
        payload: { feature, operation: dto.operation },
      });

      return new AiRequestLogEntity(failed);
    }
  }

  async findRequestLogs(query: AiRequestLogQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const where: Prisma.AiRequestLogWhereInput = this.softDelete.activeWhere({
      ...(companyId ? { companyId } : {}),
      ...(query.feature ? { feature: query.feature } : {}),
      ...(query.status ? { status: query.status } : {}),
    });

    const [items, total] = await this.prisma.$transaction([
      this.prisma.aiRequestLog.findMany({
        where,
        orderBy: { startedAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.aiRequestLog.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new AiRequestLogEntity(item)),
      total,
      query,
    );
  }

  async findUsage(query: AiRequestLogQueryDto) {
    const companyId = query.companyId ?? this.context.getCompanyId();
    const where: Prisma.AiUsageRecordWhereInput = {
      ...(companyId ? { companyId } : {}),
      ...(query.feature ? { feature: query.feature } : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.aiUsageRecord.findMany({
        where,
        orderBy: { usedAt: 'desc' },
        ...this.pagination.getSkipTake(query),
      }),
      this.prisma.aiUsageRecord.count({ where }),
    ]);

    return this.pagination.buildResponse(
      items.map((item) => new AiUsageRecordEntity(item)),
      total,
      query,
    );
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

  private async resolveProvider(companyId: string | null, code?: string) {
    const provider = await this.prisma.aiProviderConfig.findFirst({
      where: this.softDelete.activeWhere({
        status: 'ACTIVE',
        ...(code ? { code } : { isDefault: true }),
        OR: [{ companyId: null }, ...(companyId ? [{ companyId }] : [])],
      }),
      orderBy: [{ companyId: 'desc' }, { createdAt: 'asc' }],
    });

    if (!provider) {
      if (code) throw new NotFoundException('AI provider not found');
      return this.createInternalProvider(companyId);
    }

    return provider;
  }

  private async createInternalProvider(companyId: string | null) {
    const code = 'internal';
    const existing = await this.prisma.aiProviderConfig.findFirst({
      where: { companyId, code },
    });
    if (existing) return existing;

    return this.prisma.aiProviderConfig.create({
      data: {
        companyId,
        code,
        name: 'Internal AI Provider',
        type: 'INTERNAL',
        status: 'ACTIVE',
        model: 'internal-deterministic',
        isDefault: true,
        createdById: this.context.getUserId(),
      },
    });
  }

  private getProvider(code: string): AiProvider {
    if (code === this.internalProvider.code || code === 'internal') {
      return this.internalProvider;
    }
    throw new BadRequestException('AI provider adapter is not configured');
  }

  private async ensureProviderExists(id: string) {
    const item = await this.prisma.aiProviderConfig.findFirst({
      where: this.softDelete.activeWhere({ id }),
    });
    if (!item) throw new NotFoundException('AI provider not found');
    return item;
  }

  private async ensureProviderCodeUnique(
    companyId: string | null,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.aiProviderConfig.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
    if (item) throw new ConflictException('AI provider code already exists');
  }

  private toJson(value: unknown): Prisma.InputJsonValue | undefined {
    return value === undefined ? undefined : (value as Prisma.InputJsonValue);
  }
}
