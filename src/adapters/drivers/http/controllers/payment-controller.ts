import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Headers,
  HttpCode,
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
import { SubscribePlanUseCase } from '@core/modules/plan/application/use-case/subscribe-plan-use-case';
import {
  CancelSubscriptionProps,
  cancelSubscriptionSchema,
} from './validations/cancel-subscription.validate';
import { CancelSubscriptionUseCase } from '@core/modules/payment/application/use-case/cancel-subscription-use-case';

import { UpdateSubscribePlanUseCase } from '@core/modules/plan/application/use-case/update-subscribe-plan-use-case';
import { PaymentsCustomerProvider } from '@core/modules/payment/application/ports/providers/payments-customer-provider';
import {
  CreateUserPaymentSessionProps,
  createUserPaymentSessionSchema,
} from './validations/create-user-payment-session.validate';
import {
  CreateUserPaymentCustomerProps,
  createUserPaymentCustomerSchema,
} from './validations/create-user-payment-customer.validate';
import { CurrentUser } from '@adapters/drivens/infra/auth/current-user-decorator';
import { TokenPayload } from '@adapters/drivens/infra/auth/jwt.strategy';

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
    private readonly subscribePlanUseCase: SubscribePlanUseCase,
    private readonly updateSubscribePlanUseCase: UpdateSubscribePlanUseCase,
    private readonly cancelSubscriptionUseCase: CancelSubscriptionUseCase,
    private readonly paymentsCustomerProvider: PaymentsCustomerProvider,

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

    return {
      result: session.value,
    };
  }
  @Delete('/cancel/subscription')
  @UsePipes(new ZodValidationPipe(cancelSubscriptionSchema))
  async cancelSubscription(@Body() body: CancelSubscriptionProps) {
    const session = await this.cancelSubscriptionUseCase.execute(body);

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

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
          session.id,
          { expand: ['line_items.data.price'] },
        );

        const priceId = sessionWithLineItems.line_items?.data[0]?.price?.id;
        const lookup_key =
          sessionWithLineItems.line_items?.data[0]?.price?.lookup_key;

        const stripeCustomerId = session.customer as string;

        if (!stripeCustomerId || !priceId) break;

        // 🔍 Buscar usuário pelo stripe_customer_id
        const usuario = await this.prismaService.user.findFirst({
          where: { customer_id_from_payment_provider: stripeCustomerId },
        });

        if (!usuario) {
          console.warn(
            `Usuário não encontrado com customer_id ${stripeCustomerId}`,
          );
          break;
        }

        // 🔍 Buscar plano
        let whereClause: any = {};
        if (lookup_key === 'monthly') {
          whereClause = { price_id_month: priceId };
        } else if (lookup_key === 'yearly') {
          whereClause = { price_id_year: priceId };
        }

        const plan = await this.prismaService.plan.findFirst({
          where: whereClause,
        });

        if (!plan) {
          console.warn(`Nenhum plano encontrado para price_id: ${priceId}`);
          break;
        }

        // ✅ Atualiza o usuário com o novo plano
        await this.subscribePlanUseCase.execute({
          plan_id: plan.id,
          user_id: usuario.id,
          plan_type: lookup_key as 'monthly' | 'yearly',
        });

        console.log(
          `Plano atualizado para o usuário ${usuario.email}: ${plan.name}`,
        );
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;

        const customerId = subscription.customer;

        const end_date = subscription.cancel_at;
        const user = await this.prismaService.user.findFirst({
          where: {
            customer_id_from_payment_provider: String(customerId),
          },
        });

        if (user) {
          await this.updateSubscribePlanUseCase.execute({
            user_id: user?.id,
            end_date: end_date ? new Date(end_date * 1000) : undefined,
          });
        }
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;

        const customerId = subscription.customer; // pode ser o ID do Stripe ou o email, depende do seu fluxo

        const status = subscription.status;

        if (status === 'canceled') {
          const user = await this.prismaService.user.findFirst({
            where: {
              customer_id_from_payment_provider: String(customerId),
            },
          });
          if (user) {
            await this.subscribePlanUseCase.execute({
              plan_id: 'free',
              plan_type: 'monthly',
              user_id: user.id,
            });
          }
        }
      }
    }
    return {
      result: {
        received: true,
      },
    };
  }

  @Post('/customer/session')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(createUserPaymentSessionSchema))
  async createUserSession(
    @CurrentUser() user: TokenPayload,
    @Body() body: CreateUserPaymentSessionProps,
  ) {
    const proposal = await this.prismaService.proposal.findFirst({
      where: {
        id: body.proposal_id,
      },
    });

    if (!proposal || !proposal.approved_at) {
      throw new BadRequestException('Proposal not found');
    }
    const customer = await this.prismaService.customer.findFirst({
      where: {
        user_id: user.sub,
      },
    });
    if (!customer) {
      throw new BadRequestException('Customer not found');
    }
    const customerPayment = await this.paymentsCustomerProvider.findCustomer(
      customer.document,
    );
    if (!customerPayment) {
      throw new BadRequestException('Customer not found');
    }
    const session = await this.paymentsCustomerProvider.createPayment({
      amount: proposal.amount,
      customer_id: customerPayment.id,
    });

    return {
      result: session,
    };
  }
  @Post('/customer/asaas')
  @HttpCode(200)
  @Public()
  @UsePipes(new ZodValidationPipe(createUserPaymentCustomerSchema))
  async createUserCustomer(@Body() body: CreateUserPaymentCustomerProps) {
    const { doc, email, phone, name, customer_id } = body;
    const session = await this.paymentsCustomerProvider.createCustomer({
      document: doc,
      email,
      phone,
      name,
      customer_id,
    });

    return {
      result: session,
    };
  }
  @Post('/customer/asaas/webhook')
  @HttpCode(200)
  @Public()
  async asaaswebhook(@Body() body: any) {
    console.log('body', body);
    const { event } = body;

    return {
      result: true,
    };
  }
}
