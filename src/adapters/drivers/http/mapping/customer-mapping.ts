import { Customer } from '@core/modules/user/entities/customer';

export class CustomerMapping {
  static toView({
    id,
    created_at,
    document,
    email,
    name,
    phone,
    user_id,
  }: Customer) {
    return {
      id: id.toString(),
      created_at,
      document,
      email,
      name,
      phone,
      user_id,
    };
  }
}
