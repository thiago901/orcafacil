import { Job, JobStatus } from '@core/modules/job/entities/job';
import { JobRepository } from '../ports/repositories/job-repository';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

interface RequestProps {
  id: string;
  status: string;
}

type ResponseProps = Either<
  ResourceNotFoundError,
  {
    job: Job;
  }
>;

@Injectable()
export class UpdateStatusJobUseCase {
  constructor(private readonly jobRepository: JobRepository) {}

  async execute({ id, status }: RequestProps): Promise<ResponseProps> {
    const job = await this.jobRepository.findById(id);
    if (!job) {
      return left(new ResourceNotFoundError());
    }
    job.status = status as JobStatus;

    await this.jobRepository.save(job);

    return right({ job });
  }
}
