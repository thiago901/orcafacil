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
      to: 'tsrocha901@gmail.com',
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
    return right({ proposal });
  }
}
