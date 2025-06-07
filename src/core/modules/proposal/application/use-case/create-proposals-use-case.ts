import { Proposal } from '@core/modules/proposal/entities/proposal';
import { ProposalRepository } from '../ports/repositories/proposal-repository';

import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';
import { EmailProvider } from '@core/common/application/ports/providers/email-provider';
import * as path from 'path';
import { EstimateRequestRepository } from '@core/modules/estimate-request/application/ports/repositories/estimate-request-repository';
import { CompanyRepository } from '@core/modules/company/application/ports/repositories/company-repository';
import { EnvService } from '@adapters/drivens/infra/envs/env.service';

import { ProposalsEmitter } from '@adapters/drivers/web-socket/emitters/proposals-emitter';
import { NotificationRepository } from '@core/modules/notification/application/ports/repositories/notification-repository';
import { Notification } from '@core/modules/notification/entities/notification';
interface RequestProps {
  name: string;
  amount: number;
  company_id: string;
  description: string;
  estimate_request_id: string;
}

type ResponseProps = Either<
  ResourceNotFoundError,
  {
    proposal: Proposal;
  }
>;

@Injectable()
export class CreateProposalUseCase {
  constructor(
    private readonly proposalRepository: ProposalRepository,
    private readonly env: EnvService,
    private readonly estimateRepository: EstimateRequestRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly emailProvider: EmailProvider,
    private readonly proposalNotificationProvider: ProposalsEmitter,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    name,
    amount,
    company_id,
    description,
    estimate_request_id,
  }: RequestProps): Promise<ResponseProps> {
    const proposal = Proposal.create({
      name,
      amount,
      company_id,
      description,
      estimate_request_id,
    });
    const estimate =
      await this.estimateRepository.findById(estimate_request_id);

    const company = await this.companyRepository.findById(company_id);
    if (!estimate || !company) {
      throw new ResourceNotFoundError();
    }
    await this.proposalRepository.create(proposal);
    await this.emailProvider.send({
      from: 'onboarding@resend.dev',
      to: estimate.email,
      subject: 'Proposta recebida',
      templatePath: path.resolve(
        process.cwd(),
        'src/core/common/views/proposal-received.hbs',
      ),
      variables: {
        clientName: estimate.name,
        companyName: company.name,
        proposalLink: `${this.env.get('WEB_APPLICATION_URL')}/my-budgets/${estimate_request_id}`,
      },
    });

    const message = {
      title: 'Proposta recebida',
      text: `Proposta recebida da empresa ${company.name}`,
      estimate_request_id,
    };
    const notification = Notification.create({
      message: JSON.stringify(message),
      read: false,
      recipient_id: estimate.user_id!,
      title: 'Proposta recebida',
      type: 'PROPOSAL',
    });
    await this.notificationRepository.create(notification);

    this.proposalNotificationProvider.sendNotification({
      to: estimate.user_id!,
      event: 'proposal:sent',
      payload: {
        id: notification.id.toString(),
        message,
        recipient_id: notification.recipient_id,
      },
    });
    return right({ proposal });
  }
}
