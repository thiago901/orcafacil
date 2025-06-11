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
    role,
    plan_id,
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
        role,
        plan_id,
        company: company
          ? Company.create(
              {
                avatar: company.avatar,
                name: company.name,
                owner_id: company.owner_id,
                ratting: Number(company.ratting),
                about: company.about,
                address: null,
                email: company.email,
                phone: company.phone,
                website: company.website,
                services: [],
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
      avatar: user.avatar,
      email: user.email,
      name: user.name,
      role: user.role,
      password: user.password,
      phone: user.phone,
      plan_id: user.plan_id,
    };
  }
}
