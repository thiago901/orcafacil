import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';

import { CompanyReview } from '../../entities/company-review';
import { CompanyReviewRepository } from '../ports/repositories/company-review-repository';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

type RequestProps = {
  id: string;
};
type ResponseProps = Either<
  ResourceNotFoundError,
  {
    review: CompanyReview;
  }
>;

@Injectable()
export class FindCompanyReviewByIdUseCase {
  constructor(
    private readonly companyReviewRepository: CompanyReviewRepository,
  ) {}

  async execute({ id }: RequestProps): Promise<ResponseProps> {
    const review = await this.companyReviewRepository.findById(id);

    if (!review) {
      return left(new ResourceNotFoundError());
    }
    return right({ review });
  }
}
