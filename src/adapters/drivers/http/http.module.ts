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
import { EstimateRequestModule } from '@core/modules/estimate-request/estimate-request.module';
import { EstimateRequestRepository } from '@core/modules/estimate-request/application/ports/repositories/estimate-request-repository';
import { PrismaEstimateRequestRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-estimate-request-repository';
import { EstimateRequestController } from './controllers/estimate-request-controller';
import { ProposalModule } from '@core/modules/proposal/proposal.module';
import { PrismaProposalRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-proposal-repository ';
import { ProposalRepository } from '@core/modules/proposal/application/ports/repositories/proposal-repository';
import { ProposalController } from './controllers/proposal-controller';
import { EstimateRequestFileRepository } from '@core/modules/estimate-request/application/ports/repositories/estimate-request-repository-file';
import { PrismaEstimateRequestFileRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-estimate-request-file-repository';
import { CompanyServiceRepository } from '@core/modules/company/application/ports/repositories/company-service-repository';
import { PrismaCompanyServiceRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-company-service-repository';
import { CompanyServicesController } from './controllers/company-services-controller';
import { PrismaCompanyCategoryRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-company-category-repository';
import { CompanyCategoryRepository } from '@core/modules/company/application/ports/repositories/company-catagories-repository';
import { CompanyCategoryController } from './controllers/company-categories-controller';
import { JobsController } from './controllers/jobs-controller';
import { JobModule } from '@core/modules/job/job.module';
import { JobRepository } from '@core/modules/job/application/ports/repositories/job-repository';
import { PrismaJobsRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-jobs-repository';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    {
      module: JobModule,
      providers: [
        {
          provide: JobRepository,
          useClass: PrismaJobsRepository,
        },
      ],
    },
    {
      module: CompanyModule,
      providers: [
        {
          provide: CompanyRepository,
          useClass: PrismaCompanyRepository,
        },
        {
          provide: CompanyServiceRepository,
          useClass: PrismaCompanyServiceRepository,
        },
        {
          provide: CompanyCategoryRepository,
          useClass: PrismaCompanyCategoryRepository,
        },
      ],
    },
    {
      module: EstimateRequestModule,
      providers: [
        {
          provide: EstimateRequestRepository,
          useClass: PrismaEstimateRequestRepository,
        },
        {
          provide: EstimateRequestFileRepository,
          useClass: PrismaEstimateRequestFileRepository,
        },
      ],
    },
    {
      module: ProposalModule,
      providers: [
        {
          provide: ProposalRepository,
          useClass: PrismaProposalRepository,
        },
        {
          provide: JobRepository,
          useClass: PrismaJobsRepository,
        },
      ],
    },
  ],

  controllers: [
    InfoController,
    ProposalController,
    UserController,
    CompanyController,
    SessionController,
    EstimateRequestController,
    CompanyServicesController,
    JobsController,
    CompanyCategoryController,
  ],
})
export class HTTPModule {}
