import { CompanyReview } from '@core/modules/company/entities/company-review';

export class CompanyReviewMapping {
  static toView({
    id,
    comment,
    company_id,
    files,
    rating,
    title,
    user_id,
    created_at,
  }: CompanyReview) {
    return {
      id: id.toString(),
      comment,
      company_id,
      files: files?.map((file) => ({
        id: file.id.toString(),
        company_review_id: file.company_review_id,
        url: file.url,
      })),
      rating,
      title,
      user_id,
      created_at,
    };
  }
}
