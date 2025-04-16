import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JWTStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth-guard';
import { APP_GUARD } from '@nestjs/core';
import { EnvService } from '../envs/env.service';
import { EnvModule } from '../envs/env.module';
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      global: true,
      inject: [EnvService],
      useFactory(env: EnvService) {
        const jwt_private_key = env.get('JWT_PRIVATE_KEY');
        const jwt_public_key = env.get('JWT_PUBLIC_KEY');
        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(jwt_private_key, 'base64'),
          publicKey: Buffer.from(jwt_public_key, 'base64'),
        };
      },
    }),
  ],
  providers: [
    EnvService,
    JWTStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AuthModule {}
