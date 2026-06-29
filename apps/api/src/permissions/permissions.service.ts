import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEntity } from './entities/permission.entity';

type PermissionRecord = {
  id: string;
  module: string;
  action: string;
  code: string;
  description: string | null;
};

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(permission: PermissionRecord): PermissionEntity {
    return new PermissionEntity({
      id: permission.id,
      module: permission.module,
      action: permission.action,
      code: permission.code,
      description: permission.description,
    });
  }

  async findAll(): Promise<PermissionEntity[]> {
    const permissions = await this.prisma.permission.findMany({
      orderBy: [
        {
          module: 'asc',
        },
        {
          action: 'asc',
        },
      ],
    });

    return permissions.map((permission) => this.toEntity(permission));
  }

  async findOne(id: string): Promise<PermissionEntity> {
    const permission = await this.prisma.permission.findUnique({
      where: {
        id,
      },
    });

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    return this.toEntity(permission);
  }

  async create(dto: CreatePermissionDto): Promise<PermissionEntity> {
    const existingPermission = await this.prisma.permission.findUnique({
      where: {
        code: dto.code,
      },
    });

    if (existingPermission) {
      throw new ConflictException('Permission code already exists');
    }

    const permission = await this.prisma.permission.create({
      data: {
        module: dto.module,
        action: dto.action,
        code: dto.code,
        description: dto.description,
      },
    });

    return this.toEntity(permission);
  }

  async update(
    id: string,
    dto: UpdatePermissionDto,
  ): Promise<PermissionEntity> {
    await this.findOne(id);

    if (dto.code) {
      const existingPermission = await this.prisma.permission.findFirst({
        where: {
          id: {
            not: id,
          },
          code: dto.code,
        },
      });

      if (existingPermission) {
        throw new ConflictException('Permission code already exists');
      }
    }

    const permission = await this.prisma.permission.update({
      where: {
        id,
      },
      data: {
        module: dto.module,
        action: dto.action,
        code: dto.code,
        description: dto.description,
      },
    });

    return this.toEntity(permission);
  }

  async remove(id: string): Promise<{
    success: boolean;
    deletedPermission: PermissionEntity;
  }> {
    const permission = await this.findOne(id);

    await this.prisma.permission.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      deletedPermission: permission,
    };
  }
}
