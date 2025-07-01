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
    const proposal = await this.proposalRepository.findById(id, {
      relations: {
        estimate_request: true,
      },
    });

    if (!proposal) {
      return left(new ResourceNotFoundError());
    }
    if (!proposal.estimate_request) {
      return left(new ResourceNotFoundError());
    }
    proposal.approved_at = new Date();
    await this.proposalRepository.save(proposal);
    const job = Job.create({
      company_id: proposal.company_id,
      proposal_id: proposal.id.toString(),
      estimate_request_id: proposal.estimate_request_id,
      estimate_id: proposal.estimate_id,
      user_id: proposal.estimate_request.user_id,
      status: 'BACKLOG',
    });
    await this.jobRepository.create(job);
    return right(null);
  }
}
