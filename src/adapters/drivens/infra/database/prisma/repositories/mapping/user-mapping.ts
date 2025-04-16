import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { User } from '@core/modules/user/entities/user';

import { User as UserPrisma } from '@prisma/client';

export class UserMapping {
  static toDomain({
    created_at,
    email,
    id,
    name,
    password,
    phone,
    updated_at,
  }: UserPrisma) {
    return User.create(
      {
        email,
        created_at,
        updated_at: updated_at ? updated_at : undefined,
        name,
        password,
        phone,
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
