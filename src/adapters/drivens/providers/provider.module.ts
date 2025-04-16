import { Module } from '@nestjs/common';
import { EnvService } from '../infra/envs/env.service';
import { BcryptCryptoProvider } from './bcrypt-crypto-provider';
import { HashProvider } from '@core/modules/user/application/ports/providers/hash-provider';
import { JwtProvider } from './jwt-provider';
import { TokenProvider } from '@core/modules/user/application/ports/providers/token-provider';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    {
      provide: HashProvider,
      useClass: BcryptCryptoProvider,
    },
    {
      provide: TokenProvider,
      useClass: JwtProvider,
    },
    EnvService,
  ],

  exports: [TokenProvider, HashProvider],
})
export class ProviderModule {}
