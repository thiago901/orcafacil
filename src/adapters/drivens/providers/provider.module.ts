import { Module } from '@nestjs/common';
import { EnvService } from '../infra/envs/env.service';
import { BcryptCryptoProvider } from './bcrypt-crypto-provider';
import { HashProvider } from '@core/modules/user/application/ports/providers/hash-provider';
import { JwtProvider } from './jwt-provider';
import { TokenProvider } from '@core/modules/user/application/ports/providers/token-provider';

import { UploadFileProvider } from '@core/modules/estimate-request/application/ports/provider/upload-file';
import { LocalUploadFileProvider } from './local-upload-file';

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
    {
      provide: UploadFileProvider,
      useClass: LocalUploadFileProvider,
    },
    EnvService,
  ],

  exports: [TokenProvider, HashProvider, UploadFileProvider],
})
export class ProviderModule {}
