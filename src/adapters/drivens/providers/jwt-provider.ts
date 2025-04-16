import { TokenProvider } from '@core/modules/user/application/ports/providers/token-provider';
import { Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtProvider implements TokenProvider {
  private readonly secret = process.env.JWT_SECRET || 'dev-secret'; // ideal pegar do env

  async sign(payload: any, expiresIn = '7d'): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn });
  }

  async verify<T = any>(token: string): Promise<T> {
    return jwt.verify(token, this.secret) as T;
  }
}
