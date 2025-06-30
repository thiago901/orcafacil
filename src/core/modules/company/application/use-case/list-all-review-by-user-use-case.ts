import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';
import { ResourceExceededError } from '@core/modules/plan/application/errors/resource-exceeded-error';
import { CompanyReview } from '../../entities/company-review';
import { CompanyReviewRepository } from '../ports/repositories/company-review-repository';

type RequestProps = {
  user_id: string;
};
type ResponseProps = Either<
  ResourceExceededError,
  {
    review: CompanyReview[];
  }
>;

@Injectable()
export class ListCompanyReviewByUserUseCase {
  constructor(
    private readonly companyReviewRepository: CompanyReviewRepository,
  ) {}

  async execute({ user_id }: RequestProps): Promise<ResponseProps> {
    const review = await this.companyReviewRepository.getAllByUser(user_id);
    return right({ review });
  }
}
