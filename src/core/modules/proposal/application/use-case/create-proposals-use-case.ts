import { Proposal } from '@core/modules/proposal/entities/proposal';
import { ProposalRepository } from '../ports/repositories/proposal-repository';

import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

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
  constructor(private readonly proposalRepository: ProposalRepository) {}

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
    await this.proposalRepository.create(proposal);

    return right({ proposal });
  }
}
