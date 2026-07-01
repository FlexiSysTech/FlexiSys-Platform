import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateDocumentVersionDto } from './dto/create-document-version.dto';
import { DocumentVersionEntity } from './entities/document-version.entity';

type DocumentVersionRecord = {
  id: string;
  documentId: string;
  version: number;
  fileName: string | null;
  fileUrl: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  notes: string | null;
  createdAt: Date;
};

@Injectable()
export class DocumentVersionsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: DocumentVersionRecord): DocumentVersionEntity {
    return new DocumentVersionEntity(item);
  }

  async findAll(): Promise<DocumentVersionEntity[]> {
    const items = await this.prisma.documentVersion.findMany({
      orderBy: [{ documentId: 'asc' }, { version: 'desc' }],
    });

    return items.map((item) => this.toEntity(item));
  }

  async findByDocument(documentId: string): Promise<DocumentVersionEntity[]> {
    await this.ensureDocumentExists(documentId);

    const items = await this.prisma.documentVersion.findMany({
      where: { documentId },
      orderBy: { version: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<DocumentVersionEntity> {
    const item = await this.prisma.documentVersion.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Document version not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateDocumentVersionDto): Promise<DocumentVersionEntity> {
    const document = await this.prisma.document.findUnique({
      where: { id: dto.documentId },
      select: { id: true, version: true },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const version = dto.version ?? document.version + 1;

    const exists = await this.prisma.documentVersion.findFirst({
      where: {
        documentId: dto.documentId,
        version,
      },
    });

    if (exists) {
      throw new ConflictException('Document version already exists');
    }

    const item = await this.prisma.$transaction(async (tx) => {
      const created = await tx.documentVersion.create({
        data: {
          documentId: dto.documentId,
          version,
          fileName: dto.fileName,
          fileUrl: dto.fileUrl,
          mimeType: dto.mimeType,
          sizeBytes: dto.sizeBytes,
          notes: dto.notes,
        },
      });

      await tx.document.update({
        where: { id: dto.documentId },
        data: {
          version,
          fileName: dto.fileName,
          fileUrl: dto.fileUrl,
          mimeType: dto.mimeType,
          sizeBytes: dto.sizeBytes,
        },
      });

      return created;
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.documentVersion.delete({
      where: { id },
    });

    return {
      success: true,
      deletedDocumentVersion: item,
    };
  }

  private async ensureDocumentExists(id: string): Promise<void> {
    const document = await this.prisma.document.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }
  }
}
