import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Category } from '@core/modules/company/entities/category';

import { CompanyService } from '@core/modules/company/entities/company-service';

import {
  CompanyService as CompanyServicePrisma,
  Category as CategoryPrisma,
} from '@prisma/client';

type CompanyCompletePrisma = CompanyServicePrisma & {
  category?: CategoryPrisma;
};
export class CompanyServiceMapping {
  static toDomain({
    category_id,
    company_id,
    created_at,
    id,
    name,
    updated_at,
    category,
  }: CompanyCompletePrisma) {
    return CompanyService.create(
      {
        category_id,
        company_id,
        name,
        created_at,
        updated_at,
        category: category
          ? Category.create(
              {
                name: category.name,
                created_at: category.created_at,
                updated_at,
              },
              new UniqueEntityID(category_id),
            )
          : undefined,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(company: CompanyService) {
    return {
      category_id: company.category_id,
      company_id: company.company_id,
      created_at: company.created_at,
      id: company.id,
      name: company.name,
      updated_at: company.updated_at,
    };
  }
}
