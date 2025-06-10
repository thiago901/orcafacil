import { Module } from '@nestjs/common';
import { CreateCustomerUseCase } from './application/use-case/create-customer-use-case';
import { CreatePaymentSessionUseCase } from './application/use-case/create-payment-session-use-case';

@Module({
  imports: [],

  providers: [CreateCustomerUseCase, CreatePaymentSessionUseCase],
  exports: [CreateCustomerUseCase, CreatePaymentSessionUseCase],
})
export class PaymentModule {}
