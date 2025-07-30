import { Job } from '@core/modules/job/entities/job';
import { JobRepository } from '../ports/repositories/job-repository';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { EmailProvider } from '@core/common/application/ports/providers/email-provider';
import { NotificationRepository } from '@core/modules/notification/application/ports/repositories/notification-repository';
import { Notification } from '@core/modules/notification/entities/notification';
import { UserRepository } from '@core/modules/user/application/ports/repositories/user-repository';
import * as path from 'node:path';
import { EnvService } from '@adapters/drivens/infra/envs/env.service';

interface RequestProps {
  id: string;
  finished_company_at?: Date;
  finished_customer_at?: Date;
}

type ResponseProps = Either<
  ResourceNotFoundError,
  {
    job: Job;
  }
>;

@Injectable()
export class UpdateStatusJobUseCase {
  constructor(
    private readonly jobRepository: JobRepository,
    private readonly emailProvider: EmailProvider,
    private readonly notificationRepository: NotificationRepository,
    private readonly userRepository: UserRepository,
    private readonly env: EnvService,
  ) {}

  async execute({
    id,
    finished_company_at,
    finished_customer_at,
  }: RequestProps): Promise<ResponseProps> {
    const job = await this.jobRepository.findById(id);
    if (!job) {
      return left(new ResourceNotFoundError());
    }

    job.finished_company_at = finished_company_at ?? job.finished_company_at;
    job.finished_customer_at = finished_customer_at ?? job.finished_customer_at;
    if (!!job.finished_customer_at && !!job.finished_company_at) {
      job.status = 'FINISHED';
    }
    await this.jobRepository.save(job);

    if (job.status === 'FINISHED') {
      const message = {
        title: 'Avalie o serviço finalizado',
        text: `Seu serviço foi finalizado avalie a empresa que te prestou serviço`,
        estimate_request_id: job.estimate_request_id,
      };
      const notification = Notification.create({
        message: JSON.stringify(message),
        read: false,
        recipient_id: job.user_id,
        title: 'Avalie o serviço finalizado',
        type: 'REVIEW',
      });
      await this.notificationRepository.create(notification);
      const customer = await this.userRepository.findById(job.user_id);
      if (!customer) {
        return left(new ResourceNotFoundError());
      }
      await this.emailProvider.send({
        to: customer.email,
        subject: 'Avalie o serviço finalizado',
        templatePath: path.resolve(
          process.cwd(),
          'src/core/common/views/review.hbs',
        ),
        variables: {
          reviewLink: `${this.env.get('WEB_APPLICATION_URL')}/review/${job.id.toString()}`,
          clientName: customer.name,
        },
      });
    }

    return right({ job });
  }
}
