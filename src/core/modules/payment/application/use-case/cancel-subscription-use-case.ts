import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

import { PaymentsProvider } from '../ports/providers/payments-provider';

interface RequestProps {
  email: string;
}

type ResponseProps = Either<null, null>;

@Injectable()
export class CancelSubscriptionUseCase {
  constructor(private readonly paymentsProvider: PaymentsProvider) {}

  async execute({ email }: RequestProps): Promise<ResponseProps> {
    const { id } = await this.paymentsProvider.findSubscription(email);
    await this.paymentsProvider.cancelSubscription(id);
    return right(null);
  }
}
