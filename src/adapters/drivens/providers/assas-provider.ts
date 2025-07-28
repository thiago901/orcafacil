import { Injectable } from '@nestjs/common';

import {
  CreateCustomerProps,
  CreatePaymentProps,
  CreatePaymentResponse,
  FindCustomerResponse,
  PaymentsCustomerProvider,
} from '@core/modules/payment/application/ports/providers/payments-customer-provider';
import axios from 'axios';

@Injectable()
export class AsaasProvider implements PaymentsCustomerProvider {
  private readonly API_URL = 'https://api-sandbox.asaas.com/v3';
  private readonly API_KEY = process.env.ASAAS_API_KEY; // coloque no .env

  async createPayment({
    amount,
    customer_id,
    externalReference,
  }: CreatePaymentProps): Promise<CreatePaymentResponse> {
    const { data } = await axios.post(
      `${this.API_URL}/payments`,
      {
        customer: customer_id,
        externalReference: externalReference,
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
    return {
      session_url: data.invoiceUrl,
    };
  }

  async createCustomer({
    email,
    document,
    phone,
    name,
    customer_id,
  }: CreateCustomerProps) {
    const { data } = await axios.post(
      `${this.API_URL}/customers`,
      { name, email, cpfCnpj: document, phone, externalReference: customer_id },
      { headers: { access_token: this.API_KEY } },
    );
    return data;
  }
  async findCustomer(document: string): Promise<FindCustomerResponse | null> {
    const response = await axios.get(
      `${this.API_URL}/customers?cpfCnpj=${document}`,
      {
        headers: {
          access_token: this.API_KEY,
        },
      },
    );
    const { data } = response.data;
    if (!data || !data.length) {
      return null;
    }

    const { email, externalReference, id, name, phone } = data[0];
    return {
      document,
      email,
      externalReference,
      id,
      name,
      phone,
    };
  }
}
