import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { ResourceExceededError } from '@core/modules/plan/application/errors/resource-exceeded-error';
import { CompanyReview } from '../../entities/company-review';
import { CompanyReviewRepository } from '../ports/repositories/company-review-repository';

type RequestProps = {
  company_id: string;
};
type ResponseProps = Either<
  ResourceExceededError,
  {
    review: CompanyReview[];
  }
>;

@Injectable()
export class ListCompanyReviewByCompanyUseCase {
  constructor(
    private readonly companyReviewRepository: CompanyReviewRepository,
  ) {}

  async execute({ company_id }: RequestProps): Promise<ResponseProps> {
    const review =
      await this.companyReviewRepository.getAllByCompany(company_id);
    return right({ review });
  }
}
