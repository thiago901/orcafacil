import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Category } from '@core/modules/company/entities/category';

import { Category as CategoryPrisma } from '@prisma/client';

export class CompanyCategoryMapping {
  static toDomain({ created_at, id, name, updated_at }: CategoryPrisma) {
    return Category.create(
      {
        name,
        created_at,
        updated_at,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(category: Category) {
    return {
      id: category.id.toString(),
      name: category.name,
      created_at: category.created_at,
      updated_at: category.updated_at,
    };
  }
}
