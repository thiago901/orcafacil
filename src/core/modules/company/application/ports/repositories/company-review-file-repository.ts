import { CompanyReviewFile } from '@core/modules/company/entities/company-review-file';

export abstract class CompanyReviewFileRepository {
  abstract create(review: CompanyReviewFile): Promise<void>;
}
