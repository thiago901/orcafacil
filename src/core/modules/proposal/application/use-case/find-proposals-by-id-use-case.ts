import { Proposal } from '@core/modules/proposal/entities/proposal';
import { ProposalRepository } from '../ports/repositories/proposal-repository';

import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

interface RequestProps {
  id: string;
}

type ResponseProps = Either<
  ResourceNotFoundError,
  {
    proposal: Proposal;
  }
>;

@Injectable()
export class FindProposalsByIdUseCase {
  constructor(private readonly proposalRepository: ProposalRepository) {}

  async execute({ id }: RequestProps): Promise<ResponseProps> {
    const proposal = await this.proposalRepository.findById(id);
    if (!proposal) {
      throw new ResourceNotFoundError();
    }
    return right({ proposal });
  }
}
