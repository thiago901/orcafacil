import { Module } from '@nestjs/common';

import { InfoController } from './controllers/info-controller';

import DatabaseModule from '@adapters/drivens/infra/database/prisma/database.module';
import { UserController } from './controllers/user-controller';
import { UserModule } from '@core/modules/user/user.module';
import { SessionController } from './controllers/session-controller';
import { CompanyModule } from '@core/modules/company/company.module';
import { CompanyController } from './controllers/company-controller';
import { CompanyRepository } from '@core/modules/company/application/ports/repositories/company-repository';
import { PrismaCompanyRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-company-repository';

@Module({
  imports: [
    DatabaseModule,
    UserModule,

    {
      module: CompanyModule,
      providers: [
        {
          provide: CompanyRepository,
          useClass: PrismaCompanyRepository,
        },
      ],
    },
  ],

  controllers: [
    InfoController,
    UserController,
    CompanyController,
    SessionController,
  ],
})
export class HTTPModule {}
