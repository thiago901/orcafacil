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

import { StripeProvider } from './stripe-provider';
import { PaymentsProvider } from '@core/modules/payment/application/ports/providers/payments-provider';
import { CustomerUsagePlanProvider } from './customer-usage-plan';
import { UsagePlanProvider } from '@core/common/application/ports/providers/usage-plan-provider';
import { PlanModule } from '@core/modules/plan/plan.module';
import { PlanRepository } from '@core/modules/plan/application/ports/repositories/plan-repository';
import { PrismaPlanRepository } from '../infra/database/prisma/repositories/prisma-plan-repository';
import { PlanUsageRepository } from '@core/modules/plan/application/ports/repositories/plan-usage-repository';
import { PrismaPlanUsageRepository } from '../infra/database/prisma/repositories/prisma-plan-usage-repository';
import { UserPlanRepository } from '@core/modules/plan/application/ports/repositories/user-plan-repository';
import { PrismaUserPlanRepository } from '../infra/database/prisma/repositories/prisma-user-plan-repository';
import { UserRepository } from '@core/modules/user/application/ports/repositories/user-repository';
import { PrismaUserRepository } from '../infra/database/prisma/repositories/prisma-user-repository';
import { GitHubIssuesSuportProvider } from './github-issues-suport-provider';
import { SupportProvider } from '@core/common/application/ports/providers/suport-provider';
import { PaymentsCustomerProvider } from '@core/modules/payment/application/ports/providers/payments-customer-provider';
import { AsaasProvider } from './assas-provider';

@Module({
  imports: [
    {
      module: PlanModule,
      providers: [
        {
          provide: PlanRepository,
          useClass: PrismaPlanRepository,
        },
        {
          provide: PlanUsageRepository,
          useClass: PrismaPlanUsageRepository,
        },
        {
          provide: UserPlanRepository,
          useClass: PrismaUserPlanRepository,
        },
        {
          provide: UserRepository,
          useClass: PrismaUserRepository,
        },
      ],
    },
  ],
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
    {
      provide: PaymentsProvider,
      useClass: StripeProvider,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: UsagePlanProvider,
      useClass: CustomerUsagePlanProvider,
    },
    {
      provide: SupportProvider,
      useClass: GitHubIssuesSuportProvider,
    },
    {
      provide: PaymentsCustomerProvider,
      useClass: AsaasProvider,
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
    PaymentsProvider,
    UsagePlanProvider,
    SupportProvider,
    PaymentsCustomerProvider,
  ],
})
export class ProviderModule {}
