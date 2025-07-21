import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

import { Customer } from '@core/modules/user/entities/customer';

import { Customer as CustomerPrisma } from '@prisma/client';

type CustomerComplete = CustomerPrisma;
export class CustomerMapping {
  static toDomain({
    created_at,
    email,
    id,
    name,
    document,
    phone,
    updated_at,
    user_id,
  }: CustomerComplete) {
    return Customer.create(
      {
        created_at,
        email,
        name,
        document,
        phone,
        updated_at,
        user_id,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(customer: Customer) {
    return {
      id: customer.id.toString(),
      created_at: customer.created_at,
      email: customer.email,

      name: customer.name,
      document: customer.document,
      phone: customer.phone,
      updated_at: customer.updated_at,
      user_id: customer.user_id,
    };
  }
}
