import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { EnvService } from '../infra/envs/env.service';
import {
  FindSubscriptionProps,
  PaymentsProvider,
} from '@core/modules/payment/application/ports/providers/payments-provider';

@Injectable()
export class StripeProvider implements PaymentsProvider {
  private stripe: Stripe;

  constructor(private readonly env: EnvService) {
    this.stripe = new Stripe(this.env.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-05-28.basil',
    });
  }
  async findSubscription(email: string): Promise<FindSubscriptionProps> {
    const customers = await this.stripe.customers.list({
      email,
    });
    if (!customers.data.length) {
      throw new Error('Cliente não encontrado');
    }
    const customer = customers.data[0];
    const subscriptions = await this.stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
    });

    if (!subscriptions.data.length) {
      throw new Error('Assinatura não encontrado');
    }
    const subscription = subscriptions.data[0];
    return {
      id: subscription.id,
    };
  }
  async cancelSubscription(id: string): Promise<void> {
    await this.stripe.subscriptions.update(id, {
      cancel_at_period_end: true,
    });
  }

  async createCustomer(email: string) {
    const customers = await this.stripe.customers.list({
      email: email, // Ele tenta filtrar, mas retorna múltiplos
      limit: 10,
    });

    const match = customers.data.find((c: any) => c.email === email);
    if (!!match) {
      return {
        id: match.id,
        email,
        name: match.name,
      };
    }
    const customer = await this.stripe.customers.create({ email });

    return {
      id: customer.id,
      email,
      name: customer.name,
    };
  }
  async findCustomer(email: string) {
    const customers = await this.stripe.customers.list({
      email: email, // Ele tenta filtrar, mas retorna múltiplos
      limit: 10,
    });

    const match = customers.data.find((c: any) => c.email === email);
    if (!!match) {
      return {
        id: match.id,
        email,
        name: match.name,
      };
    } else {
      return null;
    }
  }

  async createCheckoutSession(customer_id: string, priceId: string) {
    const session = await this.stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      mode: 'subscription',
      payment_method_types: ['card'],
      customer: customer_id,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${this.env.get('WEB_APPLICATION_URL')}/payments/success`,
      cancel_url: `${this.env.get('WEB_APPLICATION_URL')}/payments/canceled`,
    });
    return session.url;
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    const event = this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      this.env.get('STRIPE_WEBHOOK_SECRET'),
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      // Liberar plano para o usuário com session.customer ou session.subscription
      console.log('Assinatura confirmada para cliente', session.customer);
    }
  }
}
