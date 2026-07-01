import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { OfferStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateOfferLetterDto } from './dto/create-offer-letter.dto';
import { RejectOfferLetterDto } from './dto/reject-offer-letter.dto';
import { UpdateOfferLetterDto } from './dto/update-offer-letter.dto';
import { OfferLetterEntity } from './entities/offer-letter.entity';

type OfferLetterRecord = {
  id: string;
  applicationId: string;
  title: string;
  salaryAmount: Decimal | null;
  startDate: Date | null;
  expiryDate: Date | null;
  status: OfferStatus;
  sentAt: Date | null;
  acceptedAt: Date | null;
  rejectedAt: Date | null;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class OfferLettersService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: OfferLetterRecord): OfferLetterEntity {
    return new OfferLetterEntity({
      ...item,
      salaryAmount: item.salaryAmount ? item.salaryAmount.toNumber() : null,
    });
  }

  async findAll(): Promise<OfferLetterEntity[]> {
    const items = await this.prisma.offerLetter.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<OfferLetterEntity> {
    const item = await this.prisma.offerLetter.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Offer letter not found');
    }

    return this.toEntity(item);
  }

  async create(dto: CreateOfferLetterDto): Promise<OfferLetterEntity> {
    await this.ensureApplicationExists(dto.applicationId);

    const item = await this.prisma.offerLetter.create({
      data: {
        applicationId: dto.applicationId,
        title: dto.title,
        salaryAmount: dto.salaryAmount,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
        status: dto.status ?? 'DRAFT',
        content: dto.content,
        sentAt: dto.status === 'SENT' ? new Date() : undefined,
        acceptedAt: dto.status === 'ACCEPTED' ? new Date() : undefined,
        rejectedAt: dto.status === 'REJECTED' ? new Date() : undefined,
      },
    });

    return this.toEntity(item);
  }

  async update(id: string, dto: UpdateOfferLetterDto): Promise<OfferLetterEntity> {
    await this.findOne(id);

    if (dto.applicationId) {
      await this.ensureApplicationExists(dto.applicationId);
    }

    const item = await this.prisma.offerLetter.update({
      where: { id },
      data: {
        applicationId: dto.applicationId,
        title: dto.title,
        salaryAmount: dto.salaryAmount,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
        status: dto.status,
        content: dto.content,
        sentAt: dto.status === 'SENT' ? new Date() : undefined,
        acceptedAt: dto.status === 'ACCEPTED' ? new Date() : undefined,
        rejectedAt: dto.status === 'REJECTED' ? new Date() : undefined,
      },
    });

    return this.toEntity(item);
  }

  async send(id: string): Promise<OfferLetterEntity> {
    await this.findOne(id);

    const item = await this.prisma.offerLetter.update({
      where: { id },
      data: {
        status: 'SENT',
        sentAt: new Date(),
      },
    });

    return this.toEntity(item);
  }

  async accept(id: string): Promise<OfferLetterEntity> {
    const offer = await this.findOne(id);

    if (offer.status === 'EXPIRED' || offer.status === 'CANCELLED') {
      throw new BadRequestException('Offer cannot be accepted');
    }

    const item = await this.prisma.offerLetter.update({
      where: { id },
      data: {
        status: 'ACCEPTED',
        acceptedAt: new Date(),
      },
    });

    await this.prisma.jobApplication.update({
      where: { id: offer.applicationId },
      data: {
        status: 'OFFER',
      },
    });

    return this.toEntity(item);
  }

  async reject(
    id: string,
    dto: RejectOfferLetterDto,
  ): Promise<OfferLetterEntity> {
    const offer = await this.findOne(id);

    const item = await this.prisma.offerLetter.update({
      where: { id },
      data: {
        status: 'REJECTED',
        rejectedAt: new Date(),
        content: dto.reason ? `${offer.content ?? ''}\n\nRejection reason: ${dto.reason}` : offer.content,
      },
    });

    await this.prisma.jobApplication.update({
      where: { id: offer.applicationId },
      data: {
        status: 'REJECTED',
        rejectedAt: new Date(),
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.offerLetter.delete({
      where: { id },
    });

    return {
      success: true,
      deletedOfferLetter: item,
    };
  }

  private async ensureApplicationExists(id: string): Promise<void> {
    const item = await this.prisma.jobApplication.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!item) {
      throw new NotFoundException('Application not found');
    }
  }
}
