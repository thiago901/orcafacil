import { User } from '@core/modules/user/entities/user';

export class UserMapping {
  static toView({
    id,
    created_at,
    email,
    name,
    phone,
    plan,
    role,
    updated_at,
    avatar,
  }: User) {
    return {
      id: id.toString(),
      created_at,
      email,
      name,
      phone,
      updated_at,
      avatar,
      plan,
      role,
    };
  }
}
