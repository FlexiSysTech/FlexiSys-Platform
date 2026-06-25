import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    if (username !== 'admin' || password !== '123456') {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      sub: 1,
      username: 'admin',
      role: 'SUPER_ADMIN',
    };

    return {
      success: true,
      accessToken: this.jwtService.sign(payload),
      user: {
        id: 1,
        username: 'admin',
        role: 'SUPER_ADMIN',
      },
    };
  }
}