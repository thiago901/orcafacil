import { HashProvider } from '@core/modules/user/application/ports/providers/hash-provider';
import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptCryptoProvider implements HashProvider {
  private readonly saltRounds = 10;

  async hash(plain: string): Promise<string> {
    return await bcrypt.hash(plain, this.saltRounds);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plain, hash);
  }
}
