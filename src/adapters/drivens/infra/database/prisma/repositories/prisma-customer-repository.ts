import {
  CustomerRepository,
  CustomerRepositoryOptions,
} from '@core/modules/user/application/ports/repositories/customers-repository';
import { PrismaService } from '../prisma.service';
import { CustomerMapping } from './mapping/customer-mapping';

import { Injectable } from '@nestjs/common';
import { Customer } from '@core/modules/user/entities/customer';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(customer: Customer): Promise<void> {
    const {
      created_at,
      document,
      email,
      id,
      name,
      phone,
      updated_at,
      user_id,
    } = CustomerMapping.toPrisma(customer);

    await this.prisma.customer.create({
      data: {
        document,
        email,
        name,
        phone,
        created_at,
        id,
        updated_at,

        user_id,
      },
    });
  }
  async save(customer: Customer): Promise<void> {
    const data = CustomerMapping.toPrisma(customer);

    await this.prisma.customer.update({
      data,
      where: { id: customer.id.toString() },
    });
  }
  async getAll(): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany();

    return customers.map((customer) => CustomerMapping.toDomain(customer));
  }
  async findById(
    id: string,
    options?: CustomerRepositoryOptions,
  ): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: options?.relations
        ? {
            ...options.relations,
          }
        : {},
    });

    if (!customer) {
      return null;
    }

    return CustomerMapping.toDomain(customer);
  }
  async findByEmail(
    email: string,
    options?: CustomerRepositoryOptions,
  ): Promise<Customer | null> {
    const customer = await this.prisma.customer.findFirst({
      where: { email },
      include: options?.relations
        ? {
            ...options.relations,
          }
        : {},
    });

    if (!customer) {
      return null;
    }

    return CustomerMapping.toDomain(customer);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.customer.delete({
      where: { id },
    });
  }
}
