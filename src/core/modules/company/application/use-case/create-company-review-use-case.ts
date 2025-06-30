import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/common/entities/either';

import { CompanyReview } from '../../entities/company-review';
import { CompanyReviewRepository } from '../ports/repositories/company-review-repository';
import { CompanyRepository } from '../ports/repositories/company-repository';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

type RequestProps = {
  title: string;
  comment?: string;
  company_id: string;
  rating: number;
  user_id: string;
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
  ) {}

  async execute({
    comment,
    company_id,
    rating,
    user_id,
    title,
  }: RequestProps): Promise<ResponseProps> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      return left(new ResourceNotFoundError('Company not found'));
    }
    const review = CompanyReview.create({
      comment,
      title,
      company_id,
      rating,
      user_id,
    });
    await this.companyReviewRepository.create(review);

    company.ratting =
      company.ratting === 0 ? rating : (company.ratting + rating) / 2;
    await this.companyRepository.save(company);
    return right({ review });
  }
}
