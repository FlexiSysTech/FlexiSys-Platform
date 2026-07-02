import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserStatus } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from '../prisma/prisma.service';
import { getJwtSecret } from './jwt.config';

export interface JwtPayload {
  sub: string;
  username: string;
  roles: string[];
  permissions: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getJwtSecret(),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: { permission: true },
                },
              },
            },
          },
        },
      },
    });

    if (!user || user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException();
    }

    const roles = [...new Set(user.roles.map((item) => item.role.code))];

    const permissions = [
      ...new Set(
        user.roles.flatMap((item) =>
          item.role.permissions.map((p) => p.permission.code),
        ),
      ),
    ];

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      status: user.status,
      roles,
      permissions,
    };
  }
}
