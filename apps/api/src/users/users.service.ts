import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

type UserRoleWithPermission = {
  role: {
    code: string;
    permissions: {
      permission: {
        code: string;
      };
    }[];
  };
};

type UserWithRelations = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string | null;
  avatar: string | null;
  status: UserStatus;
  lastLoginAt: Date | null;
  passwordChangedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  roles: UserRoleWithPermission[];
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private userInclude() {
    return {
      roles: {
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    };
  }

  private toEntity(user: UserWithRelations): UserEntity {
    const roles = user.roles.map((item) => item.role.code);

    const permissions = user.roles.flatMap((item) =>
      item.role.permissions.map(
        (rolePermission) => rolePermission.permission.code,
      ),
    );

    return new UserEntity({
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      avatar: user.avatar,
      status: user.status,
      roles: [...new Set(roles)],
      permissions: [...new Set(permissions)],
      lastLoginAt: user.lastLoginAt,
      passwordChangedAt: user.passwordChangedAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: this.userInclude(),
    });

    return users.map((user) => this.toEntity(user));
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: this.userInclude(),
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toEntity(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            username: createUserDto.username,
          },
          {
            email: createUserDto.email,
          },
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const roles = createUserDto.roles ?? [];

    const foundRoles = roles.length
      ? await this.prisma.role.findMany({
          where: {
            code: {
              in: roles,
            },
          },
        })
      : [];

    if (foundRoles.length !== roles.length) {
      throw new NotFoundException('One or more roles were not found');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        fullName: createUserDto.fullName,
        phone: createUserDto.phone,
        avatar: createUserDto.avatar,
        password: hashedPassword,
        status: createUserDto.status ?? UserStatus.ACTIVE,
        passwordChangedAt: new Date(),
        roles: {
          create: foundRoles.map((role) => ({
            role: {
              connect: {
                id: role.id,
              },
            },
          })),
        },
      },
      include: this.userInclude(),
    });

    return this.toEntity(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    await this.findOne(id);

    if (updateUserDto.username || updateUserDto.email) {
      const duplicateConditions: Array<
        { username: string } | { email: string }
      > = [];

      if (updateUserDto.username) {
        duplicateConditions.push({
          username: updateUserDto.username,
        });
      }

      if (updateUserDto.email) {
        duplicateConditions.push({
          email: updateUserDto.email,
        });
      }

      const existingUser = await this.prisma.user.findFirst({
        where: {
          id: {
            not: id,
          },
          OR: duplicateConditions,
        },
      });

      if (existingUser) {
        throw new ConflictException('Username or email already exists');
      }
    }

    const roles = updateUserDto.roles;

    if (roles) {
      const foundRoles = await this.prisma.role.findMany({
        where: {
          code: {
            in: roles,
          },
        },
      });

      if (foundRoles.length !== roles.length) {
        throw new NotFoundException('One or more roles were not found');
      }
    }

    const passwordData = updateUserDto.password
      ? {
          password: await bcrypt.hash(updateUserDto.password, 10),
          passwordChangedAt: new Date(),
        }
      : {};

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username: updateUserDto.username,
        email: updateUserDto.email,
        fullName: updateUserDto.fullName,
        phone: updateUserDto.phone,
        avatar: updateUserDto.avatar,
        status: updateUserDto.status,
        ...passwordData,
        ...(roles
          ? {
              roles: {
                deleteMany: {},
                create: roles.map((roleCode) => ({
                  role: {
                    connect: {
                      code: roleCode,
                    },
                  },
                })),
              },
            }
          : {}),
      },
      include: this.userInclude(),
    });

    return this.toEntity(user);
  }

  async remove(id: string): Promise<{
    success: boolean;
    deletedUser: UserEntity;
  }> {
    const user = await this.findOne(id);

    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      deletedUser: user,
    };
  }
}