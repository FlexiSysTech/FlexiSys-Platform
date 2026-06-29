import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

type RoleWithPermissions = {
  id: string;
  name: string;
  code: string;
  description: string | null;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
  permissions: {
    permission: {
      code: string;
    };
  }[];
};

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(role: RoleWithPermissions): RoleEntity {
    return new RoleEntity({
      id: role.id,
      name: role.name,
      code: role.code,
      description: role.description,
      isSystem: role.isSystem,
      permissions: role.permissions.map((item) => item.permission.code),
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    });
  }

  private includePermissions() {
    return {
      permissions: {
        include: {
          permission: {
            select: {
              code: true,
            },
          },
        },
      },
    };
  }

  async findAll(): Promise<RoleEntity[]> {
    const roles = await this.prisma.role.findMany({
      orderBy: {
        name: 'asc',
      },
      include: this.includePermissions(),
    });

    return roles.map((role) => this.toEntity(role));
  }

  async findOne(id: string): Promise<RoleEntity> {
    const role = await this.prisma.role.findUnique({
      where: {
        id,
      },
      include: this.includePermissions(),
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return this.toEntity(role);
  }

  async create(dto: CreateRoleDto): Promise<RoleEntity> {
    const existingRole = await this.prisma.role.findFirst({
      where: {
        OR: [
          {
            name: dto.name,
          },
          {
            code: dto.code,
          },
        ],
      },
    });

    if (existingRole) {
      throw new ConflictException('Role name or code already exists');
    }

    const permissions = dto.permissions ?? [];

    const foundPermissions = permissions.length
      ? await this.prisma.permission.findMany({
          where: {
            code: {
              in: permissions,
            },
          },
        })
      : [];

    if (foundPermissions.length !== permissions.length) {
      throw new NotFoundException('One or more permissions were not found');
    }

    const role = await this.prisma.role.create({
      data: {
        name: dto.name,
        code: dto.code,
        description: dto.description,
        isSystem: dto.isSystem ?? false,
        permissions: {
          create: foundPermissions.map((permission) => ({
            permission: {
              connect: {
                id: permission.id,
              },
            },
          })),
        },
      },
      include: this.includePermissions(),
    });

    return this.toEntity(role);
  }

  async update(id: string, dto: UpdateRoleDto): Promise<RoleEntity> {
    await this.findOne(id);

    if (dto.name || dto.code) {
      const duplicateConditions: Array<
        { name: string } | { code: string }
      > = [];

      if (dto.name) {
        duplicateConditions.push({
          name: dto.name,
        });
      }

      if (dto.code) {
        duplicateConditions.push({
          code: dto.code,
        });
      }

      const existingRole = await this.prisma.role.findFirst({
        where: {
          id: {
            not: id,
          },
          OR: duplicateConditions,
        },
      });

      if (existingRole) {
        throw new ConflictException('Role name or code already exists');
      }
    }

    const permissions = dto.permissions;

    if (permissions) {
      const foundPermissions = await this.prisma.permission.findMany({
        where: {
          code: {
            in: permissions,
          },
        },
      });

      if (foundPermissions.length !== permissions.length) {
        throw new NotFoundException('One or more permissions were not found');
      }
    }

    const role = await this.prisma.role.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        code: dto.code,
        description: dto.description,
        isSystem: dto.isSystem,
        ...(permissions
          ? {
              permissions: {
                deleteMany: {},
                create: permissions.map((permissionCode) => ({
                  permission: {
                    connect: {
                      code: permissionCode,
                    },
                  },
                })),
              },
            }
          : {}),
      },
      include: this.includePermissions(),
    });

    return this.toEntity(role);
  }

  async remove(id: string): Promise<{
    success: boolean;
    deletedRole: RoleEntity;
  }> {
    const role = await this.findOne(id);

    await this.prisma.role.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      deletedRole: role,
    };
  }
}
