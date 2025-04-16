import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Company } from '@core/modules/company/entities/company';

import { Company as CompanyPrisma } from '@prisma/client';

export class CompanyMapping {
  static toDomain({ avatar, id, name, ratting, owner_id }: CompanyPrisma) {
    return Company.create(
      {
        avatar,
        name,
        owner_id,
        ratting,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(company: Company) {
    return {
      id: company.id.toString(),
      avatar: company.avatar,
      name: company.name,
      owner_id: company.owner_id,
      ratting: company.ratting,
    };
  }
}
