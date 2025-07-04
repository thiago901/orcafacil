type CreateCustomer = {
  id: string;
  email: string;
  name?: string | null;
};
export type FindSubscriptionProps = {
  id: string;
};
export abstract class PaymentsProvider {
  abstract createCheckoutSession(
    customer_id: string,
    price_id: string,
  ): Promise<string | null>;
  abstract handleWebhook(rawBody: Buffer, signature: string): Promise<void>;
  abstract createCustomer(email: string): Promise<CreateCustomer>;
  abstract findCustomer(email: string): Promise<CreateCustomer | null>;
  abstract findSubscription(email: string): Promise<FindSubscriptionProps>;
  abstract cancelSubscription(id: string): Promise<void>;
}
