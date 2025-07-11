export type SendParams = {
  email: string;
  title: string;
  body: string;
  labels: string[];
};

export abstract class SupportProvider {
  abstract send(data: SendParams): Promise<void>;
}
