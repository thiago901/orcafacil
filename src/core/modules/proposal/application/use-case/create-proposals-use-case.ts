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

import { NotificationEmitter } from '@adapters/drivers/web-socket/emitters/proposals-emitter';
import { NotificationRepository } from '@core/modules/notification/application/ports/repositories/notification-repository';
import { Notification } from '@core/modules/notification/entities/notification';
import { UsagePlanProvider } from '@core/common/application/ports/providers/usage-plan-provider';
import { Estimate } from '@core/modules/estimate-request/entities/estimate';
import { EstimateRepository } from '@core/modules/estimate-request/application/ports/repositories/estimate-repository';
import {
  EstimateItem,
  EstimateItemsTypeProps,
  EstimateItemsTypeUnitProps,
} from '@core/modules/estimate-request/entities/estimate-item';
import { WatchedEstimateItem } from '@core/modules/estimate-request/entities/watched-estimate-item';
import { ProgressEstimateRequestProvider } from '@core/modules/estimate-request/application/ports/provider/progress-estimate-request';
import { ProgressEstimateRequestRepository } from '@core/modules/estimate-request/application/ports/repositories/progress-estimate-request-repository';

interface RequestProps {
  user_id: string;
  description: string;
  company_id: string;
  is_required_visit: boolean;
  customer: {
    name: string;
    phone: string;
    email: string;
    document: string;
  };

  items: {
    type: string;
    description: string;
    unit: string;
    price: number;
    quantity: number;
  }[];

  estimate_request_id: string;
  expire_at: Date;
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
    private readonly estimateRequestRepository: EstimateRequestRepository,
    private readonly estimateRepository: EstimateRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly emailProvider: EmailProvider,
    private readonly proposalNotificationProvider: NotificationEmitter,
    private readonly notificationRepository: NotificationRepository,
    private readonly usagePlanProvider: UsagePlanProvider,
    private readonly progressEstimateRequestProvider: ProgressEstimateRequestProvider,
    private readonly progressEstimateRequestRepository: ProgressEstimateRequestRepository,
  ) {}

  async execute({
    company_id,
    description,
    estimate_request_id,
    user_id,
    expire_at,
    customer,
    items,
    is_required_visit,
  }: RequestProps): Promise<ResponseProps> {
    await this.usagePlanProvider.checkAndConsumeFixed({
      resource: 'proposalsPerMonth',
      user_id: user_id,
    });

    const estimate_request =
      await this.estimateRequestRepository.findById(estimate_request_id);

    const company = await this.companyRepository.findById(company_id);

    if (!estimate_request || !company) {
      throw new ResourceNotFoundError();
    }

    const estimate = Estimate.create({
      company_id: company.id.toString(),
      company: {
        id: company.id.toString(),
        address: {
          city: company.address?.city || '',
          neighborhood: 'FakeBairro',
          number: '000',
          postal_code: company.address?.zip || '',
          state: company.address?.state || '',
          street: company.address?.address || '',
        },
        document: 'fake_document',
        email: company.email ?? '',
        phone: company.phone ?? '',
        name: company.name,
        avatar: company.avatar,
      },

      customer: {
        address: {} as any,
        document: customer.document,
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
      },
      description,
      expire_at,
      items: new WatchedEstimateItem(),
      total: 0,
    });
    const estimate_items = new WatchedEstimateItem(
      items.map((item) =>
        EstimateItem.create({
          description: item.description,
          estimate_id: estimate.id.toString(),
          name: `Orçamento: ${estimate_request.name}`,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
          type: item.type as EstimateItemsTypeProps,
          unit: item.unit as EstimateItemsTypeUnitProps,
        }),
      ),
    );
    estimate.items = estimate_items;
    estimate.total = estimate_items.currentItems.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0,
    );
    await this.estimateRepository.create(estimate);

    const proposal = Proposal.create({
      name: `Proposta: ${estimate_request.name}`,
      amount: estimate.total,
      estimate_id: estimate.id.toString(),
      expire_at,
      company_id,
      description,
      estimate_request_id,
      is_required_visit,
    });
    await this.proposalRepository.create(proposal);
    const hasProgresses =
      await this.progressEstimateRequestRepository.findByEstimateRequest(
        estimate_request_id,
      );

    if (!!hasProgresses.length) {
      const proposalsReceived = hasProgresses.find(
        (p) => p.type === 'PROPOSALS_RECEIVED',
      );
      if (!!proposalsReceived) {
        proposalsReceived.description = `Você recebeu uma proposta`;
        proposalsReceived.title = 'Propostas Recebidas';
        await this.progressEstimateRequestRepository.save(proposalsReceived);
      } else {
        await this.progressEstimateRequestProvider.execute({
          type: 'PROPOSALS_RECEIVED',
          estimate_request_id,
          description: `Você recebeu uma proposta`,
          title: 'Proposta Recebida',
        });
      }
    }

    await this.emailProvider.send({
      to: estimate_request.email,
      subject: 'Proposta recebida',
      templatePath: path.resolve(
        process.cwd(),
        'src/core/common/views/proposal-received.hbs',
      ),
      variables: {
        clientName: estimate_request.name,
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
      recipient_id: estimate_request.user_id,
      title: 'Proposta recebida',
      type: 'PROPOSAL',
    });
    await this.notificationRepository.create(notification);

    this.proposalNotificationProvider.sendNotification({
      to: estimate_request.user_id,
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
