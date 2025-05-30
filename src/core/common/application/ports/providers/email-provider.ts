export type EmailProviderResponseProps = {
  from: string;
  to: string;
  subject: string;
  templatePath: string;
  variables: Record<string, any>;
};

export abstract class EmailProvider {
  abstract send(data: EmailProviderResponseProps): Promise<void>;
}
