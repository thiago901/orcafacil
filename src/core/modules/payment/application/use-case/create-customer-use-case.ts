import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { PaymentsProvider } from '../ports/providers/payments-provider';
import { ResourceAlreadyExistsError } from '@core/modules/user/application/errors/resource-already-exists-error';

interface RequestProps {
  email: string;
}

type ResponseProps = Either<ResourceAlreadyExistsError, null>;

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly paymentsProvider: PaymentsProvider) {}

  async execute({ email }: RequestProps): Promise<ResponseProps> {
    await this.paymentsProvider.createCustomer(email);
    return right(null);
  }
}
