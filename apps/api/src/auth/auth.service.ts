import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

type AuthUserWithRelations = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  password: string;
  status: UserStatus;
  roles: {
    role: {
      code: string;
      permissions: {
        permission: {
          code: string;
        };
      }[];
    };
  }[];
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = (await this.prisma.user.findUnique({
      where: {
        username: loginDto.username,
      },
      include: {
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
      },
    })) as AuthUserWithRelations | null;

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('User is not active');
    }

    const passwordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const roles = [
      ...new Set(user.roles.map((item) => item.role.code)),
    ];

    const permissions = [
      ...new Set(
        user.roles.flatMap((item) =>
          item.role.permissions.map(
            (rolePermission) => rolePermission.permission.code,
          ),
        ),
      ),
    ];

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });

    return {
      success: true,
      accessToken: this.jwtService.sign({
        sub: user.id,
        username: user.username,
        roles,
        permissions,
      }),
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        status: user.status,
        roles,
        permissions,
      },
    };
  }
}