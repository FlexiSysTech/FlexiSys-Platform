import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  SelfServiceRequestStatus,
  SelfServiceRequestType,
} from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateSelfServiceRequestDto } from './dto/create-self-service-request.dto';
import { ReviewSelfServiceRequestDto } from './dto/review-self-service-request.dto';
import { UpdateSelfServiceRequestDto } from './dto/update-self-service-request.dto';
import { SelfServiceRequestEntity } from './entities/self-service-request.entity';

type SelfServiceRequestRecord = {
  id: string;
  employeeId: string;
  type: SelfServiceRequestType;
  title: string;
  description: string | null;
  status: SelfServiceRequestStatus;
  payload: Prisma.JsonValue | null;
  response: string | null;
  submittedAt: Date | null;
  reviewedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class SelfServiceRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: SelfServiceRequestRecord): SelfServiceRequestEntity {
    return new SelfServiceRequestEntity(item);
  }

  async findAll(): Promise<SelfServiceRequestEntity[]> {
    const items = await this.prisma.selfServiceRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findByEmployee(employeeId: string): Promise<SelfServiceRequestEntity[]> {
    await this.ensureEmployeeExists(employeeId);

    const items = await this.prisma.selfServiceRequest.findMany({
      where: { employeeId },
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<SelfServiceRequestEntity> {
    const item = await this.prisma.selfServiceRequest.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Self service request not found');
    }

    return this.toEntity(item);
  }

  async create(
    dto: CreateSelfServiceRequestDto,
  ): Promise<SelfServiceRequestEntity> {
    await this.ensureEmployeeExists(dto.employeeId);

    const item = await this.prisma.selfServiceRequest.create({
      data: {
        employeeId: dto.employeeId,
        type: dto.type,
        title: dto.title,
        description: dto.description,
        payload: dto.payload === undefined ? Prisma.JsonNull : (dto.payload as Prisma.InputJsonValue),
        status: 'DRAFT',
      },
    });

    return this.toEntity(item);
  }

  async update(
    id: string,
    dto: UpdateSelfServiceRequestDto,
  ): Promise<SelfServiceRequestEntity> {
    const current = await this.findOne(id);

    if (current.status !== 'DRAFT') {
      throw new BadRequestException('Only draft requests can be edited');
    }

    if (dto.employeeId) {
      await this.ensureEmployeeExists(dto.employeeId);
    }

    const item = await this.prisma.selfServiceRequest.update({
      where: { id },
      data: {
        employeeId: dto.employeeId,
        type: dto.type,
        title: dto.title,
        description: dto.description,
        payload: dto.payload === undefined ? undefined : (dto.payload as Prisma.InputJsonValue),
        response: dto.response,
      },
    });

    return this.toEntity(item);
  }

  async submit(id: string): Promise<SelfServiceRequestEntity> {
    const current = await this.findOne(id);

    if (current.status !== 'DRAFT') {
      throw new BadRequestException('Only draft requests can be submitted');
    }

    const item = await this.prisma.selfServiceRequest.update({
      where: { id },
      data: {
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
    });

    return this.toEntity(item);
  }

  async review(
    id: string,
    dto: ReviewSelfServiceRequestDto,
  ): Promise<SelfServiceRequestEntity> {
    if (!['APPROVED', 'REJECTED', 'IN_REVIEW', 'CANCELLED'].includes(dto.status)) {
      throw new BadRequestException('Invalid review status');
    }

    await this.findOne(id);

    const item = await this.prisma.selfServiceRequest.update({
      where: { id },
      data: {
        status: dto.status,
        response: dto.response,
        reviewedAt:
          dto.status === 'APPROVED' || dto.status === 'REJECTED'
            ? new Date()
            : undefined,
      },
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    await this.prisma.selfServiceRequest.delete({ where: { id } });

    return {
      success: true,
      deletedSelfServiceRequest: item,
    };
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
}

