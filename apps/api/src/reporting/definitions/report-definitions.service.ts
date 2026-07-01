import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateReportCategoryDto } from './dto/create-report-category.dto';
import { CreateReportDefinitionDto } from './dto/create-report-definition.dto';
import { UpdateReportCategoryDto } from './dto/update-report-category.dto';
import { UpdateReportDefinitionDto } from './dto/update-report-definition.dto';
import {
  ReportCategoryEntity,
  ReportDefinitionEntity,
} from './entities/report-definition.entity';

@Injectable()
export class ReportDefinitionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findCategories(): Promise<ReportCategoryEntity[]> {
    const items = await this.prisma.reportCategory.findMany({
      orderBy: { code: 'asc' },
    });
    return items.map((item) => new ReportCategoryEntity(item));
  }

  async createCategory(
    dto: CreateReportCategoryDto,
  ): Promise<ReportCategoryEntity> {
    if (dto.companyId) await this.ensureCompanyExists(dto.companyId);
    await this.ensureCategoryCodeUnique(dto.companyId ?? null, dto.code);

    const item = await this.prisma.reportCategory.create({
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        isSystem: dto.isSystem ?? false,
      },
    });
    return new ReportCategoryEntity(item);
  }

  async updateCategory(
    id: string,
    dto: UpdateReportCategoryDto,
  ): Promise<ReportCategoryEntity> {
    const current = await this.ensureCategoryExists(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;
    if (dto.companyId) await this.ensureCompanyExists(dto.companyId);
    if (dto.companyId || dto.code) {
      await this.ensureCategoryCodeUnique(companyId, code, id);
    }

    const item = await this.prisma.reportCategory.update({
      where: { id },
      data: dto,
    });
    return new ReportCategoryEntity(item);
  }

  async findDefinitions(): Promise<ReportDefinitionEntity[]> {
    const items = await this.prisma.reportDefinition.findMany({
      include: { parameters: { orderBy: { displayOrder: 'asc' } } },
      orderBy: { code: 'asc' },
    });
    return items.map((item) => new ReportDefinitionEntity(item));
  }

  async findDefinition(id: string): Promise<ReportDefinitionEntity> {
    const item = await this.prisma.reportDefinition.findUnique({
      where: { id },
      include: { parameters: { orderBy: { displayOrder: 'asc' } } },
    });
    if (!item) throw new NotFoundException('Report definition not found');
    return new ReportDefinitionEntity(item);
  }

  async createDefinition(
    dto: CreateReportDefinitionDto,
  ): Promise<ReportDefinitionEntity> {
    if (dto.companyId) await this.ensureCompanyExists(dto.companyId);
    if (dto.categoryId) await this.ensureCategoryExists(dto.categoryId);
    await this.ensureDefinitionCodeUnique(dto.companyId ?? null, dto.code);

    const item = await this.prisma.$transaction(async (tx) =>
      tx.reportDefinition.create({
        data: {
          companyId: dto.companyId,
          categoryId: dto.categoryId,
          code: dto.code,
          name: dto.name,
          description: dto.description,
          module: dto.module,
          handler: dto.handler,
          status: dto.status ?? 'ACTIVE',
          isSystem: dto.isSystem ?? false,
          parameters: {
            create: (dto.parameters ?? []).map((parameter) => ({
              code: parameter.code,
              label: parameter.label,
              type: parameter.type,
              isRequired: parameter.isRequired ?? false,
              defaultValue: parameter.defaultValue,
              options:
                parameter.options === undefined
                  ? Prisma.JsonNull
                  : (parameter.options as Prisma.InputJsonValue),
              displayOrder: parameter.displayOrder ?? 0,
            })),
          },
        },
        include: { parameters: { orderBy: { displayOrder: 'asc' } } },
      }),
    );

    return new ReportDefinitionEntity(item);
  }

  async updateDefinition(
    id: string,
    dto: UpdateReportDefinitionDto,
  ): Promise<ReportDefinitionEntity> {
    const current = await this.findDefinition(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;
    if (dto.companyId) await this.ensureCompanyExists(dto.companyId);
    if (dto.categoryId) await this.ensureCategoryExists(dto.categoryId);
    if (dto.companyId || dto.code) {
      await this.ensureDefinitionCodeUnique(companyId, code, id);
    }

    const item = await this.prisma.$transaction(async (tx) => {
      if (dto.parameters) {
        await tx.reportParameter.deleteMany({ where: { reportId: id } });
      }
      return tx.reportDefinition.update({
        where: { id },
        data: {
          companyId: dto.companyId,
          categoryId: dto.categoryId,
          code: dto.code,
          name: dto.name,
          description: dto.description,
          module: dto.module,
          handler: dto.handler,
          status: dto.status,
          isSystem: dto.isSystem,
          parameters: dto.parameters
            ? {
                create: dto.parameters.map((parameter) => ({
                  code: parameter.code,
                  label: parameter.label,
                  type: parameter.type,
                  isRequired: parameter.isRequired ?? false,
                  defaultValue: parameter.defaultValue,
                  options:
                    parameter.options === undefined
                      ? Prisma.JsonNull
                      : (parameter.options as Prisma.InputJsonValue),
                  displayOrder: parameter.displayOrder ?? 0,
                })),
              }
            : undefined,
        },
        include: { parameters: { orderBy: { displayOrder: 'asc' } } },
      });
    });
    return new ReportDefinitionEntity(item);
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');
  }

  private async ensureCategoryExists(id: string) {
    const category = await this.prisma.reportCategory.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Report category not found');
    return category;
  }

  private async ensureCategoryCodeUnique(
    companyId: string | null,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.reportCategory.findFirst({
      where: { companyId, code, ...(excludeId ? { id: { not: excludeId } } : {}) },
    });
    if (item) throw new ConflictException('Report category code already exists');
  }

  private async ensureDefinitionCodeUnique(
    companyId: string | null,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.reportDefinition.findFirst({
      where: { companyId, code, ...(excludeId ? { id: { not: excludeId } } : {}) },
    });
    if (item) throw new ConflictException('Report definition code already exists');
  }
}
