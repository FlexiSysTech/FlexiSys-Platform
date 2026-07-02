import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '../auth/auth.module';
import { getJwtSecret, JWT_MOBILE_TOKEN_EXPIRES_IN } from '../auth/jwt.config';
import { MobileController } from './mobile.controller';
import { MobileService } from './mobile.service';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: getJwtSecret(),
      signOptions: {
        expiresIn: JWT_MOBILE_TOKEN_EXPIRES_IN,
      },
    }),
  ],
  controllers: [MobileController],
  providers: [MobileService],
  exports: [MobileService],
})
export class MobileModule {}
