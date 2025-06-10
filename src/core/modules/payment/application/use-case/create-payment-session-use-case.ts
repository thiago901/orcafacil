import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { PaymentsProvider } from '../ports/providers/payments-provider';
import { ResourceAlreadyExistsError } from '@core/modules/user/application/errors/resource-already-exists-error';

interface RequestProps {
  customer_id: string;
  price_id: string;
}

type ResponseProps = Either<ResourceAlreadyExistsError, string | null>;

@Injectable()
export class CreatePaymentSessionUseCase {
  constructor(private readonly paymentsProvider: PaymentsProvider) {}

  async execute({
    customer_id,
    price_id,
  }: RequestProps): Promise<ResponseProps> {
    const url = await this.paymentsProvider.createCheckoutSession(
      customer_id,
      price_id,
    );
    return right(url);
  }
}
