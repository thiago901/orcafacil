import { ProposalRepository } from '../ports/repositories/proposal-repository';

import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

interface RequestProps {
  id: string;
}

type ResponseProps = Either<ResourceNotFoundError, null>;

@Injectable()
export class RejectProposalUseCase {
  constructor(private readonly proposalRepository: ProposalRepository) {}

  async execute({ id }: RequestProps): Promise<ResponseProps> {
    const proposal = await this.proposalRepository.findById(id);

    if (!proposal) {
      return left(new ResourceNotFoundError());
    }
    proposal.reject_at = new Date();
    await this.proposalRepository.save(proposal);
    return right(null);
  }
}
