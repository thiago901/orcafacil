type CreateCustomer = void;
export abstract class PaymentsProvider {
  abstract createCheckoutSession(
    customer_id: string,
    price_id: string,
  ): Promise<string | null>;
  abstract handleWebhook(rawBody: Buffer, signature: string): Promise<void>;
  abstract createCustomer(email: string): Promise<CreateCustomer>;
}
