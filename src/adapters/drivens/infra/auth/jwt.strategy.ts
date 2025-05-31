import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { z } from 'zod';
import { EnvService } from '../envs/env.service';

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
});

export type TokenPayload = z.infer<typeof tokenPayloadSchema>;

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvService) {
    const jwt_public_key = env.get('JWT_PUBLIC_KEY');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: Buffer.from(jwt_public_key, 'base64'),
      alalgorithm: 'RS256',
    });
  }
  async validate(payload: TokenPayload) {
    return tokenPayloadSchema.parse(payload);
  }
}
