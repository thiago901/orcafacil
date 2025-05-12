import { Job } from '@core/modules/job/entities/job';
import { JobRepository } from '../ports/repositories/job-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

interface RequestProps {
  id: string;
}

type ResponseProps = Either<
  null,
  {
    job: Job;
  }
>;

@Injectable()
export class GetJobByIdUseCase {
  constructor(private readonly jobRepository: JobRepository) {}

  async execute({ id }: RequestProps): Promise<ResponseProps> {
    const job = await this.jobRepository.findById(id);
    if (!job) {
      throw new ResourceNotFoundError();
    }
    return right({ job });
  }
}
