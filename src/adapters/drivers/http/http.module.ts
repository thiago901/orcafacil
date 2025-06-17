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
import { AddressFinderProvider } from '@core/common/application/ports/providers/address-finder';

import { DashboardController } from './controllers/dashboard-controller';
import { EstimateRequestMessageController } from './controllers/estimate-request-message-controller';
import { EstimateRequestMessageRepository } from '@core/modules/estimate-request/application/ports/repositories/estimate-request-repository-message';
import { PrismaEstimateRequestMessageRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-estimate-request-message-repository';
import { UserRepository } from '@core/modules/user/application/ports/repositories/user-repository';
import { PrismaUserRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-user-repository';
import { RealtimeMessageNotificationProvider } from '@core/modules/estimate-request/application/ports/provider/realtime-message-notification';
import { ChatEmitter } from '../web-socket/emitters/chat-emitter';
import { WebSocketModule } from '../web-socket/web-socket.module';
import { ProposalsEmitter } from '../web-socket/emitters/proposals-emitter';
import { ProposalNotificationProvider } from '@core/modules/proposal/application/ports/providers/proposal-notification-provider';
import { NotificationModule } from '@core/modules/notification/notification.module';
import { NotificationRepository } from '@core/modules/notification/application/ports/repositories/notification-repository';
import { PrismaNotificationRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-notification-repository';
import { NotificationController } from './controllers/notification-controller';
import { LocationiqProvider } from '@adapters/drivens/providers/locationiq-provider';
import { PaymentController } from './controllers/payment-controller';
import { PaymentModule } from '@core/modules/payment/payment.module';
import { PlanController } from './controllers/plan-controller';
import { PlanModule } from '@core/modules/plan/plan.module';

import { PrismaPlanRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-plan-repository';
import { UserTokenRepository } from '@core/modules/user/application/ports/repositories/user-token-repository';
import { PrismaUserTokenRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-user-token-repository';
import { PlanUsageRepository } from '@core/modules/plan/application/ports/repositories/plan-usage-repository';
import { PrismaPlanUsageRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-plan-usage-repository';
import { UserPlanRepository } from '@core/modules/plan/application/ports/repositories/user-plan-repository';
import { PrismaUserPlanRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-user-plan-repository';
import { PlanRepository } from '@core/modules/plan/application/ports/repositories/plan-repository';

@Module({
  imports: [
    WebSocketModule,
    DatabaseModule,

    {
      module: UserModule,
      providers: [
        {
          provide: UserRepository,
          useClass: PrismaUserRepository,
        },
        {
          provide: UserTokenRepository,
          useClass: PrismaUserTokenRepository,
        },
      ],
    },
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
        {
          provide: AddressFinderProvider,
          useClass: LocationiqProvider,
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
        {
          provide: AddressFinderProvider,
          useClass: LocationiqProvider,
        },
        {
          provide: EstimateRequestMessageRepository,
          useClass: PrismaEstimateRequestMessageRepository,
        },
        {
          provide: CompanyRepository,
          useClass: PrismaCompanyRepository,
        },
        {
          provide: UserRepository,
          useClass: PrismaUserRepository,
        },
        {
          provide: RealtimeMessageNotificationProvider,
          useClass: ChatEmitter,
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
        {
          provide: EstimateRequestRepository,
          useClass: PrismaEstimateRequestRepository,
        },
        {
          provide: CompanyRepository,
          useClass: PrismaCompanyRepository,
        },
        {
          provide: ProposalNotificationProvider,
          useClass: ProposalsEmitter,
        },
        {
          provide: NotificationRepository,
          useClass: PrismaNotificationRepository,
        },
      ],
    },
    {
      module: NotificationModule,
      providers: [
        {
          provide: NotificationRepository,
          useClass: PrismaNotificationRepository,
        },
      ],
    },

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
      ],
    },
    {
      module: PaymentModule,
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
    DashboardController,
    EstimateRequestMessageController,
    NotificationController,
    PaymentController,
    PlanController,
  ],
})
export class HTTPModule {}
