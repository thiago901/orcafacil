import { Job } from '@core/modules/job/entities/job';
import { JobRepository } from '../ports/repositories/job-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

interface RequestProps {
  companyId: number;
}

type ResponseProps = Either<
  null,
  {
    jobs: Job[];
  }
>;

@Injectable()
export class ListJobsByCompanyUseCase {
  constructor(private readonly jobRepository: JobRepository) {}

  async execute({ companyId }: RequestProps): Promise<ResponseProps> {
    const jobs = await this.jobRepository.findByCompanyId(companyId);

    return right({ jobs });
  }
}
