import { Injectable } from '@nestjs/common';
import { Either, right, left } from '@core/common/entities/either';
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error';

import { CustomerRepository } from '../ports/repositories/customers-repository';
import { Customer } from '../../entities/customer';
import { ResourceNotFoundError } from '@core/common/errors/common/resource-not-found-error';

interface RequestProps {
  user_id: string;
}

type ResponseProps = Either<ResourceAlreadyExistsError, { customer: Customer }>;

@Injectable()
export class CustomerFindByUserIdUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute({ user_id }: RequestProps): Promise<ResponseProps> {
    const customer = await this.customerRepository.findByUserId(user_id);

    if (!customer) {
      return left(new ResourceNotFoundError());
    }
    return right({ customer });
  }
}
