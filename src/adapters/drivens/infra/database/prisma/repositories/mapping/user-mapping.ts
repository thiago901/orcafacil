import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Company } from '@core/modules/company/entities/company';
import { User } from '@core/modules/user/entities/user';

import { User as UserPrisma, Company as CompanyPrisma } from '@prisma/client';

type UserComplete = UserPrisma & {
  company?: CompanyPrisma;
};
export class UserMapping {
  static toDomain({
    created_at,
    email,
    id,
    name,
    password,
    phone,
    avatar,
    updated_at,
    company,
  }: UserComplete) {
    return User.create(
      {
        email,
        created_at,
        updated_at: updated_at ? updated_at : undefined,
        name,
        password,
        avatar,
        phone,
        company: company
          ? Company.create(
              {
                avatar: company.avatar,
                name: company.name,
                owner_id: company.owner_id,
                ratting: company.ratting,
              },
              new UniqueEntityID(company.id),
            )
          : null,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(user: User) {
    return {
      id: user.id.toString(),
      created_at: user.created_at,
      updated_at: user.updated_at,
      email: user.email,
      name: user.name,
      password: user.password,
      phone: user.phone,
    };
  }
}
