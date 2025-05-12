import { ProposalRepository } from '../ports/repositories/proposal-repository';

import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

import { JobRepository } from '@core/modules/job/application/ports/repositories/job-repository';
import { Job } from '@core/modules/job/entities/job';

interface RequestProps {
  id: string;
}

type ResponseProps = Either<ResourceNotFoundError, null>;

@Injectable()
export class ApproveProposalUseCase {
  constructor(
    private readonly proposalRepository: ProposalRepository,
    private readonly jobRepository: JobRepository,
  ) {}

  async execute({ id }: RequestProps): Promise<ResponseProps> {
    const proposal = await this.proposalRepository.findById(id);

    if (!proposal) {
      return left(new ResourceNotFoundError());
    }
    proposal.approved_at = new Date();
    await this.proposalRepository.save(proposal);
    const job = Job.create({
      company_id: proposal.company_id,
      proposal_id: proposal.id.toString(),
    });
    await this.jobRepository.create(job);
    return right(null);
  }
}
