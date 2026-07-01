import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateDocumentCategoryDto } from './dto/create-document-category.dto';
import { UpdateDocumentCategoryDto } from './dto/update-document-category.dto';
import { DocumentCategoryEntity } from './entities/document-category.entity';

type DocumentCategoryRecord = {
  id: string;
  companyId: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class DocumentCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: DocumentCategoryRecord): DocumentCategoryEntity {
    return new DocumentCategoryEntity(item);
  }

  async findAll(): Promise<DocumentCategoryEntity[]> {
    const items = await this.prisma.documentCategory.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<DocumentCategoryEntity> {
    const item = await this.prisma.documentCategory.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Document category not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateDocumentCategoryDto): Promise<DocumentCategoryEntity> {
    await this.ensureCompanyExists(dto.companyId);
    await this.ensureCodeIsUnique(dto.companyId, dto.code);

    const item = await this.prisma.documentCategory.create({
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        isActive: dto.isActive ?? true,
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdateDocumentCategoryDto,
  ): Promise<DocumentCategoryEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.companyId || dto.code) {
      await this.ensureCodeIsUnique(companyId, code, id);
    }

    const item = await this.prisma.documentCategory.update({
      where: { id },
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        isActive: dto.isActive,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.documentCategory.delete({ where: { id } });

    return {
      success: true,
      deletedDocumentCategory: item,
    };
  }

  private async ensureCompanyExists(id: string): Promise<void> {
    const company = await this.prisma.company.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }
  }

  private async ensureCodeIsUnique(
    companyId: string,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.documentCategory.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (item) {
      throw new ConflictException(
        'Document category code already exists in this company',
      );
    }
  }
}
