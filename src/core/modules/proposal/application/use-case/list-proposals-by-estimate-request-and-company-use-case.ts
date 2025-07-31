import { Proposal } from '@core/modules/proposal/entities/proposal';
import { ProposalRepository } from '../ports/repositories/proposal-repository';

import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

interface RequestProps {
  estimate_request_id: string;
  company_id: string;
}

type ResponseProps = Either<
  null,
  {
    proposals: Proposal[];
  }
>;

@Injectable()
export class ListProposalsByEstimateRequestCompanyUseCase {
  constructor(private readonly proposalRepository: ProposalRepository) {}

  async execute({
    estimate_request_id,
    company_id,
  }: RequestProps): Promise<ResponseProps> {
    const proposals =
      await this.proposalRepository.findByEstimateRequestAndCompany(
        estimate_request_id,
        company_id,
      );

    return right({ proposals });
  }
}
