import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { CompanyReviewFile } from '@core/modules/company/entities/company-review-file';

import { CompanyReviewFile as CompanyReviewFilePrisma } from '@prisma/client';

type PrismaEntity = CompanyReviewFilePrisma;
export class CompanyReviewFileMapping {
  static toDomain({ company_review_id, url, created_at, id }: PrismaEntity) {
    return CompanyReviewFile.create(
      {
        company_review_id,
        url,
        created_at,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(entity: CompanyReviewFile) {
    return {
      id: entity.id.toString(),
      company_review_id: entity.company_review_id,
      url: entity.url,
      created_at: entity.created_at,
    };
  }
}
