import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
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
import Stripe from 'stripe';
import { PrismaService } from '@adapters/drivens/infra/database/prisma/prisma.service';
import { Public } from '@adapters/drivens/infra/auth/public';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

@Controller('/payments')
@ApiTags('Payment')
@UseInterceptors(LoggingInterceptor)
export class PaymentController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly createPaymentSessionUseCase: CreatePaymentSessionUseCase,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('/customer')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(createCustomerSchema))
  async createCustomer(@Body() body: CreateCustomerProps) {
    const result = await this.createCustomerUseCase.execute({
      email: body.email,
    });
    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }
    return {
      result: result.value.customer,
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
  @Post('/webhooks/stripe')
  @Public()
  @HttpCode(200)
  async handleStripeWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: Request,
  ) {
    // const thinEvent = client.parseThinEvent(req.body, signature, webhookSecret);

    const event = stripe.webhooks.constructEvent(
      req.body as any,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
    if (!event) {
      console.error('Webhook signature verification failed.');
      throw new BadRequestException(`Webhook Error: `);
    }
    // try {
    //   event = stripe.webhooks.constructEvent(
    //     req.body as any,
    //     signature,
    //     process.env.STRIPE_WEBHOOK_SECRET!,
    //   );
    // } catch (err) {
    //   console.error('Webhook signature verification failed.', err.message);
    //   throw new BadRequestException(`Webhook Error: ${err.message}`);
    // }

    // Lida com o evento
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
          session.id,
          { expand: ['line_items.data.price'] },
        );

        const priceId = sessionWithLineItems.line_items?.data[0]?.price?.id;

        const customerEmail = session.customer_details?.email;

        if (!customerEmail || !priceId) break;

        // Buscar o plano usando o price_id
        const plan = await this.prismaService.plan.findFirst({
          where: { price_id: priceId }, // ajuste esse campo conforme seu model
        });

        if (!plan) {
          console.warn(`Nenhum plano encontrado para price_id: ${priceId}`);
          break;
        }

        // Atualiza o usuário
        await this.prismaService.user.updateMany({
          where: { email: customerEmail },
          data: { plan_id: plan.id },
        });

        console.log(
          `Plano atualizado para o usuário ${customerEmail}: ${plan.name}`,
        );
        break;
      }
    }
    return {
      result: {
        received: true,
      },
    };
  }
}
