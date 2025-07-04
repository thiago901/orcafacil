import { Module } from '@nestjs/common';
import { CreateCustomerUseCase } from './application/use-case/create-customer-use-case';
import { CreatePaymentSessionUseCase } from './application/use-case/create-payment-session-use-case';
import { CancelSubscriptionUseCase } from './application/use-case/cancel-subscription-use-case';

@Module({
  imports: [],

  providers: [
    CreateCustomerUseCase,
    CreatePaymentSessionUseCase,
    CancelSubscriptionUseCase,
  ],
  exports: [
    CreateCustomerUseCase,
    CreatePaymentSessionUseCase,
    CancelSubscriptionUseCase,
  ],
})
export class PaymentModule {}
