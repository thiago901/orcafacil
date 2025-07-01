import { Module } from '@nestjs/common';

import { EnvService } from '@adapters/drivens/infra/envs/env.service';
import { EnvModule } from '@adapters/drivens/infra/envs/env.module';
import * as amqp from 'amqplib';
import { NotificationConsumer } from './consumers/notification.consumer';

import { CompanyModule } from '@core/modules/company/company.module';
import { CompanyRepository } from '@core/modules/company/application/ports/repositories/company-repository';
import { PrismaCompanyRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-company-repository';
import { CompanyServiceRepository } from '@core/modules/company/application/ports/repositories/company-service-repository';
import { PrismaCompanyServiceRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-company-service-repository';
import { CompanyCategoryRepository } from '@core/modules/company/application/ports/repositories/company-catagories-repository';
import { PrismaCompanyCategoryRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-company-category-repository';
import { AddressFinderProvider } from '@core/common/application/ports/providers/address-finder';
import { LocationiqProvider } from '@adapters/drivens/providers/locationiq-provider';
import { NotificationModule } from '@core/modules/notification/notification.module';
import { NotificationRepository } from '@core/modules/notification/application/ports/repositories/notification-repository';
import { PrismaNotificationRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-notification-repository';
import { NotificationProvider } from '@core/modules/notification/application/ports/providers/notification-provider';
import { NotificationEmitter } from '../web-socket/emitters/proposals-emitter';
import { CompanyReviewRepository } from '@core/modules/company/application/ports/repositories/company-review-repository';
import { PrismaCompanyReviewReviewRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-company-review-repository';
import { CompanyReviewFileRepository } from '@core/modules/company/application/ports/repositories/company-review-file-repository';
import { PrismaCompanyReviewFileRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-company-review-file-repository';
import { PrismaJobsRepository } from '@adapters/drivens/infra/database/prisma/repositories/prisma-jobs-repository';
import { JobRepository } from '@core/modules/job/application/ports/repositories/job-repository';

@Module({
  imports: [
    EnvModule,
    {
      module: NotificationModule,
      providers: [
        {
          provide: NotificationRepository,
          useClass: PrismaNotificationRepository,
        },
        {
          provide: NotificationProvider,
          useClass: NotificationEmitter,
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
          provide: CompanyReviewRepository,
          useClass: PrismaCompanyReviewReviewRepository,
        },
        {
          provide: CompanyReviewFileRepository,
          useClass: PrismaCompanyReviewFileRepository,
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
        {
          provide: JobRepository,
          useClass: PrismaJobsRepository,
        },
      ],
    },
  ],
  providers: [NotificationEmitter],
  controllers: [NotificationConsumer],
})
export class RMQModule {
  constructor(private readonly env: EnvService) {
    this.setup();
  }
  private async setup() {
    try {
      const connection = await amqp.connect(this.env.get('AMQP_URL'));
      const channel = await connection.createChannel();
      const exchange = 'amq.direct';
      const queues = this.env.get('AMQP_QUEUES');
      const queuesKey = Object.keys(queues);

      const allPromises: any[] = [];

      queuesKey.forEach((queueKey) => {
        const queue = queues[queueKey].name;
        const routingKeys = queues[queueKey].routing_keys;
        // Declare a exchange do tipo `direct`
        allPromises.push(
          channel.assertExchange(exchange, 'direct', { durable: true }),
        );
        // Declare a fila
        allPromises.push(channel.assertQueue(queue, { durable: false }));
        // Bind da fila à exchange com a routing key
        routingKeys.forEach((routingKey: string) => {
          allPromises.push(channel.bindQueue(queue, exchange, routingKey));
        });
      });
      await Promise.all(allPromises);
      await channel.close();
      await connection.close();
    } catch (error) {
      console.error('Erro ao configurar o RabbitMQ:', error);
    }
  }
}
