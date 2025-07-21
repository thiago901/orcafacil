export type FindSubscriptionProps = {
  id: string;
};
export type CreateCustomerProps = {
  doc: string;
  email: string;
  phone: string;
  name: string;
};
export type CreatePaymentProps = {
  amount: number;
  customer_id: string;
};
export abstract class PaymentsCustomerProvider {
  abstract createCustomer(data: CreateCustomerProps): Promise<string | null>;
  abstract createPayment(data: CreatePaymentProps): Promise<string | null>;
}
