import { CompanyReview } from '@core/modules/company/entities/company-review';

export abstract class CompanyReviewRepository {
  abstract create(review: CompanyReview): Promise<void>;
  abstract getAllByCompany(company_id: string): Promise<CompanyReview[]>;
  abstract getAllByUser(user_id: string): Promise<CompanyReview[]>;
  abstract findById(id: string): Promise<CompanyReview | null>;
}
