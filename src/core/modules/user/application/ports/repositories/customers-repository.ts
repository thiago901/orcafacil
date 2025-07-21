import { Customer } from '@core/modules/user/entities/customer';

export type CustomerRepositoryOptions = {
  relations?: any;
};
export abstract class CustomerRepository {
  abstract save(user: Customer): Promise<void>;
  abstract create(user: Customer): Promise<void>;
  abstract getAll(): Promise<Customer[]>;
  abstract findById(
    id: string,
    options?: CustomerRepositoryOptions,
  ): Promise<Customer | null>;
  abstract findByEmail(
    email: string,
    options?: CustomerRepositoryOptions,
  ): Promise<Customer | null>;
}
