import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  DocumentOwnerType,
  DocumentStatus,
  DocumentVisibility,
} from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentEntity } from './entities/document.entity';

type DocumentRecord = {
  id: string;
  companyId: string;
  categoryId: string | null;
  employeeId: string | null;
  code: string;
  title: string;
  description: string | null;
  fileName: string | null;
  fileUrl: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  ownerType: DocumentOwnerType;
  visibility: DocumentVisibility;
  status: DocumentStatus;
  issueDate: Date | null;
  expiryDate: Date | null;
  version: number;
  tags: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: DocumentRecord): DocumentEntity {
    return new DocumentEntity(item);
  }

  async findAll(): Promise<DocumentEntity[]> {
    const items = await this.prisma.document.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<DocumentEntity> {
    const item = await this.prisma.document.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException('Document not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateDocumentDto): Promise<DocumentEntity> {
    await this.ensureCompanyExists(dto.companyId);

    if (dto.categoryId) {
      await this.ensureCategoryExists(dto.categoryId);
    }

    if (dto.employeeId) {
      await this.ensureEmployeeExists(dto.employeeId);
    }

    await this.ensureCodeIsUnique(dto.companyId, dto.code);

    const item = await this.prisma.$transaction(async (tx) => {
      const document = await tx.document.create({
        data: {
          companyId: dto.companyId,
          categoryId: dto.categoryId,
          employeeId: dto.employeeId,
          code: dto.code,
          title: dto.title,
          description: dto.description,
          fileName: dto.fileName,
          fileUrl: dto.fileUrl,
          mimeType: dto.mimeType,
          sizeBytes: dto.sizeBytes,
          ownerType: dto.ownerType ?? 'COMPANY',
          visibility: dto.visibility ?? 'HR_ONLY',
          status: dto.status ?? 'ACTIVE',
          issueDate: dto.issueDate ? new Date(dto.issueDate) : undefined,
          expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
          tags: dto.tags,
          notes: dto.notes,
        },
      });

      await tx.documentVersion.create({
        data: {
          documentId: document.id,
          version: 1,
          fileName: dto.fileName,
          fileUrl: dto.fileUrl,
          mimeType: dto.mimeType,
          sizeBytes: dto.sizeBytes,
          notes: 'Initial version',
        },
      });

      return document;
    });

    return this.toEntity(item);
  }

  async update(id: string, dto: UpdateDocumentDto): Promise<DocumentEntity> {
    const current = await this.findOne(id);
    const companyId = dto.companyId ?? current.companyId;
    const code = dto.code ?? current.code;

    if (dto.companyId) {
      await this.ensureCompanyExists(dto.companyId);
    }

    if (dto.categoryId) {
      await this.ensureCategoryExists(dto.categoryId);
    }

    if (dto.employeeId) {
      await this.ensureEmployeeExists(dto.employeeId);
    }

    if (dto.companyId || dto.code) {
      await this.ensureCodeIsUnique(companyId, code, id);
    }

    const item = await this.prisma.$transaction(async (tx) => {
      const newVersion =
        dto.fileUrl && dto.fileUrl !== current.fileUrl
          ? current.version + 1
          : dto.version;

      const document = await tx.document.update({
        where: { id },
        data: {
          companyId: dto.companyId,
          categoryId: dto.categoryId,
          employeeId: dto.employeeId,
          code: dto.code,
          title: dto.title,
          description: dto.description,
          fileName: dto.fileName,
          fileUrl: dto.fileUrl,
          mimeType: dto.mimeType,
          sizeBytes: dto.sizeBytes,
          ownerType: dto.ownerType,
          visibility: dto.visibility,
          status: dto.status,
          issueDate: dto.issueDate ? new Date(dto.issueDate) : undefined,
          expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
          version: newVersion,
          tags: dto.tags,
          notes: dto.notes,
        },
      });

      if (dto.fileUrl && dto.fileUrl !== current.fileUrl) {
        await tx.documentVersion.create({
          data: {
            documentId: id,
            version: document.version,
            fileName: dto.fileName ?? document.fileName,
            fileUrl: dto.fileUrl,
            mimeType: dto.mimeType ?? document.mimeType,
            sizeBytes: dto.sizeBytes ?? document.sizeBytes,
            notes: 'Uploaded new file version',
          },
        });
      }

      return document;
    });

    return this.toEntity(item);
  }

  async archive(id: string): Promise<DocumentEntity> {
    await this.findOne(id);

    const item = await this.prisma.document.update({
      where: { id },
      data: { status: 'ARCHIVED' },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.document.update({
      where: { id },
      data: { status: 'DELETED' },
    });

    return {
      success: true,
      deletedDocument: item,
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

  private async ensureCategoryExists(id: string): Promise<void> {
    const category = await this.prisma.documentCategory.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!category) {
      throw new NotFoundException('Document category not found');
    }
  }

  private async ensureEmployeeExists(id: string): Promise<void> {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
  }

  private async ensureCodeIsUnique(
    companyId: string,
    code: string,
    excludeId?: string,
  ): Promise<void> {
    const item = await this.prisma.document.findFirst({
      where: {
        companyId,
        code,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    if (item) {
      throw new ConflictException('Document code already exists in this company');
    }
  }
}
