import { Module } from '@nestjs/common';
import { EnvService } from '../infra/envs/env.service';
import { BcryptCryptoProvider } from './bcrypt-crypto-provider';
import { HashProvider } from '@core/modules/user/application/ports/providers/hash-provider';
import { JwtProvider } from './jwt-provider';
import { TokenProvider } from '@core/modules/user/application/ports/providers/token-provider';

import { UploadFileProvider } from '@core/modules/estimate-request/application/ports/provider/upload-file';
// import { LocalUploadFileProvider } from './local-upload-file';

import { FirebaseUploadFileProvider } from './firebase-storage-upload-file';
import { AddressFinderProvider } from '@core/common/application/ports/providers/address-finder';

import { EmailProvider } from '@core/common/application/ports/providers/email-provider';
import { ResendEmailProvider } from './resend-email-provider';
import { LocationiqProvider } from './locationiq-provider';

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
      useClass: FirebaseUploadFileProvider,
    },
    {
      provide: AddressFinderProvider,
      useClass: LocationiqProvider,
    },
    {
      provide: EmailProvider,
      useClass: ResendEmailProvider,
    },
    EnvService,
  ],

  exports: [
    TokenProvider,
    HashProvider,
    UploadFileProvider,
    EnvService,
    EmailProvider,
    AddressFinderProvider,
  ],
})
export class ProviderModule {}
