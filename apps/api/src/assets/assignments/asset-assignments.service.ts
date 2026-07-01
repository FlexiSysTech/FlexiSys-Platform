import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AssetAssignmentStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateAssetAssignmentDto } from './dto/create-asset-assignment.dto';
import { ReturnAssetAssignmentDto } from './dto/return-asset-assignment.dto';
import { AssetAssignmentEntity } from './entities/asset-assignment.entity';

type AssetAssignmentRecord = {
  id: string;
  assetId: string;
  employeeId: string;
  assignedAt: Date;
  returnedAt: Date | null;
  status: AssetAssignmentStatus;
  conditionOut: string | null;
  conditionIn: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AssetAssignmentsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(item: AssetAssignmentRecord): AssetAssignmentEntity {
    return new AssetAssignmentEntity(item);
  }

  async findAll(): Promise<AssetAssignmentEntity[]> {
    const items = await this.prisma.assetAssignment.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return items.map((item) => this.toEntity(item));
  }

  async findOne(id: string): Promise<AssetAssignmentEntity> {
    const item = await this.prisma.assetAssignment.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Asset assignment not found');
    return this.toEntity(item);
  }

  async assign(dto: CreateAssetAssignmentDto): Promise<AssetAssignmentEntity> {
    const asset = await this.prisma.asset.findUnique({
      where: { id: dto.assetId },
      select: { id: true, status: true },
    });
    if (!asset) throw new NotFoundException('Asset not found');
    if (asset.status !== 'AVAILABLE') {
      throw new BadRequestException('Asset is not available for assignment');
    }

    const employee = await this.prisma.employee.findUnique({
      where: { id: dto.employeeId },
      select: { id: true },
    });
    if (!employee) throw new NotFoundException('Employee not found');

    const activeAssignment = await this.prisma.assetAssignment.findFirst({
      where: { assetId: dto.assetId, status: 'ASSIGNED' },
    });
    if (activeAssignment) throw new ConflictException('Asset is already assigned');

    const item = await this.prisma.$transaction(async (tx) => {
      const assignment = await tx.assetAssignment.create({
        data: {
          assetId: dto.assetId,
          employeeId: dto.employeeId,
          assignedAt: dto.assignedAt ? new Date(dto.assignedAt) : new Date(),
          status: 'ASSIGNED',
          conditionOut: dto.conditionOut,
          notes: dto.notes,
        },
      });

      await tx.asset.update({
        where: { id: dto.assetId },
        data: { status: 'ASSIGNED' },
      });

      return assignment;
    });

    return this.toEntity(item);
  }

  async returnAsset(id: string, dto: ReturnAssetAssignmentDto): Promise<AssetAssignmentEntity> {
    const current = await this.findOne(id);
    if (current.status !== 'ASSIGNED') {
      throw new BadRequestException('Only assigned assets can be returned');
    }

    const item = await this.prisma.$transaction(async (tx) => {
      const assignment = await tx.assetAssignment.update({
        where: { id },
        data: {
          returnedAt: dto.returnedAt ? new Date(dto.returnedAt) : new Date(),
          status: 'RETURNED',
          conditionIn: dto.conditionIn,
          notes: dto.notes ?? current.notes,
        },
      });

      await tx.asset.update({
        where: { id: current.assetId },
        data: { status: 'AVAILABLE' },
      });

      return assignment;
    });

    return this.toEntity(item);
  }

  async markLost(id: string): Promise<AssetAssignmentEntity> {
    const current = await this.findOne(id);

    const item = await this.prisma.$transaction(async (tx) => {
      const assignment = await tx.assetAssignment.update({
        where: { id },
        data: { status: 'LOST', returnedAt: new Date() },
      });

      await tx.asset.update({
        where: { id: current.assetId },
        data: { status: 'LOST' },
      });

      return assignment;
    });

    return this.toEntity(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.prisma.assetAssignment.delete({ where: { id } });
    return { success: true, deletedAssetAssignment: item };
  }
}
