import { Injectable } from '@nestjs/common';

import {
  CreateCustomerProps,
  CreatePaymentProps,
  PaymentsCustomerProvider,
} from '@core/modules/payment/application/ports/providers/payments-customer-provider';
import axios from 'axios';

@Injectable()
export class AsaasProvider implements PaymentsCustomerProvider {
  private readonly API_URL = 'https://api-sandbox.asaas.com/v3';
  private readonly API_KEY = process.env.ASAAS_API_KEY; // coloque no .env

  async createPayment({ amount, customer_id }: CreatePaymentProps) {
    const { data } = await axios.post(
      `${this.API_URL}/payments`,
      {
        customer: customer_id,
        billingType: 'CREDIT_CARD',
        value: amount,
        callbackUrl: 'https://seu-backend.com/asaas/webhook',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0], // +7 dias
      },
      {
        headers: {
          access_token: this.API_KEY,
        },
      },
    );
    return data;
  }

  async createCustomer({ email, doc, phone, name }: CreateCustomerProps) {
    const { data } = await axios.post(
      `${this.API_URL}/customers`,
      { name, email, cpfCnpj: doc, phone },
      { headers: { access_token: this.API_KEY } },
    );
    return data;
  }
}
