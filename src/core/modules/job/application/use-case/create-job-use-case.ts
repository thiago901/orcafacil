import { Job } from '@core/modules/job/entities/job';
import { JobRepository } from '../ports/repositories/job-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

interface RequestProps {
  company_id: string;
  proposal_id: string;
  estimate_request_id: string;
  estimate_id: string;
  customer_id: string;
}

type ResponseProps = Either<
  null,
  {
    job: Job;
  }
>;

@Injectable()
export class CreateJobUseCase {
  constructor(private readonly jobRepository: JobRepository) {}

  async execute({
    company_id,
    proposal_id,
    estimate_request_id,
    estimate_id,
    customer_id,
  }: RequestProps): Promise<ResponseProps> {
    const job = Job.create({
      company_id,
      proposal_id,
      user_id: customer_id,
      estimate_request_id,
      estimate_id,
      status: 'BACKLOG',
    });

    await this.jobRepository.create(job);

    return right({ job });
  }
}
