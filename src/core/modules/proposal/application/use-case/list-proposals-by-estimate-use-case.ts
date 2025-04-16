import { Proposal } from '@core/modules/proposal/entities/proposal';
import { ProposalRepository } from '../ports/repositories/proposal-repository';

import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

interface RequestProps {
  estimateRequestId: number;
}

type ResponseProps = Either<
  null,
  {
    proposals: Proposal[];
  }
>;

@Injectable()
export class ListProposalsByEstimateUseCase {
  constructor(private readonly proposalRepository: ProposalRepository) {}

  async execute({ estimateRequestId }: RequestProps): Promise<ResponseProps> {
    const proposals =
      await this.proposalRepository.findByEstimateRequestId(estimateRequestId);

    return right({ proposals });
  }
}
