import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { ApiTags } from '@nestjs/swagger';
import { CreateCustomerUseCase } from '@core/modules/payment/application/use-case/create-customer-use-case';
import {
  CreateCustomerProps,
  createCustomerSchema,
} from './validations/create-customer.validate';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { CreatePaymentSessionUseCase } from '@core/modules/payment/application/use-case/create-payment-session-use-case';
import {
  CreatePaymentSessionProps,
  createPaymentSessionSchema,
} from './validations/create-payment-session.validate';

@Controller('/payments')
@ApiTags('Payment')
@UseInterceptors(LoggingInterceptor)
export class PaymentController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly createPaymentSessionUseCase: CreatePaymentSessionUseCase,
  ) {}

  @Post('/customer')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(createCustomerSchema))
  async createCustomer(@Body() body: CreateCustomerProps) {
    const customer = await this.createCustomerUseCase.execute({
      email: body.email,
    });
    console.log('customer', customer);

    return {
      result: null,
    };
  }
  @Post('/session')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(createPaymentSessionSchema))
  async createSession(@Body() body: CreatePaymentSessionProps) {
    const session = await this.createPaymentSessionUseCase.execute(body);
    console.log('session', session);

    return {
      result: session.value,
    };
  }
}
