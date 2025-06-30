import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { CompanyReview } from '@core/modules/company/entities/company-review';

import { CompanyReview as CompanyReviewPrisma } from '@prisma/client';

type PrismaEntity = CompanyReviewPrisma;
export class CompanyReviewMapping {
  static toDomain({
    comment,
    company_id,
    created_at,
    id,
    rating,
    title,
    user_id,
  }: PrismaEntity) {
    return CompanyReview.create(
      {
        comment,
        company_id,
        created_at,
        rating,
        title,
        user_id,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(entity: CompanyReview) {
    return {
      id: entity.id.toString(),
      comment: entity.comment,
      company_id: entity.company_id,
      created_at: entity.created_at,
      rating: entity.rating,
      title: entity.title,
      user_id: entity.user_id,
    };
  }
}
