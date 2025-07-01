import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';

import { CompanyReview } from '../../entities/company-review';
import { CompanyReviewRepository } from '../ports/repositories/company-review-repository';
import { CompanyRepository } from '../ports/repositories/company-repository';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

import { JobRepository } from '@core/modules/job/application/ports/repositories/job-repository';

type RequestProps = {
  title: string;
  comment?: string;

  job_id: string;
  rating: number;
};
type ResponseProps = Either<
  ResourceNotFoundError,
  {
    review: CompanyReview;
  }
>;

@Injectable()
export class CreateCompanyReviewUseCase {
  constructor(
    private readonly companyReviewRepository: CompanyReviewRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly JobRepository: JobRepository,
  ) {}

  async execute({
    comment,

    rating,
    title,
    job_id,
  }: RequestProps): Promise<ResponseProps> {
    const job = await this.JobRepository.findById(job_id);

    if (!job) {
      return left(new ResourceNotFoundError());
    }
    const company = await this.companyRepository.findById(job.company_id);

    if (!company) {
      return left(new ResourceNotFoundError());
    }
    const review = CompanyReview.create({
      comment,
      title,
      job_id,
      company_id: company.id.toString(),
      rating,
      user_id: job.user_id,
    });
    await this.companyReviewRepository.create(review);

    company.ratting =
      company.ratting === 0 ? rating : (company.ratting + rating) / 2;
    await this.companyRepository.save(company);
    return right({ review });
  }
}
