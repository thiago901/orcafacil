import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Company } from '@core/modules/company/entities/company';
import { User } from '@core/modules/user/entities/user';

import {
  User as UserPrisma,
  Company as CompanyPrisma,
  UserPlan as PrismaUserPlan,
} from '@prisma/client';
import { UserPlanMapping } from './user-plan-mapping';

type UserComplete = UserPrisma & {
  company?: CompanyPrisma;
  user_plans?: PrismaUserPlan[];
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
    user_plans,
    customer_id_from_payment_provider,
    active,
  }: UserComplete) {
    return User.create(
      {
        email,
        created_at,
        updated_at: updated_at ? updated_at : undefined,
        customer_id_from_payment_provider,
        name,
        password,
        avatar,
        phone,
        role,
        active,
        plan: user_plans?.map(UserPlanMapping.toDomain)[0] ?? null,
        company: company
          ? Company.create(
              {
                avatar: company.avatar,
                name: company.name,
                owner_id: company.owner_id,
                address_id: company.address_id,
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
      customer_id_from_payment_provider: user.customer_id_from_payment_provider,
      phone: user.phone,
      active: user.active,
    };
  }
}
