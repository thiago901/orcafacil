import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { EnvService } from '../infra/envs/env.service';
import { PaymentsProvider } from '@core/modules/payment/application/ports/providers/payments-provider';

@Injectable()
export class StripeProvider implements PaymentsProvider {
  private stripe: Stripe;

  constructor(private readonly env: EnvService) {
    this.stripe = new Stripe(this.env.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-05-28.basil',
    });
  }

  async createCustomer(email: string) {
    const customer = await this.stripe.customers.create({ email });
    Logger.log(`customer: ${JSON.stringify(customer)}`);
    return;
  }

  async createCheckoutSession(customerId: string, priceId: string) {
    // const prices = await this.stripe.prices.list({
    //   lookup_keys: [priceId],
    //   expand: ['data.product'],
    // });

    const session = await this.stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      mode: 'subscription',
      payment_method_types: ['card'],
      customer: 'cus_ST8cMQp3KABpLD',
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
