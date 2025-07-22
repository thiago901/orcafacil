export type FindSubscriptionProps = {
  id: string;
};
export type CreateCustomerProps = {
  customer_id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
};
export type CreatePaymentProps = {
  amount: number;
  customer_id: string;
};
export type CreatePaymentResponse = {
  session_url: string;
};

export type FindCustomerResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  externalReference: string;
};
export abstract class PaymentsCustomerProvider {
  abstract createCustomer(data: CreateCustomerProps): Promise<string>;
  abstract findCustomer(document: string): Promise<FindCustomerResponse | null>;
  abstract createPayment(
    data: CreatePaymentProps,
  ): Promise<CreatePaymentResponse>;
}
